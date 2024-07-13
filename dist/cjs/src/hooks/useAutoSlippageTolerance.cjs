'use strict';

var routerSdk = require('@uniswap/router-sdk');
var sdkCore = require('@uniswap/sdk-core');
var v2Sdk = require('@uniswap/v2-sdk');
var v3Sdk = require('@uniswap/v3-sdk');
var core = require('@web3-react/core');
var chains = require('../constants/chains.cjs');
var JSBI = require('jsbi');
var useNativeCurrency = require('../lib/hooks/useNativeCurrency.cjs');
var React = require('react');
var useGasPrice = require('./useGasPrice.cjs');
var useStablecoinPrice = require('./useStablecoinPrice.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var DEFAULT_AUTO_SLIPPAGE = new sdkCore.Percent(5, 1000); // 0.5%

// Base costs regardless of how many hops in the route
var V3_SWAP_BASE_GAS_ESTIMATE = 100000;
var V2_SWAP_BASE_GAS_ESTIMATE = 135000;

// Extra cost per hop in the route
var V3_SWAP_HOP_GAS_ESTIMATE = 70000;
var V2_SWAP_HOP_GAS_ESTIMATE = 50000;

/**
 * Return a guess of the gas cost used in computing slippage tolerance for a given trade
 * @param trade the trade for which to _guess_ the amount of gas it would cost to execute
 *
 * V3 logic is inspired by:
 * https://github.com/Uniswap/smart-order-router/blob/main/src/routers/alpha-router/gas-models/v3/v3-heuristic-gas-model.ts
 * V2 logic is inspired by:
 * https://github.com/Uniswap/smart-order-router/blob/main/src/routers/alpha-router/gas-models/v2/v2-heuristic-gas-model.ts
 */
function guesstimateGas(trade) {
  if (trade) {
    var gas = 0;
    var _iterator = _createForOfIteratorHelper(trade.swaps),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var route = _step.value.route;
        if (route.protocol === routerSdk.Protocol.V2) {
          gas += V2_SWAP_BASE_GAS_ESTIMATE + route.pools.length * V2_SWAP_HOP_GAS_ESTIMATE;
        } else if (route.protocol === routerSdk.Protocol.V3) {
          // V3 gas costs scale on initialized ticks being crossed, but we don't have that data here.
          // We bake in some tick crossings into the base 100k cost.
          gas += V3_SWAP_BASE_GAS_ESTIMATE + route.pools.length * V3_SWAP_HOP_GAS_ESTIMATE;
        } else if (route.protocol === routerSdk.Protocol.MIXED) {
          var sections = routerSdk.partitionMixedRouteByProtocol(route);
          gas += sections.reduce(function (gas, section) {
            if (section.every(function (pool) {
              return pool instanceof v3Sdk.Pool;
            })) {
              return gas + V3_SWAP_BASE_GAS_ESTIMATE + section.length * V3_SWAP_HOP_GAS_ESTIMATE;
            } else if (section.every(function (pool) {
              return pool instanceof v2Sdk.Pair;
            })) {
              return gas + V2_SWAP_BASE_GAS_ESTIMATE + (section.length - 1) * V2_SWAP_HOP_GAS_ESTIMATE;
            } else {
              console.warn("Invalid section");
              return gas;
            }
          }, 0);
        } else {
          // fallback general gas estimation
          gas += V3_SWAP_BASE_GAS_ESTIMATE + route.pools.length * V3_SWAP_HOP_GAS_ESTIMATE;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return gas;
  }
  return undefined;
}
var MIN_AUTO_SLIPPAGE_TOLERANCE = DEFAULT_AUTO_SLIPPAGE;
// assuming normal gas speeds, most swaps complete within 3 blocks and
// there's rarely price movement >5% in that time period
var MAX_AUTO_SLIPPAGE_TOLERANCE = new sdkCore.Percent(5, 100); // 5%

/**
 * Returns slippage tolerance based on values from current trade, gas estimates from api, and active network.
 * Auto slippage is only relevant for Classic swaps because UniswapX slippage is determined by the backend service
 */
function useClassicAutoSlippageTolerance(trade) {
  var _useStablecoinAmountF, _ref;
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var onL2 = chainId && chains.L2_CHAIN_IDS.includes(chainId);
  var outputDollarValue = useStablecoinPrice.useStablecoinValue(trade === null || trade === void 0 ? void 0 : trade.outputAmount);
  var nativeGasPrice = useGasPrice();
  var gasEstimate = guesstimateGas(trade);
  var gasEstimateUSD = (_useStablecoinAmountF = useStablecoinPrice.useStablecoinAmountFromFiatValue(trade === null || trade === void 0 ? void 0 : trade.gasUseEstimateUSD)) !== null && _useStablecoinAmountF !== void 0 ? _useStablecoinAmountF : null;
  var nativeCurrency = useNativeCurrency(chainId);
  var nativeCurrencyPrice = useStablecoinPrice["default"]((_ref = trade && nativeCurrency) !== null && _ref !== void 0 ? _ref : undefined);
  return React.useMemo(function () {
    if (!trade || onL2) return DEFAULT_AUTO_SLIPPAGE;
    var nativeGasCost = nativeGasPrice && typeof gasEstimate === "number" ? JSBI__default["default"].multiply(nativeGasPrice, JSBI__default["default"].BigInt(gasEstimate)) : undefined;
    var dollarGasCost = nativeCurrency && nativeGasCost && nativeCurrencyPrice ? nativeCurrencyPrice.quote(sdkCore.CurrencyAmount.fromRawAmount(nativeCurrency, nativeGasCost)) : undefined;

    // if valid estimate from api and using api trade, use gas estimate from api
    // NOTE - dont use gas estimate for L2s yet - need to verify accuracy
    // if not, use local heuristic
    var dollarCostToUse = chainId && chains.SUPPORTED_GAS_ESTIMATE_CHAIN_IDS.includes(chainId) && gasEstimateUSD ? gasEstimateUSD : dollarGasCost;
    if (outputDollarValue && dollarCostToUse) {
      // optimize for highest possible slippage without getting MEV'd
      // so set slippage % such that the difference between expected amount out and minimum amount out < gas fee to sandwich the trade
      var fraction = dollarCostToUse.asFraction.divide(outputDollarValue.asFraction);
      var result = new sdkCore.Percent(fraction.numerator, fraction.denominator);
      if (result.greaterThan(MAX_AUTO_SLIPPAGE_TOLERANCE)) {
        return MAX_AUTO_SLIPPAGE_TOLERANCE;
      }
      if (result.lessThan(MIN_AUTO_SLIPPAGE_TOLERANCE)) {
        return MIN_AUTO_SLIPPAGE_TOLERANCE;
      }
      return result;
    }
    return DEFAULT_AUTO_SLIPPAGE;
  }, [trade, onL2, nativeGasPrice, gasEstimate, nativeCurrency, nativeCurrencyPrice, chainId, gasEstimateUSD, outputDollarValue]);
}

module.exports = useClassicAutoSlippageTolerance;
