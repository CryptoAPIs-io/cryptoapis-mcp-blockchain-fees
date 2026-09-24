import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type EstimateFa2TransferFeeInput = {
    network: string;
    sender: string;
    recipient: string;
    contractAddress: string;
    amount: string;
    tokenId?: number;
    senderPublicKey?: string;
} & RequestMetadata;

export async function estimateFa2TransferFee(client: CryptoApisHttpClient, input: EstimateFa2TransferFeeInput) {
    return client.request<unknown>("POST", `/blockchain-fees/tezos/${input.network}/estimate-fa2-transfer`, {
        query: { context: input.context },
        body: {
            data: {
                item: {
                    sender: input.sender,
                    recipient: input.recipient,
                    contractAddress: input.contractAddress,
                    amount: input.amount,
                    ...(input.tokenId !== undefined && { tokenId: input.tokenId }),
                    ...(input.senderPublicKey !== undefined && { senderPublicKey: input.senderPublicKey }),
                },
            },
        },
    });
}
