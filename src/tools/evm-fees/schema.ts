import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { EvmFeesAction, EvmBlockchain, EvmNetwork } from "./base-schema.js";

export const EvmFeesToolSchema = z
    .object({
        action: EvmFeesAction.describe("Action to perform"),
        blockchain: EvmBlockchain.describe("Blockchain protocol"),
        network: EvmNetwork.describe("Network name"),
        fromAddress: z.string().min(1).optional().describe("Sender address (required for gas estimation actions)"),
        toAddress: z.string().min(1).optional().describe("Recipient address (required for native coin and token transfer gas estimation)"),
        value: z.string().optional().describe("Amount in native coin's smallest unit, e.g. wei (required for estimate-native-coin-transfer-gas; optional for estimate-contract-interaction-gas)"),
        contractAddress: z.string().optional().describe("Token contract address (required for estimate-token-transfer-gas and estimate-contract-interaction-gas)"),
        contractType: z.string().optional().describe("Token standard: ERC-20 or ERC-721 (estimate-token-transfer-gas only; defaults to ERC-20)"),
        amount: z.string().optional().describe("Token amount to transfer (required for estimate-token-transfer-gas)"),
        data: z.string().optional().describe("Hex-encoded calldata (required for estimate-contract-interaction-gas)"),
    })
    .merge(RequestMetadataSchema);

export type EvmFeesToolInput = z.infer<typeof EvmFeesToolSchema>;
