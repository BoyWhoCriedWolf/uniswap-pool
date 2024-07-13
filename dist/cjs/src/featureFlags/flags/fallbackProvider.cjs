'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../index.cjs');

function useFallbackProviderEnabledFlag() {
  return index.useBaseFlag(index.FeatureFlag.fallbackProvider);
}
function useFallbackProviderEnabled() {
  return useFallbackProviderEnabledFlag() === index.BaseVariant.Enabled;
}

exports.useFallbackProviderEnabled = useFallbackProviderEnabled;
exports.useFallbackProviderEnabledFlag = useFallbackProviderEnabledFlag;
