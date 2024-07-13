'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var React = require('react');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var StyledLine = styled__default["default"].line(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  opacity: 0.5;\n  stroke-width: 2;\n  stroke: ", ";\n  fill: none;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var Line = function Line(_ref2) {
  var value = _ref2.value,
    xScale = _ref2.xScale,
    innerHeight = _ref2.innerHeight;
  return React.useMemo(function () {
    return /*#__PURE__*/React__default["default"].createElement(StyledLine, {
      x1: xScale(value),
      y1: "0",
      x2: xScale(value),
      y2: innerHeight
    });
  }, [value, xScale, innerHeight]);
};

exports.Line = Line;
