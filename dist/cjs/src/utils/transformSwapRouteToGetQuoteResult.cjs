'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var routerSdk = require('@uniswap/router-sdk');
var sdkCore = require('@uniswap/sdk-core');
var smartOrderRouter = require('@uniswap/smart-order-router');
var v3Sdk = require('@uniswap/v3-sdk');
var types = require('../state/routing/types.cjs');

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
// from routing-api (https://github.com/Uniswap/routing-api/blob/main/lib/handlers/quote/quote.ts#L243-L311)
function transformSwapRouteToGetQuoteResult(tradeType, amount, _ref) {
  var quote = _ref.quote,
    quoteGasAdjusted = _ref.quoteGasAdjusted,
    route = _ref.route,
    estimatedGasUsed = _ref.estimatedGasUsed,
    estimatedGasUsedQuoteToken = _ref.estimatedGasUsedQuoteToken,
    estimatedGasUsedUSD = _ref.estimatedGasUsedUSD,
    gasPriceWei = _ref.gasPriceWei,
    methodParameters = _ref.methodParameters,
    blockNumber = _ref.blockNumber;
  var routeResponse = [];
  var _iterator = _createForOfIteratorHelper(route),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var subRoute = _step.value;
      var _amount = subRoute.amount,
        _quote = subRoute.quote,
        tokenPath = subRoute.tokenPath;
      var pools = subRoute.protocol === routerSdk.Protocol.V2 ? subRoute.route.pairs : subRoute.route.pools;
      var curRoute = [];
      for (var i = 0; i < pools.length; i++) {
        var nextPool = pools[i];
        var tokenIn = tokenPath[i];
        var tokenOut = tokenPath[i + 1];
        var edgeAmountIn = undefined;
        if (i === 0) {
          edgeAmountIn = tradeType === sdkCore.TradeType.EXACT_INPUT ? _amount.quotient.toString() : _quote.quotient.toString();
        }
        var edgeAmountOut = undefined;
        if (i === pools.length - 1) {
          edgeAmountOut = tradeType === sdkCore.TradeType.EXACT_INPUT ? _quote.quotient.toString() : _amount.quotient.toString();
        }
        if (nextPool instanceof v3Sdk.Pool) {
          curRoute.push({
            type: "v3-pool",
            tokenIn: {
              chainId: tokenIn.chainId,
              decimals: tokenIn.decimals,
              address: tokenIn.address,
              symbol: tokenIn.symbol
            },
            tokenOut: {
              chainId: tokenOut.chainId,
              decimals: tokenOut.decimals,
              address: tokenOut.address,
              symbol: tokenOut.symbol
            },
            fee: nextPool.fee.toString(),
            liquidity: nextPool.liquidity.toString(),
            sqrtRatioX96: nextPool.sqrtRatioX96.toString(),
            tickCurrent: nextPool.tickCurrent.toString(),
            amountIn: edgeAmountIn,
            amountOut: edgeAmountOut
          });
        } else {
          var reserve0 = nextPool.reserve0;
          var reserve1 = nextPool.reserve1;
          curRoute.push({
            type: "v2-pool",
            tokenIn: {
              chainId: tokenIn.chainId,
              decimals: tokenIn.decimals,
              address: tokenIn.address,
              symbol: tokenIn.symbol
            },
            tokenOut: {
              chainId: tokenOut.chainId,
              decimals: tokenOut.decimals,
              address: tokenOut.address,
              symbol: tokenOut.symbol
            },
            reserve0: {
              token: {
                chainId: reserve0.currency.wrapped.chainId,
                decimals: reserve0.currency.wrapped.decimals,
                address: reserve0.currency.wrapped.address,
                symbol: reserve0.currency.wrapped.symbol
              },
              quotient: reserve0.quotient.toString()
            },
            reserve1: {
              token: {
                chainId: reserve1.currency.wrapped.chainId,
                decimals: reserve1.currency.wrapped.decimals,
                address: reserve1.currency.wrapped.address,
                symbol: reserve1.currency.wrapped.symbol
              },
              quotient: reserve1.quotient.toString()
            },
            amountIn: edgeAmountIn,
            amountOut: edgeAmountOut
          });
        }
      }
      routeResponse.push(curRoute);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  var result = {
    methodParameters: methodParameters,
    blockNumber: blockNumber.toString(),
    amount: amount.quotient.toString(),
    amountDecimals: amount.toExact(),
    quote: quote.quotient.toString(),
    quoteDecimals: quote.toExact(),
    quoteGasAdjusted: quoteGasAdjusted.quotient.toString(),
    quoteGasAdjustedDecimals: quoteGasAdjusted.toExact(),
    gasUseEstimateQuote: estimatedGasUsedQuoteToken.quotient.toString(),
    gasUseEstimateQuoteDecimals: estimatedGasUsedQuoteToken.toExact(),
    gasUseEstimate: estimatedGasUsed.toString(),
    gasUseEstimateUSD: estimatedGasUsedUSD.toExact(),
    gasPriceWei: gasPriceWei.toString(),
    route: routeResponse,
    routeString: smartOrderRouter.routeAmountsToString(route)
  };
  return {
    state: types.QuoteState.SUCCESS,
    data: {
      routing: types.URAQuoteType.CLASSIC,
      quote: result,
      allQuotes: []
    }
  };
}

exports.transformSwapRouteToGetQuoteResult = transformSwapRouteToGetQuoteResult;
