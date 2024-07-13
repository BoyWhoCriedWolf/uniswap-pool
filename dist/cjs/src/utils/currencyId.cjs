'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function currencyId(currency) {
  if (currency.isNative) return "ETH";
  if (currency.isToken) return currency.address;
  throw new Error("invalid currency");
}

exports.currencyId = currencyId;
