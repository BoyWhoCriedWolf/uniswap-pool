'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var rotateAnimation = styled.keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var RotationStyle = styled.css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  animation: 2s ", " linear infinite;\n"])), rotateAnimation);
var StyledSVG = styled__default["default"].svg(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  height: ", ";\n  width: ", ";\n  path {\n    stroke: ", ";\n    background: ", ";\n    fill: ", ";\n  }\n"])), function (_ref) {
  var size = _ref.size;
  return size;
}, function (_ref2) {
  var size = _ref2.size;
  return size;
}, function (_ref3) {
  var stroke = _ref3.stroke;
  return stroke;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral2;
}, function (_ref5) {
  var fill = _ref5.fill;
  return fill;
});
var StyledRotatingSVG = styled__default["default"](StyledSVG)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), RotationStyle);

exports.StyledRotatingSVG = StyledRotatingSVG;
exports.StyledSVG = StyledSVG;
