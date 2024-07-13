import { nativeOnChain } from '../constants/tokens.js';
import { Chain } from '../graphql/data/__generated__/types-and-hooks.js';
import { supportedChainIdFromGQLChain } from '../graphql/data/util.js';

function getNativeTokenDBAddress(chain) {
  var pageChainId = supportedChainIdFromGQLChain(chain);
  if (pageChainId === undefined) {
    return undefined;
  }
  switch (chain) {
    case Chain.Celo:
    case Chain.Polygon:
      return nativeOnChain(pageChainId).wrapped.address;
    case Chain.Ethereum:
    case Chain.Arbitrum:
    case Chain.EthereumGoerli:
    case Chain.Optimism:
    default:
      return undefined;
  }
}

export { getNativeTokenDBAddress };
