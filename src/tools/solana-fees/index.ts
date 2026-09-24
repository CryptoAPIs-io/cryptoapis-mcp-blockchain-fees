import type { CryptoApisHttpClient, McpLogger, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { SolanaFeesToolSchema, type SolanaFeesToolInput } from "./schema.js";
import * as api from "../../api/solana-fees/index.js";
import { credits as recCredits } from "./get-fee-recommendations/credits.js";
import { credits as nativeCredits } from "./estimate-native-coin-transfer-compute-units/credits.js";
import { credits as tokenCredits } from "./estimate-token-transfer-compute-units/credits.js";
import { credits as programCredits } from "./estimate-program-invocation-compute-units/credits.js";

const SOLANA_FEES_DESCRIPTION = `Blockchain Fees Solana: fee recommendations and compute-unit estimation. Solana uses compute units (not gas), so this is a distinct cost model from EVM.

Actions:
• get-fee-recommendations: Get current priority fee recommendations from the mempool
• estimate-native-coin-transfer-compute-units: Estimate compute units for a native SOL transfer
• estimate-token-transfer-compute-units: Estimate compute units for an SPL token transfer
• estimate-program-invocation-compute-units: Estimate compute units for an arbitrary program instruction call`;

export const solanaFeesTool: McpToolDef<typeof SolanaFeesToolSchema> = {
    name: "blockchain_fees_solana",
    description: SOLANA_FEES_DESCRIPTION,
    credits: {
        "get-fee-recommendations": recCredits,
        "estimate-native-coin-transfer-compute-units": nativeCredits,
        "estimate-token-transfer-compute-units": tokenCredits,
        "estimate-program-invocation-compute-units": programCredits,
    },
    inputSchema: SolanaFeesToolSchema,
    handler:
        (client: CryptoApisHttpClient, logger: McpLogger) =>
        async (input: SolanaFeesToolInput) => {
            const base = { network: input.network, context: input.context };
            let result: RequestResult<unknown>;
            switch (input.action) {
                case "get-fee-recommendations":
                    result = await api.getFeeRecommendations(client, base);
                    break;
                case "estimate-native-coin-transfer-compute-units":
                    if (!input.sender) throw new Error("sender is required for estimate-native-coin-transfer-compute-units");
                    if (!input.recipient) throw new Error("recipient is required for estimate-native-coin-transfer-compute-units");
                    if (!input.amount) throw new Error("amount is required for estimate-native-coin-transfer-compute-units");
                    result = await api.estimateNativeCoinTransferComputeUnits(client, {
                        ...base,
                        sender: input.sender,
                        recipient: input.recipient,
                        amount: input.amount,
                    });
                    break;
                case "estimate-token-transfer-compute-units":
                    if (!input.sender) throw new Error("sender is required for estimate-token-transfer-compute-units");
                    if (!input.recipient) throw new Error("recipient is required for estimate-token-transfer-compute-units");
                    if (!input.contractAddress) throw new Error("contractAddress is required for estimate-token-transfer-compute-units");
                    if (!input.amount) throw new Error("amount is required for estimate-token-transfer-compute-units");
                    if (!input.tokenStandard) throw new Error("tokenStandard is required for estimate-token-transfer-compute-units");
                    result = await api.estimateTokenTransferComputeUnits(client, {
                        ...base,
                        sender: input.sender,
                        recipient: input.recipient,
                        contractAddress: input.contractAddress,
                        amount: input.amount,
                        tokenStandard: input.tokenStandard,
                    });
                    break;
                case "estimate-program-invocation-compute-units":
                    if (!input.sender) throw new Error("sender is required for estimate-program-invocation-compute-units");
                    if (!input.programId) throw new Error("programId is required for estimate-program-invocation-compute-units");
                    if (!input.instructionData) throw new Error("instructionData is required for estimate-program-invocation-compute-units");
                    result = await api.estimateProgramInvocationComputeUnits(client, {
                        ...base,
                        sender: input.sender,
                        programId: input.programId,
                        instructionData: input.instructionData,
                        accounts: input.accounts,
                    });
                    break;
                default:
                    throw new Error(`Unknown action: ${(input as { action: string }).action}`);
            }

            logger.logInfo({
                tool: "blockchain_fees_solana",
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
