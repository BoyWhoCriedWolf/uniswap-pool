import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useWeb3React } from '@web3-react/core';
import { WRAPPED_NATIVE_CURRENCY } from '../constants/tokens.js';
import { useDebounceSwapQuoteFlag } from '../featureFlags/flags/debounceSwapQuote.js';
import { useMemo } from 'react';
import { RouterPreference } from '../state/routing/types.js';
import { usePreviewTrade } from '../state/routing/usePreviewTrade.js';
import { useRoutingAPITrade } from '../state/routing/useRoutingAPITrade.js';
import { useRouterPreference } from '../state/user/hooks.js';
import useAutoRouterSupported from './useAutoRouterSupported.js';
import useDebounce from './useDebounce.js';
import useIsWindowVisible from './useIsWindowVisible.js';
import { BaseVariant } from '../featureFlags/index.js';

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
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var autoRouterSupported = useAutoRouterSupported();
  var isWindowVisible = useIsWindowVisible();
  var inputs = useMemo(function () {
    return [amountSpecified, otherCurrency];
  }, [amountSpecified, otherCurrency]);
  var debouncedSwapQuoteFlagEnabled = useDebounceSwapQuoteFlag() === BaseVariant.Enabled;
  var isDebouncing = useDebounce(inputs, debouncedSwapQuoteFlagEnabled ? DEBOUNCE_TIME_INCREASED : DEBOUNCE_TIME) !== inputs;
  var isPreviewTradeDebouncing = useDebounce(inputs, DEBOUNCE_TIME_QUICKROUTE) !== inputs;
  var isWrap = useMemo(function () {
    if (!chainId || !amountSpecified || !otherCurrency) return false;
    var weth = WRAPPED_NATIVE_CURRENCY[chainId];
    return Boolean(amountSpecified.currency.isNative && (weth === null || weth === void 0 ? void 0 : weth.equals(otherCurrency)) || otherCurrency.isNative && (weth === null || weth === void 0 ? void 0 : weth.equals(amountSpecified.currency)));
  }, [amountSpecified, chainId, otherCurrency]);
  var _useRouterPreference = useRouterPreference(),
    _useRouterPreference2 = _slicedToArray(_useRouterPreference, 1),
    routerPreference = _useRouterPreference2[0];
  var skipBothFetches = !autoRouterSupported || !isWindowVisible || isWrap;
  var skipRoutingFetch = skipBothFetches || isDebouncing;
  var skipPreviewTradeFetch = skipBothFetches || routerPreference === RouterPreference.CLIENT || isPreviewTradeDebouncing;
  var previewTradeResult = usePreviewTrade(skipPreviewTradeFetch, tradeType, amountSpecified, otherCurrency, inputTax, outputTax);
  var routingApiTradeResult = useRoutingAPITrade(skipRoutingFetch, tradeType, amountSpecified, otherCurrency, routerPreferenceOverride !== null && routerPreferenceOverride !== void 0 ? routerPreferenceOverride : routerPreference, account, inputTax, outputTax);
  return previewTradeResult.currentTrade && !routingApiTradeResult.currentTrade ? previewTradeResult : routingApiTradeResult;
}

export { useDebouncedTrade };
