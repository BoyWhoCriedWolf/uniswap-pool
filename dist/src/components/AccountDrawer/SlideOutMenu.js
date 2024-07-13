import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Column } from '../Column/index.js';
import { ScrollBarStyles } from '../Common/index.js';
import { ArrowLeft } from 'react-feather';
import styled from 'styled-components';
import { ClickableStyle } from '../../theme/components/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var Menu = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  overflow: auto;\n  margin-top: 4px;\n  padding: 14px 16px 16px;\n  ", "\n  ::-webkit-scrollbar-track {\n    margin-top: 40px;\n  }\n"])), ScrollBarStyles);
var Title = styled.span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n"])));
var StyledArrow = styled(ArrowLeft)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  ", "\n"])), ClickableStyle);
var Header = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  color: ", ";\n\n  display: flex;\n  justify-content: space-between;\n  position: relative;\n  width: 100%;\n  margin-bottom: 20px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var SlideOutMenu = function SlideOutMenu(_ref2) {
  var children = _ref2.children,
    onClose = _ref2.onClose,
    title = _ref2.title;
  return /*#__PURE__*/React__default.createElement(Menu, null, /*#__PURE__*/React__default.createElement(Header, null, /*#__PURE__*/React__default.createElement(StyledArrow, {
    "data-testid": "wallet-back",
    onClick: onClose,
    size: 24
  }), /*#__PURE__*/React__default.createElement(Title, null, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, title))), children);
};

export { SlideOutMenu };
