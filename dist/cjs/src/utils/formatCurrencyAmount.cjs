'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sdkCore = require('@uniswap/sdk-core');
var locales = require('../constants/locales.cjs');
var JSBI = require('jsbi');
var formatLocaleNumber = require('../lib/utils/formatLocaleNumber.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

function formatCurrencyAmount(amount, sigFigs) {
  var locale = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : locales.DEFAULT_LOCALE;
  var fixedDecimals = arguments.length > 3 ? arguments[3] : undefined;
  if (!amount) {
    return "-";
  }
  if (JSBI__default["default"].equal(amount.quotient, JSBI__default["default"].BigInt(0))) {
    return "0";
  }
  if (amount.divide(amount.decimalScale).lessThan(new sdkCore.Fraction(1, 100000))) {
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

exports.formatCurrencyAmount = formatCurrencyAmount;
