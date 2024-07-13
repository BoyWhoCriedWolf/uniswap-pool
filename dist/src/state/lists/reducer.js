import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { createReducer } from '@reduxjs/toolkit';
import { getVersionUpgrade, VersionUpgrade } from '@uniswap/token-lists';
import TokenSafetyLookupTable from '../../constants/tokenSafetyLookup.js';
import { DEFAULT_LIST_OF_LISTS } from '../../constants/lists.js';
import { updateVersion } from '../global/actions.js';
import { fetchTokenList, addList, removeList, acceptListUpdate } from './actions.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var NEW_LIST_STATE = {
  error: null,
  current: null,
  loadingRequestId: null,
  pendingUpdate: null
};
var initialState = {
  lastInitializedDefaultListOfLists: DEFAULT_LIST_OF_LISTS,
  byUrl: _objectSpread({}, DEFAULT_LIST_OF_LISTS.reduce(function (memo, listUrl) {
    memo[listUrl] = NEW_LIST_STATE;
    return memo;
  }, {}))
};
var lists = createReducer(initialState, function (builder) {
  return builder.addCase(fetchTokenList.pending, function (state, _ref) {
    var _state$byUrl$url$curr, _state$byUrl$url, _state$byUrl$url$pend, _state$byUrl$url2;
    var _ref$payload = _ref.payload,
      requestId = _ref$payload.requestId,
      url = _ref$payload.url;
    var current = (_state$byUrl$url$curr = (_state$byUrl$url = state.byUrl[url]) === null || _state$byUrl$url === void 0 ? void 0 : _state$byUrl$url.current) !== null && _state$byUrl$url$curr !== void 0 ? _state$byUrl$url$curr : null;
    var pendingUpdate = (_state$byUrl$url$pend = (_state$byUrl$url2 = state.byUrl[url]) === null || _state$byUrl$url2 === void 0 ? void 0 : _state$byUrl$url2.pendingUpdate) !== null && _state$byUrl$url$pend !== void 0 ? _state$byUrl$url$pend : null;
    state.byUrl[url] = {
      current: current,
      pendingUpdate: pendingUpdate,
      loadingRequestId: requestId,
      error: null
    };
  }).addCase(fetchTokenList.fulfilled, function (state, _ref2) {
    var _state$byUrl$url3, _state$byUrl$url4;
    var _ref2$payload = _ref2.payload,
      requestId = _ref2$payload.requestId,
      tokenList = _ref2$payload.tokenList,
      url = _ref2$payload.url;
    var current = (_state$byUrl$url3 = state.byUrl[url]) === null || _state$byUrl$url3 === void 0 ? void 0 : _state$byUrl$url3.current;
    var loadingRequestId = (_state$byUrl$url4 = state.byUrl[url]) === null || _state$byUrl$url4 === void 0 ? void 0 : _state$byUrl$url4.loadingRequestId;

    // no-op if update does nothing
    if (current) {
      var upgradeType = getVersionUpgrade(current.version, tokenList.version);
      if (upgradeType === VersionUpgrade.NONE) return;
      if (loadingRequestId === null || loadingRequestId === requestId) {
        state.byUrl[url] = {
          current: current,
          pendingUpdate: tokenList,
          loadingRequestId: null,
          error: null
        };
      }
    } else {
      state.byUrl[url] = {
        current: tokenList,
        pendingUpdate: null,
        loadingRequestId: null,
        error: null
      };
      TokenSafetyLookupTable.update(state);
    }
  }).addCase(fetchTokenList.rejected, function (state, _ref3) {
    var _state$byUrl$url5;
    var _ref3$payload = _ref3.payload,
      url = _ref3$payload.url,
      requestId = _ref3$payload.requestId,
      errorMessage = _ref3$payload.errorMessage;
    if (((_state$byUrl$url5 = state.byUrl[url]) === null || _state$byUrl$url5 === void 0 ? void 0 : _state$byUrl$url5.loadingRequestId) !== requestId) {
      // no-op since it's not the latest request
      return;
    }
    state.byUrl[url] = {
      current: state.byUrl[url].current ? state.byUrl[url].current : null,
      pendingUpdate: null,
      loadingRequestId: null,
      error: errorMessage
    };
  }).addCase(addList, function (state, _ref4) {
    var url = _ref4.payload;
    if (!state.byUrl[url]) {
      state.byUrl[url] = NEW_LIST_STATE;
    }
  }).addCase(removeList, function (state, _ref5) {
    var url = _ref5.payload;
    if (state.byUrl[url]) {
      delete state.byUrl[url];
    }
  }).addCase(acceptListUpdate, function (state, _ref6) {
    var _state$byUrl$url6;
    var url = _ref6.payload;
    if (!((_state$byUrl$url6 = state.byUrl[url]) !== null && _state$byUrl$url6 !== void 0 && _state$byUrl$url6.pendingUpdate)) {
      throw new Error("accept list update called without pending update");
    }
    state.byUrl[url] = _objectSpread(_objectSpread({}, state.byUrl[url]), {}, {
      current: state.byUrl[url].pendingUpdate,
      pendingUpdate: null
    });
  }).addCase(updateVersion, function (state) {
    // state loaded from localStorage, but new lists have never been initialized
    if (!state.lastInitializedDefaultListOfLists) {
      state.byUrl = initialState.byUrl;
    } else if (state.lastInitializedDefaultListOfLists) {
      var lastInitializedSet = state.lastInitializedDefaultListOfLists.reduce(function (s, l) {
        return s.add(l);
      }, new Set());
      var newListOfListsSet = DEFAULT_LIST_OF_LISTS.reduce(function (s, l) {
        return s.add(l);
      }, new Set());
      DEFAULT_LIST_OF_LISTS.forEach(function (listUrl) {
        if (!lastInitializedSet.has(listUrl)) {
          state.byUrl[listUrl] = NEW_LIST_STATE;
        }
      });
      state.lastInitializedDefaultListOfLists.forEach(function (listUrl) {
        if (!newListOfListsSet.has(listUrl)) {
          delete state.byUrl[listUrl];
        }
      });
    }
    state.lastInitializedDefaultListOfLists = DEFAULT_LIST_OF_LISTS;
  });
});

export { NEW_LIST_STATE, lists as default, initialState };
