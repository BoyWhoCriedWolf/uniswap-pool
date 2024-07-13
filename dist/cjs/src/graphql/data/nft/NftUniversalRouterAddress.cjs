'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var sdkCore = require('@uniswap/sdk-core');
var universalRouterSdk = require('@uniswap/universal-router-sdk');
var chains = require('../../../constants/chains.cjs');
var index = require('../../../../node_modules/graphql-tag/lib/index.cjs');
var typesAndHooks = require('../__generated__/types-and-hooks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);

var _templateObject;
index["default"](_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  query NftUniversalRouterAddress($chain: Chain = ETHEREUM) {\n    nftRoute(chain: $chain, senderAddress: \"\", nftTrades: []) {\n      toAddress\n    }\n  }\n"])));
function getURAddress(chainId, nftURAddress) {
  if (!chainId) return undefined;
  // if mainnet and on NFT flow, use the contract address returned by GQL
  if (chainId === sdkCore.ChainId.MAINNET) {
    return nftURAddress !== null && nftURAddress !== void 0 ? nftURAddress : universalRouterSdk.UNIVERSAL_ROUTER_ADDRESS(chainId);
  }
  return chains.isSupportedChain(chainId) ? universalRouterSdk.UNIVERSAL_ROUTER_ADDRESS(chainId) : undefined;
}
function useNftUniversalRouterAddress() {
  var _data$nftRoute;
  var _useNftUniversalRoute = typesAndHooks.useNftUniversalRouterAddressQuery({
      // no cache because a different version of nftRoute query is going to be called around the same time
      fetchPolicy: "no-cache"
    }),
    data = _useNftUniversalRoute.data,
    loading = _useNftUniversalRoute.loading;
  return {
    universalRouterAddress: data === null || data === void 0 || (_data$nftRoute = data.nftRoute) === null || _data$nftRoute === void 0 ? void 0 : _data$nftRoute.toAddress,
    universalRouterAddressIsLoading: loading
  };
}

exports.getURAddress = getURAddress;
exports.useNftUniversalRouterAddress = useNftUniversalRouterAddress;
