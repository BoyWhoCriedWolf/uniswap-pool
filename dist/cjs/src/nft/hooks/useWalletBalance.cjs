'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var units = require('@ethersproject/units');
var core = require('@web3-react/core');
var useCurrencyBalance = require('../../lib/hooks/useCurrencyBalance.cjs');

function useWalletBalance() {
  var _useNativeCurrencyBal;
  var _useWeb3React = core.useWeb3React(),
    address = _useWeb3React.account,
    provider = _useWeb3React.provider;
  var balanceString = ((_useNativeCurrencyBal = useCurrencyBalance.useNativeCurrencyBalances(address ? [address] : [])) === null || _useNativeCurrencyBal === void 0 || (_useNativeCurrencyBal = _useNativeCurrencyBal[address !== null && address !== void 0 ? address : ""]) === null || _useNativeCurrencyBal === void 0 ? void 0 : _useNativeCurrencyBal.toSignificant(3)) || "0";
  return address == null ? {
    address: "",
    balance: "0",
    weiBalance: units.parseEther("0"),
    provider: undefined
  } : {
    address: address,
    balance: balanceString,
    weiBalance: units.parseEther(balanceString),
    provider: provider
  };
}

exports.useWalletBalance = useWalletBalance;
