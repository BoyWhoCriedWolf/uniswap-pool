import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Box } from '../Box.js';
import styled, { keyframes } from 'styled-components';

var _templateObject, _templateObject2;
var dash = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  0% {\n    stroke-dashoffset: 1000;\n  }\n  100% {\n    stroke-dashoffset: 0;\n  }\n"])));
var Circle = styled.circle(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  stroke-dasharray: 1000;\n  stroke-dashoffset: 0;\n  -webkit-animation: ", " linear;\n  animation: ", " linear;\n  animation-duration: 160s;\n  stroke: ", ";\n"])), dash, dash, function (_ref) {
  var theme = _ref.theme;
  return theme.accent1;
});
var TimedLoader = function TimedLoader() {
  var stroke = 1.5;
  return /*#__PURE__*/React__default.createElement(Box, {
    display: "flex",
    position: "absolute"
  }, /*#__PURE__*/React__default.createElement("svg", {
    height: "18px",
    width: "18px"
  }, /*#__PURE__*/React__default.createElement(Circle, {
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

export { TimedLoader };
