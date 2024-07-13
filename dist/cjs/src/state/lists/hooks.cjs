'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var utils = require('../../lib/hooks/useTokenList/utils.cjs');
var React = require('react');
var hooks = require('../hooks.cjs');
var listSort = require('../../utils/listSort.cjs');
var broken_tokenlist = require('../../constants/tokenLists/broken.tokenlist.cjs');
var lists = require('../../constants/lists.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function useAllLists() {
  return hooks.useAppSelector(function (state) {
    return state.lists.byUrl;
  });
}

/**
 * Combine the tokens in map2 with the tokens on map1, where tokens on map1 take precedence
 * @param map1 the base token map
 * @param map2 the map of additioanl tokens to add to the base map
 */
function combineMaps(map1, map2) {
  var chainIds = Object.keys(Object.keys(map1).concat(Object.keys(map2)).reduce(function (memo, value) {
    memo[value] = true;
    return memo;
  }, {})).map(function (id) {
    return parseInt(id);
  });
  return chainIds.reduce(function (memo, chainId) {
    memo[chainId] = _objectSpread(_objectSpread({}, map2[chainId]), map1[chainId]);
    return memo;
  }, {});
}

// merge tokens contained within lists from urls
function useCombinedTokenMapFromUrls(urls) {
  var lists = useAllLists();
  return React.useMemo(function () {
    if (!urls) return {};
    return urls.slice()
    // sort by priority so top priority goes last
    .sort(listSort).reduce(function (allTokens, currentUrl) {
      var _lists$currentUrl;
      var current = (_lists$currentUrl = lists[currentUrl]) === null || _lists$currentUrl === void 0 ? void 0 : _lists$currentUrl.current;
      if (!current) return allTokens;
      try {
        return combineMaps(allTokens, utils.tokensToChainTokenMap(current));
      } catch (error) {
        console.error("Could not show token list due to error", error);
        return allTokens;
      }
    }, {});
  }, [lists, urls]);
}

// get all the tokens from active lists, combine with local default tokens
function useCombinedActiveList() {
  var activeTokens = useCombinedTokenMapFromUrls(lists.DEFAULT_ACTIVE_LIST_URLS);
  return activeTokens;
}

// list of tokens not supported on interface for various reasons, used to show warnings and prevent swaps and adds
function useUnsupportedTokenList() {
  // get hard-coded broken tokens
  var brokenListMap = React.useMemo(function () {
    return utils.tokensToChainTokenMap(broken_tokenlist["default"]);
  }, []);

  // get dynamic list of unsupported tokens
  var loadedUnsupportedListMap = useCombinedTokenMapFromUrls(lists.UNSUPPORTED_LIST_URLS);

  // format into one token address map
  return React.useMemo(function () {
    return combineMaps(brokenListMap, loadedUnsupportedListMap);
  }, [brokenListMap, loadedUnsupportedListMap]);
}

exports.useAllLists = useAllLists;
exports.useCombinedActiveList = useCombinedActiveList;
exports.useCombinedTokenMapFromUrls = useCombinedTokenMapFromUrls;
exports.useUnsupportedTokenList = useUnsupportedTokenList;
