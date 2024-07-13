'use strict';

var misc = require('../../constants/misc.cjs');

/**
 * Given the price impact, get user confirmation.
 *
 * @param priceImpactWithoutFee price impact of the trade without the fee.
 */
function confirmPriceImpactWithoutFee(priceImpactWithoutFee) {
  if (!priceImpactWithoutFee.lessThan(misc.PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN)) {
    return window.prompt("This swap has a price impact of at least ".concat(misc.PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN.toFixed(0), "%. Please type the word \"confirm\" to continue with this swap.")) === "confirm";
  } else if (!priceImpactWithoutFee.lessThan(misc.ALLOWED_PRICE_IMPACT_HIGH)) {
    return window.confirm("This swap has a price impact of at least ".concat(misc.ALLOWED_PRICE_IMPACT_HIGH.toFixed(0), "%. Please confirm that you would like to continue with this swap."));
  }
  return true;
}

module.exports = confirmPriceImpactWithoutFee;
