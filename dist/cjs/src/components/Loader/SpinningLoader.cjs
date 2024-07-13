'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var StyledPollingDot = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: 8px;\n  height: 8px;\n  min-height: 8px;\n  min-width: 8px;\n  border-radius: 50%;\n  position: relative;\n  background-color: ", ";\n  transition: 250ms ease background-color;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
});
var StyledPolling = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  height: 16px;\n  width: 16px;\n  margin-right: 2px;\n  margin-left: 2px;\n  align-items: center;\n  color: ", ";\n  transition: 250ms ease color;\n  ", "\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral1;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n    display: none;\n  "])));
});
var rotate360 = styled.keyframes(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n"])));
var Spinner = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  animation: ", " 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;\n  transform: translateZ(0);\n  border-top: 1px solid transparent;\n  border-right: 1px solid transparent;\n  border-bottom: 1px solid transparent;\n  border-left: 2px solid ", ";\n  background: transparent;\n  width: 14px;\n  height: 14px;\n  border-radius: 50%;\n  position: relative;\n  transition: 250ms ease border-color;\n  left: -3px;\n  top: -3px;\n"])), rotate360, function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral1;
});
function SpinningLoader() {
  return /*#__PURE__*/React__default["default"].createElement(StyledPolling, null, /*#__PURE__*/React__default["default"].createElement(StyledPollingDot, null, /*#__PURE__*/React__default["default"].createElement(Spinner, null)));
}

module.exports = SpinningLoader;
