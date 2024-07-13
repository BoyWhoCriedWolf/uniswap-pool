import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { ChainId } from '@uniswap/sdk-core';
import { UNIVERSAL_ROUTER_ADDRESS } from '@uniswap/universal-router-sdk';
import { isSupportedChain } from '../../../constants/chains.js';
import gql from '../../../../node_modules/graphql-tag/lib/index.js';
import { useNftUniversalRouterAddressQuery } from '../__generated__/types-and-hooks.js';

var _templateObject;
gql(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  query NftUniversalRouterAddress($chain: Chain = ETHEREUM) {\n    nftRoute(chain: $chain, senderAddress: \"\", nftTrades: []) {\n      toAddress\n    }\n  }\n"])));
function getURAddress(chainId, nftURAddress) {
  if (!chainId) return undefined;
  // if mainnet and on NFT flow, use the contract address returned by GQL
  if (chainId === ChainId.MAINNET) {
    return nftURAddress !== null && nftURAddress !== void 0 ? nftURAddress : UNIVERSAL_ROUTER_ADDRESS(chainId);
  }
  return isSupportedChain(chainId) ? UNIVERSAL_ROUTER_ADDRESS(chainId) : undefined;
}
function useNftUniversalRouterAddress() {
  var _data$nftRoute;
  var _useNftUniversalRoute = useNftUniversalRouterAddressQuery({
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

export { getURAddress, useNftUniversalRouterAddress };
