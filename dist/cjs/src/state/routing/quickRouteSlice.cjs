'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _typeof = require('@babel/runtime/helpers/typeof');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var react = require('@reduxjs/toolkit/query/react');
var index = require('../../analytics/index.cjs');
var ms = require('ms');
var swapFlowLoggers = require('../../tracing/swapFlowLoggers.cjs');
var trace = require('../../tracing/trace.cjs');
var types = require('./types.cjs');
var utils = require('./utils.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// const UNISWAP_API_URL = process.env.REACT_APP_UNISWAP_API_URL;
var UNISWAP_API_URL = "https://api.uniswap.org/v2";
function getQuoteLatencyMeasure(mark) {
  performance.mark("quickroute-fetch-end");
  return performance.measure("quickroute-fetch-latency", mark.name, "quickroute-fetch-end");
}
var quickRouteApi = react.createApi({
  reducerPath: "quickRouteApi",
  baseQuery: react.fetchBaseQuery({
    baseUrl: UNISWAP_API_URL
  }),
  endpoints: function endpoints(build) {
    return {
      getQuickRoute: build.query({
        onQueryStarted: function onQueryStarted(args, _ref) {
          return _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
            var queryFulfilled;
            return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
              while (1) switch (_context2.prev = _context2.next) {
                case 0:
                  queryFulfilled = _ref.queryFulfilled;
                  trace.trace("quickroute", /*#__PURE__*/function () {
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
                    data: _objectSpread({}, args)
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
            var quoteStartMark, tokenInAddress, tokenInChainId, tokenOutAddress, tokenOutChainId, amount, tradeType, type, requestBody, response, errorData, quickRouteResponse, previewTrade;
            return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
              while (1) switch (_context3.prev = _context3.next) {
                case 0:
                  swapFlowLoggers.logSwapQuoteRequest(args.tokenInChainId, types.RouterPreference.API, true);
                  quoteStartMark = performance.mark("quickroute-fetch-start-".concat(Date.now()));
                  tokenInAddress = args.tokenInAddress, tokenInChainId = args.tokenInChainId, tokenOutAddress = args.tokenOutAddress, tokenOutChainId = args.tokenOutChainId, amount = args.amount, tradeType = args.tradeType;
                  type = utils.isExactInput(tradeType) ? "EXACT_IN" : "EXACT_OUT";
                  requestBody = {
                    tokenInChainId: tokenInChainId,
                    tokenInAddress: tokenInAddress,
                    tokenOutChainId: tokenOutChainId,
                    tokenOutAddress: tokenOutAddress,
                    amount: amount,
                    tradeType: type
                  };
                  _context3.next = 7;
                  return fetch({
                    method: "GET",
                    url: "/quickroute",
                    params: requestBody
                  });
                case 7:
                  response = _context3.sent;
                  if (!response.error) {
                    _context3.next = 16;
                    break;
                  }
                  // cast as any here because we do a runtime check on it being an object before indexing into .errorCode
                  errorData = response.error.data; // NO_ROUTE should be treated as a valid response to prevent retries.
                  if (!(_typeof__default["default"](errorData) === "object" && ((errorData === null || errorData === void 0 ? void 0 : errorData.errorCode) === "NO_ROUTE" || (errorData === null || errorData === void 0 ? void 0 : errorData.detail) === "No quotes available"))) {
                    _context3.next = 15;
                    break;
                  }
                  index.sendAnalyticsEvent("No quote received from quickroute API", {
                    requestBody: requestBody,
                    response: response
                  });
                  return _context3.abrupt("return", {
                    data: {
                      state: types.QuoteState.NOT_FOUND,
                      latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration
                    }
                  });
                case 15:
                  return _context3.abrupt("return", {
                    error: response.error
                  });
                case 16:
                  quickRouteResponse = response.data;
                  previewTrade = utils.transformQuickRouteToTrade(args, quickRouteResponse);
                  return _context3.abrupt("return", {
                    data: {
                      state: types.QuoteState.SUCCESS,
                      trade: previewTrade,
                      latencyMs: getQuoteLatencyMeasure(quoteStartMark).duration
                    }
                  });
                case 19:
                case "end":
                  return _context3.stop();
              }
            }, _callee3);
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
var useGetQuickRouteQuery = quickRouteApi.useGetQuickRouteQuery;
var useGetQuickRouteQueryState = quickRouteApi.endpoints.getQuickRoute.useQueryState;

exports.quickRouteApi = quickRouteApi;
exports.useGetQuickRouteQuery = useGetQuickRouteQuery;
exports.useGetQuickRouteQueryState = useGetQuickRouteQueryState;
