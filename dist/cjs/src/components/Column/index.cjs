'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
var Column = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: column;\n  justify-content: flex-start;\n  gap: ", ";\n"])), function (_ref) {
  var gap = _ref.gap,
    theme = _ref.theme;
  return gap && theme.grids[gap];
});
var ColumnCenter = styled__default["default"](Column)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  align-items: center;\n"])));
var AutoColumn = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  display: grid;\n  grid-auto-rows: auto;\n  grid-row-gap: ", ";\n  justify-items: ", ";\n  flex-grow: ", ";\n"])), function (_ref2) {
  var gap = _ref2.gap,
    theme = _ref2.theme;
  return gap && theme.grids[gap] || gap;
}, function (_ref3) {
  var justify = _ref3.justify;
  return justify && justify;
}, function (_ref4) {
  var grow = _ref4.grow;
  return grow && 1;
});

exports.AutoColumn = AutoColumn;
exports.Column = Column;
exports.ColumnCenter = ColumnCenter;
exports["default"] = Column;
