import { createAction } from '@reduxjs/toolkit';

var Field = /*#__PURE__*/function (Field) {
  Field["CURRENCY_A"] = "CURRENCY_A";
  Field["CURRENCY_B"] = "CURRENCY_B";
  return Field;
}({});
var typeInput = createAction("mint/typeInputMint");
var resetMintState = createAction("mint/resetMintState");

export { Field, resetMintState, typeInput };
