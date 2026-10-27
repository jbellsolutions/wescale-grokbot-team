# The memory vault (Obsidian)

The team's memory is an Obsidian vault: plain markdown notes with links. The bots write it; Chris opens it in Obsidian and sees exactly what they remember, with the graph view showing who and what connects.

## Where it lives

The vault lives on the business bot computer at `/workspace/cog-team/vault/`. That copy is the source of truth. Every night Chief copies it to the Google Drive folder **GrokBot Vault** (`routines/chief-vault-backup.prompt`, 1:15 AM ET), so nothing depends on one computer and Chris can open it on his Mac.

## Layout

```
Home.md                  start page: links to everything below
Decisions.md             everything Chris approved, changed or assumed, with dates
Daily/                   one note per day: EOD compliance, sales report, appointments, no-show audit, brief
Reps/                    one note per rep: compliance events, scores, links to days
Prospects/               one-page pre-call briefs, one per booked call
Assets/                  Backlog.md and Content-Library.md
Coaching/                call scorecards, rep coaching notes, game film, weekly patterns
Weekly/                  the Monday review and the Friday wrap
Templates/               Daily.md and Rep.md, which the bots copy for new notes
```

Which bot writes what is in `PROJECT_CHARTER.md` §7:
- COG Sales Manager: `Reps/` and the EOD and sales sections of `Daily/`
- Pre-Call Concierge: `Prospects/`
- Growth Operator: `Assets/Backlog.md`
- Sales Coach: `Coaching/`
- Pre-Call Concierge also tags `Assets/Content-Library.md`
- Chief: `Decisions.md`, the brief in `Daily/`, `Weekly/`

## Building it (setup Step 1)

Chief copies `/workspace/cog-team/repo/vault/` to `/workspace/cog-team/vault/`. That is the skeleton: `Home.md`, `Decisions.md`, the empty folders and the two templates.

## How Chris opens it

1. Install **Google Drive for desktop** and **Obsidian** on the Mac.
2. In Obsidian: **Open folder as vault** → pick `Google Drive/My Drive/GrokBot Vault`.

Treat that copy as read-only: the next backup overwrites notes the bots changed. To change what the team remembers, tell Chief ("Jordan is now a closer, not a setter"); it fixes the note and the change shows up after the next backup.

**Notes are plain `.md` files, never Google Docs.** If a note shows up in Drive as a Google Doc, the backup is wrong: fix the upload, don't convert the file. The backup copies what changed and never deletes anything in Drive.

## Rules the bots follow

- One fact in one place.
- Link people, prospects and days with `[[…]]`.
- Every number links its source. Unknown is not zero. Drafts are marked `[DRAFT]`.
- No secrets, tokens or keys in the vault.
- Corrections are recorded at the bottom of the note.
- This is a real record of reps and prospects. It stays on the bot computer and in Chris's own Drive. The GitHub repo holds only the empty skeleton.

## Later: search on top

When the vault is big enough that plain search is slow, add semantic search over these same files (for example mem0 or a local embedding index) as a layer on top. The markdown files stay the source of truth, so Chris can always open the vault and see what the team remembers.
