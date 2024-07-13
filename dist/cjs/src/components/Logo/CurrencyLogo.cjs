'use strict';

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var AssetLogo = require('./AssetLogo.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

function CurrencyLogo(props) {
  var _props$currency, _props$currency2, _props$currency3, _props$symbol, _props$currency4, _props$currency5, _props$hideL2Icon;
  return /*#__PURE__*/React__default["default"].createElement(AssetLogo["default"], _extends__default["default"]({
    isNative: (_props$currency = props.currency) === null || _props$currency === void 0 ? void 0 : _props$currency.isNative,
    chainId: (_props$currency2 = props.currency) === null || _props$currency2 === void 0 ? void 0 : _props$currency2.chainId,
    address: (_props$currency3 = props.currency) === null || _props$currency3 === void 0 ? void 0 : _props$currency3.wrapped.address,
    symbol: (_props$symbol = props.symbol) !== null && _props$symbol !== void 0 ? _props$symbol : (_props$currency4 = props.currency) === null || _props$currency4 === void 0 ? void 0 : _props$currency4.symbol,
    backupImg: (_props$currency5 = props.currency) === null || _props$currency5 === void 0 ? void 0 : _props$currency5.logoURI,
    hideL2Icon: (_props$hideL2Icon = props.hideL2Icon) !== null && _props$hideL2Icon !== void 0 ? _props$hideL2Icon : true
  }, props));
}

module.exports = CurrencyLogo;
