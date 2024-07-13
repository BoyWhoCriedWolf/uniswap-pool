import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks.js';
import { addConnectedWallet } from './reducer.js';

function useConnectedWallets() {
  var dispatch = useAppDispatch();
  var connectedWallets = useAppSelector(function (state) {
    return state.wallets.connectedWallets;
  });
  var addWallet = useCallback(function (wallet) {
    dispatch(addConnectedWallet(wallet));
  }, [dispatch]);
  return [connectedWallets, addWallet];
}

export { useConnectedWallets };
