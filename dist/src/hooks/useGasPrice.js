import JSBI from 'jsbi';
import { useSingleCallResult } from '../lib/hooks/multicall.js';
import { useMemo } from 'react';
import { useContract } from './useContract.js';
import useENSAddress from './useENSAddress.js';

var CHAIN_DATA_ABI = [{
  inputs: [],
  name: "latestAnswer",
  outputs: [{
    internalType: "int256",
    name: "",
    type: "int256"
  }],
  stateMutability: "view",
  type: "function"
}];

/**
 * Returns the price of 1 gas in WEI for the currently selected network using the chainlink fast gas price oracle
 */
function useGasPrice() {
  var _useSingleCallResult$;
  var _useENSAddress = useENSAddress("fast-gas-gwei.data.eth"),
    address = _useENSAddress.address;
  var contract = useContract(address !== null && address !== void 0 ? address : undefined, CHAIN_DATA_ABI, false);
  var resultStr = (_useSingleCallResult$ = useSingleCallResult(contract, "latestAnswer").result) === null || _useSingleCallResult$ === void 0 || (_useSingleCallResult$ = _useSingleCallResult$[0]) === null || _useSingleCallResult$ === void 0 ? void 0 : _useSingleCallResult$.toString();
  return useMemo(function () {
    return typeof resultStr === "string" ? JSBI.BigInt(resultStr) : undefined;
  }, [resultStr]);
}

export { useGasPrice as default };
