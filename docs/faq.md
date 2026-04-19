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

No. There is no access to Square Enix / Applibot's servers or databases. All saves start fresh.

## Which platforms are supported?

Android (via patched APK) running on an emulator or rooted device. iOS support is currently in development and not yet available.

## My game won't connect. What do I do?

1. Make sure the server is actually running on your machine
2. Confirm the `--host` flag matches the address the emulator/device uses to reach your machine (`10.0.2.2` for most Android emulators)
3. Check that port 443 (gRPC) is not blocked by a firewall
4. Ask in the [Discord](https://discord.gg/G3anrfcV) if you're still stuck

## Can I contribute to the project?

Yes. Check the [GitHub](https://github.com/Walter-Sparrow/lunar-tear) or [GitLab](https://gitlab.com/walter-sparrow-group/lunar-tear) for open issues. You can also contribute to this wiki by clicking "Edit this page" at the bottom of any page.

## How do I report a bug?

Open an issue on [GitHub](https://github.com/Walter-Sparrow/lunar-tear) or [GitLab](https://gitlab.com/walter-sparrow-group/lunar-tear), or report it in the [Discord](https://discord.gg/G3anrfcV). Include your OS, Go version, client version, emulator, and steps to reproduce.
