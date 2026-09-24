# @cryptoapis-io/mcp-blockchain-fees

MCP server for [Crypto APIs](https://cryptoapis.io/) Blockchain Fees product. Fee recommendations and gas estimates for UTXO, EVM, XRP, Tezos, and Solana blockchains.

> **API Version:** Compatible with Crypto APIs version **2024-12-12**

## Features

- UTXO fee recommendations and smart fee estimation (Bitcoin, Bitcoin Cash, Litecoin, Dogecoin, Dash, Zcash)
- EVM fee recommendations, EIP-1559 fees, and gas estimation for transfers and contract calls
- XRP fee recommendations
- Tezos fee recommendations and fee estimation for native XTZ, FA1.2, and FA2 transfers
- Solana fee recommendations and compute-unit estimation for native SOL transfers, SPL token transfers, and arbitrary program invocations

## Prerequisites

- Node.js 18+
- [Crypto APIs](https://cryptoapis.io/) account and API key ([sign up](https://app.cryptoapis.io/signup) | [get API key](https://app.cryptoapis.io/api-keys))

## Installation

```bash
npm install @cryptoapis-io/mcp-blockchain-fees
```

Or install all Crypto APIs MCP servers: `npm install @cryptoapis-io/mcp`

## Usage

```bash
# Run with API key
npx @cryptoapis-io/mcp-blockchain-fees --api-key YOUR_API_KEY

# Or use environment variable
export CRYPTOAPIS_API_KEY=YOUR_API_KEY
npx @cryptoapis-io/mcp-blockchain-fees

# HTTP transport (listens on 127.0.0.1; see "Exposing the server beyond localhost")
npx @cryptoapis-io/mcp-blockchain-fees --transport http --port 3000 --api-key YOUR_API_KEY
```

### Claude Desktop

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS, `%APPDATA%\Claude\claude_desktop_config.json` on Windows):

```json
{
  "mcpServers": {
    "cryptoapis-blockchain-fees": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-blockchain-fees"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` (project) or `~/.cursor/mcp.json` (global):

```json
{
  "mcpServers": {
    "cryptoapis-blockchain-fees": {
      "command": "npx",
      "args": ["-y", "@cryptoapis-io/mcp-blockchain-fees"],
      "env": {
        "CRYPTOAPIS_API_KEY": "your_api_key_here"
      }
    }
  }
}
```

### MCP Inspector

```bash
npx @modelcontextprotocol/inspector npx @cryptoapis-io/mcp-blockchain-fees --api-key YOUR_API_KEY
```

### n8n

1. Start the server in HTTP mode:
   ```bash
   npx @cryptoapis-io/mcp-blockchain-fees --transport http --port 3000 --api-key YOUR_API_KEY
   ```
2. In your n8n workflow, add an **AI Agent** node
3. Under **Tools**, add an **MCP Client Tool** and set the URL to `http://localhost:3000/mcp`

> **n8n in Docker:** `localhost` inside the container is not your machine. Start the server with `--host 0.0.0.0` and `MCP_AUTH_TOKEN` set (see [Exposing the server beyond localhost](#exposing-the-server-beyond-localhost)), use `http://host.docker.internal:3000/mcp` as the URL, and add an `Authorization: Bearer <token>` header to the MCP Client Tool credential.

> All servers default to port 3000. Use `--port` to assign different ports when running multiple servers.

## Available Tools

### `blockchain_fees_utxo`

Fee recommendations for UTXO blockchains (Bitcoin, Bitcoin Cash, Litecoin, Dogecoin, Dash, Zcash).

| Action | Description |
|--------|-------------|
| `get-fee-recommendations` | Get fee recommendations (slow, standard, fast) |
| `estimate-transaction-smart-fee` | Estimate smart fee for a target confirmation time |

### `blockchain_fees_evm`

Fee recommendations and gas estimation for EVM blockchains.

| Action | Description |
|--------|-------------|
| `get-fee-recommendations` | Get fee recommendations (slow, standard, fast) |
| `get-eip-1559-fee-recommendations` | Get EIP-1559 fee recommendations (base fee, priority fee) |
| `estimate-native-coin-transfer-gas` | Estimate gas for native coin transfer |
| `estimate-token-transfer-gas` | Estimate gas for token transfer |
| `estimate-contract-interaction-gas` | Estimate gas for contract interaction |

### `blockchain_fees_xrp`

Fee recommendations for XRP (mainnet, testnet).

| Action | Description |
|--------|-------------|
| `get-fee-recommendations` | Get XRP fee recommendations |

### `blockchain_fees_tezos`

Fee recommendations and fee estimation for Tezos (mainnet, shadownet).

| Action | Description |
|--------|-------------|
| `get-fee-recommendations` | Get current minimal fee/cost rates from the mempool |
| `estimate-transfer` | Estimate the fee for a native XTZ transfer |
| `estimate-fa12-transfer` | Estimate the fee for an FA1.2 token transfer |
| `estimate-fa2-transfer` | Estimate the fee for an FA2 token transfer |

### `blockchain_fees_solana`

Fee recommendations and compute-unit estimation for Solana (mainnet, devnet).

| Action | Description |
|--------|-------------|
| `get-fee-recommendations` | Get current priority fee recommendations from the mempool |
| `estimate-native-coin-transfer-compute-units` | Estimate compute units for a native SOL transfer |
| `estimate-token-transfer-compute-units` | Estimate compute units for an SPL token transfer |
| `estimate-program-invocation-compute-units` | Estimate compute units for an arbitrary program instruction call |

## CLI Arguments

| Argument | Description | Default |
|----------|-------------|---------|
| `--api-key` | Crypto APIs API key | `CRYPTOAPIS_API_KEY` env var |
| `--transport` | Transport type: `stdio` or `http` | `stdio` |
| `--host` | HTTP host (use `0.0.0.0` to accept remote connections — requires an auth token with `--api-key`) | `127.0.0.1` |
| `--auth-token` | Bearer token callers must send (`Authorization: Bearer <token>`); prefer the `MCP_AUTH_TOKEN` env var | `MCP_AUTH_TOKEN` env var |
| `--allowed-hosts` | Comma-separated `Host` header allowlist for non-loopback binds | — |
| `--port` | HTTP port | `3000` |
| `--path` | HTTP path | `/mcp` |
| `--stateless` | Enable stateless HTTP mode | `false` |

### HTTP API Key Modes

When using HTTP transport, the server supports two API key modes:

- **With `--api-key`:** The key is used for all requests. `x-api-key` request headers are ignored.
- **Without `--api-key`:** Each request must include an `x-api-key` header with a valid Crypto APIs key. This enables hosting a public server where each user provides their own key.

```bash
# Per-request key mode (multi-tenant)
npx @cryptoapis-io/mcp-blockchain-fees --transport http --port 3000
# Clients send x-api-key header with each request
```

### Exposing the server beyond localhost

HTTP mode listens on `127.0.0.1` by default, so only processes on the same machine can reach it.
To accept connections from other machines or containers, bind explicitly and protect the port:

```bash
# Startup-key mode: callers must present the token (the server refuses to start without one)
export MCP_AUTH_TOKEN=$(openssl rand -hex 32)
npx @cryptoapis-io/mcp-blockchain-fees --transport http --host 0.0.0.0 --port 3000 --api-key YOUR_API_KEY \
  --allowed-hosts mcp.internal.example
# Clients send: Authorization: Bearer $MCP_AUTH_TOKEN

# Per-request key mode: no startup key, every request must carry the caller's own x-api-key
npx @cryptoapis-io/mcp-blockchain-fees --transport http --host 0.0.0.0 --port 3000
```

`--allowed-hosts` restricts the `Host` header (DNS rebinding protection) when not bound to loopback. Prefer `MCP_AUTH_TOKEN` over `--auth-token`: command-line arguments are visible in the process list.

> Stdio transport always requires an API key at startup.

## Important: API Key Required

> **Warning:** Making requests without a valid API key — or with an incorrect one — may result in your IP being banned from the Crypto APIs ecosystem. Always ensure a valid API key is configured before starting any server.

## Remote MCP Server

Crypto APIs provides an official remote MCP server with all tools available via HTTP Streamable transport at [https://ai.cryptoapis.io/mcp](https://ai.cryptoapis.io/mcp). Pass your API key via the `x-api-key` header — no installation required.

## License

MIT
