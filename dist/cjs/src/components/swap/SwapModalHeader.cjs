'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var index$1 = require('../Column/index.cjs');
var useUSDPrice = require('../../hooks/useUSDPrice.cjs');
var utils = require('../../state/routing/utils.cjs');
var actions = require('../../state/swap/actions.cjs');
var styled = require('styled-components');
var index = require('../../theme/components/index.cjs');
var SwapModalHeaderAmount = require('./SwapModalHeaderAmount.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var Rule = styled__default["default"](index.Divider)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  margin: 16px 2px 24px 2px;\n"])));
var HeaderContainer = styled__default["default"](index$1.AutoColumn)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  margin-top: 16px;\n"])));
function SwapModalHeader(_ref) {
  var trade = _ref.trade,
    inputCurrency = _ref.inputCurrency,
    allowedSlippage = _ref.allowedSlippage;
  var fiatValueInput = useUSDPrice.useUSDPrice(trade.inputAmount);
  var fiatValueOutput = useUSDPrice.useUSDPrice(trade.postTaxOutputAmount);
  return /*#__PURE__*/React__default["default"].createElement(HeaderContainer, {
    gap: "sm"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Column, {
    gap: "lg"
  }, /*#__PURE__*/React__default["default"].createElement(SwapModalHeaderAmount.SwapModalHeaderAmount, {
    field: actions.Field.INPUT,
    label: /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "VAxOSg",
      message: "You pay"
    }),
    amount: trade.inputAmount,
    currency: inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : trade.inputAmount.currency,
    usdAmount: fiatValueInput.data,
    isLoading: utils.isPreviewTrade(trade) && trade.tradeType === sdkCore.TradeType.EXACT_OUTPUT
  }), /*#__PURE__*/React__default["default"].createElement(SwapModalHeaderAmount.SwapModalHeaderAmount, {
    field: actions.Field.OUTPUT,
    label: /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "88cUW+",
      message: "You receive"
    }),
    amount: trade.postTaxOutputAmount,
    currency: trade.outputAmount.currency,
    usdAmount: fiatValueOutput.data,
    isLoading: utils.isPreviewTrade(trade) && trade.tradeType === sdkCore.TradeType.EXACT_INPUT,
    tooltipText: trade.tradeType === sdkCore.TradeType.EXACT_INPUT ? /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "UiY541",
      message: "Output is estimated. You will receive at least <0>{0} {1}</0> or the transaction will revert.",
      values: {
        "0": trade.minimumAmountOut(allowedSlippage).toSignificant(6),
        "1": trade.outputAmount.currency.symbol
      },
      components: {
        "0": /*#__PURE__*/React__default["default"].createElement("b", null)
      }
    })) : /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
      id: "Ud6AQU",
      message: "Input is estimated. You will sell at most <0>{0} {1}</0> or the transaction will revert.",
      values: {
        "0": trade.maximumAmountIn(allowedSlippage).toSignificant(6),
        "1": trade.inputAmount.currency.symbol
      },
      components: {
        "0": /*#__PURE__*/React__default["default"].createElement("b", null)
      }
    }))
  })), /*#__PURE__*/React__default["default"].createElement(Rule, null));
}

module.exports = SwapModalHeader;
