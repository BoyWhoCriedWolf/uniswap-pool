import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { useAllTokensMultichain } from '../../../../hooks/Tokens.js';
import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import ms from 'ms';
import { useCallback } from 'react';
import { deserializeToken } from '../../../../state/user/deserializeToken.js';
import { serializeToken } from '../../../../state/user/hooks.js';
import { buildCurrencyKey, currencyKey } from '../../../../utils/currencyKey.js';
import { getTokensAsync } from './getTokensAsync.js';
import { useInterfaceMulticallContracts } from './hooks.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var POSITION_CACHE_EXPIRY = ms("1m"); // 1 minute is arbitrary here
// Allows reusing recently fetched positions between component mounts
var cachedPositionsAtom = atom({});
/**
 * Caches positions to allow reusing between component mounts
 * @param account address to cache positions for
 * @returns cached positions for the account, whether the cache is stale, and a function to update the positions and cache
 */
function useCachedPositions(account) {
  var _useAtom = useAtom(cachedPositionsAtom),
    _useAtom2 = _slicedToArray(_useAtom, 2),
    cachedPositions = _useAtom2[0],
    setCachedPositions = _useAtom2[1];
  var setPositionsAndStaleTimeout = useCallback(function (positions) {
    setCachedPositions(function (cache) {
      return _objectSpread(_objectSpread({}, cache), {}, _defineProperty({}, account, {
        result: positions,
        stale: false
      }));
    });
    setTimeout(function () {
      return setCachedPositions(function (cache) {
        var _cache$account;
        // sets stale to true if the positions haven't been updated since the timeout
        if (positions === ((_cache$account = cache[account]) === null || _cache$account === void 0 ? void 0 : _cache$account.result)) {
          return _objectSpread(_objectSpread({}, cache), {}, _defineProperty({}, account, {
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
var poolAddressCacheAtom = atomWithStorage("poolCache", {});
/**
 * Caches pool addresses to prevent components from having to re-compute them
 * @returns get and set functions for the cache
 */
function usePoolAddressCache() {
  var _useAtom3 = useAtom(poolAddressCacheAtom),
    _useAtom4 = _slicedToArray(_useAtom3, 2),
    cache = _useAtom4[0],
    updateCache = _useAtom4[1];
  var get = useCallback(function (details, chainId) {
    return cache[poolAddressKey(details, chainId)];
  }, [cache]);
  var set = useCallback(function (details, chainId, address) {
    return updateCache(function (c) {
      return _objectSpread(_objectSpread({}, c), {}, _defineProperty({}, poolAddressKey(details, chainId), address));
    });
  }, [updateCache]);
  return {
    get: get,
    set: set
  };
}

// These values are static, so we can persist them across sessions using `WithStorage`
var tokenCacheAtom = atomWithStorage("cachedAsyncTokens", {});
function useTokenCache() {
  var _useAtom5 = useAtom(tokenCacheAtom),
    _useAtom6 = _slicedToArray(_useAtom5, 2),
    cache = _useAtom6[0],
    setCache = _useAtom6[1];
  var get = useCallback(function (chainId, address) {
    var entry = cache[buildCurrencyKey(chainId, address)];
    return entry ? deserializeToken(entry) : undefined;
  }, [cache]);
  var set = useCallback(function (token) {
    if (token) {
      setCache(function (cache) {
        return _objectSpread(_objectSpread({}, cache), {}, _defineProperty({}, currencyKey(token), serializeToken(token)));
      });
    }
  }, [setCache]);
  return {
    get: get,
    set: set
  };
}
function useGetCachedTokens(chains) {
  var allTokens = useAllTokensMultichain();
  var multicallContracts = useInterfaceMulticallContracts(chains);
  var tokenCache = useTokenCache();

  // Used to fetch tokens not available in local state
  var fetchRemoteTokens = useCallback( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(addresses, chainId) {
      var fetched;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return getTokensAsync(addresses, chainId, multicallContracts[chainId]);
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
  var getTokens = useCallback( /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(addresses, chainId) {
      var local, missing, fetched;
      return _regeneratorRuntime.wrap(function _callee2$(_context2) {
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
            return fetchRemoteTokens(_toConsumableArray(missing), chainId);
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

export { useCachedPositions, useGetCachedTokens, usePoolAddressCache };
