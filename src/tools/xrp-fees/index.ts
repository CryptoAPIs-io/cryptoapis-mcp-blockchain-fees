import type { CryptoApisHttpClient, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { XrpFeesToolSchema, type XrpFeesToolInput } from "./schema.js";
import { getFeeRecommendations } from "../../api/xrp-fees/get-fee-recommendations/index.js";
import { credits as recCredits } from "./credits.js";

export const xrpFeesTool: McpToolDef<typeof XrpFeesToolSchema> = {
    name: "blockchain_fees_xrp",
    description: "Blockchain Fees XRP: get fee recommendations. Networks: mainnet, testnet.",
    credits: recCredits,
    inputSchema: XrpFeesToolSchema,
    handler: (client: CryptoApisHttpClient) => async (input: XrpFeesToolInput) => {
        const result = await getFeeRecommendations(client, { network: input.network, context: input.context });
        return { content: [{ type: "text", text: JSON.stringify({ ...(result.data as object), creditsConsumed: result.creditsConsumed, creditsAvailable: result.creditsAvailable, responseTime: result.responseTime, throughputUsage: result.throughputUsage }) }] };
    },
};
