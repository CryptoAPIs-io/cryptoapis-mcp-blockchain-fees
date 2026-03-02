import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type EstimateTransactionSmartFeeInput = {
    blockchain: string;
    network: string;
    confirmationTarget?: number;
    estimateMode?: string;
} & RequestMetadata;

export async function estimateTransactionSmartFee(client: CryptoApisHttpClient, input: EstimateTransactionSmartFeeInput) {
    return client.request<unknown>("GET", `/blockchain-fees/utxo/${input.blockchain}/${input.network}/smart`, {
        query: { context: input.context, confirmationTarget: input.confirmationTarget, estimateMode: input.estimateMode },
    });
}
