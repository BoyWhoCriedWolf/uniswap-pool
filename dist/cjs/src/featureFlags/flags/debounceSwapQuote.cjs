'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../index.cjs');

function useDebounceSwapQuoteFlag() {
  return index.useBaseFlag(index.FeatureFlag.debounceSwapQuote);
}

exports.DebounceSwapQuoteVariant = index.BaseVariant;
exports.useDebounceSwapQuoteFlag = useDebounceSwapQuoteFlag;
