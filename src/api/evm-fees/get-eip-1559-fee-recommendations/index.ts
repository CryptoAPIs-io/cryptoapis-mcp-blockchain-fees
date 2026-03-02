import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type GetEip1559FeeRecommendationsInput = { blockchain: string; network: string } & RequestMetadata;

export async function getEip1559FeeRecommendations(client: CryptoApisHttpClient, input: GetEip1559FeeRecommendationsInput) {
    return client.request<unknown>("GET", `/blockchain-fees/evm/${input.blockchain}/${input.network}/eip-1559`, {
        query: { context: input.context },
    });
}
