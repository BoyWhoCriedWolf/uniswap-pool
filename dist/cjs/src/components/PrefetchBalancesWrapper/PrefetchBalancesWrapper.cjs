'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var core = require('@web3-react/core');
var typesAndHooks = require('../../graphql/data/__generated__/types-and-hooks.cjs');
var util = require('../../graphql/data/util.cjs');
var usePrevious = require('../../hooks/usePrevious.cjs');
var jotai = require('jotai');
var hooks = require('../AccountDrawer/MiniPortfolio/Activity/hooks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

/** Returns true if the number of pending activities has decreased */
function useHasUpdatedTx() {
  var _usePendingActivity = hooks.usePendingActivity(),
    pendingActivityCount = _usePendingActivity.pendingActivityCount;
  var prevPendingActivityCount = usePrevious(pendingActivityCount);
  return !!prevPendingActivityCount && pendingActivityCount < prevPendingActivityCount;
}
function useCachedPortfolioBalancesQuery(_ref) {
  var account = _ref.account;
  return typesAndHooks.usePortfolioBalancesQuery({
    skip: !account,
    variables: {
      ownerAddress: account !== null && account !== void 0 ? account : "",
      chains: util.GQL_MAINNET_CHAINS
    },
    fetchPolicy: "cache-only",
    // PrefetchBalancesWrapper handles balance fetching/staleness; this component only reads from cache
    errorPolicy: "all"
  });
}
var hasUnfetchedBalancesAtom = jotai.atom(true);

/* Prefetches & caches portfolio balances when the wrapped component is hovered or the user completes a transaction */
function PrefetchBalancesWrapper(_ref2) {
  var children = _ref2.children,
    shouldFetchOnAccountUpdate = _ref2.shouldFetchOnAccountUpdate,
    className = _ref2.className;
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  var _usePortfolioBalances = typesAndHooks.usePortfolioBalancesLazyQuery(),
    _usePortfolioBalances2 = _slicedToArray__default["default"](_usePortfolioBalances, 1),
    prefetchPortfolioBalances = _usePortfolioBalances2[0];

  // Use an atom to track unfetched state to avoid duplicating fetches if this component appears multiple times on the page.
  var _useAtom = jotai.useAtom(hasUnfetchedBalancesAtom),
    _useAtom2 = _slicedToArray__default["default"](_useAtom, 2),
    hasUnfetchedBalances = _useAtom2[0],
    setHasUnfetchedBalances = _useAtom2[1];
  var fetchBalances = React.useCallback(function () {
    if (account) {
      prefetchPortfolioBalances({
        variables: {
          ownerAddress: account,
          chains: util.GQL_MAINNET_CHAINS
        }
      });
      setHasUnfetchedBalances(false);
    }
  }, [account, prefetchPortfolioBalances, setHasUnfetchedBalances]);
  var prevAccount = usePrevious(account);
  var hasUpdatedTx = useHasUpdatedTx();
  // Listens for account changes & recently updated transactions to keep portfolio balances fresh in apollo cache
  React.useEffect(function () {
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
  var onHover = React.useCallback(function () {
    if (hasUnfetchedBalances) fetchBalances();
  }, [fetchBalances, hasUnfetchedBalances]);
  return /*#__PURE__*/React__default["default"].createElement("div", {
    onMouseEnter: onHover,
    className: className
  }, children);
}

exports["default"] = PrefetchBalancesWrapper;
exports.useCachedPortfolioBalancesQuery = useCachedPortfolioBalancesQuery;
