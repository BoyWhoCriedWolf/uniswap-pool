'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var analyticsEvents = require('@uniswap/analytics-events');
var index = require('../analytics/index.cjs');
var types = require('../state/routing/types.cjs');
var SwapEventTimestampTracker = require('./SwapEventTimestampTracker.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function logSwapSuccess(hash, chainId, analyticsContext) {
  var hasSetSwapSuccess = SwapEventTimestampTracker.timestampTracker.hasTimestamp(SwapEventTimestampTracker.SwapEventType.FIRST_SWAP_SUCCESS);
  var elapsedTime = SwapEventTimestampTracker.timestampTracker.setElapsedTime(SwapEventTimestampTracker.SwapEventType.FIRST_SWAP_SUCCESS);
  index.sendAnalyticsEvent(analyticsEvents.SwapEventName.SWAP_TRANSACTION_COMPLETED, _objectSpread({
    // We only log the time-to-swap metric for the first swap of a session,
    // so if it was previously set we log undefined here.
    time_to_swap: hasSetSwapSuccess ? undefined : elapsedTime,
    time_to_swap_since_first_input: hasSetSwapSuccess ? undefined : SwapEventTimestampTracker.timestampTracker.getElapsedTime(SwapEventTimestampTracker.SwapEventType.FIRST_SWAP_SUCCESS, SwapEventTimestampTracker.SwapEventType.FIRST_SWAP_ACTION),
    hash: hash,
    chainId: chainId
  }, analyticsContext));
}

// We only log the time-to-first-swap-input metric for the first swap input of a session.
function maybeLogFirstSwapAction(analyticsContext) {
  if (!SwapEventTimestampTracker.timestampTracker.hasTimestamp(SwapEventTimestampTracker.SwapEventType.FIRST_SWAP_ACTION)) {
    var elapsedTime = SwapEventTimestampTracker.timestampTracker.setElapsedTime(SwapEventTimestampTracker.SwapEventType.FIRST_SWAP_ACTION);
    index.sendAnalyticsEvent(analyticsEvents.SwapEventName.SWAP_FIRST_ACTION, _objectSpread({
      time_to_first_swap_action: elapsedTime
    }, analyticsContext));
  }
}
function logSwapQuoteRequest(chainId, routerPreference, isQuickRoute) {
  var performanceMetrics = {};
  if (routerPreference !== types.INTERNAL_ROUTER_PREFERENCE_PRICE) {
    var hasSetSwapQuote = SwapEventTimestampTracker.timestampTracker.hasTimestamp(SwapEventTimestampTracker.SwapEventType.FIRST_QUOTE_FETCH_STARTED);
    var elapsedTime = SwapEventTimestampTracker.timestampTracker.setElapsedTime(SwapEventTimestampTracker.SwapEventType.FIRST_QUOTE_FETCH_STARTED);
    performanceMetrics = {
      // We only log the time_to_first_quote_request metric for the first quote request of a session.
      time_to_first_quote_request: hasSetSwapQuote ? undefined : elapsedTime,
      time_to_first_quote_request_since_first_input: hasSetSwapQuote ? undefined : SwapEventTimestampTracker.timestampTracker.getElapsedTime(SwapEventTimestampTracker.SwapEventType.FIRST_QUOTE_FETCH_STARTED, SwapEventTimestampTracker.SwapEventType.FIRST_SWAP_ACTION)
    };
  }
  index.sendAnalyticsEvent(analyticsEvents.SwapEventName.SWAP_QUOTE_FETCH, _objectSpread({
    chainId: chainId,
    isQuickRoute: isQuickRoute !== null && isQuickRoute !== void 0 ? isQuickRoute : false
  }, performanceMetrics));
}

exports.logSwapQuoteRequest = logSwapQuoteRequest;
exports.logSwapSuccess = logSwapSuccess;
exports.maybeLogFirstSwapAction = maybeLogFirstSwapAction;
