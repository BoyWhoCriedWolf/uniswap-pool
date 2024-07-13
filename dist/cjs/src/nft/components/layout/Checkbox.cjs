'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var clsx = require('clsx');
var Box = require('../Box.cjs');
var icons = require('../icons.cjs');
var React = require('react');
var Checkbox_css = require('./Checkbox.css.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var clsx__default = /*#__PURE__*/_interopDefaultLegacy(clsx);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var _excluded = ["hovered", "children"];
var Checkbox = function Checkbox(_ref) {
  var hovered = _ref.hovered,
    children = _ref.children,
    props = _objectWithoutProperties__default["default"](_ref, _excluded);
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "label",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    lineHeight: "1"
  }, children, /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    as: "span",
    borderColor: props.checked || hovered ? "accent1" : "neutral2",
    className: Checkbox_css.checkbox,
    background: props.checked ? "accent1" : undefined
    // This element is purely decorative so
    // we hide it for screen readers
    ,
    "aria-hidden": "true"
  }), /*#__PURE__*/React__default["default"].createElement("input", _extends__default["default"]({}, props, {
    className: Checkbox_css.input,
    type: "checkbox"
  })), /*#__PURE__*/React__default["default"].createElement(icons.ApprovedCheckmarkIcon, {
    className: clsx__default["default"](Checkbox_css.checkMark, props.checked && Checkbox_css.checkMarkActive)
  }));
};

exports.Checkbox = Checkbox;
