import { Percent } from '@uniswap/sdk-core';

var PRECISION = 10000;
function computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput) {
  if (!fiatValueOutput || !fiatValueInput) return undefined;
  if (fiatValueInput === 0) return undefined;
  var ratio = 1 - fiatValueOutput / fiatValueInput;
  var numerator = Math.floor(ratio * PRECISION);
  return new Percent(numerator, PRECISION);
}

export { computeFiatValuePriceImpact };
