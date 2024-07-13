import React__default from 'react';
import CurrencyLogo from '../../Logo/CurrencyLogo.js';
import Row from '../../Row/index.js';
import { ArrowRight } from 'react-feather';
import { useTheme } from 'styled-components';
import '../../../theme/components/index.js';
import { useFormatter } from '../../../utils/formatNumbers.js';
import { ThemedText } from '../../../theme/components/text.js';

function TradeSummary(_ref) {
  var trade = _ref.trade;
  var theme = useTheme();
  var _useFormatter = useFormatter(),
    formatReviewSwapCurrencyAmount = _useFormatter.formatReviewSwapCurrencyAmount;
  return /*#__PURE__*/React__default.createElement(Row, {
    gap: "sm",
    justify: "center",
    align: "center"
  }, /*#__PURE__*/React__default.createElement(CurrencyLogo, {
    currency: trade.inputAmount.currency,
    size: "16px"
  }), /*#__PURE__*/React__default.createElement(ThemedText.LabelSmall, {
    color: "neutral1"
  }, formatReviewSwapCurrencyAmount(trade.inputAmount), " ", trade.inputAmount.currency.symbol), /*#__PURE__*/React__default.createElement(ArrowRight, {
    color: theme.neutral1,
    size: "12px"
  }), /*#__PURE__*/React__default.createElement(CurrencyLogo, {
    currency: trade.postTaxOutputAmount.currency,
    size: "16px"
  }), /*#__PURE__*/React__default.createElement(ThemedText.LabelSmall, {
    color: "neutral1"
  }, formatReviewSwapCurrencyAmount(trade.postTaxOutputAmount), " ", trade.postTaxOutputAmount.currency.symbol));
}

export { TradeSummary };
