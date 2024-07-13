'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var sdkCore = require('@uniswap/sdk-core');
var tokens = require('../../constants/tokens.cjs');
var typesAndHooks = require('../../graphql/data/__generated__/types-and-hooks.cjs');
var util = require('../../graphql/data/util.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

var _WETH9$ChainId$MAINNE;
var moonPaySupportedChains = [typesAndHooks.Chain.Ethereum, typesAndHooks.Chain.Polygon, typesAndHooks.Chain.Arbitrum, typesAndHooks.Chain.Optimism];
var CURRENCY_CODES = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.Chain.Ethereum, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, (_WETH9$ChainId$MAINNE = sdkCore.WETH9[sdkCore.ChainId.MAINNET]) === null || _WETH9$ChainId$MAINNE === void 0 ? void 0 : _WETH9$ChainId$MAINNE.address.toLowerCase(), "weth"), tokens.USDC_MAINNET.address.toLowerCase(), "usdc"), tokens.USDT.address.toLowerCase(), "usdt"), tokens.WBTC.address.toLowerCase(), "wbtc"), tokens.MATIC.address.toLowerCase(), "polygon"), "native", "eth")), typesAndHooks.Chain.Arbitrum, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, tokens.USDC_ARBITRUM.address.toLowerCase(), "usdc_arbitrum"), tokens.BRIDGED_USDC_ARBITRUM.address.toLowerCase(), "usdc_arbitrum"), "native", "eth_arbitrum")), typesAndHooks.Chain.Optimism, _defineProperty__default["default"](_defineProperty__default["default"]({}, tokens.USDC_OPTIMISM.address.toLowerCase(), "usdc_optimism"), "native", "eth_optimism")), typesAndHooks.Chain.Polygon, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, tokens.USDC_POLYGON.address.toLowerCase(), "usdc_polygon"), tokens.WETH_POLYGON.address.toLowerCase(), "eth_polygon"), "native", "matic_polygon"));
function getDefaultCurrencyCode(address, chainName) {
  var chain = util.validateUrlChainParam(chainName);
  if (!address || !chain) return "eth";
  if (moonPaySupportedChains.includes(chain)) {
    var _CURRENCY_CODES2;
    var code = (_CURRENCY_CODES2 = CURRENCY_CODES[chain]) === null || _CURRENCY_CODES2 === void 0 ? void 0 : _CURRENCY_CODES2[address.toLowerCase()];
    return code !== null && code !== void 0 ? code : "eth";
  }
  return "eth";
}

/**
 * You should use useParams() from react-router-dom instead of this function if possible.
 * This function is only used in the case where we need to parse the path outside the scope of the router.
 */
function parsePathParts(pathname) {
  var pathParts = pathname.split("/");
  // Matches the /tokens/<network>/<tokenAddress> path.
  var network = pathParts.length > 2 ? pathParts[pathParts.length - 2] : undefined;
  var tokenAddress = pathParts.length > 2 ? pathParts[pathParts.length - 1] : undefined;
  return {
    network: network,
    tokenAddress: tokenAddress
  };
}

exports.getDefaultCurrencyCode = getDefaultCurrencyCode;
exports.parsePathParts = parsePathParts;
