'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var CurrencyLogo = require('../../Logo/CurrencyLogo.cjs');
var index = require('../../Row/index.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
require('../../../theme/components/index.cjs');
var formatNumbers = require('../../../utils/formatNumbers.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function TradeSummary(_ref) {
  var trade = _ref.trade;
  var theme = styled.useTheme();
  var _useFormatter = formatNumbers.useFormatter(),
    formatReviewSwapCurrencyAmount = _useFormatter.formatReviewSwapCurrencyAmount;
  return /*#__PURE__*/React__default["default"].createElement(index["default"], {
    gap: "sm",
    justify: "center",
    align: "center"
  }, /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
    currency: trade.inputAmount.currency,
    size: "16px"
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, {
    color: "neutral1"
  }, formatReviewSwapCurrencyAmount(trade.inputAmount), " ", trade.inputAmount.currency.symbol), /*#__PURE__*/React__default["default"].createElement(reactFeather.ArrowRight, {
    color: theme.neutral1,
    size: "12px"
  }), /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
    currency: trade.postTaxOutputAmount.currency,
    size: "16px"
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, {
    color: "neutral1"
  }, formatReviewSwapCurrencyAmount(trade.postTaxOutputAmount), " ", trade.postTaxOutputAmount.currency.symbol));
}

exports.TradeSummary = TradeSummary;
