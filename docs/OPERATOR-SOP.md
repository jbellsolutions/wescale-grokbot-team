# Operator SOP: running the GrokBot team

This is the SOP Chris asked for on Oct 20: something tangible to follow. Each section is a procedure: when, steps, done.

The bots live in the Grok Bot app. Chief is pinned at the top of the sidebar, so you always start there. Each bot's **Details** tab shows its routines, with **Pause**, **Resume**, **Test** and **Edit**.

---

## SOP 1. The morning (≈10 min)

**When:** after Chief's brief arrives (8:30 AM ET). It arrives in Chief's chat, on your phone or the desktop app.

1. Open the brief.
2. For each **🔴 Needs you** item, do one of:
   - **Approve:** reply "approve 2".
   - **Decide:** reply with the option, e.g. "1: tell Mike to correct his KPI".
   - **Defer:** "skip 3 till tomorrow".
3. Skim the **📊 COG yesterday** line. If a number looks wrong, reply "check X". The COG Sales Manager comes back with evidence.
4. If the **⚙️ Team** line says a routine didn't run, open that bot's **Details** tab, find the routine, and choose **Resume**. Grok Bot can pause routines after a long absence, so open Chief at least once a day. If a source is unknown or down, reply "Chief fix it". Chief diagnoses and tells you what it needs, usually a re-sign-in under **Connect apps**.
5. When you approve something, the bot doing the work may ask you to confirm once more in its own chat. Answer it soon: it can expire if it's left open. If it expired, tell Chief and it asks again.

**Done when:** every 🔴 item has an answer.

## SOP 2. Real-time pings (as they come)

**When:** a message from the COG Sales Manager: a "No-show process violation" or a "source down".

1. Read the violation. Each ✗ comes with what it checked.
2. Decide: coach the rep now, note it for the weekly review, or "that's wrong, here's why". A wrong flag gets corrected, and the bot learns the exception.
3. Never argue with the bot about a rep. It reports evidence; you manage people.

## SOP 3. Nightly EOD (no action after go-live)

- **During the preview week:**
  - at ~11:30 PM ET you get "EOD check" with the table and the exact bump it *would* post. Nothing goes to the team
  - reply "right", or say what's wrong
  - you get the same at ~12:45 AM ET, and the morning report at 8:00 AM
- **After you give the standing approval** (five good nights in a row): the bump posts by itself in the KPI channel, once per check, tagging only reps on your roster who are missing an EOD. You get the final summary around 12:45 AM ET. Read it in the morning.
- **No bumps for a night** (holiday, team event): tell Chief "no bumps tonight". Chief sets the mode back to preview for the night and to live again when you say "bumps back on".
- **Stop them altogether:** "pause the bumps". That ends the standing approval until you approve it again.

## SOP 4. Monday weekly review (≈20 min)

1. Read the COG weekly review: trends, scorecards lowest first, patterns.
2. Pick from the **3 decisions** it gives you.
3. For each rep under 80 or down 10+ points, open their note in the vault (Obsidian → `Reps/<Name>`) before you talk to them. The evidence is linked.
4. Items in "Can be automated" have already gone to the Growth Operator or Chief as requests. Watch for their drafts.

## SOP 5. Approving assets (Tuesday, ≈15 min)

1. Open each `[DRAFT]` doc linked in the Growth Operator's summary and in Chief's brief. They live in the Drive folder "GrokBot Drafts".
2. Reply to Chief: **approve / revise: <what to change> / drop**, with the item number.
3. Approved docs are yours to roll out. Nothing is published by the bots.

## SOP 6. Pre-call approvals (daily, ≈5 min)

1. The Pre-Call Concierge sends one batch: today's prospects, each with a brief and a proposed sequence.
2. Tell Chief which to approve ("approve all except Ray"), or edit a message ("change the T-3h text to…"). Chief passes your yes to the Pre-Call Concierge.
3. The bots can't send to prospects: their GoHighLevel access is read-only. You or your team load the approved messages into GoHighLevel.
4. **Once a template has been approved 10+ times unchanged,** you can tell Chief "auto-send template X for <prospect type>", for example through a GHL workflow you build. That is a go-live decision with its own standing approval; it gets logged in `Decisions.md`.

