# Chris's GrokBot Team

**One main GrokBot that runs a team of AI specialists for Chris's businesses.** It starts with Circle of Greatness sales management. The rule it runs by: *AI watches everything. Chris manages the exceptions.*

Built for [Better than GrokBot](https://github.com/jbellsolutions/better-than-grokbot) on Chris's Mac, with each bot working on its own Orgo cloud computer. A [Grok Bot (xAI) edition](grok-bot/) uses the same charters and skills.

## Install by dropping the link

Open **Claude Code** or **Codex** on your Mac and paste:

```text
Install my GrokBot team from https://github.com/jbellsolutions/wescale-grokbot-team

Read AGENTS.md and follow INSTALL.md step by step. Install Better than GrokBot if it isn't
already running, load my team, interview me for the facts it needs, connect my tools read-only
first, and keep every key out of the chat, logs and Git. Keep all routines paused until the
dry run passes. Finish only when the INSTALL.md acceptance tests pass, then tell me in plain
English what works and what's waiting on me.
```

It will ask you for:
- your keys (OpenRouter, Orgo, Composio), typed into a hidden prompt
- a few sign-ins (Slack, Google, GoHighLevel)
- a short interview: your reps, where EODs land, your KPI channel, targets and cutoffs

Everything else it does itself.

## The team

| Bot | What it does for you |
|---|---|
| **Chief** (main GrokBot) | Your one point of contact. Inbox, calendar, the 8:30 AM brief, and it routes everything else |
| **COG Sales Manager** | The 11:30 PM EOD check and bumps, the 8 AM sales report, no-show and disposition audits, weekly rep scorecards |
| **Growth Operator** | Turns what happens on calls into scripts, SOPs, follow-ups, objection docs, training, ad hooks and funnel copy, as drafts you approve |
| **Pre-Call Concierge** | A brief for every booked call, and a Jeremy Haynes-style pre-call sequence picked for that prospect |
| **Ops** | Keeps the team healthy, and teaches you to build the next agent |
| **CFO** (Personal workspace) | Your private money manager. Read-only |

## What's in here

| Path | What |
|---|---|
| `START-HERE.md` | **Chris, start here.** Plain English: install, first week, daily routine |
| `INSTALL.md` | The step-by-step walkthrough the setup agent follows, with acceptance tests |
| `AGENTS.md` / `CLAUDE.md` | The brief for Claude Code / Codex |
| `charters/` | Project charter, team charter, one charter per agent |
| `skills/` | 20 skills (`SKILL.md`), one per recurring job |
| `team.json` | The bots, workspaces and 16 routines the installer creates |
| `config/` | The COG data contract (`cog.example.json`) and the intake interview |
| `policies/permissions.md` | What each bot may do alone, what needs your OK, what never happens |
| `docs/` | KPI definitions, your operator SOP, the build-your-next-agent guide, migration from the Oct 16 Hermes bot |
| `vault/` | The Obsidian vault skeleton (daily reports, rep notes, decisions) |
| `scripts/` | `install-team.mjs` (loads the team into the app), `verify.mjs` (package checks) |
| `grok-bot/` | How to load the same team into Grok Bot (xAI) instead |

## Privacy

This repository holds no rep names, Slack or GHL IDs, revenue figures or keys:
- Your facts live in `GrokBot Vault/Config/cog.json` in your own Google Drive, uploaded from a git-ignored local file.
- Reports live in your own Google Drive vault.
- Keys live in the app's protected key store.

The repository is public so the install link works from any Mac without a GitHub login. It describes the team and how it works. Nothing in it is a secret: everything private stays in your Drive and on your Mac.
