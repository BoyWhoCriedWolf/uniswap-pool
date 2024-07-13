import { BaseVariant, useBaseFlag, FeatureFlag } from '../index.js';

function useUniswapXDefaultEnabledFlag() {
  return useBaseFlag(FeatureFlag.uniswapXDefaultEnabled);
}
function useUniswapXDefaultEnabled() {
  return useUniswapXDefaultEnabledFlag() === BaseVariant.Enabled;
}

export { useUniswapXDefaultEnabled, useUniswapXDefaultEnabledFlag };
