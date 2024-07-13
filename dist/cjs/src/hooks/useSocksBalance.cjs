'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var React = require('react');
var useCurrencyBalance = require('../lib/hooks/useCurrencyBalance.cjs');

// technically a 721, not an ERC20, but suffices for our purposes
var SOCKS = new sdkCore.Token(sdkCore.ChainId.MAINNET, sdkCore.SOCKS_CONTROLLER_ADDRESSES[sdkCore.ChainId.MAINNET], 0);
function useHasSocks() {
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId;
  var balance = useCurrencyBalance.useTokenBalance(account !== null && account !== void 0 ? account : undefined, chainId === sdkCore.ChainId.MAINNET ? SOCKS : undefined);
  return React.useMemo(function () {
    return Boolean(balance === null || balance === void 0 ? void 0 : balance.greaterThan(0));
  }, [balance]);
}

exports.useHasSocks = useHasSocks;
