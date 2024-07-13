'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var analytics = require('../lib/utils/analytics.cjs');
var types = require('../state/routing/types.cjs');
var utils = require('../state/routing/utils.cjs');
var prices = require('./prices.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var formatRoutesEventProperties = function formatRoutesEventProperties(routes) {
  if (!routes) return {};
  var routesEventProperties = {
    routes_percentages: [],
    routes_protocols: []
  };
  routes.forEach(function (route, index) {
    routesEventProperties["routes_percentages"].push(analytics.formatPercentNumber(route.percent));
    routesEventProperties["routes_protocols"].push(route.protocol);
    routesEventProperties["route_".concat(index, "_input_currency_symbols")] = route.path.map(function (pathStep) {
      var _pathStep$0$symbol;
      return (_pathStep$0$symbol = pathStep[0].symbol) !== null && _pathStep$0$symbol !== void 0 ? _pathStep$0$symbol : "";
    });
    routesEventProperties["route_".concat(index, "_output_currency_symbols")] = route.path.map(function (pathStep) {
      var _pathStep$1$symbol;
      return (_pathStep$1$symbol = pathStep[1].symbol) !== null && _pathStep$1$symbol !== void 0 ? _pathStep$1$symbol : "";
    });
    routesEventProperties["route_".concat(index, "_input_currency_addresses")] = route.path.map(function (pathStep) {
      return analytics.getTokenAddress(pathStep[0]);
    });
    routesEventProperties["route_".concat(index, "_output_currency_addresses")] = route.path.map(function (pathStep) {
      return analytics.getTokenAddress(pathStep[1]);
    });
    routesEventProperties["route_".concat(index, "_fee_amounts_hundredths_of_bps")] = route.path.map(function (pathStep) {
      return pathStep[2];
    });
  });
  return routesEventProperties;
};
var formatSwapPriceUpdatedEventProperties = function formatSwapPriceUpdatedEventProperties(trade, priceUpdate, response) {
  return {
    chain_id: trade.inputAmount.currency.chainId === trade.outputAmount.currency.chainId ? trade.inputAmount.currency.chainId : undefined,
    response: response,
    token_in_symbol: trade.inputAmount.currency.symbol,
    token_out_symbol: trade.outputAmount.currency.symbol,
    price_update_basis_points: priceUpdate
  };
};
var formatSwapButtonClickEventProperties = function formatSwapButtonClickEventProperties(_ref) {
  var trade = _ref.trade,
    swapResult = _ref.swapResult,
    allowedSlippage = _ref.allowedSlippage,
    transactionDeadlineSecondsSinceEpoch = _ref.transactionDeadlineSecondsSinceEpoch,
    isAutoSlippage = _ref.isAutoSlippage,
    isAutoRouterApi = _ref.isAutoRouterApi,
    routes = _ref.routes,
    fiatValueInput = _ref.fiatValueInput,
    fiatValueOutput = _ref.fiatValueOutput;
  return _objectSpread({
    estimated_network_fee_usd: utils.isClassicTrade(trade) ? trade.gasUseEstimateUSD : undefined,
    transaction_hash: (swapResult === null || swapResult === void 0 ? void 0 : swapResult.type) === types.TradeFillType.Classic ? swapResult.response.hash : undefined,
    order_hash: (swapResult === null || swapResult === void 0 ? void 0 : swapResult.type) === types.TradeFillType.UniswapX ? swapResult.response.orderHash : undefined,
    transaction_deadline_seconds: analytics.getDurationUntilTimestampSeconds(transactionDeadlineSecondsSinceEpoch),
    token_in_address: trade ? analytics.getTokenAddress(trade.inputAmount.currency) : undefined,
    token_out_address: trade ? analytics.getTokenAddress(trade.outputAmount.currency) : undefined,
    token_in_symbol: trade.inputAmount.currency.symbol,
    token_out_symbol: trade.outputAmount.currency.symbol,
    token_in_amount: trade ? analytics.formatToDecimal(trade.inputAmount, trade.inputAmount.currency.decimals) : undefined,
    token_out_amount: trade ? analytics.formatToDecimal(trade.outputAmount, trade.outputAmount.currency.decimals) : undefined,
    token_in_amount_usd: fiatValueInput,
    token_out_amount_usd: fiatValueOutput,
    price_impact_basis_points: utils.isClassicTrade(trade) ? analytics.formatPercentInBasisPointsNumber(prices.computeRealizedPriceImpact(trade)) : undefined,
    allowed_slippage_basis_points: analytics.formatPercentInBasisPointsNumber(allowedSlippage),
    is_auto_router_api: isAutoRouterApi,
    is_auto_slippage: isAutoSlippage,
    chain_id: trade.inputAmount.currency.chainId === trade.outputAmount.currency.chainId ? trade.inputAmount.currency.chainId : undefined,
    swap_quote_block_number: utils.isClassicTrade(trade) ? trade.blockNumber : undefined
  }, formatRoutesEventProperties(routes));
};

exports.formatSwapButtonClickEventProperties = formatSwapButtonClickEventProperties;
exports.formatSwapPriceUpdatedEventProperties = formatSwapPriceUpdatedEventProperties;
