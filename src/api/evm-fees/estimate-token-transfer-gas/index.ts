import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type EstimateTokenTransferGasInput = {
    blockchain: string;
    network: string;
    sender: string;
    recipient: string;
    contract: string;
    contractType: string;
    amount: string;
} & RequestMetadata;

export async function estimateTokenTransferGas(client: CryptoApisHttpClient, input: EstimateTokenTransferGasInput) {
    return client.request<unknown>("POST", `/blockchain-fees/evm/${input.blockchain}/${input.network}/estimate-token-transfer-gas-limit`, {
        query: { context: input.context },
        body: {
            data: {
                item: {
                    sender: input.sender,
                    recipient: input.recipient,
                    contract: input.contract,
                    contractType: input.contractType,
                    amount: input.amount,
                },
            },
        },
    });
}
