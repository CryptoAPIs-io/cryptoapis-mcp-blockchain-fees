import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

export const TezosFeesAction = z.enum([
    "get-fee-recommendations",
    "estimate-transfer",
    "estimate-fa12-transfer",
    "estimate-fa2-transfer",
]);

export const TezosFeesToolSchema = z
    .object({
        action: TezosFeesAction.describe("Action to perform"),
        network: z.enum(["mainnet", "shadownet"]).describe("Network name"),
        sender: z
            .string()
            .optional()
            .describe("Sender address - required for estimate-transfer, estimate-fa12-transfer, estimate-fa2-transfer"),
        recipient: z
            .string()
            .optional()
            .describe("Recipient address - required for estimate-transfer, estimate-fa12-transfer, estimate-fa2-transfer"),
        senderPublicKey: z
            .string()
            .optional()
            .describe("Sender's public key - required only when the source account is unrevealed (all estimate actions)"),
        amount: z
            .string()
            .optional()
            .describe("Amount in mutez (transfer) or token base units (fa12/fa2) as an integer string - required for all estimate actions"),
        contractAddress: z
            .string()
            .optional()
            .describe("FA1.2/FA2 token contract address - required for estimate-fa12-transfer, estimate-fa2-transfer"),
        tokenId: z
            .string()
            .regex(/^\d+$/, "tokenId must be a non-negative integer string, e.g. \"0\"")
            .optional()
            .describe('FA2 token ID as an integer STRING (e.g. "0") - estimate-fa2-transfer only; the API rejects a number'),
    })
    .merge(RequestMetadataSchema);

export type TezosFeesToolInput = z.infer<typeof TezosFeesToolSchema>;
