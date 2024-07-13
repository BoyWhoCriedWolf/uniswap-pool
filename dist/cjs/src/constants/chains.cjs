'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var sdkCore = require('@uniswap/sdk-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

var _CHAIN_IDS_TO_NAMES;
var CHAIN_IDS_TO_NAMES = (_CHAIN_IDS_TO_NAMES = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_CHAIN_IDS_TO_NAMES, sdkCore.ChainId.MAINNET, "mainnet"), sdkCore.ChainId.GOERLI, "goerli"), sdkCore.ChainId.SEPOLIA, "sepolia"), sdkCore.ChainId.POLYGON, "polygon"), sdkCore.ChainId.POLYGON_MUMBAI, "polygon_mumbai"), sdkCore.ChainId.CELO, "celo"), sdkCore.ChainId.CELO_ALFAJORES, "celo_alfajores"), sdkCore.ChainId.ARBITRUM_ONE, "arbitrum"), sdkCore.ChainId.ARBITRUM_GOERLI, "arbitrum_goerli"), sdkCore.ChainId.OPTIMISM, "optimism"), _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_CHAIN_IDS_TO_NAMES, sdkCore.ChainId.OPTIMISM_GOERLI, "optimism_goerli"), sdkCore.ChainId.BNB, "bnb"), sdkCore.ChainId.AVALANCHE, "avalanche"), sdkCore.ChainId.BASE, "base"));

// Include ChainIds in this array if they are not supported by the UX yet, but are already in the SDK.
var NOT_YET_UX_SUPPORTED_CHAIN_IDS = [sdkCore.ChainId.BASE_GOERLI];

// TODO: include BASE_GOERLI when routing is implemented

function isSupportedChain(chainId, featureFlags) {
  if (featureFlags && chainId && chainId in featureFlags) {
    return featureFlags[chainId];
  }
  return !!chainId && sdkCore.SUPPORTED_CHAINS.indexOf(chainId) !== -1 && NOT_YET_UX_SUPPORTED_CHAIN_IDS.indexOf(chainId) === -1;
}
function asSupportedChain(chainId, featureFlags) {
  if (!chainId) return undefined;
  if (featureFlags && chainId in featureFlags && !featureFlags[chainId]) {
    return undefined;
  }
  return isSupportedChain(chainId) ? chainId : undefined;
}
var SUPPORTED_GAS_ESTIMATE_CHAIN_IDS = [sdkCore.ChainId.MAINNET, sdkCore.ChainId.POLYGON, sdkCore.ChainId.CELO, sdkCore.ChainId.OPTIMISM, sdkCore.ChainId.ARBITRUM_ONE, sdkCore.ChainId.BNB, sdkCore.ChainId.AVALANCHE, sdkCore.ChainId.BASE];

/**
 * Supported networks for V2 pool behavior.
 */
[sdkCore.ChainId.MAINNET, sdkCore.ChainId.GOERLI];
[sdkCore.ChainId.GOERLI, sdkCore.ChainId.SEPOLIA, sdkCore.ChainId.POLYGON_MUMBAI, sdkCore.ChainId.ARBITRUM_GOERLI, sdkCore.ChainId.OPTIMISM_GOERLI, sdkCore.ChainId.CELO_ALFAJORES];

/**
 * All the chain IDs that are running the Ethereum protocol.
 */
var L1_CHAIN_IDS = [sdkCore.ChainId.MAINNET, sdkCore.ChainId.GOERLI, sdkCore.ChainId.SEPOLIA, sdkCore.ChainId.POLYGON, sdkCore.ChainId.POLYGON_MUMBAI, sdkCore.ChainId.CELO, sdkCore.ChainId.CELO_ALFAJORES, sdkCore.ChainId.BNB, sdkCore.ChainId.AVALANCHE];
/**
 * Controls some L2 specific behavior, e.g. slippage tolerance, special UI behavior.
 * The expectation is that all of these networks have immediate transaction confirmation.
 */
var L2_CHAIN_IDS = [sdkCore.ChainId.ARBITRUM_ONE, sdkCore.ChainId.ARBITRUM_GOERLI, sdkCore.ChainId.OPTIMISM, sdkCore.ChainId.OPTIMISM_GOERLI, sdkCore.ChainId.BASE];
function isUniswapXSupportedChain(chainId) {
  return chainId === sdkCore.ChainId.MAINNET;
}

exports.CHAIN_IDS_TO_NAMES = CHAIN_IDS_TO_NAMES;
exports.L1_CHAIN_IDS = L1_CHAIN_IDS;
exports.L2_CHAIN_IDS = L2_CHAIN_IDS;
exports.SUPPORTED_GAS_ESTIMATE_CHAIN_IDS = SUPPORTED_GAS_ESTIMATE_CHAIN_IDS;
exports.asSupportedChain = asSupportedChain;
exports.isSupportedChain = isSupportedChain;
exports.isUniswapXSupportedChain = isUniswapXSupportedChain;
