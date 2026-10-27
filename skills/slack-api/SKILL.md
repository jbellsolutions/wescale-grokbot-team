---
name: slack-api
description: Use whenever you read the KPI channel with the team bot token, post the EOD bump as the team bot, or check that the Slack token works. The only thing the COG Sales Manager may post is the EOD bump, under standing approval 1.
---

# Slack API (team bot)

Two ways into Slack, for two jobs:

| Job | Use | Why |
|---|---|---|
| Read Chris's DMs and mentions, search, read the KPI channel's history for EODs | The Slack connector (Connect apps, signed in as Chris) | Only Chris's own access sees his DMs. It reads any channel he is in |
| Post the EOD bump as the team bot, and read the KPI channel to check the bump landed | The team bot token `SLACK_BOT_TOKEN` (the "COG Sales Manager" Slack app, `/workspace/cog-team/repo/docs/SLACK-SETUP.md`) | The post comes from the bot, not from Chris, and the bot only sees channels it was invited to |

If `bump.identity` in `/workspace/cog-team/context/cog.json` is `chris`, there is no token: post the bump through the Slack connector, signed in as Chris, with the same rules below.

**The bump is the only post.** One message per check, in the KPI channel, under standing approval 1 (`/workspace/cog-team/context/standing-approvals.md`), and only when `/workspace/cog-team/context/eod-mode.md` says `live`. The one exception is the go-live test (START-HERE Step 11): in **test mode** the bump goes to `eod.test_channel_id`, a channel only Chris is in, and never to the KPI channel. The rules and templates are in the `cog-eod-compliance` skill. Never post anything else with this skill: no DM, no thread reply, no edit, no reaction, no second message. Anything else waits for Chris.

## Where the token is

Best: a **secure secret** named `SLACK_BOT_TOKEN`. The bot's shell then reads it as an environment variable, and it never appears in chat. If there isn't one, Chris pasted the token with **Take over** into a hidden prompt, which saved it to `/workspace/cog-team/.secrets/slack.env` (mode 600) as `SLACK_BOT_TOKEN=…`. It lives under `/workspace` because files there survive; temporary folders and the home folder may not. The nightly vault backup copies only `vault/`, so the token never leaves this computer. Never print, echo or log it. If `SLACK_BOT_TOKEN` isn't already set, load it with:

```bash
set -a; . /workspace/cog-team/.secrets/slack.env; set +a
```

If it's missing, open a terminal on the bot's computer, run the hidden prompt, and ask Chris to choose **Take over**, paste the token and press Return, then choose **I'm done**:

```bash
mkdir -p /workspace/cog-team/.secrets && chmod 700 /workspace/cog-team/.secrets && (umask 077; read -rsp "Paste the Slack bot token (xoxb-…), then press Return: " T && printf 'SLACK_BOT_TOKEN=%s\n' "$T" > /workspace/cog-team/.secrets/slack.env)
```

If neither the secure secret nor `/workspace/cog-team/.secrets/slack.env` is there in a later session, don't ask for the token in chat. Say it is missing, record `UNKNOWN: Slack bot token` on the run line, draft the bump for Chris, and ask him to run the hidden prompt again.

## Calls

All calls: `-H "Authorization: Bearer $SLACK_BOT_TOKEN"`, base `https://slack.com/api/`. **Check `"ok": true` in every response.** A response without it did not work, whatever the HTTP status says.

| What | Method |
|---|---|
| Check the token | `auth.test`. It returns `user_id` (the bot) and `url` (the workspace address) |
| Find a channel's ID | `conversations.list?types=public_channel,private_channel&limit=1000` (follow `response_metadata.next_cursor`) |
| Read the KPI channel | `conversations.history?channel=C…&oldest=<unix>&latest=<unix>&limit=200` (paginate) |
| Read a thread | `conversations.replies?channel=C…&ts=<parent ts>` |
| A user's name | `users.info?user=U…` |
| Post the bump | `chat.postMessage` with JSON `{"channel":"C…","text":"…"}` and `Content-Type: application/json; charset=utf-8` |

Mentions in the bump: `<@U…>`, the member ID from the roster. Never a typed name.

## Posting the bump safely

1. **Read first.** Read `/workspace/cog-team/data/eod/<report date>.posted`. If it already has a line for this check (`first` or `final`), stop: it was posted.
2. Read the KPI channel from 18:00 ET on the report date, not from the check time. If any bot- or app-posted message there looks like an EOD bump for this report date and is **not recorded in the `.posted` file**, don't post: the old Hermes bot may still be running, and if it shares this bot token, its posts carry the same `user_id` as yours, so the `.posted` file is the only way to tell yours from its. Send Chris the draft and tell Chief "second bumper". A person's message is not a bump.
3. Post once. Check `"ok": true`. Take `channel` and `ts` from the response.
4. Record one line in the `.posted` file: `first <ts> <link>` or `final <ts> <link>`. The link is the workspace `url` from `auth.test`, then `archives/<channel>/p<ts without the dot>`.
5. **If the call timed out, errored, or you can't tell whether it posted: don't retry yet.** Read the channel history from just before the post. Look for a message with the bump text whose `ts` is later than your own post attempt. If it is there, it landed: record it and stop. Only if it is not there, try once more. Never post twice.

## Errors

| Error | Meaning | Do |
|---|---|---|
| `not_in_channel` | The bot isn't in that channel | Tell Chris: "Invite @COG Sales Manager to the KPI channel". Draft the bump meanwhile |
| `channel_not_found` | Wrong ID, or a private channel the bot can't see | Same |
| `missing_scope` | The app lacks a scope | Tell Chris which scope; he adds it and reinstalls (`/workspace/cog-team/repo/docs/SLACK-SETUP.md`) |
| `invalid_auth`, `token_revoked`, `account_inactive` | Token dead | Stop posting, tell Chris, and re-run the hidden prompt after he reinstalls |
| `ratelimited` | Too fast | Wait the `Retry-After` seconds once, then continue |

After two failures in a row, stop the run. Send Chris the draft, log `FAILED` with the reason, and Chief will list it in the morning brief.
