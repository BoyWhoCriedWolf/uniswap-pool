'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var routerSdk = require('@uniswap/router-sdk');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function buildTradeRouteInputAmounts(swapAmounts) {
  return {
    inputAmount: {
      amount: swapAmounts.inputAmount.quotient.toString(),
      token: {
        address: swapAmounts.inputAmount.currency.isToken ? swapAmounts.inputAmount.currency.address : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: swapAmounts.inputAmount.currency.chainId,
        decimals: swapAmounts.inputAmount.currency.decimals,
        isNative: swapAmounts.inputAmount.currency.isNative
      }
    },
    outputAmount: {
      amount: swapAmounts.outputAmount.quotient.toString(),
      token: {
        address: swapAmounts.outputAmount.currency.isToken ? swapAmounts.outputAmount.currency.address : "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: swapAmounts.outputAmount.currency.chainId,
        decimals: swapAmounts.outputAmount.currency.decimals,
        isNative: swapAmounts.outputAmount.currency.isNative
      }
    }
  };
}
function buildPool(pool) {
  var isPool = ("fee" in pool);
  return {
    pair: !isPool ? {
      tokenAmountA: {
        amount: pool.reserve0.quotient.toString(),
        token: {
          address: pool.token0.address,
          chainId: pool.token0.chainId,
          decimals: pool.token0.decimals,
          isNative: pool.token0.isNative
        }
      },
      tokenAmountB: {
        amount: pool.reserve1.quotient.toString(),
        token: {
          address: pool.token1.address,
          chainId: pool.token1.chainId,
          decimals: pool.token1.decimals,
          isNative: pool.token1.isNative
        }
      }
    } : undefined,
    pool: isPool ? {
      fee: pool.fee,
      liquidity: pool.liquidity.toString(),
      sqrtRatioX96: pool.sqrtRatioX96.toString(),
      tickCurrent: pool.tickCurrent.toString(),
      tokenA: {
        address: pool.token0.address,
        chainId: pool.token0.chainId,
        decimals: pool.token0.decimals,
        isNative: pool.token0.isNative
      },
      tokenB: {
        address: pool.token1.address,
        chainId: pool.token1.chainId,
        decimals: pool.token1.decimals,
        isNative: pool.token1.isNative
      }
    } : undefined
  };
}
function buildPools(pools) {
  return pools.map(function (pool) {
    return buildPool(pool);
  });
}
function buildTradeRouteInput(swap) {
  return _objectSpread(_objectSpread({}, buildTradeRouteInputAmounts({
    inputAmount: swap.inputAmount,
    outputAmount: swap.outputAmount
  })), {}, {
    pools: buildPools(swap.route.pools)
  });
}
function buildAllTradeRouteInputs(trade) {
  var mixedTokenTradeRouteInputs = [];
  var v2TokenTradeRouteInputs = [];
  var v3TokenTradeRouteInputs = [];
  var swaps = trade.swaps;
  var _iterator = _createForOfIteratorHelper(swaps),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var swap = _step.value;
      if (swap.route.protocol === routerSdk.Protocol.MIXED) {
        mixedTokenTradeRouteInputs.push(buildTradeRouteInput(swap));
      } else if (swap.route.protocol === routerSdk.Protocol.V2) {
        v2TokenTradeRouteInputs.push(buildTradeRouteInput(swap));
      } else {
        v3TokenTradeRouteInputs.push(buildTradeRouteInput(swap));
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return {
    mixedTokenTradeRouteInputs: mixedTokenTradeRouteInputs.length > 0 ? mixedTokenTradeRouteInputs : undefined,
    v2TokenTradeRouteInputs: v2TokenTradeRouteInputs.length > 0 ? v2TokenTradeRouteInputs : undefined,
    v3TokenTradeRouteInputs: v3TokenTradeRouteInputs.length > 0 ? v3TokenTradeRouteInputs : undefined
  };
}

exports.buildAllTradeRouteInputs = buildAllTradeRouteInputs;
