'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../components/Column/index.cjs');
var index$1 = require('../../components/PositionPreview/index.cjs');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var Wrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding-top: 12px;\n"])));
function Review(_ref) {
  var position = _ref.position,
    outOfRange = _ref.outOfRange,
    ticksAtLimit = _ref.ticksAtLimit;
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "lg"
  }, position ? /*#__PURE__*/React__default["default"].createElement(index$1.PositionPreview, {
    position: position,
    inRange: !outOfRange,
    ticksAtLimit: ticksAtLimit,
    title: "Selected Range"
  }) : null));
}

exports.Review = Review;
