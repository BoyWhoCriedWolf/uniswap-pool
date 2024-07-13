'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var hooks = require('../hooks.cjs');
var reducer = require('./reducer.cjs');

function useConnectedWallets() {
  var dispatch = hooks.useAppDispatch();
  var connectedWallets = hooks.useAppSelector(function (state) {
    return state.wallets.connectedWallets;
  });
  var addWallet = React.useCallback(function (wallet) {
    dispatch(reducer.addConnectedWallet(wallet));
  }, [dispatch]);
  return [connectedWallets, addWallet];
}

exports.useConnectedWallets = useConnectedWallets;
