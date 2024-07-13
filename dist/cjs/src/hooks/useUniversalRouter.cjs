'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _createClass = require('@babel/runtime/helpers/createClass');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _inherits = require('@babel/runtime/helpers/inherits');
var _wrapNativeSuper = require('@babel/runtime/helpers/wrapNativeSuper');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var index$1 = require('../../node_modules/@lingui/core/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var universalRouterSdk = require('@uniswap/universal-router-sdk');
var v3Sdk = require('@uniswap/v3-sdk');
var core = require('@web3-react/core');
var index = require('../analytics/index.cjs');
var useBlockNumber = require('../lib/hooks/useBlockNumber.cjs');
var analytics$1 = require('../lib/utils/analytics.cjs');
var React = require('react');
var types = require('../state/routing/types.cjs');
var hooks = require('../state/user/hooks.cjs');
var trace = require('../tracing/trace.cjs');
var calculateGasMargin = require('../utils/calculateGasMargin.cjs');
var errors = require('../utils/errors.cjs');
var isZero = require('../utils/isZero.cjs');
var swapErrorToUserReadableMessage = require('../utils/swapErrorToUserReadableMessage.cjs');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _wrapNativeSuper__default = /*#__PURE__*/_interopDefaultLegacy(_wrapNativeSuper);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _callSuper(_this, derived, args) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (e) {
      return false;
    }
  }
  derived = _getPrototypeOf__default["default"](derived);
  return _possibleConstructorReturn__default["default"](_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf__default["default"](_this).constructor) : derived.apply(_this, args));
}
/** Thrown when gas estimation fails. This class of error usually requires an emulator to determine the root cause. */
var GasEstimationError = /*#__PURE__*/function (_Error) {
  function GasEstimationError() {
    _classCallCheck__default["default"](this, GasEstimationError);
    return _callSuper(this, GasEstimationError, [index$1.i18n._(
    /*i18n*/
    {
      id: "1QJj4H",
      message: "Your swap is expected to fail."
    })]);
  }
  _inherits__default["default"](GasEstimationError, _Error);
  return _createClass__default["default"](GasEstimationError);
}( /*#__PURE__*/_wrapNativeSuper__default["default"](Error));
/**
 * Thrown when the user modifies the transaction in-wallet before submitting it.
 * In-wallet calldata modification nullifies any safeguards (eg slippage) from the interface, so we recommend reverting them immediately.
 */
