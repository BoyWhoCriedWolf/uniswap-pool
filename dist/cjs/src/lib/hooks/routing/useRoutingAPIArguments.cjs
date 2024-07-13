'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('@reduxjs/toolkit/query/react');
var uniswapXDefault = require('../../../featureFlags/flags/uniswapXDefault.cjs');
var uniswapXEthOutput = require('../../../featureFlags/flags/uniswapXEthOutput.cjs');
var uniswapXExactOutput = require('../../../featureFlags/flags/uniswapXExactOutput.cjs');
var uniswapXUseSyntheticQuote = require('../../../featureFlags/flags/uniswapXUseSyntheticQuote.cjs');
var React = require('react');
var utils = require('../../../state/routing/utils.cjs');
var hooks = require('../../../state/user/hooks.cjs');

/**
 * Returns query arguments for the Routing API query or undefined if the
 * query should be skipped. Input arguments do not need to be memoized, as they will
 * be destructured.
 */
function useRoutingAPIArguments(_ref) {
  var account = _ref.account,
    tokenIn = _ref.tokenIn,
    tokenOut = _ref.tokenOut,
    amount = _ref.amount,
    tradeType = _ref.tradeType,
    routerPreference = _ref.routerPreference,
    inputTax = _ref.inputTax,
    outputTax = _ref.outputTax;
  var uniswapXForceSyntheticQuotes = uniswapXUseSyntheticQuote.useUniswapXSyntheticQuoteEnabled();
  var userDisabledUniswapX = hooks.useUserDisabledUniswapX();
  var userOptedOutOfUniswapX = hooks.useUserOptedOutOfUniswapX();
  var uniswapXEthOutputEnabled = uniswapXEthOutput.useUniswapXEthOutputEnabled();
  var uniswapXExactOutputEnabled = uniswapXExactOutput.useUniswapXExactOutputEnabled();
  var isUniswapXDefaultEnabled = uniswapXDefault.useUniswapXDefaultEnabled();
  return React.useMemo(function () {
    return !tokenIn || !tokenOut || !amount || tokenIn.equals(tokenOut) || tokenIn.wrapped.equals(tokenOut.wrapped) ? react.skipToken : {
      account: account,
      amount: amount.quotient.toString(),
      tokenInAddress: utils.currencyAddressForSwapQuote(tokenIn),
      tokenInChainId: tokenIn.chainId,
      tokenInDecimals: tokenIn.wrapped.decimals,
      tokenInSymbol: tokenIn.wrapped.symbol,
      tokenOutAddress: utils.currencyAddressForSwapQuote(tokenOut),
      tokenOutChainId: tokenOut.wrapped.chainId,
      tokenOutDecimals: tokenOut.wrapped.decimals,
      tokenOutSymbol: tokenOut.wrapped.symbol,
      routerPreference: routerPreference,
      tradeType: tradeType,
      needsWrapIfUniswapX: tokenIn.isNative,
      uniswapXForceSyntheticQuotes: uniswapXForceSyntheticQuotes,
      userDisabledUniswapX: userDisabledUniswapX,
      userOptedOutOfUniswapX: userOptedOutOfUniswapX,
      uniswapXEthOutputEnabled: uniswapXEthOutputEnabled,
      uniswapXExactOutputEnabled: uniswapXExactOutputEnabled,
      isUniswapXDefaultEnabled: isUniswapXDefaultEnabled,
      inputTax: inputTax,
      outputTax: outputTax
    };
  }, [account, amount, routerPreference, tokenIn, tokenOut, tradeType, uniswapXExactOutputEnabled, uniswapXForceSyntheticQuotes, userDisabledUniswapX, userOptedOutOfUniswapX, uniswapXEthOutputEnabled, isUniswapXDefaultEnabled, inputTax, outputTax]);
}

exports.useRoutingAPIArguments = useRoutingAPIArguments;
