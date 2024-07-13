'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var d3 = require('d3');
var React = require('react');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var Path = styled__default["default"].path(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  opacity: 0.5;\n  stroke: ", ";\n  fill: ", ";\n"])), function (_ref) {
  var fill = _ref.fill,
    theme = _ref.theme;
  return fill !== null && fill !== void 0 ? fill : theme.accent1;
}, function (_ref2) {
  var fill = _ref2.fill,
    theme = _ref2.theme;
  return fill !== null && fill !== void 0 ? fill : theme.accent1;
});
var Area = function Area(_ref3) {
  var series = _ref3.series,
    xScale = _ref3.xScale,
    yScale = _ref3.yScale,
    xValue = _ref3.xValue,
    yValue = _ref3.yValue,
    fill = _ref3.fill;
  return React.useMemo(function () {
    var _area$curve$x$y1$y;
    return /*#__PURE__*/React__default["default"].createElement(Path, {
      fill: fill,
      d: (_area$curve$x$y1$y = d3.area().curve(d3.curveStepAfter).x(function (d) {
        return xScale(xValue(d));
      }).y1(function (d) {
        return yScale(yValue(d));
      }).y0(yScale(0))(series.filter(function (d) {
        var value = xScale(xValue(d));
        return value > 0 && value <= window.innerWidth;
      }))) !== null && _area$curve$x$y1$y !== void 0 ? _area$curve$x$y1$y : undefined
    });
  }, [fill, series, xScale, xValue, yScale, yValue]);
};

exports.Area = Area;
