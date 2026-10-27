# Chris's GrokBot Team

**One main GrokBot that runs a team of AI specialists for Chris's businesses,** starting with Circle of Greatness sales management. The rule it runs by: *AI watches everything. Chris manages the exceptions.*

Built for [Grok Bot](https://x.ai/bot) by xAI. You give this link to your own Grok Bot, and it builds the whole team itself.

## Set it up: one paste

1. Open the **Grok Bot** desktop app. Your Grok plan has to include Grok Bot.
2. Choose **New chat (+) → Create new Bot**.
3. Paste this as its first message:

```text
Build my GrokBot team from this repo: https://github.com/jbellsolutions/wescale-grokbot-team
Read START-HERE.md first and follow it step by step. This is my business account.
Walk me through every step and ask me before anything goes live.
```

It becomes **Chief**, your main GrokBot, and builds the rest. It tells you what it's doing at each step and exactly what to click when it needs you:
- a few sign-ins (Slack, Google, GoHighLevel), done in the Grok Bot app;
- your approval rules, pasted into Settings;
- a short interview: your reps, where EODs land, your KPI channel, cutoffs, targets and no-show rules.

Nothing goes to your team until you've seen five nights of previews and said yes.

**Your personal money** goes on a second Grok account, so the business bots can never see it. Do the same paste there and say "This is my personal account."

## The team

| Bot | What it does for you |
|---|---|
| **Chief** (main GrokBot) | Your one point of contact. The 8:30 AM brief, your inbox and calendar, the approval queue, team health. Routes everything else, and builds new agents with you |
| **COG Sales Manager** | The 11:30 PM EOD check and bump, the 8 AM sales report, no-show, calendar and GHL disposition audits, weekly rep scorecards |
| **Pre-Call Concierge** | A brief for every booked call, and a Jeremy Haynes-style pre-call sequence picked for that prospect, as drafts you approve |
| **Growth Operator** | Turns what happens on calls into scripts, SOPs, objection docs, training, ad hooks and funnel copy, as drafts you approve |
| **CFO** (personal account) | Your private money manager. Read-only |

## What's in here

| Path | What |
|---|---|
| `START-HERE.md` | The build steps your Grok Bot follows, with the tests it must pass |
| `PROJECT_CHARTER.md` | The project: why, goals, who owns what, rules, milestones, risks, decisions |
| `agents/` | One charter per bot, each with the Profile it saves as its standing role |
| `routines/` | Every scheduled job, created paused, switched on only after your yes |
| `skills/` | 22 skills the bots save as private skills |
| `policies/` | What each bot may do alone, what needs your OK, what never happens, and how data is handled |
| `config/` | The COG data contract (`cog.example.json`) and the setup interview |
| `docs/` | KPI definitions, your operator SOP, the build-your-next-agent guide, Slack setup, the Obsidian vault, moving off the Oct 16 Hermes bot |
| `vault/` | The Obsidian vault skeleton (daily reports, rep notes, decisions) |
| `manifest.json` | The team, skills and routines in one file |

The earlier Better than GrokBot edition (Mac app on Orgo, installed by Codex or Claude Code) is kept under the git tag [`btg-edition`](https://github.com/jbellsolutions/wescale-grokbot-team/tree/btg-edition).

## Privacy

This repository is public so the link works for any Grok Bot. Nothing in it is a secret:
- Your facts (reps, Slack IDs, targets) live in `/workspace/cog-team/context/cog.json` on your own Grok Bot computer.
- Reports live in your vault there, backed up to your own Google Drive.
- Keys and tokens go in through hidden prompts, never in chat or in this repo.
