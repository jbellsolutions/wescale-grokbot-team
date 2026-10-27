# Slack setup

The team uses Slack two ways:

| | How | Used for |
|---|---|---|
| **Reading as Chris** | Grok Bot's Slack connector (Connect apps), signed in as Chris | Chris's DMs and mentions for Chief's brief, the KPI channel's history, the team channels |
| **Posting as the team bot** | The "COG Sales Manager" Slack app's bot token | The nightly EOD bump, and nothing else |

Posting as a bot means reps see "COG Sales Manager", not Chris, and the bot can only post where Chris invited it. The other choice is to post **as Chris** through the connector. Both are covered below.

## Which workspace

Chris may be in two workspaces: WeScale and COG's own. The KPI channel is in one of them (`cog.json` → `eod.slack_workspace`).

| The KPI channel is in | Reading (connector, as Chris) | Posting the bump (bot) |
|---|---|---|
| **WeScale** | Chris signs in to WeScale in Connect apps | Reuse the "COG Sales Manager" Slack app installed in WeScale on Oct 16 (below) |
| **COG's own workspace** | Chris signs in to COG's workspace in Connect apps | Install the app from `slack-app-manifest.json` in COG's workspace. Its admin approves the install |

If the connector holds only one workspace at a time, connect the KPI channel's workspace. Say in the first brief that DMs in the other one aren't scanned yet.

Ask COG's admin before installing. A pending install is the most common reason the bot "can't see" a channel.

**Read only what's needed.** The COG Sales Manager reads the KPI channel and the team channels listed in `cog.json`. Chief reads Chris's DMs and mentions.

## Option 1: reuse the app installed in WeScale on Oct 16

Use this when the KPI channel is in WeScale.

1. Go to https://api.slack.com/apps and open **COG Sales Manager**.
2. **OAuth & Permissions** → **Bot Token Scopes**. It needs exactly: `chat:write`, `channels:history`, `groups:history`, `channels:read`, `groups:read` and `users:read`. Add any that are missing. Remove nothing without asking Chris.
3. **Reinstall to Workspace** after adding scopes. The Oct 16 problem, no channel history, was a missing history scope.
4. Copy the **Bot User OAuth Token** (starts with `xoxb-`). Don't paste it into any chat. If the old Hermes bot still uses this token, pause Hermes first (`docs/HERMES-TO-GROKBOT.md`): two bots posting under one name is the failure to avoid.
5. Continue at "Invite the bot and give the token to the team".

## Option 2: create the app from the manifest

Use this when the KPI channel is in COG's own workspace, or when the Oct 16 app can't be reused.

1. Go to https://api.slack.com/apps → **Create New App** → **From a manifest** → pick the workspace the KPI channel is in.
2. Paste the contents of [`slack-app-manifest.json`](slack-app-manifest.json) → **Next** → **Create**.
3. **Install to Workspace** → **Allow**. If it says "request to install", that workspace's admin has to approve it.
4. **OAuth & Permissions** → copy the **Bot User OAuth Token** (starts with `xoxb-`). Don't paste it into any chat.

## Invite the bot and give the token to the team

1. In Slack, invite the bot to the KPI channel: `/invite @COG Sales Manager`. Private channels need this too.
2. Back in Grok Bot, the COG Sales Manager opens a hidden prompt on its computer (the `slack-api` skill). Choose **Take over**, paste the token, press Return, then choose **I'm done**. The token is saved in `/workspace/cog-team/.secrets/slack.env`, readable only by the bot's computer user. If Grok Bot offers a secure secret request for it instead, use that and name it `SLACK_BOT_TOKEN`.
3. **Check:** `auth.test` names the bot, and the bot can read the KPI channel's last message. The bot reports the check in its chat and posts nothing in Slack.

## Option 3: post as Chris

Set `bump.identity` to `chris`. The bump posts through the Slack connector signed in as Chris and shows as him. There is no app, no token and no admin approval. The standing approval is the same: one message per check, in the KPI channel, only the template Chris approved. Chris must be a member of the channel. The tradeoff: reps see the bump come from Chris's own account.

## Scopes and why

| Scope | Why |
|---|---|
| `channels:history`, `groups:history` | Read the KPI channel (public or private) to confirm a bump landed |
| `channels:read`, `groups:read` | Find the channel's ID by name |
| `chat:write` | Post the bump |
| `users:read` | Turn user IDs into names |

Not included on purpose: DMs, reactions, inviting people, managing channels, files, user groups, admin scopes.

## When something breaks

| Symptom | Fix |
|---|---|
| `not_in_channel` | `/invite @COG Sales Manager` in that channel |
| `missing_scope` | Add the scope under OAuth & Permissions → **Reinstall** (the token usually stays the same) |
| `invalid_auth` / `token_revoked` | Reinstall, copy the new token, paste it again with Take over |
| Install stuck on "pending" | The workspace admin hasn't approved it yet |
| A token was pasted into a chat | Regenerate it: **OAuth & Permissions** → **Revoke** (or reinstall), then paste the new one with Take over |
