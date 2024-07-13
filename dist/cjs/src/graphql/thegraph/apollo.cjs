'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var Apollo = require('@apollo/client');
var sdkCore = require('@uniswap/sdk-core');
var index = require('../../state/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

var CHAIN_SUBGRAPH_URL = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, sdkCore.ChainId.MAINNET, "https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v3?source=uniswap"), sdkCore.ChainId.ARBITRUM_ONE, "https://thegraph.com/hosted-service/subgraph/ianlapham/uniswap-arbitrum-one?source=uniswap"), sdkCore.ChainId.OPTIMISM, "https://api.thegraph.com/subgraphs/name/ianlapham/optimism-post-regenesis?source=uniswap"), sdkCore.ChainId.POLYGON, "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-polygon?source=uniswap"), sdkCore.ChainId.CELO, "https://api.thegraph.com/subgraphs/name/jesse-sawa/uniswap-celo?source=uniswap"), sdkCore.ChainId.BNB, "https://api.thegraph.com/subgraphs/name/ianlapham/uniswap-v3-bsc?source=uniswap"), sdkCore.ChainId.AVALANCHE, "https://api.thegraph.com/subgraphs/name/lynnshaoyu/uniswap-v3-avax?source=uniswap"), sdkCore.ChainId.BASE, "https://api.studio.thegraph.com/query/48211/uniswap-v3-base/version/latest");
var CHAIN_BLOCK_SUBGRAPH_URL = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, sdkCore.ChainId.MAINNET, "https://api.thegraph.com/subgraphs/name/blocklytics/ethereum-blocks?source=uniswap"), sdkCore.ChainId.ARBITRUM_ONE, "https://api.thegraph.com/subgraphs/name/ianlapham/arbitrum-one-blocks?source=uniswap"), sdkCore.ChainId.OPTIMISM, "https://api.thegraph.com/subgraphs/name/ianlapham/uni-testing-subgraph?source=uniswap"), sdkCore.ChainId.POLYGON, "https://api.thegraph.com/subgraphs/name/ianlapham/polygon-blocks?source=uniswap"), sdkCore.ChainId.CELO, "https://api.thegraph.com/subgraphs/name/jesse-sawa/celo-blocks?source=uniswap"), sdkCore.ChainId.BNB, "https://api.thegraph.com/subgraphs/name/wombat-exchange/bnb-chain-block?source=uniswap"), sdkCore.ChainId.AVALANCHE, "https://api.thegraph.com/subgraphs/name/lynnshaoyu/avalanche-blocks?source=uniswap"), sdkCore.ChainId.BASE, "https://api.studio.thegraph.com/query/48211/base-blocks/version/latest?source=uniswap");
var httpLink = new Apollo.HttpLink({
  uri: CHAIN_SUBGRAPH_URL[sdkCore.ChainId.MAINNET]
});

// This middleware will allow us to dynamically update the uri for the requests based off chainId
// For more information: https://www.apollographql.com/docs/react/networking/advanced-http-networking/
var authMiddleware = new Apollo.ApolloLink(function (operation, forward) {
  // add the authorization to the headers
  var chainId = index["default"].getState().application.chainId;
  operation.setContext(function () {
    return {
      uri: chainId && CHAIN_SUBGRAPH_URL[chainId] ? CHAIN_SUBGRAPH_URL[chainId] : CHAIN_SUBGRAPH_URL[sdkCore.ChainId.MAINNET]
    };
  });
  return forward(operation);
});
var apolloClient = new Apollo.ApolloClient({
  cache: new Apollo.InMemoryCache(),
  link: Apollo.concat(authMiddleware, httpLink)
});
_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, sdkCore.ChainId.MAINNET, new Apollo.ApolloClient({
  cache: new Apollo.InMemoryCache(),
  uri: CHAIN_SUBGRAPH_URL[sdkCore.ChainId.MAINNET]
})), sdkCore.ChainId.ARBITRUM_ONE, new Apollo.ApolloClient({
  cache: new Apollo.InMemoryCache(),
  uri: CHAIN_SUBGRAPH_URL[sdkCore.ChainId.ARBITRUM_ONE]
})), sdkCore.ChainId.OPTIMISM, new Apollo.ApolloClient({
  cache: new Apollo.InMemoryCache(),
  uri: CHAIN_SUBGRAPH_URL[sdkCore.ChainId.OPTIMISM]
})), sdkCore.ChainId.POLYGON, new Apollo.ApolloClient({
  cache: new Apollo.InMemoryCache(),
  uri: CHAIN_SUBGRAPH_URL[sdkCore.ChainId.POLYGON]
})), sdkCore.ChainId.CELO, new Apollo.ApolloClient({
  cache: new Apollo.InMemoryCache(),
  uri: CHAIN_SUBGRAPH_URL[sdkCore.ChainId.CELO]
})), sdkCore.ChainId.BNB, new Apollo.ApolloClient({
  cache: new Apollo.InMemoryCache(),
  uri: CHAIN_SUBGRAPH_URL[sdkCore.ChainId.BNB]
})), sdkCore.ChainId.AVALANCHE, new Apollo.ApolloClient({
  cache: new Apollo.InMemoryCache(),
  uri: CHAIN_SUBGRAPH_URL[sdkCore.ChainId.AVALANCHE]
}));
_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, sdkCore.ChainId.MAINNET, new Apollo.ApolloClient({
  uri: CHAIN_BLOCK_SUBGRAPH_URL[sdkCore.ChainId.MAINNET],
  cache: new Apollo.InMemoryCache()
})), sdkCore.ChainId.ARBITRUM_ONE, new Apollo.ApolloClient({
  uri: CHAIN_BLOCK_SUBGRAPH_URL[sdkCore.ChainId.ARBITRUM_ONE],
  cache: new Apollo.InMemoryCache()
})), sdkCore.ChainId.OPTIMISM, new Apollo.ApolloClient({
  uri: CHAIN_BLOCK_SUBGRAPH_URL[sdkCore.ChainId.OPTIMISM],
  cache: new Apollo.InMemoryCache()
})), sdkCore.ChainId.POLYGON, new Apollo.ApolloClient({
  uri: CHAIN_BLOCK_SUBGRAPH_URL[sdkCore.ChainId.POLYGON],
  cache: new Apollo.InMemoryCache()
})), sdkCore.ChainId.CELO, new Apollo.ApolloClient({
  uri: CHAIN_BLOCK_SUBGRAPH_URL[sdkCore.ChainId.CELO],
  cache: new Apollo.InMemoryCache()
})), sdkCore.ChainId.BNB, new Apollo.ApolloClient({
  uri: CHAIN_BLOCK_SUBGRAPH_URL[sdkCore.ChainId.BNB],
  cache: new Apollo.InMemoryCache()
})), sdkCore.ChainId.AVALANCHE, new Apollo.ApolloClient({
  uri: CHAIN_BLOCK_SUBGRAPH_URL[sdkCore.ChainId.AVALANCHE],
  cache: new Apollo.InMemoryCache()
}));

exports.apolloClient = apolloClient;
