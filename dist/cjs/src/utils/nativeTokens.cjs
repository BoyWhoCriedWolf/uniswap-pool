'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tokens = require('../constants/tokens.cjs');
var typesAndHooks = require('../graphql/data/__generated__/types-and-hooks.cjs');
var util = require('../graphql/data/util.cjs');

function getNativeTokenDBAddress(chain) {
  var pageChainId = util.supportedChainIdFromGQLChain(chain);
  if (pageChainId === undefined) {
    return undefined;
  }
  switch (chain) {
    case typesAndHooks.Chain.Celo:
    case typesAndHooks.Chain.Polygon:
      return tokens.nativeOnChain(pageChainId).wrapped.address;
    case typesAndHooks.Chain.Ethereum:
    case typesAndHooks.Chain.Arbitrum:
    case typesAndHooks.Chain.EthereumGoerli:
    case typesAndHooks.Chain.Optimism:
    default:
      return undefined;
  }
}

exports.getNativeTokenDBAddress = getNativeTokenDBAddress;
