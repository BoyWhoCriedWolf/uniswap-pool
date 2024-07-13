'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/typeof');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var react = require('@reduxjs/toolkit/query/react');
var routerSdk = require('@uniswap/router-sdk');
var sdkCore = require('@uniswap/sdk-core');
var index = require('../../analytics/index.cjs');
var chains = require('../../constants/chains.cjs');
var ms = require('ms');
var swapFlowLoggers = require('../../tracing/swapFlowLoggers.cjs');
var trace = require('../../tracing/trace.cjs');
var types = require('./types.cjs');
var utils = require('./utils.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// const UNISWAP_API_URL = process.env.REACT_APP_UNISWAP_API_URL;
var UNISWAP_API_URL = "https://api.uniswap.org/v2";
var CLIENT_PARAMS = {
  protocols: [routerSdk.Protocol.V2, routerSdk.Protocol.V3, routerSdk.Protocol.MIXED]
};
var protocols = [routerSdk.Protocol.V2, routerSdk.Protocol.V3, routerSdk.Protocol.MIXED];

// routing API quote query params: https://github.com/Uniswap/routing-api/blob/main/lib/handlers/quote/schema/quote-schema.ts
var DEFAULT_QUERY_PARAMS = {
  protocols: protocols
};
function getQuoteLatencyMeasure(mark) {
  performance.mark("quote-fetch-end");
  return performance.measure("quote-fetch-latency", mark.name, "quote-fetch-end");
}
function getRoutingAPIConfig(args) {
  var account = args.account,
    tradeType = args.tradeType,
    tokenOutAddress = args.tokenOutAddress,
    tokenInChainId = args.tokenInChainId,
    uniswapXForceSyntheticQuotes = args.uniswapXForceSyntheticQuotes,
    uniswapXEthOutputEnabled = args.uniswapXEthOutputEnabled,
    uniswapXExactOutputEnabled = args.uniswapXExactOutputEnabled,
    routerPreference = args.routerPreference;
  var uniswapx = {
    useSyntheticQuotes: uniswapXForceSyntheticQuotes,
    // Protocol supports swap+send to different destination address, but
    // for now recipient === swapper
    recipient: account,
    swapper: account,
    routingType: types.URAQuoteType.DUTCH_LIMIT
  };
  var classic = _objectSpread(_objectSpread({}, DEFAULT_QUERY_PARAMS), {}, {
    routingType: types.URAQuoteType.CLASSIC
  });
  var tokenOutIsNative = Object.values(types.SwapRouterNativeAssets).includes(tokenOutAddress);

  // UniswapX doesn't support native out, exact-out, or non-mainnet trades (yet),
  // so even if the user has selected UniswapX as their router preference, force them to receive a Classic quote.
  if (
  // If the user has opted out of UniswapX during the opt-out transition period, we should respect that preference and only request classic quotes.
  args.userOptedOutOfUniswapX && routerPreference !== types.RouterPreference.X || tokenOutIsNative && !uniswapXEthOutputEnabled || !uniswapXExactOutputEnabled && tradeType === sdkCore.TradeType.EXACT_OUTPUT || !chains.isUniswapXSupportedChain(tokenInChainId) || routerPreference === types.INTERNAL_ROUTER_PREFERENCE_PRICE) {
    return [classic];
  }
  return [uniswapx, classic];
}
var routingApi = react.createApi({
  reducerPath: "routingApi",
  baseQuery: react.fetchBaseQuery({
    baseUrl: UNISWAP_API_URL
  }),
  endpoints: function endpoints(build) {
    return {
      getQuote: build.query({
        onQueryStarted: function onQueryStarted(args, _ref) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
            var queryFulfilled;
            return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  queryFulfilled = _ref.queryFulfilled;
                  trace.trace("quote", /*#__PURE__*/function () {
                    var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(_ref2) {
                      var setTraceError, setTraceStatus, queryError;
                      return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
                        while (1) switch (_context.prev = _context.next) {
                          case 0:
                            setTraceError = _ref2.setTraceError, setTraceStatus = _ref2.setTraceStatus;
                            _context.prev = 1;
                            _context.next = 4;
                            return queryFulfilled;
                          case 4:
                            _context.next = 15;
                            break;
                          case 6:
                            _context.prev = 6;
                            _context.t0 = _context["catch"](1);
                            if (!(_context.t0 && _typeof__default["default"](_context.t0) === "object" && "error" in _context.t0)) {
                              _context.next = 14;
                              break;
                            }
                            queryError = _context.t0.error;
                            if (typeof queryError.status === "number") {
                              setTraceStatus(queryError.status);
                            }
                            setTraceError(queryError);
                            _context.next = 15;
                            break;
                          case 14:
                            throw _context.t0;
                          case 15:
                          case "end":
                            return _context.stop();
                        }
                      }, _callee, null, [[1, 6]]);
                    }));
                    return function (_x) {
                      return _ref3.apply(this, arguments);
                    };
                  }(), {
                    data: _objectSpread(_objectSpread({}, args), {}, {
                      isPrice: args.routerPreference === types.INTERNAL_ROUTER_PREFERENCE_PRICE,
                      isAutoRouter: args.routerPreference === types.RouterPreference.API
                    })
                  });
                case 2:
                case "end":
                  return _context2.stop();
              }
            }, _callee2);
          }))();
        },
        queryFn: function queryFn(args, _api, _extraOptions, fetch) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3() {
            var fellBack, quoteStartMark, tokenInAddress, tokenInChainId, tokenOutAddress, tokenOutChainId, amount, tradeType, type, requestBody, response, errorData, uraQuoteResponse, tradeResult, _ref4, _error$message, method, _yield$import, getRouter, getClientSideQuote, router, quoteResult, trade, _ref5, _error$detail;
            return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  fellBack = false;
                  swapFlowLoggers.logSwapQuoteRequest(args.tokenInChainId, args.routerPreference, false);
                  quoteStartMark = performance.mark("quote-fetch-start-".concat(Date.now()));
                  if (!utils.shouldUseAPIRouter(args)) {
                    _context3.next = 33;
                    break;
                  }
                  fellBack = true;
                  _context3.prev = 5;
                  tokenInAddress = args.tokenInAddress, tokenInChainId = args.tokenInChainId, tokenOutAddress = args.tokenOutAddress, tokenOutChainId = args.tokenOutChainId, amount = args.amount, tradeType = args.tradeType;
                  type = utils.isExactInput(tradeType) ? "EXACT_INPUT" : "EXACT_OUTPUT";
                  requestBody = {
                    tokenInChainId: tokenInChainId,
                    tokenIn: tokenInAddress,
                    tokenOutChainId: tokenOutChainId,
                    tokenOut: tokenOutAddress,
                    amount: amount,
                    type: type,
                    intent: args.routerPreference === types.INTERNAL_ROUTER_PREFERENCE_PRICE ? "pricing" : undefined,
                    configs: getRoutingAPIConfig(args)
                  };
                  _context3.next = 11;
                  return fetch({
                    method: "POST",
                    url: "/quote",
                    body: JSON.stringify(requestBody)
                  });
                case 11:
                  response = _context3.sent;
                  if (!response.error) {
                    _context3.next = 23;
                    break;
                  }
                  _context3.prev = 13;
                  // cast as any here because we do a runtime check on it being an object before indexing into .errorCode
                  errorData = response.error.data; // NO_ROUTE should be treated as a valid response to prevent retries.
                  if (!(_typeof__default["default"](errorData) === "object" && ((errorData === null || errorData === void 0 ? void 0 : errorData.errorCode) === "NO_ROUTE" || (errorData === null || errorData === void 0 ? void 0 : errorData.detail) === "No quotes available"))) {
                    _context3.next = 18;
                    break;
                  }
                  index.sendAnalyticsEvent("No quote received from routing API", {
                    requestBody: requestBody,
                    response: response,
                    routerPreference: args.routerPreference
                  });
                  return _context3.abrupt("return", {
                    data: {
                      state: types.QuoteState.NOT_FOUND,
                      latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration
                    }
                  });
                case 18:
                  _context3.next = 23;
                  break;
                case 20:
                  _context3.prev = 20;
                  _context3.t0 = _context3["catch"](13);
                  throw response.error;
                case 23:
                  uraQuoteResponse = response.data;
                  _context3.next = 26;
                  return utils.transformRoutesToTrade(args, uraQuoteResponse, types.QuoteMethod.ROUTING_API);
                case 26:
                  tradeResult = _context3.sent;
                  return _context3.abrupt("return", {
                    data: _objectSpread(_objectSpread({}, tradeResult), {}, {
                      latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration
                    })
                  });
                case 30:
                  _context3.prev = 30;
                  _context3.t1 = _context3["catch"](5);
                  console.warn("GetQuote failed on Unified Routing API, falling back to client: ".concat((_ref4 = (_error$message = _context3.t1 === null || _context3.t1 === void 0 ? void 0 : _context3.t1.message) !== null && _error$message !== void 0 ? _error$message : _context3.t1 === null || _context3.t1 === void 0 ? void 0 : _context3.t1.detail) !== null && _ref4 !== void 0 ? _ref4 : _context3.t1));
                case 33:
                  _context3.prev = 33;
                  method = fellBack ? types.QuoteMethod.CLIENT_SIDE_FALLBACK : types.QuoteMethod.CLIENT_SIDE;
                  _context3.next = 37;
                  return Promise.resolve().then(function () { return require('../../lib/hooks/routing/clientSideSmartOrderRouter.cjs'); });
                case 37:
                  _yield$import = _context3.sent;
                  getRouter = _yield$import.getRouter;
                  getClientSideQuote = _yield$import.getClientSideQuote;
                  router = getRouter(args.tokenInChainId);
                  _context3.next = 43;
                  return getClientSideQuote(args, router, CLIENT_PARAMS);
                case 43:
                  quoteResult = _context3.sent;
                  if (!(quoteResult.state === types.QuoteState.SUCCESS)) {
                    _context3.next = 51;
                    break;
                  }
                  _context3.next = 47;
                  return utils.transformRoutesToTrade(args, quoteResult.data, method);
                case 47:
                  trade = _context3.sent;
                  return _context3.abrupt("return", {
                    data: _objectSpread(_objectSpread({}, trade), {}, {
                      latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration
                    })
                  });
                case 51:
                  return _context3.abrupt("return", {
                    data: _objectSpread(_objectSpread({}, quoteResult), {}, {
                      latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration
                    })
                  });
                case 52:
                  _context3.next = 58;
                  break;
                case 54:
                  _context3.prev = 54;
                  _context3.t2 = _context3["catch"](33);
                  console.warn("GetQuote failed on client: ".concat(_context3.t2));
                  return _context3.abrupt("return", {
                    error: {
                      status: "CUSTOM_ERROR",
                      error: (_ref5 = (_error$detail = _context3.t2 === null || _context3.t2 === void 0 ? void 0 : _context3.t2.detail) !== null && _error$detail !== void 0 ? _error$detail : _context3.t2 === null || _context3.t2 === void 0 ? void 0 : _context3.t2.message) !== null && _ref5 !== void 0 ? _ref5 : _context3.t2
                    }
                  });
                case 58:
                case "end":
                  return _context3.stop();
              }
            }, _callee3, null, [[5, 30], [13, 20], [33, 54]]);
          }))();
        },
        keepUnusedDataFor: ms__default["default"]("10s"),
        extraOptions: {
          maxRetries: 0
        }
      })
    };
  }
});
var useGetQuoteQuery = routingApi.useGetQuoteQuery;
var useGetQuoteQueryState = routingApi.endpoints.getQuote.useQueryState;

exports.routingApi = routingApi;
exports.useGetQuoteQuery = useGetQuoteQuery;
exports.useGetQuoteQueryState = useGetQuoteQueryState;
