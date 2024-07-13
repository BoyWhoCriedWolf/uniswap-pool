import { createSlice, nanoid } from '@reduxjs/toolkit';
import { DEFAULT_TXN_DISMISS_MS } from '../../constants/misc.js';

let PopupType = /*#__PURE__*/function (PopupType) {
  PopupType["Transaction"] = "transaction";
  PopupType["Order"] = "order";
  PopupType["FailedSwitchNetwork"] = "failedSwitchNetwork";
  return PopupType;
}({});
let ApplicationModal = /*#__PURE__*/function (ApplicationModal) {
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
const initialState = {
  fiatOnramp: {
    available: false,
    availabilityChecked: false
  },
  chainId: null,
  openModal: null,
  popupList: []
};
const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    setFiatOnrampAvailability(state, _ref) {
      let {
        payload: available
      } = _ref;
      state.fiatOnramp = {
        available,
        availabilityChecked: true
      };
    },
    updateChainId(state, action) {
      const {
        chainId
      } = action.payload;
      state.chainId = chainId;
    },
    setOpenModal(state, action) {
      state.openModal = action.payload;
    },
    addPopup(state, _ref2) {
      let {
        payload: {
          content,
          key,
          removeAfterMs = DEFAULT_TXN_DISMISS_MS
        }
      } = _ref2;
      key = key || nanoid();
      state.popupList = [...state.popupList.filter(popup => popup.key !== key), {
        key,
        show: true,
        content,
        removeAfterMs
      }];
    },
    removePopup(state, _ref3) {
      let {
        payload: {
          key
        }
      } = _ref3;
      state.popupList = state.popupList.map(popup => {
        if (popup.key === key) {
          popup.show = false;
        }
        return popup;
      });
    }
  }
});
const {
  updateChainId,
  setFiatOnrampAvailability,
  setOpenModal,
  addPopup,
  removePopup
} = applicationSlice.actions;
var application = applicationSlice.reducer;

export { ApplicationModal, PopupType, addPopup, application as default, removePopup, setFiatOnrampAvailability, setOpenModal, updateChainId };
