import { systemInfoTool } from "@cryptoapis-io/mcp-shared";
import { utxoFeesTool } from "./utxo-fees/index.js";
import { evmFeesTool } from "./evm-fees/index.js";
import { xrpFeesTool } from "./xrp-fees/index.js";

export const tools = [utxoFeesTool, evmFeesTool, xrpFeesTool, systemInfoTool] as const;
