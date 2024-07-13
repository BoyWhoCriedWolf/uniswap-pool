'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../Button/index.cjs');
var index$1 = require('../Row/index.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var Button = styled__default["default"](index.ButtonOutlined).attrs(function () {
  return {
    padding: "6px",
    $borderRadius: "8px"
  };
})(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  flex: 1;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
function PresetsButtons(_ref2) {
  var onSetFullRange = _ref2.onSetFullRange;
  return /*#__PURE__*/React__default["default"].createElement(index$1.AutoRow, {
    gap: "4px",
    width: "auto"
  }, /*#__PURE__*/React__default["default"].createElement(Button, {
    "data-testid": "set-full-range",
    onClick: onSetFullRange
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedBody, {
    fontSize: 12
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "5IHTSS",
    message: "Full range"
  }))));
}

module.exports = PresetsButtons;
