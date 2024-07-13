'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var typesAndHooks = require('../graphql/data/__generated__/types-and-hooks.cjs');
var localCurrencyIcons = require('./localCurrencyIcons.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var SUPPORTED_LOCAL_CURRENCIES = [typesAndHooks.Currency.Usd, typesAndHooks.Currency.Aud, typesAndHooks.Currency.Brl, typesAndHooks.Currency.Cad, typesAndHooks.Currency.Eur, typesAndHooks.Currency.Gbp, typesAndHooks.Currency.Hkd, typesAndHooks.Currency.Idr, typesAndHooks.Currency.Inr, typesAndHooks.Currency.Jpy, typesAndHooks.Currency.Ngn, typesAndHooks.Currency.Pkr, typesAndHooks.Currency.Rub, typesAndHooks.Currency.Sgd, typesAndHooks.Currency.Thb, typesAndHooks.Currency.Try, typesAndHooks.Currency.Uah, typesAndHooks.Currency.Vnd];
var DEFAULT_LOCAL_CURRENCY = typesAndHooks.Currency.Usd;

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
    case typesAndHooks.Currency.Usd:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.USD_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Eur:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.EUR_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Rub:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.RUB_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Inr:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.INR_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Gbp:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.GBP_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Jpy:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.JPY_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Vnd:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.VND_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Sgd:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.SGD_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Brl:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.BRL_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Hkd:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.HKD_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Cad:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.CAD_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Idr:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.IDR_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Try:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.TRY_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Ngn:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.NGN_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Aud:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.AUD_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Pkr:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.PKR_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Uah:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.UAH_ICON, {
        width: size,
        height: size
      });
    case typesAndHooks.Currency.Thb:
      return /*#__PURE__*/React__default["default"].createElement(localCurrencyIcons.THB_ICON, {
        width: size,
        height: size
      });
    default:
      return null;
  }
}

exports.DEFAULT_LOCAL_CURRENCY = DEFAULT_LOCAL_CURRENCY;
exports.LOCAL_CURRENCY_SYMBOL_DISPLAY_TYPE = LOCAL_CURRENCY_SYMBOL_DISPLAY_TYPE;
exports.SUPPORTED_LOCAL_CURRENCIES = SUPPORTED_LOCAL_CURRENCIES;
exports.getLocalCurrencyIcon = getLocalCurrencyIcon;
