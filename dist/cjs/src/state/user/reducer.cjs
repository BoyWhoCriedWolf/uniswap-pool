'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toolkit = require('@reduxjs/toolkit');
var meta = require('../../connection/meta.cjs');
var misc = require('../../constants/misc.cjs');
var types = require('../routing/types.cjs');
var types$1 = require('./types.cjs');

var _getPersistedConnecti;
var selectedWallet = (_getPersistedConnecti = meta.getPersistedConnectionMeta()) === null || _getPersistedConnecti === void 0 ? void 0 : _getPersistedConnecti.type;
var currentTimestamp = function currentTimestamp() {
  return new Date().getTime();
};
function pairKey(token0Address, token1Address) {
  return "".concat(token0Address, ";").concat(token1Address);
}
var initialState = {
  selectedWallet: selectedWallet,
  userLocale: null,
  userRouterPreference: types.RouterPreference.API,
  userHideClosedPositions: false,
  userSlippageTolerance: types$1.SlippageTolerance.Auto,
  userSlippageToleranceHasBeenMigratedToAuto: true,
  userDeadline: misc.DEFAULT_DEADLINE_FROM_NOW,
  tokens: {},
  pairs: {},
  timestamp: currentTimestamp(),
  hideBaseWalletBanner: false,
  showSurveyPopup: undefined,
  originCountry: undefined
};
var userSlice = toolkit.createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    updateSelectedWallet: function updateSelectedWallet(state, _ref) {
      var wallet = _ref.payload.wallet;
      if (!wallet) {
        meta.deletePersistedConnectionMeta();
      }
      state.selectedWallet = wallet;
    },
    updateUserLocale: function updateUserLocale(state, action) {
      if (action.payload.userLocale !== state.userLocale) {
        state.userLocale = action.payload.userLocale;
        state.timestamp = currentTimestamp();
      }
    },
    updateUserSlippageTolerance: function updateUserSlippageTolerance(state, action) {
      state.userSlippageTolerance = action.payload.userSlippageTolerance;
      state.timestamp = currentTimestamp();
    },
    updateUserDeadline: function updateUserDeadline(state, action) {
      state.userDeadline = action.payload.userDeadline;
      state.timestamp = currentTimestamp();
    },
    updateUserRouterPreference: function updateUserRouterPreference(state, action) {
      state.userRouterPreference = action.payload.userRouterPreference;
    },
    updateHideClosedPositions: function updateHideClosedPositions(state, action) {
      state.userHideClosedPositions = action.payload.userHideClosedPositions;
    },
    updateHideBaseWalletBanner: function updateHideBaseWalletBanner(state, action) {
      state.hideBaseWalletBanner = action.payload.hideBaseWalletBanner;
    },
    updateDisabledUniswapX: function updateDisabledUniswapX(state, action) {
      state.disabledUniswapX = action.payload.disabledUniswapX;
    },
    updateOptedOutOfUniswapX: function updateOptedOutOfUniswapX(state, action) {
      state.optedOutOfUniswapX = action.payload.optedOutOfUniswapX;
    },
    addSerializedToken: function addSerializedToken(state, _ref2) {
      var serializedToken = _ref2.payload.serializedToken;
      if (!state.tokens) {
        state.tokens = {};
      }
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {};
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken;
      state.timestamp = currentTimestamp();
    },
    addSerializedPair: function addSerializedPair(state, _ref3) {
      var serializedPair = _ref3.payload.serializedPair;
      if (serializedPair.token0.chainId === serializedPair.token1.chainId && serializedPair.token0.address !== serializedPair.token1.address) {
        var _chainId = serializedPair.token0.chainId;
        state.pairs[_chainId] = state.pairs[_chainId] || {};
        state.pairs[_chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair;
      }
      state.timestamp = currentTimestamp();
    },
    setOriginCountry: function setOriginCountry(state, _ref4) {
      var country = _ref4.payload;
      state.originCountry = country;
    }
  }
});
var _userSlice$actions = userSlice.actions;
  _userSlice$actions.addSerializedPair;
  var addSerializedToken = _userSlice$actions.addSerializedToken,
  setOriginCountry = _userSlice$actions.setOriginCountry,
  updateSelectedWallet = _userSlice$actions.updateSelectedWallet,
  updateHideClosedPositions = _userSlice$actions.updateHideClosedPositions,
  updateUserRouterPreference = _userSlice$actions.updateUserRouterPreference,
  updateUserDeadline = _userSlice$actions.updateUserDeadline,
  updateUserLocale = _userSlice$actions.updateUserLocale,
  updateUserSlippageTolerance = _userSlice$actions.updateUserSlippageTolerance,
  updateHideBaseWalletBanner = _userSlice$actions.updateHideBaseWalletBanner,
  updateDisabledUniswapX = _userSlice$actions.updateDisabledUniswapX,
  updateOptedOutOfUniswapX = _userSlice$actions.updateOptedOutOfUniswapX;
var user = userSlice.reducer;

exports.addSerializedToken = addSerializedToken;
exports["default"] = user;
exports.initialState = initialState;
exports.setOriginCountry = setOriginCountry;
exports.updateDisabledUniswapX = updateDisabledUniswapX;
exports.updateHideBaseWalletBanner = updateHideBaseWalletBanner;
exports.updateHideClosedPositions = updateHideClosedPositions;
exports.updateOptedOutOfUniswapX = updateOptedOutOfUniswapX;
exports.updateSelectedWallet = updateSelectedWallet;
exports.updateUserDeadline = updateUserDeadline;
exports.updateUserLocale = updateUserLocale;
exports.updateUserRouterPreference = updateUserRouterPreference;
exports.updateUserSlippageTolerance = updateUserSlippageTolerance;