## SOP 7. Changing the team's facts

| Change | Say to Chief |
|---|---|
| New rep | "Add a new closer: Jordan Lee, Slack @jordan, starts tomorrow". Chief looks up the IDs (asking the COG Sales Manager for the GoHighLevel ones) and confirms |
| Rep leaves | "Remove Mike from the roster as of today". History stays in the vault |
| New target | "Daily cash target is now <amount>" |
| New cutoff or SOP minutes | "EOD cutoff is now 12:30 AM ET" |
| New KPI form field | "We added 'Deposits' to the form" |

Chief updates `/workspace/cog-team/context/cog.json` (the one real copy), logs it in `Decisions.md`, and confirms back. Changing the bump wording, the channel or the roster rule ends the standing approval until you approve the new version.

## SOP 8. When something's wrong

1. Tell Chief: "something's wrong with <thing>".
2. Chief checks the run log, the routines list and the connections, and tells you in one message what broke and what it needs from you. Usually that's a re-sign-in under **Connect apps**, or a routine to **Resume**.
3. **Stop everything:** "pause all routines". Chief asks each bot to pause its own routines. **Restart:** "resume routines". Chief confirms which are on, and each bot may ask you once to confirm.

## SOP 9. Your personal account: life and money

1. **Where you are.** When you switch cities, tell any bot there "I'm in <city>". The Life Concierge plans for that city in its local time.
2. **Thursday 2 PM:** three weekend options. Reply 1, 2, 3 or "more like 2". You book; it never pays.
3. **Money:** monthly, download CSV exports from your bank and card sites into Drive → `GrokBot Personal/Finance Exports`, on your personal Google account. Ask the CFO anything. Sunday evening, read the money check-in.

## SOP 9b. Your peptide team

1. **8:30 AM:** the offer pulse, one screen. Act on its one action.
2. **When the Media Buyer sends SCALE or CUT lines:** reply "do it" for the exact list, "do 1", or nothing. It changes only what you approved.
3. **Ask the Scale Advisor** "how would Jeremy fix <thing>?" or "write this the Jeremy way". Sunday 6 PM, read the scale memo and pick the experiment.
4. **New expert:** "build me a library on <name>". It shows you before anything is published.

## SOP 9c. Your Dream Map

1. Say "add this to the list" to any lead bot (Chief, the Life Concierge, the Peptide Operator) whenever you have an idea.
2. First Monday of the month: Chief's check-in. Say yes to the build it suggests, or pick another. You do the steps you want to learn; it does the rest.

## SOP 10. Friday: the usage check

1. Chief's Friday wrap shows the week's usage and how the routines ran.
2. If usage is past 80% of the normal share, Chief proposes which optional routine to pause first (Growth, then the Pre-Call midday sweep). Reply yes or no.

---

## Loom script: record your own walkthrough (≈5 min)

Chris offered to record Looms to train the agent. Record this one for yourself and future hires. It locks the routine in.

1. **(0:00)** "This is our AI sales-management team in Grok Bot. Chief is the one I talk to."
2. **(0:30)** Open the Grok Bot app. Show Chief pinned, then the COG Sales Manager, the Pre-Call Concierge, the Growth Operator and the Sales Coach. Mention that your personal and peptide teams live on their own accounts.
3. **(1:00)** Open this morning's brief in Chief's chat. Walk through one 🔴 item and approve it.
4. **(2:00)** Open the vault in Obsidian → today's daily note → click a rep's name → show their ledger.
5. **(3:00)** Ask Chief live: "How did we do yesterday vs last week?"
6. **(4:00)** Open the COG Sales Manager's **Details** tab and show its routines: what runs when, and where **Pause**, **Resume** and **Test** are.
7. **(4:30)** "If something's off, I tell Chief. To pause everything, I say 'pause all routines'."

Then send the Loom link to Chief: "Save this as the team walkthrough." It goes in the vault.
