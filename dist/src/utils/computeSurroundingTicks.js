import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { tickToPrice } from '@uniswap/v3-sdk';
import JSBI from 'jsbi';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var PRICE_FIXED_DIGITS = 8;

// Computes the numSurroundingTicks above or below the active tick.
function computeSurroundingTicks(token0, token1, activeTickProcessed, sortedTickData, pivot, ascending) {
  var previousTickProcessed = _objectSpread({}, activeTickProcessed);
  // Iterate outwards (either up or down depending on direction) from the active tick,
  // building active liquidity for every tick.
  var processedTicks = [];
  for (var i = pivot + (ascending ? 1 : -1); ascending ? i < sortedTickData.length : i >= 0; ascending ? i++ : i--) {
    var tick = Number(sortedTickData[i].tick);
    var currentTickProcessed = {
      liquidityActive: previousTickProcessed.liquidityActive,
      tick: tick,
      liquidityNet: JSBI.BigInt(sortedTickData[i].liquidityNet),
      price0: tickToPrice(token0, token1, tick).toFixed(PRICE_FIXED_DIGITS)
    };

    // Update the active liquidity.
    // If we are iterating ascending and we found an initialized tick we immediately apply
    // it to the current processed tick we are building.
    // If we are iterating descending, we don't want to apply the net liquidity until the following tick.
    if (ascending) {
      currentTickProcessed.liquidityActive = JSBI.add(previousTickProcessed.liquidityActive, JSBI.BigInt(sortedTickData[i].liquidityNet));
    } else if (!ascending && JSBI.notEqual(previousTickProcessed.liquidityNet, JSBI.BigInt(0))) {
      // We are iterating descending, so look at the previous tick and apply any net liquidity.
      currentTickProcessed.liquidityActive = JSBI.subtract(previousTickProcessed.liquidityActive, previousTickProcessed.liquidityNet);
    }
    processedTicks.push(currentTickProcessed);
    previousTickProcessed = currentTickProcessed;
  }
  if (!ascending) {
    processedTicks = processedTicks.reverse();
  }
  return processedTicks;
}

export { computeSurroundingTicks as default };
