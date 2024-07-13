'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../index.cjs');

function useFotAdjustmentsFlag() {
  return index.useBaseFlag(index.FeatureFlag.fotAdjustedmentsEnabled);
}
function useFotAdjustmentsEnabled() {
  return useFotAdjustmentsFlag() === index.BaseVariant.Enabled;
}

exports.useFotAdjustmentsEnabled = useFotAdjustmentsEnabled;
exports.useFotAdjustmentsFlag = useFotAdjustmentsFlag;
