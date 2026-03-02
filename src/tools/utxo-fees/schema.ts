import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";
import { UtxoFeesAction, UtxoBlockchain, UtxoNetwork } from "./base-schema.js";

export const UtxoFeesToolSchema = z
    .object({
        action: UtxoFeesAction.describe("Action to perform"),
        blockchain: UtxoBlockchain.describe("Blockchain protocol"),
        network: UtxoNetwork.describe("Network name"),
        confirmationTarget: z.number().int().positive().optional().describe("Target number of blocks for confirmation (estimate-transaction-smart-fee only)"),
        feeRatePriority: z.string().optional().describe("Fee rate priority: ECONOMICAL or CONSERVATIVE (estimate-transaction-smart-fee only)"),
    })
    .merge(RequestMetadataSchema);

export type UtxoFeesToolInput = z.infer<typeof UtxoFeesToolSchema>;
