# Project charter: Chris's GrokBot team

| | |
|---|---|
| Client | Chris, WeScale Marketing |
| First business served | Circle of Greatness (COG) sales team, 10–15 closers and setters today, growing to 20–50 |
| Sponsor and builder | Justin Bellware, AI Integraterz / Using AI to Scale |
| Platform | **Better than GrokBot** (self-hosted Mac app, bots on Orgo cloud computers). A Grok Bot (xAI) edition is built from the same files: `grok-bot/` |
| Status | Phase 1 spec complete, ready to install |
| Charter date | 2026-10-27 |

## 1. Why this project exists

Chris manages the COG sales floor by hand. Every night he checks who posted their EOD KPIs. Every morning he rebuilds the numbers. All day he audits calendars, no-shows and GoHighLevel dispositions for 10–15 reps. He also runs WeScale, a peptide business and his own finances.

On Oct 16 an agent was started on Hermes/Orgo. By Oct 27 Chris reported: *"I'm still stuck with the COG bot to do the daily tasks."* He has the pieces, but not a working system or an SOP for running one.

**This project gives him a single link that installs a working AI team, and plain-English SOPs to run it.** The rule underneath it, in Chris's words: *"AI watches everything. Chris manages the exceptions."*

## 2. Objectives (what "done" means)

1. **One main GrokBot ("Chief")** Chris can talk to about anything: in the app, in Slack, by text or email. It answers or hands the work to the right specialist, then reports back.
2. **COG sales management runs without Chris policing it:**
   - Nightly EOD compliance with automatic bumps.
   - A morning sales report he trusts as the single source of truth.
   - No-show and disposition audits.
   - A weekly rep scorecard.
3. **Assets get built, not just suggested.** Scripts, SOPs, follow-ups, objection docs, training and funnel copy are produced as drafts Chris approves.
4. **Prospects arrive warm.** Every booked call gets a pre-call brief and a Jeremy Haynes-style indoctrination sequence, drafted for approval.
5. **Personal finances are visible.** A separate, read-only CFO answers "how much free cash do I actually have?"
6. **Chris can build the next agent himself.** The Ops bot walks him through the loop: idea → charter → skills → connections → routines → test → go live.
7. **Installable by link.** Chris pastes one message into Claude Code or Codex. The setup agent installs the app, loads the team, interviews him for the facts, connects tools and proves it works.

## 3. Scope

**In scope (Phase 1–2)**
- The Better than GrokBot install on Chris's Mac.
- The COG team (Chief, Ops, COG Sales Manager, Growth Operator, Pre-Call Concierge) in one workspace.
- A separate "Personal" workspace for the CFO.
- Connections: Slack (WeScale workspace), Google Calendar, Google Sheets, Gmail, GoHighLevel, through Composio or a direct API where Composio falls short.
- The KPI data contract, rep roster, compliance score and the reports above.
- Chris's operator SOP, and a "build your next agent" guide.
- An Obsidian-format vault of daily reports and rep notes, with the app's memory (Honcho) layered on top.

