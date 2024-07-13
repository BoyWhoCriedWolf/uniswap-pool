import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { TradeType } from '@uniswap/sdk-core';
import { AVERAGE_L1_BLOCK_TIME } from '../../constants/chainInfo.js';
import { ZERO_PERCENT } from '../../constants/misc.js';
import { useRoutingAPIArguments } from '../../lib/hooks/routing/useRoutingAPIArguments.js';
import ms from 'ms';
import { useMemo } from 'react';
import { useGetQuoteQueryState, useGetQuoteQuery } from './slice.js';
import { TradeState, INTERNAL_ROUTER_PREFERENCE_PRICE, QuoteState } from './types.js';

var TRADE_NOT_FOUND = {
  state: TradeState.NO_ROUTE_FOUND,
  trade: undefined,
  currentData: undefined
};
var TRADE_LOADING = {
  state: TradeState.LOADING,
  trade: undefined,
  currentData: undefined
};
/**
 * Returns the best trade by invoking the routing api or the smart order router on the client
 * @param tradeType whether the swap is an exact in/out
 * @param amountSpecified the exact amount to swap in/out
 * @param otherCurrency the desired output/payment currency
 */
function useRoutingAPITrade() {
  var skipFetch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var tradeType = arguments.length > 1 ? arguments[1] : undefined;
  var amountSpecified = arguments.length > 2 ? arguments[2] : undefined;
  var otherCurrency = arguments.length > 3 ? arguments[3] : undefined;
  var routerPreference = arguments.length > 4 ? arguments[4] : undefined;
  var account = arguments.length > 5 ? arguments[5] : undefined;
  var inputTax = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : ZERO_PERCENT;
  var outputTax = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : ZERO_PERCENT;
  var _useMemo = useMemo(function () {
      return tradeType === TradeType.EXACT_INPUT ? [amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency, otherCurrency] : [otherCurrency, amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency];
    }, [amountSpecified, otherCurrency, tradeType]),
    _useMemo2 = _slicedToArray(_useMemo, 2),
    currencyIn = _useMemo2[0],
    currencyOut = _useMemo2[1];
  var queryArgs = useRoutingAPIArguments({
    account: account,
    tokenIn: currencyIn,
    tokenOut: currencyOut,
    amount: amountSpecified,
    tradeType: tradeType,
    routerPreference: routerPreference,
    inputTax: inputTax,
    outputTax: outputTax
  });
  var _useGetQuoteQueryStat = useGetQuoteQueryState(queryArgs),
    isError = _useGetQuoteQueryStat.isError,
    tradeResult = _useGetQuoteQueryStat.data,
    error = _useGetQuoteQueryStat.error,
    currentData = _useGetQuoteQueryStat.currentData;
  useGetQuoteQuery(skipFetch ? skipToken : queryArgs, {
    // Price-fetching is informational and costly, so it's done less frequently.
    pollingInterval: routerPreference === INTERNAL_ROUTER_PREFERENCE_PRICE ? ms("1m") : AVERAGE_L1_BLOCK_TIME,
    // If latest quote from cache was fetched > 2m ago, instantly repoll for another instead of waiting for next poll period
    refetchOnMountOrArgChange: 2 * 60
  });
  var isFetching = currentData !== tradeResult || !currentData;
  return useMemo(function () {
    if (amountSpecified && otherCurrency && queryArgs === skipToken) {
      return {
        state: TradeState.STALE,
        trade: tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.trade,
        currentTrade: currentData === null || currentData === void 0 ? void 0 : currentData.trade,
        swapQuoteLatency: tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.latencyMs
      };
    } else if (!amountSpecified || isError || queryArgs === skipToken) {
      return {
        state: TradeState.INVALID,
        trade: undefined,
        currentTrade: currentData === null || currentData === void 0 ? void 0 : currentData.trade,
        error: JSON.stringify(error)
      };
    } else if ((tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.state) === QuoteState.NOT_FOUND && !isFetching) {
      return TRADE_NOT_FOUND;
    } else if (!(tradeResult !== null && tradeResult !== void 0 && tradeResult.trade)) {
      return TRADE_LOADING;
    } else {
      return {
        state: isFetching ? TradeState.LOADING : TradeState.VALID,
        trade: tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.trade,
        currentTrade: currentData === null || currentData === void 0 ? void 0 : currentData.trade,
        swapQuoteLatency: tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.latencyMs
      };
    }
  }, [amountSpecified, error, isError, isFetching, queryArgs, tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.latencyMs, tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.state, tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.trade, currentData === null || currentData === void 0 ? void 0 : currentData.trade, otherCurrency]);
}

export { useRoutingAPITrade };
