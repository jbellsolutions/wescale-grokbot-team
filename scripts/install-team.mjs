#!/usr/bin/env node
// Loads Chris's team (team.json + charters/ + skills/) into a running Better than GrokBot.
// Safe to re-run: existing bots are matched by name, existing routines by bot + title.
// Every routine it creates is left PAUSED.
//
//   node scripts/install-team.mjs --dry-run          # show the plan, change nothing
//   node scripts/install-team.mjs                    # install
//   node scripts/install-team.mjs --only "Ops"       # one bot (and its routines)
//   node scripts/install-team.mjs --retime           # re-fit routine times after a daylight-saving change
//
// Options: --api <url> (default team.json app.api) · --no-personal · --no-skills
//          --skills-dir <path> (default ~/.bops/workspace/capabilities/skills)
//          --btg-dir <path> (a Better than GrokBot checkout; full charters are copied to its charters/)

import { readFileSync, mkdirSync, cpSync, existsSync, readdirSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const MAIN_WORKSPACE = "ws_main";

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(name);
const opt = (name) => {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : undefined;
};

const team = JSON.parse(readFileSync(join(ROOT, "team.json"), "utf8"));
const API = (opt("--api") ?? team.app.api).replace(/\/$/, "");
const DRY = flag("--dry-run");
const ONLY = opt("--only");
const log = (...a) => console.log(...a);

// ---- charters -------------------------------------------------------------

export function roleOf(charterPath) {
  const text = readFileSync(join(ROOT, charterPath), "utf8");
  const m = text.match(/<!-- role -->([\s\S]*?)<!-- \/role -->/);
  if (!m) throw new Error(`${charterPath}: no <!-- role --> block`);
  const role = m[1].replace(/\s+/g, " ").trim();
  if (!role || role.length > 500) throw new Error(`${charterPath}: role must be 1-500 characters (is ${role.length})`);
  return role;
}

/** Routine goals name skills ("Run the cog-eod-compliance skill"); tell the bot where those files are. */
export function withPreamble(goal, root, preamble = team.routine_preamble) {
  const skills = [...new Set([...goal.matchAll(/\b([a-z]+(?:-[a-z]+)+) skill\b/g)].map((m) => m[1]))];
  if (!preamble || !skills.length) return goal;
  return `${preamble.replaceAll("{root}", root).replace("{skill_files}", skills.map((s) => `${root}/Playbooks/skills/${s}/SKILL.md`).join(", "))} ${goal}`;
}

/** The first date within a year when `fromTz` and `toTz` stop being a fixed distance apart (daylight saving). */
export function dstShift(fromTz, toTz, now = new Date()) {
  const gap = (d) => offsetMs(fromTz, d) - offsetMs(toTz, d);
  const start = gap(now);
  for (let day = 1; day <= 366; day++) {
    const d = new Date(now.getTime() + day * 86400000);
    if (gap(d) !== start) return d.toISOString().slice(0, 10);
  }
  return null;
}

const sameSchedule = (a, b) => a.kind === b.kind && a.time === b.time && (a.kind !== "weekly" || a.day === b.day);

// ---- time zones: team.json times are Eastern; the app fires routines on its server's clock ----

function offsetMs(tz, instant) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit",
  }).formatToParts(instant);
  const v = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  return Date.UTC(+v.year, +v.month - 1, +v.day, +v.hour, +v.minute, +v.second) - instant.getTime();
}

function wallToInstant(y, mo, d, h, mi, tz) {
  const guess = Date.UTC(y, mo, d, h, mi);
  const first = guess - offsetMs(tz, new Date(guess));
  return new Date(guess - offsetMs(tz, new Date(first)));
}

function wallIn(tz, instant) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: tz, hourCycle: "h23", weekday: "short", hour: "2-digit", minute: "2-digit",
  }).formatToParts(instant);
  const v = Object.fromEntries(parts.map((p) => [p.type, p.value]));
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(v.weekday);
  return { time: `${v.hour}:${v.minute}`, day };
}

/** A daily/weekdays/weekly schedule written in `fromTz`, re-expressed on the `toTz` clock (uses today's offsets). */
export function convertSchedule(schedule, fromTz, toTz, now = new Date()) {
  if (fromTz === toTz || schedule.kind === "once") return { ...schedule };
  const [h, mi] = schedule.time.split(":").map(Number);
  // A reference day in fromTz: today, or for weekly the next matching weekday.
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: fromTz, year: "numeric", month: "2-digit", day: "2-digit", weekday: "short" }).formatToParts(now);
  const t = Object.fromEntries(today.map((p) => [p.type, p.value]));
  let ref = Date.UTC(+t.year, +t.month - 1, +t.day);
  const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(t.weekday);
  if (schedule.kind === "weekly") ref += ((schedule.day - dow + 7) % 7) * 86400000;
  const r = new Date(ref);
  const local = wallIn(toTz, wallToInstant(r.getUTCFullYear(), r.getUTCMonth(), r.getUTCDate(), h, mi, fromTz));
  if (schedule.kind === "weekly") return { kind: "weekly", day: local.day, time: local.time };
  if (schedule.kind === "weekdays" && local.day !== dow) {
    // A weekdays schedule that crosses midnight would shift onto the wrong days; make it daily and say so.
    return { kind: "daily", time: local.time, note: "weekdays schedule crossed midnight in this time zone; installed as daily" };
  }
  return { kind: schedule.kind, time: local.time };
}