**Out of scope for now (named so they aren't lost)**
- **The peptide business agent.** The meeting decision was "separate agent." It has a reserved slot (`charters/peptide-operator.md`), and Ops creates it after a short intake.
- **The WeScale agency operator** (client reporting, campaign monitoring, billing). The same pattern applies; it comes after COG is stable.
- **Real-time, minute-level no-show alerts.** The app's routines run daily, on weekdays, weekly or once. Phase 1 uses sweeps every 3 hours. Minute-level alerts need a GoHighLevel webhook, which is milestone M7.
- Moving money, sending to prospects without approval, changing CRM records without approval.

## 4. Deliverables

| # | Deliverable | File(s) |
|---|---|---|
| D1 | Project, team and six agent charters | `charters/` |
| D2 | 20 skills (platform-neutral `SKILL.md`) | `skills/` |
| D3 | Team definition the installer loads | `team.json` |
| D4 | COG data contract + intake interview | `config/cog.example.json`, `config/intake-interview.md` |
| D5 | KPI and compliance-score definitions | `docs/KPI-DEFINITIONS.md` |
| D6 | Permissions and approval policy | `policies/permissions.md` |
| D7 | Self-install path (setup agent + Chris) | `README.md`, `START-HERE.md`, `AGENTS.md`, `INSTALL.md`, `scripts/` |
| D8 | Operator SOP (what Chris does daily/weekly) | `docs/OPERATOR-SOP.md` |
| D9 | Build-your-next-agent guide (the "ONE thing") | `docs/BUILD-YOUR-NEXT-AGENT.md` |
| D10 | Migration from the Oct 16 Hermes COG bot | `docs/MIGRATION-FROM-HERMES.md` |
| D11 | Obsidian vault skeleton and templates | `vault/` |
| D12 | Grok Bot (xAI) edition | `grok-bot/` |

## 5. Milestones and dependencies

No dates. Each milestone is done when its proof passes.

| Milestone | Depends on | Proof it's done |
|---|---|---|
| **M1 Installed** | Chris's Mac (Node 24+, Git), an OpenRouter or OpenAI key, an Orgo key | App opens at `localhost:3210`; the lead replies to "hello" |
| **M2 Team loaded** | M1 | `node scripts/install-team.mjs` reports all bots created and routines created **paused**; `scripts/verify.mjs` passes |
| **M3 Facts captured** | M2, the intake interview with Chris | `config/cog.json` filled: roster, KPI source + field map, KPI channel, cutoffs, targets, no-show SOP, time zone |
| **M4 Read-only connections** | M3, Chris authorizes Composio apps | COG Sales Manager reads the KPI source, the KPI Slack channel history, calendars and GHL appointments, and quotes one real record from each |
| **M5 Dry-run week** | M4 | Five consecutive nights where EOD compliance and the morning report are produced as **drafts only**, and Chris marks them accurate |
| **M6 Live accountability** | M5, Chris's written OK for the standing pre-approval | Nightly bumps post to the KPI channel unattended. Everything else still asks first |
| **M7 Real-time no-show alerts** | M6, a GHL webhook or a public URL (`edge/`) | A test no-show produces an alert within the SOP window |
| **M8 Growth + Pre-Call live** | M4, Jeremy Haynes knowledge-base link | One asset and one pre-call sequence drafted from real call data and approved |
| **M9 Personal CFO** | M1; bank/card read-only source chosen by Chris | "How much did I spend this month?" answered from his own data in the Personal workspace |
| **M10 Chris builds an agent** | M2 | Chris, guided by Ops, creates the peptide agent from its intake without Justin |

## 6. Success measures

- **Nightly:** Chris no longer checks the KPI channel by hand. Missing-EOD bumps go out on time on every night of the dry-run and live weeks.
- **Morning:** the report reconciles KPI-form numbers against GHL. Every discrepancy is listed, and none is silently trusted.
- **Accuracy:** in the dry-run week, Chris finds no flag that was wrong without being marked "unverified".
- **Time:** Chris's manual sales-admin time drops to reviewing exceptions only. He records his own before and after estimates in the vault.
- **Independence:** Chris completes M10.

## 7. Roles

| Who | Responsibility |
|---|---|
| Chris | Owner and approver. Answers the intake, authorizes connections, approves drafts, decides on graduated autonomy |
| Justin | Builder and coach. Runs or supports the install, reviews the dry-run week |
| Setup agent (Claude Code / Codex on Chris's Mac) | Does the technical install per `AGENTS.md`, never handles money or prints keys |
| Chief | Main GrokBot: runs the team, the inbox/calendar and the morning brief |
| Ops | Team health, routines, onboarding new agents, teaching Chris the build loop |

## 8. Risks and how they're handled

| Risk | Handling |
|---|---|
| **Wrong facts** (rep names, KPI fields) produce wrong accusations | Nothing goes live before M3 and the M5 dry-run week. Every flag cites its source. A disconnected source is reported as *unknown*, never as zero |
| **Public shaming of a rep by mistake** | Bumps use one fixed, factual template. They run only after M5, only in the named KPI channel, and only to reps on the roster |
| **Slack history not readable** (the Oct 16 blocker) | Better than GrokBot's Slack manifest includes `channels:history` and `groups:history`. The bot must be invited to the KPI channel. The install verifies it can read one past message |
| **Two half-working COG bots** (old Hermes plus new) | `docs/MIGRATION-FROM-HERMES.md`: inspect, reuse the Orgo computer if wanted, pause the Hermes routines, keep one |
| **Clock drift.** Chris's clock is UTC-5 all year (no daylight saving); the team runs on Eastern | All schedules are written in ET and converted to the app's clock. The installer prints the date the clocks drift apart (2026-11-01 for a UTC-5 clock). `--retime` re-fits the routines, and every routine run checks the real ET time and tells Ops if it is off |
| **KPI channel in COG's Slack, app in WeScale** (the Oct 16 install went into WeScale; COG's Slack needs admin rights) | The intake asks which workspace. The COG Sales Manager reads COG's Slack through Chris's own connection there. Admin approval is requested only if COG's Slack demands it |
| **Cost overrun on models** | The default model is cheap (GLM 5.3 Flash via OpenRouter, per the Oct 16 setup). Heavy work is set per bot under "effort". OpenRouter auto top-up stays off |
| **Private financial data seen by business bots** | The CFO lives in a separate workspace with its own memory and no business-bot access. It is read-only, and no credentials are stored in notes |
| **The app changes upstream** | The installer checks API responses and fails loudly. `INSTALL.md` tells the setup agent to read the app's own `INSTALL.md` first |
| **Chris overwhelmed again** | One link to install, one SOP page, one place to look each morning (Chief's brief), and a Loom-style walkthrough script in `docs/OPERATOR-SOP.md` |

## 9. Decisions made, and decisions open

**Made**
- **Orgo computers:** Oct 6 agreed a four-computer plan, with business and personal separate. Some slots may already run the Co-Founder, Revenue Partner or the Oct 16 COG bot. This team needs **1 at minimum** (every HQ bot shares Chief's) and **3 ideally**: Chief, COG Sales Manager, Personal. The setup agent takes stock first (`INSTALL.md` step 1), and Chris chooses what fits.
- **One shared home: Google Drive "GrokBot Vault".** Playbooks, Chris's config and the vault live there, so bots on different cloud computers never drift apart. The CFO uses "GrokBot Personal", ideally in a different Google account.
- **Pre-Call and the EA work are in from the start, as drafts.** On Oct 16 Justin suggested keeping them in ChatGPT for now. The Oct 27 brief asks for one GrokBot that does everything, so they're included, but they go live after COG (M8).
- **Platform: Better than GrokBot.** It self-installs from a link, gives one lead bot plus specialists, and runs on Chris's Mac and Orgo account. The Grok Bot edition stays available.
- **COG gets one accountable Sales Manager bot.** Chris's KPI Monitor, Calendar Monitor, GHL Auditor, No-Show Auditor, Disposition Auditor, Data Analyst and Slack Accountability jobs are **skills of that one bot**, not seven bots. This keeps one owner for the numbers and one report.
- **Growth Operator is separate** from the Sales Manager. One watches the team; the other builds assets. Different tools, different approvals.
- **Jeremy Haynes material is a skill** (`jeremy-haynes-precall-playbook`), not an agent, per the Oct 16 meeting.
- **The peptide business and personal finance are separate** from COG, per the Oct 16 meeting.

**Open (asked in the intake)**
1. **Bump identity:** post nightly bumps as the COG Sales Manager bot (recommended, no extra token) or as Chris's own Slack account (needs a Slack *user* token)?
2. The final EOD cutoff time (the spec assumes 1:00 AM ET with a final check at 12:45 AM ET).
3. Where EOD KPI forms land (Google Form → Sheet, Slack workflow, GHL form or other) and the exact fields.
4. The daily and weekly targets used for "team total vs. target".
5. The no-show SOP window. The spec assumes 2 calls + 1 text + setter notified + GHL updated within 10 minutes.
6. Whether to reuse the Oct 16 Orgo computer for the COG Sales Manager.
7. Which Slack workspace the KPI channel lives in (WeScale or COG's own).
8. Whether Chris has a separate personal Google account for the CFO.
