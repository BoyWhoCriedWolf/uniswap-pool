'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sdkCore = require('@uniswap/sdk-core');
var JSBI = require('jsbi');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

var MIN_NATIVE_CURRENCY_FOR_GAS = JSBI__default["default"].exponentiate(JSBI__default["default"].BigInt(10), JSBI__default["default"].BigInt(16)); // .01 ETH
/**
 * Given some token amount, return the max that can be spent of it
 * @param currencyAmount to return max of
 */
function maxAmountSpend(currencyAmount) {
  if (!currencyAmount) return undefined;
  if (currencyAmount.currency.isNative) {
    if (JSBI__default["default"].greaterThan(currencyAmount.quotient, MIN_NATIVE_CURRENCY_FOR_GAS)) {
      return sdkCore.CurrencyAmount.fromRawAmount(currencyAmount.currency, JSBI__default["default"].subtract(currencyAmount.quotient, MIN_NATIVE_CURRENCY_FOR_GAS));
    } else {
      return sdkCore.CurrencyAmount.fromRawAmount(currencyAmount.currency, JSBI__default["default"].BigInt(0));
    }
  }
  return currencyAmount;
}

exports.maxAmountSpend = maxAmountSpend;
