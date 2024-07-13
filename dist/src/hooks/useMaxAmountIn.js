import { useMemo } from 'react';

function useMaxAmountIn(trade, allowedSlippage) {
  return useMemo(function () {
    var maximumAmountIn = trade === null || trade === void 0 ? void 0 : trade.maximumAmountIn(allowedSlippage);
    return maximumAmountIn !== null && maximumAmountIn !== void 0 && maximumAmountIn.currency.isToken ? maximumAmountIn : undefined;
  }, [allowedSlippage, trade]);
}

export { useMaxAmountIn };
