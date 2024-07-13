'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@web3-react/core');
var React = require('react');
var hooks = require('../state/lists/hooks.cjs');

/** Returns a WrappedTokenInfo from the active token lists when possible, or the passed token otherwise. */
function useTokenInfoFromActiveList(currency) {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var activeList = hooks.useCombinedActiveList();
  return React.useMemo(function () {
    if (!chainId) return;
    if (currency.isNative) return currency;
    try {
      return activeList[chainId][currency.wrapped.address].token;
    } catch (e) {
      return currency;
    }
  }, [activeList, chainId, currency]);
}

exports.useTokenInfoFromActiveList = useTokenInfoFromActiveList;
