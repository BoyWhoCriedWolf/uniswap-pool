import React__default from 'react';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { TradeType } from '@uniswap/sdk-core';
import { Column } from '../Column/index.js';
import { RowBetween } from '../Row/index.js';
import { Separator, ExternalLink } from '../../theme/components/index.js';
import { useFormatter, NumberType } from '../../utils/formatNumbers.js';
import { ThemedText } from '../../theme/components/text.js';

var ExactInMessage = function ExactInMessage(_ref) {
  var amount = _ref.amount;
  return /*#__PURE__*/React__default.createElement(Trans, {
    id: "VeG4w4",
    message: "If the price moves so that you will receive less than {amount}, your transaction will be reverted. This is the minimum amount you are guaranteed to receive.",
    values: {
      amount: amount
    }
  });
};
var ExactOutMessage = function ExactOutMessage(_ref2) {
  var amount = _ref2.amount;
  return /*#__PURE__*/React__default.createElement(Trans, {
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
  return /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(ThemedText.Caption, {
    color: "neutral1"
  }, isExactIn ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "FfY0F3",
    message: "Receive at least"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "AP0x+f",
    message: "Pay at most"
  })), /*#__PURE__*/React__default.createElement(ThemedText.Caption, {
    color: "neutral1"
  }, amount));
}
function MaxSlippageTooltip(_ref4) {
  var trade = _ref4.trade,
    allowedSlippage = _ref4.allowedSlippage;
  var isExactIn = trade.tradeType === TradeType.EXACT_INPUT;
  var amount = isExactIn ? trade.minimumAmountOut(allowedSlippage) : trade.maximumAmountIn(allowedSlippage);
  var formattedAmount = useFormatter().formatCurrencyAmount({
    amount: amount,
    type: NumberType.SwapDetailsAmount
  });
  var displayAmount = "".concat(formattedAmount, " ").concat(amount.currency.symbol);
  return /*#__PURE__*/React__default.createElement(Column, {
    gap: "xs"
  }, /*#__PURE__*/React__default.createElement(SlippageHeader, {
    amount: displayAmount,
    isExactIn: isExactIn
  }), /*#__PURE__*/React__default.createElement(Separator, null), /*#__PURE__*/React__default.createElement("div", null, isExactIn ? /*#__PURE__*/React__default.createElement(ExactInMessage, {
    amount: displayAmount
  }) : /*#__PURE__*/React__default.createElement(ExactOutMessage, {
    amount: displayAmount
  }), " ", /*#__PURE__*/React__default.createElement(ExternalLink, {
    href: "https://support.uniswap.org/hc/en-us/articles/8643879653261-What-is-Price-Slippage-"
  }, "Learn more")));
}

export { MaxSlippageTooltip };
