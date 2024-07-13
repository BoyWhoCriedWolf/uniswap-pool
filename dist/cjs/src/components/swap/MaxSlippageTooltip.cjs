'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var index = require('../Column/index.cjs');
var index$3 = require('../Row/index.cjs');
var index$1 = require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ExactInMessage = function ExactInMessage(_ref) {
  var amount = _ref.amount;
  return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "VeG4w4",
    message: "If the price moves so that you will receive less than {amount}, your transaction will be reverted. This is the minimum amount you are guaranteed to receive.",
    values: {
      amount: amount
    }
  });
};
var ExactOutMessage = function ExactOutMessage(_ref2) {
  var amount = _ref2.amount;
  return /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "F0MUBv",
    message: "If the price moves so that you will pay more than {amount}, your transaction will be reverted. This is the maximum amount you are guaranteed to pay.",
    values: {
      amount: amount
    }
  });
};
function SlippageHeader(_ref3) {
  var amount = _ref3.amount,
    isExactIn = _ref3.isExactIn;
  return /*#__PURE__*/React__default["default"].createElement(index$3.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.Caption, {
    color: "neutral1"
  }, isExactIn ? /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "FfY0F3",
    message: "Receive at least"
  }) : /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "AP0x+f",
    message: "Pay at most"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.Caption, {
    color: "neutral1"
  }, amount));
}
function MaxSlippageTooltip(_ref4) {
  var trade = _ref4.trade,
    allowedSlippage = _ref4.allowedSlippage;
  var isExactIn = trade.tradeType === sdkCore.TradeType.EXACT_INPUT;
  var amount = isExactIn ? trade.minimumAmountOut(allowedSlippage) : trade.maximumAmountIn(allowedSlippage);
  var formattedAmount = formatNumbers.useFormatter().formatCurrencyAmount({
    amount: amount,
    type: formatNumbers.NumberType.SwapDetailsAmount
  });
  var displayAmount = "".concat(formattedAmount, " ").concat(amount.currency.symbol);
  return /*#__PURE__*/React__default["default"].createElement(index.Column, {
    gap: "xs"
  }, /*#__PURE__*/React__default["default"].createElement(SlippageHeader, {
    amount: displayAmount,
    isExactIn: isExactIn
  }), /*#__PURE__*/React__default["default"].createElement(index$1.Separator, null), /*#__PURE__*/React__default["default"].createElement("div", null, isExactIn ? /*#__PURE__*/React__default["default"].createElement(ExactInMessage, {
    amount: displayAmount
  }) : /*#__PURE__*/React__default["default"].createElement(ExactOutMessage, {
    amount: displayAmount
  }), " ", /*#__PURE__*/React__default["default"].createElement(index$1.ExternalLink, {
    href: "https://support.uniswap.org/hc/en-us/articles/8643879653261-What-is-Price-Slippage-"
  }, "Learn more")));
}

exports.MaxSlippageTooltip = MaxSlippageTooltip;
