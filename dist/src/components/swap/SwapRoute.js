import React__default from 'react';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Column } from '../Column/index.js';
import RoutingDiagram from '../RoutingDiagram/RoutingDiagram.js';
import { RowBetween } from '../Row/index.js';
import { SUPPORTED_GAS_ESTIMATE_CHAIN_IDS } from '../../constants/chains.js';
import useAutoRouterSupported from '../../hooks/useAutoRouterSupported.js';
import { isClassicTrade } from '../../state/routing/utils.js';
import { Separator } from '../../theme/components/index.js';
import { useFormatter, NumberType } from '../../utils/formatNumbers.js';
import getRoutingDiagramEntries from '../../utils/getRoutingDiagramEntries.js';
import RouterLabel from '../RouterLabel/index.js';
import { UniswapXDescription } from './GasBreakdownTooltip.js';
import { ThemedText } from '../../theme/components/text.js';

// TODO(WEB-2022)
// Can `trade.gasUseEstimateUSD` be defined when `chainId` is not in `SUPPORTED_GAS_ESTIMATE_CHAIN_IDS`?
function useGasPrice(_ref) {
  var gasUseEstimateUSD = _ref.gasUseEstimateUSD,
    inputAmount = _ref.inputAmount;
  var _useFormatter = useFormatter(),
    formatNumber = _useFormatter.formatNumber;
  if (!gasUseEstimateUSD || !SUPPORTED_GAS_ESTIMATE_CHAIN_IDS.includes(inputAmount.currency.chainId)) return undefined;
  return gasUseEstimateUSD === 0 ? "<$0.01" : formatNumber({
    input: gasUseEstimateUSD,
    type: NumberType.FiatGasPrice
  });
}
function RouteLabel(_ref2) {
  var trade = _ref2.trade;
  return /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, "Order Routing"), /*#__PURE__*/React__default.createElement(RouterLabel, {
    trade: trade,
    color: "neutral1"
  }));
}
function PriceImpactRow(_ref3) {
  var trade = _ref3.trade;
  var _useFormatter2 = useFormatter(),
    formatPriceImpact = _useFormatter2.formatPriceImpact;
  return /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "T+qgFw",
    message: "Price Impact"
  }), /*#__PURE__*/React__default.createElement("div", null, formatPriceImpact(trade.priceImpact))));
}
function RoutingTooltip(_ref4) {
  var trade = _ref4.trade;
  return isClassicTrade(trade) ? /*#__PURE__*/React__default.createElement(Column, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(PriceImpactRow, {
    trade: trade
  }), /*#__PURE__*/React__default.createElement(Separator, null), /*#__PURE__*/React__default.createElement(RouteLabel, {
    trade: trade
  }), /*#__PURE__*/React__default.createElement(SwapRoute, {
    trade: trade
  })) : /*#__PURE__*/React__default.createElement(Column, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(RouteLabel, {
    trade: trade
  }), /*#__PURE__*/React__default.createElement(Separator, null), /*#__PURE__*/React__default.createElement(UniswapXDescription, null));
}
function SwapRoute(_ref5) {
  var trade = _ref5.trade;
  var inputAmount = trade.inputAmount,
    outputAmount = trade.outputAmount;
  var routes = getRoutingDiagramEntries(trade);
  var gasPrice = useGasPrice(trade);
  return useAutoRouterSupported() ? /*#__PURE__*/React__default.createElement(Column, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(RoutingDiagram, {
    routes: routes,
    currencyIn: inputAmount.currency,
    currencyOut: outputAmount.currency
  }), /*#__PURE__*/React__default.createElement(ThemedText.Caption, {
    color: "neutral2"
  }, Boolean(gasPrice) && /*#__PURE__*/React__default.createElement(Trans, {
    id: "9N6Zvl",
    message: "Best price route costs ~{gasPrice} in gas.",
    values: {
      gasPrice: gasPrice
    }
  }), Boolean(gasPrice) && " ", /*#__PURE__*/React__default.createElement(Trans, {
    id: "LyJ5nH",
    message: "This route optimizes your total output by considering split routes, multiple hops, and the gas cost of each step."
  }))) : /*#__PURE__*/React__default.createElement(RoutingDiagram, {
    routes: routes,
    currencyIn: inputAmount.currency,
    currencyOut: outputAmount.currency
  });
}

export { RoutingTooltip, SwapRoute };
