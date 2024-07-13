import { ChainId } from '@uniswap/sdk-core';
import { nativeOnChain } from '../../constants/tokens.js';
import { useMemo } from 'react';

function useNativeCurrency(chainId) {
  return useMemo(function () {
    return chainId ? nativeOnChain(chainId) :
    // display mainnet when not connected
    nativeOnChain(ChainId.MAINNET);
  }, [chainId]);
}

export { useNativeCurrency as default };
