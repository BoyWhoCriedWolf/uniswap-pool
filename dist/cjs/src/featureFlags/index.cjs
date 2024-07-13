'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('@babel/runtime/helpers/defineProperty');
var utils = require('jotai/utils');
var statsigReact = require('statsig-react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

/**
 * The value here must match the value in the statsig dashboard, if you plan to use statsig.
 */
var FeatureFlag = /*#__PURE__*/function (FeatureFlag) {
  FeatureFlag["traceJsonRpc"] = "traceJsonRpc";
  FeatureFlag["debounceSwapQuote"] = "debounce_swap_quote";
  FeatureFlag["fallbackProvider"] = "fallback_provider";
  FeatureFlag["uniswapXSyntheticQuote"] = "uniswapx_synthetic_quote";
  FeatureFlag["uniswapXEthOutputEnabled"] = "uniswapx_eth_output_enabled";
  FeatureFlag["uniswapXExactOutputEnabled"] = "uniswapx_exact_output_enabled";
  FeatureFlag["multichainUX"] = "multichain_ux";
  FeatureFlag["currencyConversion"] = "currency_conversion";
  FeatureFlag["fotAdjustedmentsEnabled"] = "fot_dynamic_adjustments_enabled";
  FeatureFlag["infoExplore"] = "info_explore";
  FeatureFlag["infoTDP"] = "info_tdp";
  FeatureFlag["infoPoolPage"] = "info_pool_page";
  FeatureFlag["infoLiveViews"] = "info_live_views";
  FeatureFlag["uniswapXDefaultEnabled"] = "uniswapx_default_enabled";
  FeatureFlag["quickRouteMainnet"] = "enable_quick_route_mainnet";
  return FeatureFlag;
}({});
var FeatureFlagContext = /*#__PURE__*/React.createContext({
  isLoaded: false,
  flags: {}
});
function useFeatureFlagsContext() {
  var context = React.useContext(FeatureFlagContext);
  if (!context) {
    throw Error("Feature flag hooks can only be used by children of FeatureFlagProvider.");
  } else {
    return context;
  }
}

/* update and save feature flag settings */
var featureFlagSettings = utils.atomWithStorage("featureFlags", {});
function FeatureFlagsProvider(_ref) {
  var children = _ref.children;
  // TODO: `isLoaded` to `true` so `App.tsx` will render. Later, this will be dependent on
  // flags loading from Amplitude, with a timeout.
  var featureFlags = utils.useAtomValue(featureFlagSettings);
  var value = {
    isLoaded: true,
    flags: featureFlags
  };
  return /*#__PURE__*/React__default["default"].createElement(FeatureFlagContext.Provider, {
    value: value
  }, children);
}
function useFeatureFlagsIsLoaded() {
  return useFeatureFlagsContext().isLoaded;
}
var BaseVariant = /*#__PURE__*/function (BaseVariant) {
  BaseVariant["Control"] = "control";
  BaseVariant["Enabled"] = "enabled";
  return BaseVariant;
}({});
function useBaseFlag(flag) {
  var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : BaseVariant.Control;
  var _useGate = statsigReact.useGate(flag),
    statsigValue = _useGate.value; // non-existent gates return false
  var featureFlagsContext = useFeatureFlagsContext();
  if (statsigValue) {
    return BaseVariant.Enabled;
  }
  switch (featureFlagsContext.flags[flag]) {
    case "enabled":
      return BaseVariant.Enabled;
    case "control":
      return BaseVariant.Control;
    default:
      return defaultValue;
  }
}

exports.BaseVariant = BaseVariant;
exports.FeatureFlag = FeatureFlag;
exports.FeatureFlagsProvider = FeatureFlagsProvider;
exports.featureFlagSettings = featureFlagSettings;
exports.useBaseFlag = useBaseFlag;
exports.useFeatureFlagsIsLoaded = useFeatureFlagsIsLoaded;
