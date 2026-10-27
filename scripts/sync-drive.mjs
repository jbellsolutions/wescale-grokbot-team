#!/usr/bin/env node
// Puts the team's shared files in Google Drive, the one place every bot reads and writes,
// whichever cloud computer it runs on. Uses Google Drive for desktop's local folder.
//
//   node scripts/sync-drive.mjs --dry-run
//   node scripts/sync-drive.mjs                      # business: "<My Drive>/GrokBot Vault"
//   node scripts/sync-drive.mjs --push-config        # also replace Drive's Config/cog.json with this Mac's copy
//   node scripts/sync-drive.mjs --personal-dir "<My Drive of Chris's personal Google account>"
//
// Options: --drive-dir <path to "My Drive"> (found automatically when only one Google account is synced)
//
// What it writes:
//   GrokBot Vault/Playbooks/   skills/, charters/, docs/, policies/ at the package's own paths — package-owned, replaced every run
//   GrokBot Vault/Config/      cog.json — Drive's copy is the real one once it exists; replaced only with --push-config
//   GrokBot Vault/ (notes)     the vault skeleton — only files that don't exist yet; never overwrites a note
//   GrokBot Personal/          the CFO's playbooks and folders, only with --personal-dir

import { readFileSync, writeFileSync, mkdirSync, cpSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, dirname, resolve, relative } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const flag = (n) => argv.includes(n);
const opt = (n) => { const i = argv.indexOf(n); return i >= 0 ? argv[i + 1] : undefined; };
const DRY = flag("--dry-run");
const log = (...a) => console.log(...a);

const CFO_SKILLS = ["personal-cfo-ledger", "monthly-cash-flow-report"];
const CFO_CHARTER = "personal-cfo.md";

function findMyDrive() {
  const base = join(homedir(), "Library", "CloudStorage");
  const accounts = existsSync(base) ? readdirSync(base).filter((n) => n.startsWith("GoogleDrive-")) : [];
  if (accounts.length === 1) return join(base, accounts[0], "My Drive");
  if (!accounts.length) throw new Error("Google Drive for desktop isn't syncing here. Install it (👤 Chris signs in), or pass --drive-dir.");
  throw new Error(`Several Google accounts are synced (${accounts.join(", ")}). Pass --drive-dir "<…>/My Drive" for the business one.`);
}

const files = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  return statSync(p).isDirectory() ? files(p) : [p];
});

function put(src, dest, { overwrite }) {
  const existed = existsSync(dest);
  if (existed && !overwrite) return "kept";
  if (!DRY) { mkdirSync(dirname(dest), { recursive: true }); cpSync(src, dest); }
  return existed ? "replaced" : "added";
}

function syncBusiness(myDrive) {
  const vault = join(myDrive, "GrokBot Vault");
  log(`Business vault → ${vault}${DRY ? " (dry run)" : ""}`);
  const tally = { added: 0, replaced: 0, kept: 0 };
  const count = (r) => tally[r]++;

  // Playbooks: package-owned, always current.
  for (const n of readdirSync(join(ROOT, "skills")).filter((n) => !CFO_SKILLS.includes(n)))
    count(put(join(ROOT, "skills", n, "SKILL.md"), join(vault, "Playbooks", "skills", n, "SKILL.md"), { overwrite: true }));
  for (const n of readdirSync(join(ROOT, "charters")).filter((n) => n !== CFO_CHARTER))
    count(put(join(ROOT, "charters", n), join(vault, "Playbooks", "charters", n), { overwrite: true }));
  // Same relative paths as the package, so "docs/KPI-DEFINITIONS.md" in a skill is "Playbooks/docs/KPI-DEFINITIONS.md" in Drive.
  for (const p of ["docs/KPI-DEFINITIONS.md", "docs/OPERATOR-SOP.md", "docs/BUILD-YOUR-NEXT-AGENT.md", "policies/permissions.md"])
    count(put(join(ROOT, p), join(vault, "Playbooks", p), { overwrite: true }));

  // Notes skeleton: never overwrite what the bots or Chris wrote.
  for (const src of files(join(ROOT, "vault")).filter((p) => !p.endsWith(".gitkeep")))
    count(put(src, join(vault, relative(join(ROOT, "vault"), src)), { overwrite: false }));
  for (const d of ["Daily", "Reps", "Prospects"]) if (!DRY) mkdirSync(join(vault, d), { recursive: true });

  // Config: Drive's copy is canonical once it exists.
  count(put(join(ROOT, "config", "cog.example.json"), join(vault, "Config", "cog.example.json"), { overwrite: true }));
  const local = join(ROOT, "config", "cog.json");
  const remote = join(vault, "Config", "cog.json");
  if (!existsSync(local)) log("  · No config/cog.json on this Mac yet: run the intake (INSTALL.md step 7) and sync again.");
  else if (!existsSync(remote) || flag("--push-config")) {
    JSON.parse(readFileSync(local, "utf8")); // refuse to upload broken JSON
    count(put(local, remote, { overwrite: true }));
    log(`  ✓ Config/cog.json ${existsSync(remote) && flag("--push-config") ? "replaced from this Mac (--push-config)" : "uploaded"}`);
  } else if (readFileSync(local, "utf8") !== readFileSync(remote, "utf8")) {
    log("  ⚠ Drive's Config/cog.json differs from this Mac's. Drive's is the real one (bots edit it); not overwritten. Use --push-config only if this Mac's copy is newer.");
  }
  log(`  ${tally.added} added · ${tally.replaced} replaced · ${tally.kept} notes kept as they were`);
}

function syncPersonal(myDrive) {
  const root = join(myDrive, "GrokBot Personal");
  log(`\nPersonal (CFO) → ${root}${DRY ? " (dry run)" : ""}`);
  for (const n of CFO_SKILLS) put(join(ROOT, "skills", n, "SKILL.md"), join(root, "Playbooks", "skills", n, "SKILL.md"), { overwrite: true });
  put(join(ROOT, "charters", CFO_CHARTER), join(root, "Playbooks", "charters", CFO_CHARTER), { overwrite: true });
  put(join(ROOT, "policies", "permissions.md"), join(root, "Playbooks", "policies", "permissions.md"), { overwrite: true });
  if (!DRY) {
    mkdirSync(join(root, "Finance Exports"), { recursive: true });
    const readme = join(root, "README.md");
    if (!existsSync(readme)) writeFileSync(readme, "# GrokBot Personal\n\nOnly the CFO reads this folder. Drop bank and card CSV exports in `Finance Exports/` once a month. The CFO keeps the `Ledger` sheet here. Never put logins or full account numbers anywhere in this folder.\n");
  }
  log(`  ✓ CFO playbooks and folders`);
}

try {
  syncBusiness(opt("--drive-dir") ?? findMyDrive());
  const personal = opt("--personal-dir");
  if (personal) syncPersonal(personal);
  else log("\n· Personal (CFO) skipped: pass --personal-dir with the My Drive of the Google account that holds Chris's personal finances (ideally not the account the business bots use).");
} catch (e) {
  console.error(`✗ ${e.message}`);
  process.exit(1);
}
