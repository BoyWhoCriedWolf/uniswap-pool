'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled = require('styled-components');
var zIndex = require('../theme/zIndex.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var BodyWrapper = styled__default["default"].main(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  max-width: ", ";\n  width: 100%;\n  background: ", ";\n  border-radius: 16px;\n  border: 1px solid ", ";\n  margin-top: ", ";\n  margin-left: auto;\n  margin-right: auto;\n  z-index: ", ";\n  font-feature-settings: \"ss01\" on, \"ss02\" on, \"cv01\" on, \"cv03\" on;\n"])), function (_ref) {
  var $maxWidth = _ref.$maxWidth;
  return $maxWidth !== null && $maxWidth !== void 0 ? $maxWidth : "420px";
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface1;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
}, function (_ref4) {
  var $margin = _ref4.$margin;
  return $margin !== null && $margin !== void 0 ? $margin : "1rem";
}, zIndex.Z_INDEX["default"]);

exports.BodyWrapper = BodyWrapper;
