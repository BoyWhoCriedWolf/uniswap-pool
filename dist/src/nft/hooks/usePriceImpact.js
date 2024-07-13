import { useMemo } from 'react';
import { useTheme } from 'styled-components';
import { computeRealizedPriceImpact, getPriceImpactWarning } from '../../utils/prices.js';

function usePriceImpact(trade) {
  var theme = useTheme();
  return useMemo(function () {
    var marketPriceImpact = trade ? computeRealizedPriceImpact(trade) : undefined;
    var priceImpactWarning = marketPriceImpact ? getPriceImpactWarning(marketPriceImpact) : undefined;
    var warningColor = priceImpactWarning === "error" ? theme.critical : priceImpactWarning === "warning" ? theme.deprecated_accentWarning : undefined;
    return marketPriceImpact && priceImpactWarning && warningColor ? {
      priceImpactSeverity: {
        type: priceImpactWarning,
        color: warningColor
      },
      displayPercentage: function displayPercentage() {
        return toHumanReadablePercent(marketPriceImpact);
      }
    } : undefined;
  }, [theme.critical, theme.deprecated_accentWarning, trade]);
}
function toHumanReadablePercent(priceImpact) {
  var _priceImpact$multiply;
  var sign = priceImpact.lessThan(0) ? "+" : "";
  var exactFloat = Number(priceImpact.numerator) / Number(priceImpact.denominator) * 100;
  if (exactFloat < 0.005) {
    return "0.00%";
  }
  var number = parseFloat((_priceImpact$multiply = priceImpact.multiply(-1)) === null || _priceImpact$multiply === void 0 ? void 0 : _priceImpact$multiply.toFixed(2));
  return "".concat(sign).concat(number, "%");
}

export { usePriceImpact };
