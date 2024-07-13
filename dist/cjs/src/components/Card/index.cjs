'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styledComponents = require('rebass/styled-components');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var Card = styled__default["default"](styledComponents.Box)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: ", ";\n  padding: ", ";\n  border-radius: ", ";\n  border: ", ";\n"])), function (_ref) {
  var width = _ref.width;
  return width !== null && width !== void 0 ? width : "100%";
}, function (_ref2) {
  var padding = _ref2.padding;
  return padding !== null && padding !== void 0 ? padding : "1rem";
}, function (_ref3) {
  var $borderRadius = _ref3.$borderRadius;
  return $borderRadius !== null && $borderRadius !== void 0 ? $borderRadius : "16px";
}, function (_ref4) {
  var border = _ref4.border;
  return border;
});
var LightCard = styled__default["default"](Card)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  border: 1px solid ", ";\n  background-color: ", ";\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface3;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface2;
});
var GrayCard = styled__default["default"](Card)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.surface2;
});
styled__default["default"](Card)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n"])), function (_ref8) {
  var theme = _ref8.theme;
  return theme.surface3;
});
styled__default["default"](Card)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border: 1px solid ", ";\n"])), function (_ref9) {
  var theme = _ref9.theme;
  return theme.surface1;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.surface3;
});
var OutlineCard = styled__default["default"](Card)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  border: 1px solid ", ";\n  background-color: ", ";\n"])), function (_ref11) {
  var theme = _ref11.theme;
  return theme.surface3;
}, function (_ref12) {
  var theme = _ref12.theme;
  return theme.surface2;
});
var YellowCard = styled__default["default"](Card)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  background-color: rgba(243, 132, 30, 0.05);\n  color: ", ";\n  font-weight: 535;\n"])), function (_ref13) {
  var theme = _ref13.theme;
  return theme.deprecated_yellow3;
});
var BlueCard = styled__default["default"](Card)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  color: ", ";\n  border-radius: 12px;\n"])), function (_ref14) {
  var theme = _ref14.theme;
  return theme.accent2;
}, function (_ref15) {
  var theme = _ref15.theme;
  return theme.accent1;
});

exports.BlueCard = BlueCard;
exports.GrayCard = GrayCard;
exports.LightCard = LightCard;
exports.OutlineCard = OutlineCard;
exports.YellowCard = YellowCard;
exports["default"] = Card;
