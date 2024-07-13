'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var v3Sdk = require('@uniswap/v3-sdk');
var usePools = require('./usePools.cjs');
var Tokens = require('./Tokens.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function useDerivedPositionInfo(positionDetails) {
  var currency0 = Tokens.useCurrency(positionDetails === null || positionDetails === void 0 ? void 0 : positionDetails.token0);
  var currency1 = Tokens.useCurrency(positionDetails === null || positionDetails === void 0 ? void 0 : positionDetails.token1);

  // construct pool data
  var _usePool = usePools.usePool(currency0 !== null && currency0 !== void 0 ? currency0 : undefined, currency1 !== null && currency1 !== void 0 ? currency1 : undefined, positionDetails === null || positionDetails === void 0 ? void 0 : positionDetails.fee),
    _usePool2 = _slicedToArray__default["default"](_usePool, 2),
    pool = _usePool2[1];
  var position = undefined;
  if (pool && positionDetails) {
    position = new v3Sdk.Position({
      pool: pool,
      liquidity: positionDetails.liquidity.toString(),
      tickLower: positionDetails.tickLower,
      tickUpper: positionDetails.tickUpper
    });
  }
  return {
    position: position,
    pool: pool !== null && pool !== void 0 ? pool : undefined
  };
}

exports.useDerivedPositionInfo = useDerivedPositionInfo;
