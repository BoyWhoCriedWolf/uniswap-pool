'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var Wrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  height: 90px;\n  width: 90px;\n"])));
var dash = styled.keyframes(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  0% {\n    stroke-dashoffset: 1000;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n"])));
var dashCheck = styled.keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  0% {\n    stroke-dashoffset: -100;\n  }\n  100% {\n    stroke-dashoffset: 900;\n  }\n"])));
var Circle = styled__default["default"].circle(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  stroke-dasharray: 1000;\n  stroke-dashoffset: 0;\n  -webkit-animation: ", " 0.9s ease-in-out;\n  animation: ", " 0.9s ease-in-out;\n"])), dash, dash);
var PolyLine = styled__default["default"].polyline(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  stroke-dasharray: 1000;\n  stroke-dashoffset: 0;\n  stroke-dashoffset: -100;\n  -webkit-animation: ", " 0.9s 0.35s ease-in-out forwards;\n  animation: ", " 0.9s 0.35s ease-in-out forwards;\n"])), dashCheck, dashCheck);
function AnimatedConfirmation(_ref) {
  var className = _ref.className;
  var theme = styled.useTheme();
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, {
    className: className,
    "data-testid": "animated-confirmation"
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    version: "1.1",
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 130.2 130.2"
  }, /*#__PURE__*/React__default["default"].createElement(Circle, {
    className: "path circle",
    fill: "none",
    stroke: theme.success,
    strokeWidth: "6",
    strokeMiterlimit: "10",
    cx: "65.1",
    cy: "65.1",
    r: "62.1"
  }), /*#__PURE__*/React__default["default"].createElement(PolyLine, {
    className: "path check",
    fill: "none",
    stroke: theme.success,
    strokeWidth: "6",
    strokeLinecap: "round",
    strokeMiterlimit: "10",
    points: "100.2,40.2 51.5,88.8 29.8,67.5 "
  })));
}

module.exports = AnimatedConfirmation;
