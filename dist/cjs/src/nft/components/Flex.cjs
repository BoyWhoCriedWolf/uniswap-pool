'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var Box = require('./Box.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

var Row = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, _extends__default["default"]({
    ref: ref,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }, props));
});
Row.displayName = "Row";
var Column = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, _extends__default["default"]({
    ref: ref,
    display: "flex",
    flexDirection: "column"
  }, props));
});
Column.displayName = "Column";
var Center = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, _extends__default["default"]({
    ref: ref,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, props));
});
Center.displayName = "Center";

exports.Center = Center;
exports.Column = Column;
exports.Row = Row;
