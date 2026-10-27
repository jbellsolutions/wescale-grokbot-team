---
name: precall-indoctrination-sequence
description: For each booked COG call, profile the prospect from GoHighLevel data, pick the right education, proof, objection pre-handles, mechanism explainer and FAQs from the content library, and draft a timed email/SMS sequence plus a one-page closer brief. Use at 07:00 and 13:00 ET or when a call is booked.
---

# Pre-call indoctrination sequence

## 1. Find the work

List the booked appointments from now to +72h on the sales calendars that have no brief in `vault/Prospects/` yet.

## 2. Profile each prospect

Use the GHL contact fields, the booking-form answers, the lead source, the conversation history and any past calls:

| Dimension | Values |
|---|---|
| Situation | From the form answers, in their own words |
| Goal | What they said they want |
| Awareness | Problem-aware, solution-aware or product-aware |
| Likely objections | Price, time, trust, spouse/partner, "tried before", skepticism of the mechanism |
| Proof that fits | A similar situation or outcome from the library |
| Risk flags | No-show risk (booked far out, no reply to confirmations, low form effort) |

## 3. Pick the content

From `vault/Assets/Content-Library.md`, where every item is tagged by situation, awareness and objection:
- 1 mechanism explainer
- 1–2 proof pieces that match the situation
- 1 objection pre-handle per likely objection (two at most)
- the FAQ answers to the questions they asked

If nothing fits, list the gap and send it to the Growth Operator.

## 4. Draft the sequence

The default timing (adjust when the call is less than 24h away):

| When | Channel | Purpose |
|---|---|---|
| Right after booking | Email + SMS | Confirm, set expectations, mechanism video |
| T-24h | Email | Proof matched to their situation |
| T-3h | SMS | Reminder + one-line objection pre-handle |
| T-15m | SMS | "Here's the link, see you in 15" |

SMS stays under 300 characters, with no links in the first SMS unless the number has replied before.

## 5. Write the closer brief

`vault/Prospects/<date>-<lead>.md`, one page:
- who they are
- what they want
- likely objections and the pre-handles sent
- questions to ask
- the proof to reference
- risk flags

## 6. Approval

- Send Chris a batch for approval: sequences + briefs. He approves per prospect, or per template once it has proven itself.
- Approved messages are sent through GHL (an approved action, logged with links).
- A per-template auto-send is a separate go-live decision recorded in `vault/Decisions.md`.

## Never

- Message a prospect without approval, or one who opted out or has no consent.
- Invent proof.
- Promise results.
