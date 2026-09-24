import type { CryptoApisHttpClient, McpLogger, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { TezosFeesToolSchema, type TezosFeesToolInput } from "./schema.js";
import * as api from "../../api/tezos-fees/index.js";
import { credits as recCredits } from "./get-fee-recommendations/credits.js";
import { credits as transferCredits } from "./estimate-transfer/credits.js";
import { credits as fa12Credits } from "./estimate-fa12-transfer/credits.js";
import { credits as fa2Credits } from "./estimate-fa2-transfer/credits.js";

const TEZOS_FEES_DESCRIPTION = `Blockchain Fees Tezos: fee recommendations and fee estimation for XTZ, FA1.2, and FA2 transfers.

Actions:
• get-fee-recommendations: Get current minimal fee/cost rates from the mempool
• estimate-transfer: Estimate the fee for a native XTZ transfer
• estimate-fa12-transfer: Estimate the fee for an FA1.2 token transfer
• estimate-fa2-transfer: Estimate the fee for an FA2 token transfer`;

export const tezosFeesTool: McpToolDef<typeof TezosFeesToolSchema> = {
    name: "blockchain_fees_tezos",
    description: TEZOS_FEES_DESCRIPTION,
    credits: {
        "get-fee-recommendations": recCredits,
        "estimate-transfer": transferCredits,
        "estimate-fa12-transfer": fa12Credits,
        "estimate-fa2-transfer": fa2Credits,
    },
    inputSchema: TezosFeesToolSchema,
    handler:
        (client: CryptoApisHttpClient, logger: McpLogger) =>
        async (input: TezosFeesToolInput) => {
            const base = { network: input.network, context: input.context };
            let result: RequestResult<unknown>;
            switch (input.action) {
                case "get-fee-recommendations":
                    result = await api.getFeeRecommendations(client, base);
                    break;
                case "estimate-transfer":
                    if (!input.sender) throw new Error("sender is required for estimate-transfer");
                    if (!input.recipient) throw new Error("recipient is required for estimate-transfer");
                    if (!input.amount) throw new Error("amount is required for estimate-transfer");
                    result = await api.estimateTransferFee(client, {
                        ...base,
                        sender: input.sender,
                        recipient: input.recipient,
                        amount: input.amount,
                        senderPublicKey: input.senderPublicKey,
                    });
                    break;
                case "estimate-fa12-transfer":
                    if (!input.sender) throw new Error("sender is required for estimate-fa12-transfer");
                    if (!input.recipient) throw new Error("recipient is required for estimate-fa12-transfer");
                    if (!input.contractAddress) throw new Error("contractAddress is required for estimate-fa12-transfer");
                    if (!input.amount) throw new Error("amount is required for estimate-fa12-transfer");
                    result = await api.estimateFa12TransferFee(client, {
                        ...base,
                        sender: input.sender,
                        recipient: input.recipient,
                        contractAddress: input.contractAddress,
                        amount: input.amount,
                        senderPublicKey: input.senderPublicKey,
                    });
                    break;
                case "estimate-fa2-transfer":
                    if (!input.sender) throw new Error("sender is required for estimate-fa2-transfer");
                    if (!input.recipient) throw new Error("recipient is required for estimate-fa2-transfer");
                    if (!input.contractAddress) throw new Error("contractAddress is required for estimate-fa2-transfer");
                    if (!input.amount) throw new Error("amount is required for estimate-fa2-transfer");
                    result = await api.estimateFa2TransferFee(client, {
                        ...base,
                        sender: input.sender,
                        recipient: input.recipient,
                        contractAddress: input.contractAddress,
                        amount: input.amount,
                        tokenId: input.tokenId,
                        senderPublicKey: input.senderPublicKey,
                    });
                    break;
                default:
                    throw new Error(`Unknown action: ${(input as { action: string }).action}`);
            }

            logger.logInfo({
                tool: "blockchain_fees_tezos",
                action: input.action,
                network: input.network,
                creditsConsumed: result.creditsConsumed,
                creditsAvailable: result.creditsAvailable,
                responseTime: result.responseTime,
                throughputUsage: result.throughputUsage,
            });

            return {
                content: [
                    {
                        type: "text" as const,
                        text: JSON.stringify({
                            ...(result.data as object),
                            creditsConsumed: result.creditsConsumed,
                            creditsAvailable: result.creditsAvailable,
                            responseTime: result.responseTime,
                            throughputUsage: result.throughputUsage,
                        }),
                    },
                ],
            };
        },
};
