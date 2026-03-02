import * as z from "zod";
import { RequestMetadataSchema } from "@cryptoapis-io/mcp-shared";

export const XrpFeesToolSchema = z
    .object({
        network: z.enum(["mainnet", "testnet"]).describe("Network name"),
    })
    .merge(RequestMetadataSchema);

export type XrpFeesToolInput = z.infer<typeof XrpFeesToolSchema>;
