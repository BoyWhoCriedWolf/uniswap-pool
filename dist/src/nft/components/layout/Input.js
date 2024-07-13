import React__default, { forwardRef } from 'react';
import _extends from '@babel/runtime/helpers/extends';
import { isNumber } from '../../utils/numbers.js';
import { Box } from '../Box.js';

var Input = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default.createElement(Box, _extends({
    ref: ref,
    as: "input",
    borderColor: {
      "default": "surface3",
      focus: "neutral3"
    },
    borderWidth: "1px",
    borderStyle: "solid",
    borderRadius: "12",
    padding: "12",
    fontSize: "14",
    fontWeight: "book",
    color: {
      placeholder: "neutral2",
      "default": "neutral1"
    },
    backgroundColor: "transparent"
  }, props));
});
Input.displayName = "Input";
var NumericInput = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default.createElement(Box, _extends({
    ref: ref,
    as: "input",
    inputMode: "decimal",
    autoComplete: "off",
    type: "text",
    borderColor: {
      "default": "surface3",
      focus: "neutral2"
    },
    color: {
      placeholder: "neutral2",
      "default": "neutral1"
    },
    onInput: function onInput(v) {
      if (v.currentTarget.value === ".") {
        v.currentTarget.value = "0.";
      }
      v.currentTarget.value = !!v.currentTarget.value && isNumber(v.currentTarget.value) && parseFloat(v.currentTarget.value) >= 0 ? v.currentTarget.value : "";
    }
  }, props));
});
NumericInput.displayName = "Input";

export { Input, NumericInput };
