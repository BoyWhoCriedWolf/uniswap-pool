'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sdkCore = require('@uniswap/sdk-core');

var PRECISION = 10000;
function computeFiatValuePriceImpact(fiatValueInput, fiatValueOutput) {
  if (!fiatValueOutput || !fiatValueInput) return undefined;
  if (fiatValueInput === 0) return undefined;
  var ratio = 1 - fiatValueOutput / fiatValueInput;
  var numerator = Math.floor(ratio * PRECISION);
  return new sdkCore.Percent(numerator, PRECISION);
}

exports.computeFiatValuePriceImpact = computeFiatValuePriceImpact;
