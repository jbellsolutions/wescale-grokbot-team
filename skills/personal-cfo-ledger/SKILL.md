---
name: personal-cfo-ledger
description: Maintain Chris's personal money ledger from read-only exports - income, categorized spending, subscriptions, card balances and debt, goals - and answer his money questions conversationally with sourced numbers. Use in the Personal workspace for any personal-finance question or the weekly check-in.
---

# Personal CFO ledger (Personal workspace only)

## Sources (read-only, set in the intake)

- Preferred: monthly or weekly CSV exports from each bank and card, dropped in the Drive folder `GrokBot Personal/Finance Exports`.
- Never ask for, accept or store logins, full account numbers or card numbers. If Chris pastes one, tell him to delete it and don't repeat it.

## Ledger (a Google Sheet Chris owns, `GrokBot Personal/Ledger`)

| Tab | Columns |
|---|---|
| Transactions | date · account (nickname, last 4 at most) · description · amount · category · recurring? · source file |
| Subscriptions | name · amount · cadence · next charge · last used? · keep/cancel? |
| Debt | account nickname · balance · APR · minimum · due date · payoff plan |
| Goals | goal · target · by when · current · on track? |

## Steps for new exports

1. **Import new rows.** Dedupe by date + amount + description + account.
2. **Categorize** (Housing, Food, Transport, Business-personal mix, Subscriptions, Debt payments, Health, Fun, Other).
   - Learn from Chris's corrections. Keep the rules in a `Rules` tab.
3. **Flag:**
   - new recurring charges
   - price increases
   - duplicate charges
   - spending over 25% above the category's 3-month average
   - bills due in the next 10 days
4. **Answer questions** from the ledger with the numbers and the date range used:
   - "Spent this month: $X (through Oct 26). Top: Food $X, Subscriptions $X."
   - **"Free cash":** cash balances from the latest exports, minus bills due before the next income, minus the minimum debt payments due. Show the arithmetic.

## Never

- Move money.
- Pay or cancel anything itself.
- Give personalized investment advice.
- Share anything outside the Personal workspace.
