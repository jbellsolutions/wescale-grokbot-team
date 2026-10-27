# Intake interview: filling `config/cog.json`

**For the setup agent:**
- Ask Chris **one question at a time**, in plain English, and fill `config/cog.json` as you go.
- Look up every ID yourself through the connected apps where possible. Only ask Chris to confirm.
- If he doesn't know an answer, keep the default and note it in `vault/Decisions.md` as "assumed, confirm later".

## A. The team (→ `roster`)

1. "Who's on the sales team right now? For each person: closer or setter?"
2. For each person, look up and confirm:
   - their Slack member ID (Slack → profile → ⋯ → Copy member ID)
   - their GHL user ID
   - their calendar
3. "Is anyone exempt from EODs, or new this week?" → `eod_required`, `active_since`.

## B. EODs (→ `eod`)

4. "When a closer submits their EOD, where does it go? A Google Form into a Sheet, a Slack workflow, a GHL form, something else?" → `source_type`. For a Sheet, get the spreadsheet and the tab.
5. Open one real submission together. Map each question or column to the standard fields in `docs/KPI-DEFINITIONS.md` → `field_map`. Note which column identifies the rep and which is the timestamp.
6. "Which Slack channel is the KPI channel, and is it in WeScale or in COG's own Slack?" → `slack_channel_id`, `slack_workspace`. If it's COG's own, the bot reads it through Chris's Slack connection there (`INSTALL.md` step 5). Make sure that access is in place.
7. "11:30 PM ET is the first check. When's the real cutoff?" (Default: final check 12:45 AM, cutoff 1:00 AM ET.)
8. "Do setters submit EODs too?"

## C. Bumps (→ `bump`)

9. "Should the bump come from the COG Sales Manager bot (recommended), or look like it's from your own Slack account?" Your own account needs a Slack user token. Explain that tradeoff.
10. Show him the two bump templates. "Want any wording changed?" Keep them factual, with no insults.

## D. GoHighLevel (→ `ghl`)

11. Location ID; which calendars are sales calls → `sales_calendar_ids`.
12. "When a call is over, where does the closer set the outcome? A custom field, an opportunity stage, a tag?" → `dispositions.field`. Read the exact list of allowed values → `dispositions.allowed`.
13. Map GHL appointment statuses to showed / no-show / cancelled / rescheduled → `appointment_status_map`.

## E. No-show SOP (→ `no_show_sop`)

14. "When someone no-shows, what exactly should the closer do, and how fast?" The default from your brief: call twice, text, notify the setter, update GHL, within 10 minutes. Confirm the steps and minutes.
15. "How fast should a no-show be contacted?" → `thresholds.lead_response_minutes`.

## F. Numbers (→ `targets`, `thresholds`)

16. "Do you have daily or weekly targets: cash, closes, live calls, show %, close %?" Leave them null if none. The report then compares to last week.
17. "How big a gap between what a closer reports and what GHL shows should get flagged?" (Default: 1 live call.)

## G. Calls, assets and knowledge (→ `calls`, `knowledge`)

18. "Where do call recordings and transcripts live? GHL, Zoom, read.ai, Fathom?"
19. "Where are your current SOPs and scripts?" → `knowledge.sops_folder`.
20. "What's the link to the Jeremy Haynes knowledge base we built on Oct 16?" (The repo or here.now page; it was published from your side.) → `knowledge.jeremy_haynes_kb_url`.
21. "Where are your case studies, testimonials and videos? Which are you allowed to share with prospects?" → `knowledge.content_library_folder`.

## H. You (→ `owner`)

22. Your Slack member ID; reports by Slack DM or in the app → `owner.report_channel`.
23. "The team runs on Eastern. You chose Eastern Daylight on Oct 16, right?" Chris's clock doesn't follow US daylight saving (UTC-5 all year). Reports are always shown in ET. Tell him the date the installer printed, when routine times need `--retime`.

## I. Personal (CFO; can wait)

24. "Which bank and card accounts should the CFO see? Easiest: download CSV exports into Drive → `GrokBot Personal/Finance Exports` once a month. Never give it a login."

When done:
- Run `node scripts/verify.mjs --config`.
- Upload it to Drive with `node scripts/sync-drive.mjs` (`INSTALL.md` step 8).
- Read the summary back to Chris in 5 lines.
