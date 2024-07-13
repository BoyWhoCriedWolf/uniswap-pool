'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toolkit = require('@reduxjs/toolkit');

var Field = /*#__PURE__*/function (Field) {
  Field["CURRENCY_A"] = "CURRENCY_A";
  Field["CURRENCY_B"] = "CURRENCY_B";
  return Field;
}({});
var typeInput = toolkit.createAction("mint/typeInputMint");
var resetMintState = toolkit.createAction("mint/resetMintState");

exports.Field = Field;
exports.resetMintState = resetMintState;
exports.typeInput = typeInput;
