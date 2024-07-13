'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var react = require('@reduxjs/toolkit/query/react');
var sdkCore = require('@uniswap/sdk-core');
var misc = require('../../constants/misc.cjs');
var quickRouteMainnet = require('../../featureFlags/flags/quickRouteMainnet.cjs');
var React = require('react');
var quickRouteSlice = require('./quickRouteSlice.cjs');
var types = require('./types.cjs');
var utils = require('./utils.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

var TRADE_NOT_FOUND = {
  state: types.TradeState.NO_ROUTE_FOUND,
  trade: undefined
};
var TRADE_LOADING = {
  state: types.TradeState.LOADING,
  trade: undefined
};
function useQuickRouteArguments(_ref) {
  var tokenIn = _ref.tokenIn,
    tokenOut = _ref.tokenOut,
    amount = _ref.amount,
    tradeType = _ref.tradeType,
    inputTax = _ref.inputTax,
    outputTax = _ref.outputTax;
  var enabledMainnet = quickRouteMainnet.useQuickRouteMainnetEnabled();
  return React.useMemo(function () {
    if (!tokenIn || !tokenOut || !amount) return react.skipToken;
    if (!enabledMainnet || tokenIn.chainId !== sdkCore.ChainId.MAINNET) return react.skipToken;
    return {
      amount: amount.quotient.toString(),
      tokenInAddress: utils.currencyAddressForSwapQuote(tokenIn),
      tokenInChainId: tokenIn.chainId,
      tokenInDecimals: tokenIn.wrapped.decimals,
      tokenInSymbol: tokenIn.wrapped.symbol,
      tokenOutAddress: utils.currencyAddressForSwapQuote(tokenOut),
      tokenOutChainId: tokenOut.wrapped.chainId,
      tokenOutDecimals: tokenOut.wrapped.decimals,
      tokenOutSymbol: tokenOut.wrapped.symbol,
      tradeType: tradeType,
      inputTax: inputTax,
      outputTax: outputTax
    };
  }, [amount, enabledMainnet, inputTax, outputTax, tokenIn, tokenOut, tradeType]);
}
function usePreviewTrade() {
  var skipFetch = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var tradeType = arguments.length > 1 ? arguments[1] : undefined;
  var amountSpecified = arguments.length > 2 ? arguments[2] : undefined;
  var otherCurrency = arguments.length > 3 ? arguments[3] : undefined;
  var inputTax = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : misc.ZERO_PERCENT;
  var outputTax = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : misc.ZERO_PERCENT;
  var _useMemo = React.useMemo(function () {
      return tradeType === sdkCore.TradeType.EXACT_INPUT ? [amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency, otherCurrency] : [otherCurrency, amountSpecified === null || amountSpecified === void 0 ? void 0 : amountSpecified.currency];
    }, [amountSpecified, otherCurrency, tradeType]),
    _useMemo2 = _slicedToArray__default["default"](_useMemo, 2),
    currencyIn = _useMemo2[0],
    currencyOut = _useMemo2[1];
  var queryArgs = useQuickRouteArguments({
    tokenIn: currencyIn,
    tokenOut: currencyOut,
    amount: amountSpecified,
    tradeType: tradeType,
    inputTax: inputTax,
    outputTax: outputTax
  });
  var _useGetQuickRouteQuer = quickRouteSlice.useGetQuickRouteQueryState(queryArgs),
    isError = _useGetQuickRouteQuer.isError,
    tradeResult = _useGetQuickRouteQuer.data,
    error = _useGetQuickRouteQuer.error,
    currentData = _useGetQuickRouteQuer.currentData;
  quickRouteSlice.useGetQuickRouteQuery(skipFetch ? react.skipToken : queryArgs, {
    // If latest quote from cache was fetched > 2m ago, instantly repoll for another instead of waiting for next poll period
    refetchOnMountOrArgChange: 2 * 60
  });
  var isFetching = currentData !== tradeResult || !currentData;
  return React.useMemo(function () {
    if (amountSpecified && otherCurrency && queryArgs === react.skipToken) {
      return {
        state: types.TradeState.STALE,
        trade: tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.trade,
        currentTrade: currentData === null || currentData === void 0 ? void 0 : currentData.trade,
        swapQuoteLatency: tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.latencyMs
      };
    } else if (!amountSpecified || isError || queryArgs === react.skipToken) {
      return {
        state: types.TradeState.INVALID,
        trade: undefined,
        currentTrade: currentData === null || currentData === void 0 ? void 0 : currentData.trade,
        error: JSON.stringify(error)
      };
    } else if ((tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.state) === types.QuoteState.NOT_FOUND && !isFetching) {
      return TRADE_NOT_FOUND;
    } else if (!(tradeResult !== null && tradeResult !== void 0 && tradeResult.trade)) {
      return TRADE_LOADING;
    } else {
      return {
        state: isFetching ? types.TradeState.LOADING : types.TradeState.VALID,
        trade: tradeResult.trade,
        currentTrade: currentData === null || currentData === void 0 ? void 0 : currentData.trade,
        swapQuoteLatency: tradeResult.latencyMs
      };
    }
  }, [amountSpecified, error, isError, isFetching, queryArgs, tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.latencyMs, tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.state, tradeResult === null || tradeResult === void 0 ? void 0 : tradeResult.trade, currentData === null || currentData === void 0 ? void 0 : currentData.trade, otherCurrency]);
}

exports.usePreviewTrade = usePreviewTrade;
