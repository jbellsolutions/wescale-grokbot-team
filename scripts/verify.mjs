#!/usr/bin/env node
// Static checks for the package. No network, changes nothing.
//   node scripts/verify.mjs            # package checks
//   node scripts/verify.mjs --config   # also require config/cog.json to be fully filled in

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { roleOf, convertSchedule } from "./install-team.mjs";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];
const ok = [];
const check = (cond, good, bad) => (cond ? ok.push(good) : problems.push(bad));

// team.json
let team;
try { team = JSON.parse(readFileSync(join(ROOT, "team.json"), "utf8")); ok.push("team.json parses"); }
catch (e) { problems.push(`team.json: ${e.message}`); }

if (team) {
  check(team.owner.about.length <= 600, `owner.about ${team.owner.about.length}/600`, `owner.about is ${team.owner.about.length} chars (max 600)`);
  const bots = new Map();
  for (const ws of team.workspaces) {
    for (const b of [ws.lead, ws.operations, ...(ws.specialists ?? []), ...(ws.reserved ?? [])].filter(Boolean)) {
      try { const r = roleOf(b.charter); ok.push(`${b.name}: role ${r.length}/500`); }
      catch (e) { problems.push(`${b.name}: ${e.message}`); }
      bots.set(`${ws.key}:${b.name}`, b);
    }
  }
  const skillNames = new Set(readdirSync(join(ROOT, "skills")).filter((n) => statSync(join(ROOT, "skills", n)).isDirectory()));
  for (const r of team.routines) {
    const key = `${r.workspace ?? "hq"}:${r.bot}`;
    check(bots.has(key), `routine "${r.title}" → ${r.bot}`, `routine "${r.title}": no bot ${key}`);
    const s = r.schedule;
    const valid = ["daily", "weekdays", "weekly"].includes(s.kind) && /^([01]\d|2[0-3]):[0-5]\d$/.test(s.time) && (s.kind !== "weekly" || (Number.isInteger(s.day) && s.day >= 0 && s.day <= 6));
    check(valid, `routine "${r.title}" schedule ok`, `routine "${r.title}": bad schedule ${JSON.stringify(s)}`);
    for (const m of r.goal.matchAll(/\b([a-z]+(?:-[a-z]+)+) skill\b/g)) check(skillNames.has(m[1]), `routine "${r.title}" skill ${m[1]} exists`, `routine "${r.title}" names missing skill ${m[1]}`);
    try { convertSchedule(s, team.team_timezone, "America/Chicago"); } catch (e) { problems.push(`routine "${r.title}": time conversion failed: ${e.message}`); }
  }
  // skills
  for (const n of skillNames) {
    const p = join(ROOT, "skills", n, "SKILL.md");
    if (!existsSync(p)) { problems.push(`skills/${n}: no SKILL.md`); continue; }
    const fm = readFileSync(p, "utf8").match(/^---\nname: (.+)\ndescription: (.+)\n---/);
    check(fm && fm[1].trim() === n && fm[2].trim().length > 20, `skill ${n} frontmatter ok`, `skills/${n}/SKILL.md: frontmatter needs name: ${n} and a description`);
  }
  // every skill a charter lists exists
  for (const f of readdirSync(join(ROOT, "charters"))) {
    const text = readFileSync(join(ROOT, "charters", f), "utf8");
    const sec = text.match(/## Skills\n([\s\S]*?)\n## /);
    if (!sec) continue;
    for (const m of sec[1].matchAll(/`([a-z][a-z-]+)`/g)) check(skillNames.has(m[1]), `${f} skill ${m[1]} exists`, `charters/${f} lists missing skill ${m[1]}`);
  }
}

// secrets: nothing that looks like a key anywhere in the package (config/cog.json is git-ignored and skipped)
const SECRET = /(sk-[A-Za-z0-9_-]{20,}|sk-or-v1-[a-f0-9]{20,}|xox[abp]-[0-9A-Za-z-]{10,}|pit-[0-9a-f-]{20,}|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;
const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n);
  if ([".git", "node_modules"].includes(n) || relative(ROOT, p) === join("config", "cog.json")) return [];
  return statSync(p).isDirectory() ? walk(p) : [p];
});
const leaks = walk(ROOT).filter((p) => SECRET.test(readFileSync(p, "utf8")));
check(leaks.length === 0, "no secrets found in package files", `possible secret in: ${leaks.map((p) => relative(ROOT, p)).join(", ")}`);
check(readFileSync(join(ROOT, ".gitignore"), "utf8").includes("config/cog.json"), "config/cog.json is git-ignored", ".gitignore must list config/cog.json");

// optional: the filled-in client config
if (process.argv.includes("--config")) {
  const p = join(ROOT, "config", "cog.json");
  if (!existsSync(p)) problems.push("config/cog.json missing: run the intake (config/intake-interview.md)");
  else {
    const raw = readFileSync(p, "utf8");
    const left = raw.match(/"[^"]*REQUIRED[^"]*"/g) ?? [];
    check(left.length === 0, "config/cog.json has no REQUIRED placeholders", `config/cog.json still has ${left.length} REQUIRED value(s): ${left.slice(0, 5).join(", ")}`);
    const cfg = JSON.parse(raw);
    check(cfg.roster?.length > 0 && !cfg.roster.some((r) => /EXAMPLE/.test(r.name)), "roster filled", "roster is empty or still has EXAMPLE rows");
  }
}

for (const p of problems) console.log(`✗ ${p}`);
console.log(`\n${ok.length} checks passed, ${problems.length} problem(s).`);
process.exit(problems.length ? 1 : 0);
