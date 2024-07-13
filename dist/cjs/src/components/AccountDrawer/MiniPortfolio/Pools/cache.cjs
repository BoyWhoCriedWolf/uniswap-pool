'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var Tokens = require('../../../../hooks/Tokens.cjs');
var jotai = require('jotai');
var utils = require('jotai/utils');
var ms = require('ms');
var React = require('react');
var deserializeToken = require('../../../../state/user/deserializeToken.cjs');
var hooks$1 = require('../../../../state/user/hooks.cjs');
var currencyKey = require('../../../../utils/currencyKey.cjs');
var getTokensAsync = require('./getTokensAsync.cjs');
var hooks = require('./hooks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var POSITION_CACHE_EXPIRY = ms__default["default"]("1m"); // 1 minute is arbitrary here
// Allows reusing recently fetched positions between component mounts
var cachedPositionsAtom = jotai.atom({});
/**
 * Caches positions to allow reusing between component mounts
 * @param account address to cache positions for
 * @returns cached positions for the account, whether the cache is stale, and a function to update the positions and cache
 */
function useCachedPositions(account) {
  var _useAtom = jotai.useAtom(cachedPositionsAtom),
    _useAtom2 = _slicedToArray__default["default"](_useAtom, 2),
    cachedPositions = _useAtom2[0],
    setCachedPositions = _useAtom2[1];
  var setPositionsAndStaleTimeout = React.useCallback(function (positions) {
    setCachedPositions(function (cache) {
      return _objectSpread(_objectSpread({}, cache), {}, _defineProperty__default["default"]({}, account, {
        result: positions,
        stale: false
      }));
    });
    setTimeout(function () {
      return setCachedPositions(function (cache) {
        var _cache$account;
        // sets stale to true if the positions haven't been updated since the timeout
        if (positions === ((_cache$account = cache[account]) === null || _cache$account === void 0 ? void 0 : _cache$account.result)) {
          return _objectSpread(_objectSpread({}, cache), {}, _defineProperty__default["default"]({}, account, {
            result: positions,
            stale: true
          }));
        } else {
          return cache;
        }
      });
    }, POSITION_CACHE_EXPIRY);
  }, [account, setCachedPositions]);
  return [cachedPositions[account], setPositionsAndStaleTimeout];
}
var poolAddressKey = function poolAddressKey(details, chainId) {
  return "".concat(chainId, "-").concat(details.token0, "-").concat(details.token1, "-").concat(details.fee);
};
var poolAddressCacheAtom = utils.atomWithStorage("poolCache", {});
/**
 * Caches pool addresses to prevent components from having to re-compute them
 * @returns get and set functions for the cache
 */
function usePoolAddressCache() {
  var _useAtom3 = jotai.useAtom(poolAddressCacheAtom),
    _useAtom4 = _slicedToArray__default["default"](_useAtom3, 2),
    cache = _useAtom4[0],
    updateCache = _useAtom4[1];
  var get = React.useCallback(function (details, chainId) {
    return cache[poolAddressKey(details, chainId)];
  }, [cache]);
  var set = React.useCallback(function (details, chainId, address) {
    return updateCache(function (c) {
      return _objectSpread(_objectSpread({}, c), {}, _defineProperty__default["default"]({}, poolAddressKey(details, chainId), address));
    });
  }, [updateCache]);
  return {
    get: get,
    set: set
  };
}

// These values are static, so we can persist them across sessions using `WithStorage`
var tokenCacheAtom = utils.atomWithStorage("cachedAsyncTokens", {});
function useTokenCache() {
  var _useAtom5 = jotai.useAtom(tokenCacheAtom),
    _useAtom6 = _slicedToArray__default["default"](_useAtom5, 2),
    cache = _useAtom6[0],
    setCache = _useAtom6[1];
  var get = React.useCallback(function (chainId, address) {
    var entry = cache[currencyKey.buildCurrencyKey(chainId, address)];
    return entry ? deserializeToken.deserializeToken(entry) : undefined;
  }, [cache]);
  var set = React.useCallback(function (token) {
    if (token) {
      setCache(function (cache) {
        return _objectSpread(_objectSpread({}, cache), {}, _defineProperty__default["default"]({}, currencyKey.currencyKey(token), hooks$1.serializeToken(token)));
      });
    }
  }, [setCache]);
  return {
    get: get,
    set: set
  };
}
function useGetCachedTokens(chains) {
  var allTokens = Tokens.useAllTokensMultichain();
  var multicallContracts = hooks.useInterfaceMulticallContracts(chains);
  var tokenCache = useTokenCache();

  // Used to fetch tokens not available in local state
  var fetchRemoteTokens = React.useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(addresses, chainId) {
      var fetched;
      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getTokensAsync.getTokensAsync(addresses, chainId, multicallContracts[chainId]);
          case 2:
            fetched = _context.sent;
            Object.values(fetched).forEach(tokenCache.set);
            return _context.abrupt("return", fetched);
          case 5:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function (_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(), [multicallContracts, tokenCache]);

  // Uses tokens from local state if available, otherwise fetches them
  var getTokens = React.useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(addresses, chainId) {
      var local, missing, fetched;
      return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            local = {};
            missing = new Set();
            addresses.forEach(function (address) {
              var _tokenCache$get, _allTokens$chainId;
              var cached = (_tokenCache$get = tokenCache.get(chainId, address)) !== null && _tokenCache$get !== void 0 ? _tokenCache$get : (_allTokens$chainId = allTokens[chainId]) === null || _allTokens$chainId === void 0 ? void 0 : _allTokens$chainId[address];
              cached ? local[address] = cached : missing.add(address);
            });
            _context2.next = 5;
            return fetchRemoteTokens(_toConsumableArray__default["default"](missing), chainId);
          case 5:
            fetched = _context2.sent;
            return _context2.abrupt("return", _objectSpread(_objectSpread({}, local), fetched));
          case 7:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function (_x3, _x4) {
      return _ref2.apply(this, arguments);
    };
  }(), [allTokens, fetchRemoteTokens, tokenCache]);
  return getTokens;
}

exports.useCachedPositions = useCachedPositions;
exports.useGetCachedTokens = useGetCachedTokens;
exports.usePoolAddressCache = usePoolAddressCache;
