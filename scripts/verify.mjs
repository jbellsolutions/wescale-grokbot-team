#!/usr/bin/env node
// Static checks for the Grok Bot package. No network, changes nothing.
//   node scripts/verify.mjs            # package checks
//   node scripts/verify.mjs --config   # also check a filled-in config at config/cog.json (git-ignored; e.g. a copy of the bot's context/cog.json)

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const problems = [];
const ok = [];
const check = (cond, good, bad) => (cond ? ok.push(good) : problems.push(bad));
const read = (p) => readFileSync(join(ROOT, p), "utf8");
const walk = (d) => readdirSync(d).flatMap((n) => {
  const p = join(d, n);
  if ([".git", "node_modules"].includes(n) || relative(ROOT, p) === join("config", "cog.json")) return [];
  return statSync(p).isDirectory() ? walk(p) : [p];
});

// manifest
let manifest;
try { manifest = JSON.parse(read("manifest.json")); ok.push("manifest.json parses"); }
catch (e) { problems.push(`manifest.json: ${e.message}`); }

const skillNames = new Set(readdirSync(join(ROOT, "skills")).filter((n) => statSync(join(ROOT, "skills", n)).isDirectory()));

// skills: frontmatter, absolute paths
for (const n of skillNames) {
  const p = join("skills", n, "SKILL.md");
  if (!existsSync(join(ROOT, p))) { problems.push(`${p} missing`); continue; }
  const text = read(p);
  const fm = text.match(/^---\nname: (.+)\ndescription: (.+)\n/);
  check(fm && fm[1].trim() === n && fm[2].trim().length > 20, `skill ${n} frontmatter ok`, `${p}: frontmatter needs name: ${n} and a description`);
  const rel = text.match(/(?<![\w/])(config\/cog\.json|vault\/[A-Z][\w-]*\/|docs\/KPI-DEFINITIONS\.md)/);
  check(!rel || /\/workspace\//.test(text.slice(Math.max(0, rel.index - 40), rel.index)), `skill ${n} uses absolute paths`, `${p}: relative path "${rel?.[1]}" (private skills are stored as text; use /workspace/...)`);
}

// agents: Profile and Memory seed, skills listed exist
const agents = readdirSync(join(ROOT, "agents")).filter((f) => f.endsWith(".md"));
const botNames = new Map();
for (const f of agents) {
  const text = read(join("agents", f));
  const name = text.match(/\*\*Bot name:\*\* ([^·\n]+)/)?.[1].trim();
  check(!!name, `agents/${f} has a bot name`, `agents/${f}: no "**Bot name:**" line`);
  if (name) botNames.set(name, f);
  const profile = text.match(/## Profile[^\n]*\n\n```\n([\s\S]*?)\n```/);
  check(!!profile && profile[1].length > 200, `agents/${f} Profile block`, `agents/${f}: missing or empty Profile code block`);
  if (!f.startsWith("9")) check(/## Memory seed\n/.test(text), `agents/${f} Memory seed`, `agents/${f}: no Memory seed section`);
  if (!f.startsWith("9")) for (const row of ["Owner", "Reads", "Only writer of", "Produces", "Tools and scopes", "Never", "Hands off to", "Limits per run", "Wakes on", "If a run fails", "Stops and tells Chris when", "Done means"]) check(text.includes(`| **${row}** |`), `agents/${f} contract: ${row}`, `agents/${f}: Operating contract row "${row}" missing`);
  const sec = text.match(/## Skills\n([\s\S]*?)\n## /);
  if (sec) for (const m of sec[1].matchAll(/`([a-z][a-z-]+)`/g)) check(skillNames.has(m[1]), `agents/${f} skill ${m[1]} exists`, `agents/${f} lists missing skill ${m[1]}`);
}

// routines: header, owner exists, preamble, skills named exist, Eastern
const HEADER = ["NAME", "OWNER", "ACCOUNT", "WHEN", "MILESTONE", "STATUS"];
// The peptide account may run on its own Grok account or on the business account; its folder is the same either way.
const WORKSPACES = { business: "/workspace/cog-team/", peptide: "/workspace/peptide/" };
const routineFiles = readdirSync(join(ROOT, "routines")).filter((f) => f.endsWith(".prompt"));
for (const f of routineFiles) {
  const text = read(join("routines", f));
  const [head, body = ""] = text.split("\n---\n");
  const h = Object.fromEntries([...head.matchAll(/^([A-Z]+): (.*)$/gm)].map((m) => [m[1], m[2]]));
  check(HEADER.every((k) => h[k]), `routines/${f} header`, `routines/${f}: header needs ${HEADER.join(", ")}`);
  check(botNames.has(h.OWNER), `routines/${f} owner ${h.OWNER}`, `routines/${f}: OWNER "${h.OWNER}" has no charter in agents/`);
  check(Object.hasOwn(WORKSPACES, h.ACCOUNT ?? ""), `routines/${f} account`, `routines/${f}: ACCOUNT must be business or peptide`);
  check(/\(Eastern\)$/.test(h.WHEN ?? ""), `routines/${f} WHEN is Eastern`, `routines/${f}: WHEN must end with "(Eastern)"`);
  check(/^STATUS: Created paused/m.test(head), `routines/${f} ships paused`, `routines/${f}: STATUS must say it's created paused`);
  for (const line of ["Switch check:", "Test mode:", "Isolation guard:", "Lean run:", "Run log:"]) check(body.includes(line), `routines/${f} ${line}`, `routines/${f}: missing "${line}"`);
  for (const m of body.matchAll(/\b([a-z]+(?:-[a-z]+)+) skill\b/g)) check(skillNames.has(m[1]), `routines/${f} skill ${m[1]} exists`, `routines/${f} names missing skill ${m[1]}`);
  const ws = WORKSPACES[h.ACCOUNT] ?? WORKSPACES.business;
  const foreign = [...body.matchAll(/\/workspace\/([a-z-]+)\//g)].map((m) => `/workspace/${m[1]}/`).filter((p) => p !== ws);
  check(foreign.length === 0, `routines/${f} stays in ${ws}`, `routines/${f}: touches ${[...new Set(foreign)].join(", ")}`);
}

// manifest matches the files
if (manifest) {
  for (const s of manifest.skills) check(skillNames.has(s.name), `manifest skill ${s.name} exists`, `manifest lists missing skill ${s.name}`);
  for (const n of skillNames) check(manifest.skills.some((s) => s.name === n), `skill ${n} in manifest`, `skills/${n} is not in manifest.json`);
  for (const r of manifest.routines) check(existsSync(join(ROOT, r.file)), `manifest routine ${r.name}`, `manifest routine file missing: ${r.file}`);
  check(manifest.routines.length === routineFiles.length, "manifest lists every routine", `manifest has ${manifest.routines.length} routines, routines/ has ${routineFiles.length}`);
}

// START-HERE links
const start = read("START-HERE.md");
for (const m of start.matchAll(/`((?:agents|docs|policies|config|routines|skills)\/[^`*<]+?\.(?:md|json|prompt))`/g)) check(existsSync(join(ROOT, m[1])), `START-HERE → ${m[1]}`, `START-HERE.md points at missing ${m[1]}`);

// public repo: no secrets, no private client details
const SECRET = /(sk-[A-Za-z0-9_-]{20,}|sk-or-v1-[a-f0-9]{20,}|xox[abp]-[0-9A-Za-z-]{10,}|pit-[0-9a-f-]{20,}|ghp_[A-Za-z0-9]{20,}|AKIA[0-9A-Z]{16}|-----BEGIN [A-Z ]*PRIVATE KEY-----)/;
const PRIVATE = /(Medell[ií]n|Bogot[aá]|Pichardo|chrisxpichardo|@gmail\.com|\$10 loaded|U0(?!123456789)[0-9A-Z]{8,}|\b[Dd]ating\b|[Dd]ate[- ]nights?)/;
const files = walk(ROOT).filter((p) => !/\.(png|jpe?g|gif|ico|pdf)$/i.test(p));
const leaks = files.filter((p) => SECRET.test(readFileSync(p, "utf8")));
check(leaks.length === 0, "no secrets in package files", `possible secret in: ${leaks.map((p) => relative(ROOT, p)).join(", ")}`);
const exposed = files.filter((p) => !p.endsWith("verify.mjs") && PRIVATE.test(readFileSync(p, "utf8")));
check(exposed.length === 0, "no private client details", `private detail in: ${exposed.map((p) => relative(ROOT, p)).join(", ")}`);
const legacy = files.filter((p) => !p.endsWith("verify.mjs") && !p.endsWith("README.md") && !p.endsWith("AGENTS.md") && !/HERMES-TO-GROKBOT/.test(p) && /(install-team\.mjs|sync-drive\.mjs|team\.json|--retime|service:enable|localhost:3210)/.test(readFileSync(p, "utf8")));
check(legacy.length === 0, "no Better than GrokBot install leftovers", `old install references in: ${legacy.map((p) => relative(ROOT, p)).join(", ")}`);
// Chris's personal side runs in ChatGPT, never on Grok Bot: no personal account, bots or paths come back.
const personal = files.filter((p) => !p.endsWith("verify.mjs") && !/vault\/Decisions\.md$/.test(p) && /(\/workspace\/chris-personal\/|Life Concierge|\bCFO\b|ACCOUNT: personal|second Grok account for the personal)/.test(readFileSync(p, "utf8")));
check(personal.length === 0, "no personal Grok account", `personal-account leftovers in: ${personal.map((p) => relative(ROOT, p)).join(", ")}`);
check(read(".gitignore").includes("config/cog.json"), "config/cog.json is git-ignored", ".gitignore must list config/cog.json");

// optional: a filled-in client config
if (process.argv.includes("--config")) {
  const p = join(ROOT, "config", "cog.json");
  if (!existsSync(p)) problems.push("config/cog.json missing");
  else {
    const raw = readFileSync(p, "utf8");
    const left = raw.match(/"[^"]*REQUIRED[^"]*"/g) ?? [];
    check(left.length === 0, "config has no REQUIRED placeholders", `config still has ${left.length} REQUIRED value(s): ${left.slice(0, 5).join(", ")}`);
    const cfg = JSON.parse(raw);
    check(cfg.roster?.length > 0 && !cfg.roster.some((r) => /EXAMPLE/.test(r.name)), "roster filled", "roster is empty or still has EXAMPLE rows");
  }
}

for (const p of problems) console.log(`✗ ${p}`);
console.log(`\n${ok.length} checks passed, ${problems.length} problem(s).`);
process.exit(problems.length ? 1 : 0);
