'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var Box = require('../Box.cjs');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var dash = styled.keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  0% {\n    stroke-dashoffset: 1000;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n"])));
var Circle = styled__default["default"].circle(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  stroke-dasharray: 1000;\n  stroke-dashoffset: 0;\n  -webkit-animation: ", " linear;\n  animation: ", " linear;\n  animation-duration: 160s;\n  stroke: ", ";\n"])), dash, dash, function (_ref) {
  var theme = _ref.theme;
  return theme.accent1;
});
var TimedLoader = function TimedLoader() {
  var stroke = 1.5;
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    display: "flex",
    position: "absolute"
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    height: "18px",
    width: "18px"
  }, /*#__PURE__*/React__default["default"].createElement(Circle, {
    strokeWidth: "".concat(stroke),
    strokeLinecap: "round",
    style: {
      transform: "rotate(90deg)",
      transformOrigin: "50% 50%"
    },
    fill: "transparent",
    r: "8px",
    cx: "9px",
    cy: "9px"
  })));
};

exports.TimedLoader = TimedLoader;
