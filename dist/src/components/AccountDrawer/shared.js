import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Column } from '../Column/index.js';
import Row from '../Row/index.js';
import { Check } from 'react-feather';
import { Link } from 'react-router-dom';
import styled, { useTheme } from 'styled-components';
import { BREAKPOINTS } from '../../theme/index.js';
import { ClickableStyle } from '../../theme/components/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2;
var InternalLinkMenuItem = styled(Link)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", "\n\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 12px 0;\n  justify-content: space-between;\n  text-decoration: none;\n  color: ", ";\n"])), ClickableStyle, function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var MenuColumn = styled(Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  @media screen and (max-width: ", "px) {\n    padding-bottom: 14px;\n  }\n"])), BREAKPOINTS.sm);
function MenuItem(_ref2) {
  var label = _ref2.label,
    logo = _ref2.logo,
    to = _ref2.to,
    onClick = _ref2.onClick,
    isActive = _ref2.isActive,
    testId = _ref2.testId;
  var theme = useTheme();
  if (!to) return null;
  return /*#__PURE__*/React__default.createElement(InternalLinkMenuItem, {
    onClick: onClick,
    to: to
  }, /*#__PURE__*/React__default.createElement(Row, {
    gap: "md"
  }, logo && logo, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    "data-testid": testId
  }, label)), isActive && /*#__PURE__*/React__default.createElement(Check, {
    color: theme.accent1,
    opacity: 1,
    size: 20
  }));
}

export { MenuColumn, MenuItem };
