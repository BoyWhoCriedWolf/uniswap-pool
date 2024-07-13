'use strict';

var core = require('@web3-react/core');
var chains = require('../constants/chains.cjs');
var misc = require('../constants/misc.cjs');
var React = require('react');
var hooks = require('../state/hooks.cjs');
var useCurrentBlockTimestamp = require('./useCurrentBlockTimestamp.cjs');

// combines the block timestamp with the user setting to give the deadline that should be used for any submitted transaction
function useTransactionDeadline() {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var ttl = hooks.useAppSelector(function (state) {
    return state.user.userDeadline;
  });
  var blockTimestamp = useCurrentBlockTimestamp();
  return React.useMemo(function () {
    if (blockTimestamp && chainId && chains.L2_CHAIN_IDS.includes(chainId)) return blockTimestamp.add(misc.L2_DEADLINE_FROM_NOW);
    if (blockTimestamp && ttl) return blockTimestamp.add(ttl);
    return undefined;
  }, [blockTimestamp, chainId, ttl]);
}

module.exports = useTransactionDeadline;
