# Build record

What's specified, what's built and what's actually running, kept honest. Justin's team updates this file. The bots never do; Chief keeps the live list in `/workspace/cog-team/context/team-registry.md`.

**Where it stands (2026-10-27): a specification package.** Everything below exists as files in this repo. Nothing is set up, connected or switched on in Chris's Grok Bot account until his first bot follows `START-HERE.md` and reads back what it created.

## Status by piece

"Specified" means the job is written down. "Built in repo" means the file the bot uses exists here. "Active" means it's running on Chris's account and has been read back.

| Piece | Specified | Built in repo | Active on Chris's account |
|---|---|---|---|
| Project charter, approvals, data rules | Yes | `PROJECT_CHARTER.md`, `policies/` | Not yet |
| Chief (business, lead) | Yes | `agents/01-chief.md` | Not yet |
| COG Sales Manager (business) | Yes | `agents/02-cog-sales-manager.md` | Not yet |
| Pre-Call Concierge (business) | Yes | `agents/03-precall-concierge.md` | Not yet; routines wait for M8 |
| Growth Operator (business) | Yes | `agents/04-growth-operator.md` | Not yet; routine waits for M8 |
| Sales Coach (business) | Yes | `agents/06-sales-coach.md` | Not yet; routines wait for M9 and Chris's call standard |
| Personal side (life and money) | Moved to ChatGPT on 2026-10-27 | Not in this repo: a private setup file for a ChatGPT Project, My Life | Chris sets it up in ChatGPT |
| Peptide Operator (peptide, lead) | Yes | `agents/09-peptide-operator.md` | No: needs a second Grok account, or Chris's OK to run on the business account (M6) |
| Media Buyer (peptide) | Yes | `agents/10-media-buyer.md` | No (M6) |
| Scale Advisor (peptide) | Yes | `agents/11-scale-advisor.md` | No (M6) |
| Dream Map and monthly check-in | Yes | `skills/dream-map`, `routines/chief-dream-checkin.prompt`; Chris's map is a private attachment, never in the repo | Not yet (M10) |
| Project specs for the next builds | Spec'd, not built | `projects/`: WeScale Operator, landing-page builder, voice-caller tests, sales dashboard, social media agent, outbound test | No. Each starts from the Dream check-in |
| 19 routines | Yes | `routines/*.prompt` | Not yet. Each is created paused and runs only when listed in its account's `context/routines-on.md` |
| 27 private skills | Yes | `skills/` | Not yet saved |
| The nightly EOD bump | Yes | `agents/02`, `skills/cog-eod-compliance`, `skills/slack-api` | No: preview first, then standing approval 1 (M4) |
| Better than GrokBot edition | Yes | git tag `btg-edition` | Not installed |

**How "Active" gets filled in.** After each bot creates a routine, it reads it back (name, owner, schedule, time zone, paused) into `context/team-registry.md`, and Chief sends Chris the list. Justin's team copies that readback here. A piece is active only once its readback matches this repo.

## Grok Bot facts this build relies on

Checked against xAI's Grok Bot documentation (docs.x.ai/grok-bot) on 2026-10-27.

**In the docs**
- A bot is created with New chat (+) → Create new Bot and renamed by clicking its name. It gets its job in its first message and is asked to remember it.
- One shared computer per account: files, browser sessions and command-line credentials are shared by every bot on it. Durable files belong in `/workspace`.
- Time zone: Settings → General → Bot → Timezone.
- Auto-review: Settings → General → Auto-review → Custom Rules. "Ask first" wins over "Allow automatically".
- Apps connect through Connect apps → Add, then the provider's own sign-in. Private skills are one shared library, turned on per bot.
- Routines: the bot's Details tab has Pause, Resume, Test and Edit. **Test does real work.** Up to 50 routines per bot, at least 5 minutes apart, 20 run records kept. Unattended routines can be paused automatically.
- Passwords and two-factor steps go through **Take over**. Supported connections can ask for a secret through a secure secret request.

**Seen on another Grok Bot account, not in the public docs**
- A routine can be started by a webhook. Milestone M7 (real-time no-shows) would use it.
- Secure secret cards hold tokens, and the bot's shell reads them as environment variables. `skills/slack-api` uses this first.

**Not verified: check on Chris's account before relying on it**

| Claim | Where the repo uses it | How to check |
|---|---|---|
| Approval prompts expire after about 10 minutes | `PROJECT_CHARTER.md` §6, `policies/APPROVALS.md` | Leave one open. Either way, routines never wait on a prompt |
| An Ask-first rule with a written exception lets the standing-approved bump through | `policies/APPROVALS.md`, START-HERE Step 11 | The go-live test in Step 11 |
| One Slack connector holding two workspaces (WeScale and COG's) | START-HERE Step 5, Chief's DM scan | Connect the second workspace and read both |
| `ghl-super-hub` installs on the Grok Bot computer | START-HERE Step 6 | Its `ghl hub doctor` |

Each unverified item has a fallback where it's used, so a "no" slows a step down but doesn't break it.

## Open items and who owns them

| Item | Owner | Blocks |
|---|---|---|
| A Grok plan that includes Grok Bot | Chris | Everything |
| Retire the Slack bot token and OpenRouter key pasted into a chat on Oct 16 | Chris | The bump identity (Step 11) |
| Which Slack the KPI channel is in; bump identity | Chris (intake) | M1 |
| Pause the Oct 16 Hermes COG bot's posting | Chris, or Justin's team with his OK | M4 |
| A second Grok account for the peptide team, or OK to run it on the business account for now | Chris and Justin | M6 |
| The offer's targets, fulfilment steps, ad rules and "claims we never make" | Chris (peptide intake) | M6 |
| Where call recordings live; the Jeremy Haynes knowledge base link | Chris | M8, M9 |
| The COG call standard, approved in Chris's words | Chris, with the Sales Coach's draft | M9 |
