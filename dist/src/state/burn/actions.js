import { createAction } from '@reduxjs/toolkit';

var Field = /*#__PURE__*/function (Field) {
  Field["LIQUIDITY_PERCENT"] = "LIQUIDITY_PERCENT";
  Field["LIQUIDITY"] = "LIQUIDITY";
  Field["CURRENCY_A"] = "CURRENCY_A";
  Field["CURRENCY_B"] = "CURRENCY_B";
  return Field;
}({});
var typeInput = createAction("burn/typeInputBurn");

export { Field, typeInput };
