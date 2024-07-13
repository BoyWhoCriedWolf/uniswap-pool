'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var index$1 = require('../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index = require('../analytics/index.cjs');
var useNativeCurrency = require('../lib/hooks/useNativeCurrency.cjs');
var analytics = require('../lib/utils/analytics.cjs');
var tryParseCurrencyAmount = require('../lib/utils/tryParseCurrencyAmount.cjs');
var tokens = require('../constants/tokens.cjs');
var useCurrencyBalance = require('../lib/hooks/useCurrencyBalance.cjs');
var hooks = require('../state/transactions/hooks.cjs');
var types = require('../state/transactions/types.cjs');
var useContract = require('./useContract.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var WrapType = /*#__PURE__*/function (WrapType) {
  WrapType[WrapType["NOT_APPLICABLE"] = 0] = "NOT_APPLICABLE";
  WrapType[WrapType["WRAP"] = 1] = "WRAP";
  WrapType[WrapType["UNWRAP"] = 2] = "UNWRAP";
  return WrapType;
}({});
var NOT_APPLICABLE = {
  wrapType: WrapType.NOT_APPLICABLE
};
var WrapInputError = /*#__PURE__*/function (WrapInputError) {
  WrapInputError[WrapInputError["NO_ERROR"] = 0] = "NO_ERROR";
  WrapInputError[WrapInputError["ENTER_NATIVE_AMOUNT"] = 1] = "ENTER_NATIVE_AMOUNT";
  WrapInputError[WrapInputError["ENTER_WRAPPED_AMOUNT"] = 2] = "ENTER_WRAPPED_AMOUNT";
  WrapInputError[WrapInputError["INSUFFICIENT_NATIVE_BALANCE"] = 3] = "INSUFFICIENT_NATIVE_BALANCE";
  WrapInputError[WrapInputError["INSUFFICIENT_WRAPPED_BALANCE"] = 4] = "INSUFFICIENT_WRAPPED_BALANCE";
  return WrapInputError;
}(WrapInputError || {});
function WrapErrorText(_ref) {
  var wrapInputError = _ref.wrapInputError;
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _native = useNativeCurrency(chainId);
  var wrapped = _native === null || _native === void 0 ? void 0 : _native.wrapped;
  switch (wrapInputError) {
    case WrapInputError.NO_ERROR:
      return null;
    case WrapInputError.ENTER_NATIVE_AMOUNT:
      return /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
        id: "kg5X8j",
        message: "Enter {0} amount",
        values: {
          "0": _native === null || _native === void 0 ? void 0 : _native.symbol
        }
      });
    case WrapInputError.ENTER_WRAPPED_AMOUNT:
      return /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
        id: "kg5X8j",
        message: "Enter {0} amount",
        values: {
          "0": wrapped === null || wrapped === void 0 ? void 0 : wrapped.symbol
        }
      });
    case WrapInputError.INSUFFICIENT_NATIVE_BALANCE:
      return /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
        id: "m6RmA/",
        message: "Insufficient {0} balance",
        values: {
          "0": _native === null || _native === void 0 ? void 0 : _native.symbol
        }
      });
    case WrapInputError.INSUFFICIENT_WRAPPED_BALANCE:
      return /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
        id: "m6RmA/",
        message: "Insufficient {0} balance",
        values: {
          "0": wrapped === null || wrapped === void 0 ? void 0 : wrapped.symbol
        }
      });
  }
}

/**
 * Given the selected input and output currency, return a wrap callback
 * @param inputCurrency the selected input currency
 * @param outputCurrency the selected output currency
 * @param typedValue the user input value
 */
