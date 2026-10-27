# Build your next agent: the loop, start to finish

Chris's ask: *"Don't just build shit for me. Teach me how to build ONE agent correctly from beginning → end: Idea → architecture → Claude Code → integrations → data → prompts/instructions → automations → testing → deployment."*

This page is that loop. **The COG Sales Manager is the worked example** at each step. When you build the peptide agent, do the same ten steps. Ops runs it with you (`skills/agent-builder-loop`).

---

### 1. Idea: one sentence, then the recurring tasks

> "This agent ___ so that I don't have to ___."

*COG:* "Watches EODs, calendars and GHL so that I don't have to police 15 reps every night."

Then list the 3–5 tasks you actually repeat. Each one needs:
- a **trigger:** a time, or an event
- the **steps:** what you do today
- **done:** what you'd accept as finished

*COG:* the 11:30 PM EOD check; the morning numbers; no-show follow-up checks; disposition checks; the weekly scorecard.

### 2. Architecture: a new agent, or a skill?

| Same data, same owner, same approvals? | → a **skill** of an existing agent |
|---|---|
| Different data, different audience, different risk? | → a **new agent** |

*COG:* your seven jobs (KPI Monitor, Calendar Monitor, GHL Auditor…) all use the same data and report to you, so they're **seven skills of one agent**. Growth assets need different tools and approvals, so that's a separate agent. Jeremy Haynes material is knowledge, not a job, so it's a skill.

### 3. Charter: the agent's job description

Copy the template in `skills/new-agent-onboarding/SKILL.md`. The parts that matter most:
- **Owns / does not own:** stops two bots fighting over the same thing.
- **Approvals:** what it may do alone, what asks first, what never happens.
- **Done looks like:** how you'll know it's working.

*COG:* `charters/cog-sales-manager.md`.

### 4. Role: the 500-character version

The app gives each bot a role of 500 characters or less. It reads that in every conversation. Squeeze the charter into: **job + what it may do alone + what needs approval.**

*COG:* the `<!-- role -->` block at the top of its charter.

### 5. Claude Code: let it do the typing

Open Claude Code in this package folder and say:

> "Add a new agent called Peptide Operator. Use docs/BUILD-YOUR-NEXT-AGENT.md and the intake in charters/peptide-operator.md. Interview me, write the charter and skills, add it to team.json, run scripts/verify.mjs, then install it with scripts/install-team.mjs --only 'Peptide Operator'."

That covers steps 3–8 for you while you answer questions. Same loop, faster hands.

### 6. Integrations: connect read-only first

List every app the agent needs. Connect each at **read** first, and prove it by having the bot quote one real record.

*COG:* Slack (KPI channel history), Sheets (EOD form), Calendar, GoHighLevel. The Oct 16 Slack problem, no channel history, would have been caught right here.

### 7. Data: the facts it depends on

Write down every ID, field name and threshold the agent needs, in a config file. **If something's missing, the agent must stop and say `NO_CLIENT_SOURCE`, not guess.**

*COG:* `config/cog.json`: roster, EOD field map, KPI channel, cutoffs, dispositions, no-show SOP, targets.

### 8. Instructions: one skill per recurring task

Each `SKILL.md` has:
- when to use it
- the steps
- the exact output format
- a **Never** list

Write it so a new hire could follow it. Two rules always go in:
- **Unknown is not zero.** A source it can't read is "unknown".
- **Every claim names its source.**

*COG:* `skills/cog-eod-compliance/SKILL.md`.

### 9. Automations: routines, created paused

Turn each trigger into a routine (daily, weekdays, weekly or once) and **create it paused**.

*COG:* 9 routines, at 23:30, 00:45, 08:00, the 12/15/18/21 sweeps, and Monday 08:30.

When a tool can't do what you need, name it as **the tool's limit**, not your design. *COG:* routines can't fire "within 5 minutes of a no-show", so sweeps cover it for now and a webhook comes later. The requirement didn't shrink.

### 10. Testing and deployment: dry run, then your OK

1. Run every routine as drafts-to-you for a few days.
2. Mark each output right or wrong. Fix the config and skills until two runs in a row are right.
3. Turn routines on, and give **act** access only where the charter allows.
4. Write the go-live decision in `vault/Decisions.md`.

*COG:* five dry-run nights, then the one standing approval for the EOD bump.

---

**You've done it once when:** the peptide agent exists, its routines are on, it passed its dry run, and you did steps 1–4 and 6–10 yourself.
