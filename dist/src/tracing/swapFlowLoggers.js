import { SwapEventName } from '@uniswap/analytics-events';
import { sendAnalyticsEvent } from '../analytics/index.js';
import { INTERNAL_ROUTER_PREFERENCE_PRICE } from '../state/routing/types.js';
import { timestampTracker, SwapEventType } from './SwapEventTimestampTracker.js';

function logSwapSuccess(hash, chainId, analyticsContext) {
  const hasSetSwapSuccess = timestampTracker.hasTimestamp(SwapEventType.FIRST_SWAP_SUCCESS);
  const elapsedTime = timestampTracker.setElapsedTime(SwapEventType.FIRST_SWAP_SUCCESS);
  sendAnalyticsEvent(SwapEventName.SWAP_TRANSACTION_COMPLETED, {
    // We only log the time-to-swap metric for the first swap of a session,
    // so if it was previously set we log undefined here.
    time_to_swap: hasSetSwapSuccess ? undefined : elapsedTime,
    time_to_swap_since_first_input: hasSetSwapSuccess ? undefined : timestampTracker.getElapsedTime(SwapEventType.FIRST_SWAP_SUCCESS, SwapEventType.FIRST_SWAP_ACTION),
    hash,
    chainId,
    ...analyticsContext
  });
}

// We only log the time-to-first-swap-input metric for the first swap input of a session.
function maybeLogFirstSwapAction(analyticsContext) {
  if (!timestampTracker.hasTimestamp(SwapEventType.FIRST_SWAP_ACTION)) {
    const elapsedTime = timestampTracker.setElapsedTime(SwapEventType.FIRST_SWAP_ACTION);
    sendAnalyticsEvent(SwapEventName.SWAP_FIRST_ACTION, {
      time_to_first_swap_action: elapsedTime,
      ...analyticsContext
    });
  }
}
function logSwapQuoteRequest(chainId, routerPreference, isQuickRoute) {
  let performanceMetrics = {};
  if (routerPreference !== INTERNAL_ROUTER_PREFERENCE_PRICE) {
    const hasSetSwapQuote = timestampTracker.hasTimestamp(SwapEventType.FIRST_QUOTE_FETCH_STARTED);
    const elapsedTime = timestampTracker.setElapsedTime(SwapEventType.FIRST_QUOTE_FETCH_STARTED);
    performanceMetrics = {
      // We only log the time_to_first_quote_request metric for the first quote request of a session.
      time_to_first_quote_request: hasSetSwapQuote ? undefined : elapsedTime,
      time_to_first_quote_request_since_first_input: hasSetSwapQuote ? undefined : timestampTracker.getElapsedTime(SwapEventType.FIRST_QUOTE_FETCH_STARTED, SwapEventType.FIRST_SWAP_ACTION)
    };
  }
  sendAnalyticsEvent(SwapEventName.SWAP_QUOTE_FETCH, {
    chainId,
    isQuickRoute: isQuickRoute ?? false,
    ...performanceMetrics
  });
}

export { logSwapQuoteRequest, logSwapSuccess, maybeLogFirstSwapAction };
