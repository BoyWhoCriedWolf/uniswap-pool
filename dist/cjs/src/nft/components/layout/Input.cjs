'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var numbers = require('../../utils/numbers.cjs');
var Box = require('../Box.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

var Input = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, _extends__default["default"]({
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
var NumericInput = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, _extends__default["default"]({
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
      v.currentTarget.value = !!v.currentTarget.value && numbers.isNumber(v.currentTarget.value) && parseFloat(v.currentTarget.value) >= 0 ? v.currentTarget.value : "";
    }
  }, props));
});
NumericInput.displayName = "Input";

exports.Input = Input;
exports.NumericInput = NumericInput;
