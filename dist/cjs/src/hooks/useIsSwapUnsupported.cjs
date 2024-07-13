'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Tokens = require('./Tokens.cjs');

/**
 * Returns true if the input currency or output currency cannot be traded in the interface
 * @param currencyIn the input currency to check
 * @param currencyOut the output currency to check
 */
function useIsSwapUnsupported(currencyIn, currencyOut) {
  var unsupportedTokens = Tokens.useUnsupportedTokens();
  return React.useMemo(function () {
    if (!unsupportedTokens) {
      return false;
    }
    var currencyInUnsupported = Boolean((currencyIn === null || currencyIn === void 0 ? void 0 : currencyIn.isToken) && unsupportedTokens[currencyIn.address]);
    var currencyOutUnsupported = Boolean((currencyOut === null || currencyOut === void 0 ? void 0 : currencyOut.isToken) && unsupportedTokens[currencyOut.address]);
    return currencyInUnsupported || currencyOutUnsupported;
  }, [currencyIn, currencyOut, unsupportedTokens]);
}

exports.useIsSwapUnsupported = useIsSwapUnsupported;
