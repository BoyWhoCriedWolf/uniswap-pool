import { TradeType, Percent } from '@uniswap/sdk-core';
import { Pair } from '@uniswap/v2-sdk';

var V2_DEFAULT_FEE_TIER = 3000;

/**
 * Loops through all routes on a trade and returns an array of diagram entries.
 */
function getRoutingDiagramEntries(trade) {
  return trade.swaps.map(function (_ref) {
    var _ref$route = _ref.route,
      tokenPath = _ref$route.path,
      pools = _ref$route.pools,
      protocol = _ref$route.protocol,
      inputAmount = _ref.inputAmount,
      outputAmount = _ref.outputAmount;
    var portion = trade.tradeType === TradeType.EXACT_INPUT ? inputAmount.divide(trade.inputAmount) : outputAmount.divide(trade.outputAmount);
    var percent = new Percent(portion.numerator, portion.denominator);
    var path = [];
    for (var i = 0; i < pools.length; i++) {
      var nextPool = pools[i];
      var tokenIn = tokenPath[i];
      var tokenOut = tokenPath[i + 1];
      var entry = [tokenIn, tokenOut, nextPool instanceof Pair ? V2_DEFAULT_FEE_TIER : nextPool.fee];
      path.push(entry);
    }
    return {
      percent: percent,
      path: path,
      protocol: protocol
    };
  });
}

export { getRoutingDiagramEntries as default };
