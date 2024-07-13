import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { TradeType } from '@uniswap/sdk-core';
import { AutoColumn, Column } from '../Column/index.js';
import { useUSDPrice } from '../../hooks/useUSDPrice.js';
import { isPreviewTrade } from '../../state/routing/utils.js';
import { Field } from '../../state/swap/actions.js';
import styled from 'styled-components';
import { Divider } from '../../theme/components/index.js';
import { SwapModalHeaderAmount } from './SwapModalHeaderAmount.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2;
var Rule = styled(Divider)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin: 16px 2px 24px 2px;\n"])));
var HeaderContainer = styled(AutoColumn)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  margin-top: 16px;\n"])));
function SwapModalHeader(_ref) {
  var trade = _ref.trade,
    inputCurrency = _ref.inputCurrency,
    allowedSlippage = _ref.allowedSlippage;
  var fiatValueInput = useUSDPrice(trade.inputAmount);
  var fiatValueOutput = useUSDPrice(trade.postTaxOutputAmount);
  return /*#__PURE__*/React__default.createElement(HeaderContainer, {
    gap: "sm"
  }, /*#__PURE__*/React__default.createElement(Column, {
    gap: "lg"
  }, /*#__PURE__*/React__default.createElement(SwapModalHeaderAmount, {
    field: Field.INPUT,
    label: /*#__PURE__*/React__default.createElement(Trans, {
      id: "VAxOSg",
      message: "You pay"
    }),
    amount: trade.inputAmount,
    currency: inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : trade.inputAmount.currency,
    usdAmount: fiatValueInput.data,
    isLoading: isPreviewTrade(trade) && trade.tradeType === TradeType.EXACT_OUTPUT
  }), /*#__PURE__*/React__default.createElement(SwapModalHeaderAmount, {
    field: Field.OUTPUT,
    label: /*#__PURE__*/React__default.createElement(Trans, {
      id: "88cUW+",
      message: "You receive"
    }),
    amount: trade.postTaxOutputAmount,
    currency: trade.outputAmount.currency,
    usdAmount: fiatValueOutput.data,
    isLoading: isPreviewTrade(trade) && trade.tradeType === TradeType.EXACT_INPUT,
    tooltipText: trade.tradeType === TradeType.EXACT_INPUT ? /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, null, /*#__PURE__*/React__default.createElement(Trans, {
      id: "UiY541",
      message: "Output is estimated. You will receive at least <0>{0} {1}</0> or the transaction will revert.",
      values: {
        "0": trade.minimumAmountOut(allowedSlippage).toSignificant(6),
        "1": trade.outputAmount.currency.symbol
      },
      components: {
        "0": /*#__PURE__*/React__default.createElement("b", null)
      }
    })) : /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, null, /*#__PURE__*/React__default.createElement(Trans, {
      id: "Ud6AQU",
      message: "Input is estimated. You will sell at most <0>{0} {1}</0> or the transaction will revert.",
      values: {
        "0": trade.maximumAmountIn(allowedSlippage).toSignificant(6),
        "1": trade.inputAmount.currency.symbol
      },
      components: {
        "0": /*#__PURE__*/React__default.createElement("b", null)
      }
    }))
  })), /*#__PURE__*/React__default.createElement(Rule, null));
}

export { SwapModalHeader as default };
