import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { Price } from '@uniswap/sdk-core';
import { encodeSqrtRatioX96, TickMath, priceToClosestTick, nearestUsableTick, TICK_SPACINGS } from '@uniswap/v3-sdk';
import JSBI from 'jsbi';

function tryParsePrice(baseToken, quoteToken, value) {
  var _fraction$length;
  if (!baseToken || !quoteToken || !value) {
    return undefined;
  }
  if (!value.match(/^\d*\.?\d+$/)) {
    return undefined;
  }
  var _value$split = value.split("."),
    _value$split2 = _slicedToArray(_value$split, 2),
    whole = _value$split2[0],
    fraction = _value$split2[1];
  var decimals = (_fraction$length = fraction === null || fraction === void 0 ? void 0 : fraction.length) !== null && _fraction$length !== void 0 ? _fraction$length : 0;
  var withoutDecimals = JSBI.BigInt((whole !== null && whole !== void 0 ? whole : "") + (fraction !== null && fraction !== void 0 ? fraction : ""));
  return new Price(baseToken, quoteToken, JSBI.multiply(JSBI.BigInt(Math.pow(10, decimals)), JSBI.BigInt(Math.pow(10, baseToken.decimals))), JSBI.multiply(withoutDecimals, JSBI.BigInt(Math.pow(10, quoteToken.decimals))));
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
  var sqrtRatioX96 = encodeSqrtRatioX96(price.numerator, price.denominator);
  if (JSBI.greaterThanOrEqual(sqrtRatioX96, TickMath.MAX_SQRT_RATIO)) {
    tick = TickMath.MAX_TICK;
  } else if (JSBI.lessThanOrEqual(sqrtRatioX96, TickMath.MIN_SQRT_RATIO)) {
    tick = TickMath.MIN_TICK;
  } else {
    // this function is agnostic to the base, will always return the correct tick
    tick = priceToClosestTick(price);
  }
  return nearestUsableTick(tick, TICK_SPACINGS[feeAmount]);
}

export { tryParsePrice, tryParseTick };
