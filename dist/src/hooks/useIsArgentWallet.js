import { useWeb3React } from '@web3-react/core';
import { useSingleCallResult } from '../lib/hooks/multicall.js';
import { useMemo } from 'react';
import { useArgentWalletDetectorContract } from './useContract.js';
import { NEVER_RELOAD } from '@uniswap/redux-multicall';

function useIsArgentWallet() {
  var _call$result;
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;
  var argentWalletDetector = useArgentWalletDetectorContract();
  var inputs = useMemo(function () {
    return [account !== null && account !== void 0 ? account : undefined];
  }, [account]);
  var call = useSingleCallResult(argentWalletDetector, "isArgentWallet", inputs, NEVER_RELOAD);
  return Boolean(call === null || call === void 0 || (_call$result = call.result) === null || _call$result === void 0 ? void 0 : _call$result[0]);
}

export { useIsArgentWallet as default };
