import React__default, { createContext, useContext } from 'react';
import { atomWithStorage, useAtomValue } from 'jotai/utils';
import { useGate } from 'statsig-react';

/**
 * The value here must match the value in the statsig dashboard, if you plan to use statsig.
 */
let FeatureFlag = /*#__PURE__*/function (FeatureFlag) {
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
const FeatureFlagContext = /*#__PURE__*/createContext({
  isLoaded: false,
  flags: {}
});
function useFeatureFlagsContext() {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw Error("Feature flag hooks can only be used by children of FeatureFlagProvider.");
  } else {
    return context;
  }
}

/* update and save feature flag settings */
const featureFlagSettings = atomWithStorage("featureFlags", {});
function FeatureFlagsProvider(_ref) {
  let {
    children
  } = _ref;
  // TODO: `isLoaded` to `true` so `App.tsx` will render. Later, this will be dependent on
  // flags loading from Amplitude, with a timeout.
  const featureFlags = useAtomValue(featureFlagSettings);
  const value = {
    isLoaded: true,
    flags: featureFlags
  };
  return /*#__PURE__*/React__default.createElement(FeatureFlagContext.Provider, {
    value: value
  }, children);
}
function useFeatureFlagsIsLoaded() {
  return useFeatureFlagsContext().isLoaded;
}
let BaseVariant = /*#__PURE__*/function (BaseVariant) {
  BaseVariant["Control"] = "control";
  BaseVariant["Enabled"] = "enabled";
  return BaseVariant;
}({});
function useBaseFlag(flag) {
  let defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : BaseVariant.Control;
  const {
    value: statsigValue
  } = useGate(flag); // non-existent gates return false
  const featureFlagsContext = useFeatureFlagsContext();
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

export { BaseVariant, FeatureFlag, FeatureFlagsProvider, featureFlagSettings, useBaseFlag, useFeatureFlagsIsLoaded };
