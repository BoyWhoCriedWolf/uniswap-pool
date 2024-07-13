'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var slideIn = styled.keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  from { opacity: 0; transform: translateX(40px) }\n  to { opacity: 1; transform: translateX(0px) }\n"])));
var slideInAnimation = styled.css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  animation: ", "\n    ", ";\n"])), slideIn, function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
});
var slideOut = styled.keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  from { opacity: 1; transform: translateX(0px) }\n  to { opacity: 0; transform: translateX(-40px) }\n"])));
var slideOutAnimation = styled.css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  animation: ", "\n    ", ";\n"])), slideOut, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
});

exports.slideInAnimation = slideInAnimation;
exports.slideOutAnimation = slideOutAnimation;
