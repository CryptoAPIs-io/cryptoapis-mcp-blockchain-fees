import * as z from "zod";

export const EvmFeesAction = z.enum([
    "get-fee-recommendations",
    "get-eip-1559-fee-recommendations",
    "estimate-native-coin-transfer-gas",
    "estimate-token-transfer-gas",
    "estimate-contract-interaction-gas",
]);
export const EvmBlockchain = z.enum(["ethereum", "ethereum-classic", "binance-smart-chain", "tron", "polygon", "avalanche", "arbitrum", "base", "optimism"]);
export const EvmNetwork = z.enum(["mainnet", "mordor", "testnet", "nile", "sepolia", "amoy", "fuji"]);
