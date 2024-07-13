import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import AnimatedDropdown from '../AnimatedDropdown/index.js';
import { Column } from '../Column/index.js';
import React__default from 'react';
import { ChevronDown } from 'react-feather';
import styled from 'styled-components';
import Row, { RowBetween } from '../Row/index.js';

var _templateObject, _templateObject2, _templateObject3;
var ButtonContainer = styled(Row)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  cursor: pointer;\n  justify-content: flex-end;\n  width: unset;\n"])));
var ExpandIcon = styled(ChevronDown)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  color: ", ";\n  transform: ", ";\n  transition: transform ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, function (_ref2) {
  var $isOpen = _ref2.$isOpen;
  return $isOpen ? "rotate(180deg)" : "rotate(0deg)";
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.transition.duration.medium;
});
var Content = styled(Column)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  padding-top: ", ";\n"])), function (_ref4) {
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
  return /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(RowBetween, null, header, /*#__PURE__*/React__default.createElement(ButtonContainer, {
    "data-testid": testId,
    onClick: onToggle,
    "aria-expanded": isOpen
  }, button, /*#__PURE__*/React__default.createElement(ExpandIcon, {
    $isOpen: isOpen
  }))), /*#__PURE__*/React__default.createElement(AnimatedDropdown, {
    open: isOpen
  }, /*#__PURE__*/React__default.createElement(Content, {
    gap: "md"
  }, children)));
}

export { Expand as default };
