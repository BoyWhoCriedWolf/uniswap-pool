'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var toolkit = require('@reduxjs/toolkit');
var misc = require('../../constants/misc.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

var PopupType = /*#__PURE__*/function (PopupType) {
  PopupType["Transaction"] = "transaction";
  PopupType["Order"] = "order";
  PopupType["FailedSwitchNetwork"] = "failedSwitchNetwork";
  return PopupType;
}({});
var ApplicationModal = /*#__PURE__*/function (ApplicationModal) {
  ApplicationModal[ApplicationModal["ADDRESS_CLAIM"] = 0] = "ADDRESS_CLAIM";
  ApplicationModal[ApplicationModal["BLOCKED_ACCOUNT"] = 1] = "BLOCKED_ACCOUNT";
  ApplicationModal[ApplicationModal["CLAIM_POPUP"] = 2] = "CLAIM_POPUP";
  ApplicationModal[ApplicationModal["DELEGATE"] = 3] = "DELEGATE";
  ApplicationModal[ApplicationModal["EXECUTE"] = 4] = "EXECUTE";
  ApplicationModal[ApplicationModal["FEATURE_FLAGS"] = 5] = "FEATURE_FLAGS";
  ApplicationModal[ApplicationModal["FIAT_ONRAMP"] = 6] = "FIAT_ONRAMP";
  ApplicationModal[ApplicationModal["MENU"] = 7] = "MENU";
  ApplicationModal[ApplicationModal["METAMASK_CONNECTION_ERROR"] = 8] = "METAMASK_CONNECTION_ERROR";
  ApplicationModal[ApplicationModal["NETWORK_FILTER"] = 9] = "NETWORK_FILTER";
  ApplicationModal[ApplicationModal["NETWORK_SELECTOR"] = 10] = "NETWORK_SELECTOR";
  ApplicationModal[ApplicationModal["POOL_OVERVIEW_OPTIONS"] = 11] = "POOL_OVERVIEW_OPTIONS";
  ApplicationModal[ApplicationModal["PRIVACY_POLICY"] = 12] = "PRIVACY_POLICY";
  ApplicationModal[ApplicationModal["QUEUE"] = 13] = "QUEUE";
  ApplicationModal[ApplicationModal["SELF_CLAIM"] = 14] = "SELF_CLAIM";
  ApplicationModal[ApplicationModal["SETTINGS"] = 15] = "SETTINGS";
  ApplicationModal[ApplicationModal["SHARE"] = 16] = "SHARE";
  ApplicationModal[ApplicationModal["TAX_SERVICE"] = 17] = "TAX_SERVICE";
  ApplicationModal[ApplicationModal["TIME_SELECTOR"] = 18] = "TIME_SELECTOR";
  ApplicationModal[ApplicationModal["VOTE"] = 19] = "VOTE";
  ApplicationModal[ApplicationModal["UK_DISCLAIMER"] = 20] = "UK_DISCLAIMER";
  ApplicationModal[ApplicationModal["UNISWAP_NFT_AIRDROP_CLAIM"] = 21] = "UNISWAP_NFT_AIRDROP_CLAIM";
  return ApplicationModal;
}({});
var initialState = {
  fiatOnramp: {
    available: false,
    availabilityChecked: false
  },
  chainId: null,
  openModal: null,
  popupList: []
};
var applicationSlice = toolkit.createSlice({
  name: "application",
  initialState: initialState,
  reducers: {
    setFiatOnrampAvailability: function setFiatOnrampAvailability(state, _ref) {
      var available = _ref.payload;
      state.fiatOnramp = {
        available: available,
        availabilityChecked: true
      };
    },
    updateChainId: function updateChainId(state, action) {
      var chainId = action.payload.chainId;
      state.chainId = chainId;
    },
    setOpenModal: function setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    addPopup: function addPopup(state, _ref2) {
      var _ref2$payload = _ref2.payload,
        content = _ref2$payload.content,
        key = _ref2$payload.key,
        _ref2$payload$removeA = _ref2$payload.removeAfterMs,
        removeAfterMs = _ref2$payload$removeA === void 0 ? misc.DEFAULT_TXN_DISMISS_MS : _ref2$payload$removeA;
      key = key || toolkit.nanoid();
      state.popupList = [].concat(_toConsumableArray__default["default"](state.popupList.filter(function (popup) {
        return popup.key !== key;
      })), [{
        key: key,
        show: true,
        content: content,
        removeAfterMs: removeAfterMs
      }]);
    },
    removePopup: function removePopup(state, _ref3) {
      var key = _ref3.payload.key;
      state.popupList = state.popupList.map(function (popup) {
        if (popup.key === key) {
          popup.show = false;
        }
        return popup;
      });
    }
  }
});
var _applicationSlice$act = applicationSlice.actions,
  updateChainId = _applicationSlice$act.updateChainId,
  setFiatOnrampAvailability = _applicationSlice$act.setFiatOnrampAvailability,
  setOpenModal = _applicationSlice$act.setOpenModal,
  addPopup = _applicationSlice$act.addPopup,
  removePopup = _applicationSlice$act.removePopup;
var application = applicationSlice.reducer;

exports.ApplicationModal = ApplicationModal;
exports.PopupType = PopupType;
exports.addPopup = addPopup;
exports["default"] = application;
exports.removePopup = removePopup;
exports.setFiatOnrampAvailability = setFiatOnrampAvailability;
exports.setOpenModal = setOpenModal;
exports.updateChainId = updateChainId;
