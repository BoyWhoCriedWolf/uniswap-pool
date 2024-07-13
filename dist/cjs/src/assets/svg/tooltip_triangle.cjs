'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var SvgTooltipTriangle = function SvgTooltipTriangle(props) {
  return /*#__PURE__*/React__default["default"].createElement("svg", _extends({
    width: 12,
    height: 7,
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M4.4 1.133a2 2 0 0 1 3.2 0L12 7H0l4.4-5.867Z",
    fill: "#0D0E0E"
  })));
};

exports.ReactComponent = SvgTooltipTriangle;
