import React__default from 'react';
import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Column } from '../Column/index.js';
import CurrencyLogo from '../Logo/CurrencyLogo.js';
import Row from '../Row/index.js';
import { MouseoverTooltip } from '../Tooltip/index.js';
import { useWindowSize } from '../../hooks/useWindowSize.js';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../theme/index.js';
import '../../theme/components/index.js';
import { useFormatter, NumberType } from '../../utils/formatNumbers.js';
import { ThemedText } from '../../theme/components/text.js';

var _excluded = ["children"];
var _templateObject;
var Label = styled(ThemedText.BodySmall)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  cursor: ", ";\n  color: ", ";\n  margin-right: 8px;\n"])), function (_ref) {
  var cursor = _ref.cursor;
  return cursor;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
});
var ResponsiveHeadline = function ResponsiveHeadline(_ref3) {
  var children = _ref3.children,
    textProps = _objectWithoutProperties(_ref3, _excluded);
  var _useWindowSize = useWindowSize(),
    width = _useWindowSize.width;
  if (width && width < BREAKPOINTS.xs) {
    return /*#__PURE__*/React__default.createElement(ThemedText.HeadlineMedium, textProps, children);
  }
  return /*#__PURE__*/React__default.createElement(ThemedText.HeadlineLarge, _extends({
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
  var _useFormatter = useFormatter(),
    formatNumber = _useFormatter.formatNumber,
    formatReviewSwapCurrencyAmount = _useFormatter.formatReviewSwapCurrencyAmount;
  return /*#__PURE__*/React__default.createElement(Row, {
    align: "center",
    justify: "space-between",
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(Column, {
    gap: "xs"
  }, /*#__PURE__*/React__default.createElement(ThemedText.BodySecondary, null, /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: tooltipText,
    disabled: !tooltipText
  }, /*#__PURE__*/React__default.createElement(Label, {
    cursor: "help"
  }, label))), /*#__PURE__*/React__default.createElement(Column, {
    gap: "xs"
  }, /*#__PURE__*/React__default.createElement(ResponsiveHeadline, {
    "data-testid": "".concat(field, "-amount"),
    color: isLoading ? "neutral2" : undefined
  }, formatReviewSwapCurrencyAmount(amount), " ", currency === null || currency === void 0 ? void 0 : currency.symbol), usdAmount && /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, formatNumber({
    input: usdAmount,
    type: NumberType.FiatTokenQuantity
  })))), /*#__PURE__*/React__default.createElement(CurrencyLogo, {
    currency: currency,
    size: "36px"
  }));
}

export { SwapModalHeaderAmount };
