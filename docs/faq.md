---
id: faq
sidebar_position: 5
---

# FAQ

## Is this legal?

Lunar Tear is a fan project. The official NieR Re[in]carnation servers shut down on April 29, 2024, making this the only way to play the game. We do not charge for access, distribute the game client, or profit in any way. The project is run in the spirit of game preservation. See the full [Legal Disclaimer](/docs/legal).

## Is there a public server I can connect to?

No. Lunar Tear is self-hosted. You run the server on your own machine and connect the game client to it locally. See the [Getting Started](/docs/getting-started) guide.

## Is my data from the official server available?

No. There is no access to Square Enix / Applibot's servers or databases. You can start fresh or import a community snapshot via the import tool. See the [Getting Started](/docs/getting-started) guide for details.

## Which platforms are supported?

Android (via patched APK) running on an emulator or rooted device. iOS support is currently in development and not yet available.

## Where do I get the game assets?

The game assets (asset bundles, master data, etc.) are not distributed by this project. You need to extract them from the original game client yourself. The easiest way is to ask in the [Discord](https://discord.gg/MZAf5aVkJG), where the community can point you to extraction tools and instructions.

## Where do I get the APK?

The original NieR Re[in]carnation APK is not distributed by this project. You need to source it yourself from an APK archive site. Once you have it, patching instructions are available in the [Discord](https://discord.gg/MZAf5aVkJG) and in the [guides](/docs/guide) section of this wiki.

## What is a snapshot and where do I get one?

A snapshot is a JSON file containing a complete exported game state: costumes, weapons, characters, quest progress, inventory, and everything else. Importing one lets you start from a specific point in the game rather than a completely blank account.

Snapshots are shared by the community on the [Discord](https://discord.gg/MZAf5aVkJG). They are not bundled with the server, so you need to obtain one from there, then import it using the `import-snapshot` tool as described in [Getting Started](/docs/getting-started).

## How do I find my client UUID?

The UUID is logged by the server the moment the client connects. Look for a line like this in the game server's console output:

```
[UserService] RegisterUser: uuid=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

or on reconnect:

```
[UserService] Auth: uuid=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

Copy that UUID and use it as the `--uuid` flag when importing a snapshot.

## My snapshot imported but the game shows a blank account. Why?

The UUID you used during import does not match the UUID the client is sending. The server creates a new blank account for any UUID it does not recognise.

Check the server logs for the UUID the client is actually using (see above), then re-run the import with the correct UUID. Alternatively, use the `claim-account` tool to reassign an existing account to the new client UUID:

```bash
cd server
go run ./cmd/claim-account --name "PlayerName" --db db/game.db
```

## My game won't connect. What do I do?

Make sure both binaries are running: the gRPC game server (`lunar-tear`) and the HTTP asset CDN (`octo-cdn`). The client needs both to work.

Then check the following:

1. Confirm the `--host` flag on the game server matches the address the emulator/device uses to reach your machine (`10.0.2.2` for most Android emulators)
2. Confirm `--octo-url` on the game server points to the address and port where `octo-cdn` is listening
3. Check that the gRPC port is not blocked by a firewall (default 443, or whichever port you set with `--grpc-port`)
4. Ask in the [Discord](https://discord.gg/MZAf5aVkJG) if you're still stuck

## A new client connected and has the wrong account. How do I fix it?

When a new client connects for the first time, it creates a blank account. If you want it to load an existing account instead, use the `claim-account` tool:

```bash
cd server
go run ./cmd/claim-account --name "PlayerName" --db db/game.db
```

This looks up the account by in-game name, assigns the new client's UUID to it, and removes the blank account.

## Do I need the auth server?

No, it is optional. The auth server handles account registration and login via a username/password form (replacing the Facebook login in the original client). If `--auth-url` is not set on the game server, it starts without it. You only need it if you want persistent account linking or recovery across client reconnections.

## My session expired and the game logged me out. Is that normal?

Yes. Sessions are valid for 24 hours. After that, the client will need to re-authenticate. If you are using the auth server, simply log in again through the Facebook login button in the client. If you are not using the auth server, restarting the client and reconnecting is enough.

## Can I contribute to the project?

Yes. Check the [GitHub](https://github.com/Walter-Sparrow/lunar-tear) or [GitLab](https://gitlab.com/walter-sparrow-group/lunar-tear) for open issues. You can also contribute to this wiki by clicking "Edit this page" at the bottom of any page.

## How do I report a bug?

Open an issue on [GitHub](https://github.com/Walter-Sparrow/lunar-tear) or [GitLab](https://gitlab.com/walter-sparrow-group/lunar-tear), or report it in the [Discord](https://discord.gg/MZAf5aVkJG). Include your OS, Go version, client version, emulator, and steps to reproduce.
