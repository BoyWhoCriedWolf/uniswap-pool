import React__default, { useState, useMemo, useCallback } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useUSDPrice } from '../../hooks/useUSDPrice.js';
import tryParseCurrencyAmount from '../../lib/utils/tryParseCurrencyAmount.js';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { useFormatter, NumberType } from '../../utils/formatNumbers.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
var StyledPriceContainer = styled.button(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n  align-items: center;\n  justify-content: flex-start;\n  padding: 0;\n  grid-template-columns: 1fr auto;\n  grid-gap: 0.25rem;\n  display: flex;\n  flex-direction: row;\n  text-align: left;\n  flex-wrap: wrap;\n  user-select: text;\n"])));
function TradePrice(_ref) {
  var _price$quoteCurrency, _price$baseCurrency, _price$baseCurrency2, _price$quoteCurrency2, _ref2;
  var price = _ref.price;
  var _useFormatter = useFormatter(),
    formatNumber = _useFormatter.formatNumber,
    formatPrice = _useFormatter.formatPrice;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showInverted = _useState2[0],
    setShowInverted = _useState2[1];
  var baseCurrency = price.baseCurrency,
    quoteCurrency = price.quoteCurrency;
  var _useUSDPrice = useUSDPrice(tryParseCurrencyAmount("1", showInverted ? baseCurrency : quoteCurrency)),
    usdPrice = _useUSDPrice.data;
  var formattedPrice = useMemo(function () {
    try {
      return formatPrice({
        price: showInverted ? price : price.invert(),
        type: NumberType.TokenTx
      });
    } catch (_unused) {
      return "0";
    }
  }, [formatPrice, price, showInverted]);
  var label = showInverted ? "".concat((_price$quoteCurrency = price.quoteCurrency) === null || _price$quoteCurrency === void 0 ? void 0 : _price$quoteCurrency.symbol) : "".concat((_price$baseCurrency = price.baseCurrency) === null || _price$baseCurrency === void 0 ? void 0 : _price$baseCurrency.symbol, " ");
  var labelInverted = showInverted ? "".concat((_price$baseCurrency2 = price.baseCurrency) === null || _price$baseCurrency2 === void 0 ? void 0 : _price$baseCurrency2.symbol, " ") : "".concat((_price$quoteCurrency2 = price.quoteCurrency) === null || _price$quoteCurrency2 === void 0 ? void 0 : _price$quoteCurrency2.symbol);
  var flipPrice = useCallback(function () {
    return setShowInverted(!showInverted);
  }, [setShowInverted, showInverted]);
  var text = "".concat((_ref2 = "1 " + labelInverted + " = " + formattedPrice) !== null && _ref2 !== void 0 ? _ref2 : "-", " ").concat(label);
  return /*#__PURE__*/React__default.createElement(StyledPriceContainer, {
    onClick: function onClick(e) {
      e.stopPropagation(); // dont want this click to affect dropdowns / hovers
      flipPrice();
    },
    title: text
  }, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, null, text), " ", usdPrice && /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "42bEYn",
    message: "({0})",
    values: {
      "0": formatNumber({
        input: usdPrice,
        type: NumberType.FiatTokenPrice
      })
    }
  })));
}

export { TradePrice as default };