function useWrapCallback(inputCurrency, outputCurrency, typedValue) {
  var _useWeb3React2 = core.useWeb3React(),
    chainId = _useWeb3React2.chainId,
    account = _useWeb3React2.account;
  var wethContract = useContract.useWETHContract();
  var balance = useCurrencyBalance["default"](account !== null && account !== void 0 ? account : undefined, inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined);
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  var inputAmount = React.useMemo(function () {
    return tryParseCurrencyAmount(typedValue, inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined);
  }, [inputCurrency, typedValue]);
  var addTransaction = hooks.useTransactionAdder();

  // This allows an async error to propagate within the React lifecycle.
  // Without rethrowing it here, it would not show up in the UI - only the dev console.
  var _useState = React.useState(),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    error = _useState2[0],
    setError = _useState2[1];
  if (error) throw error;
  return React.useMemo(function () {
    if (!wethContract || !chainId || !inputCurrency || !outputCurrency) return NOT_APPLICABLE;
    var weth = tokens.WRAPPED_NATIVE_CURRENCY[chainId];
    if (!weth) return NOT_APPLICABLE;
    var hasInputAmount = Boolean(inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.greaterThan("0"));
    var sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount);
    var eventProperties = {
      token_in_address: analytics.getTokenAddress(inputCurrency),
      token_out_address: analytics.getTokenAddress(outputCurrency),
      token_in_symbol: inputCurrency.symbol,
      token_out_symbol: outputCurrency.symbol,
      chain_id: inputCurrency.chainId,
      amount: inputAmount ? analytics.formatToDecimal(inputAmount, inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.currency.decimals) : undefined
    };
    if (inputCurrency.isNative && weth.equals(outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute: sufficientBalance && inputAmount ? /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
          var _WRAPPED_NATIVE_CURRE;
          var network, _error, txReceipt;
          return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return wethContract.provider.getNetwork();
              case 2:
                network = _context.sent;
                if (!(network.chainId !== chainId || wethContract.address !== ((_WRAPPED_NATIVE_CURRE = tokens.WRAPPED_NATIVE_CURRENCY[network.chainId]) === null || _WRAPPED_NATIVE_CURRE === void 0 ? void 0 : _WRAPPED_NATIVE_CURRE.address))) {
                  _context.next = 8;
                  break;
                }
                index.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.WRAP_TOKEN_TXN_INVALIDATED, _objectSpread(_objectSpread({}, eventProperties), {}, {
                  contract_address: wethContract.address,
                  contract_chain_id: network.chainId,
                  type: WrapType.WRAP
                }));
                _error = new Error("Invalid WETH contract\nPlease file a bug detailing how this happened - https://github.com/Uniswap/interface/issues/new?labels=bug&template=bug-report.md&title=Invalid%20WETH%20contract");
                setError(_error);
                throw _error;
              case 8:
                _context.next = 10;
                return wethContract.deposit({
                  value: "0x".concat(inputAmount.quotient.toString(16))
                });
              case 10:
                txReceipt = _context.sent;
                addTransaction(txReceipt, {
                  type: types.TransactionType.WRAP,
                  unwrapped: false,
                  currencyAmountRaw: inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.quotient.toString(),
                  chainId: chainId
                });
                index.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.WRAP_TOKEN_TXN_SUBMITTED, _objectSpread(_objectSpread({}, eventProperties), {}, {
                  type: WrapType.WRAP
                }));
                return _context.abrupt("return", txReceipt.hash);
              case 14:
              case "end":
                return _context.stop();
            }
          }, _callee);
        })) : undefined,
        inputError: sufficientBalance ? undefined : hasInputAmount ? WrapInputError.INSUFFICIENT_NATIVE_BALANCE : WrapInputError.ENTER_NATIVE_AMOUNT
      };
    } else if (weth.equals(inputCurrency) && outputCurrency.isNative) {
      return {
        wrapType: WrapType.UNWRAP,
        execute: sufficientBalance && inputAmount ? /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2() {
          var txReceipt;
          return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return wethContract.withdraw("0x".concat(inputAmount.quotient.toString(16)));
              case 3:
                txReceipt = _context2.sent;
                addTransaction(txReceipt, {
                  type: types.TransactionType.WRAP,
                  unwrapped: true,
                  currencyAmountRaw: inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.quotient.toString(),
                  chainId: chainId
                });
                index.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.WRAP_TOKEN_TXN_SUBMITTED, _objectSpread(_objectSpread({}, eventProperties), {}, {
                  type: WrapType.UNWRAP
                }));
                return _context2.abrupt("return", txReceipt.hash);
              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                console.error("Could not withdraw", _context2.t0);
                throw _context2.t0;
              case 13:
              case "end":
                return _context2.stop();
            }
          }, _callee2, null, [[0, 9]]);
        })) : undefined,
        inputError: sufficientBalance ? undefined : hasInputAmount ? WrapInputError.INSUFFICIENT_WRAPPED_BALANCE : WrapInputError.ENTER_WRAPPED_AMOUNT
      };
    } else {
      return NOT_APPLICABLE;
    }
  }, [wethContract, chainId, inputCurrency, outputCurrency, inputAmount, balance, addTransaction]);
}

exports.WrapErrorText = WrapErrorText;
exports.WrapType = WrapType;
exports["default"] = useWrapCallback;
