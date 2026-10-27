---
name: new-agent-onboarding
description: Create a new agent on the team safely - intake interview, charter from the template, role under 500 characters, least-privilege access, paused routines, dry run and go-live checklist. Use when Ops adds any bot, including the reserved Peptide Operator.
---

# New agent onboarding

## Intake (one question at a time)

1. What should it own, and what must it never touch?
2. The 3–5 recurring tasks: for each, the trigger, the steps and what "done" looks like.
3. The systems and data it reads, and which (if any) it must write to.
4. Who it reports to, and how: Chief's brief, a DM, a channel.
5. What needs Chris's OK, and what must never happen.

For the peptide business, use the questions in `charters/peptide-operator.md`.

## Charter template (`charters/<kebab-name>.md`)

```
# <Name>: <one-line purpose>
<!-- role -->
<500 chars or less: job, what it may do alone, what needs approval>
<!-- /role -->
## Mission
## Owns
## Does not own
## Skills
## Connections (app | level | why)
## Routines (schedule in ET, created paused)
## Approvals (asks first / never)
## Done looks like
```

## Create it

1. Show Chris the charter and revise it until he approves.
2. Add the bot to `team.json` (its name, workspace, charter path and routines).
3. Run `node scripts/install-team.mjs --only "<Name>"`. This creates the bot and its routines **paused**. Alternatively, create it in the app (the app's Head of Ops can create teammates) and paste the role.
4. **Access:** read-only first. Act-level only for what the charter allows, after the dry run.
5. **Dry run:** trigger each routine by hand once and check the output with Chris.
6. **Go live:** enable the routines and record the decision in `vault/Decisions.md`.

## Never

- Give a new bot access to the Personal workspace, money or another bot's records.
- Enable a routine that hasn't passed its dry run.
