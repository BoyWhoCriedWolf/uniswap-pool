import React__default from 'react';

var _path;
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
var SvgDotLine = function SvgDotLine(props) {
  return /*#__PURE__*/React__default.createElement("svg", _extends({
    height: 35,
    viewBox: "850 0 300 200",
    xmlns: "http://www.w3.org/2000/svg"
  }, props), _path || (_path = /*#__PURE__*/React__default.createElement("path", {
    stroke: "currentColor",
    strokeWidth: 20,
    strokeLinecap: "round",
    strokeDasharray: "1, 45",
    d: "M0 100h3000"
  })));
};

export { SvgDotLine as ReactComponent };
