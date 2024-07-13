import { createAction } from '@reduxjs/toolkit';

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
var typeInput = createAction("mintV3/typeInputMint");
var typeStartPriceInput = createAction("mintV3/typeStartPriceInput");
var typeLeftRangeInput = createAction("mintV3/typeLeftRangeInput");
var typeRightRangeInput = createAction("mintV3/typeRightRangeInput");
var resetMintState = createAction("mintV3/resetMintState");
var setFullRange = createAction("mintV3/setFullRange");

export { Bound, Field, resetMintState, setFullRange, typeInput, typeLeftRangeInput, typeRightRangeInput, typeStartPriceInput };
