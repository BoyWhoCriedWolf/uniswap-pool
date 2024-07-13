'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toolkit = require('@reduxjs/toolkit');

var Field = /*#__PURE__*/function (Field) {
  Field["CURRENCY_A"] = "CURRENCY_A";
  Field["CURRENCY_B"] = "CURRENCY_B";
  return Field;
}({});
var Bound = /*#__PURE__*/function (Bound) {
  Bound["LOWER"] = "LOWER";
  Bound["UPPER"] = "UPPER";
  return Bound;
}({});
var typeInput = toolkit.createAction("mintV3/typeInputMint");
var typeStartPriceInput = toolkit.createAction("mintV3/typeStartPriceInput");
var typeLeftRangeInput = toolkit.createAction("mintV3/typeLeftRangeInput");
var typeRightRangeInput = toolkit.createAction("mintV3/typeRightRangeInput");
var resetMintState = toolkit.createAction("mintV3/resetMintState");
var setFullRange = toolkit.createAction("mintV3/setFullRange");

exports.Bound = Bound;
exports.Field = Field;
exports.resetMintState = resetMintState;
exports.setFullRange = setFullRange;
exports.typeInput = typeInput;
exports.typeLeftRangeInput = typeLeftRangeInput;
exports.typeRightRangeInput = typeRightRangeInput;
exports.typeStartPriceInput = typeStartPriceInput;
