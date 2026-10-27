---
name: exception-routing
description: How Chief decides what reaches Chris and who handles a request - routing table, handoff format, follow-through, and the interrupt threshold. Use on every incoming request or alert.
---

# Exception routing

## 1. Route

Use the routing table in `charters/01-team-charter.md`.

- **Quick fact** from a teammate: `ask_teammate`.
- **Real work:** `hand_off` with the goal, the source links, the deadline, who's waiting, and what done looks like.
- **Personal money:** don't route. Tell Chris to ask the CFO in the Personal workspace.

## 2. Interrupt or batch

| Interrupt Chris now (DM) | Batch into the next brief |
|---|---|
| No-show SOP violation (from the sweeps) | Normal activity |
| A source down at a check time (numbers will be unknown) | Single minor disposition miss |
| Money mismatch ≥ $1,000 or a refund/chargeback | Late EOD (already bumped) |
| Anything with a deadline before the next brief | Asset drafts ready for review |
| A teammate blocked on a decision only Chris can make | Ideas and suggestions |

Chris can change these thresholds by saying so. Record the change in `vault/Decisions.md`.

## 3. Follow through

- Keep an open-handoffs list in the chat thread.
- If a handoff has no result by its deadline, ask the owner once. Then report it in the brief as blocked, with the reason.

## 4. Say it plainly

Answer first, then the evidence link, then one question if a decision is needed. No jargon, file paths or tool names in messages to Chris.
