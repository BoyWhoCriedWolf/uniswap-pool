'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled = require('styled-components');
var index = require('../../theme/components/index.cjs');
var openDownloadApp = require('../../utils/openDownloadApp.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var StyledButton = styled__default["default"].button(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  ", "\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  flex-direction: row;\n  gap: 6px;\n  padding: 8px 24px;\n  border: none;\n  white-space: nowrap;\n  background: ", ";\n  border-radius: 12px;\n\n  font-weight: 535;\n  font-size: 14px;\n  line-height: 16px;\n  color: ", ";\n"])), index.ClickableStyle, function (_ref) {
  var theme = _ref.theme,
    branded = _ref.branded;
  return branded ? theme.accent1 : theme.surface3;
}, function (_ref2) {
  var theme = _ref2.theme,
    branded = _ref2.branded;
  return branded ? theme.deprecated_accentTextLightPrimary : theme.neutral1;
});
function BaseButton(_ref3) {
  var onClick = _ref3.onClick,
    branded = _ref3.branded,
    children = _ref3.children;
  return /*#__PURE__*/React__default["default"].createElement(StyledButton, {
    branded: branded,
    onClick: onClick
  }, children);
}

// Launches App Store if on an iOS device, else navigates to Uniswap Wallet microsite
function DownloadButton(_ref4) {
  var onClick = _ref4.onClick,
    _ref4$text = _ref4.text,
    text = _ref4$text === void 0 ? "Download" : _ref4$text,
    element = _ref4.element;
  var onButtonClick = React.useCallback(function () {
    // handles any actions required by the parent, i.e. cancelling wallet connection attempt or dismissing an ad
    onClick === null || onClick === void 0 || onClick();
    openDownloadApp.openDownloadApp({
      element: element
    });
  }, [element, onClick]);
  return /*#__PURE__*/React__default["default"].createElement(BaseButton, {
    branded: true,
    onClick: onButtonClick
  }, text);
}

exports.DownloadButton = DownloadButton;
