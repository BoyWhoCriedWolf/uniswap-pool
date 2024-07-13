'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../Column/index.cjs');
var CurrencyLogo = require('../Logo/CurrencyLogo.cjs');
var index = require('../Row/index.cjs');
var index$2 = require('../Tooltip/index.cjs');
var useWindowSize = require('../../hooks/useWindowSize.cjs');
var styled = require('styled-components');
var index$3 = require('../../theme/index.cjs');
require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _excluded = ["children"];
var _templateObject;
var Label = styled__default["default"](text.ThemedText.BodySmall)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  cursor: ", ";\n  color: ", ";\n  margin-right: 8px;\n"])), function (_ref) {
  var cursor = _ref.cursor;
  return cursor;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
});
var ResponsiveHeadline = function ResponsiveHeadline(_ref3) {
  var children = _ref3.children,
    textProps = _objectWithoutProperties__default["default"](_ref3, _excluded);
  var _useWindowSize = useWindowSize.useWindowSize(),
    width = _useWindowSize.width;
  if (width && width < index$3.BREAKPOINTS.xs) {
    return /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineMedium, textProps, children);
  }
  return /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineLarge, _extends__default["default"]({
    fontWeight: 535
  }, textProps), children);
};
function SwapModalHeaderAmount(_ref4) {
  var tooltipText = _ref4.tooltipText,
    label = _ref4.label,
    amount = _ref4.amount,
    usdAmount = _ref4.usdAmount,
    field = _ref4.field,
    currency = _ref4.currency,
    isLoading = _ref4.isLoading;
  var _useFormatter = formatNumbers.useFormatter(),
    formatNumber = _useFormatter.formatNumber,
    formatReviewSwapCurrencyAmount = _useFormatter.formatReviewSwapCurrencyAmount;
  return /*#__PURE__*/React__default["default"].createElement(index["default"], {
    align: "center",
    justify: "space-between",
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Column, {
    gap: "xs"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySecondary, null, /*#__PURE__*/React__default["default"].createElement(index$2.MouseoverTooltip, {
    text: tooltipText,
    disabled: !tooltipText
  }, /*#__PURE__*/React__default["default"].createElement(Label, {
    cursor: "help"
  }, label))), /*#__PURE__*/React__default["default"].createElement(index$1.Column, {
    gap: "xs"
  }, /*#__PURE__*/React__default["default"].createElement(ResponsiveHeadline, {
    "data-testid": "".concat(field, "-amount"),
    color: isLoading ? "neutral2" : undefined
  }, formatReviewSwapCurrencyAmount(amount), " ", currency === null || currency === void 0 ? void 0 : currency.symbol), usdAmount && /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, formatNumber({
    input: usdAmount,
    type: formatNumbers.NumberType.FiatTokenQuantity
  })))), /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
    currency: currency,
    size: "36px"
  }));
}

exports.SwapModalHeaderAmount = SwapModalHeaderAmount;