// ---- API ------------------------------------------------------------------

async function call(method, path, body) {
  if (DRY && method !== "GET") {
    log(`  [dry-run] ${method} ${path} ${body ? JSON.stringify(body).slice(0, 160) : ""}`);
    return { dryRun: true, id: `dry_${Math.random().toString(36).slice(2, 8)}`, botId: `dry_${Math.random().toString(36).slice(2, 8)}` };
  }
  const res = await fetch(API + path, {
    method,
    headers: body ? { "content-type": "application/json" } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try { json = text ? JSON.parse(text) : {}; } catch { json = { raw: text }; }
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${json.error ?? text.slice(0, 200)}`);
  return json;
}

const wsOf = (b) => b.workspaceId ?? MAIN_WORKSPACE;
const sameName = (a, b) => a.trim().toLowerCase() === b.trim().toLowerCase();

// ---- install --------------------------------------------------------------

async function main() {
  log(`Chris's GrokBot team → ${API}${DRY ? " (dry run: nothing will change)" : ""}\n`);

  const health = await call("GET", "/api/health").catch((e) => { throw new Error(`The app isn't answering at ${API}/api/health (${e.message}). Start it first (INSTALL.md step 2).`); });
  if (!health.bops) throw new Error(`${API}/api/health did not answer {"bops":true}; is this Better than GrokBot?`);

  let { state, instance } = await call("GET", "/api/state");
  const appTz = instance?.timezone ?? state?.instance?.timezone ?? Intl.DateTimeFormat().resolvedOptions().timeZone;
  log(`App clock: ${appTz} · team schedules written in ${team.team_timezone}\n`);

  const report = { bots: [], routines: [], warnings: [] };
  const shift = dstShift(team.team_timezone, appTz);
  if (shift) report.warnings.push(`Daylight saving: ${appTz} and ${team.team_timezone} drift apart on ${shift}. Routine times are fitted for today; run \`node scripts/install-team.mjs --retime\` on or after that date (Ops' weekly review reminds you).`);
  const refresh = async () => ({ state } = await call("GET", "/api/state"));

  // 1. Who the bots work for.
  if (!ONLY) {
    if (state.owner?.name && !sameName(state.owner.name, team.owner.name)) report.warnings.push(`Owner was "${state.owner.name}"; set to "${team.owner.name}".`);
    await call("POST", "/api/owner", { name: team.owner.name, about: team.owner.about });
    log(`✓ Owner: ${team.owner.name}`);
  }

  // 2. Workspaces and bots.
  const botIds = {}; // `${wsKey}:${name}` → botId
  const hqId = state.workspace ?? MAIN_WORKSPACE;
  for (const ws of team.workspaces) {
    if (ws.key === "personal" && flag("--no-personal")) { log(`- Skipping workspace "${ws.name}" (--no-personal)`); continue; }
    let wsId;
    if (ws.use_current) {
      wsId = hqId;
      if (!ONLY) await call("PATCH", "/api/workspaces", { id: wsId, name: ws.name });
    } else {
      const existing = (state.workspaces ?? []).find((w) => sameName(w.name, ws.name));
      if (existing) wsId = existing.id;
      else if (!ONLY || [ws.lead, ...(ws.specialists ?? [])].some((b) => b && sameName(b.name, ONLY))) {
        wsId = (await call("POST", "/api/workspaces", { name: ws.name })).id;
        await call("PATCH", "/api/workspaces", { current: hqId }); // creating one switches to it; switch back
      }
      if (!wsId) continue;
    }
    await refresh();
    log(`\nWorkspace "${ws.name}" (${wsId})`);
    const inWs = () => (state.bots ?? []).filter((b) => wsOf(b) === wsId);

    const wanted = [
      ws.lead && { ...ws.lead, kind: "lead" },
      ws.operations && { ...ws.operations, kind: "operations" },
      ...(ws.specialists ?? []).map((s) => ({ ...s, kind: "specialist" })),
    ].filter(Boolean);

    for (const w of wanted) {
      if (ONLY && !sameName(w.name, ONLY)) {
        const found = inWs().find((b) => sameName(b.name, w.name));
        if (found) botIds[`${ws.key}:${w.name}`] = found.id;
        continue;
      }
      const role = roleOf(w.charter);
      let b =
        w.kind === "lead" ? inWs().find((x) => x.isMain) :
        w.kind === "operations" ? inWs().find((x) => x.teamRole === "operations") ?? inWs().find((x) => sameName(x.name, w.name)) :
        inWs().find((x) => sameName(x.name, w.name));

      if (b) {
        const patch = { botId: b.id };
        if (!sameName(b.name, w.name)) patch.name = w.name;
        if (b.role !== role) patch.role = role;
        if (w.kind === "operations" && b.teamRole !== "operations") patch.teamRole = "operations";
        if (Object.keys(patch).length > 1) await call("PATCH", "/api/bots", patch);
        log(`  ✓ ${w.name} (${w.kind}) — ${Object.keys(patch).length > 1 ? `updated ${Object.keys(patch).filter((k) => k !== "botId").join(", ")}` : "already set"}`);
        botIds[`${ws.key}:${w.name}`] = b.id;
        report.bots.push({ name: w.name, status: "updated" });
      } else {
        const made = await call("POST", "/api/bots", {
          name: w.name, role, workspaceId: wsId,
          ownComputer: w.own_computer === true,
          ...(w.kind === "operations" ? { teamRole: "operations" } : {}),
        });
        if (made.note) report.warnings.push(`${w.name}: ${made.note}`);
        botIds[`${ws.key}:${w.name}`] = made.botId;
        log(`  + ${w.name} (${w.kind}) created${made.note ? ` — note: ${made.note}` : ""}`);
        report.bots.push({ name: w.name, status: "created" });
      }
    }
    for (const r of ws.reserved ?? []) log(`  · ${r.name} reserved — ${r.note}`);
  }

  // 3. Routines, all paused.
  await refresh();
  log(`\nRoutines (all left paused)`);
  for (const r of team.routines) {
    if (ONLY && !sameName(r.bot, ONLY)) continue;
    const wsKey = r.workspace ?? "hq";
    if (wsKey === "personal" && flag("--no-personal")) continue;
    const botId = botIds[`${wsKey}:${r.bot}`];
    if (!botId) { report.warnings.push(`Routine "${r.title}": bot ${r.bot} not found`); continue; }
    const root = team.workspaces.find((w) => w.key === wsKey)?.drive_root ?? "GrokBot Vault";
    const sched = convertSchedule(r.schedule, team.team_timezone, appTz);
    if (sched.note) report.warnings.push(`${r.title}: ${sched.note}`);
    delete sched.note;
    const shown = sched.kind === "weekly" ? `weekly day ${sched.day} ${sched.time}` : `${sched.kind} ${sched.time}`;
    const exists = (state.routines ?? []).find((x) => x.botId === botId && sameName(x.title, r.title));
    if (exists && !(flag("--retime") && !sameSchedule(exists.schedule, sched))) {
      log(`  ✓ ${r.bot} · ${r.title} — exists (${exists.enabled ? "ENABLED" : "paused"})`);
      report.routines.push({ title: r.title, status: "exists" });
      continue;
    }
    // --retime: the app can't edit a routine's schedule, so replace it and keep it on or off as it was.
    if (exists) await call("DELETE", "/api/routines", { id: exists.id });
    const made = await call("POST", "/api/routines", { botId, title: r.title, goal: withPreamble(r.goal, root), schedule: sched });
    const keepOn = exists?.enabled === true;
    if (made.id && !keepOn) await call("PATCH", "/api/routines", { id: made.id, enabled: false });
    log(`  ${exists ? "↻" : "+"} ${r.bot} · ${r.title} — ${shown} app time (${r.schedule.time} ET), ${keepOn ? "ENABLED (as before)" : "paused"}`);
    report.routines.push({ title: r.title, status: exists ? "retimed" : "created" });
  }

  // 4. Skills for computer tasks on this Mac, and the full charters in the app checkout.
  if (!flag("--no-skills")) {
    const dest = opt("--skills-dir") ?? join(homedir(), ".bops", "workspace", "capabilities", "skills");
    const src = join(ROOT, team.skills_dir ?? "skills");
    const names = readdirSync(src).filter((n) => existsSync(join(src, n, "SKILL.md")));
    if (DRY) log(`\n  [dry-run] copy ${names.length} skills → ${dest}`);
    else {
      mkdirSync(dest, { recursive: true });
      for (const n of names) cpSync(join(src, n), join(dest, n), { recursive: true });
      log(`\n✓ ${names.length} skills → ${dest}`);
    }
  }
  const btg = opt("--btg-dir");
  if (btg) {
    if (DRY) log(`  [dry-run] copy charters → ${join(btg, "charters")}`);
    else { cpSync(join(ROOT, "charters"), join(btg, "charters"), { recursive: true }); log(`✓ Charters → ${join(btg, "charters")}`); }
  }

  log(`\nDone: ${report.bots.length} bots, ${report.routines.length} routines.`);
  for (const w of report.warnings) log(`⚠ ${w}`);
  log(`\nNext: INSTALL.md steps 4-9: Hermes migration, Slack, connections, intake, Drive home, dry run.`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch((e) => { console.error(`✗ ${e.message}`); process.exit(1); });
}
