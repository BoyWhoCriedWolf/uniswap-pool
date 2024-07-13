'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../../node_modules/@lingui/react/dist/index.cjs');
var useUSDPrice = require('../../hooks/useUSDPrice.cjs');
var tryParseCurrencyAmount = require('../../lib/utils/tryParseCurrencyAmount.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var StyledPriceContainer = styled__default["default"].button(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  background-color: transparent;\n  border: none;\n  cursor: pointer;\n  align-items: center;\n  justify-content: flex-start;\n  padding: 0;\n  grid-template-columns: 1fr auto;\n  grid-gap: 0.25rem;\n  display: flex;\n  flex-direction: row;\n  text-align: left;\n  flex-wrap: wrap;\n  user-select: text;\n"])));
function TradePrice(_ref) {
  var _price$quoteCurrency, _price$baseCurrency, _price$baseCurrency2, _price$quoteCurrency2, _ref2;
  var price = _ref.price;
  var _useFormatter = formatNumbers.useFormatter(),
    formatNumber = _useFormatter.formatNumber,
    formatPrice = _useFormatter.formatPrice;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    showInverted = _useState2[0],
    setShowInverted = _useState2[1];
  var baseCurrency = price.baseCurrency,
    quoteCurrency = price.quoteCurrency;
  var _useUSDPrice = useUSDPrice.useUSDPrice(tryParseCurrencyAmount("1", showInverted ? baseCurrency : quoteCurrency)),
    usdPrice = _useUSDPrice.data;
  var formattedPrice = React.useMemo(function () {
    try {
      return formatPrice({
        price: showInverted ? price : price.invert(),
        type: formatNumbers.NumberType.TokenTx
      });
    } catch (_unused) {
      return "0";
    }
  }, [formatPrice, price, showInverted]);
  var label = showInverted ? "".concat((_price$quoteCurrency = price.quoteCurrency) === null || _price$quoteCurrency === void 0 ? void 0 : _price$quoteCurrency.symbol) : "".concat((_price$baseCurrency = price.baseCurrency) === null || _price$baseCurrency === void 0 ? void 0 : _price$baseCurrency.symbol, " ");
  var labelInverted = showInverted ? "".concat((_price$baseCurrency2 = price.baseCurrency) === null || _price$baseCurrency2 === void 0 ? void 0 : _price$baseCurrency2.symbol, " ") : "".concat((_price$quoteCurrency2 = price.quoteCurrency) === null || _price$quoteCurrency2 === void 0 ? void 0 : _price$quoteCurrency2.symbol);
  var flipPrice = React.useCallback(function () {
    return setShowInverted(!showInverted);
  }, [setShowInverted, showInverted]);
  var text$1 = "".concat((_ref2 = "1 " + labelInverted + " = " + formattedPrice) !== null && _ref2 !== void 0 ? _ref2 : "-", " ").concat(label);
  return /*#__PURE__*/React__default["default"].createElement(StyledPriceContainer, {
    onClick: function onClick(e) {
      e.stopPropagation(); // dont want this click to affect dropdowns / hovers
      flipPrice();
    },
    title: text$1
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, null, text$1), " ", usdPrice && /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "42bEYn",
    message: "({0})",
    values: {
      "0": formatNumber({
        input: usdPrice,
        type: formatNumbers.NumberType.FiatTokenPrice
      })
    }
  })));
}

module.exports = TradePrice;
