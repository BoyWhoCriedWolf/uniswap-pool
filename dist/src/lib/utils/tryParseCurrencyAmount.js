import { parseUnits } from '@ethersproject/units';
import { CurrencyAmount } from '@uniswap/sdk-core';
import JSBI from 'jsbi';

/**
 * Parses a CurrencyAmount from the passed string.
 * Returns the CurrencyAmount, or undefined if parsing fails.
 */
function tryParseCurrencyAmount(value, currency) {
  if (!value || !currency) {
    return undefined;
  }
  try {
    var typedValueParsed = parseUnits(value, currency.decimals).toString();
    if (typedValueParsed !== "0") {
      return CurrencyAmount.fromRawAmount(currency, JSBI.BigInt(typedValueParsed));
    }
  } catch (error) {
    // fails if the user specifies too many decimal places of precision (or maybe exceed max uint?)
    console.debug("Failed to parse input amount: \"".concat(value, "\""), error);
  }
  return undefined;
}

export { tryParseCurrencyAmount as default };
