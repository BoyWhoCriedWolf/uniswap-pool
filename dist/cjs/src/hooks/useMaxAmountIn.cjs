'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function useMaxAmountIn(trade, allowedSlippage) {
  return React.useMemo(function () {
    var maximumAmountIn = trade === null || trade === void 0 ? void 0 : trade.maximumAmountIn(allowedSlippage);
    return maximumAmountIn !== null && maximumAmountIn !== void 0 && maximumAmountIn.currency.isToken ? maximumAmountIn : undefined;
  }, [allowedSlippage, trade]);
}

exports.useMaxAmountIn = useMaxAmountIn;
