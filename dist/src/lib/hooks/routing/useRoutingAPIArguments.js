import { skipToken } from '@reduxjs/toolkit/query/react';
import { useUniswapXDefaultEnabled } from '../../../featureFlags/flags/uniswapXDefault.js';
import { useUniswapXEthOutputEnabled } from '../../../featureFlags/flags/uniswapXEthOutput.js';
import { useUniswapXExactOutputEnabled } from '../../../featureFlags/flags/uniswapXExactOutput.js';
import { useUniswapXSyntheticQuoteEnabled } from '../../../featureFlags/flags/uniswapXUseSyntheticQuote.js';
import { useMemo } from 'react';
import { currencyAddressForSwapQuote } from '../../../state/routing/utils.js';
import { useUserDisabledUniswapX, useUserOptedOutOfUniswapX } from '../../../state/user/hooks.js';

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
  var uniswapXForceSyntheticQuotes = useUniswapXSyntheticQuoteEnabled();
  var userDisabledUniswapX = useUserDisabledUniswapX();
  var userOptedOutOfUniswapX = useUserOptedOutOfUniswapX();
  var uniswapXEthOutputEnabled = useUniswapXEthOutputEnabled();
  var uniswapXExactOutputEnabled = useUniswapXExactOutputEnabled();
  var isUniswapXDefaultEnabled = useUniswapXDefaultEnabled();
  return useMemo(function () {
    return !tokenIn || !tokenOut || !amount || tokenIn.equals(tokenOut) || tokenIn.wrapped.equals(tokenOut.wrapped) ? skipToken : {
      account: account,
      amount: amount.quotient.toString(),
      tokenInAddress: currencyAddressForSwapQuote(tokenIn),
      tokenInChainId: tokenIn.chainId,
      tokenInDecimals: tokenIn.wrapped.decimals,
      tokenInSymbol: tokenIn.wrapped.symbol,
      tokenOutAddress: currencyAddressForSwapQuote(tokenOut),
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

export { useRoutingAPIArguments };
