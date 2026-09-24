import type { SupportedChainsResource } from "@cryptoapis-io/mcp-shared";

/**
 * Supported blockchains, networks, and actions for the blockchain-fees package.
 */
export const supportedChains: SupportedChainsResource = {
    evm: {
        blockchains: [
            "ethereum",
            "ethereum-classic",
            "binance-smart-chain",
            "tron",
            "polygon",
            "avalanche",
            "arbitrum",
            "base",
            "optimism",
        ],
        networks: {
            ethereum: ["mainnet", "sepolia"],
            "ethereum-classic": ["mainnet", "mordor"],
            "binance-smart-chain": ["mainnet", "testnet"],
            tron: ["mainnet", "nile"],
            polygon: ["mainnet", "amoy"],
            avalanche: ["mainnet", "fuji"],
            arbitrum: ["mainnet", "sepolia"],
            base: ["mainnet", "sepolia"],
            optimism: ["mainnet", "sepolia"],
        },
        actions: {
            "get-fee-recommendations": [
                "ethereum", "ethereum-classic", "binance-smart-chain", "tron",
                "polygon", "avalanche", "arbitrum", "base", "optimism",
            ],
            "get-eip-1559-fee-recommendations": [
                "ethereum", "ethereum-classic", "binance-smart-chain", "tron",
                "polygon", "avalanche", "arbitrum", "base", "optimism",
            ],
            "estimate-native-coin-transfer-gas": [
                "ethereum", "ethereum-classic", "binance-smart-chain", "tron",
                "polygon", "avalanche", "arbitrum", "base", "optimism",
            ],
            "estimate-token-transfer-gas": [
                "ethereum", "ethereum-classic", "binance-smart-chain", "tron",
                "polygon", "avalanche", "arbitrum", "base", "optimism",
            ],
            "estimate-contract-interaction-gas": [
                "ethereum", "ethereum-classic", "binance-smart-chain", "tron",
                "polygon", "avalanche", "arbitrum", "base", "optimism",
            ],
        },
    },
    utxo: {
        blockchains: [
            "bitcoin",
            "bitcoin-cash",
            "litecoin",
            "dogecoin",
            "dash",
            "zcash",
        ],
        networks: {
            bitcoin: ["mainnet", "testnet"],
            "bitcoin-cash": ["mainnet", "testnet"],
            litecoin: ["mainnet", "testnet"],
            dogecoin: ["mainnet", "testnet"],
            dash: ["mainnet", "testnet"],
            zcash: ["mainnet", "testnet"],
        },
        actions: {
            "get-fee-recommendations": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
            "estimate-transaction-smart-fee": ["bitcoin", "bitcoin-cash", "litecoin", "dogecoin", "dash", "zcash"],
        },
    },
    xrp: {
        blockchains: ["xrp"],
        networks: {
            xrp: ["mainnet", "testnet"],
        },
        actions: {
            "get-fee-recommendations": ["xrp"],
        },
    },
    tezos: {
        blockchains: ["tezos"],
        networks: {
            tezos: ["mainnet", "shadownet"],
        },
        actions: {
            "get-fee-recommendations": ["tezos"],
            "estimate-transfer": ["tezos"],
            "estimate-fa12-transfer": ["tezos"],
            "estimate-fa2-transfer": ["tezos"],
        },
    },
    solana: {
        blockchains: ["solana"],
        networks: {
            solana: ["mainnet", "devnet"],
        },
        actions: {
            "get-fee-recommendations": ["solana"],
            "estimate-native-coin-transfer-compute-units": ["solana"],
            "estimate-token-transfer-compute-units": ["solana"],
            "estimate-program-invocation-compute-units": ["solana"],
        },
    },
};
