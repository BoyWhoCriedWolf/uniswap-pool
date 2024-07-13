'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../Column/index.cjs');
var UniswapXRouterLabel = require('../RouterLabel/UniswapXRouterLabel.cjs');
var index$3 = require('../Row/index.cjs');
var tokens = require('../../constants/tokens.cjs');
var utils = require('../../state/routing/utils.cjs');
var styled = require('styled-components');
var index$2 = require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var Container = styled__default["default"](index.AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 4px;\n"])));
var GasCostItem = function GasCostItem(_ref) {
  var title = _ref.title,
    amount = _ref.amount,
    itemValue = _ref.itemValue;
  var _useFormatter = formatNumbers.useFormatter(),
    formatNumber = _useFormatter.formatNumber;
  if (!amount && !itemValue) return null;
  var value = itemValue !== null && itemValue !== void 0 ? itemValue : formatNumber({
    input: amount,
    type: formatNumbers.NumberType.FiatGasPrice
  });
  return /*#__PURE__*/React__default["default"].createElement(index$3["default"], {
    justify: "space-between"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, null, title), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, {
    color: "neutral1"
  }, value));
};
var GaslessSwapLabel = function GaslessSwapLabel() {
  return /*#__PURE__*/React__default["default"].createElement(UniswapXRouterLabel["default"], null, "$0");
};
function GasBreakdownTooltip(_ref2) {
  var trade = _ref2.trade,
    hideUniswapXDescription = _ref2.hideUniswapXDescription;
  var isUniswapX = utils.isUniswapXTrade(trade);
  var inputCurrency = trade.inputAmount.currency;
  var _native = tokens.nativeOnChain(inputCurrency.chainId);
  if (utils.isPreviewTrade(trade)) return /*#__PURE__*/React__default["default"].createElement(NetworkFeesDescription, {
    "native": _native
  });
  var swapEstimate = !isUniswapX ? trade.gasUseEstimateUSD : undefined;
  var approvalEstimate = trade.approveInfo.needsApprove ? trade.approveInfo.approveGasEstimateUSD : undefined;
  var wrapEstimate = isUniswapX && trade.wrapInfo.needsWrap ? trade.wrapInfo.wrapGasEstimateUSD : undefined;
  var showEstimateDetails = Boolean(wrapEstimate || approvalEstimate);
  var description = isUniswapX && !hideUniswapXDescription ? /*#__PURE__*/React__default["default"].createElement(UniswapXDescription, null) : /*#__PURE__*/React__default["default"].createElement(NetworkFeesDescription, {
    "native": _native
  });
  if (!showEstimateDetails) return description;
  return /*#__PURE__*/React__default["default"].createElement(Container, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "sm"
  }, /*#__PURE__*/React__default["default"].createElement(GasCostItem, {
    title: /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
      id: "TcQyzp",
      message: "Wrap {0}",
      values: {
        "0": _native.symbol
      }
    }),
    amount: wrapEstimate
  }), /*#__PURE__*/React__default["default"].createElement(GasCostItem, {
    title: /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
      id: "4mlgel",
      message: "Allow {0} (one time)",
      values: {
        "0": inputCurrency.symbol
      }
    }),
    amount: approvalEstimate
  }), /*#__PURE__*/React__default["default"].createElement(GasCostItem, {
    title: /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
      id: "vH2C/2",
      message: "Swap"
    }),
    amount: swapEstimate
  }), isUniswapX && /*#__PURE__*/React__default["default"].createElement(GasCostItem, {
    title: /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
      id: "vH2C/2",
      message: "Swap"
    }),
    itemValue: /*#__PURE__*/React__default["default"].createElement(GaslessSwapLabel, null)
  })), /*#__PURE__*/React__default["default"].createElement(index$2.Divider, null), description);
}
function NetworkFeesDescription(_ref3) {
  var _native2 = _ref3["native"];
  return /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelMicro, null, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "whosFZ",
    message: "The fee paid to the Ethereum network to process your transaction. This must be paid in {0}.",
    values: {
      "0": _native2.symbol
    }
  }), " ", /*#__PURE__*/React__default["default"].createElement(index$2.ExternalLink, {
    href: "https://support.uniswap.org/hc/en-us/articles/8370337377805-What-is-a-network-fee-"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "zwWKhA",
    message: "Learn more"
  })));
}
var InlineUniswapXGradient = styled__default["default"](UniswapXRouterLabel.UniswapXGradient)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  display: inline;\n"])));
function UniswapXDescription() {
  return /*#__PURE__*/React__default["default"].createElement(text.ThemedText.Caption, {
    color: "neutral2"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "U7g2v8",
    message: "<0>UniswapX</0> aggregates liquidity sources for better prices and gas free swaps.",
    components: {
      "0": /*#__PURE__*/React__default["default"].createElement(InlineUniswapXGradient, null)
    }
  }), " ", /*#__PURE__*/React__default["default"].createElement(index$2.ExternalLink, {
    href: "https://support.uniswap.org/hc/en-us/articles/17515415311501"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "zwWKhA",
    message: "Learn more"
  })));
}

exports.GasBreakdownTooltip = GasBreakdownTooltip;
exports.UniswapXDescription = UniswapXDescription;
