'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toolkit = require('@reduxjs/toolkit');

var Field = /*#__PURE__*/function (Field) {
  Field["LIQUIDITY_PERCENT"] = "LIQUIDITY_PERCENT";
  Field["LIQUIDITY"] = "LIQUIDITY";
  Field["CURRENCY_A"] = "CURRENCY_A";
  Field["CURRENCY_B"] = "CURRENCY_B";
  return Field;
}({});
var typeInput = toolkit.createAction("burn/typeInputBurn");

exports.Field = Field;
exports.typeInput = typeInput;
