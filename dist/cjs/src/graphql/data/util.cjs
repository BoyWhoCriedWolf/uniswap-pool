'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var Sentry = require('@sentry/react');
var sdkCore = require('@uniswap/sdk-core');
var chainInfo = require('../../constants/chainInfo.cjs');
var tokens = require('../../constants/tokens.cjs');
var ms = require('ms');
require('react');
var nativeTokens = require('../../utils/nativeTokens.cjs');
var typesAndHooks = require('./__generated__/types-and-hooks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var Sentry__namespace = /*#__PURE__*/_interopNamespace(Sentry);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

var _CHAIN_ID_TO_BACKEND_;
var PollingInterval = function (PollingInterval) {
  PollingInterval[PollingInterval["Slow"] = ms__default["default"]("5m")] = "Slow";
  PollingInterval[PollingInterval["Normal"] = ms__default["default"]("1m")] = "Normal";
  PollingInterval[PollingInterval["Fast"] = chainInfo.AVERAGE_L1_BLOCK_TIME] = "Fast";
  PollingInterval[PollingInterval["LightningMcQueen"] = ms__default["default"]("3s")] = "LightningMcQueen";
  return PollingInterval;
}({}); // approx block interval for polygon
var GQL_MAINNET_CHAINS = [typesAndHooks.Chain.Ethereum, typesAndHooks.Chain.Polygon, typesAndHooks.Chain.Celo, typesAndHooks.Chain.Optimism, typesAndHooks.Chain.Arbitrum, typesAndHooks.Chain.Bnb, typesAndHooks.Chain.Avalanche, typesAndHooks.Chain.Base];
var GQL_TESTNET_CHAINS = [typesAndHooks.Chain.EthereumGoerli, typesAndHooks.Chain.EthereumSepolia];
var UX_SUPPORTED_GQL_CHAINS = [].concat(GQL_MAINNET_CHAINS, GQL_TESTNET_CHAINS);
var CHAIN_ID_TO_BACKEND_NAME = (_CHAIN_ID_TO_BACKEND_ = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_CHAIN_ID_TO_BACKEND_, sdkCore.ChainId.MAINNET, typesAndHooks.Chain.Ethereum), sdkCore.ChainId.GOERLI, typesAndHooks.Chain.EthereumGoerli), sdkCore.ChainId.SEPOLIA, typesAndHooks.Chain.EthereumSepolia), sdkCore.ChainId.POLYGON, typesAndHooks.Chain.Polygon), sdkCore.ChainId.POLYGON_MUMBAI, typesAndHooks.Chain.Polygon), sdkCore.ChainId.CELO, typesAndHooks.Chain.Celo), sdkCore.ChainId.CELO_ALFAJORES, typesAndHooks.Chain.Celo), sdkCore.ChainId.ARBITRUM_ONE, typesAndHooks.Chain.Arbitrum), sdkCore.ChainId.ARBITRUM_GOERLI, typesAndHooks.Chain.Arbitrum), sdkCore.ChainId.OPTIMISM, typesAndHooks.Chain.Optimism), _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_CHAIN_ID_TO_BACKEND_, sdkCore.ChainId.OPTIMISM_GOERLI, typesAndHooks.Chain.Optimism), sdkCore.ChainId.BNB, typesAndHooks.Chain.Bnb), sdkCore.ChainId.AVALANCHE, typesAndHooks.Chain.Avalanche), sdkCore.ChainId.BASE, typesAndHooks.Chain.Base));
function chainIdToBackendName(chainId) {
  return chainId && CHAIN_ID_TO_BACKEND_NAME[chainId] ? CHAIN_ID_TO_BACKEND_NAME[chainId] : CHAIN_ID_TO_BACKEND_NAME[sdkCore.ChainId.MAINNET];
}
var GQL_CHAINS = [sdkCore.ChainId.MAINNET, sdkCore.ChainId.OPTIMISM, sdkCore.ChainId.POLYGON, sdkCore.ChainId.ARBITRUM_ONE, sdkCore.ChainId.CELO];
function isGqlSupportedChain(chainId) {
  return !!chainId && GQL_CHAINS.includes(chainId);
}
function toContractInput(currency) {
  var chain = chainIdToBackendName(currency.chainId);
  return {
    chain: chain,
    address: currency.isToken ? currency.address : nativeTokens.getNativeTokenDBAddress(chain)
  };
}
function gqlToCurrency(token) {
  var _token$decimals;
  var chainId = supportedChainIdFromGQLChain(token.chain);
  if (!chainId) return undefined;
  if (token.standard === typesAndHooks.TokenStandard.Native || !token.address) return tokens.nativeOnChain(chainId);else return new sdkCore.Token(chainId, token.address, (_token$decimals = token.decimals) !== null && _token$decimals !== void 0 ? _token$decimals : 18, token.symbol, token.name);
}
var URL_CHAIN_PARAM_TO_BACKEND = {
  ethereum: typesAndHooks.Chain.Ethereum,
  polygon: typesAndHooks.Chain.Polygon,
  celo: typesAndHooks.Chain.Celo,
  arbitrum: typesAndHooks.Chain.Arbitrum,
  optimism: typesAndHooks.Chain.Optimism,
  bnb: typesAndHooks.Chain.Bnb,
  avalanche: typesAndHooks.Chain.Avalanche,
  base: typesAndHooks.Chain.Base
};

