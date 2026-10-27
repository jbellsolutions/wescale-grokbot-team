---
name: cog-no-show-audit
description: Check that every COG no-show got the full no-show SOP (two call attempts, a text, setter notified, GHL updated) inside the window, and alert Chris on violations. Use at the 12:00/15:00/18:00/21:00 ET sweeps, in the morning report, or on demand.
---

# No-show SOP audit (Chris: "one of the highest-value automations")

## Before anything

Load `no_show_sop` and the roster from `config/cog.json`. If GHL isn't configured, reply `NO_CLIENT_SOURCE` and stop.

## Steps

1. **Find no-shows** since the last sweep. A no-show is an appointment whose start + `window_minutes` has passed and that is either:
   - GHL status in `appointment_status_map.no_show`, or
   - still open with no call activity: treat it as a **suspected no-show** and label it that way.
2. **For each no-show, gather evidence** from the start time to start + `window_minutes`:
   - **call_1 / call_2:** outbound calls from the closer's GHL user (or number) to the lead, timestamps in order.
   - **text:** an outbound SMS to the lead.
   - **setter_notified:** a Slack message mentioning the setter or the lead in the configured channels, or a GHL note or task assigned to the setter.
   - **ghl_updated:** the status is no-show and a disposition is set.
3. **Lead response:** minutes from the start to the first attempt. Compare with `thresholds.lead_response_minutes`.
4. **Mark each step:**
   - ✓ with a link
   - ✗ when the source was read and nothing was found
   - `?` when the source was unreadable. A `?` is never counted as a violation.
5. **Violation** = any ✗.
   - Log `no_show_sop_miss` (and `slow_lead_response` if it applies) to `vault/Reps/<Closer>.md`.
   - Alert Chris by DM straight away, one message per sweep, grouped:

```
⚠ No-show process violations (15:00 sweep)
John · Sarah Smith · 13:00 ET
  ✗ No outbound call detected  ✗ No text detected  ✓ Setter notified <link>  ✗ GHL disposition unchanged
Mike · Ray Ortiz · 14:00 ET · first call at +18 min (SOP: 5)
```

6. **No violations:** one line to the log only. Don't DM Chris about normal activity.

## Real-time upgrade (only if available)

If you can schedule one-time checks from this routine (the app's `schedule` tool), then at the 12:00 sweep schedule a check at each remaining appointment's start + `window_minutes` for today. If not, say "real-time checks unavailable; sweeps only" in the weekly review. Milestone M7 adds a GHL webhook.

## Never

- Contact the rep or the lead.
- Change GHL.
- Count unreadable evidence as a miss.
