import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type EstimateNativeCoinTransferGasInput = {
    blockchain: string;
    network: string;
    sender: string;
    recipient: string;
    amount: string;
    additionalData?: string;
} & RequestMetadata;

export async function estimateNativeCoinTransferGas(client: CryptoApisHttpClient, input: EstimateNativeCoinTransferGasInput) {
    return client.request<unknown>("POST", `/blockchain-fees/evm/${input.blockchain}/${input.network}/estimate-native-coin-transfer-gas-limit`, {
        query: { context: input.context },
        body: {
            data: {
                item: {
                    sender: input.sender,
                    recipient: input.recipient,
                    amount: input.amount,
                    ...(input.additionalData !== undefined && { additionalData: input.additionalData }),
                },
            },
        },
    });
}
