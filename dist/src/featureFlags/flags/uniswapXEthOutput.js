import { BaseVariant, useBaseFlag, FeatureFlag } from '../index.js';

function useUniswapXEthOutputFlag() {
  return useBaseFlag(FeatureFlag.uniswapXEthOutputEnabled);
}
function useUniswapXEthOutputEnabled() {
  return useUniswapXEthOutputFlag() === BaseVariant.Enabled;
}

export { useUniswapXEthOutputEnabled, useUniswapXEthOutputFlag };
