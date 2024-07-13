'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var toolkit = require('@reduxjs/toolkit');
var reactRedux = require('react-redux');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

var initialState = {
  connectedWallets: [],
  switchingChain: false
};
var walletsSlice = toolkit.createSlice({
  name: "wallets",
  initialState: initialState,
  reducers: {
    addConnectedWallet: function addConnectedWallet(state, _ref) {
      var payload = _ref.payload;
      if (state.connectedWallets.some(function (wallet) {
        return reactRedux.shallowEqual(payload, wallet);
      })) return;
      state.connectedWallets = [].concat(_toConsumableArray__default["default"](state.connectedWallets), [payload]);
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

exports.addConnectedWallet = addConnectedWallet;
exports["default"] = wallets;
exports.endSwitchingChain = endSwitchingChain;
exports.startSwitchingChain = startSwitchingChain;
