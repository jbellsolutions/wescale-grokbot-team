# Migration: the Oct 16 Hermes "COG bot" on Orgo

**What exists:** during the Oct 16 session, a COG Sales Manager was set up as a Hermes agent on an Orgo computer in Chris's workspace, connected to WeScale Slack, using OpenRouter (GLM 5.3 Flash). The open problems at the end of that session:
- Slack channel **history** access was missing
- an "access denied" issue
- the Circle of Greatness workflow was waiting for input

On Oct 27 Chris reported he was "still stuck with the COG bot to do the daily tasks".

**Goal:** one active COG bot, so the KPI channel never gets two bumps.

## Steps for the setup agent

1. **Inspect, read-only.**
   - Check Chris's Orgo workspace: list the computers, find the one running Hermes with the COG Sales Manager, and note its name and ID.
   - On that computer, check for anything worth keeping: skills or notes Chris wrote, Jeremy Haynes files (`~/.hermes/…` or the repo folder), cron/routines.
   - Don't change anything yet.
2. **👤 Ask Chris:**
   > "Your Oct 16 COG bot is on Orgo computer <name>. Do you want the new COG Sales Manager to **reuse that computer** (keeps its files; saves a computer) or **start fresh** (cleanest)?"
3. **If he picks reuse:**
   - After `install-team.mjs`, assign that computer to the COG Sales Manager with the app's existing-computer option: `PATCH /api/bots {"botId": "<COG Sales Manager id>", "computerId": "<orgo computer id>"}`.
4. **Either way:**
   - Stop the Hermes agent's scheduled jobs and its Slack gateway on that computer, so it stops answering in Slack.
   - Remove or disable its old Slack app in WeScale *after* the new Slack setup works (`INSTALL.md` step 5).
   - Don't delete files. Archive them in a folder on that computer named `archive-hermes-2026-10-16/`.
5. **Copy anything useful** into the new team:
   - the Jeremy Haynes KB link → `config/cog.json`
   - any rep list or channel IDs → confirm them in the intake
6. Record the decision in `vault/Decisions.md`: "Hermes COG bot retired / computer reused on <date>".

**Check:** only the new COG Sales Manager answers in Slack. The KPI channel gets at most one bump per check.
