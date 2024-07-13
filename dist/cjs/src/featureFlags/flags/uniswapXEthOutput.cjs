'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../index.cjs');

function useUniswapXEthOutputFlag() {
  return index.useBaseFlag(index.FeatureFlag.uniswapXEthOutputEnabled);
}
function useUniswapXEthOutputEnabled() {
  return useUniswapXEthOutputFlag() === index.BaseVariant.Enabled;
}

exports.useUniswapXEthOutputEnabled = useUniswapXEthOutputEnabled;
exports.useUniswapXEthOutputFlag = useUniswapXEthOutputFlag;
