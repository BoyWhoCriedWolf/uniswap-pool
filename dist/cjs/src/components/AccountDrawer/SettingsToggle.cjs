'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../Column/index.cjs');
var index$1 = require('../Row/index.cjs');
var index$2 = require('../Toggle/index.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var StyledColumn = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  margin-right: 10px;\n"])));
function SettingsToggle(_ref) {
  var title = _ref.title,
    description = _ref.description,
    dataid = _ref.dataid,
    isActive = _ref.isActive,
    toggle = _ref.toggle;
  return /*#__PURE__*/React__default["default"].createElement(index$1["default"], {
    align: "center"
  }, /*#__PURE__*/React__default["default"].createElement(StyledColumn, null, /*#__PURE__*/React__default["default"].createElement(index$1["default"], null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, {
    color: "neutral1"
  }, title)), description && /*#__PURE__*/React__default["default"].createElement(index$1["default"], null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2",
    lineHeight: "16px"
  }, description))), /*#__PURE__*/React__default["default"].createElement(index$2, {
    id: dataid,
    isActive: isActive,
    toggle: toggle
  }));
}

exports.SettingsToggle = SettingsToggle;
