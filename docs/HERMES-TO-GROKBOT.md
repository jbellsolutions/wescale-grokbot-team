# Moving from the Oct 16 Hermes COG bot to Grok Bot

**What exists:** on Oct 16, a COG Sales Manager was set up as a Hermes agent on an Orgo computer in Chris's workspace, connected to WeScale Slack. The open problems at the end of that session:
- Slack channel **history** access was missing
- an "access denied" issue
- the Circle of Greatness workflow was waiting for input

On Oct 27 Chris said the COG bot still wasn't doing the daily tasks.

**Goal:** one active COG bot, so the KPI channel never gets two bumps. Nothing on Hermes is switched off until its Grok Bot replacement has proven itself and Chris says yes.

## What Grok Bot can't do here

Grok Bot can't reach Orgo. Chief can't open that computer, list the Hermes bot's jobs or pause them. Inspecting and pausing the Hermes bot is an **Owner step**: Chris does it, or Justin's team does it with Chris's OK. Chief asks, waits, and writes down the answer.

## Steps for Chief

1. **Ask Chris** (`START-HERE.md` Step 8): "Is your Oct 16 COG bot on Hermes still running anything? Does it post in the KPI channel?"
2. **Owner step: inspect, read-only.** Chris (or Justin's team, with his OK) asks the Hermes bot, wherever he talks to it: "List your scheduled jobs, say which are paused, and say which Slack channels you post in." He pastes the answer into Chief's chat. Chief writes it to `/workspace/cog-team/context/hermes-jobs.md`. Nothing is changed yet.
3. **Preview first.** Until Step 11, `context/eod-mode.md` says `preview`: the Grok Bot team sends Chris the table and the bump it *would* post, and posts nothing. If Hermes is still bumping, Chief puts both side by side in the brief and marks every difference, so Chris can see which one is right. Hermes keeps running exactly as it is.
4. **Before the bump goes live** (`START-HERE.md` Step 11), the Hermes bot must stop posting. **Owner step:** Chris (or Justin's team, with his OK) asks it: "Pause the EOD jobs and your Slack posting. Don't delete them." Then asks again: "List your scheduled jobs." The list must show them paused. Chief writes it to `hermes-jobs.md`.
   - If the Grok Bot team will reuse the "COG Sales Manager" Slack app from Oct 16 (`docs/SLACK-SETUP.md`), Hermes holds the same bot token. Pause Hermes first, or both will post under one name.
5. **Only then** Chris says yes to the standing approval and `eod-mode.md` goes to `live`. **Never two bots bumping.** The COG Sales Manager also reads the KPI channel before it posts, and stops if another bot has already posted that night's bump.
6. **Watch** the first three live nights. If anything is off, set `eod-mode.md` back to `preview`. Don't resume the Hermes jobs unless Chris decides to, and never while the mode is `live`.
7. **Archive, don't delete.** On the Orgo computer, files go in a folder named `archive-hermes-2026-10-16/`. Nothing is removed.
8. **Copy anything useful** into the new team:
   - the Jeremy Haynes knowledge base link → `cog.json` → `knowledge.jeremy_haynes_kb_url`
   - any rep list or channel IDs → confirm each one with Chris in the intake. Never trust them as they are.
9. Record the decision in `/workspace/cog-team/vault/Decisions.md`: "Hermes COG bot paused / archived on <date>".

**Check:** only the COG Sales Manager posts in the KPI channel. The channel gets at most one bump per check.

## The Orgo computer afterwards

It keeps existing until Chris decides otherwise. Once the Grok Bot team has run a month cleanly, he decides: keep it as a backup, or stop it. Before stopping it, ask the Hermes bot to export its memory and skills to Drive.
