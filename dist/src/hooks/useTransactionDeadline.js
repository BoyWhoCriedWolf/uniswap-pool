import { useWeb3React } from '@web3-react/core';
import { L2_CHAIN_IDS } from '../constants/chains.js';
import { L2_DEADLINE_FROM_NOW } from '../constants/misc.js';
import { useMemo } from 'react';
import { useAppSelector } from '../state/hooks.js';
import useCurrentBlockTimestamp from './useCurrentBlockTimestamp.js';

// combines the block timestamp with the user setting to give the deadline that should be used for any submitted transaction
function useTransactionDeadline() {
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var ttl = useAppSelector(function (state) {
    return state.user.userDeadline;
  });
  var blockTimestamp = useCurrentBlockTimestamp();
  return useMemo(function () {
    if (blockTimestamp && chainId && L2_CHAIN_IDS.includes(chainId)) return blockTimestamp.add(L2_DEADLINE_FROM_NOW);
    if (blockTimestamp && ttl) return blockTimestamp.add(ttl);
    return undefined;
  }, [blockTimestamp, chainId, ttl]);
}

export { useTransactionDeadline as default };
