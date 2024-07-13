'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var tokenSafety = require('../../constants/tokenSafety.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var WarningContainer = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  margin-left: 4px;\n  display: flex;\n  justify-content: center;\n"])));
var WarningIconStyle = styled.css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  width: ", ";\n  height: ", ";\n"])), function (_ref) {
  var size = _ref.size;
  return size !== null && size !== void 0 ? size : "1em";
}, function (_ref2) {
  var size = _ref2.size;
  return size !== null && size !== void 0 ? size : "1em";
});
var WarningIcon = styled__default["default"](reactFeather.AlertTriangle)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  color: ", ";\n"])), WarningIconStyle, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral3;
});
var BlockedIcon = styled__default["default"](reactFeather.Slash)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  ", "\n  color: ", ";\n"])), WarningIconStyle, function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral2;
});
function TokenSafetyIcon(_ref5) {
  var warning = _ref5.warning;
  switch (warning === null || warning === void 0 ? void 0 : warning.level) {
    case tokenSafety.WARNING_LEVEL.BLOCKED:
      return /*#__PURE__*/React__default["default"].createElement(WarningContainer, null, /*#__PURE__*/React__default["default"].createElement(BlockedIcon, {
        "data-cy": "blocked-icon",
        strokeWidth: 2.5
      }));
    case tokenSafety.WARNING_LEVEL.UNKNOWN:
      return /*#__PURE__*/React__default["default"].createElement(WarningContainer, null, /*#__PURE__*/React__default["default"].createElement(WarningIcon, null));
    default:
      return null;
  }
}

exports.BlockedIcon = BlockedIcon;
exports["default"] = TokenSafetyIcon;
