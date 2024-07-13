import { TradeType } from '@uniswap/sdk-core';
import useClassicAutoSlippageTolerance from '../../hooks/useAutoSlippageTolerance.js';
import { useDebouncedTrade } from '../../hooks/useDebouncedTrade.js';
import { useMemo } from 'react';
import { RouterPreference } from '../../state/routing/types.js';
import { isClassicTrade } from '../../state/routing/utils.js';

function useDerivedPayWithAnyTokenSwapInfo(inputCurrency, parsedOutputAmount) {
  var _useDebouncedTrade = useDebouncedTrade(TradeType.EXACT_OUTPUT, parsedOutputAmount, inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined, RouterPreference.API),
    state = _useDebouncedTrade.state,
    trade = _useDebouncedTrade.trade;
  var allowedSlippage = useClassicAutoSlippageTolerance(isClassicTrade(trade) ? trade : undefined);
  var maximumAmountIn = useMemo(function () {
    var maximumAmountIn = trade === null || trade === void 0 ? void 0 : trade.maximumAmountIn(allowedSlippage);
    return maximumAmountIn !== null && maximumAmountIn !== void 0 && maximumAmountIn.currency.isToken ? maximumAmountIn : undefined;
  }, [allowedSlippage, trade]);
  return useMemo(function () {
    return {
      state: state,
      trade: trade,
      maximumAmountIn: maximumAmountIn,
      allowedSlippage: allowedSlippage
    };
  }, [allowedSlippage, maximumAmountIn, state, trade]);
}

export { useDerivedPayWithAnyTokenSwapInfo as default };
