'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var core = require('@web3-react/core');
var tokens = require('../constants/tokens.cjs');
var debounceSwapQuote = require('../featureFlags/flags/debounceSwapQuote.cjs');
var React = require('react');
var types = require('../state/routing/types.cjs');
var usePreviewTrade = require('../state/routing/usePreviewTrade.cjs');
var useRoutingAPITrade = require('../state/routing/useRoutingAPITrade.cjs');
var hooks = require('../state/user/hooks.cjs');
var useAutoRouterSupported = require('./useAutoRouterSupported.cjs');
var useDebounce = require('./useDebounce.cjs');
var useIsWindowVisible = require('./useIsWindowVisible.cjs');
var index = require('../featureFlags/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

// Prevents excessive quote requests between keystrokes.
var DEBOUNCE_TIME = 350;
var DEBOUNCE_TIME_QUICKROUTE = 50;

// Temporary until we remove the feature flag.
var DEBOUNCE_TIME_INCREASED = 650;
/**
 * Returns the debounced v2+v3 trade for a desired swap.
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 * @param routerPreferenceOverride force useRoutingAPITrade to use a specific RouterPreference
 * @param account the connected address
 *
 */
function useDebouncedTrade(tradeType, amountSpecified, otherCurrency, routerPreferenceOverride, account, inputTax, outputTax) {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var autoRouterSupported = useAutoRouterSupported();
  var isWindowVisible = useIsWindowVisible();
  var inputs = React.useMemo(function () {
    return [amountSpecified, otherCurrency];
  }, [amountSpecified, otherCurrency]);
  var debouncedSwapQuoteFlagEnabled = debounceSwapQuote.useDebounceSwapQuoteFlag() === index.BaseVariant.Enabled;
  var isDebouncing = useDebounce(inputs, debouncedSwapQuoteFlagEnabled ? DEBOUNCE_TIME_INCREASED : DEBOUNCE_TIME) !== inputs;
  var isPreviewTradeDebouncing = useDebounce(inputs, DEBOUNCE_TIME_QUICKROUTE) !== inputs;
  var isWrap = React.useMemo(function () {
    if (!chainId || !amountSpecified || !otherCurrency) return false;
    var weth = tokens.WRAPPED_NATIVE_CURRENCY[chainId];
    return Boolean(amountSpecified.currency.isNative && (weth === null || weth === void 0 ? void 0 : weth.equals(otherCurrency)) || otherCurrency.isNative && (weth === null || weth === void 0 ? void 0 : weth.equals(amountSpecified.currency)));
  }, [amountSpecified, chainId, otherCurrency]);
  var _useRouterPreference = hooks.useRouterPreference(),
    _useRouterPreference2 = _slicedToArray__default["default"](_useRouterPreference, 1),
    routerPreference = _useRouterPreference2[0];
  var skipBothFetches = !autoRouterSupported || !isWindowVisible || isWrap;
  var skipRoutingFetch = skipBothFetches || isDebouncing;
  var skipPreviewTradeFetch = skipBothFetches || routerPreference === types.RouterPreference.CLIENT || isPreviewTradeDebouncing;
  var previewTradeResult = usePreviewTrade.usePreviewTrade(skipPreviewTradeFetch, tradeType, amountSpecified, otherCurrency, inputTax, outputTax);
  var routingApiTradeResult = useRoutingAPITrade.useRoutingAPITrade(skipRoutingFetch, tradeType, amountSpecified, otherCurrency, routerPreferenceOverride !== null && routerPreferenceOverride !== void 0 ? routerPreferenceOverride : routerPreference, account, inputTax, outputTax);
  return previewTradeResult.currentTrade && !routingApiTradeResult.currentTrade ? previewTradeResult : routingApiTradeResult;
}

exports.useDebouncedTrade = useDebouncedTrade;
