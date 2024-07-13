import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import * as Sentry from '@sentry/react';
import { ChainId, Token } from '@uniswap/sdk-core';
import { AVERAGE_L1_BLOCK_TIME } from '../../constants/chainInfo.js';
import { nativeOnChain, NATIVE_CHAIN_ID } from '../../constants/tokens.js';
import ms from 'ms';
import 'react';
import { getNativeTokenDBAddress } from '../../utils/nativeTokens.js';
import { Chain, TokenStandard } from './__generated__/types-and-hooks.js';

var _CHAIN_ID_TO_BACKEND_;
var PollingInterval = function (PollingInterval) {
  PollingInterval[PollingInterval["Slow"] = ms("5m")] = "Slow";
  PollingInterval[PollingInterval["Normal"] = ms("1m")] = "Normal";
  PollingInterval[PollingInterval["Fast"] = AVERAGE_L1_BLOCK_TIME] = "Fast";
  PollingInterval[PollingInterval["LightningMcQueen"] = ms("3s")] = "LightningMcQueen";
  return PollingInterval;
}({}); // approx block interval for polygon
var GQL_MAINNET_CHAINS = [Chain.Ethereum, Chain.Polygon, Chain.Celo, Chain.Optimism, Chain.Arbitrum, Chain.Bnb, Chain.Avalanche, Chain.Base];
var GQL_TESTNET_CHAINS = [Chain.EthereumGoerli, Chain.EthereumSepolia];
var UX_SUPPORTED_GQL_CHAINS = [].concat(GQL_MAINNET_CHAINS, GQL_TESTNET_CHAINS);
var CHAIN_ID_TO_BACKEND_NAME = (_CHAIN_ID_TO_BACKEND_ = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_CHAIN_ID_TO_BACKEND_, ChainId.MAINNET, Chain.Ethereum), ChainId.GOERLI, Chain.EthereumGoerli), ChainId.SEPOLIA, Chain.EthereumSepolia), ChainId.POLYGON, Chain.Polygon), ChainId.POLYGON_MUMBAI, Chain.Polygon), ChainId.CELO, Chain.Celo), ChainId.CELO_ALFAJORES, Chain.Celo), ChainId.ARBITRUM_ONE, Chain.Arbitrum), ChainId.ARBITRUM_GOERLI, Chain.Arbitrum), ChainId.OPTIMISM, Chain.Optimism), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_CHAIN_ID_TO_BACKEND_, ChainId.OPTIMISM_GOERLI, Chain.Optimism), ChainId.BNB, Chain.Bnb), ChainId.AVALANCHE, Chain.Avalanche), ChainId.BASE, Chain.Base));
function chainIdToBackendName(chainId) {
  return chainId && CHAIN_ID_TO_BACKEND_NAME[chainId] ? CHAIN_ID_TO_BACKEND_NAME[chainId] : CHAIN_ID_TO_BACKEND_NAME[ChainId.MAINNET];
}
var GQL_CHAINS = [ChainId.MAINNET, ChainId.OPTIMISM, ChainId.POLYGON, ChainId.ARBITRUM_ONE, ChainId.CELO];
function isGqlSupportedChain(chainId) {
  return !!chainId && GQL_CHAINS.includes(chainId);
}
function toContractInput(currency) {
  var chain = chainIdToBackendName(currency.chainId);
  return {
    chain: chain,
    address: currency.isToken ? currency.address : getNativeTokenDBAddress(chain)
  };
}
function gqlToCurrency(token) {
  var _token$decimals;
  var chainId = supportedChainIdFromGQLChain(token.chain);
  if (!chainId) return undefined;
  if (token.standard === TokenStandard.Native || !token.address) return nativeOnChain(chainId);else return new Token(chainId, token.address, (_token$decimals = token.decimals) !== null && _token$decimals !== void 0 ? _token$decimals : 18, token.symbol, token.name);
}
var URL_CHAIN_PARAM_TO_BACKEND = {
  ethereum: Chain.Ethereum,
  polygon: Chain.Polygon,
  celo: Chain.Celo,
  arbitrum: Chain.Arbitrum,
  optimism: Chain.Optimism,
  bnb: Chain.Bnb,
  avalanche: Chain.Avalanche,
  base: Chain.Base
};

/**
 * @param chainName parsed in chain name from url query parameter
 * @returns if chainName is a valid chain name supported by the backend, returns the backend chain name, otherwise returns Chain.Ethereum
 */
function validateUrlChainParam(chainName) {
  var isValidChainName = chainName && URL_CHAIN_PARAM_TO_BACKEND[chainName];
  var isValidBackEndChain = isValidChainName && BACKEND_SUPPORTED_CHAINS.includes(isValidChainName);
  return isValidBackEndChain ? URL_CHAIN_PARAM_TO_BACKEND[chainName] : Chain.Ethereum;
}
var CHAIN_NAME_TO_CHAIN_ID = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, Chain.Ethereum, ChainId.MAINNET), Chain.EthereumGoerli, ChainId.GOERLI), Chain.EthereumSepolia, ChainId.SEPOLIA), Chain.Polygon, ChainId.POLYGON), Chain.Celo, ChainId.CELO), Chain.Optimism, ChainId.OPTIMISM), Chain.Arbitrum, ChainId.ARBITRUM_ONE), Chain.Bnb, ChainId.BNB), Chain.Avalanche, ChainId.AVALANCHE), Chain.Base, ChainId.BASE);
function isSupportedGQLChain(chain) {
  return UX_SUPPORTED_GQL_CHAINS.includes(chain);
}
function supportedChainIdFromGQLChain(chain) {
  return isSupportedGQLChain(chain) ? CHAIN_NAME_TO_CHAIN_ID[chain] : undefined;
}
function logSentryErrorForUnsupportedChain(_ref) {
  var extras = _ref.extras,
    errorMessage = _ref.errorMessage;
  Sentry.withScope(function (scope) {
    extras && Object.entries(extras).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        k = _ref3[0],
        v = _ref3[1];
      scope.setExtra(k, v);
    });
    Sentry.captureException(new Error(errorMessage));
  });
}
var BACKEND_SUPPORTED_CHAINS = [Chain.Ethereum, Chain.Arbitrum, Chain.Optimism, Chain.Polygon, Chain.Base, Chain.Bnb, Chain.Celo];
[ChainId.AVALANCHE];
function getTokenDetailsURL(_ref4) {
  var address = _ref4.address,
    chain = _ref4.chain,
    inputAddress = _ref4.inputAddress;
  var chainName = chain.toLowerCase();
  var tokenAddress = address !== null && address !== void 0 ? address : NATIVE_CHAIN_ID;
  var inputAddressSuffix = inputAddress ? "?inputCurrency=".concat(inputAddress) : "";
  return "/tokens/".concat(chainName, "/").concat(tokenAddress).concat(inputAddressSuffix);
}

export { BACKEND_SUPPORTED_CHAINS, CHAIN_ID_TO_BACKEND_NAME, GQL_MAINNET_CHAINS, PollingInterval, chainIdToBackendName, getTokenDetailsURL, gqlToCurrency, isGqlSupportedChain, isSupportedGQLChain, logSentryErrorForUnsupportedChain, supportedChainIdFromGQLChain, toContractInput, validateUrlChainParam };
