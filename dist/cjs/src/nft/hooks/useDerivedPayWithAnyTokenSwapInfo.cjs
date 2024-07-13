'use strict';

var sdkCore = require('@uniswap/sdk-core');
var useAutoSlippageTolerance = require('../../hooks/useAutoSlippageTolerance.cjs');
var useDebouncedTrade = require('../../hooks/useDebouncedTrade.cjs');
var React = require('react');
var types = require('../../state/routing/types.cjs');
var utils = require('../../state/routing/utils.cjs');

function useDerivedPayWithAnyTokenSwapInfo(inputCurrency, parsedOutputAmount) {
  var _useDebouncedTrade = useDebouncedTrade.useDebouncedTrade(sdkCore.TradeType.EXACT_OUTPUT, parsedOutputAmount, inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, types.RouterPreference.API),
    state = _useDebouncedTrade.state,
    trade = _useDebouncedTrade.trade;
  var allowedSlippage = useAutoSlippageTolerance(utils.isClassicTrade(trade) ? trade : undefined);
  var maximumAmountIn = React.useMemo(function () {
    var maximumAmountIn = trade === null || trade === void 0 ? void 0 : trade.maximumAmountIn(allowedSlippage);
    return maximumAmountIn !== null && maximumAmountIn !== void 0 && maximumAmountIn.currency.isToken ? maximumAmountIn : undefined;
  }, [allowedSlippage, trade]);
  return React.useMemo(function () {
    return {
      state: state,
      trade: trade,
      maximumAmountIn: maximumAmountIn,
      allowedSlippage: allowedSlippage
    };
  }, [allowedSlippage, maximumAmountIn, state, trade]);
}

module.exports = useDerivedPayWithAnyTokenSwapInfo;
