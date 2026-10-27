---
name: agent-builder-loop
description: Teach and run the full build loop for a new Grok Bot agent - idea, architecture, charter, create the bot, skills, apps, data, routines, test, go-live - doing it with Chris step by step so he can replicate it. Use when Chris asks to build an agent, learn how agents are built, or add a capability.
---

# The agent-builder loop (Chris's "ONE thing")

Chris asked to understand the whole chain, from the idea to a running agent: **Idea → architecture → build → integrations → data → prompts/instructions → automations → testing → deployment.** On Grok Bot, Chief does the typing. Chris answers questions and does the Owner steps (sign-ins, secrets, the Settings screens).

Walk him through it one step at a time:
- Show the result of each step before moving on.
- Ask whether he wants to do the step himself or watch.
- Explain each step in one plain sentence first.
- The long version is `/workspace/cog-team/repo/docs/BUILD-YOUR-NEXT-AGENT.md`.

| # | Step | What you produce with Chris | Check before moving on |
|---|---|---|---|
| 1 | **Idea** | One sentence: "This agent ___ so that Chris doesn't have to ___." Plus the 3–5 recurring tasks (intake in `new-agent-onboarding`; for the peptide business, `/workspace/cog-team/repo/agents/90-reserved-peptide-operator.md`) | Each task has a trigger, the steps and what "done" looks like |
| 2 | **Architecture** | New bot, or a skill of an existing one? (Same data, same owner, same approvals → a skill. Different data, approvals or audience → a bot.) Then which Grok account: every bot on one account shares one computer, its files and its logins, so a bot whose data or logins must stay apart needs its own Grok account | Chris agrees with the call |
| 3 | **Charter** | A new file `/workspace/cog-team/repo/agents/NN-name.md` (next free number below 90) from the template in `new-agent-onboarding`, with a **Profile** block and a **Memory seed** | Has owns / does not / approvals / never. The Profile says what needs approval |
| 4 | **Create the bot** | **New chat (+) → Create new Bot**, rename it by clicking its name, then send it the setup message from `/workspace/cog-team/repo/START-HERE.md` Step 7 with its charter file filled in | It replies "ready" and has saved its Profile |
| 5 | **Skills** | One `SKILL.md` per recurring task (steps, output format, never-list, absolute `/workspace/...` paths), saved as **private skills**. Private skills are one library shared by every bot on the account, so enable each for its bot: Connect apps → the connected count → Private skills | A teammate could follow each one without asking |
| 6 | **Apps** | **Connect apps** (sidebar) → search → Add, **read-only first**. Anything it needs to write comes later, from the charter | The bot quotes one real record from each app |
| 7 | **Data** | Its config in `/workspace/cog-team/context/`: the IDs, field maps and thresholds it depends on. Missing ones → `NO_CLIENT_SOURCE` | No REQUIRED placeholders left |
| 8 | **Routines** | One prompt file per routine in `/workspace/cog-team/repo/routines/`, copied from an existing one. The owning bot creates each in Grok Bot **paused** (a routine belongs to the bot that creates it), in Eastern Time | Each is in `/workspace/cog-team/context/team-registry.md` as PAUSED, with its owner and WHEN |
| 9 | **Test** | Add `<routine name>: test` to `/workspace/cog-team/context/routines-on.md`, press **Test** on the bot's **Details** tab, and mark the output right or wrong. In test mode every message goes to Chris only | Two clean runs in a row, one run-log line each |
| 10 | **Chris's yes, then the registry** | His yes in his own words → `<routine name>: on` in `/workspace/cog-team/context/routines-on.md`, the owning bot **resumes** the routine, registry rows updated, decision written to `/workspace/cog-team/vault/Decisions.md` | Chris's words are in `Decisions.md` and the registry says ON |

**Name the tool's limit as the tool's limit.** Grok Bot caps a bot at 50 routines, wants schedules at least 5 minutes apart, and may pause routines after a long absence. Routines run on a schedule or an event, so "within minutes of an appointment" needs a webhook, not a sweep. If a limit blocks what the agent needs, say so and propose another tool. Don't shrink the requirement.

**Who does what:** you (Chief) write the charter, skills, config and routine files, and you create the bot. Chris signs in to apps, fills secrets with **Take over**, and adds Auto-review rules. If you can't create the bot yourself, give him the **Owner step** wording from `/workspace/cog-team/repo/START-HERE.md` Step 7.

End every session with: what was built, what's still paused, and the next step.
