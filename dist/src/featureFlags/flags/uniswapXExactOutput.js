import { BaseVariant, useBaseFlag, FeatureFlag } from '../index.js';

function useUniswapXExactOutputFlag() {
  return useBaseFlag(FeatureFlag.uniswapXExactOutputEnabled);
}
function useUniswapXExactOutputEnabled() {
  return useUniswapXExactOutputFlag() === BaseVariant.Enabled;
}

export { useUniswapXExactOutputEnabled, useUniswapXExactOutputFlag };
