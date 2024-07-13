'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var sdkCore = require('@uniswap/sdk-core');
var tokens = require('./tokens.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

var _COMMON_BASES;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var WRAPPED_NATIVE_CURRENCIES_ONLY = Object.fromEntries(Object.entries(tokens.WRAPPED_NATIVE_CURRENCY).map(function (_ref) {
  var _ref2 = _slicedToArray__default["default"](_ref, 2),
    key = _ref2[0],
    value = _ref2[1];
  return [key, [value]];
}).filter(Boolean));

/**
 * Shows up in the currency select for swap and add liquidity
 */
var COMMON_BASES = (_COMMON_BASES = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_COMMON_BASES, sdkCore.ChainId.MAINNET, [tokens.nativeOnChain(sdkCore.ChainId.MAINNET), tokens.DAI, tokens.USDC_MAINNET, tokens.USDT, tokens.WBTC, tokens.WRAPPED_NATIVE_CURRENCY[sdkCore.ChainId.MAINNET]]), sdkCore.ChainId.GOERLI, [tokens.nativeOnChain(sdkCore.ChainId.GOERLI), tokens.WRAPPED_NATIVE_CURRENCY[sdkCore.ChainId.GOERLI]]), sdkCore.ChainId.SEPOLIA, [tokens.nativeOnChain(sdkCore.ChainId.SEPOLIA), tokens.WRAPPED_NATIVE_CURRENCY[sdkCore.ChainId.SEPOLIA]]), sdkCore.ChainId.ARBITRUM_ONE, [tokens.nativeOnChain(sdkCore.ChainId.ARBITRUM_ONE), tokens.ARB, tokens.DAI_ARBITRUM_ONE, tokens.USDC_ARBITRUM, tokens.USDT_ARBITRUM_ONE, tokens.WBTC_ARBITRUM_ONE, tokens.WRAPPED_NATIVE_CURRENCY[sdkCore.ChainId.ARBITRUM_ONE]]), sdkCore.ChainId.ARBITRUM_GOERLI, [tokens.nativeOnChain(sdkCore.ChainId.ARBITRUM_GOERLI), tokens.WRAPPED_NATIVE_CURRENCY[sdkCore.ChainId.ARBITRUM_GOERLI], tokens.USDC_ARBITRUM_GOERLI]), sdkCore.ChainId.OPTIMISM, [tokens.nativeOnChain(sdkCore.ChainId.OPTIMISM), tokens.OP, tokens.DAI_OPTIMISM, tokens.USDC_OPTIMISM, tokens.USDT_OPTIMISM, tokens.WBTC_OPTIMISM]), sdkCore.ChainId.OPTIMISM_GOERLI, [tokens.nativeOnChain(sdkCore.ChainId.OPTIMISM_GOERLI)]), sdkCore.ChainId.BASE, [tokens.nativeOnChain(sdkCore.ChainId.BASE), tokens.WRAPPED_NATIVE_CURRENCY[sdkCore.ChainId.BASE], tokens.USDC_BASE]), sdkCore.ChainId.POLYGON, [tokens.nativeOnChain(sdkCore.ChainId.POLYGON), tokens.WETH_POLYGON, tokens.USDC_POLYGON, tokens.DAI_POLYGON, tokens.USDT_POLYGON, tokens.WBTC_POLYGON]), sdkCore.ChainId.POLYGON_MUMBAI, [tokens.nativeOnChain(sdkCore.ChainId.POLYGON_MUMBAI), tokens.WRAPPED_NATIVE_CURRENCY[sdkCore.ChainId.POLYGON_MUMBAI], tokens.WETH_POLYGON_MUMBAI]), _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_COMMON_BASES, sdkCore.ChainId.CELO, [tokens.nativeOnChain(sdkCore.ChainId.CELO), tokens.CEUR_CELO, tokens.CUSD_CELO, tokens.PORTAL_ETH_CELO, tokens.PORTAL_USDC_CELO, tokens.WBTC_CELO]), sdkCore.ChainId.CELO_ALFAJORES, [tokens.nativeOnChain(sdkCore.ChainId.CELO_ALFAJORES), tokens.CUSD_CELO_ALFAJORES, tokens.CEUR_CELO_ALFAJORES]), sdkCore.ChainId.BNB, [tokens.nativeOnChain(sdkCore.ChainId.BNB), tokens.DAI_BSC, tokens.USDC_BSC, tokens.USDT_BSC, tokens.ETH_BSC, tokens.BTC_BSC, tokens.BUSD_BSC]), sdkCore.ChainId.AVALANCHE, [tokens.nativeOnChain(sdkCore.ChainId.AVALANCHE), tokens.DAI_AVALANCHE, tokens.USDC_AVALANCHE, tokens.USDT_AVALANCHE, tokens.WETH_AVALANCHE]));

// used to construct the list of all pairs we consider by default in the frontend
_objectSpread(_objectSpread({}, WRAPPED_NATIVE_CURRENCIES_ONLY), {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, sdkCore.ChainId.MAINNET, [].concat(_toConsumableArray__default["default"](WRAPPED_NATIVE_CURRENCIES_ONLY[sdkCore.ChainId.MAINNET]), [tokens.DAI, tokens.USDC_MAINNET, tokens.USDT, tokens.WBTC])), sdkCore.ChainId.BNB, [].concat(_toConsumableArray__default["default"](WRAPPED_NATIVE_CURRENCIES_ONLY[sdkCore.ChainId.BNB]), [tokens.DAI_BSC, tokens.USDC_BSC, tokens.USDT_BSC, tokens.BTC_BSC, tokens.BUSD_BSC, tokens.ETH_BSC])), sdkCore.ChainId.AVALANCHE, [].concat(_toConsumableArray__default["default"](WRAPPED_NATIVE_CURRENCIES_ONLY[sdkCore.ChainId.AVALANCHE]), [tokens.DAI_AVALANCHE, tokens.USDC_AVALANCHE, tokens.USDT_AVALANCHE, tokens.WETH_AVALANCHE])));
_defineProperty__default["default"]({}, sdkCore.ChainId.MAINNET, [[new sdkCore.Token(sdkCore.ChainId.MAINNET, "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643", 8, "cDAI", "Compound Dai"), new sdkCore.Token(sdkCore.ChainId.MAINNET, "0x39AA39c021dfbaE8faC545936693aC917d5E7563", 8, "cUSDC", "Compound USD Coin")], [tokens.USDC_MAINNET, tokens.USDT], [tokens.DAI, tokens.USDT]]);

exports.COMMON_BASES = COMMON_BASES;
