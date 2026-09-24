import type { CryptoApisHttpClient, RequestMetadata } from "@cryptoapis-io/mcp-shared";

export type SolanaAccountMeta = {
    pubkey: string;
    isSigner: boolean;
    isWritable: boolean;
};

export type EstimateProgramInvocationComputeUnitsInput = {
    network: string;
    sender: string;
    programId: string;
    instructionData: string;
    accounts?: SolanaAccountMeta[];
} & RequestMetadata;

export async function estimateProgramInvocationComputeUnits(
    client: CryptoApisHttpClient,
    input: EstimateProgramInvocationComputeUnitsInput
) {
    return client.request<unknown>(
        "POST",
        `/blockchain-fees/solana/${input.network}/estimate-program-invocation-compute-units`,
        {
            query: { context: input.context },
            body: {
                data: {
                    item: {
                        sender: input.sender,
                        programId: input.programId,
                        instructionData: input.instructionData,
                        ...(input.accounts !== undefined && { accounts: input.accounts }),
                    },
                },
            },
        }
    );
}
