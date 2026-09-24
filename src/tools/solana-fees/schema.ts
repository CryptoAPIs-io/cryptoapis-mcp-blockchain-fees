import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

export const SolanaFeesAction = z.enum([
    "get-fee-recommendations",
    "estimate-native-coin-transfer-compute-units",
    "estimate-token-transfer-compute-units",
    "estimate-program-invocation-compute-units",
]);

export const SolanaFeesToolSchema = z
    .object({
        action: SolanaFeesAction.describe("Action to perform"),
        network: z.enum(["mainnet", "devnet"]).describe("Network name"),
        sender: z
            .string()
            .optional()
            .describe("Sender address - required for all estimate actions"),
        recipient: z
            .string()
            .optional()
            .describe(
                "Recipient address - required for estimate-native-coin-transfer-compute-units, estimate-token-transfer-compute-units"
            ),
        amount: z
            .string()
            .optional()
            .describe(
                "Amount in lamports (native) or token base units (token) - required for estimate-native-coin-transfer-compute-units, estimate-token-transfer-compute-units"
            ),
        contractAddress: z
            .string()
            .optional()
            .describe("SPL token mint address - required for estimate-token-transfer-compute-units"),
        tokenStandard: z
            .enum(["TOKEN", "TOKEN-2022"])
            .optional()
            .describe("SPL token program standard - required for estimate-token-transfer-compute-units"),
        programId: z
            .string()
            .optional()
            .describe("On-chain program address to invoke - required for estimate-program-invocation-compute-units"),
        instructionData: z
            .string()
            .optional()
            .describe(
                "Base58/base64-encoded instruction data for the program call - required for estimate-program-invocation-compute-units"
            ),
        accounts: z
            .array(z.object({ pubkey: z.string(), isSigner: z.boolean(), isWritable: z.boolean() }))
            .optional()
            .describe(
                "Accounts referenced by the instruction, in the order the program expects them (estimate-program-invocation-compute-units only; may be empty)"
            ),
    })
    .merge(RequestMetadataSchema);

export type SolanaFeesToolInput = z.infer<typeof SolanaFeesToolSchema>;
