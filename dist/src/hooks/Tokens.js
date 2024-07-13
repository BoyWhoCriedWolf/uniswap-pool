import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { ChainId, Token } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { getChainInfo } from '../constants/chainInfo.js';
import { DEFAULT_LIST_OF_LISTS, DEFAULT_INACTIVE_LIST_URLS } from '../constants/lists.js';
import { useTokenFromMapOrNetwork, useCurrencyFromMap } from '../lib/hooks/useCurrency.js';
import { getTokenFilter } from '../lib/hooks/useTokenList/filtering.js';
import { useMemo } from 'react';
import { useAppSelector } from '../state/hooks.js';
import { useUserAddedTokens } from '../state/user/useUserAddedTokens.js';
import { isL2ChainId } from '../utils/chains.js';
import { useCombinedTokenMapFromUrls, useCombinedActiveList, useAllLists, useUnsupportedTokenList } from '../state/lists/hooks.js';
import { WrappedTokenInfo } from '../state/lists/wrappedTokenInfo.js';
import { deserializeToken } from '../state/user/deserializeToken.js';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// reduce token map into standard address <-> Token mapping, optionally include user added tokens
function useTokensFromMap(tokenMap, chainId) {
  return useMemo(function () {
    var _tokenMap$chainId;
    if (!chainId) return {};

    // reduce to just tokens
    return Object.keys((_tokenMap$chainId = tokenMap[chainId]) !== null && _tokenMap$chainId !== void 0 ? _tokenMap$chainId : {}).reduce(function (newMap, address) {
      newMap[address] = tokenMap[chainId][address].token;
      return newMap;
    }, {});
  }, [chainId, tokenMap]);
}

// TODO(WEB-2347): after disallowing unchecked index access, refactor ChainTokenMap to not use ?'s

/** Returns tokens from all token lists on all chains, combined with user added tokens */
function useAllTokensMultichain() {
  var allTokensFromLists = useCombinedTokenMapFromUrls(DEFAULT_LIST_OF_LISTS);
  var userAddedTokensMap = useAppSelector(function (_ref) {
    var tokens = _ref.user.tokens;
    return tokens;
  });
  return useMemo(function () {
    var chainTokenMap = {};
    if (userAddedTokensMap) {
      Object.keys(userAddedTokensMap).forEach(function (key) {
        var chainId = Number(key);
        var tokenMap = {};
        Object.values(userAddedTokensMap[chainId]).forEach(function (serializedToken) {
          tokenMap[serializedToken.address] = deserializeToken(serializedToken);
        });
        chainTokenMap[chainId] = tokenMap;
      });
    }
    Object.keys(allTokensFromLists).forEach(function (key) {
      var _chainTokenMap$chainI;
      var chainId = Number(key);
      var tokenMap = (_chainTokenMap$chainI = chainTokenMap[chainId]) !== null && _chainTokenMap$chainI !== void 0 ? _chainTokenMap$chainI : {};
      Object.values(allTokensFromLists[chainId]).forEach(function (_ref2) {
        var token = _ref2.token;
        tokenMap[token.address] = token;
      });
      chainTokenMap[chainId] = tokenMap;
    });
    return chainTokenMap;
  }, [allTokensFromLists, userAddedTokensMap]);
}

