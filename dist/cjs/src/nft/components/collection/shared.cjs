'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var ClearAllButton = styled__default["default"].button(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  padding-left: 8px;\n  padding-right: 8px;\n  font-size: 14px;\n  font-weight: 535;\n  border: none;\n  cursor: pointer;\n  background: none;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral3;
});

exports.ClearAllButton = ClearAllButton;
