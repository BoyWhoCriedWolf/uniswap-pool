'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../Column/index.cjs');
var RoutingDiagram = require('../RoutingDiagram/RoutingDiagram.cjs');
var index$3 = require('../Row/index.cjs');
var chains = require('../../constants/chains.cjs');
var useAutoRouterSupported = require('../../hooks/useAutoRouterSupported.cjs');
var utils = require('../../state/routing/utils.cjs');
var index$1 = require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var getRoutingDiagramEntries = require('../../utils/getRoutingDiagramEntries.cjs');
var index$4 = require('../RouterLabel/index.cjs');
var GasBreakdownTooltip = require('./GasBreakdownTooltip.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

// TODO(WEB-2022)
// Can `trade.gasUseEstimateUSD` be defined when `chainId` is not in `SUPPORTED_GAS_ESTIMATE_CHAIN_IDS`?
function useGasPrice(_ref) {
  var gasUseEstimateUSD = _ref.gasUseEstimateUSD,
    inputAmount = _ref.inputAmount;
  var _useFormatter = formatNumbers.useFormatter(),
    formatNumber = _useFormatter.formatNumber;
  if (!gasUseEstimateUSD || !chains.SUPPORTED_GAS_ESTIMATE_CHAIN_IDS.includes(inputAmount.currency.chainId)) return undefined;
  return gasUseEstimateUSD === 0 ? "<$0.01" : formatNumber({
    input: gasUseEstimateUSD,
    type: formatNumbers.NumberType.FiatGasPrice
  });
}
function RouteLabel(_ref2) {
  var trade = _ref2.trade;
  return /*#__PURE__*/React__default["default"].createElement(index$3.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, "Order Routing"), /*#__PURE__*/React__default["default"].createElement(index$4, {
    trade: trade,
    color: "neutral1"
  }));
}
function PriceImpactRow(_ref3) {
  var trade = _ref3.trade;
  var _useFormatter2 = formatNumbers.useFormatter(),
    formatPriceImpact = _useFormatter2.formatPriceImpact;
  return /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "T+qgFw",
    message: "Price Impact"
  }), /*#__PURE__*/React__default["default"].createElement("div", null, formatPriceImpact(trade.priceImpact))));
}
function RoutingTooltip(_ref4) {
  var trade = _ref4.trade;
  return utils.isClassicTrade(trade) ? /*#__PURE__*/React__default["default"].createElement(index.Column, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(PriceImpactRow, {
    trade: trade
  }), /*#__PURE__*/React__default["default"].createElement(index$1.Separator, null), /*#__PURE__*/React__default["default"].createElement(RouteLabel, {
    trade: trade
  }), /*#__PURE__*/React__default["default"].createElement(SwapRoute, {
    trade: trade
  })) : /*#__PURE__*/React__default["default"].createElement(index.Column, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(RouteLabel, {
    trade: trade
  }), /*#__PURE__*/React__default["default"].createElement(index$1.Separator, null), /*#__PURE__*/React__default["default"].createElement(GasBreakdownTooltip.UniswapXDescription, null));
}
function SwapRoute(_ref5) {
  var trade = _ref5.trade;
  var inputAmount = trade.inputAmount,
    outputAmount = trade.outputAmount;
  var routes = getRoutingDiagramEntries(trade);
  var gasPrice = useGasPrice(trade);
  return useAutoRouterSupported() ? /*#__PURE__*/React__default["default"].createElement(index.Column, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(RoutingDiagram, {
    routes: routes,
    currencyIn: inputAmount.currency,
    currencyOut: outputAmount.currency
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.Caption, {
    color: "neutral2"
  }, Boolean(gasPrice) && /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "9N6Zvl",
    message: "Best price route costs ~{gasPrice} in gas.",
    values: {
      gasPrice: gasPrice
    }
  }), Boolean(gasPrice) && " ", /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "LyJ5nH",
    message: "This route optimizes your total output by considering split routes, multiple hops, and the gas cost of each step."
  }))) : /*#__PURE__*/React__default["default"].createElement(RoutingDiagram, {
    routes: routes,
    currencyIn: inputAmount.currency,
    currencyOut: outputAmount.currency
  });
}

exports.RoutingTooltip = RoutingTooltip;
exports.SwapRoute = SwapRoute;
