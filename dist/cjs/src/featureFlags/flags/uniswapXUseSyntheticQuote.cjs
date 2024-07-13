'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../index.cjs');

function useUniswapXSyntheticQuoteFlag() {
  return index.useBaseFlag(index.FeatureFlag.uniswapXSyntheticQuote);
}
function useUniswapXSyntheticQuoteEnabled() {
  return useUniswapXSyntheticQuoteFlag() === index.BaseVariant.Enabled;
}

exports.useUniswapXSyntheticQuoteEnabled = useUniswapXSyntheticQuoteEnabled;
exports.useUniswapXSyntheticQuoteFlag = useUniswapXSyntheticQuoteFlag;
