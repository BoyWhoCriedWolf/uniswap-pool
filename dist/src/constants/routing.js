import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { ChainId, Token } from '@uniswap/sdk-core';
import { WRAPPED_NATIVE_CURRENCY, nativeOnChain, DAI, USDC_MAINNET, USDT, WBTC, ARB, DAI_ARBITRUM_ONE, USDC_ARBITRUM, USDT_ARBITRUM_ONE, WBTC_ARBITRUM_ONE, USDC_ARBITRUM_GOERLI, OP, DAI_OPTIMISM, USDC_OPTIMISM, USDT_OPTIMISM, WBTC_OPTIMISM, USDC_BASE, WETH_POLYGON, USDC_POLYGON, DAI_POLYGON, USDT_POLYGON, WBTC_POLYGON, WETH_POLYGON_MUMBAI, CEUR_CELO, CUSD_CELO, PORTAL_ETH_CELO, PORTAL_USDC_CELO, WBTC_CELO, CUSD_CELO_ALFAJORES, CEUR_CELO_ALFAJORES, DAI_BSC, USDC_BSC, USDT_BSC, ETH_BSC, BTC_BSC, BUSD_BSC, DAI_AVALANCHE, USDC_AVALANCHE, USDT_AVALANCHE, WETH_AVALANCHE } from './tokens.js';

var _COMMON_BASES;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var WRAPPED_NATIVE_CURRENCIES_ONLY = Object.fromEntries(Object.entries(WRAPPED_NATIVE_CURRENCY).map(function (_ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    key = _ref2[0],
    value = _ref2[1];
  return [key, [value]];
}).filter(Boolean));

/**
 * Shows up in the currency select for swap and add liquidity
 */
var COMMON_BASES = (_COMMON_BASES = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_COMMON_BASES, ChainId.MAINNET, [nativeOnChain(ChainId.MAINNET), DAI, USDC_MAINNET, USDT, WBTC, WRAPPED_NATIVE_CURRENCY[ChainId.MAINNET]]), ChainId.GOERLI, [nativeOnChain(ChainId.GOERLI), WRAPPED_NATIVE_CURRENCY[ChainId.GOERLI]]), ChainId.SEPOLIA, [nativeOnChain(ChainId.SEPOLIA), WRAPPED_NATIVE_CURRENCY[ChainId.SEPOLIA]]), ChainId.ARBITRUM_ONE, [nativeOnChain(ChainId.ARBITRUM_ONE), ARB, DAI_ARBITRUM_ONE, USDC_ARBITRUM, USDT_ARBITRUM_ONE, WBTC_ARBITRUM_ONE, WRAPPED_NATIVE_CURRENCY[ChainId.ARBITRUM_ONE]]), ChainId.ARBITRUM_GOERLI, [nativeOnChain(ChainId.ARBITRUM_GOERLI), WRAPPED_NATIVE_CURRENCY[ChainId.ARBITRUM_GOERLI], USDC_ARBITRUM_GOERLI]), ChainId.OPTIMISM, [nativeOnChain(ChainId.OPTIMISM), OP, DAI_OPTIMISM, USDC_OPTIMISM, USDT_OPTIMISM, WBTC_OPTIMISM]), ChainId.OPTIMISM_GOERLI, [nativeOnChain(ChainId.OPTIMISM_GOERLI)]), ChainId.BASE, [nativeOnChain(ChainId.BASE), WRAPPED_NATIVE_CURRENCY[ChainId.BASE], USDC_BASE]), ChainId.POLYGON, [nativeOnChain(ChainId.POLYGON), WETH_POLYGON, USDC_POLYGON, DAI_POLYGON, USDT_POLYGON, WBTC_POLYGON]), ChainId.POLYGON_MUMBAI, [nativeOnChain(ChainId.POLYGON_MUMBAI), WRAPPED_NATIVE_CURRENCY[ChainId.POLYGON_MUMBAI], WETH_POLYGON_MUMBAI]), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_COMMON_BASES, ChainId.CELO, [nativeOnChain(ChainId.CELO), CEUR_CELO, CUSD_CELO, PORTAL_ETH_CELO, PORTAL_USDC_CELO, WBTC_CELO]), ChainId.CELO_ALFAJORES, [nativeOnChain(ChainId.CELO_ALFAJORES), CUSD_CELO_ALFAJORES, CEUR_CELO_ALFAJORES]), ChainId.BNB, [nativeOnChain(ChainId.BNB), DAI_BSC, USDC_BSC, USDT_BSC, ETH_BSC, BTC_BSC, BUSD_BSC]), ChainId.AVALANCHE, [nativeOnChain(ChainId.AVALANCHE), DAI_AVALANCHE, USDC_AVALANCHE, USDT_AVALANCHE, WETH_AVALANCHE]));

// used to construct the list of all pairs we consider by default in the frontend
_objectSpread(_objectSpread({}, WRAPPED_NATIVE_CURRENCIES_ONLY), {}, _defineProperty(_defineProperty(_defineProperty({}, ChainId.MAINNET, [].concat(_toConsumableArray(WRAPPED_NATIVE_CURRENCIES_ONLY[ChainId.MAINNET]), [DAI, USDC_MAINNET, USDT, WBTC])), ChainId.BNB, [].concat(_toConsumableArray(WRAPPED_NATIVE_CURRENCIES_ONLY[ChainId.BNB]), [DAI_BSC, USDC_BSC, USDT_BSC, BTC_BSC, BUSD_BSC, ETH_BSC])), ChainId.AVALANCHE, [].concat(_toConsumableArray(WRAPPED_NATIVE_CURRENCIES_ONLY[ChainId.AVALANCHE]), [DAI_AVALANCHE, USDC_AVALANCHE, USDT_AVALANCHE, WETH_AVALANCHE])));
_defineProperty({}, ChainId.MAINNET, [[new Token(ChainId.MAINNET, "0x5d3a536E4D6DbD6114cc1Ead35777bAB948E3643", 8, "cDAI", "Compound Dai"), new Token(ChainId.MAINNET, "0x39AA39c021dfbaE8faC545936693aC917d5E7563", 8, "cUSDC", "Compound USD Coin")], [USDC_MAINNET, USDT], [DAI, USDT]]);

export { COMMON_BASES };
