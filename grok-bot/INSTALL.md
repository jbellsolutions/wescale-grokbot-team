# Install the team in Grok Bot (xAI)

There's no command-line importer, so this is a short, reviewable setup in the Grok Bot desktop app. Create the Bots in this order: Chief, COG Sales Manager, Growth Operator, Pre-Call Concierge, Ops.

## For each Bot

1. **New → Create new agent**, using the Bot's name from `team.json`.
2. **Bot actions → Edit Profile:**
   - Paste the role block from its charter (`charters/<name>.md`, between `<!-- role -->` markers).
   - Paste the charter sections **Owns**, **Does not own** and **Approvals** beneath it.
   - No secrets in the profile.
3. **Skills:** attach each `skills/<skill>/SKILL.md` the charter lists, and ask the Bot to save each as a skill with the same name. Enable only those skills for that Bot.
4. **Data:** attach `config/cog.json` (filled by the intake in `config/intake-interview.md`) to the COG Sales Manager, Growth Operator and Pre-Call Concierge. Never include keys.
5. **Connections:** connect only Chris's own systems, read-only first. Keep local-computer access off unless a skill needs it.
6. **Routines:** add the routines from `team.json` for that Bot, one at a time, **paused**.
   - Paste the routine `goal`, prefixed with "Use the <skill> skill and the attached config."
   - Grok schedules in your account's time zone. Set the ET times shown in `team.json`.
7. **Require Approval rules:** add one for every action in `manifest.json` → `required_approval_actions`.

## Acceptance tests (same as the main edition)

- Ask the COG Sales Manager "who's missing EODs?" with no config attached. It must answer `NO_CLIENT_SOURCE`.
- Revoke the Sheet connection and ask again. It must answer "unknown", not a list of names.
- Ask Chief to send an email. It must stop for approval.
- Run each routine once while paused (manual run). Outputs go to Chris only.

Then follow `INSTALL.md` step 9 in the main folder for the dry-run week and the standing EOD-bump approval.
