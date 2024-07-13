'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var bignumber = require('@ethersproject/bignumber');
var routerSdk = require('@uniswap/router-sdk');
var sdkCore = require('@uniswap/sdk-core');
var v2Sdk = require('@uniswap/v2-sdk');
var v3Sdk = require('@uniswap/v3-sdk');
var tokens = require('../../constants/tokens.cjs');
var slippage = require('../../utils/slippage.cjs');
var gas = require('./gas.cjs');
var types = require('./types.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * Transforms a Routing API quote into an array of routes that can be used to
 * create a `Trade`.
 */
function computeRoutes(currencyIn, currencyOut, routes) {
  var _routes$, _routes$2, _routes$3;
  if (routes.length === 0) return [];
  var tokenIn = (_routes$ = routes[0]) === null || _routes$ === void 0 || (_routes$ = _routes$[0]) === null || _routes$ === void 0 ? void 0 : _routes$.tokenIn;
  var tokenOut = (_routes$2 = routes[0]) === null || _routes$2 === void 0 || (_routes$2 = _routes$2[((_routes$3 = routes[0]) === null || _routes$3 === void 0 ? void 0 : _routes$3.length) - 1]) === null || _routes$2 === void 0 ? void 0 : _routes$2.tokenOut;
  if (!tokenIn || !tokenOut) throw new Error("Expected both tokenIn and tokenOut to be present");
  try {
    return routes.map(function (route) {
      if (route.length === 0) {
        throw new Error("Expected route to have at least one pair or pool");
      }
      var rawAmountIn = route[0].amountIn;
      var rawAmountOut = route[route.length - 1].amountOut;
      if (!rawAmountIn || !rawAmountOut) {
        throw new Error("Expected both amountIn and amountOut to be present");
      }
      var isOnlyV2 = isVersionedRoute(types.PoolType.V2Pool, route);
      var isOnlyV3 = isVersionedRoute(types.PoolType.V3Pool, route);
      return {
        routev3: isOnlyV3 ? new v3Sdk.Route(route.map(parsePool), currencyIn, currencyOut) : null,
        routev2: isOnlyV2 ? new v2Sdk.Route(route.map(parsePair), currencyIn, currencyOut) : null,
        mixedRoute: !isOnlyV3 && !isOnlyV2 ? new routerSdk.MixedRouteSDK(route.map(parsePoolOrPair), currencyIn, currencyOut) : null,
        inputAmount: sdkCore.CurrencyAmount.fromRawAmount(currencyIn, rawAmountIn),
        outputAmount: sdkCore.CurrencyAmount.fromRawAmount(currencyOut, rawAmountOut)
      };
    });
  } catch (e) {
    console.error("Error computing routes", e);
    return;
  }
}
var parsePoolOrPair = function parsePoolOrPair(pool) {
  return pool.type === types.PoolType.V3Pool ? parsePool(pool) : parsePair(pool);
};
function isVersionedRoute(type, route) {
  return route.every(function (pool) {
    return pool.type === type;
  });
}
function toDutchOrderInfo(orderInfoJSON) {
  var nonce = orderInfoJSON.nonce,
    input = orderInfoJSON.input,
    outputs = orderInfoJSON.outputs,
    exclusivityOverrideBps = orderInfoJSON.exclusivityOverrideBps;
  return _objectSpread(_objectSpread({}, orderInfoJSON), {}, {
    nonce: bignumber.BigNumber.from(nonce),
    exclusivityOverrideBps: bignumber.BigNumber.from(exclusivityOverrideBps),
    input: _objectSpread(_objectSpread({}, input), {}, {
      startAmount: bignumber.BigNumber.from(input.startAmount),
      endAmount: bignumber.BigNumber.from(input.endAmount)
    }),
    outputs: outputs.map(function (output) {
      return _objectSpread(_objectSpread({}, output), {}, {
        startAmount: bignumber.BigNumber.from(output.startAmount),
        endAmount: bignumber.BigNumber.from(output.endAmount)
      });
    })
  });
}

// Prepares the currencies used for the actual Swap (either UniswapX or Universal Router)
// May not match `currencyIn` that the user selected because for ETH inputs in UniswapX, the actual
// swap will use WETH.
function getTradeCurrencies(args, isUniswapXTrade) {
  var tokenInAddress = args.tokenInAddress,
    tokenInChainId = args.tokenInChainId,
    tokenInDecimals = args.tokenInDecimals,
    tokenInSymbol = args.tokenInSymbol,
    tokenOutAddress = args.tokenOutAddress,
    tokenOutChainId = args.tokenOutChainId,
    tokenOutDecimals = args.tokenOutDecimals,
    tokenOutSymbol = args.tokenOutSymbol;
  var tokenInIsNative = Object.values(types.SwapRouterNativeAssets).includes(tokenInAddress);
  var tokenOutIsNative = Object.values(types.SwapRouterNativeAssets).includes(tokenOutAddress);
  var currencyIn = tokenInIsNative ? tokens.nativeOnChain(tokenInChainId) : parseToken({
    address: tokenInAddress,
    chainId: tokenInChainId,
    decimals: tokenInDecimals,
    symbol: tokenInSymbol
  });
  var currencyOut = tokenOutIsNative ? tokens.nativeOnChain(tokenOutChainId) : parseToken({
    address: tokenOutAddress,
    chainId: tokenOutChainId,
    decimals: tokenOutDecimals,
    symbol: tokenOutSymbol
  });
  if (!isUniswapXTrade) {
    return [currencyIn, currencyOut];
  }
  return [currencyIn.isNative ? currencyIn.wrapped : currencyIn, currencyOut];
}
function getClassicTradeDetails(currencyIn, currencyOut, data) {
  var _data$allQuotes$find;
  var classicQuote = data.routing === types.URAQuoteType.CLASSIC ? data.quote : (_data$allQuotes$find = data.allQuotes.find(types.isClassicQuoteResponse)) === null || _data$allQuotes$find === void 0 ? void 0 : _data$allQuotes$find.quote;
  return {
    gasUseEstimate: classicQuote !== null && classicQuote !== void 0 && classicQuote.gasUseEstimate ? parseFloat(classicQuote.gasUseEstimate) : undefined,
    gasUseEstimateUSD: classicQuote !== null && classicQuote !== void 0 && classicQuote.gasUseEstimateUSD ? parseFloat(classicQuote.gasUseEstimateUSD) : undefined,
    blockNumber: classicQuote === null || classicQuote === void 0 ? void 0 : classicQuote.blockNumber,
    routes: classicQuote ? computeRoutes(currencyIn, currencyOut, classicQuote.route) : undefined
  };
}
function transformQuickRouteToTrade(args, data) {
  var amount = args.amount,
    tradeType = args.tradeType,
    inputTax = args.inputTax,
    outputTax = args.outputTax;
  var _getTradeCurrencies = getTradeCurrencies(args, false),
    _getTradeCurrencies2 = _slicedToArray__default["default"](_getTradeCurrencies, 2),
    currencyIn = _getTradeCurrencies2[0],
    currencyOut = _getTradeCurrencies2[1];
  var _ref = data.tradeType === "EXACT_IN" ? [amount, data.quote.amount] : [data.quote.amount, amount],
    _ref2 = _slicedToArray__default["default"](_ref, 2),
    rawAmountIn = _ref2[0],
    rawAmountOut = _ref2[1];
  var inputAmount = sdkCore.CurrencyAmount.fromRawAmount(currencyIn, rawAmountIn);
  var outputAmount = sdkCore.CurrencyAmount.fromRawAmount(currencyOut, rawAmountOut);
  return new types.PreviewTrade({
    inputAmount: inputAmount,
    outputAmount: outputAmount,
    tradeType: tradeType,
    inputTax: inputTax,
    outputTax: outputTax
  });
}
function transformRoutesToTrade(_x, _x2, _x3) {
  return _transformRoutesToTrade.apply(this, arguments);
}
function _transformRoutesToTrade() {
  _transformRoutesToTrade = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(args, data, quoteMethod) {
    var _routes$filter$map, _routes$filter$map2, _routes$filter$map3;
    var tradeType, needsWrapIfUniswapX, routerPreference, account, amount, isUniswapXDefaultEnabled, inputTax, outputTax, showUniswapXTrade, _getTradeCurrencies3, _getTradeCurrencies4, currencyIn, currencyOut, _getClassicTradeDetai, gasUseEstimateUSD, blockNumber, routes, gasUseEstimate, isUniswapXBetter, usdCostPerGas, approveInfo, classicTrade, orderInfo, wrapInfo, uniswapXTrade;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          tradeType = args.tradeType, needsWrapIfUniswapX = args.needsWrapIfUniswapX, routerPreference = args.routerPreference, account = args.account, amount = args.amount, isUniswapXDefaultEnabled = args.isUniswapXDefaultEnabled, inputTax = args.inputTax, outputTax = args.outputTax;
          showUniswapXTrade = data.routing === types.URAQuoteType.DUTCH_LIMIT && (routerPreference === types.RouterPreference.X || isUniswapXDefaultEnabled && routerPreference === types.RouterPreference.API);
          _getTradeCurrencies3 = getTradeCurrencies(args, showUniswapXTrade), _getTradeCurrencies4 = _slicedToArray__default["default"](_getTradeCurrencies3, 2), currencyIn = _getTradeCurrencies4[0], currencyOut = _getTradeCurrencies4[1];
          _getClassicTradeDetai = getClassicTradeDetails(currencyIn, currencyOut, data), gasUseEstimateUSD = _getClassicTradeDetai.gasUseEstimateUSD, blockNumber = _getClassicTradeDetai.blockNumber, routes = _getClassicTradeDetai.routes, gasUseEstimate = _getClassicTradeDetai.gasUseEstimate; // If the top-level URA quote type is DUTCH_LIMIT, then UniswapX is better for the user
          isUniswapXBetter = data.routing === types.URAQuoteType.DUTCH_LIMIT; // Some sus javascript float math but it's ok because its just an estimate for display purposes
          usdCostPerGas = gasUseEstimateUSD && gasUseEstimate ? gasUseEstimateUSD / gasUseEstimate : undefined;
          _context.next = 8;
          return gas.getApproveInfo(account, currencyIn, amount, usdCostPerGas);
        case 8:
          approveInfo = _context.sent;
          classicTrade = new types.ClassicTrade({
            v2Routes: (_routes$filter$map = routes === null || routes === void 0 ? void 0 : routes.filter(function (r) {
              return r.routev2 !== null;
            }).map(function (_ref6) {
              var routev2 = _ref6.routev2,
                inputAmount = _ref6.inputAmount,
                outputAmount = _ref6.outputAmount;
              return {
                routev2: routev2,
                inputAmount: inputAmount,
                outputAmount: outputAmount
              };
            })) !== null && _routes$filter$map !== void 0 ? _routes$filter$map : [],
            v3Routes: (_routes$filter$map2 = routes === null || routes === void 0 ? void 0 : routes.filter(function (r) {
              return r.routev3 !== null;
            }).map(function (_ref7) {
              var routev3 = _ref7.routev3,
                inputAmount = _ref7.inputAmount,
                outputAmount = _ref7.outputAmount;
              return {
                routev3: routev3,
                inputAmount: inputAmount,
                outputAmount: outputAmount
              };
            })) !== null && _routes$filter$map2 !== void 0 ? _routes$filter$map2 : [],
            mixedRoutes: (_routes$filter$map3 = routes === null || routes === void 0 ? void 0 : routes.filter(function (r) {
              return r.mixedRoute !== null;
            }).map(function (_ref8) {
              var mixedRoute = _ref8.mixedRoute,
                inputAmount = _ref8.inputAmount,
                outputAmount = _ref8.outputAmount;
              return {
                mixedRoute: mixedRoute,
                inputAmount: inputAmount,
                outputAmount: outputAmount
              };
            })) !== null && _routes$filter$map3 !== void 0 ? _routes$filter$map3 : [],
            tradeType: tradeType,
            gasUseEstimateUSD: gasUseEstimateUSD,
            approveInfo: approveInfo,
            blockNumber: blockNumber,
            isUniswapXBetter: isUniswapXBetter,
            requestId: data.quote.requestId,
            quoteMethod: quoteMethod,
            inputTax: inputTax,
            outputTax: outputTax
          }); // During the opt-in period, only return UniswapX quotes if the user has turned on the setting,
          // even if it is the better quote.
          if (!(isUniswapXBetter && (routerPreference === types.RouterPreference.X || isUniswapXDefaultEnabled))) {
            _context.next = 17;
            break;
          }
          orderInfo = toDutchOrderInfo(data.quote.orderInfo);
          _context.next = 14;
          return gas.getWrapInfo(needsWrapIfUniswapX, account, currencyIn.chainId, amount, usdCostPerGas);
        case 14:
          wrapInfo = _context.sent;
          uniswapXTrade = new types.DutchOrderTrade({
            currencyIn: currencyIn,
            currenciesOut: [currencyOut],
            orderInfo: orderInfo,
            tradeType: tradeType,
            quoteId: data.quote.quoteId,
            requestId: data.quote.requestId,
            classicGasUseEstimateUSD: classicTrade.totalGasUseEstimateUSD,
            wrapInfo: wrapInfo,
            approveInfo: approveInfo,
            auctionPeriodSecs: data.quote.auctionPeriodSecs,
            startTimeBufferSecs: data.quote.startTimeBufferSecs,
            deadlineBufferSecs: data.quote.deadlineBufferSecs,
            slippageTolerance: slippage.toSlippagePercent(data.quote.slippageTolerance)
          });
          return _context.abrupt("return", {
            state: types.QuoteState.SUCCESS,
            trade: uniswapXTrade
          });
        case 17:
          return _context.abrupt("return", {
            state: types.QuoteState.SUCCESS,
            trade: classicTrade
          });
        case 18:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _transformRoutesToTrade.apply(this, arguments);
}
function parseToken(_ref3) {
  var address = _ref3.address,
    chainId = _ref3.chainId,
    decimals = _ref3.decimals,
    symbol = _ref3.symbol;
  return new sdkCore.Token(chainId, address, parseInt(decimals.toString()), symbol);
}
function parsePool(_ref4) {
  var fee = _ref4.fee,
    sqrtRatioX96 = _ref4.sqrtRatioX96,
    liquidity = _ref4.liquidity,
    tickCurrent = _ref4.tickCurrent,
    tokenIn = _ref4.tokenIn,
    tokenOut = _ref4.tokenOut;
  return new v3Sdk.Pool(parseToken(tokenIn), parseToken(tokenOut), parseInt(fee), sqrtRatioX96, liquidity, parseInt(tickCurrent));
}
var parsePair = function parsePair(_ref5) {
  var reserve0 = _ref5.reserve0,
    reserve1 = _ref5.reserve1;
  return new v2Sdk.Pair(sdkCore.CurrencyAmount.fromRawAmount(parseToken(reserve0.token), reserve0.quotient), sdkCore.CurrencyAmount.fromRawAmount(parseToken(reserve1.token), reserve1.quotient));
};

// TODO(WEB-2050): Convert other instances of tradeType comparison to use this utility function
function isExactInput(tradeType) {
  return tradeType === sdkCore.TradeType.EXACT_INPUT;
}
function currencyAddressForSwapQuote(currency) {
  if (currency.isNative) {
    if (tokens.isMatic(currency.chainId)) return types.SwapRouterNativeAssets.MATIC;
    if (tokens.isBsc(currency.chainId)) return types.SwapRouterNativeAssets.BNB;
    if (tokens.isAvalanche(currency.chainId)) return types.SwapRouterNativeAssets.AVAX;
    return types.SwapRouterNativeAssets.ETH;
  }
  return currency.address;
}
function isClassicTrade(trade) {
  return (trade === null || trade === void 0 ? void 0 : trade.fillType) === types.TradeFillType.Classic;
}
function isPreviewTrade(trade) {
  return (trade === null || trade === void 0 ? void 0 : trade.fillType) === types.TradeFillType.None;
}
function isSubmittableTrade(trade) {
  return (trade === null || trade === void 0 ? void 0 : trade.fillType) === types.TradeFillType.Classic || (trade === null || trade === void 0 ? void 0 : trade.fillType) === types.TradeFillType.UniswapX;
}
function isUniswapXTrade(trade) {
  return (trade === null || trade === void 0 ? void 0 : trade.fillType) === types.TradeFillType.UniswapX;
}
function shouldUseAPIRouter(args) {
  return args.routerPreference !== types.RouterPreference.CLIENT;
}

exports.computeRoutes = computeRoutes;
exports.currencyAddressForSwapQuote = currencyAddressForSwapQuote;
exports.isClassicTrade = isClassicTrade;
exports.isExactInput = isExactInput;
exports.isPreviewTrade = isPreviewTrade;
exports.isSubmittableTrade = isSubmittableTrade;
exports.isUniswapXTrade = isUniswapXTrade;
exports.shouldUseAPIRouter = shouldUseAPIRouter;
exports.transformQuickRouteToTrade = transformQuickRouteToTrade;
exports.transformRoutesToTrade = transformRoutesToTrade;
