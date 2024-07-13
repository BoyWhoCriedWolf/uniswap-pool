'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../Column/index.cjs');
var index$3 = require('../Row/index.cjs');
var reactFeather = require('react-feather');
var reactRouterDom = require('react-router-dom');
var styled = require('styled-components');
var index$2 = require('../../theme/index.cjs');
var index = require('../../theme/components/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var InternalLinkMenuItem = styled__default["default"](reactRouterDom.Link)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  ", "\n\n  flex: 1;\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  padding: 12px 0;\n  justify-content: space-between;\n  text-decoration: none;\n  color: ", ";\n"])), index.ClickableStyle, function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var MenuColumn = styled__default["default"](index$1.Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  @media screen and (max-width: ", "px) {\n    padding-bottom: 14px;\n  }\n"])), index$2.BREAKPOINTS.sm);
function MenuItem(_ref2) {
  var label = _ref2.label,
    logo = _ref2.logo,
    to = _ref2.to,
    onClick = _ref2.onClick,
    isActive = _ref2.isActive,
    testId = _ref2.testId;
  var theme = styled.useTheme();
  if (!to) return null;
  return /*#__PURE__*/React__default["default"].createElement(InternalLinkMenuItem, {
    onClick: onClick,
    to: to
  }, /*#__PURE__*/React__default["default"].createElement(index$3["default"], {
    gap: "md"
  }, logo && logo, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    "data-testid": testId
  }, label)), isActive && /*#__PURE__*/React__default["default"].createElement(reactFeather.Check, {
    color: theme.accent1,
    opacity: 1,
    size: 20
  }));
}

exports.MenuColumn = MenuColumn;
exports.MenuItem = MenuItem;
