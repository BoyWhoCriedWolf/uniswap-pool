import React__default from 'react';
import { Currency } from '../graphql/data/__generated__/types-and-hooks.js';
import { THB_ICON, UAH_ICON, PKR_ICON, AUD_ICON, NGN_ICON, TRY_ICON, IDR_ICON, CAD_ICON, HKD_ICON, BRL_ICON, SGD_ICON, VND_ICON, JPY_ICON, GBP_ICON, INR_ICON, RUB_ICON, EUR_ICON, USD_ICON } from './localCurrencyIcons.js';

var SUPPORTED_LOCAL_CURRENCIES = [Currency.Usd, Currency.Aud, Currency.Brl, Currency.Cad, Currency.Eur, Currency.Gbp, Currency.Hkd, Currency.Idr, Currency.Inr, Currency.Jpy, Currency.Ngn, Currency.Pkr, Currency.Rub, Currency.Sgd, Currency.Thb, Currency.Try, Currency.Uah, Currency.Vnd];
var DEFAULT_LOCAL_CURRENCY = Currency.Usd;

// some currencies need to be forced to use the narrow symbol and others need to be forced to use symbol
// for example: when CAD is set to narrowSymbol it is displayed as $ which offers no differentiation from USD
// but when set to symbol it is displayed as CA$ which is correct
// On the other hand when TBH is set to symbol it is displayed as THB, but when set to narrowSymbol it is ฿ which is correct
var LOCAL_CURRENCY_SYMBOL_DISPLAY_TYPE = {
  USD: "narrowSymbol",
  EUR: "narrowSymbol",
  RUB: "narrowSymbol",
  INR: "narrowSymbol",
  GBP: "narrowSymbol",
  JPY: "narrowSymbol",
  VND: "narrowSymbol",
  SGD: "symbol",
  BRL: "symbol",
  HKD: "symbol",
  CAD: "symbol",
  IDR: "narrowSymbol",
  TRY: "narrowSymbol",
  NGN: "narrowSymbol",
  UAH: "narrowSymbol",
  PKR: "narrowSymbol",
  AUD: "symbol",
  THB: "narrowSymbol"
};
function getLocalCurrencyIcon(localCurrency) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
  switch (localCurrency) {
    case Currency.Usd:
      return /*#__PURE__*/React__default.createElement(USD_ICON, {
        width: size,
        height: size
      });
    case Currency.Eur:
      return /*#__PURE__*/React__default.createElement(EUR_ICON, {
        width: size,
        height: size
      });
    case Currency.Rub:
      return /*#__PURE__*/React__default.createElement(RUB_ICON, {
        width: size,
        height: size
      });
    case Currency.Inr:
      return /*#__PURE__*/React__default.createElement(INR_ICON, {
        width: size,
        height: size
      });
    case Currency.Gbp:
      return /*#__PURE__*/React__default.createElement(GBP_ICON, {
        width: size,
        height: size
      });
    case Currency.Jpy:
      return /*#__PURE__*/React__default.createElement(JPY_ICON, {
        width: size,
        height: size
      });
    case Currency.Vnd:
      return /*#__PURE__*/React__default.createElement(VND_ICON, {
        width: size,
        height: size
      });
    case Currency.Sgd:
      return /*#__PURE__*/React__default.createElement(SGD_ICON, {
        width: size,
        height: size
      });
    case Currency.Brl:
      return /*#__PURE__*/React__default.createElement(BRL_ICON, {
        width: size,
        height: size
      });
    case Currency.Hkd:
      return /*#__PURE__*/React__default.createElement(HKD_ICON, {
        width: size,
        height: size
      });
    case Currency.Cad:
      return /*#__PURE__*/React__default.createElement(CAD_ICON, {
        width: size,
        height: size
      });
    case Currency.Idr:
      return /*#__PURE__*/React__default.createElement(IDR_ICON, {
        width: size,
        height: size
      });
    case Currency.Try:
      return /*#__PURE__*/React__default.createElement(TRY_ICON, {
        width: size,
        height: size
      });
    case Currency.Ngn:
      return /*#__PURE__*/React__default.createElement(NGN_ICON, {
        width: size,
        height: size
      });
    case Currency.Aud:
      return /*#__PURE__*/React__default.createElement(AUD_ICON, {
        width: size,
        height: size
      });
    case Currency.Pkr:
      return /*#__PURE__*/React__default.createElement(PKR_ICON, {
        width: size,
        height: size
      });
    case Currency.Uah:
      return /*#__PURE__*/React__default.createElement(UAH_ICON, {
        width: size,
        height: size
      });
    case Currency.Thb:
      return /*#__PURE__*/React__default.createElement(THB_ICON, {
        width: size,
        height: size
      });
    default:
      return null;
  }
}

export { DEFAULT_LOCAL_CURRENCY, LOCAL_CURRENCY_SYMBOL_DISPLAY_TYPE, SUPPORTED_LOCAL_CURRENCIES, getLocalCurrencyIcon };
