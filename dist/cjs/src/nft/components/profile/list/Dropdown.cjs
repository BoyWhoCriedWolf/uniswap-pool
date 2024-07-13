'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../../../components/Column/index.cjs');
var index$1 = require('../../../../components/Row/index.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
require('../../../../theme/components/index.cjs');
var text = require('../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var DropdownWrapper = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  gap: 4px;\n  background: ", ";\n  padding: 8px;\n  width: ", "px;\n  border-radius: 12px;\n  box-shadow: ", ";\n  border: 1px solid ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var $width = _ref2.$width;
  return $width;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_deepShadow;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface3;
});
var DropdownRow = styled__default["default"](index$1["default"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  justify-content: space-between;\n  padding: 8px;\n  cursor: pointer;\n  border-radius: 12px;\n\n  &:hover {\n    background: ", ";\n  }\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface3;
});
var Dropdown = function Dropdown(_ref6) {
  var dropDownOptions = _ref6.dropDownOptions,
    width = _ref6.width;
  var theme = styled.useTheme();
  return /*#__PURE__*/React__default["default"].createElement(DropdownWrapper, {
    $width: width
  }, dropDownOptions.map(function (option) {
    return /*#__PURE__*/React__default["default"].createElement(DropdownRow, {
      key: option.displayText,
      onClick: option.onClick
    }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
      lineHeight: "24px"
    }, option.displayText), option.isSelected && /*#__PURE__*/React__default["default"].createElement(reactFeather.Check, {
      height: 20,
      width: 20,
      color: theme.accent1
    }));
  }));
};

exports.Dropdown = Dropdown;
