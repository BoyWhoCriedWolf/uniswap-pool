import { createSlice } from '@reduxjs/toolkit';
import { getPersistedConnectionMeta, deletePersistedConnectionMeta } from '../../connection/meta.js';
import { DEFAULT_DEADLINE_FROM_NOW } from '../../constants/misc.js';
import { RouterPreference } from '../routing/types.js';
import { SlippageTolerance } from './types.js';

const selectedWallet = getPersistedConnectionMeta()?.type;
const currentTimestamp = () => new Date().getTime();
function pairKey(token0Address, token1Address) {
  return `${token0Address};${token1Address}`;
}
const initialState = {
  selectedWallet,
  userLocale: null,
  userRouterPreference: RouterPreference.API,
  userHideClosedPositions: false,
  userSlippageTolerance: SlippageTolerance.Auto,
  userSlippageToleranceHasBeenMigratedToAuto: true,
  userDeadline: DEFAULT_DEADLINE_FROM_NOW,
  tokens: {},
  pairs: {},
  timestamp: currentTimestamp(),
  hideBaseWalletBanner: false,
  showSurveyPopup: undefined,
  originCountry: undefined
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateSelectedWallet(state, _ref) {
      let {
        payload: {
          wallet
        }
      } = _ref;
      if (!wallet) {
        deletePersistedConnectionMeta();
      }
      state.selectedWallet = wallet;
    },
    updateUserLocale(state, action) {
      if (action.payload.userLocale !== state.userLocale) {
        state.userLocale = action.payload.userLocale;
        state.timestamp = currentTimestamp();
      }
    },
    updateUserSlippageTolerance(state, action) {
      state.userSlippageTolerance = action.payload.userSlippageTolerance;
      state.timestamp = currentTimestamp();
    },
    updateUserDeadline(state, action) {
      state.userDeadline = action.payload.userDeadline;
      state.timestamp = currentTimestamp();
    },
    updateUserRouterPreference(state, action) {
      state.userRouterPreference = action.payload.userRouterPreference;
    },
    updateHideClosedPositions(state, action) {
      state.userHideClosedPositions = action.payload.userHideClosedPositions;
    },
    updateHideBaseWalletBanner(state, action) {
      state.hideBaseWalletBanner = action.payload.hideBaseWalletBanner;
    },
    updateDisabledUniswapX(state, action) {
      state.disabledUniswapX = action.payload.disabledUniswapX;
    },
    updateOptedOutOfUniswapX(state, action) {
      state.optedOutOfUniswapX = action.payload.optedOutOfUniswapX;
    },
    addSerializedToken(state, _ref2) {
      let {
        payload: {
          serializedToken
        }
      } = _ref2;
      if (!state.tokens) {
        state.tokens = {};
      }
      state.tokens[serializedToken.chainId] = state.tokens[serializedToken.chainId] || {};
      state.tokens[serializedToken.chainId][serializedToken.address] = serializedToken;
      state.timestamp = currentTimestamp();
    },
    addSerializedPair(state, _ref3) {
      let {
        payload: {
          serializedPair
        }
      } = _ref3;
      if (serializedPair.token0.chainId === serializedPair.token1.chainId && serializedPair.token0.address !== serializedPair.token1.address) {
        const chainId = serializedPair.token0.chainId;
        state.pairs[chainId] = state.pairs[chainId] || {};
        state.pairs[chainId][pairKey(serializedPair.token0.address, serializedPair.token1.address)] = serializedPair;
      }
      state.timestamp = currentTimestamp();
    },
    setOriginCountry(state, _ref4) {
      let {
        payload: country
      } = _ref4;
      state.originCountry = country;
    }
  }
});
const {
  addSerializedPair,
  addSerializedToken,
  setOriginCountry,
  updateSelectedWallet,
  updateHideClosedPositions,
  updateUserRouterPreference,
  updateUserDeadline,
  updateUserLocale,
  updateUserSlippageTolerance,
  updateHideBaseWalletBanner,
  updateDisabledUniswapX,
  updateOptedOutOfUniswapX
} = userSlice.actions;
var user = userSlice.reducer;

export { addSerializedPair, addSerializedToken, user as default, initialState, setOriginCountry, updateDisabledUniswapX, updateHideBaseWalletBanner, updateHideClosedPositions, updateOptedOutOfUniswapX, updateSelectedWallet, updateUserDeadline, updateUserLocale, updateUserRouterPreference, updateUserSlippageTolerance };
