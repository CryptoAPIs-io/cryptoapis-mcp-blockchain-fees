import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { UtxoFeesToolSchema, type UtxoFeesToolInput } from "./schema.js";
import * as api from "../../api/utxo-fees/index.js";
import { credits as recCredits } from "./get-fee-recommendations/credits.js";
import { credits as estCredits } from "./estimate-transaction-smart-fee/credits.js";

export const utxoFeesTool: McpToolDef<typeof UtxoFeesToolSchema> = {
    name: "blockchain_fees_utxo",
    description: `Get fee recommendations for UTXO blockchains (bitcoin, bitcoin-cash, litecoin, dogecoin, dash, zcash). Use this before preparing or signing a transaction to determine the appropriate fee rate.

Actions:
• get-fee-recommendations: Get recommended fee-per-byte tiers (slow/standard/fast) from the mempool
• estimate-transaction-smart-fee: Estimate the fee rate needed for confirmation within a target number of blocks`,
    credits: { "get-fee-recommendations": recCredits, "estimate-transaction-smart-fee": estCredits },
    inputSchema: UtxoFeesToolSchema,
    handler: (client: CryptoApisHttpClient) => async (input: UtxoFeesToolInput) => {
        const base = { blockchain: input.blockchain, network: input.network, context: input.context };
        let result: RequestResult<unknown>;
        if (input.action === "get-fee-recommendations") {
            result = await api.getFeeRecommendations(client, base);
        } else {
            result = await api.estimateTransactionSmartFee(client, { ...base, confirmationTarget: input.confirmationTarget, estimateMode: input.feeRatePriority });
        }
        return { content: [{ type: "text", text: JSON.stringify({ ...(result.data as object), creditsConsumed: result.creditsConsumed, creditsAvailable: result.creditsAvailable, responseTime: result.responseTime, throughputUsage: result.throughputUsage }) }] };
    },
};
