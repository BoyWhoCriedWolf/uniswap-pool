'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../index.cjs');

function useQuickRouteMainnetFlag() {
  return index.useBaseFlag(index.FeatureFlag.quickRouteMainnet);
}
function useQuickRouteMainnetEnabled() {
  return useQuickRouteMainnetFlag() === index.BaseVariant.Enabled;
}

exports.useQuickRouteMainnetEnabled = useQuickRouteMainnetEnabled;
exports.useQuickRouteMainnetFlag = useQuickRouteMainnetFlag;
