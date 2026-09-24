import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type EstimateNativeCoinTransferComputeUnitsInput = {
    network: string;
    sender: string;
    recipient: string;
    amount: string;
} & RequestMetadata;

export async function estimateNativeCoinTransferComputeUnits(
    client: CryptoApisHttpClient,
    input: EstimateNativeCoinTransferComputeUnitsInput
) {
    return client.request<unknown>(
        "POST",
        `/blockchain-fees/solana/${input.network}/estimate-native-coin-transfer-compute-units`,
        {
            query: { context: input.context },
            body: {
                data: {
                    item: {
                        sender: input.sender,
                        recipient: input.recipient,
                        amount: input.amount,
                    },
                },
            },
        }
    );
}
