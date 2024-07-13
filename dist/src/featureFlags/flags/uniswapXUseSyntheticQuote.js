import { BaseVariant, useBaseFlag, FeatureFlag } from '../index.js';

function useUniswapXSyntheticQuoteFlag() {
  return useBaseFlag(FeatureFlag.uniswapXSyntheticQuote);
}
function useUniswapXSyntheticQuoteEnabled() {
  return useUniswapXSyntheticQuoteFlag() === BaseVariant.Enabled;
}

export { useUniswapXSyntheticQuoteEnabled, useUniswapXSyntheticQuoteFlag };
