---
name: cog-eod-compliance
description: Nightly EOD KPI compliance for Circle of Greatness: who was expected, who submitted, who is missing or late, repeat offenders, and the fixed Slack bump. Use at the 23:30 ET first check, the final check before cutoff, or when Chris asks "who's missing EODs?".
---

# EOD KPI compliance

## Before anything

1. Load `/workspace/cog-team/context/cog.json`. If `roster`, `eod.source_type`, `eod.slack_channel_id`, `eod.identity_column` or `eod.timestamp_column` is missing or still says REQUIRED, reply `NO_CLIENT_SOURCE: <missing items>` and stop.
2. **Late-run guard.** Read the real time in ET. The check time is `eod.first_check` for the first check and `eod.final_check` for the final check (default 23:30 and 00:45). Compare as clock times across midnight, so a first check at 23:30 and a run at 00:10 is 40 minutes late.
   - If this run started **before the check time, or more than 30 minutes after it**, run it as **draft only**: no bump, the table and the draft to Chris.
   - Write "late run: started <time> ET, expected <time> ET" on the run-log line and in `/workspace/cog-team/daily/<today>/sales.md`. That is how Chief hears.
   - An early bump would tag reps who aren't late yet.
   - The guard covers a run started by hand too, for example the **Test** button pressed at 2 PM.
   - **Final check:** it never runs at or after `eod.cutoff`, even if that is less than 30 minutes after the check time.
   - **Exception, the go-live test only:** in test mode with `eod-mode.md` at `live`, skip the guard and post to `eod.test_channel_id` instead of the KPI channel (START-HERE Step 11). If `eod.test_channel_id` is empty, draft only.
3. Work out the **report date**: the selling day that just ended (ET). At the first check, before midnight, that is today. At the final check, after midnight, that is yesterday. Test the **report date**, not the calendar day the run happens to start on, against `business.selling_days`. If it isn't in the list, reply "No selling day — nothing expected" and stop.

## Steps

1. **Expected list:** roster entries with `active: true`, `eod_required: true`, and `active_since` ≤ report date.
2. **Read submissions** for the report date from the configured source:
   - **google_sheet:** read rows whose timestamp falls between the report date's start and the cutoff, through Google Sheets in Connect apps.
   - **slack_workflow_channel:** read channel history for the same window, and parse the workflow posts.
   - **ghl_form:** read form submissions for the window with the `ghl` command (`/workspace/cog-team/ghl-super-hub/ghl`, read-only; its private skills give the exact calls).
   - Match each submission to a rep by `identity_column`, comparing case-insensitively, trimmed, and against name or email. Put unmatched submissions in an "Unmatched" list. Never guess who they belong to.
3. **If the source can't be read** (auth error, empty response where rows existed yesterday, timeout):
   - report `UNKNOWN: <source> unreadable at <time>` on the run-log line and to Chris
   - message Chris
   - **do not bump anyone**
   - stop
4. **Classify** each expected rep:
   - `submitted`: before 23:30
   - `late`: after 23:30, before the cutoff
   - `missing`: none yet
   - At the final check, anyone still missing becomes `eod_missing` and late submitters become `eod_late`.
5. **Repeat offenders:** count `eod_missing` and `eod_late` in each rep's ledger (`/workspace/cog-team/vault/Reps/<Name>.md`) over `thresholds.repeat_offender_window_days`.
6. **Bump** (only if the list of missing reps isn't empty). Build one message from `bump.template_first`, or `bump.template_final` at the final check. `{mentions}` is the `<@slack_member_id>` of each missing rep, in roster order. `{time}` is the actual ET time. `{report_date}` and `{cutoff}` come from the report date and `eod.cutoff`. Then:

| Situation | What you do |
|---|---|
| `/workspace/cog-team/context/eod-mode.md` says `preview`, or is missing | Send Chris the compliance table and the exact bump you **would** post. Post nothing |
| `live`, and `/workspace/cog-team/context/standing-approvals.md` records standing approval 1 for this exact wording of `bump.template_first` / `bump.template_final` | Post the one message with the `slack-api` skill (or the Slack connector, signed in as Chris, if `bump.identity` is `chris`). Record the message link, and send Chris the table |
| The EOD source can't be read (step 3) | `UNKNOWN: <source> unreadable at <time>`. Message Chris. **No bump** |
| The late-run guard tripped | Draft only, and "late run" for Chief |
| The wording in `cog.json` differs from the one recorded in `standing-approvals.md` | Draft only: "wording changed, needs Chris's yes" |
| The KPI channel holds a **bot- or app-posted** message for this report date that looks like an EOD bump and is **not recorded in the `.posted` file** (the old Hermes COG bot, which may share your bot token) | Don't post. Send Chris the draft and tell Chief "second bumper". A person's message is not a bump. Read the channel from 18:00 ET on the report date, not from the check time |
| Auto-review stops the post | Don't wait. Send Chris the draft and stop |
| The post timed out | Read the channel to see whether it landed before trying once more. Never post twice |

   - Post exactly that one message in `eod.slack_channel_id` (in test mode: `eod.test_channel_id`, never the KPI channel). Nothing else: no edits to the template, no threads, no DMs to reps.
   - **Record each post** as one line in `/workspace/cog-team/data/eod/<report date>.posted`: `first <ts> <link>` or `final <ts> <link>`. Before posting, read that file: if there is already a line for this check, don't post. The file existing from the first check never blocks the final check.
   - Never mention anyone not on the roster. Never bump at all if the guard tripped or step 3 failed.
7. **Log:**
   - Append events to each affected rep note.
   - Write the compliance table to `/workspace/cog-team/vault/Daily/<report date>.md` under `## EOD compliance`.
   - At the final check, write `/workspace/cog-team/data/eod/<report date>.json` (the classified table).

## Output (message to Chris; under 120 words)

```
EOD check 23:30 ET — Tue Oct 27
Expected 14 · Submitted 10 · Late 1 · Missing 3
Missing: John, David, Alex  → bump posted ✓ <link>
   (or: PREVIEW, would post: "<exact bump>"   or: DRAFT, late run / wording changed / Auto-review stopped it)
Repeat offenders (30d): David 4× missing
Unmatched submissions: 1 ("Jon S." — which rep?)
```

In test mode the message starts with "TEST" and goes to Chris only.

## Never

- Treat an unreadable source as "everyone submitted" or "everyone missing".
- Reword the bump, add threats or opinions, or DM reps.
- Edit or delete anyone's submission.
- Wait on an approval prompt. Draft, send Chris the draft and stop.
