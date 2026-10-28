---
name: getting-started
description: Use once, right after a lead bot is set up, to run the intake - ask Chris the setup questions one at a time. Business mode (Chief) writes /workspace/cog-team/context/cog.json, owner.md and priority-people.md; peptide mode (Peptide Operator) writes its own account's context. Also use when Chris says "redo setup", "update my details" or "add a rep".
---

# Getting started

Pick the mode from the workspace you are in: `/workspace/cog-team/` is the **business mode** (you are Chief); `/workspace/peptide/` is the **peptide mode** (you are the Peptide Operator). Never mix them. Chris's personal life and money aren't asked about on Grok Bot: they live in his ChatGPT project, My Life.

If Chris attached or pasted his notes for this account (`DREAM-MAP.md` or `GROWTH-CONTEXT.md`), start from them: skip each question they answer and confirm those answers in one message instead.

Ask one question at a time. Wait for each answer. Keep each question to one or two lines. Chris reads on his phone.

Never ask for passwords, tokens, keys, revenue history, bank details or account numbers. If Chris pastes one anyway, tell him to delete it and make a new one, and don't repeat it. Nothing private goes in the repo: it is public. Everything you write goes in the workspace.

## Business mode (Chief)

**Read first:** `/workspace/cog-team/repo/config/intake-interview.md` (the questions, in order) and `/workspace/cog-team/repo/config/cog.example.json` (the schema). If `/workspace/cog-team/context/cog.json` already exists, read it, skip what it answers, and confirm those answers in one message ("Here's what I have, anything to fix?").

**Run the interview:**
1. Ask the questions in `intake-interview.md` one at a time, in order, in plain English.
2. After each answer, write it into `/workspace/cog-team/context/cog.json`. Start the file as a copy of `cog.example.json`, keep every key, and replace a value only with something Chris confirmed.
3. At setup time Slack, Sheets and GoHighLevel may not be connected yet (`/workspace/cog-team/repo/START-HERE.md` Steps 5 and 6). What you can't look up yet, such as Slack member IDs, the sheet's exact column names, GHL user IDs or calendar IDs, stays `REQUIRED`. Fill it after connecting, then have Chris confirm it.
4. When Chris doesn't know an answer, keep the default and write "assumed, confirm later" with the date to `/workspace/cog-team/vault/Decisions.md`.
5. Write `/workspace/cog-team/context/owner.md` (who Chris is, his businesses, how he likes messages, his hours and protected time) and `/workspace/cog-team/context/priority-people.md` (a table: name · why they matter · how fast · where they reach him). Look up handles yourself in the connected apps; don't guess them.

**Where the answers go:**

| Section of the intake | File |
|---|---|
| A. Team | `cog.json` → `roster` |
| B. EODs | `cog.json` → `eod` (including `slack_workspace`) |
| C. Bumps | `cog.json` → `bump` (identity `bot` or `chris`, and the two templates) |
| D. GoHighLevel | `cog.json` → `ghl` (`location_id`, `calendars`, `dispositions`, `appointment_status_map`) |
| E. No-show SOP | `cog.json` → `no_show_sop`, `thresholds.lead_response_minutes` |
| F. Numbers | `cog.json` → `targets`, `thresholds` |
| G. Calls, assets and knowledge | `cog.json` → `calls`, `knowledge` |
| H. You | `cog.json` → `owner`; `owner.md`; `priority-people.md` |
| I. Personal | Nothing here. His personal side runs in ChatGPT |

**Check, then read it back:**
1. `cog.json` is valid JSON.
2. Every field marked REQUIRED is filled and nothing still says `REQUIRED` or `EXAMPLE`. Anything you couldn't get yet stays `REQUIRED` and goes on a short list for Step 5 of `/workspace/cog-team/repo/START-HERE.md`.
3. Read the roster back to Chris in one message and get his "right". Then read the rest back in five lines and ask "anything to fix?".
4. Go on with the next step of `/workspace/cog-team/repo/START-HERE.md`.

**Later changes** (a new rep, a rep who leaves, a new target, a new cutoff, a new form field): only Chief edits `cog.json`, and only after Chris confirms the change in his own words. Log each in `/workspace/cog-team/vault/Decisions.md`. History stays in the vault; a rep who leaves is marked `active: false`, never deleted.

## Peptide mode (Peptide Operator)

**Read first:** `GROWTH-CONTEXT.md` if Chris attached it. Copy it to `/workspace/peptide/context/offer.md` and ask only what it leaves open.

Ask these one at a time, skipping what's already answered:

1. "In one line: what does a client get, and what does it cost?" → `offer.md` → The offer.
2. "What are the fulfilment steps after someone pays, and how long does each take?" → `offer.md` → Fulfilment.
3. "Who's on the sales team, and where do their EODs land?" → `offer.md` → Team.
4. "What are your targets: booked calls a day, show rate, close rate, monthly cash, cash per ad dollar?" → `offer.md` → Targets. Nothing can be judged without these.
5. "Where does each number live: CRM, payments, ad accounts, client tracker?" → `offer.md` → Where the numbers live.
6. "Which claims must we never make?" Start from: no health, medical or efficacy claims, no income guarantees, no before/after. → `offer.md` → Claims we never make.
7. "How do you like my morning pulse: one screen, numbers first?" → `/workspace/peptide/context/owner.md`, with who Chris is and his role in the offer.

Anything marked "confirm" in the attachment stays marked until Chris confirms it. Read `offer.md` back in five lines and ask "anything to fix?". Then go on with the next step of the "Peptide account" section of START-HERE.md.
