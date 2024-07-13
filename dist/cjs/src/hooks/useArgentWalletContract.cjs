'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@web3-react/core');
var argentWalletContract = require('../abis/argent-wallet-contract.cjs');
var useContract = require('./useContract.cjs');
var useIsArgentWallet = require('./useIsArgentWallet.cjs');

function useArgentWalletContract() {
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  var isArgentWallet = useIsArgentWallet();
  return useContract.useContract(isArgentWallet ? account !== null && account !== void 0 ? account : undefined : undefined, argentWalletContract, true);
}

exports.useArgentWalletContract = useArgentWalletContract;
