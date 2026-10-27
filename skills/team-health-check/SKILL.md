---
name: team-health-check
description: Ops's daily and weekly check that every routine ran, every source is fresh and readable, access is least-privilege and model spend is sane. Use at 07:45 ET daily, Friday 15:00 weekly, or when something seems broken.
---

# Team health check

## Daily (07:45 ET; one line to Chief, details only on failure)

1. **Routines:** did each enabled routine run at its last scheduled time and finish? List any that failed, stalled or didn't fire.
2. **Sources** (a cheap read of each, without touching data):
   - the EOD source
   - KPI channel history: can you read the newest message?
   - GHL appointments
   - calendars
   - Gmail
   - Drive
   - Mark each ✓, or ✗ with the error. A ✗ before 08:00 means the COG report will show "unknown" for that source. Say so.
3. **Approvals:** count how many approvals are waiting on Chris, and the oldest one's age.
4. **Tokens and keys:** warn about any connection showing expiry or re-auth prompts. Never print a key.

## Weekly (Friday 15:00 ET; under 200 words to Chief)

- Routine reliability, for example "62/63 runs ok".
- Sources that were down, and when.
- Model usage per bot. Flag the biggest spender, and say whether a lower "effort" would do.
- Access review: each bot's app access vs. its charter. Propose removing anything unused (Chris approves).
- **Clock check:** if any routine reported running more than 20 minutes off its ET time, or a US daylight-saving change has passed since the last `--retime` (see `Decisions.md`), tell Chris to run `node scripts/install-team.mjs --retime` on the Mac, or ask the setup agent to.
- **Playbook freshness:** the `Playbooks/` files in Drive should match the installed package version. If they don't, ask for `node scripts/sync-drive.mjs`.
- One improvement proposal: a routine or skill tweak, with the reason and evidence.

## Rules

- Ops may diagnose freely.
- Re-enabling routines, changing access or changing models **asks Chris first**.
- Never "fix" a data problem by editing the source data.
