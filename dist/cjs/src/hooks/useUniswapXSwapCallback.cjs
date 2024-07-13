'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var bignumber = require('@ethersproject/bignumber');
var Sentry = require('@sentry/react');
var analyticsEvents = require('@uniswap/analytics-events');
var uniswapxSdk = require('@uniswap/uniswapx-sdk');
var core = require('@web3-react/core');
var index = require('../analytics/index.cjs');
var analytics$1 = require('../lib/utils/analytics.cjs');
var React = require('react');
var types = require('../state/routing/types.cjs');
var trace = require('../tracing/trace.cjs');
var errors = require('../utils/errors.cjs');
var signing = require('../utils/signing.cjs');
var swapErrorToUserReadableMessage = require('../utils/swapErrorToUserReadableMessage.cjs');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var Sentry__namespace = /*#__PURE__*/_interopNamespace(Sentry);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var isErrorResponse = function isErrorResponse(res, order) {
  return res.status < 200 || res.status > 202;
};

// const UNISWAP_API_URL = process.env.REACT_APP_UNISWAP_API_URL;
var UNISWAP_API_URL = "https://api.uniswap.org/v2";

// getUpdatedNonce queries the UniswapX service for the most up-to-date nonce for a user.
// The `nonce` exists as part of the Swap quote response already, but if a user submits back-to-back
// swaps without refreshing the quote (and therefore uses the same nonce), then the subsequent swaps will fail.
//
function getUpdatedNonce(_x, _x2) {
  return _getUpdatedNonce.apply(this, arguments);
}
function _getUpdatedNonce() {
  _getUpdatedNonce = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee4(swapper, chainId) {
    var res, _yield$res$json, nonce;
    return _regeneratorRuntime__default["default"].wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _context4.next = 3;
          return fetch("".concat(UNISWAP_API_URL, "/nonce?address=").concat(swapper, "&chainId=").concat(chainId));
        case 3:
          res = _context4.sent;
          _context4.next = 6;
          return res.json();
        case 6:
          _yield$res$json = _context4.sent;
          nonce = _yield$res$json.nonce;
          return _context4.abrupt("return", bignumber.BigNumber.from(nonce));
        case 11:
          _context4.prev = 11;
          _context4.t0 = _context4["catch"](0);
          Sentry__namespace.withScope(function (scope) {
            scope.setTag("method", "getUpdatedNonce");
            scope.setLevel("warning");
            Sentry__namespace.captureException(_context4.t0);
          });
          return _context4.abrupt("return", null);
        case 15:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[0, 11]]);
  }));
  return _getUpdatedNonce.apply(this, arguments);
}
function useUniswapXSwapCallback(_ref) {
  var trade = _ref.trade,
    allowedSlippage = _ref.allowedSlippage,
    fiatValues = _ref.fiatValues;
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account,
    provider = _useWeb3React.provider;
  var analyticsContext = analytics.useTrace();
  return React.useCallback( /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee3() {
    return _regeneratorRuntime__default["default"].wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", trace.trace("swapx.send", /*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(_ref3) {
              var setTraceData, setTraceStatus, signDutchOrder, beforeSign, _yield$signDutchOrder, signature, updatedOrder, res, body, _ref6, _body$errorCode;
              return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
                while (1) switch (_context2.prev = _context2.next) {
                  case 0:
                    setTraceData = _ref3.setTraceData, setTraceStatus = _ref3.setTraceStatus;
                    if (account) {
                      _context2.next = 3;
                      break;
                    }
                    throw new Error("missing account");
                  case 3:
                    if (provider) {
                      _context2.next = 5;
                      break;
                    }
                    throw new Error("missing provider");
                  case 5:
                    if (trade) {
                      _context2.next = 7;
                      break;
                    }
                    throw new Error("missing trade");
                  case 7:
                    signDutchOrder = /*#__PURE__*/function () {
                      var _ref5 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
                        var updatedNonce, startTime, endTime, deadline, _updatedOrder, _updatedOrder$permitD, domain, types, values, _signature;
                        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
                          while (1) switch (_context.prev = _context.next) {
                            case 0:
                              _context.prev = 0;
                              _context.next = 3;
                              return getUpdatedNonce(account, trade.order.chainId);
                            case 3:
                              updatedNonce = _context.sent;
                              startTime = Math.floor(Date.now() / 1000) + trade.startTimeBufferSecs;
                              setTraceData("startTime", startTime);
                              endTime = startTime + trade.auctionPeriodSecs;
                              setTraceData("endTime", endTime);
                              deadline = endTime + trade.deadlineBufferSecs;
                              setTraceData("deadline", deadline);

                              // Set timestamp and account based values when the user clicks 'swap' to make them as recent as possible
                              _updatedOrder = uniswapxSdk.DutchOrderBuilder.fromOrder(trade.order).decayStartTime(startTime).decayEndTime(endTime).deadline(deadline).swapper(account).nonFeeRecipient(account)
                              // if fetching the nonce fails for any reason, default to existing nonce from the Swap quote.
                              .nonce(updatedNonce !== null && updatedNonce !== void 0 ? updatedNonce : trade.order.info.nonce).build();
                              _updatedOrder$permitD = _updatedOrder.permitData(), domain = _updatedOrder$permitD.domain, types = _updatedOrder$permitD.types, values = _updatedOrder$permitD.values;
                              _context.next = 14;
                              return signing.signTypedData(provider.getSigner(account), domain, types, values);
                            case 14:
                              _signature = _context.sent;
                              if (!(deadline < Math.floor(Date.now() / 1000))) {
                                _context.next = 17;
                                break;
                              }
                              throw new errors.SignatureExpiredError();
                            case 17:
                              return _context.abrupt("return", {
                                signature: _signature,
                                updatedOrder: _updatedOrder
                              });
                            case 20:
                              _context.prev = 20;
                              _context.t0 = _context["catch"](0);
                              if (!(_context.t0 instanceof errors.SignatureExpiredError)) {
                                _context.next = 24;
                                break;
                              }
                              throw _context.t0;
                            case 24:
                              if (!swapErrorToUserReadableMessage.didUserReject(_context.t0)) {
                                _context.next = 27;
                                break;
                              }
                              setTraceStatus("cancelled");
                              throw new errors.UserRejectedRequestError(swapErrorToUserReadableMessage.swapErrorToUserReadableMessage(_context.t0));
                            case 27:
                              throw new Error(swapErrorToUserReadableMessage.swapErrorToUserReadableMessage(_context.t0));
                            case 28:
                            case "end":
                              return _context.stop();
                          }
                        }, _callee, null, [[0, 20]]);
                      }));
                      return function signDutchOrder() {
                        return _ref5.apply(this, arguments);
                      };
                    }();
                    beforeSign = Date.now();
                    _context2.next = 11;
                    return signDutchOrder();
                  case 11:
                    _yield$signDutchOrder = _context2.sent;
                    signature = _yield$signDutchOrder.signature;
                    updatedOrder = _yield$signDutchOrder.updatedOrder;
                    index.sendAnalyticsEvent(analyticsEvents.SwapEventName.SWAP_SIGNED, _objectSpread(_objectSpread({}, analytics$1.formatSwapSignedAnalyticsEventProperties({
                      trade: trade,
                      allowedSlippage: allowedSlippage,
                      fiatValues: fiatValues,
                      timeToSignSinceRequestMs: Date.now() - beforeSign
                    })), analyticsContext));
                    _context2.next = 17;
                    return fetch("".concat(UNISWAP_API_URL, "/order"), {
                      method: "POST",
                      body: JSON.stringify({
                        encodedOrder: updatedOrder.serialize(),
                        signature: signature,
                        chainId: updatedOrder.chainId,
                        quoteId: trade.quoteId
                      })
                    });
                  case 17:
                    res = _context2.sent;
                    _context2.next = 20;
                    return res.json();
                  case 20:
                    body = _context2.sent;
                    if (!isErrorResponse(res)) {
                      _context2.next = 24;
                      break;
                    }
                    index.sendAnalyticsEvent("UniswapX Order Post Error", _objectSpread(_objectSpread(_objectSpread({}, analytics$1.formatSwapSignedAnalyticsEventProperties({
                      trade: trade,
                      allowedSlippage: allowedSlippage,
                      fiatValues: fiatValues
                    })), analyticsContext), {}, {
                      errorCode: body.errorCode,
                      detail: body.detail
                    }));
                    // TODO(UniswapX): Provide a similar utility to `swapErrorToUserReadableMessage` once
                    // backend team provides a list of error codes and potential messages
                    throw new Error("".concat((_ref6 = (_body$errorCode = body.errorCode) !== null && _body$errorCode !== void 0 ? _body$errorCode : body.detail) !== null && _ref6 !== void 0 ? _ref6 : "Unknown error"));
                  case 24:
                    return _context2.abrupt("return", {
                      type: types.TradeFillType.UniswapX,
                      response: {
                        orderHash: body.hash,
                        deadline: updatedOrder.info.deadline
                      }
                    });
                  case 25:
                  case "end":
                    return _context2.stop();
                }
              }, _callee2);
            }));
            return function (_x3) {
              return _ref4.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })), [account, provider, trade, allowedSlippage, fiatValues, analyticsContext]);
}

exports.useUniswapXSwapCallback = useUniswapXSwapCallback;
