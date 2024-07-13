import { Fraction } from '@uniswap/sdk-core';
import { DEFAULT_LOCALE } from '../constants/locales.js';
import JSBI from 'jsbi';
import formatLocaleNumber from '../lib/utils/formatLocaleNumber.js';

function formatCurrencyAmount(amount, sigFigs) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : DEFAULT_LOCALE;
  var fixedDecimals = arguments.length > 3 ? arguments[3] : undefined;
  if (!amount) {
    return "-";
  }
  if (JSBI.equal(amount.quotient, JSBI.BigInt(0))) {
    return "0";
  }
  if (amount.divide(amount.decimalScale).lessThan(new Fraction(1, 100000))) {
    return "<".concat(formatLocaleNumber({
      number: 0.00001,
      locale: locale
    }));
  }
  return formatLocaleNumber({
    number: amount,
    locale: locale,
    sigFigs: sigFigs,
    fixedDecimals: fixedDecimals
  });
}

export { formatCurrencyAmount };
