---
name: life-planning
description: Use for Chris's nights out, weekend plans, restaurant picks, events, trips, gifts and special dates on the personal account. Produces checked, real options with links, never bookings. For the Life Concierge.
---

# Life planning

Work only in `/workspace/chris-personal/`. Never read the business or peptide folders.

## When to use

- The Thursday weekend plan and the Monday special-dates check.
- "Something good Friday night", "where should I eat tonight", "anything good this weekend", "plan my trip", "a birthday's coming up".

## Inputs and access

- **Where Chris is:** the "Where I am" line in `/workspace/chris-personal/context/owner.md`. When he asks directly and it's more than 7 days old, ask once: "Still in <city>?" A routine never asks; it plans for the last city it knows and says so on the first line.
- **Taste:** `/workspace/chris-personal/vault/Life/Favorites.md`, `/workspace/chris-personal/vault/Life/Never-again.md`, and what he did or skipped in `/workspace/chris-personal/vault/Life/Plans.md`. Also `/workspace/chris-personal/context/about-me.md` from the memory import.
- **His personal calendar:** to avoid clashes.
- **Plan requests** from another bot on this account, if one handed some over: day and time, vibe, budget, must-knows.
- **The browser:** maps, reservation sites, event listings, venue pages and recent reviews.

## Weekend plan and nights out

1. **Frame it.** City, day and time window, who it's with, vibe (chill, big night, adventurous, romantic), budget level. Use what you know; ask at most one question, and none in a routine.
2. **Find 6–10 candidates.** Mix the types. A big night is an experience, dinner and an after spot, not three restaurants.
3. **Verify each one for the day it's for:**
   - open, with current hours;
   - recent reviews (the last 3 months);
   - reservation availability, where the site shows it;
   - price level;
   - travel time from where he stays.

   Drop anything closed, booked out or badly reviewed lately.
4. **Pick three**, each a different kind of night, plus a backup for each.
5. **Send**, with times local to the city and the city named:

```
Weekend (city)
1. BIG NIGHT · Sat 9pm · rooftop at X → dinner at Y ($$$) · book: <link>
   Backup: Z
2. EASY · Fri 7pm · tapas at A ($$) · walk-in OK
3. DAY · Sun 11am · brunch at B, then the beach club · book: <link>
Reply 1, 2, 3 or "more like 2".
```

6. **Log** the plan in `/workspace/chris-personal/vault/Life/Plans.md`. When Chris replies "did it", "loved it" or "skip", update Favorites or Never-again.

## Gifts and special dates

`/workspace/chris-personal/context/special-dates.md` lists first name, date, relationship and what they like. The Monday check messages Chris only when a date falls within 14 days: three ideas at different price levels with links, and the day to order by for delivery.

## Trips

Two or three flight options with times and fares, three stays by area, and a day-by-day plan. All drafts. Prices change, so give the time you checked.

## Validate before sending

- Every pick was checked today, or is marked "check before going".
- Everything is in the city he's actually in.
- Nothing from Never-again.

## Return

The message above, and the plan logged.

## Needs Chris's yes

- Any booking, reservation or purchase, any calendar hold or invite, and any message to a venue or a person. Chris takes over for payment steps; never type payment details.
- If a site blocks automation, send him the link and the exact slot instead. Never get around the block.
