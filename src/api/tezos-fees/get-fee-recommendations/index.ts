import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type GetFeeRecommendationsInput = { network: string } & RequestMetadata;

export async function getFeeRecommendations(client: CryptoApisHttpClient, input: GetFeeRecommendationsInput) {
    return client.request<unknown>("GET", `/blockchain-fees/tezos/${input.network}/mempool`, {
        query: { context: input.context },
    });
}
