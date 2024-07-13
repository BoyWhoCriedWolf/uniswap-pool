'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toolkit = require('@reduxjs/toolkit');

var Field = /*#__PURE__*/function (Field) {
  Field["INPUT"] = "INPUT";
  Field["OUTPUT"] = "OUTPUT";
  return Field;
}({});
var selectCurrency = toolkit.createAction("swap/selectCurrency");
var switchCurrencies = toolkit.createAction("swap/switchCurrencies");
var forceExactInput = toolkit.createAction("swap/forceExactInput");
var typeInput = toolkit.createAction("swap/typeInput");
var replaceSwapState = toolkit.createAction("swap/replaceSwapState");
var setRecipient = toolkit.createAction("swap/setRecipient");

exports.Field = Field;
exports.forceExactInput = forceExactInput;
exports.replaceSwapState = replaceSwapState;
exports.selectCurrency = selectCurrency;
exports.setRecipient = setRecipient;
exports.switchCurrencies = switchCurrencies;
exports.typeInput = typeInput;
