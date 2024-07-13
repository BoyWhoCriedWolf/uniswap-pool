'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled$1 = require('../Loader/styled.cjs');
var polished = require('polished');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;

/* Loading state bubbles (animation style from: src/components/Loader/styled.tsx) */
var LoadingBubble = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  border-radius: 12px;\n  border-radius: ", ";\n  ", ";\n  height: ", ";\n  width: 50%;\n  width: ", ";\n  animation: ", " 1.5s infinite;\n  ", "\n  animation-fill-mode: both;\n  background: linear-gradient(\n    to left,\n    ", " 25%,\n    ", " 50%,\n    ", " 75%\n  );\n  will-change: background-position;\n  background-size: 400%;\n"])), function (_ref) {
  var round = _ref.round;
  return round ? "50%" : "12px";
}, function (_ref2) {
  var margin = _ref2.margin;
  return margin && "margin: ".concat(margin);
}, function (_ref3) {
  var height = _ref3.height;
  return height !== null && height !== void 0 ? height : "24px";
}, function (_ref4) {
  var width = _ref4.width;
  return width !== null && width !== void 0 ? width : "50%";
}, styled$1.loadingAnimation, function (_ref5) {
  var delay = _ref5.delay;
  return delay && "animation-delay: ".concat(delay, ";");
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface3;
}, function (_ref7) {
  var theme = _ref7.theme;
  return polished.lighten(0.075, theme.surface3);
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.surface3;
});

exports.LoadingBubble = LoadingBubble;
