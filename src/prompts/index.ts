import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { GetPromptResult } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { formatSupportedChains } from "@cryptoapis-io/mcp-shared";
import { supportedChains } from "../resources/supported-chains.js";

export function registerPrompts(server: McpServer): void {
    server.registerPrompt(
        "compare-fees",
        {
            description: "Compare current fee estimates across blockchains",
            argsSchema: {
                blockchains: z.string().describe("Comma-separated list of blockchains to compare, e.g. 'ethereum,bitcoin,polygon'"),
            },
        },
        (args): GetPromptResult => ({
            messages: [{
                role: "user",
                content: {
                    type: "text",
                    text: `Compare current transaction fee estimates across the requested blockchains: ${args.blockchains}. For each blockchain, use the appropriate fee tool (blockchain_fees_evm, blockchain_fees_utxo, or blockchain_fees_xrp) with action 'get-fee-recommendations' on mainnet. Present the results in a comparison table showing slow/standard/fast fee tiers with estimated costs in both native units and approximate USD if available.\n\n${formatSupportedChains(supportedChains)}`,
                },
            }],
        }),
    );
}
