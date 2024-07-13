'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var useTokenWarningColor = require('../../hooks/useTokenWarningColor.cjs');
var reactFeather = require('react-feather');
var rebass = require('rebass');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var Label = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 4px 4px;\n  font-size: 12px;\n  background-color: ", ";\n  border-radius: 8px;\n  color: ", ";\n  display: inline-flex;\n  align-items: center;\n"])), function (_ref) {
  var backgroundColor = _ref.backgroundColor;
  return backgroundColor;
}, function (_ref2) {
  var color = _ref2.color;
  return color;
});
var Title = styled__default["default"](rebass.Text)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  margin-right: 5px;\n  font-weight: 535;\n  font-size: 12px;\n"])));
function TokenSafetyLabel(_ref3) {
  var level = _ref3.level,
    canProceed = _ref3.canProceed,
    children = _ref3.children;
  return /*#__PURE__*/React__default["default"].createElement(Label, {
    color: useTokenWarningColor.useTokenWarningTextColor(level),
    backgroundColor: useTokenWarningColor.useTokenWarningColor(level)
  }, /*#__PURE__*/React__default["default"].createElement(Title, {
    marginRight: "5px"
  }, children), canProceed ? /*#__PURE__*/React__default["default"].createElement(reactFeather.AlertTriangle, {
    strokeWidth: 2.5,
    size: "14px"
  }) : /*#__PURE__*/React__default["default"].createElement(reactFeather.Slash, {
    strokeWidth: 2.5,
    size: "14px"
  }));
}

module.exports = TokenSafetyLabel;
