import { BaseVariant, useBaseFlag, FeatureFlag } from '../index.js';

function useQuickRouteMainnetFlag() {
  return useBaseFlag(FeatureFlag.quickRouteMainnet);
}
function useQuickRouteMainnetEnabled() {
  return useQuickRouteMainnetFlag() === BaseVariant.Enabled;
}

export { useQuickRouteMainnetEnabled, useQuickRouteMainnetFlag };