/**
 * @param chainName parsed in chain name from url query parameter
 * @returns if chainName is a valid chain name supported by the backend, returns the backend chain name, otherwise returns Chain.Ethereum
 */
function validateUrlChainParam(chainName) {
  var isValidChainName = chainName && URL_CHAIN_PARAM_TO_BACKEND[chainName];
  var isValidBackEndChain = isValidChainName && BACKEND_SUPPORTED_CHAINS.includes(isValidChainName);
  return isValidBackEndChain ? URL_CHAIN_PARAM_TO_BACKEND[chainName] : typesAndHooks.Chain.Ethereum;
}
var CHAIN_NAME_TO_CHAIN_ID = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.Chain.Ethereum, sdkCore.ChainId.MAINNET), typesAndHooks.Chain.EthereumGoerli, sdkCore.ChainId.GOERLI), typesAndHooks.Chain.EthereumSepolia, sdkCore.ChainId.SEPOLIA), typesAndHooks.Chain.Polygon, sdkCore.ChainId.POLYGON), typesAndHooks.Chain.Celo, sdkCore.ChainId.CELO), typesAndHooks.Chain.Optimism, sdkCore.ChainId.OPTIMISM), typesAndHooks.Chain.Arbitrum, sdkCore.ChainId.ARBITRUM_ONE), typesAndHooks.Chain.Bnb, sdkCore.ChainId.BNB), typesAndHooks.Chain.Avalanche, sdkCore.ChainId.AVALANCHE), typesAndHooks.Chain.Base, sdkCore.ChainId.BASE);
function isSupportedGQLChain(chain) {
  return UX_SUPPORTED_GQL_CHAINS.includes(chain);
}
function supportedChainIdFromGQLChain(chain) {
  return isSupportedGQLChain(chain) ? CHAIN_NAME_TO_CHAIN_ID[chain] : undefined;
}
function logSentryErrorForUnsupportedChain(_ref) {
  var extras = _ref.extras,
    errorMessage = _ref.errorMessage;
  Sentry__namespace.withScope(function (scope) {
    extras && Object.entries(extras).map(function (_ref2) {
      var _ref3 = _slicedToArray__default["default"](_ref2, 2),
        k = _ref3[0],
        v = _ref3[1];
      scope.setExtra(k, v);
    });
    Sentry__namespace.captureException(new Error(errorMessage));
  });
}
var BACKEND_SUPPORTED_CHAINS = [typesAndHooks.Chain.Ethereum, typesAndHooks.Chain.Arbitrum, typesAndHooks.Chain.Optimism, typesAndHooks.Chain.Polygon, typesAndHooks.Chain.Base, typesAndHooks.Chain.Bnb, typesAndHooks.Chain.Celo];
[sdkCore.ChainId.AVALANCHE];
function getTokenDetailsURL(_ref4) {
  var address = _ref4.address,
    chain = _ref4.chain,
    inputAddress = _ref4.inputAddress;
  var chainName = chain.toLowerCase();
  var tokenAddress = address !== null && address !== void 0 ? address : tokens.NATIVE_CHAIN_ID;
  var inputAddressSuffix = inputAddress ? "?inputCurrency=".concat(inputAddress) : "";
  return "/tokens/".concat(chainName, "/").concat(tokenAddress).concat(inputAddressSuffix);
}

exports.BACKEND_SUPPORTED_CHAINS = BACKEND_SUPPORTED_CHAINS;
exports.CHAIN_ID_TO_BACKEND_NAME = CHAIN_ID_TO_BACKEND_NAME;
exports.GQL_MAINNET_CHAINS = GQL_MAINNET_CHAINS;
exports.PollingInterval = PollingInterval;
exports.chainIdToBackendName = chainIdToBackendName;
exports.getTokenDetailsURL = getTokenDetailsURL;
exports.gqlToCurrency = gqlToCurrency;
exports.isGqlSupportedChain = isGqlSupportedChain;
exports.isSupportedGQLChain = isSupportedGQLChain;
exports.logSentryErrorForUnsupportedChain = logSentryErrorForUnsupportedChain;
exports.supportedChainIdFromGQLChain = supportedChainIdFromGQLChain;
exports.toContractInput = toContractInput;
exports.validateUrlChainParam = validateUrlChainParam;
