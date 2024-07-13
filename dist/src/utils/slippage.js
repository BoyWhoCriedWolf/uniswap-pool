import { Percent } from '@uniswap/sdk-core';

var PRECISION = 10000;
var DENOMINATOR = PRECISION * 100;

// turn "0.5" into Percent representing 0.5%
function toSlippagePercent(slippage) {
  var numerator = Number(slippage) * PRECISION;
  return new Percent(numerator, DENOMINATOR);
}

export { toSlippagePercent };
