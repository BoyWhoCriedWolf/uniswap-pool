import { useMemo } from 'react';
import { useUnsupportedTokens } from './Tokens.js';

/**
 * Returns true if the input currency or output currency cannot be traded in the interface
 * @param currencyIn the input currency to check
 * @param currencyOut the output currency to check
 */
function useIsSwapUnsupported(currencyIn, currencyOut) {
  var unsupportedTokens = useUnsupportedTokens();
  return useMemo(function () {
    if (!unsupportedTokens) {
      return false;
    }
    var currencyInUnsupported = Boolean((currencyIn === null || currencyIn === void 0 ? void 0 : currencyIn.isToken) && unsupportedTokens[currencyIn.address]);
    var currencyOutUnsupported = Boolean((currencyOut === null || currencyOut === void 0 ? void 0 : currencyOut.isToken) && unsupportedTokens[currencyOut.address]);
    return currencyInUnsupported || currencyOutUnsupported;
  }, [currencyIn, currencyOut, unsupportedTokens]);
}

export { useIsSwapUnsupported };
