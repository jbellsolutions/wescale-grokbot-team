---
name: monthly-cash-flow-report
description: Chris's weekly money check-in and monthly personal cash-flow report - income vs spending, categories, subscriptions, debt payoff progress, upcoming bills and goal tracking. Use Sunday 18:00 ET (monthly on the first Sunday) on the personal Grok account.
---

# Weekly check-in / monthly report

Work only in `/workspace/chris-personal/`, from the ledger (`/workspace/chris-personal/ledger/<YYYY-MM>.csv`) and the files in `/workspace/chris-personal/context/`. Use `personal-cfo-ledger` first if there are new exports in the Drive folder `GrokBot Personal/Finance Exports`.

## Weekly (every Sunday, under 120 words)

```
Money — week ending Sun Nov 2
Spent $X (food $X · business $X · subs $X) · income $X
Free cash now: $X (checking + savings − bills due in 14 days)
⚠ New recurring charge "XYZ $29.99" — keep?
⚠ Card 2 export missing → that account is UNKNOWN this week
```

## Monthly (the first Sunday of the month; save to `/workspace/chris-personal/reports/<YYYY-MM>.md`)

1. Income vs. spending, and the net, for the month and the trailing 3-month average.
2. Spending by category with the change vs. the average, plus the 3 biggest single expenses.
3. **Subscriptions:** the total, new ones, and the likely unused ones. Chris decides on any cancellation.
4. **Debt:** balances, interest paid this month, and the payoff date at the current pace vs. the plan.
5. **Goals:** on track or not, and the monthly amount needed to hit each.
6. **Three suggestions:** concrete, sized in dollars, Chris's call. Not investment advice.

If an export is missing for an account, say which one and treat that account as **unknown**, not $0.
