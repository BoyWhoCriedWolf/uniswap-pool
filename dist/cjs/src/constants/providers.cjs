'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var sdkCore = require('@uniswap/sdk-core');
var AppRpcProvider = require('../rpc/AppRpcProvider.cjs');
var StaticJsonRpcProvider = require('../rpc/StaticJsonRpcProvider.cjs');
var networks = require('./networks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

var _RPC_PROVIDERS, _DEPRECATED_RPC_PROVI;
var providerFactory = function providerFactory(chainId) {
  var i = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return new StaticJsonRpcProvider(chainId, networks.RPC_URLS[chainId][i]);
};

/**
 * These are the only JsonRpcProviders used directly by the interface.
 */
var RPC_PROVIDERS = (_RPC_PROVIDERS = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_RPC_PROVIDERS, sdkCore.ChainId.MAINNET, new AppRpcProvider(sdkCore.ChainId.MAINNET, [providerFactory(sdkCore.ChainId.MAINNET), providerFactory(sdkCore.ChainId.MAINNET, 1)])), sdkCore.ChainId.GOERLI, providerFactory(sdkCore.ChainId.GOERLI)), sdkCore.ChainId.SEPOLIA, providerFactory(sdkCore.ChainId.SEPOLIA)), sdkCore.ChainId.OPTIMISM, providerFactory(sdkCore.ChainId.OPTIMISM)), sdkCore.ChainId.OPTIMISM_GOERLI, providerFactory(sdkCore.ChainId.OPTIMISM_GOERLI)), sdkCore.ChainId.ARBITRUM_ONE, providerFactory(sdkCore.ChainId.ARBITRUM_ONE)), sdkCore.ChainId.ARBITRUM_GOERLI, providerFactory(sdkCore.ChainId.ARBITRUM_GOERLI)), sdkCore.ChainId.POLYGON, providerFactory(sdkCore.ChainId.POLYGON)), sdkCore.ChainId.POLYGON_MUMBAI, providerFactory(sdkCore.ChainId.POLYGON_MUMBAI)), sdkCore.ChainId.CELO, providerFactory(sdkCore.ChainId.CELO)), _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_RPC_PROVIDERS, sdkCore.ChainId.CELO_ALFAJORES, providerFactory(sdkCore.ChainId.CELO_ALFAJORES)), sdkCore.ChainId.BNB, providerFactory(sdkCore.ChainId.BNB)), sdkCore.ChainId.AVALANCHE, providerFactory(sdkCore.ChainId.AVALANCHE)), sdkCore.ChainId.BASE, providerFactory(sdkCore.ChainId.BASE)));
var DEPRECATED_RPC_PROVIDERS = (_DEPRECATED_RPC_PROVI = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_DEPRECATED_RPC_PROVI, sdkCore.ChainId.MAINNET, providerFactory(sdkCore.ChainId.MAINNET)), sdkCore.ChainId.GOERLI, providerFactory(sdkCore.ChainId.GOERLI)), sdkCore.ChainId.SEPOLIA, providerFactory(sdkCore.ChainId.SEPOLIA)), sdkCore.ChainId.OPTIMISM, providerFactory(sdkCore.ChainId.OPTIMISM)), sdkCore.ChainId.OPTIMISM_GOERLI, providerFactory(sdkCore.ChainId.OPTIMISM_GOERLI)), sdkCore.ChainId.ARBITRUM_ONE, providerFactory(sdkCore.ChainId.ARBITRUM_ONE)), sdkCore.ChainId.ARBITRUM_GOERLI, providerFactory(sdkCore.ChainId.ARBITRUM_GOERLI)), sdkCore.ChainId.POLYGON, providerFactory(sdkCore.ChainId.POLYGON)), sdkCore.ChainId.POLYGON_MUMBAI, providerFactory(sdkCore.ChainId.POLYGON_MUMBAI)), sdkCore.ChainId.CELO, providerFactory(sdkCore.ChainId.CELO)), _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_DEPRECATED_RPC_PROVI, sdkCore.ChainId.CELO_ALFAJORES, providerFactory(sdkCore.ChainId.CELO_ALFAJORES)), sdkCore.ChainId.BNB, providerFactory(sdkCore.ChainId.BNB)), sdkCore.ChainId.AVALANCHE, providerFactory(sdkCore.ChainId.AVALANCHE)), sdkCore.ChainId.BASE, providerFactory(sdkCore.ChainId.BASE)));

exports.DEPRECATED_RPC_PROVIDERS = DEPRECATED_RPC_PROVIDERS;
exports.RPC_PROVIDERS = RPC_PROVIDERS;
