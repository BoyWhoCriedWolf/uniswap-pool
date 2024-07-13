'use strict';

var units = require('@ethersproject/units');
var sdkCore = require('@uniswap/sdk-core');
var JSBI = require('jsbi');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

/**
 * Parses a CurrencyAmount from the passed string.
 * Returns the CurrencyAmount, or undefined if parsing fails.
 */
function tryParseCurrencyAmount(value, currency) {
  if (!value || !currency) {
    return undefined;
  }
  try {
    var typedValueParsed = units.parseUnits(value, currency.decimals).toString();
    if (typedValueParsed !== "0") {
      return sdkCore.CurrencyAmount.fromRawAmount(currency, JSBI__default["default"].BigInt(typedValueParsed));
    }
  } catch (error) {
    // fails if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug("Failed to parse input amount: \"".concat(value, "\""), error);
  }
  return undefined;
}

module.exports = tryParseCurrencyAmount;
