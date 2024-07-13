import React__default, { forwardRef } from 'react';
import _extends from '@babel/runtime/helpers/extends';
import { Box } from './Box.js';

var Row = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default.createElement(Box, _extends({
    ref: ref,
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }, props));
});
Row.displayName = "Row";
var Column = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default.createElement(Box, _extends({
    ref: ref,
    display: "flex",
    flexDirection: "column"
  }, props));
});
Column.displayName = "Column";
var Center = /*#__PURE__*/forwardRef(function (props, ref) {
  return /*#__PURE__*/React__default.createElement(Box, _extends({
    ref: ref,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }, props));
});
Center.displayName = "Center";

export { Center, Column, Row };