/** Returns all tokens from the default list + user added tokens */
function useDefaultActiveTokens(chainId) {
  var defaultListTokens = useCombinedActiveList();
  var tokensFromMap = useTokensFromMap(defaultListTokens, chainId);
  var userAddedTokens = useUserAddedTokens();
  return useMemo(function () {
    return userAddedTokens
    // reduce into all ALL_TOKENS filtered by the current chain
    .reduce(function (tokenMap, token) {
      tokenMap[token.address] = token;
      return tokenMap;
    }, // must make a copy because reduce modifies the map, and we do not
    // want to make a copy in every iteration
    _objectSpread({}, tokensFromMap));
  }, [tokensFromMap, userAddedTokens]);
}
function useUnsupportedTokens() {
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var listsByUrl = useAllLists();
  var unsupportedTokensMap = useUnsupportedTokenList();
  var unsupportedTokens = useTokensFromMap(unsupportedTokensMap, chainId);

  // checks the default L2 lists to see if `bridgeInfo` has an L1 address value that is unsupported
  var l2InferredBlockedTokens = useMemo(function () {
    var _listsByUrl$listUrl;
    if (!chainId || !isL2ChainId(chainId)) {
      return {};
    }
    if (!listsByUrl) {
      return {};
    }
    var listUrl = getChainInfo(chainId).defaultListUrl;
    var list = (_listsByUrl$listUrl = listsByUrl[listUrl]) === null || _listsByUrl$listUrl === void 0 ? void 0 : _listsByUrl$listUrl.current;
    if (!list) {
      return {};
    }
    var unsupportedSet = new Set(Object.keys(unsupportedTokens));
    return list.tokens.reduce(function (acc, tokenInfo) {
      var _tokenInfo$extensions;
      var bridgeInfo = (_tokenInfo$extensions = tokenInfo.extensions) === null || _tokenInfo$extensions === void 0 ? void 0 : _tokenInfo$extensions.bridgeInfo;
      if (bridgeInfo && bridgeInfo[ChainId.MAINNET] && bridgeInfo[ChainId.MAINNET].tokenAddress && unsupportedSet.has(bridgeInfo[ChainId.MAINNET].tokenAddress)) {
        var _address = bridgeInfo[ChainId.MAINNET].tokenAddress;
        // don't rely on decimals--it's possible that a token could be bridged w/ different decimals on the L2
        return _objectSpread(_objectSpread({}, acc), {}, _defineProperty({}, _address, new Token(ChainId.MAINNET, _address, tokenInfo.decimals)));
      }
      return acc;
    }, {});
  }, [chainId, listsByUrl, unsupportedTokens]);
  return _objectSpread(_objectSpread({}, unsupportedTokens), l2InferredBlockedTokens);
}
function useSearchInactiveTokenLists(search) {
  var minResults = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
  var lists = useAllLists();
  var inactiveUrls = DEFAULT_INACTIVE_LIST_URLS;
  var _useWeb3React2 = useWeb3React(),
    chainId = _useWeb3React2.chainId;
  var activeTokens = useDefaultActiveTokens(chainId);
  return useMemo(function () {
    if (!search || search.trim().length === 0) return [];
    var tokenFilter = getTokenFilter(search);
    var result = [];
    var addressSet = {};
    var _iterator = _createForOfIteratorHelper(inactiveUrls),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _lists$url;
        var url = _step.value;
        var list = (_lists$url = lists[url]) === null || _lists$url === void 0 ? void 0 : _lists$url.current;
        if (!list) continue;
        var _iterator2 = _createForOfIteratorHelper(list.tokens),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var tokenInfo = _step2.value;
            if (tokenInfo.chainId === chainId && tokenFilter(tokenInfo)) {
              try {
                var wrapped = new WrappedTokenInfo(tokenInfo, list);
                if (!(wrapped.address in activeTokens) && !addressSet[wrapped.address]) {
                  addressSet[wrapped.address] = true;
                  result.push(wrapped);
                  if (result.length >= minResults) return result;
                }
              } catch (_unused) {
                continue;
              }
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return result;
  }, [activeTokens, chainId, inactiveUrls, lists, minResults, search]);
}

// Check if currency is included in custom list from user storage
function useIsUserAddedToken(currency) {
  var userAddedTokens = useUserAddedTokens();
  if (!currency) {
    return false;
  }
  return !!userAddedTokens.find(function (token) {
    return currency.equals(token);
  });
}

// undefined if invalid or does not exist
// null if loading or null was passed
// otherwise returns the token
function useToken(tokenAddress) {
  var _useWeb3React3 = useWeb3React(),
    chainId = _useWeb3React3.chainId;
  var tokens = useDefaultActiveTokens(chainId);
  return useTokenFromMapOrNetwork(tokens, tokenAddress);
}
function useCurrency(currencyId, chainId) {
  var _useWeb3React4 = useWeb3React(),
    connectedChainId = _useWeb3React4.chainId;
  var tokens = useDefaultActiveTokens(chainId !== null && chainId !== void 0 ? chainId : connectedChainId);
  return useCurrencyFromMap(tokens, chainId !== null && chainId !== void 0 ? chainId : connectedChainId, currencyId);
}

export { useAllTokensMultichain, useCurrency, useDefaultActiveTokens, useIsUserAddedToken, useSearchInactiveTokenLists, useToken, useUnsupportedTokens };
