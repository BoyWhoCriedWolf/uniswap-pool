import { createAction } from '@reduxjs/toolkit';

var Field = /*#__PURE__*/function (Field) {
  Field["INPUT"] = "INPUT";
  Field["OUTPUT"] = "OUTPUT";
  return Field;
}({});
var selectCurrency = createAction("swap/selectCurrency");
var switchCurrencies = createAction("swap/switchCurrencies");
var forceExactInput = createAction("swap/forceExactInput");
var typeInput = createAction("swap/typeInput");
var replaceSwapState = createAction("swap/replaceSwapState");
var setRecipient = createAction("swap/setRecipient");

export { Field, forceExactInput, replaceSwapState, selectCurrency, setRecipient, switchCurrencies, typeInput };
