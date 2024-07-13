'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sdkCore = require('@uniswap/sdk-core');
var v2Sdk = require('@uniswap/v2-sdk');
var v3Sdk = require('@uniswap/v3-sdk');
var JSBI = require('jsbi');
var misc = require('../constants/misc.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var THIRTY_BIPS_FEE = new sdkCore.Percent(JSBI__default["default"].BigInt(30), JSBI__default["default"].BigInt(10000));
var INPUT_FRACTION_AFTER_FEE = misc.ONE_HUNDRED_PERCENT.subtract(THIRTY_BIPS_FEE);
function computeRealizedPriceImpact(trade) {
  var realizedLpFeePercent = computeRealizedLPFeePercent(trade);
  return trade.priceImpact.subtract(realizedLpFeePercent);
}

// computes realized lp fee as a percent
function computeRealizedLPFeePercent(trade) {
  var percent;

  // Since routes are either all v2 or all v3 right now, calculate separately
  if (trade.swaps[0].route.pools instanceof v2Sdk.Pair) {
    // for each hop in our trade, take away the x*y=k price impact from 0.3% fees
    // e.g. for 3 tokens/2 hops: 1 - ((1 - .03) * (1-.03))
    percent = misc.ONE_HUNDRED_PERCENT.subtract(trade.swaps.reduce(function (currentFee) {
      return currentFee.multiply(INPUT_FRACTION_AFTER_FEE);
    }, misc.ONE_HUNDRED_PERCENT));
  } else {
    percent = misc.ZERO_PERCENT;
    var _iterator = _createForOfIteratorHelper(trade.swaps),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var swap = _step.value;
        var _swap$inputAmount$div = swap.inputAmount.divide(trade.inputAmount),
          numerator = _swap$inputAmount$div.numerator,
          denominator = _swap$inputAmount$div.denominator;
        var overallPercent = new sdkCore.Percent(numerator, denominator);
        var routeRealizedLPFeePercent = overallPercent.multiply(misc.ONE_HUNDRED_PERCENT.subtract(swap.route.pools.reduce(function (currentFee, pool) {
          var fee = pool instanceof v2Sdk.Pair ?
          // not currently possible given protocol check above, but not fatal
          v3Sdk.FeeAmount.MEDIUM : pool.fee;
          return currentFee.multiply(misc.ONE_HUNDRED_PERCENT.subtract(new sdkCore.Fraction(fee, 1000000)));
        }, misc.ONE_HUNDRED_PERCENT)));
        percent = percent.add(routeRealizedLPFeePercent);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
  }
  return new sdkCore.Percent(percent.numerator, percent.denominator);
}
var IMPACT_TIERS = [misc.BLOCKED_PRICE_IMPACT_NON_EXPERT, misc.ALLOWED_PRICE_IMPACT_HIGH, misc.ALLOWED_PRICE_IMPACT_MEDIUM, misc.ALLOWED_PRICE_IMPACT_LOW];
function warningSeverity(priceImpact) {
  if (!priceImpact) return 0;
  // This function is used to calculate the Severity level for % changes in USD value and Price Impact.
  // Price Impact is always an absolute value (conceptually always negative, but represented in code with a positive value)
  // The USD value change can be positive or negative, and it follows the same standard as Price Impact (positive value is the typical case of a loss due to slippage).
  // We don't want to return a warning level for a favorable/profitable change, so when the USD value change is negative we return 0.
  // TODO (WEB-1833): Disambiguate Price Impact and USD value change, and flip the sign of USD Value change.
  if (priceImpact.lessThan(0)) return 0;
  var impact = IMPACT_TIERS.length;
  var _iterator2 = _createForOfIteratorHelper(IMPACT_TIERS),
    _step2;
  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var impactLevel = _step2.value;
      if (impactLevel.lessThan(priceImpact)) return impact;
      impact--;
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }
  return 0;
}
function getPriceImpactWarning(priceImpact) {
  if (priceImpact.greaterThan(misc.ALLOWED_PRICE_IMPACT_HIGH)) return "error";
  if (priceImpact.greaterThan(misc.ALLOWED_PRICE_IMPACT_MEDIUM)) return "warning";
  return;
}
function getPriceImpactColor(priceImpact) {
  switch (getPriceImpactWarning(priceImpact)) {
    case "error":
      return "critical";
    case "warning":
      return "deprecated_accentWarning";
    default:
      return undefined;
  }
}

exports.computeRealizedPriceImpact = computeRealizedPriceImpact;
exports.getPriceImpactColor = getPriceImpactColor;
exports.getPriceImpactWarning = getPriceImpactWarning;
exports.warningSeverity = warningSeverity;
