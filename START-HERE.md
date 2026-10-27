# Chris, start here

Bro, this is the whole thing in one place. You don't need to remember how it's built. You need three things:
1. Install it.
2. Run the first week.
3. Know your daily routine.

## 1. Install it

**Before you start, have these ready** (you have most of them already):
- [ ] Your Mac, with Claude Code or the Codex app
- [ ] OpenRouter account (from our Oct 16 session). Keep auto top-up **off**
- [ ] Orgo account (you already gave Justin access)
- [ ] A Composio account (composio.dev). This is how the bots reach Slack, Gmail, Calendar, Sheets and GoHighLevel
- [ ] Admin access to the WeScale Slack and to GoHighLevel. Also know which Slack your KPI channel is in (WeScale or COG's)
- [ ] Google Drive for desktop and Obsidian (both free). Your reports land in a Drive folder you open in Obsidian

**Then:**
1. Open Claude Code (or Codex).
2. Paste the message in the box at the top of `README.md`.
3. Answer its questions one at a time:
   - **Keys:** it'll tell you to run a command in Terminal and paste the key there. The key stays hidden.
   - **Sign-ins:** Slack, Google, GoHighLevel. You click "Allow".
   - **The interview:** who your closers and setters are, where EODs land, your KPI channel, your cutoff, your no-show rules, your targets.

When it says "acceptance tests passed", you have:
- **Chief**, your main GrokBot, in the app at http://localhost:3210 and in Slack
- the rest of the team behind it
- every routine **paused** until the first week is done

## 2. The first week (dry run)

For five nights, the bots run everything **as drafts to you only**. Nothing is posted to the team yet.

Each night and morning, glance at:
- **~11:30 PM ET:** "EOD check: missing John, David…". Is that right?
- **~8:00–8:30 AM ET:** the sales report and Chief's brief. Do the numbers match what you know?

Reply in the chat: **"right"**, or **"wrong: David submitted at 11:10, check the sheet"**. The bots fix their setup from your corrections.

After five good nights, tell Chief: **"Approve the standing EOD bump."** From then on, missing-EOD bumps post in the KPI channel by themselves. Nothing else does. Everything else still asks you first.

## 3. Your daily routine (about 10 minutes)

| When | What you do |
|---|---|
| **Morning** | Read Chief's brief (Slack DM or app). Handle the "Needs you" items: tap approve, answer the one question, or reply "skip" |
| **During the day** | Only if pinged: a no-show violation or a source that went down. Everything else waits for the brief |
| **Night** | Nothing. The bumps happen on their own after the dry run |
| **Monday** | Read the weekly review and scorecards. Pick from the 3 decisions it gives you |
| **Tuesday** | Look at the asset drafts from Growth Operator: approve, revise or drop |

**Talk to Chief like a person.** Anything goes:
- "How did we do yesterday?"
- "Why is Mike's number off?"
- "Write me a rebuttal for 'I need to talk to my wife'"
- "Prep my 3 PM"
- "Add a new closer named Jordan"
- "Pause the bumps tonight"

Chief answers or hands it to the right bot. You don't need to know which.

**Your money:** switch to the **Personal** workspace and ask the CFO. The business bots can't see it, on purpose.

**Something off?** Tell Chief "something's wrong with X". Ops checks the team every morning anyway.

**Stop everything:** say "pause all routines" to Chief, or flip them off in the app.

## 4. Build your next agent yourself

This is the thing you asked for: *"Teach me how to build ONE agent correctly from beginning → end."*

Tell **Ops**: "Let's build the peptide agent together." It walks you through the same loop this team was built with, step by step, and you do each step:

**idea → charter → skills → connections → data → routines → test → go live.**

The long version, with this team as the worked example, is `docs/BUILD-YOUR-NEXT-AGENT.md`.

## Where things are

- **Your reports:** Google Drive → **GrokBot Vault**. Open it in Obsidian to click through days, reps and decisions. Your settings (the roster, cutoffs, targets) are in `GrokBot Vault/Config/cog.json`. Change them by telling Chief, not by editing.
- **Clocks:** everything runs on Eastern time. Your clock doesn't follow US daylight saving, so when US clocks change, the setup tells you to run one command (`--retime`). Ops reminds you.
- **What each bot can and can't do:** `policies/permissions.md`.
- **The full SOP, plus a script for recording your own Loom walkthrough:** `docs/OPERATOR-SOP.md`.
