---
id: getting-started
sidebar_position: 2
---

# Getting Started

Lunar Tear is self-hosted. You run the server on your own machine and connect the game client to it locally. This guide walks you through the full setup.

## Requirements

- **Go 1.24+** to build and run the server
- **The game assets** — a populated `server/assets/` directory (see below)
- **The original NieR Re[in]carnation APK** — source this yourself
- **An Android emulator** (e.g. BlueStacks, LDPlayer) or a rooted Android device (iOS is not yet supported)

## Step 1. Get the server

Clone the repository:

```bash
git clone https://github.com/Walter-Sparrow/lunar-tear.git
cd server
```

## Step 2. Populate assets

The server requires the original game's asset files in `server/assets/`. These are not distributed by this project. Extract them from the game client yourself.

## Step 3. Run the server

```bash
cd server
go run ./cmd/lunar-tear \
  --host 10.0.2.2 \
  --http-port 8080 \
  --scene 13
```

`10.0.2.2` is the standard Android emulator address for your host machine's localhost. If connecting from a real device on the same network, use your machine's local IP instead.

:::tip[Avoid `sudo` on Linux]
The gRPC server binds to port 443 (privileged). Instead of running with `sudo`, you can grant the binary the capability it needs:

```bash
go build -o lunar-tear ./cmd/lunar-tear
sudo setcap cap_net_bind_service=+ep ./lunar-tear
./lunar-tear --host 10.0.2.2 --http-port 8080 --scene 13
```
:::

## Step 4. Patch and connect the client

The game client needs to be redirected to point at your local server instead of Square Enix's endpoints. Patching instructions and a pre-patched APK are available in the [Discord](https://discord.gg/MZAf5aVkJG).

Install the patched APK in your emulator, launch the game, and it will connect to your locally running server.

## Server flags

| Flag | Default | Description |
|---|---|---|
| `--host` | `127.0.0.1` | Hostname or IP given to the client |
| `--http-port` | `8080` | Port for the HTTP / Octo asset server |
| `--scene` | `0` | Bootstrap new accounts to scene N (0 = fresh start) |

## Ports used

| Protocol | Port | Notes |
|---|---|---|
| gRPC | 443 | Hardcoded by the client, not configurable |
| HTTP | 8080 | Asset API and game web pages |

## Troubleshooting

If you run into issues, check the [FAQ](/docs/faq) or ask in the [Discord](https://discord.gg/MZAf5aVkJG).
