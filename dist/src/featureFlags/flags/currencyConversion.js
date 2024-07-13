import { BaseVariant, useBaseFlag, FeatureFlag } from '../index.js';

function useCurrencyConversionFlag() {
  return useBaseFlag(FeatureFlag.currencyConversion);
}
function useCurrencyConversionFlagEnabled() {
  return useCurrencyConversionFlag() === BaseVariant.Enabled;
}

export { useCurrencyConversionFlag, useCurrencyConversionFlagEnabled };
