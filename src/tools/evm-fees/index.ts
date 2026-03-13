import type { CryptoApisHttpClient, McpLogger, RequestResult } from "@cryptoapis-io/mcp-shared";
import type { McpToolDef } from "../types.js";
import { EvmFeesToolSchema, type EvmFeesToolInput } from "./schema.js";
import * as api from "../../api/evm-fees/index.js";
import { credits as recCredits } from "./get-fee-recommendations/credits.js";
import { credits as eipCredits } from "./get-eip-1559-fee-recommendations/credits.js";
import { credits as nativeGasCredits } from "./estimate-native-coin-transfer-gas/credits.js";
import { credits as tokenGasCredits } from "./estimate-token-transfer-gas/credits.js";
import { credits as contractGasCredits } from "./estimate-contract-interaction-gas/credits.js";

export const evmFeesTool: McpToolDef<typeof EvmFeesToolSchema> = {
    name: "blockchain_fees_evm",
    description: `Get fee recommendations and estimate gas costs for EVM blockchains. Use this before preparing or signing a transaction to determine appropriate gas parameters.

Actions:
• get-fee-recommendations: Get recommended gas price tiers (slow/standard/fast)
• get-eip-1559-fee-recommendations: Get EIP-1559 fee parameters (baseFee, maxPriorityFee) for supported chains
• estimate-native-coin-transfer-gas: Estimate gas for a native coin transfer (e.g. ETH, BNB)
• estimate-token-transfer-gas: Estimate gas for an ERC-20/ERC-721 token transfer
• estimate-contract-interaction-gas: Estimate gas for a smart contract call`,
    credits: {
        "get-fee-recommendations": recCredits,
        "get-eip-1559-fee-recommendations": eipCredits,
        "estimate-native-coin-transfer-gas": nativeGasCredits,
        "estimate-token-transfer-gas": tokenGasCredits,
        "estimate-contract-interaction-gas": contractGasCredits,
    },
    inputSchema: EvmFeesToolSchema,
    handler: (client: CryptoApisHttpClient, logger: McpLogger) => async (input: EvmFeesToolInput) => {
        const base = { blockchain: input.blockchain, network: input.network, context: input.context };
        let result: RequestResult<unknown>;
        switch (input.action) {
            case "get-fee-recommendations":
                result = await api.getFeeRecommendations(client, base);
                break;
            case "get-eip-1559-fee-recommendations":
                result = await api.getEip1559FeeRecommendations(client, base);
                break;
            case "estimate-native-coin-transfer-gas":
                result = await api.estimateNativeCoinTransferGas(client, { ...base, sender: input.fromAddress!, recipient: input.toAddress!, amount: input.value! });
                break;
            case "estimate-token-transfer-gas":
                result = await api.estimateTokenTransferGas(client, { ...base, sender: input.fromAddress!, recipient: input.toAddress!, contract: input.contractAddress!, contractType: input.contractType ?? "ERC-20", amount: input.amount! });
                break;
            case "estimate-contract-interaction-gas":
                result = await api.estimateContractInteractionGas(client, { ...base, sender: input.fromAddress!, recipient: input.contractAddress!, inputData: input.data!, amount: input.value ?? "0" });
                break;
            default:
                throw new Error(`Unknown action: ${(input as EvmFeesToolInput).action}`);
        }
        logger.logInfo({ tool: "blockchain_fees_evm", action: input.action, blockchain: input.blockchain, network: input.network, creditsConsumed: result.creditsConsumed, creditsAvailable: result.creditsAvailable, responseTime: result.responseTime, throughputUsage: result.throughputUsage });
        return { content: [{ type: "text", text: JSON.stringify({ ...(result.data as object), creditsConsumed: result.creditsConsumed, creditsAvailable: result.creditsAvailable, responseTime: result.responseTime, throughputUsage: result.throughputUsage }) }] };
    },
};
