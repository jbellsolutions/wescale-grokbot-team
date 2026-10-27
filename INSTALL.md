# Install Chris's GrokBot team: step-by-step walkthrough

This is the full walkthrough. A setup agent (Claude Code or Codex on Chris's Mac) runs it top to bottom. Chris only steps in where it says **👤 Chris**: keys, sign-ins, approvals and the intake interview.

**What you end up with:**
- Better than GrokBot running on Chris's Mac.
- Workspace **Chris HQ**: Chief (the main GrokBot), Ops, COG Sales Manager, Growth Operator and Pre-Call Concierge.
- Workspace **Personal**: the CFO.
- 16 routines created **paused**.
- 20 skills.
- Chris's facts in one config.
- One shared Google Drive home every bot reads and writes.
- Read-only connections proven.
- A dry run, then go-live.

## How the pieces fit (read once)

```
Chris's Mac ── Better than GrokBot app (localhost:3210) ── runs the bots' brains, routines, approvals
                     │
                     ├─ Orgo cloud computers ── where bots do computer work (Chief's; COG Sales Manager's own; Personal's)
                     │
                     └─ Google Drive ── THE shared home (every bot, every computer):
                          GrokBot Vault/Playbooks/   skills/, charters/, docs/, policies/ (from this package)
                          GrokBot Vault/Config/cog.json   Chris's facts (the real copy)
                          GrokBot Vault/Daily, Reps, Assets, Prospects, Decisions.md   the record (Obsidian vault)
                          GrokBot Personal/   CFO only (ideally a different Google account)
```

**Why Drive:** bots run on different cloud computers, and a specialist's computer is a *copy* taken on its first task. Files kept on one computer drift apart. Drive is one copy everyone reads through the Drive connection, and Chris opens it in Obsidian through Google Drive for desktop.

## Rules for the setup agent (read first)

- Do the technical work yourself. Stop only for 👤 steps.
- **Never print, log or commit a key.** App keys go in with `node scripts/set-key.cjs <NAME>` in the app folder, typed by Chris in his own terminal (recommended). Or he pastes one to you, after you tell him it is then in the chat history.
- Never buy anything, upgrade a plan, or turn on OpenRouter auto top-up.
- **Inspect before changing. Reuse what exists:**
  - an existing Better than GrokBot install
  - existing bots
  - his Orgo computers
  - the Oct 16 Slack app
- Never overwrite another app's `.env.local` or `.data/`.
- Every routine stays **paused** until step 9.
- **Don't claim a step passed until its check passed.** Report plainly.

---

## Step 0. Read the plan

Read, in this order:
1. This file.
2. `AGENTS.md`.
3. `team.json`.
4. `policies/permissions.md`.
5. `docs/MIGRATION-FROM-HERMES.md`.
6. The app's own `INSTALL.md` (Better than GrokBot repo).

For app mechanics follow the app's file. For the team, approvals and safety follow this one.

## Step 1. Check the Mac and take stock

```bash
node --version          # needs 24 or newer
git --version
df -h ~                 # dependencies + build need a few GB free
date +%Z; readlink /etc/localtime   # the Mac's time zone (Chris's is UTC-5 all year, no daylight saving)
curl -s http://127.0.0.1:3210/api/health   # anything already running there?
ls ~/better-than-grokbot 2>/dev/null
ls ~/Library/CloudStorage/ 2>/dev/null | grep GoogleDrive   # Google Drive for desktop?
```

**Take stock of Orgo:** list Chris's computers with the Orgo API or dashboard, read-only. On Oct 6 he agreed to a plan with **four** computers. Some may already run:
- the Co-Founder agent (joined Slack Oct 15)
- the Revenue Partner
- the Oct 16 Hermes COG bot

Write down which computers exist and what each runs. This team needs at least **1** (all HQ bots can share Chief's) and ideally **3**: Chief, COG Sales Manager, Personal. Tell 👤 Chris what fits and get his choice before step 3. The installer reports when the plan has no room for COG Sales Manager's own computer, and that bot then shares Chief's.

## Step 2. Install Better than GrokBot

Follow the app's `INSTALL.md` steps 1–4:

```bash
git clone https://github.com/jbellsolutions/better-than-grokbot.git ~/better-than-grokbot
cd ~/better-than-grokbot && npm ci
cp .env.example .env.local && chmod 600 .env.local      # only if .env.local doesn't exist
```

**👤 Chris: keys, one at a time** (`node scripts/set-key.cjs <NAME>` in his terminal):

| Key | For this team | Needed? |
|---|---|---|
| `OPENROUTER_API_KEY` | The bots' thinking. He has OpenRouter from Oct 16 (keep auto top-up off) | **Required** (or `OPENAI_API_KEY`) |
| `ORGO_API_KEY` | The bots' cloud computers | **Required** |
| `COMPOSIO_API_KEY` | Google Drive, Gmail, Calendar, Sheets, Slack (COG workspace), and GoHighLevel if Composio covers it | **Required for this team** |
| `HONCHO_API_KEY` | Conversation memory | Recommended |
| `AGENTMAIL_API_KEY` / `AGENTPHONE_API_KEY` | Bot email / texts and calls | Optional, later |

Models: start with what worked on Oct 16 (`z-ai/glm-5.3-flash` for `BOPS_CHAT_MODEL`, `BOPS_SESSION_MODEL` and `BOPS_HARD_MODEL`). Chris can change them in Settings → Models. Providers bill separately.

```bash
npm run build
npx next start --port 3210 --hostname 127.0.0.1    # in the background; keep it running
curl -s http://127.0.0.1:3210/api/health           # must answer {"bops":true,...}
```

Open http://localhost:3210 for Chris. With his OK: `npm run service:enable` (survives restarts).

**Check:** a "hello" to the lead gets a reply. Ask first, because it uses his model credit.

## Step 3. Load the team

```bash
git clone https://github.com/jbellsolutions/wescale-grokbot-team.git ~/wescale-grokbot-team   # if not already here
cd ~/wescale-grokbot-team
node scripts/verify.mjs                                    # package checks; must pass
node scripts/install-team.mjs --dry-run                    # shows exactly what will change
node scripts/install-team.mjs --btg-dir ~/better-than-grokbot
```

This replaces the app's step 6 ("Do you have charters?"). The installer:
- Sets "Who the bots work for".
- Renames the default lead to **Chief** and the Head of Operations to **Ops**.
- Creates COG Sales Manager (own computer if there's room), Growth Operator and Pre-Call Concierge.
- Creates the **Personal** workspace with **CFO** as its lead.
- Adds 16 routines **paused**, with Eastern times converted to the app's clock.
- Copies the skills to `~/.bops/workspace/capabilities/skills`, and the charters into the app.

**Daylight saving:** if the Mac's clock doesn't follow US daylight saving (UTC-5 all year doesn't), the installer prints the date the clocks drift apart. Example: on 2026-11-01, 11:30 PM ET moves from 10:30 PM to 11:30 PM on a UTC-5 clock. Note that date. After it, run `node scripts/install-team.mjs --retime`, which re-fits every routine and keeps each one on or off as it was. Ops' weekly review reminds Chris too.

**Check:**

```bash
curl -s http://127.0.0.1:3210/api/state | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{const s=JSON.parse(d).state;console.log(s.bots.map(b=>b.name+': '+b.role.slice(0,60)+'…').join('\n'));console.log('routines:',s.routines.length,'enabled:',s.routines.filter(r=>r.enabled).length)})"
```

Expect 6 bots (plus any he already had) and 16 routines, **0 enabled**.

## Step 4. The Oct 16 Hermes COG bot

Follow `docs/MIGRATION-FROM-HERMES.md`:
- Reuse its Orgo computer for the COG Sales Manager, or retire the bot (👤 Chris chooses).
- Pause its jobs either way.

**Check:** only one COG bot will be active.

## Step 5. Slack: two jobs, maybe two workspaces

On Oct 16 the Slack app was installed in **WeScale** (Chris's company workspace). Justin noted that installing in **COG's** Slack needs admin rights. Ask 👤 Chris: **"Which Slack workspace is the KPI channel in?"**

| Job | How |
|---|---|
| **Chris talks to his bots** (DMs, @mentions) | Better than GrokBot's Slack app, in **WeScale**. Follow the app's `INSTALL.md` → **Slack (beta)**: public address, manifest, install, token and signing secret in the bot's **Where to find → Slack**, event subscriptions. Its manifest includes `channels:history` / `groups:history`, which fixes the Oct 16 history problem. Allow only Chris's member ID |
| **COG Sales Manager reads the KPI channel and posts the bump** | If the KPI channel is in **WeScale**: the same app. Invite it to the channel. If it's in **COG's workspace**: connect **Slack (COG workspace)** in the app's Vault (Composio) **as Chris**. That reads every channel Chris is in, and lets the bump post "from Chris's account" if he chooses that in the intake. If COG's workspace requires admin approval for apps, 👤 Chris asks the COG admin |

**Check:**
- Chris DMs Chief in Slack and gets an answer.
- COG Sales Manager quotes the newest message in the KPI channel, with its time.

## Step 6. 👤 Connections, read-only first

In the app's **Vault**, Chris connects his accounts. Give each bot access per `policies/permissions.md` (bot profile, or `PATCH /api/bots {"botId":…,"access":{"account":…,"level":"read"}}`). **Everything starts at `read`.** The exception is Drive: business bots get `act`, because they write the vault (step 8).

| Bot | Apps |
|---|---|
| Chief | Google Drive (act), Gmail, Calendar, Slack (WeScale) |
| COG Sales Manager | Google Drive (act), Slack (KPI workspace), Google Sheets (EOD), Calendar, GoHighLevel |
| Growth Operator | Google Drive (act), the call-transcript source, Slack |
| Pre-Call Concierge | Google Drive (act), GoHighLevel, Calendar |
| Ops | Google Drive (read), Slack |
| CFO (Personal) | Google Drive and Sheets of the **personal** Google account only |

**Business vs. personal Google:** if Chris has a separate personal Google account, connect it only to the CFO. That makes the money data unreachable for business bots. With one account for both, the separation is by workspace memory and charter rules, not technically enforced. Tell him that.

**GoHighLevel:**
- **If Composio covers his location,** use it.
- **If not,** Chris creates a **location-scoped Private Integration Token** in GHL → Settings → Private Integrations, with read scopes for contacts, calendars, conversations and opportunities. The token must live on the **computer that reads GHL** (COG Sales Manager's), not on the Mac.
  1. Open that bot's screen in the app (**Watch → Take control**).
  2. In its terminal, Chris runs `read -rs GHL_PIT && printf 'GHL_PIT=%s\n' "$GHL_PIT" > ~/.ghl.env && chmod 600 ~/.ghl.env && unset GHL_PIT`, pastes the token (it stays hidden) and presses Enter.
  3. He hands the screen back.
  4. The bot reads GHL's API with that file. Never a GHL login or password, and never the token in chat.

**Check:** each bot quotes **one real record** from each source, with a link and time. Fix any failure before step 9, or that source shows as "unknown" every night.

## Step 7. 👤 The intake interview → `config/cog.json`

```bash
cp config/cog.example.json config/cog.json     # git-ignored; stays on this Mac until step 8 uploads it
```

Run `config/intake-interview.md` with Chris, **one question at a time**. Look up IDs yourself through the connections (Slack member IDs, GHL users, calendars) and ask him only to confirm. Then:

```bash
node scripts/verify.mjs --config        # no REQUIRED placeholders, no EXAMPLE rows
```

## Step 8. 👤 Google Drive home + Obsidian

1. 👤 Chris installs **Google Drive for desktop** (google.com/drive/download) and signs in with the **business** Google account the bots use. Add the personal account too if the CFO uses a separate one.
2. Put the playbooks, the config and the vault skeleton in Drive:

```bash
node scripts/sync-drive.mjs --dry-run
node scripts/sync-drive.mjs                       # → "My Drive/GrokBot Vault"
node scripts/sync-drive.mjs --personal-dir "$HOME/Library/CloudStorage/GoogleDrive-<personal account>/My Drive"   # CFO, if ready
```

   The Drive copy of `Config/cog.json` becomes **the real one**. Bots update it when Chris says "add a closer…". Re-running `sync-drive.mjs` refreshes the playbooks, never overwrites notes, and replaces the config only with `--push-config`.
3. 👤 Chris opens Obsidian → **Open folder as vault** → `My Drive/GrokBot Vault`.

**Check:**
- COG Sales Manager reads `GrokBot Vault/Config/cog.json` through Drive and says how many reps are on the roster.
- Chief writes `Daily/<today>.md` with "Vault check ✓", and Chris sees it in Obsidian.

## Step 9. Dry run, then go live (milestones M5 → M6)

1. Turn routines on **in draft mode**. `bump.standing_approval_recorded` stays `false`, so even the bump only goes to Chris as a draft. Turn them on in the app (or with `PATCH /api/routines {"id":…,"enabled":true}`) in this order:
   - Ops daily health
   - COG morning report
   - EOD first and final checks
   - no-show sweeps
   - Chief's brief
   - Pre-Call
   - Growth
   - the weekly ones
2. **Five consecutive nights:** Chris marks the EOD check and the morning report right or wrong in the chat. Fix the config or the skills until they're right. Edit the Drive config; re-run `sync-drive.mjs` after changing skills.
3. **Go live on the bump:**
   - 👤 Chris says, in writing, "approve the standing EOD bump".
   - Record it in `GrokBot Vault/Decisions.md`.
   - Set `bump.standing_approval_recorded: true` in **`GrokBot Vault/Config/cog.json`** (the one real copy).
   - Give COG Sales Manager **act** on the KPI workspace's Slack.
   - From then on the bump posts unattended. **Nothing else does.**
4. **CFO** (M9): when Chris's exports are in `GrokBot Personal/Finance Exports`, run `personal-cfo-ledger` once in the Personal workspace, then enable the weekly check-in.
5. **Pre-Call and Growth:** on Oct 16 Justin suggested keeping pre-call work in ChatGPT at first. Here they run as drafts-for-approval from day one. Their sequences or assets go live only by Chris's per-template decision (milestone M8).

## Acceptance tests (all must pass before calling it done)

- [ ] The app opens. Chief replies in the app and in Slack (WeScale).
- [ ] 6 bots exist with the roles from `charters/`. 16 routines exist. None was enabled without Chris's OK.
- [ ] `node scripts/verify.mjs --config` passes. `GrokBot Vault/Config/cog.json` exists in Drive.
- [ ] Each bot quotes one real record from each of its sources.
- [ ] **Routine test (the one the design rests on):** manually run two paused routines once, in draft mode.
  1. **EOD first check:** it must say it read `GrokBot Vault/Playbooks/skills/cog-eod-compliance/SKILL.md` and the Drive config, and produce the skill's exact format (Expected / Submitted / Late / Missing, plus the bump draft).
  2. **Morning sales report:** it must cite `Playbooks/docs/KPI-DEFINITIONS.md` for its formulas, show "reported vs verified", and write `Daily/<date>.md` to Drive as a plain `.md` file.
  3. Neither may post anything in Slack.
- [ ] **Unknown test:** remove COG Sales Manager's access to the EOD source (whatever `eod.source_type` is) and ask "who's missing EODs?" It must answer "unknown: EOD source unreadable", not names. Restore access.
- [ ] **No-config test:** ask the CFO for this month's spending before its sources exist. It must answer `NO_CLIENT_SOURCE`.
- [ ] **Approval test:** ask Chief to email someone. It must show a draft and wait.
- [ ] **Boundary test:** in Chris HQ, ask Chief "how much did I spend this month?" It must send Chris to the CFO in Personal.
- [ ] Chris sees the vault note in Obsidian.
- [ ] Only one COG bot is active. The installer's daylight-saving warning date (if any) is written in `Decisions.md`.

## Report back to Chris

Keep it short and plain:
- what's installed
- which connections work
- which routines are on
- what's waiting on him
- the date to run `--retime`, if any

No secret values, ever. Then point him to `START-HERE.md` and `docs/OPERATOR-SOP.md`.
