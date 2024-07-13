'use strict';

var core = require('@web3-react/core');
var multicall = require('../lib/hooks/multicall.cjs');
var React = require('react');
var useContract = require('./useContract.cjs');
var reduxMulticall = require('@uniswap/redux-multicall');

function useIsArgentWallet() {
  var _call$result;
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  var argentWalletDetector = useContract.useArgentWalletDetectorContract();
  var inputs = React.useMemo(function () {
    return [account !== null && account !== void 0 ? account : undefined];
  }, [account]);
  var call = multicall.useSingleCallResult(argentWalletDetector, "isArgentWallet", inputs, reduxMulticall.NEVER_RELOAD);
  return Boolean(call === null || call === void 0 || (_call$result = call.result) === null || _call$result === void 0 ? void 0 : _call$result[0]);
}

module.exports = useIsArgentWallet;
