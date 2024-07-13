'use strict';

var bignumber = require('@ethersproject/bignumber');
var multicall = require('../lib/hooks/multicall.cjs');
var React = require('react');
var useContract = require('./useContract.cjs');

// gets the current timestamp from the blockchain
function useCurrentBlockTimestamp() {
  var _useSingleCallResult;
  var multicall$1 = useContract.useInterfaceMulticall();
  var resultStr = (_useSingleCallResult = multicall.useSingleCallResult(multicall$1, "getCurrentBlockTimestamp")) === null || _useSingleCallResult === void 0 || (_useSingleCallResult = _useSingleCallResult.result) === null || _useSingleCallResult === void 0 || (_useSingleCallResult = _useSingleCallResult[0]) === null || _useSingleCallResult === void 0 ? void 0 : _useSingleCallResult.toString();
  return React.useMemo(function () {
    return typeof resultStr === "string" ? bignumber.BigNumber.from(resultStr) : undefined;
  }, [resultStr]);
}

module.exports = useCurrentBlockTimestamp;
