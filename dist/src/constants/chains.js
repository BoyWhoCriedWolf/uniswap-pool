import { ChainId, SUPPORTED_CHAINS } from '@uniswap/sdk-core';

const CHAIN_IDS_TO_NAMES = {
  [ChainId.MAINNET]: "mainnet",
  [ChainId.GOERLI]: "goerli",
  [ChainId.SEPOLIA]: "sepolia",
  [ChainId.POLYGON]: "polygon",
  [ChainId.POLYGON_MUMBAI]: "polygon_mumbai",
  [ChainId.CELO]: "celo",
  [ChainId.CELO_ALFAJORES]: "celo_alfajores",
  [ChainId.ARBITRUM_ONE]: "arbitrum",
  [ChainId.ARBITRUM_GOERLI]: "arbitrum_goerli",
  [ChainId.OPTIMISM]: "optimism",
  [ChainId.OPTIMISM_GOERLI]: "optimism_goerli",
  [ChainId.BNB]: "bnb",
  [ChainId.AVALANCHE]: "avalanche",
  [ChainId.BASE]: "base"
};

// Include ChainIds in this array if they are not supported by the UX yet, but are already in the SDK.
const NOT_YET_UX_SUPPORTED_CHAIN_IDS = [ChainId.BASE_GOERLI];

// TODO: include BASE_GOERLI when routing is implemented

function isSupportedChain(chainId, featureFlags) {
  if (featureFlags && chainId && chainId in featureFlags) {
    return featureFlags[chainId];
  }
  return !!chainId && SUPPORTED_CHAINS.indexOf(chainId) !== -1 && NOT_YET_UX_SUPPORTED_CHAIN_IDS.indexOf(chainId) === -1;
}
function asSupportedChain(chainId, featureFlags) {
  if (!chainId) return undefined;
  if (featureFlags && chainId in featureFlags && !featureFlags[chainId]) {
    return undefined;
  }
  return isSupportedChain(chainId) ? chainId : undefined;
}
const SUPPORTED_GAS_ESTIMATE_CHAIN_IDS = [ChainId.MAINNET, ChainId.POLYGON, ChainId.CELO, ChainId.OPTIMISM, ChainId.ARBITRUM_ONE, ChainId.BNB, ChainId.AVALANCHE, ChainId.BASE];

/**
 * Supported networks for V2 pool behavior.
 */
[ChainId.MAINNET, ChainId.GOERLI];
[ChainId.GOERLI, ChainId.SEPOLIA, ChainId.POLYGON_MUMBAI, ChainId.ARBITRUM_GOERLI, ChainId.OPTIMISM_GOERLI, ChainId.CELO_ALFAJORES];

/**
 * All the chain IDs that are running the Ethereum protocol.
 */
const L1_CHAIN_IDS = [ChainId.MAINNET, ChainId.GOERLI, ChainId.SEPOLIA, ChainId.POLYGON, ChainId.POLYGON_MUMBAI, ChainId.CELO, ChainId.CELO_ALFAJORES, ChainId.BNB, ChainId.AVALANCHE];
/**
 * Controls some L2 specific behavior, e.g. slippage tolerance, special UI behavior.
 * The expectation is that all of these networks have immediate transaction confirmation.
 */
const L2_CHAIN_IDS = [ChainId.ARBITRUM_ONE, ChainId.ARBITRUM_GOERLI, ChainId.OPTIMISM, ChainId.OPTIMISM_GOERLI, ChainId.BASE];
function isUniswapXSupportedChain(chainId) {
  return chainId === ChainId.MAINNET;
}

export { CHAIN_IDS_TO_NAMES, L1_CHAIN_IDS, L2_CHAIN_IDS, SUPPORTED_GAS_ESTIMATE_CHAIN_IDS, asSupportedChain, isSupportedChain, isUniswapXSupportedChain };
