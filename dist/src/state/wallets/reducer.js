import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { createSlice } from '@reduxjs/toolkit';
import { shallowEqual } from 'react-redux';

var initialState = {
  connectedWallets: [],
  switchingChain: false
};
var walletsSlice = createSlice({
  name: "wallets",
  initialState: initialState,
  reducers: {
    addConnectedWallet: function addConnectedWallet(state, _ref) {
      var payload = _ref.payload;
      if (state.connectedWallets.some(function (wallet) {
        return shallowEqual(payload, wallet);
      })) return;
      state.connectedWallets = [].concat(_toConsumableArray(state.connectedWallets), [payload]);
    },
    startSwitchingChain: function startSwitchingChain(state, _ref2) {
      var payload = _ref2.payload;
      state.switchingChain = payload;
    },
    endSwitchingChain: function endSwitchingChain(state) {
      state.switchingChain = false;
    }
  }
});
var _walletsSlice$actions = walletsSlice.actions,
  addConnectedWallet = _walletsSlice$actions.addConnectedWallet,
  startSwitchingChain = _walletsSlice$actions.startSwitchingChain,
  endSwitchingChain = _walletsSlice$actions.endSwitchingChain;
var wallets = walletsSlice.reducer;

export { addConnectedWallet, wallets as default, endSwitchingChain, startSwitchingChain };
