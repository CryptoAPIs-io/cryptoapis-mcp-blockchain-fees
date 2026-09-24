import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type EstimateTransferFeeInput = {
    network: string;
    sender: string;
    recipient: string;
    amount: string;
    senderPublicKey?: string;
} & RequestMetadata;

export async function estimateTransferFee(client: CryptoApisHttpClient, input: EstimateTransferFeeInput) {
    return client.request<unknown>("POST", `/blockchain-fees/tezos/${input.network}/estimate-transfer`, {
        query: { context: input.context },
        body: {
            data: {
                item: {
                    sender: input.sender,
                    recipient: input.recipient,
                    amount: input.amount,
                    ...(input.senderPublicKey !== undefined && { senderPublicKey: input.senderPublicKey }),
                },
            },
        },
    });
}
