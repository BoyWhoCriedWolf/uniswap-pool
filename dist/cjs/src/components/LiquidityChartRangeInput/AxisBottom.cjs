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
var StyledGroup = styled__default["default"].g(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  line {\n    display: none;\n  }\n\n  text {\n    color: ", ";\n    transform: translateY(5px);\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var Axis = function Axis(_ref2) {
  var axisGenerator = _ref2.axisGenerator;
  var axisRef = function axisRef(axis) {
    axis && d3.select(axis).call(axisGenerator).call(function (g) {
      return g.select(".domain").remove();
    });
  };
  return /*#__PURE__*/React__default["default"].createElement("g", {
    ref: axisRef
  });
};
var AxisBottom = function AxisBottom(_ref3) {
  var xScale = _ref3.xScale,
    innerHeight = _ref3.innerHeight,
    _ref3$offset = _ref3.offset,
    offset = _ref3$offset === void 0 ? 0 : _ref3$offset;
  return React.useMemo(function () {
    return /*#__PURE__*/React__default["default"].createElement(StyledGroup, {
      transform: "translate(0, ".concat(innerHeight + offset, ")")
    }, /*#__PURE__*/React__default["default"].createElement(Axis, {
      axisGenerator: d3.axisBottom(xScale).ticks(6)
    }));
  }, [innerHeight, offset, xScale]);
};

exports.AxisBottom = AxisBottom;
