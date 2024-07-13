import { BaseVariant, useBaseFlag, FeatureFlag } from '../index.js';

function useFotAdjustmentsFlag() {
  return useBaseFlag(FeatureFlag.fotAdjustedmentsEnabled);
}
function useFotAdjustmentsEnabled() {
  return useFotAdjustmentsFlag() === BaseVariant.Enabled;
}

export { useFotAdjustmentsEnabled, useFotAdjustmentsFlag };
