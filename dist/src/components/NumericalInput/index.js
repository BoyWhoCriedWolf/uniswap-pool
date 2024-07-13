import _extends from '@babel/runtime/helpers/extends';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import React__default, { forwardRef } from 'react';
import styled from 'styled-components';
import '@ethersproject/address';
import { escapeRegExp } from '../../utils/escapeRegExp.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import { useFormatterLocales } from '../../utils/formatNumbers.js';

var _excluded = ["value", "onUserInput", "placeholder", "prependSymbol"];
var _templateObject;
var StyledInput = styled.input(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n  pointer-events: ", ";\n  width: 0;\n  position: relative;\n  font-weight: 485;\n  outline: none;\n  border: none;\n  flex: 1 1 auto;\n  background-color: transparent;\n  font-size: ", ";\n  text-align: ", ";\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  padding: 0px;\n  -webkit-appearance: textfield;\n  text-align: right;\n\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  [type=\"number\"] {\n    -moz-appearance: textfield;\n  }\n\n  ::-webkit-outer-spin-button,\n  ::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n  }\n\n  ::placeholder {\n    color: ", ";\n    opacity: 0.3;\n  }\n"])), function (_ref) {
  var error = _ref.error,
    theme = _ref.theme;
  return error ? theme.critical : theme.neutral1;
}, function (_ref2) {
  var disabled = _ref2.disabled;
  return disabled ? "none" : "auto";
}, function (_ref3) {
  var fontSize = _ref3.fontSize;
  return fontSize !== null && fontSize !== void 0 ? fontSize : "28px";
}, function (_ref4) {
  var align = _ref4.align;
  return align && align;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.neutral1;
});
function localeUsesComma(locale) {
  var decimalSeparator = new Intl.NumberFormat(locale).format(1.1)[1];
  return decimalSeparator === ",";
}
var inputRegex = RegExp("^\\d*(?:\\\\[.])?\\d*$"); // match escaped "." characters via in a non-capturing group

// eslint-disable
var Input = /*#__PURE__*/forwardRef(function (_ref6, ref) {
  var value = _ref6.value,
    onUserInput = _ref6.onUserInput,
    placeholder = _ref6.placeholder,
    prependSymbol = _ref6.prependSymbol,
    rest = _objectWithoutProperties(_ref6, _excluded);
  var _useFormatterLocales = useFormatterLocales(),
    formatterLocale = _useFormatterLocales.formatterLocale;
  var enforcer = function enforcer(nextUserInput) {
    if (nextUserInput === "" || inputRegex.test(escapeRegExp(nextUserInput))) {
      onUserInput(nextUserInput);
    }
  };
  var formatValueWithLocale = function formatValueWithLocale(value) {
    var _ref7 = localeUsesComma(formatterLocale) ? [/\./g, ","] : [/,/g, "."],
      _ref8 = _slicedToArray(_ref7, 2),
      searchValue = _ref8[0],
      replaceValue = _ref8[1];
    return value.toString().replace(searchValue, replaceValue);
  };
  var valueFormattedWithLocale = formatValueWithLocale(value);
  return /*#__PURE__*/React__default.createElement(StyledInput, _extends({}, rest, {
    ref: ref,
    value: prependSymbol && value ? prependSymbol + valueFormattedWithLocale : valueFormattedWithLocale,
    onChange: function onChange(event) {
      if (prependSymbol) {
        var _value = event.target.value;

        // cut off prepended symbol
        var formattedValue = _value.toString().includes(prependSymbol) ? _value.toString().slice(1, _value.toString().length + 1) : _value;

        // replace commas with periods, because uniswap exclusively uses period as the decimal separator
        enforcer(formattedValue.replace(/,/g, "."));
      } else {
        enforcer(event.target.value.replace(/,/g, "."));
      }
    }
    // universal input options
    ,
    inputMode: "decimal",
    autoComplete: "off",
    autoCorrect: "off"
    // text-specific options
    ,
    type: "text",
    pattern: "^[0-9]*[.,]?[0-9]*$",
    placeholder: placeholder || "0",
    minLength: 1,
    maxLength: 79,
    spellCheck: "false"
  }));
});
Input.displayName = "Input";
var MemoizedInput = /*#__PURE__*/React__default.memo(Input);
// const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`) // match escaped "." characters via in a non-capturing group

export { MemoizedInput as Input };
