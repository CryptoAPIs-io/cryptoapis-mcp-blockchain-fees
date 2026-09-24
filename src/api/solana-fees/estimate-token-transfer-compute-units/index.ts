import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type EstimateTokenTransferComputeUnitsInput = {
    network: string;
    sender: string;
    recipient: string;
    contractAddress: string;
    amount: string;
    tokenStandard: "TOKEN" | "TOKEN-2022";
} & RequestMetadata;

export async function estimateTokenTransferComputeUnits(
    client: CryptoApisHttpClient,
    input: EstimateTokenTransferComputeUnitsInput
) {
    return client.request<unknown>(
        "POST",
        `/blockchain-fees/solana/${input.network}/estimate-token-transfer-compute-units`,
        {
            query: { context: input.context },
            body: {
                data: {
                    item: {
                        sender: input.sender,
                        recipient: input.recipient,
                        contractAddress: input.contractAddress,
                        amount: input.amount,
                        tokenStandard: input.tokenStandard,
                    },
                },
            },
        }
    );
}
