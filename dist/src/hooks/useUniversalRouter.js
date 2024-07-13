import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _createClass from '@babel/runtime/helpers/createClass';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/inherits';
import _wrapNativeSuper from '@babel/runtime/helpers/wrapNativeSuper';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { i18n } from '../../node_modules/@lingui/core/dist/index.mjs.js';
import { SwapEventName } from '@uniswap/analytics-events';
import { SwapRouter, UNIVERSAL_ROUTER_ADDRESS } from '@uniswap/universal-router-sdk';
import { toHex } from '@uniswap/v3-sdk';
import { useWeb3React } from '@web3-react/core';
import { sendAnalyticsEvent } from '../analytics/index.js';
import useBlockNumber from '../lib/hooks/useBlockNumber.js';
import { formatSwapSignedAnalyticsEventProperties, formatCommonPropertiesForTrade } from '../lib/utils/analytics.js';
import { useCallback } from 'react';
import { TradeFillType } from '../state/routing/types.js';
import { useUserSlippageTolerance } from '../state/user/hooks.js';
import { trace } from '../tracing/trace.js';
import { calculateGasMargin } from '../utils/calculateGasMargin.js';
import { UserRejectedRequestError, WrongChainError } from '../utils/errors.js';
import isZero from '../utils/isZero.js';
import { swapErrorToUserReadableMessage, didUserReject } from '../utils/swapErrorToUserReadableMessage.js';
import { useTrace } from '@uniswap/analytics';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
  derived = _getPrototypeOf(derived);
  return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
}
/** Thrown when gas estimation fails. This class of error usually requires an emulator to determine the root cause. */
var GasEstimationError = /*#__PURE__*/function (_Error) {
  function GasEstimationError() {
    _classCallCheck(this, GasEstimationError);
    return _callSuper(this, GasEstimationError, [i18n._(
    /*i18n*/
    {
      id: "1QJj4H",
      message: "Your swap is expected to fail."
    })]);
  }
  _inherits(GasEstimationError, _Error);
  return _createClass(GasEstimationError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
/**
 * Thrown when the user modifies the transaction in-wallet before submitting it.
 * In-wallet calldata modification nullifies any safeguards (eg slippage) from the interface, so we recommend reverting them immediately.
 */
var ModifiedSwapError = /*#__PURE__*/function (_Error2) {
  function ModifiedSwapError() {
    _classCallCheck(this, ModifiedSwapError);
    return _callSuper(this, ModifiedSwapError, [i18n._(
    /*i18n*/
    {
      id: "6IUUOu",
      message: "Your swap was modified through your wallet. If this was a mistake, please cancel immediately or risk losing your funds."
    })]);
  }
  _inherits(ModifiedSwapError, _Error2);
  return _createClass(ModifiedSwapError);
}( /*#__PURE__*/_wrapNativeSuper(Error));
function useUniversalRouterSwapCallback(trade, fiatValues, options) {
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId,
    provider = _useWeb3React.provider;
  var analyticsContext = useTrace();
  var blockNumber = useBlockNumber();
  var isAutoSlippage = useUserSlippageTolerance()[0] === "auto";
  return useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          return _context2.abrupt("return", trace("swap.send", /*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(_ref2) {
              var setTraceData, setTraceStatus, setTraceError, _options$deadline, connectedChainId, taxAdjustedSlippageTolerance, _SwapRouter$swapERC, data, value, tx, gasEstimate, gasLimit, beforeSign, response;
              return _regeneratorRuntime.wrap(function _callee$(_context) {
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
                    throw new WrongChainError();
                  case 15:
                    setTraceData("slippageTolerance", options.slippageTolerance.toFixed(2));

                    // universal-router-sdk reconstructs V2Trade objects, so rather than updating the trade amounts to account for tax, we adjust the slippage tolerance as a workaround
                    // TODO(WEB-2725): update universal-router-sdk to not reconstruct trades
                    taxAdjustedSlippageTolerance = options.slippageTolerance.add(trade.totalTaxRate);
                    _SwapRouter$swapERC = SwapRouter.swapERC20CallParameters(trade, {
                      slippageTolerance: taxAdjustedSlippageTolerance,
                      deadlineOrPreviousBlockhash: (_options$deadline = options.deadline) === null || _options$deadline === void 0 ? void 0 : _options$deadline.toString(),
                      inputTokenPermit: options.permit,
                      fee: options.feeOptions
                    }), data = _SwapRouter$swapERC.calldata, value = _SwapRouter$swapERC.value;
                    tx = _objectSpread({
                      from: account,
                      to: UNIVERSAL_ROUTER_ADDRESS(chainId),
                      data: data
                    }, value && !isZero(value) ? {
                      value: toHex(value)
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
                    sendAnalyticsEvent(SwapEventName.SWAP_ESTIMATE_GAS_CALL_FAILED, _objectSpread(_objectSpread(_objectSpread({}, formatCommonPropertiesForTrade(trade, options.slippageTolerance)), analyticsContext), {}, {
                      client_block_number: blockNumber,
                      tx: tx,
                      error: _context.t0,
                      isAutoSlippage: isAutoSlippage
                    }));
                    console.warn(_context.t0);
                    throw new GasEstimationError();
                  case 32:
                    gasLimit = calculateGasMargin(gasEstimate);
                    setTraceData("gasLimit", gasLimit.toNumber());
                    beforeSign = Date.now();
                    _context.next = 37;
                    return provider.getSigner().sendTransaction(_objectSpread(_objectSpread({}, tx), {}, {
                      gasLimit: gasLimit
                    })).then(function (response) {
                      sendAnalyticsEvent(SwapEventName.SWAP_SIGNED, _objectSpread(_objectSpread({}, formatSwapSignedAnalyticsEventProperties({
                        trade: trade,
                        timeToSignSinceRequestMs: Date.now() - beforeSign,
                        allowedSlippage: options.slippageTolerance,
                        fiatValues: fiatValues,
                        txHash: response.hash
                      })), analyticsContext));
                      if (tx.data !== response.data) {
                        sendAnalyticsEvent(SwapEventName.SWAP_MODIFIED_IN_WALLET, _objectSpread({
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
                      type: TradeFillType.Classic,
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
                    if (!didUserReject(_context.t1)) {
                      _context.next = 49;
                      break;
                    }
                    setTraceStatus("cancelled");
                    // This error type allows us to distinguish between user rejections and other errors later too.
                    throw new UserRejectedRequestError(swapErrorToUserReadableMessage(_context.t1));
                  case 49:
                    throw new Error(swapErrorToUserReadableMessage(_context.t1));
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

export { useUniversalRouterSwapCallback };
