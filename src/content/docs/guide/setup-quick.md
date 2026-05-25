---
title: Quick Setup
description: Run a Lunar Tear server locally with the interactive wizard — no flags, no networking knowledge.
---

This is the fastest way to get a Lunar Tear server running on your own machine — typically used for solo play with an Android emulator or a phone on the same network.

If you want to run a public server with multiple services on separate hosts, use the [Advanced Setup](/guide/setup-advanced/) instead.

## What you'll get

A single machine running three local services that the patched game client talks to:

- **gRPC game server** — game logic
- **Octo CDN** — assets and master data
- **Auth server** — account registration and login

The wizard launches all three together, picks ports, detects the right IP for your client, and saves your answers for next time.

## Requirements

- A computer running macOS, Linux, or Windows
- An Android emulator (Genymotion, Android Studio AVD, BlueStacks) or a real Android/iOS device on the same Wi-Fi
- A patched client (see the project repo — clients are **not** distributed here)

## Option A — Prebuilt binaries (recommended)

1. Open the [releases page](/releases/) and download the archive matching your OS and architecture:
   - `lunar-tear-server-<version>-linux-amd64.tar.gz`
   - `lunar-tear-server-<version>-darwin-arm64.tar.gz` (Apple Silicon)
   - `lunar-tear-server-<version>-darwin-amd64.tar.gz` (Intel Mac)
   - `lunar-tear-server-<version>-windows-amd64.zip`
2. Extract the archive somewhere convenient.
3. Run the wizard:

   - **macOS / Linux:** `./wizard`
   - **Windows:** double-click `wizard.exe`

The wizard asks a handful of questions, builds the right launch command, and starts everything.

:::tip[Save your answers]
On subsequent runs, just press Enter to reuse your saved configuration. To skip the confirmation prompt entirely:

```bash
./wizard --prefer-saved
```

**On Windows** you can bake the flag into a desktop shortcut so double-clicking starts the server immediately:

1. Right-click `wizard.exe` → **Send to** → **Desktop (create shortcut)** (or **Create shortcut** in the same folder).
2. Right-click the new shortcut → **Properties**.
3. In the **Target** field, append the flag — keep the path in quotes:

   ```text
   "C:\path\to\wizard.exe" --prefer-saved
   ```

4. Click **OK**. Double-clicking the shortcut now launches the wizard with your saved config, no prompts.
:::

## Option B — Build from source

If you'd rather build it yourself (or there's no release for your platform):

### Prerequisites

- [Go 1.25+](https://go.dev/dl/)
- The [goose](https://github.com/pressly/goose) migration tool:

  ```bash
  go install github.com/pressly/goose/v3/cmd/goose@latest
  ```

- A populated `server/assets/` directory (game asset files — see project repo for details; **not** distributed here)

### Clone and launch

```bash
git clone https://github.com/Walter-Sparrow/lunar-tear
cd lunar-tear/server
go run ./cmd/wizard
```

The first launch will run database migrations and prompt you for ports and network settings. Subsequent launches reuse the saved configuration.

## Custom ports

If something else on your machine is using one of the default ports (`3000`, `8003`, `8080`), override it **once** — the wizard saves your choice to `.wizard.json` and reuses it on every subsequent launch. You don't need to pass the flag again.

```bash
./wizard --grpc-port 9003 --cdn-port 9080 --auth-port 9000
```

After that first run, plain `./wizard` (or `./wizard --prefer-saved`) keeps using `9003 / 9080 / 9000`. If you ever pass *different* port flags later, the wizard notices the change and asks for confirmation before overwriting the saved values.

| Flag             | Default | Service                  |
| ---------------- | ------- | ------------------------ |
| `--grpc-port`    | `8003`  | Game server (gRPC)       |
| `--cdn-port`     | `8080`  | Asset CDN (HTTP)         |
| `--auth-port`    | `3000`  | Auth server (HTTP)       |
| `--admin-port`   | `0`     | Admin webhook (disabled by default; only binds when `LUNAR_ADMIN_TOKEN` is set) |

:::tip[Windows]
Run the wizard once from a terminal with the port flags to save them, then go back to double-clicking `wizard.exe` (or the `--prefer-saved` shortcut from above) — no need to bake the port flags into the shortcut.
:::

To reset back to the defaults, delete `.wizard.json` and relaunch the wizard.

## Connect your client

The wizard prints the addresses to point your patched client at when it starts. Typical values:

- **Android emulator:** `10.0.2.2` (the host machine, as seen from inside the emulator)
- **Real device on same Wi-Fi:** your computer's LAN IP (e.g. `192.168.1.50`)

Follow the patching instructions in the project repo for how to bake those addresses into the client.

## Stopping the server

`Ctrl+C` in the wizard window shuts down all three services cleanly.

## Backups

The wizard automatically backs up your save database every time it launches. To roll back:

```bash
cd server
make restore
```

Pick a backup from the list and confirm.

## Troubleshooting

- **"Permission denied" binding port 443** — port 443 is privileged. Use a high port via `--grpc-port`, or grant the binary capability on Linux: `sudo setcap cap_net_bind_service=+ep ./lunar-tear`.
- **Windows Firewall prompts every launch** — the wizard builds binaries to a stable path so this only happens once. If it keeps prompting, allow the listed binaries in `bin/`.
- **Client can't connect** — confirm the address you patched into the client matches what the wizard printed. From an emulator, `127.0.0.1` is *the emulator itself*, not your host — use `10.0.2.2` for Android Studio AVD or your LAN IP for real devices.

For anything else, ask in `#support` on [Discord](https://discord.gg/MZAf5aVkJG).
