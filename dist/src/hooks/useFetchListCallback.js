import { nanoid } from '@reduxjs/toolkit';
import { ChainId } from '@uniswap/sdk-core';
import { RPC_PROVIDERS, DEPRECATED_RPC_PROVIDERS } from '../constants/providers.js';
import { useFallbackProviderEnabled } from '../featureFlags/flags/fallbackProvider.js';
import fetchTokenList$1 from '../lib/hooks/useTokenList/fetchTokenList.js';
import resolveENSContentHash from '../lib/utils/resolveENSContentHash.js';
import { useCallback } from 'react';
import { useAppDispatch } from '../state/hooks.js';
import { fetchTokenList } from '../state/lists/actions.js';

function useFetchListCallback() {
  const dispatch = useAppDispatch();
  const providers = useFallbackProviderEnabled() ? RPC_PROVIDERS : DEPRECATED_RPC_PROVIDERS;
  return useCallback(async (listUrl, skipValidation) => {
    const requestId = nanoid();
    dispatch(fetchTokenList.pending({
      requestId,
      url: listUrl
    }));
    return fetchTokenList$1(listUrl, ensName => resolveENSContentHash(ensName, providers[ChainId.MAINNET]), skipValidation).then(tokenList => {
      dispatch(fetchTokenList.fulfilled({
        url: listUrl,
        tokenList,
        requestId
      }));
      return tokenList;
    }).catch(error => {
      console.debug(`Failed to get list at url ${listUrl}`, error);
      dispatch(fetchTokenList.rejected({
        url: listUrl,
        requestId,
        errorMessage: error.message
      }));
      throw error;
    });
  }, [dispatch, providers]);
}

export { useFetchListCallback };
