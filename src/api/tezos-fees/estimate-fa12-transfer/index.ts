import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type EstimateFa12TransferFeeInput = {
    network: string;
    sender: string;
    recipient: string;
    contractAddress: string;
    amount: string;
    senderPublicKey?: string;
} & RequestMetadata;

export async function estimateFa12TransferFee(client: CryptoApisHttpClient, input: EstimateFa12TransferFeeInput) {
    return client.request<unknown>("POST", `/blockchain-fees/tezos/${input.network}/estimate-fa12-transfer`, {
        query: { context: input.context },
        body: {
            data: {
                item: {
                    sender: input.sender,
                    recipient: input.recipient,
                    contractAddress: input.contractAddress,
                    amount: input.amount,
                    ...(input.senderPublicKey !== undefined && { senderPublicKey: input.senderPublicKey }),
                },
            },
        },
    });
}
