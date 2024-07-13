'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var wrappedTokenInfo = require('../../../state/lists/wrappedTokenInfo.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

// TODO(WEB-2347): replace usage of the misnomered TokenAddressMap w/ ChainTokenMap from src/hooks/Tokens.ts

var mapCache = typeof WeakMap !== "undefined" ? new WeakMap() : null;
function tokensToChainTokenMap(tokens) {
  var cached = mapCache === null || mapCache === void 0 ? void 0 : mapCache.get(tokens);
  if (cached) return cached;
  var _ref = Array.isArray(tokens) ? [undefined, tokens] : [tokens, tokens.tokens],
    _ref2 = _slicedToArray__default["default"](_ref, 2),
    list = _ref2[0],
    infos = _ref2[1];
  var map = infos.reduce(function (map, info) {
    try {
      var _map$token$chainId;
      var token = new wrappedTokenInfo.WrappedTokenInfo(info, list);
      if (((_map$token$chainId = map[token.chainId]) === null || _map$token$chainId === void 0 ? void 0 : _map$token$chainId[token.address]) !== undefined) {
        console.warn("Duplicate token skipped: ".concat(token.address));
        return map;
      }
      if (!map[token.chainId]) {
        map[token.chainId] = {};
      }
      map[token.chainId][token.address] = {
        token: token,
        list: list
      };
      return map;
    } catch (_unused) {
      return map;
    }
  }, {});
  mapCache === null || mapCache === void 0 || mapCache.set(tokens, map);
  return map;
}

exports.tokensToChainTokenMap = tokensToChainTokenMap;
