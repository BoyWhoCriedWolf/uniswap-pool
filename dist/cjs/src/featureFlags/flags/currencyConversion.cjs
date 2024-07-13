'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../index.cjs');

function useCurrencyConversionFlag() {
  return index.useBaseFlag(index.FeatureFlag.currencyConversion);
}
function useCurrencyConversionFlagEnabled() {
  return useCurrencyConversionFlag() === index.BaseVariant.Enabled;
}

exports.useCurrencyConversionFlag = useCurrencyConversionFlag;
exports.useCurrencyConversionFlagEnabled = useCurrencyConversionFlagEnabled;
