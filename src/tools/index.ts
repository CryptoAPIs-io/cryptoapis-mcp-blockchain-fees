import { systemInfoTool } from "@cryptoapis-io/mcp-shared";
import { utxoFeesTool } from "./utxo-fees/index.js";
import { evmFeesTool } from "./evm-fees/index.js";
import { xrpFeesTool } from "./xrp-fees/index.js";
import { tezosFeesTool } from "./tezos-fees/index.js";
import { solanaFeesTool } from "./solana-fees/index.js";

export const tools = [utxoFeesTool, evmFeesTool, xrpFeesTool, tezosFeesTool, solanaFeesTool, systemInfoTool] as const;
