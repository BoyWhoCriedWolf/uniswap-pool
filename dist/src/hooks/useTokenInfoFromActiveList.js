import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { useCombinedActiveList } from '../state/lists/hooks.js';

/** Returns a WrappedTokenInfo from the active token lists when possible, or the passed token otherwise. */
function useTokenInfoFromActiveList(currency) {
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var activeList = useCombinedActiveList();
  return useMemo(function () {
    if (!chainId) return;
    if (currency.isNative) return currency;
    try {
      return activeList[chainId][currency.wrapped.address].token;
    } catch (e) {
      return currency;
    }
  }, [activeList, chainId, currency]);
}

export { useTokenInfoFromActiveList };