var ModifiedSwapError = /*#__PURE__*/function (_Error2) {
  function ModifiedSwapError() {
    _classCallCheck__default["default"](this, ModifiedSwapError);
    return _callSuper(this, ModifiedSwapError, [index$1.i18n._(
    /*i18n*/
    {
      id: "6IUUOu",
      message: "Your swap was modified through your wallet. If this was a mistake, please cancel immediately or risk losing your funds."
    })]);
  }
  _inherits__default["default"](ModifiedSwapError, _Error2);
  return _createClass__default["default"](ModifiedSwapError);
}( /*#__PURE__*/_wrapNativeSuper__default["default"](Error));
function useUniversalRouterSwapCallback(trade, fiatValues, options) {
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId,
    provider = _useWeb3React.provider;
  var analyticsContext = analytics.useTrace();
  var blockNumber = useBlockNumber["default"]();
  var isAutoSlippage = hooks.useUserSlippageTolerance()[0] === "auto";
  return React.useCallback( /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
    return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", trace.trace("swap.send", /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(_ref2) {
              var setTraceData, setTraceStatus, setTraceError, _options$deadline, connectedChainId, taxAdjustedSlippageTolerance, _SwapRouter$swapERC, data, value, tx, gasEstimate, gasLimit, beforeSign, response;
              return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
                while (1) switch (_context.prev = _context.next) {
                  case 0:
                    setTraceData = _ref2.setTraceData, setTraceStatus = _ref2.setTraceStatus, setTraceError = _ref2.setTraceError;
                    _context.prev = 1;
                    if (account) {
                      _context.next = 4;
                      break;
                    }
                    throw new Error("missing account");
                  case 4:
                    if (chainId) {
                      _context.next = 6;
                      break;
                    }
                    throw new Error("missing chainId");
                  case 6:
                    if (provider) {
                      _context.next = 8;
                      break;
                    }
                    throw new Error("missing provider");
                  case 8:
                    if (trade) {
                      _context.next = 10;
                      break;
                    }
                    throw new Error("missing trade");
                  case 10:
                    _context.next = 12;
                    return provider.getSigner().getChainId();
                  case 12:
                    connectedChainId = _context.sent;
                    if (!(chainId !== connectedChainId)) {
                      _context.next = 15;
                      break;
                    }
                    throw new errors.WrongChainError();
                  case 15:
                    setTraceData("slippageTolerance", options.slippageTolerance.toFixed(2));

                    // universal-router-sdk reconstructs V2Trade objects, so rather than updating the trade amounts to account for tax, we adjust the slippage tolerance as a workaround
                    // TODO(WEB-2725): update universal-router-sdk to not reconstruct trades
                    taxAdjustedSlippageTolerance = options.slippageTolerance.add(trade.totalTaxRate);
                    _SwapRouter$swapERC = universalRouterSdk.SwapRouter.swapERC20CallParameters(trade, {
                      slippageTolerance: taxAdjustedSlippageTolerance,
                      deadlineOrPreviousBlockhash: (_options$deadline = options.deadline) === null || _options$deadline === void 0 ? void 0 : _options$deadline.toString(),
                      inputTokenPermit: options.permit,
                      fee: options.feeOptions
                    }), data = _SwapRouter$swapERC.calldata, value = _SwapRouter$swapERC.value;
                    tx = _objectSpread({
                      from: account,
                      to: universalRouterSdk.UNIVERSAL_ROUTER_ADDRESS(chainId),
                      data: data
                    }, value && !isZero(value) ? {
                      value: v3Sdk.toHex(value)
                    } : {});
                    _context.prev = 19;
                    _context.next = 22;
                    return provider.estimateGas(tx);
                  case 22:
                    gasEstimate = _context.sent;
                    _context.next = 32;
                    break;
                  case 25:
                    _context.prev = 25;
                    _context.t0 = _context["catch"](19);
                    setTraceStatus("failed_precondition");
                    setTraceError(_context.t0);
                    index.sendAnalyticsEvent(analyticsEvents.SwapEventName.SWAP_ESTIMATE_GAS_CALL_FAILED, _objectSpread(_objectSpread(_objectSpread({}, analytics$1.formatCommonPropertiesForTrade(trade, options.slippageTolerance)), analyticsContext), {}, {
                      client_block_number: blockNumber,
                      tx: tx,
                      error: _context.t0,
                      isAutoSlippage: isAutoSlippage
                    }));
                    console.warn(_context.t0);
                    throw new GasEstimationError();
                  case 32:
                    gasLimit = calculateGasMargin.calculateGasMargin(gasEstimate);
                    setTraceData("gasLimit", gasLimit.toNumber());
                    beforeSign = Date.now();
                    _context.next = 37;
                    return provider.getSigner().sendTransaction(_objectSpread(_objectSpread({}, tx), {}, {
                      gasLimit: gasLimit
                    })).then(function (response) {
                      index.sendAnalyticsEvent(analyticsEvents.SwapEventName.SWAP_SIGNED, _objectSpread(_objectSpread({}, analytics$1.formatSwapSignedAnalyticsEventProperties({
                        trade: trade,
                        timeToSignSinceRequestMs: Date.now() - beforeSign,
                        allowedSlippage: options.slippageTolerance,
                        fiatValues: fiatValues,
                        txHash: response.hash
                      })), analyticsContext));
                      if (tx.data !== response.data) {
                        index.sendAnalyticsEvent(analyticsEvents.SwapEventName.SWAP_MODIFIED_IN_WALLET, _objectSpread({
                          txHash: response.hash
                        }, analyticsContext));
                        if (!response.data || response.data.length === 0 || response.data === "0x") {
                          throw new ModifiedSwapError();
                        }
                      }
                      return response;
                    });
                  case 37:
                    response = _context.sent;
                    return _context.abrupt("return", {
                      type: types.TradeFillType.Classic,
                      response: response
                    });
                  case 41:
                    _context.prev = 41;
                    _context.t1 = _context["catch"](1);
                    if (!(_context.t1 instanceof ModifiedSwapError)) {
                      _context.next = 45;
                      break;
                    }
                    throw _context.t1;
                  case 45:
                    // GasEstimationErrors are already traced when they are thrown.
                    if (!(_context.t1 instanceof GasEstimationError)) setTraceError(_context.t1);

                    // Cancellations are not failures, and must be accounted for as 'cancelled'.
                    if (!swapErrorToUserReadableMessage.didUserReject(_context.t1)) {
                      _context.next = 49;
                      break;
                    }
                    setTraceStatus("cancelled");
                    // This error type allows us to distinguish between user rejections and other errors later too.
                    throw new errors.UserRejectedRequestError(swapErrorToUserReadableMessage.swapErrorToUserReadableMessage(_context.t1));
                  case 49:
                    throw new Error(swapErrorToUserReadableMessage.swapErrorToUserReadableMessage(_context.t1));
                  case 50:
                  case "end":
                    return _context.stop();
                }
              }, _callee, null, [[1, 41], [19, 25]]);
            }));
            return function (_x) {
              return _ref3.apply(this, arguments);
            };
          }()));
        case 1:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })), [account, analyticsContext, blockNumber, chainId, fiatValues, options.deadline, options.feeOptions, options.permit, options.slippageTolerance, provider, trade, isAutoSlippage]);
}

exports.useUniversalRouterSwapCallback = useUniversalRouterSwapCallback;
