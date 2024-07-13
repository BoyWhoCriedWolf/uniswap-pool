'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../Row/index.cjs');
var loading = require('../Tokens/loading.cjs');
var index$1 = require('../Tooltip/index.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var prices = require('../../utils/prices.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var FiatLoadingBubble = styled__default["default"](loading.LoadingBubble)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  border-radius: 4px;\n  width: 4rem;\n  height: 1rem;\n"])));
function FiatValue(_ref) {
  var fiatValue = _ref.fiatValue,
    priceImpact = _ref.priceImpact;
  var _useFormatter = formatNumbers.useFormatter(),
    formatNumber = _useFormatter.formatNumber,
    formatPriceImpact = _useFormatter.formatPriceImpact;
  var priceImpactColor = React.useMemo(function () {
    if (!priceImpact) return undefined;
    if (priceImpact.lessThan("0")) return "success";
    var severity = prices.warningSeverity(priceImpact);
    if (severity < 1) return "neutral3";
    if (severity < 3) return "deprecated_yellow1";
    return "critical";
  }, [priceImpact]);
  if (fiatValue.isLoading) {
    return /*#__PURE__*/React__default["default"].createElement(FiatLoadingBubble, null);
  }
  return /*#__PURE__*/React__default["default"].createElement(index["default"], {
    gap: "sm"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, fiatValue.data ? formatNumber({
    input: fiatValue.data,
    type: formatNumbers.NumberType.FiatTokenPrice
  }) : /*#__PURE__*/React__default["default"].createElement(index$1.MouseoverTooltip, {
    text: /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "9PI4j7",
      message: "Not enough liquidity to show accurate USD value."
    })
  }, "-")), priceImpact && /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: priceImpactColor
  }, /*#__PURE__*/React__default["default"].createElement(index$1.MouseoverTooltip, {
    text: /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "KaCkzz",
      message: "The estimated difference between the USD values of input and output amounts."
    })
  }, "(", /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "J/hVSQ",
    message: "{0}",
    values: {
      "0": formatPriceImpact(priceImpact)
    }
  }), ")")));
}

exports.FiatValue = FiatValue;
