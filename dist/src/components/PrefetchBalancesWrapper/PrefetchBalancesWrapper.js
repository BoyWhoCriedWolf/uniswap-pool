import React__default, { useCallback, useEffect } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useWeb3React } from '@web3-react/core';
import { usePortfolioBalancesLazyQuery, usePortfolioBalancesQuery } from '../../graphql/data/__generated__/types-and-hooks.js';
import { GQL_MAINNET_CHAINS } from '../../graphql/data/util.js';
import usePrevious from '../../hooks/usePrevious.js';
import { atom, useAtom } from 'jotai';
import { usePendingActivity } from '../AccountDrawer/MiniPortfolio/Activity/hooks.js';

/** Returns true if the number of pending activities has decreased */
function useHasUpdatedTx() {
  var _usePendingActivity = usePendingActivity(),
    pendingActivityCount = _usePendingActivity.pendingActivityCount;
  var prevPendingActivityCount = usePrevious(pendingActivityCount);
  return !!prevPendingActivityCount && pendingActivityCount < prevPendingActivityCount;
}
function useCachedPortfolioBalancesQuery(_ref) {
  var account = _ref.account;
  return usePortfolioBalancesQuery({
    skip: !account,
    variables: {
      ownerAddress: account !== null && account !== void 0 ? account : "",
      chains: GQL_MAINNET_CHAINS
    },
    fetchPolicy: "cache-only",
    // PrefetchBalancesWrapper handles balance fetching/staleness; this component only reads from cache
    errorPolicy: "all"
  });
}
var hasUnfetchedBalancesAtom = atom(true);

/* Prefetches & caches portfolio balances when the wrapped component is hovered or the user completes a transaction */
function PrefetchBalancesWrapper(_ref2) {
  var children = _ref2.children,
    shouldFetchOnAccountUpdate = _ref2.shouldFetchOnAccountUpdate,
    className = _ref2.className;
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;
  var _usePortfolioBalances = usePortfolioBalancesLazyQuery(),
    _usePortfolioBalances2 = _slicedToArray(_usePortfolioBalances, 1),
    prefetchPortfolioBalances = _usePortfolioBalances2[0];

  // Use an atom to track unfetched state to avoid duplicating fetches if this component appears multiple times on the page.
  var _useAtom = useAtom(hasUnfetchedBalancesAtom),
    _useAtom2 = _slicedToArray(_useAtom, 2),
    hasUnfetchedBalances = _useAtom2[0],
    setHasUnfetchedBalances = _useAtom2[1];
  var fetchBalances = useCallback(function () {
    if (account) {
      prefetchPortfolioBalances({
        variables: {
          ownerAddress: account,
          chains: GQL_MAINNET_CHAINS
        }
      });
      setHasUnfetchedBalances(false);
    }
  }, [account, prefetchPortfolioBalances, setHasUnfetchedBalances]);
  var prevAccount = usePrevious(account);
  var hasUpdatedTx = useHasUpdatedTx();
  // Listens for account changes & recently updated transactions to keep portfolio balances fresh in apollo cache
  useEffect(function () {
    var accountChanged = prevAccount !== undefined && prevAccount !== account;
    if (hasUpdatedTx || accountChanged) {
      // The parent configures whether these conditions should trigger an immediate fetch,
      // if not, we set a flag to fetch on next hover.
      if (shouldFetchOnAccountUpdate) {
        fetchBalances();
      } else {
        setHasUnfetchedBalances(true);
      }
    }
  }, [account, prevAccount, shouldFetchOnAccountUpdate, fetchBalances, hasUpdatedTx, setHasUnfetchedBalances]);
  var onHover = useCallback(function () {
    if (hasUnfetchedBalances) fetchBalances();
  }, [fetchBalances, hasUnfetchedBalances]);
  return /*#__PURE__*/React__default.createElement("div", {
    onMouseEnter: onHover,
    className: className
  }, children);
}

export { PrefetchBalancesWrapper as default, useCachedPortfolioBalancesQuery };
