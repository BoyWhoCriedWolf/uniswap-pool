'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var loadingAnimation = styled.keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  0% {\n    background-position: 100% 50%;\n  }\n  100% {\n    background-position: 0% 50%;\n  }\n"])));
var shimmerMixin = styled.css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  animation: ", " 1.5s infinite;\n  animation-fill-mode: both;\n  background: linear-gradient(\n    to left,\n    ", " 25%,\n    ", " 50%,\n    ", " 75%\n  );\n  background-size: 400%;\n  will-change: background-position;\n"])), loadingAnimation, function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface1;
});
var LoadingRows = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  display: grid;\n\n  & > div {\n    ", "\n    border-radius: 12px;\n    height: 2.4em;\n  }\n"])), shimmerMixin);
var LoadingRow = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  ", "\n  border-radius: 12px;\n  height: ", "px;\n  width: ", "px;\n"])), shimmerMixin, function (_ref4) {
  var height = _ref4.height;
  return height;
}, function (_ref5) {
  var width = _ref5.width;
  return width;
});
var loadingOpacityMixin = styled.css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  filter: ", ";\n  opacity: ", ";\n  transition: ", ";\n"])), function (_ref6) {
  var $loading = _ref6.$loading;
  return $loading ? "grayscale(1)" : "none";
}, function (_ref7) {
  var $loading = _ref7.$loading;
  return $loading ? "0.6" : "1";
}, function (_ref8) {
  var $loading = _ref8.$loading,
    theme = _ref8.theme;
  return $loading ? "none" : "opacity ".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
});
var LoadingOpacityContainer = styled__default["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), loadingOpacityMixin);
styled__default["default"].div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  ", "\n  inset: 0;\n  position: absolute;\n"])), shimmerMixin);

exports.LoadingOpacityContainer = LoadingOpacityContainer;
exports.LoadingRow = LoadingRow;
exports.LoadingRows = LoadingRows;
exports.loadingAnimation = loadingAnimation;
exports.loadingOpacityMixin = loadingOpacityMixin;
