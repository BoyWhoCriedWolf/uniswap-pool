import { BigNumber } from '@ethersproject/bignumber';
import { useSingleCallResult } from '../lib/hooks/multicall.js';
import { useMemo } from 'react';
import { useInterfaceMulticall } from './useContract.js';

// gets the current timestamp from the blockchain
function useCurrentBlockTimestamp() {
  var _useSingleCallResult;
  var multicall = useInterfaceMulticall();
  var resultStr = (_useSingleCallResult = useSingleCallResult(multicall, "getCurrentBlockTimestamp")) === null || _useSingleCallResult === void 0 || (_useSingleCallResult = _useSingleCallResult.result) === null || _useSingleCallResult === void 0 || (_useSingleCallResult = _useSingleCallResult[0]) === null || _useSingleCallResult === void 0 ? void 0 : _useSingleCallResult.toString();
  return useMemo(function () {
    return typeof resultStr === "string" ? BigNumber.from(resultStr) : undefined;
  }, [resultStr]);
}

export { useCurrentBlockTimestamp as default };
