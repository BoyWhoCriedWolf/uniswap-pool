'use strict';

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../AnimatedDropdown/index.cjs');
var index$1 = require('../Column/index.cjs');
var React = require('react');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index = require('../Row/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
var ButtonContainer = styled__default["default"](index["default"])(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  cursor: pointer;\n  justify-content: flex-end;\n  width: unset;\n"])));
var ExpandIcon = styled__default["default"](reactFeather.ChevronDown)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  transform: ", ";\n  transition: transform ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, function (_ref2) {
  var $isOpen = _ref2.$isOpen;
  return $isOpen ? "rotate(180deg)" : "rotate(0deg)";
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.transition.duration.medium;
});
var Content = styled__default["default"](index$1.Column)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  padding-top: ", ";\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.grids.md;
});
function Expand(_ref5) {
  var header = _ref5.header,
    button = _ref5.button,
    children = _ref5.children,
    testId = _ref5.testId,
    isOpen = _ref5.isOpen,
    onToggle = _ref5.onToggle;
  return /*#__PURE__*/React__default["default"].createElement(index$1.Column, null, /*#__PURE__*/React__default["default"].createElement(index.RowBetween, null, header, /*#__PURE__*/React__default["default"].createElement(ButtonContainer, {
    "data-testid": testId,
    onClick: onToggle,
    "aria-expanded": isOpen
  }, button, /*#__PURE__*/React__default["default"].createElement(ExpandIcon, {
    $isOpen: isOpen
  }))), /*#__PURE__*/React__default["default"].createElement(index$2, {
    open: isOpen
  }, /*#__PURE__*/React__default["default"].createElement(Content, {
    gap: "md"
  }, children)));
}

module.exports = Expand;
