import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { AutoColumn } from '../Column/index.js';
import UniswapXRouterLabel, { UniswapXGradient as Gradient } from '../RouterLabel/UniswapXRouterLabel.js';
import Row from '../Row/index.js';
import { nativeOnChain } from '../../constants/tokens.js';
import { isUniswapXTrade, isPreviewTrade } from '../../state/routing/utils.js';
import styled from 'styled-components';
import { Divider, ExternalLink } from '../../theme/components/index.js';
import { useFormatter, NumberType } from '../../utils/formatNumbers.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2;
var Container = styled(AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 4px;\n"])));
var GasCostItem = function GasCostItem(_ref) {
  var title = _ref.title,
    amount = _ref.amount,
    itemValue = _ref.itemValue;
  var _useFormatter = useFormatter(),
    formatNumber = _useFormatter.formatNumber;
  if (!amount && !itemValue) return null;
  var value = itemValue !== null && itemValue !== void 0 ? itemValue : formatNumber({
    input: amount,
    type: NumberType.FiatGasPrice
  });
  return /*#__PURE__*/React__default.createElement(Row, {
    justify: "space-between"
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, null, title), /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, {
    color: "neutral1"
  }, value));
};
var GaslessSwapLabel = function GaslessSwapLabel() {
  return /*#__PURE__*/React__default.createElement(UniswapXRouterLabel, null, "$0");
};
function GasBreakdownTooltip(_ref2) {
  var trade = _ref2.trade,
    hideUniswapXDescription = _ref2.hideUniswapXDescription;
  var isUniswapX = isUniswapXTrade(trade);
  var inputCurrency = trade.inputAmount.currency;
  var _native = nativeOnChain(inputCurrency.chainId);
  if (isPreviewTrade(trade)) return /*#__PURE__*/React__default.createElement(NetworkFeesDescription, {
    "native": _native
  });
  var swapEstimate = !isUniswapX ? trade.gasUseEstimateUSD : undefined;
  var approvalEstimate = trade.approveInfo.needsApprove ? trade.approveInfo.approveGasEstimateUSD : undefined;
  var wrapEstimate = isUniswapX && trade.wrapInfo.needsWrap ? trade.wrapInfo.wrapGasEstimateUSD : undefined;
  var showEstimateDetails = Boolean(wrapEstimate || approvalEstimate);
  var description = isUniswapX && !hideUniswapXDescription ? /*#__PURE__*/React__default.createElement(UniswapXDescription, null) : /*#__PURE__*/React__default.createElement(NetworkFeesDescription, {
    "native": _native
  });
  if (!showEstimateDetails) return description;
  return /*#__PURE__*/React__default.createElement(Container, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "sm"
  }, /*#__PURE__*/React__default.createElement(GasCostItem, {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "TcQyzp",
      message: "Wrap {0}",
      values: {
        "0": _native.symbol
      }
    }),
    amount: wrapEstimate
  }), /*#__PURE__*/React__default.createElement(GasCostItem, {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "4mlgel",
      message: "Allow {0} (one time)",
      values: {
        "0": inputCurrency.symbol
      }
    }),
    amount: approvalEstimate
  }), /*#__PURE__*/React__default.createElement(GasCostItem, {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "vH2C/2",
      message: "Swap"
    }),
    amount: swapEstimate
  }), isUniswapX && /*#__PURE__*/React__default.createElement(GasCostItem, {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "vH2C/2",
      message: "Swap"
    }),
    itemValue: /*#__PURE__*/React__default.createElement(GaslessSwapLabel, null)
  })), /*#__PURE__*/React__default.createElement(Divider, null), description);
}
function NetworkFeesDescription(_ref3) {
  var _native2 = _ref3["native"];
  return /*#__PURE__*/React__default.createElement(ThemedText.LabelMicro, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "whosFZ",
    message: "The fee paid to the Ethereum network to process your transaction. This must be paid in {0}.",
    values: {
      "0": _native2.symbol
    }
  }), " ", /*#__PURE__*/React__default.createElement(ExternalLink, {
    href: "https://support.uniswap.org/hc/en-us/articles/8370337377805-What-is-a-network-fee-"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "zwWKhA",
    message: "Learn more"
  })));
}
var InlineUniswapXGradient = styled(Gradient)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: inline;\n"])));
function UniswapXDescription() {
  return /*#__PURE__*/React__default.createElement(ThemedText.Caption, {
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "U7g2v8",
    message: "<0>UniswapX</0> aggregates liquidity sources for better prices and gas free swaps.",
    components: {
      "0": /*#__PURE__*/React__default.createElement(InlineUniswapXGradient, null)
    }
  }), " ", /*#__PURE__*/React__default.createElement(ExternalLink, {
    href: "https://support.uniswap.org/hc/en-us/articles/17515415311501"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "zwWKhA",
    message: "Learn more"
  })));
}

export { GasBreakdownTooltip, UniswapXDescription };
