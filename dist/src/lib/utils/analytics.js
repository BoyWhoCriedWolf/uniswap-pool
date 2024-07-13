import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { Percent } from '@uniswap/sdk-core';
import { NATIVE_CHAIN_ID } from '../../constants/tokens.js';
import { QuoteMethod } from '../../state/routing/types.js';
import { isUniswapXTrade, isSubmittableTrade, isClassicTrade } from '../../state/routing/utils.js';
import { computeRealizedPriceImpact } from '../../utils/prices.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var getDurationUntilTimestampSeconds = function getDurationUntilTimestampSeconds(futureTimestampInSecondsSinceEpoch) {
  if (!futureTimestampInSecondsSinceEpoch) return undefined;
  return futureTimestampInSecondsSinceEpoch - new Date().getTime() / 1000;
};
var formatToDecimal = function formatToDecimal(intialNumberObject, decimalPlace) {
  return parseFloat(intialNumberObject.toFixed(decimalPlace));
};
var getTokenAddress = function getTokenAddress(currency) {
  return currency.isNative ? NATIVE_CHAIN_ID : currency.address;
};
var formatPercentInBasisPointsNumber = function formatPercentInBasisPointsNumber(percent) {
  return parseFloat(percent.toFixed(2)) * 100;
};
var formatPercentNumber = function formatPercentNumber(percent) {
  return parseFloat(percent.toFixed(2));
};
var getPriceUpdateBasisPoints = function getPriceUpdateBasisPoints(prevPrice, newPrice) {
  var changeFraction = newPrice.subtract(prevPrice).divide(prevPrice);
  var changePercentage = new Percent(changeFraction.numerator, changeFraction.denominator);
  return formatPercentInBasisPointsNumber(changePercentage);
};
function getEstimatedNetworkFee(trade) {
  if (isClassicTrade(trade)) return trade.gasUseEstimateUSD;
  if (isUniswapXTrade(trade)) return trade.classicGasUseEstimateUSD;
  return undefined;
}
function formatCommonPropertiesForTrade(trade, allowedSlippage) {
  return {
    routing: trade.fillType,
    type: trade.tradeType,
    ura_quote_id: isUniswapXTrade(trade) ? trade.quoteId : undefined,
    ura_request_id: isSubmittableTrade(trade) ? trade.requestId : undefined,
    ura_quote_block_number: isClassicTrade(trade) ? trade.blockNumber : undefined,
    token_in_address: getTokenAddress(trade.inputAmount.currency),
    token_out_address: getTokenAddress(trade.outputAmount.currency),
    token_in_symbol: trade.inputAmount.currency.symbol,
    token_out_symbol: trade.outputAmount.currency.symbol,
    token_in_amount: formatToDecimal(trade.inputAmount, trade.inputAmount.currency.decimals),
    token_out_amount: formatToDecimal(trade.outputAmount, trade.outputAmount.currency.decimals),
    price_impact_basis_points: isClassicTrade(trade) ? formatPercentInBasisPointsNumber(computeRealizedPriceImpact(trade)) : undefined,
    chain_id: trade.inputAmount.currency.chainId === trade.outputAmount.currency.chainId ? trade.inputAmount.currency.chainId : undefined,
    estimated_network_fee_usd: getEstimatedNetworkFee(trade),
    minimum_output_after_slippage: trade.minimumAmountOut(allowedSlippage).toSignificant(6),
    allowed_slippage: formatPercentNumber(allowedSlippage),
    method: getQuoteMethod(trade)
  };
}
var formatSwapSignedAnalyticsEventProperties = function formatSwapSignedAnalyticsEventProperties(_ref) {
  var trade = _ref.trade,
    allowedSlippage = _ref.allowedSlippage,
    fiatValues = _ref.fiatValues,
    txHash = _ref.txHash,
    timeToSignSinceRequestMs = _ref.timeToSignSinceRequestMs;
  return _objectSpread({
    transaction_hash: txHash,
    token_in_amount_usd: fiatValues.amountIn,
    token_out_amount_usd: fiatValues.amountOut,
    // measures the amount of time the user took to sign the permit message or swap tx in their wallet
    time_to_sign_since_request_ms: timeToSignSinceRequestMs
  }, formatCommonPropertiesForTrade(trade, allowedSlippage));
};
function getQuoteMethod(trade) {
  if (isUniswapXTrade(trade)) return QuoteMethod.ROUTING_API;
  return trade.quoteMethod;
}
var formatSwapQuoteReceivedEventProperties = function formatSwapQuoteReceivedEventProperties(trade, allowedSlippage, swapQuoteLatencyMs, inputTax, outputTax) {
  return _objectSpread(_objectSpread({}, formatCommonPropertiesForTrade(trade, allowedSlippage)), {}, {
    swap_quote_block_number: isClassicTrade(trade) ? trade.blockNumber : undefined,
    allowed_slippage_basis_points: formatPercentInBasisPointsNumber(allowedSlippage),
    token_in_amount_max: trade.maximumAmountIn(allowedSlippage).toExact(),
    token_out_amount_min: trade.minimumAmountOut(allowedSlippage).toExact(),
    quote_latency_milliseconds: swapQuoteLatencyMs,
    token_out_detected_tax: formatPercentNumber(outputTax),
    token_in_detected_tax: formatPercentNumber(inputTax)
  });
};

export { formatCommonPropertiesForTrade, formatPercentInBasisPointsNumber, formatPercentNumber, formatSwapQuoteReceivedEventProperties, formatSwapSignedAnalyticsEventProperties, formatToDecimal, getDurationUntilTimestampSeconds, getPriceUpdateBasisPoints, getTokenAddress };
