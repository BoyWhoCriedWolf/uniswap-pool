'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var sdkCore = require('@uniswap/sdk-core');
var v3Sdk = require('@uniswap/v3-sdk');
var JSBI = require('jsbi');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

function tryParsePrice(baseToken, quoteToken, value) {
  var _fraction$length;
  if (!baseToken || !quoteToken || !value) {
    return undefined;
  }
  if (!value.match(/^\d*\.?\d+$/)) {
    return undefined;
  }
  var _value$split = value.split("."),
    _value$split2 = _slicedToArray__default["default"](_value$split, 2),
    whole = _value$split2[0],
    fraction = _value$split2[1];
  var decimals = (_fraction$length = fraction === null || fraction === void 0 ? void 0 : fraction.length) !== null && _fraction$length !== void 0 ? _fraction$length : 0;
  var withoutDecimals = JSBI__default["default"].BigInt((whole !== null && whole !== void 0 ? whole : "") + (fraction !== null && fraction !== void 0 ? fraction : ""));
  return new sdkCore.Price(baseToken, quoteToken, JSBI__default["default"].multiply(JSBI__default["default"].BigInt(Math.pow(10, decimals)), JSBI__default["default"].BigInt(Math.pow(10, baseToken.decimals))), JSBI__default["default"].multiply(withoutDecimals, JSBI__default["default"].BigInt(Math.pow(10, quoteToken.decimals))));
}
function tryParseTick(baseToken, quoteToken, feeAmount, value) {
  if (!baseToken || !quoteToken || !feeAmount || !value) {
    return undefined;
  }
  var price = tryParsePrice(baseToken, quoteToken, value);
  if (!price) {
    return undefined;
  }
  var tick;

  // check price is within min/max bounds, if outside return min/max
  var sqrtRatioX96 = v3Sdk.encodeSqrtRatioX96(price.numerator, price.denominator);
  if (JSBI__default["default"].greaterThanOrEqual(sqrtRatioX96, v3Sdk.TickMath.MAX_SQRT_RATIO)) {
    tick = v3Sdk.TickMath.MAX_TICK;
  } else if (JSBI__default["default"].lessThanOrEqual(sqrtRatioX96, v3Sdk.TickMath.MIN_SQRT_RATIO)) {
    tick = v3Sdk.TickMath.MIN_TICK;
  } else {
    // this function is agnostic to the base, will always return the correct tick
    tick = v3Sdk.priceToClosestTick(price);
  }
  return v3Sdk.nearestUsableTick(tick, v3Sdk.TICK_SPACINGS[feeAmount]);
}

exports.tryParsePrice = tryParsePrice;
exports.tryParseTick = tryParseTick;
