'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../Column/index.cjs');
var index$1 = require('../Common/index.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index$2 = require('../../theme/components/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var Menu = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  overflow: auto;\n  margin-top: 4px;\n  padding: 14px 16px 16px;\n  ", "\n  ::-webkit-scrollbar-track {\n    margin-top: 40px;\n  }\n"])), index$1.ScrollBarStyles);
var Title = styled__default["default"].span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n"])));
var StyledArrow = styled__default["default"](reactFeather.ArrowLeft)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), index$2.ClickableStyle);
var Header = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n\n  display: flex;\n  justify-content: space-between;\n  position: relative;\n  width: 100%;\n  margin-bottom: 20px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var SlideOutMenu = function SlideOutMenu(_ref2) {
  var children = _ref2.children,
    onClose = _ref2.onClose,
    title = _ref2.title;
  return /*#__PURE__*/React__default["default"].createElement(Menu, null, /*#__PURE__*/React__default["default"].createElement(Header, null, /*#__PURE__*/React__default["default"].createElement(StyledArrow, {
    "data-testid": "wallet-back",
    onClick: onClose,
    size: 24
  }), /*#__PURE__*/React__default["default"].createElement(Title, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, title))), children);
};

exports.SlideOutMenu = SlideOutMenu;
