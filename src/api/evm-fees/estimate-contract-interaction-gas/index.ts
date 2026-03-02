import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type EstimateContractInteractionGasInput = {
    blockchain: string;
    network: string;
    sender: string;
    recipient: string;
    inputData: string;
    amount: string;
} & RequestMetadata;

export async function estimateContractInteractionGas(client: CryptoApisHttpClient, input: EstimateContractInteractionGasInput) {
    return client.request<unknown>("POST", `/blockchain-fees/evm/${input.blockchain}/${input.network}/estimate-contract-interaction-gas-limit`, {
        query: { context: input.context },
        body: {
            data: {
                item: {
                    sender: input.sender,
                    recipient: input.recipient,
                    inputData: input.inputData,
                    amount: input.amount,
                },
            },
        },
    });
}
