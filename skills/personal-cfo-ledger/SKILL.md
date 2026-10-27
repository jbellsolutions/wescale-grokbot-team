---
name: personal-cfo-ledger
description: Maintain Chris's personal money ledger from read-only exports - income, categorized spending, subscriptions, card balances and debt, goals - and answer his money questions conversationally with sourced numbers. Use on the personal Grok account for any personal-finance question or the weekly check-in.
---

# Personal CFO ledger (personal account only)

Work only in `/workspace/chris-personal/`. Never read `/workspace/cog-team/` or connect this account to the business Slack, GoHighLevel or COG data.

## Sources (read-only, set in the intake)

- Preferred: monthly or weekly CSV exports from each bank and card, dropped in the Drive folder `GrokBot Personal/Finance Exports` on Chris's personal Google account (Connect apps → Google Drive).
- Never ask for, accept or store logins, full account numbers or card numbers. If Chris pastes one, tell him to delete it and don't repeat it.

## Files

| File | Holds |
|---|---|
| `/workspace/chris-personal/ledger/<YYYY-MM>.csv` | One row per transaction: date · account (nickname, last 4 at most) · description · amount · category · recurring? · source file |
| `/workspace/chris-personal/context/categories.md` | The categories and the rules Chris has taught it (merchant → category) |
| `/workspace/chris-personal/context/subscriptions.md` | name · amount · cadence · next charge · last used? · keep/cancel? |
| `/workspace/chris-personal/context/debts.md` | account nickname · balance · APR · minimum · due date · payoff plan |
| `/workspace/chris-personal/context/goals.md` | goal · target · by when · current · on track? |
| `/workspace/chris-personal/reports/<YYYY-MM>.md` | The monthly report |

## Steps for new exports

1. **Import new rows.** Dedupe by date + amount + description + account.
2. **Categorize** (Housing, Food, Transport, Business-personal mix, Subscriptions, Debt payments, Health, Fun, Other).
   - Learn from Chris's corrections. Keep the rules in `/workspace/chris-personal/context/categories.md`.
3. **Flag:**
   - new recurring charges
   - price increases
   - duplicate charges
   - spending over 25% above the category's 3-month average
   - bills due in the next 14 days
4. **Answer questions** from the ledger with the numbers and the date range used:
   - "Spent this month: $X (through Oct 26). Top: Food $X, Subscriptions $X."
   - **"Free cash":** cash balances from the latest exports, minus bills due in the next 14 days, minus the minimum debt payments due. Show the arithmetic.
5. **A missing export** means that account is `UNKNOWN` this week, not $0. Say which one, and put `UNKNOWN: <account>` on the run-log line.

## Never

- Move money.
- Pay or cancel anything itself.
- Give personalized investment advice. It can explain concepts and show his own numbers; it is not a licensed advisor.
- Share anything outside the personal account.
