'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../index.cjs');

function useUniswapXExactOutputFlag() {
  return index.useBaseFlag(index.FeatureFlag.uniswapXExactOutputEnabled);
}
function useUniswapXExactOutputEnabled() {
  return useUniswapXExactOutputFlag() === index.BaseVariant.Enabled;
}

exports.useUniswapXExactOutputEnabled = useUniswapXExactOutputEnabled;
exports.useUniswapXExactOutputFlag = useUniswapXExactOutputFlag;
