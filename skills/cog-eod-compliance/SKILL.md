---
name: cog-eod-compliance
description: Nightly EOD KPI compliance for Circle of Greatness: who was expected, who submitted, who is missing or late, repeat offenders, and the fixed Slack bump. Use at the 23:30 ET first check, the final check before cutoff, or when Chris asks "who's missing EODs?".
---

# EOD KPI compliance

## Before anything

1. Load `config/cog.json`. If `roster`, `eod.source_type`, `eod.slack_channel_id`, `eod.identity_column` or `eod.timestamp_column` is missing or still says REQUIRED, reply `NO_CLIENT_SOURCE: <missing items>` and stop.
2. **Clock check.** Read the real time in ET. If it's more than 20 minutes from the configured check time (`eod.first_check` or `eod.final_check`), the app's clock has drifted, for example after a daylight-saving change before `--retime`.
   - Run the check as **draft-only**: no bump, summary to Chris.
   - Tell Ops "clock drift: ran at <time> ET, expected <time> ET".
   - An early bump would tag reps who aren't late yet.
3. Work out the **report date**: the selling day that just ended (ET). If it isn't in `business.selling_days`, reply "No selling day — nothing expected" and stop.

## Steps

1. **Expected list:** roster entries with `active: true`, `eod_required: true`, and `active_since` ≤ report date.
2. **Read submissions** for the report date from the configured source:
   - **google_sheet:** read rows whose timestamp falls between the report date's start and the cutoff.
   - **slack_workflow_channel:** read channel history for the same window, and parse the workflow posts.
   - **ghl_form:** read form submissions for the window.
   - Match each submission to a rep by `identity_column`, comparing case-insensitively, trimmed, and against name or email. Put unmatched submissions in an "Unmatched" list. Never guess who they belong to.
3. **If the source can't be read** (auth error, empty response where rows existed yesterday, timeout):
   - report `UNKNOWN: <source> unreadable at <time>`
   - DM Chris
   - **do not bump anyone**
   - stop
4. **Classify** each expected rep:
   - `submitted`: before 23:30
   - `late`: after 23:30, before the cutoff
   - `missing`: none yet
   - At the final check, anyone still missing becomes `eod_missing`.
5. **Repeat offenders:** count `eod_missing` and `eod_late` in each rep's ledger (`vault/Reps/<Name>.md`) over `thresholds.repeat_offender_window_days`.
6. **Bump** (only if the list of missing reps isn't empty):
   - Build one message from `bump.template_first`, or `bump.template_final` at the final check.
   - `{mentions}` is the `<@slack_member_id>` of each missing rep, in roster order.
   - `{time}` is the actual ET time.
   - **If `bump.standing_approval_recorded` is false:** don't post. Put the exact message in the summary to Chris as a draft: "Approve to post?"
   - **If it's true:** post exactly that one message in `eod.slack_channel_id`. Nothing else, no edits to the template, no DMs. Record the message link.
   - Never mention anyone not on the roster. Never bump at all if the clock check found drift or step 3 failed.
7. **Log:**
   - Append events to each affected rep note.
   - Write the compliance table to `vault/Daily/<report date>.md` under `## EOD compliance`.

## Output (DM to Chris; under 120 words)

```
EOD check 23:30 ET — Tue Oct 27
Expected 14 · Submitted 10 · Late 1 · Missing 3
Missing: John, David, Alex  → bump posted ✓ <link>   (or: draft below, approve to post)
Repeat offenders (30d): David 4× missing
Unmatched submissions: 1 ("Jon S." — which rep?)
```

## Never

- Treat an unreadable source as "everyone submitted" or "everyone missing".
- Reword the bump, add threats or opinions, or DM reps.
- Edit or delete anyone's submission.
