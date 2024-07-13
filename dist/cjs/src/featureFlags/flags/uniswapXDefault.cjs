'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../index.cjs');

function useUniswapXDefaultEnabledFlag() {
  return index.useBaseFlag(index.FeatureFlag.uniswapXDefaultEnabled);
}
function useUniswapXDefaultEnabled() {
  return useUniswapXDefaultEnabledFlag() === index.BaseVariant.Enabled;
}

exports.useUniswapXDefaultEnabled = useUniswapXDefaultEnabled;
exports.useUniswapXDefaultEnabledFlag = useUniswapXDefaultEnabledFlag;
