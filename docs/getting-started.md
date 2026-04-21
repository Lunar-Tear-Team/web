---
id: getting-started
sidebar_position: 2
---

# Getting Started

Lunar Tear is self-hosted. You run the server on your own machine and connect the game client to it locally. This guide walks you through the full setup.

:::abstract[What you'll do]
1. Clone the repo and populate the asset directory
2. Run database migrations
3. Import a game state snapshot
4. Start the CDN and game server
5. Patch the client and connect
:::

## Requirements

- **Go 1.25+** to build and run the server
- **[goose](https://github.com/pressly/goose)** migration tool
- **The game assets** (a populated `server/assets/` directory, see below)
- **The original NieR Re[in]carnation APK** (source this yourself)
- **An Android emulator** (e.g. BlueStacks, LDPlayer) or a rooted Android device (iOS is not yet supported)

Install goose:

```bash
go install github.com/pressly/goose/v3/cmd/goose@latest
```

## Step 1. Get the server

Clone the repository:

```bash
git clone https://github.com/Walter-Sparrow/lunar-tear.git
cd server
```

## Step 2. Populate assets

The server requires the original game's asset files in `server/assets/`. These are not distributed by this project. Extract them from the game client yourself.

:::warning
The server will not start if `server/assets/` is empty or missing. Populate it before continuing.
:::

## Step 3. Set up the database

Player state is stored in a SQLite database. Run migrations before starting the server:

```bash
cd server
make migrate
```

Or manually:

```bash
cd server
mkdir -p db
goose -dir migrations -allow-missing sqlite3 db/game.db up
```

## Step 4. Import a snapshot

To start from a specific game state, import a JSON snapshot. The `--uuid` flag must match the UUID your game client sends during authentication:

```bash
cd server
make import SNAPSHOT=snapshots/scene_1.json UUID=<your-client-uuid>
```

Or directly:

```bash
go run ./cmd/import-snapshot \
  --snapshot snapshots/scene_1.json \
  --uuid <your-client-uuid> \
  --db db/game.db
```

:::warning[UUID must match exactly]
If the `--uuid` value does not match what the client sends, the server will not find the imported account and will create a blank one instead. See [How do I find my client UUID?](/docs/faq#how-do-i-find-my-client-uuid) before running the import.
:::

| Flag | Default | Description |
|---|---|---|
| `--snapshot` | *(required)* | Path to JSON snapshot file |
| `--uuid` | *(required)* | UUID to assign (must match the client's UUID) |
| `--db` | `db/game.db` | SQLite database path |

## Step 5. Run the server

The server is split into two binaries: a gRPC game server and an HTTP asset CDN. Both must be running for the client to work.

:::warning
Start both `octo-cdn` and `lunar-tear`. The client will fail to connect if either is not running.
:::

**Start the CDN** (serves asset bundles, list.bin, master data, and web pages):

```bash
cd server
go run ./cmd/octo-cdn \
  --listen 0.0.0.0:8080 \
  --public-addr 10.0.2.2:8080
```

**Start the game server** (gRPC, points the client at the CDN):

```bash
cd server
go run ./cmd/lunar-tear \
  --host 10.0.2.2 \
  --grpc-port 8003 \
  --octo-url http://10.0.2.2:8080
```

`10.0.2.2` is the standard Android emulator address for your host machine's localhost. If connecting from a real device on the same network, use your machine's local IP instead.

The default gRPC port is 443, which is a privileged port and requires `sudo`. Using `--grpc-port` with a high port (like `8003`) avoids this, but requires a patched client pointing at that port.

:::tip[Avoid `sudo` on Linux]
If you need port 443, grant the binary the capability it needs instead of running as root:

```bash
go build -o lunar-tear ./cmd/lunar-tear
sudo setcap cap_net_bind_service=+ep ./lunar-tear
./lunar-tear --host 10.0.2.2 --octo-url http://10.0.2.2:8080
```
:::

The CDN can run on a separate machine. Set `--octo-url` on the game server and `--public-addr` on the CDN to the externally-reachable address.

## Step 6. Patch and connect the client

The game client needs to be redirected to point at your local server instead of Square Enix's endpoints. Patching instructions are available in the [Discord](https://discord.gg/MZAf5aVkJG) and in the [guides](/docs/guide) section of this wiki.

Install the patched APK in your emulator, launch the game, and it will connect to your locally running server.

:::success
If the game loads and reaches the title screen, the server is working correctly.
:::

## Server flags

### Game server (`lunar-tear`)

| Flag | Default | Description |
|---|---|---|
| `--host` | `127.0.0.1` | Hostname or IP given to the client for gRPC |
| `--grpc-port` | `443` | gRPC server port (client must be patched to match) |
| `--octo-url` | *(required)* | CDN base URL the client uses for assets (e.g. `http://10.0.2.2:8080`) |
| `--db` | `db/game.db` | SQLite database path |
| `--auth-url` | *(empty)* | Auth server base URL (e.g. `http://localhost:3000`) |

### CDN (`octo-cdn`)

| Flag | Default | Description |
|---|---|---|
| `--listen` | `0.0.0.0:8080` | Local bind address |
| `--public-addr` | `127.0.0.1:8080` | Externally-reachable address (used in list.bin rewriting) |
| `--assets-dir` | `.` | Root directory containing the `assets/` tree |

## Ports used

| Protocol | Port | Binary | Notes |
|---|---|---|---|
| gRPC | 443 | `lunar-tear` | Default; configurable with `--grpc-port` (requires patched client) |
| HTTP | 8080 | `octo-cdn` | Asset API and game web pages |

## Docker

:::tip[Easiest setup]
Docker Compose handles migrations automatically and runs all three services together. If you just want to get up and running quickly, this is the recommended path.
:::

Three services are available via Docker Compose: the game server (`lunar-tear`), the CDN (`octo-cdn`), and the auth server (`auth-server`). Migrations run automatically on game server start.

```bash
cd server
docker compose up -d
```

The `db/` directory is mounted as a volume so both `game.db` and `auth.db` persist across restarts. Make sure `assets/` is populated before starting.

| Service | Image | Default Port | Notes |
|---|---|---|---|
| `server` | `kretts/lunar-tear:latest` | 8003 | gRPC game server |
| `cdn` | `kretts/octo-cdn:latest` | 8080 | HTTP asset CDN |
| `auth` | `kretts/auth-server:latest` | 3000 | Account registration and login |

:::question[Do you need the auth server?]
Auth is optional. If you just want to play locally without account linking or recovery, you can skip it. Set `LUNAR_AUTH_URL` only if you want the Facebook login button in the client to work.
:::

Set `LUNAR_AUTH_URL` on the game server to connect it to the auth service (already wired in the default compose file). Auth is optional: if `LUNAR_AUTH_URL` is unset the game server starts without it.

## Auth server

A separate HTTP server that handles player account registration and login. The patched client's Facebook login button is redirected to this server, which presents a username/password form. Tokens issued here are validated by the game server to link or recover accounts.

```bash
cd server
go run ./cmd/auth-server \
  --port 3000 \
  --db db/auth.db
```

:::warning[Save your `--secret`]
If `--secret` is omitted, a random key is generated on startup. All existing tokens become invalid if the server restarts without the same key. Save the printed secret and pass it on every restart.
:::

| Flag | Default | Description |
|---|---|---|
| `--port` | `3000` | HTTP listen port |
| `--db` | `db/auth.db` | SQLite database path for auth users |
| `--secret` | *(generated)* | Hex-encoded HMAC secret for token signing |

## Claim account

Transfers an existing game account to the most recently connected client. Looks up a player by their in-game name, assigns the new client's UUID to that account, and deletes the empty account the new client created.

Useful when a new client connects and creates a throwaway account, but you want it to load an existing account instead.

```bash
cd server
go run ./cmd/claim-account --name "PlayerName" --db db/game.db
```

| Flag | Default | Description |
|---|---|---|
| `--name` | *(required)* | In-game player name to claim |
| `--db` | `db/game.db` | SQLite database path |

## Makefile targets

All targets run from the `server/` directory.

| Target | Description |
|---|---|
| `make proto` | Regenerate protobuf stubs |
| `make build` | Build the game server binary |
| `make build-cdn` | Build the CDN binary |
| `make build-import` | Build the import-snapshot tool |
| `make build-claim-account` | Build the claim-account tool |
| `make migrate` | Run goose migrations on `db/game.db` |
| `make import` | Import a snapshot (`SNAPSHOT=... UUID=...` required) |

## Troubleshooting

If you run into issues, check the [FAQ](/docs/faq) or ask in the [Discord](https://discord.gg/MZAf5aVkJG).
