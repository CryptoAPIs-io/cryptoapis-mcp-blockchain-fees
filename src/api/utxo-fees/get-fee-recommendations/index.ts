import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type GetFeeRecommendationsInput = { blockchain: string; network: string } & RequestMetadata;

export async function getFeeRecommendations(client: CryptoApisHttpClient, input: GetFeeRecommendationsInput) {
    return client.request<unknown>("GET", `/blockchain-fees/utxo/${input.blockchain}/${input.network}/mempool`, {
        query: { context: input.context },
    });
}
