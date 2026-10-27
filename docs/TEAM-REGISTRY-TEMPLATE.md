# Team registry template

Chief copies everything below the line into `/workspace/cog-team/context/team-registry.md` at setup (`START-HERE.md` Step 1) and keeps it current. **Chief is the only writer.** The registry is how the team's health is checked: `team-health-check` reads the routines table and the run log, and anything marked ON that was due and has no run-log line is reported as "didn't run, paused?".

Rules for the registry:
- One row per bot, routine, connection and secret. Update the row the same day anything changes.
- **Never write a secret's value here.** Only its name and where it is stored.
- Times are Eastern. Dates are `YYYY-MM-DD`.
- The routine states mean:
  - `DRAFT`: the prompt file exists in `routines/` but nobody has created the routine in Grok Bot yet
  - `PAUSED`: created, and paused
  - `TEST`: listed as `test` in `routines-on.md`; every message goes to Chris only
  - `ON`: listed as `on` in `routines-on.md` and resumed
- `Last run` is the newest line for that routine in `/workspace/cog-team/log/runs-<YYYY-MM>.md`: time and result word.

---

# Team registry

Last updated: `YYYY-MM-DD` by Chief · Repo commit the private skills were saved from: `<short hash>`

## Bots

| Name | Account | Charter | Created | State |
|---|---|---|---|---|
| | business or personal | `agents/NN-name.md` | `YYYY-MM-DD` | PLANNED, READY, PAUSED or RETIRED |

## Routines

| Name | Owner | WHEN (Eastern) | File | State | Last run |
|---|---|---|---|---|---|
| | bot name | e.g. Every day at 8:30 AM | `routines/<name>.prompt` | DRAFT, PAUSED, TEST or ON | `YYYY-MM-DD HH:MM RESULT` |

## Connections

| App | Account signed in | Scope | Checked on |
|---|---|---|---|
| e.g. Slack | which workspace, signed in as whom | read-only, drafts only or post (say which) | `YYYY-MM-DD` and what was read |

## Secrets

Names and places only. The values live in a secure secret request, or in a file only the bot's computer user can read. They never appear here, in chat, in notes or in Git.

| Name | Where stored | Used by | Set on |
|---|---|---|---|
| e.g. `SLACK_BOT_TOKEN` | `~/.config/cog-team/slack.env` (mode 600) | COG Sales Manager | `YYYY-MM-DD` |

## Standing approvals

The record is `/workspace/cog-team/context/standing-approvals.md`: the date, Chris's words and the exact template. Don't copy the wording here. Currently: none.
