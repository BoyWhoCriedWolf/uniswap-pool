import { BaseVariant, useBaseFlag, FeatureFlag } from '../index.js';

function useFallbackProviderEnabledFlag() {
  return useBaseFlag(FeatureFlag.fallbackProvider);
}
function useFallbackProviderEnabled() {
  return useFallbackProviderEnabledFlag() === BaseVariant.Enabled;
}

export { useFallbackProviderEnabled, useFallbackProviderEnabledFlag };
