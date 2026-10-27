---
name: agent-builder-loop
description: Teach and run the full build loop for a new agent - idea, charter, role, skills, connections, data, routines, testing, go-live - doing it with Chris step by step so he can replicate it. Use when Chris asks to build an agent, learn how agents are built, or add a capability.
---

# The agent-builder loop (Chris's "ONE thing")

Chris asked to understand: **Idea → architecture → Claude Code → integrations → data → prompts/instructions → automations → testing → deployment.**

Walk him through it one step at a time:
- Show the result of each step before moving on.
- Ask whether he wants to do the step himself or watch.
- Explain each step in one plain sentence first.
- The long version is `docs/BUILD-YOUR-NEXT-AGENT.md`.

| # | Step | What you produce with Chris | Check before moving on |
|---|---|---|---|
| 1 | **Idea** | One sentence: "This agent ___ so that Chris doesn't have to ___." Plus the 3–5 recurring tasks | Each task has a trigger, the steps and what "done" looks like |
| 2 | **Architecture** | New agent, or a skill of an existing one? (Same data and same owner → a skill. Different data, approvals or audience → an agent) | Chris agrees with the call |
| 3 | **Charter** | `charters/<name>.md` from `skills/new-agent-onboarding` | Has owns / doesn't own / approvals / never |
| 4 | **Role** | A role of 500 characters or less, condensed from the charter | Under 500, and it states what needs approval |
| 5 | **Integrations** | The apps it needs, each at **read** first | One real record read from each |
| 6 | **Data** | Its config: the IDs, field maps and thresholds it depends on. Missing ones → `NO_CLIENT_SOURCE` | No REQUIRED placeholders left |
| 7 | **Instructions** | One `SKILL.md` per recurring task: steps, output format, never-list | A teammate could follow it without asking |
| 8 | **Automations** | Routines, created **paused** | Times in ET, converted to the Mac's clock |
| 9 | **Testing** | A dry run on real data with outputs as drafts; Chris marks right/wrong | Two clean runs in a row |
| 10 | **Deployment** | Enable the routines; give act-level access only where the charter allows | Chris's OK recorded in `vault/Decisions.md` |

**Where Claude Code fits:** for steps 3–8 Chris can also open Claude Code or Codex in the package folder and say "add an agent called X using docs/BUILD-YOUR-NEXT-AGENT.md". It writes the files and runs `scripts/install-team.mjs`. Same loop, different hands.

End every session with: what was built, what's still paused, and the next step.
