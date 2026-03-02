# @cryptoapis-io/mcp-blockchain-fees

MCP server for [Crypto APIs](https://cryptoapis.io/) Blockchain Fees product. Fee recommendations and gas estimates for UTXO, EVM, and XRP blockchains.

> **API Version:** Compatible with Crypto APIs version **2024-12-12**

## Features

- UTXO fee recommendations and smart fee estimation (Bitcoin, Bitcoin Cash, Litecoin, Dogecoin, Dash, Zcash)
- EVM fee recommendations, EIP-1559 fees, and gas estimation for transfers and contract calls
- XRP fee recommendations

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

# HTTP transport
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

## CLI Arguments

| Argument | Description | Default |
|----------|-------------|---------|
| `--api-key` | Crypto APIs API key | `CRYPTOAPIS_API_KEY` env var |
| `--transport` | Transport type: `stdio` or `http` | `stdio` |
| `--host` | HTTP host | `0.0.0.0` |
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

> Stdio transport always requires an API key at startup.

## Important: API Key Required

> **Warning:** Making requests without a valid API key — or with an incorrect one — may result in your IP being banned from the Crypto APIs ecosystem. Always ensure a valid API key is configured before starting any server.

## Hosted MCP Server

Crypto APIs provides an official hosted MCP server with all tools available via HTTP Streamable transport at [https://ai.cryptoapis.io/mcp](https://ai.cryptoapis.io/mcp). Pass your API key via the `x-api-key` header — no installation required.

## License

MIT
