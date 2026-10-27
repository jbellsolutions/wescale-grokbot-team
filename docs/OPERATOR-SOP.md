# Operator SOP: running the GrokBot team

This is the SOP Chris asked for on Oct 20 ("build me an SOP or something really tangible"). Each section is a procedure: when, steps, done.

---

## SOP 1. The morning (≈10 min)

**When:** after Chief's brief arrives (8:30 AM ET).

1. Open the brief (Slack DM from Chief, or the app).
2. For each **🔴 Needs you** item, do one of:
   - **Approve:** reply "approve 2".
   - **Decide:** reply with the option, e.g. "1: tell Mike to correct his KPI".
   - **Defer:** "skip 3 till tomorrow".
3. Skim the **📊 COG yesterday** line. If a number looks wrong, reply "check X". The COG Sales Manager comes back with evidence.
4. If the **⚙️ Team** line says something is unknown or down, reply "Ops fix it". Ops diagnoses and tells you what it needs.

**Done when:** every 🔴 item has an answer.

## SOP 2. Real-time pings (as they come)

**When:** a DM from the COG Sales Manager, a "No-show process violation" or a "source down".

1. Read the violation. Each ✗ comes with what it checked.
2. Decide: coach the rep now, note it for the weekly review, or "that's wrong, here's why". A wrong flag gets corrected, and the bot learns the exception.
3. Never argue with the bot about a rep. It reports evidence; you manage people.

## SOP 3. Nightly EOD (no action after go-live)

- **During the dry-run week:**
  - at ~11:30 PM ET you get "EOD check (draft)" with the bump it *would* post
  - reply "right", or say what's wrong
  - optionally "post it" to approve that one bump
- **After go-live:** the bump posts by itself in the KPI channel. You get the final summary around 12:45 AM ET. Read it in the morning.
- **Pause for a night** (holiday, team event): "pause the bumps tonight".

## SOP 4. Monday weekly review (≈20 min)

1. Read the COG weekly review: trends, scorecards lowest first, patterns.
2. Pick from the **3 decisions** it gives you.
3. For each rep under 80 or down 10+ points, open their note in the vault (Obsidian → `Reps/<Name>`) before you talk to them. The evidence is linked.
4. Items in "Can be automated" have already gone to the Growth Operator or Ops. Watch for their drafts.

## SOP 5. Approving assets (Tuesday, ≈15 min)

1. Open each `[DRAFT]` doc linked in the Growth Operator's summary.
2. Reply **approve / revise: <what to change> / drop**.
3. Approved docs are yours to roll out. Nothing is published by the bots.

## SOP 6. Pre-call approvals (daily, ≈5 min)

1. The Pre-Call Concierge sends one batch: today's prospects, each with a brief and a proposed sequence.
2. Approve per prospect ("approve all except Ray"), or edit a message ("change the T-3h text to…").
3. **Once a template has been approved 10+ times unchanged,** you can tell Chief "auto-send template X for <prospect type>". That's a go-live decision; it gets logged.

## SOP 7. Changing the team's facts

| Change | Say to Chief |
|---|---|
| New rep | "Add a new closer: Jordan Lee, Slack @jordan, starts tomorrow". The bot looks up the IDs and confirms |
| Rep leaves | "Remove Mike from the roster as of today". History stays in the vault |
| New target | "Daily cash target is $25k" |
| New cutoff or SOP minutes | "EOD cutoff is now 12:30 AM ET" |
| New KPI form field | "We added 'Deposits' to the form" |

The COG Sales Manager updates `GrokBot Vault/Config/cog.json` in Drive (the one real copy), logs it in `Decisions.md`, and confirms back.

## SOP 8. When something's wrong

1. Tell Chief: "something's wrong with <thing>".
2. Ops checks routines, sources and access, and tells you in one message what broke and what it needs from you. Usually that's a re-login.
3. **Stop everything:** "pause all routines". **Restart:** "resume routines". Ops confirms which are on.

## SOP 9. Personal money

1. Monthly: download CSV exports from your bank and card sites into Drive → `GrokBot Personal/Finance Exports`.
2. Switch to the **Personal** workspace and ask the CFO anything.
3. Sunday evening: read the money check-in.

---

## Loom script: record your own walkthrough (≈5 min)

Chris offered to record Looms to train the agent. Record this one for yourself and future hires. It locks the routine in.

1. **(0:00)** "This is our AI sales-management team. Chief is the one I talk to."
2. **(0:30)** Open the app. Show Chief, Ops, the COG Sales Manager, the Growth Operator, the Pre-Call Concierge and the Personal workspace.
3. **(1:00)** Open this morning's brief. Walk through one 🔴 item and approve it.
4. **(2:00)** Open the vault in Obsidian → today's daily note → click a rep's name → show their ledger.
5. **(3:00)** Ask Chief live: "How did we do yesterday vs last week?"
6. **(4:00)** Show the routines list: what runs when.
7. **(4:30)** "If something's off, I tell Chief. To pause everything, I say 'pause all routines'."

Then send the Loom link to Chief: "Save this as the team walkthrough." It goes in the vault.
