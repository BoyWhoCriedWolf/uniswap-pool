import React__default, { useMemo, useState } from 'react';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Trans } from '../../node_modules/@lingui/react/dist/index.mjs.js';
import { InterfaceEventName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { sendAnalyticsEvent } from '../analytics/index.js';
import useNativeCurrency from '../lib/hooks/useNativeCurrency.js';
import { getTokenAddress, formatToDecimal } from '../lib/utils/analytics.js';
import tryParseCurrencyAmount from '../lib/utils/tryParseCurrencyAmount.js';
import { WRAPPED_NATIVE_CURRENCY } from '../constants/tokens.js';
import useCurrencyBalance from '../lib/hooks/useCurrencyBalance.js';
import { useTransactionAdder } from '../state/transactions/hooks.js';
import { TransactionType } from '../state/transactions/types.js';
import { useWETHContract } from './useContract.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
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
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _native = useNativeCurrency(chainId);
  var wrapped = _native === null || _native === void 0 ? void 0 : _native.wrapped;
  switch (wrapInputError) {
    case WrapInputError.NO_ERROR:
      return null;
    case WrapInputError.ENTER_NATIVE_AMOUNT:
      return /*#__PURE__*/React__default.createElement(Trans, {
        id: "kg5X8j",
        message: "Enter {0} amount",
        values: {
          "0": _native === null || _native === void 0 ? void 0 : _native.symbol
        }
      });
    case WrapInputError.ENTER_WRAPPED_AMOUNT:
      return /*#__PURE__*/React__default.createElement(Trans, {
        id: "kg5X8j",
        message: "Enter {0} amount",
        values: {
          "0": wrapped === null || wrapped === void 0 ? void 0 : wrapped.symbol
        }
      });
    case WrapInputError.INSUFFICIENT_NATIVE_BALANCE:
      return /*#__PURE__*/React__default.createElement(Trans, {
        id: "m6RmA/",
        message: "Insufficient {0} balance",
        values: {
          "0": _native === null || _native === void 0 ? void 0 : _native.symbol
        }
      });
    case WrapInputError.INSUFFICIENT_WRAPPED_BALANCE:
      return /*#__PURE__*/React__default.createElement(Trans, {
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
  var _useWeb3React2 = useWeb3React(),
    chainId = _useWeb3React2.chainId,
    account = _useWeb3React2.account;
  var wethContract = useWETHContract();
  var balance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined);
  // we can always parse the amount typed as the input currency, since wrapping is 1:1
  var inputAmount = useMemo(function () {
    return tryParseCurrencyAmount(typedValue, inputCurrency !== null && inputCurrency !== void 0 ? inputCurrency : undefined);
  }, [inputCurrency, typedValue]);
  var addTransaction = useTransactionAdder();

  // This allows an async error to propagate within the React lifecycle.
  // Without rethrowing it here, it would not show up in the UI - only the dev console.
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    error = _useState2[0],
    setError = _useState2[1];
  if (error) throw error;
  return useMemo(function () {
    if (!wethContract || !chainId || !inputCurrency || !outputCurrency) return NOT_APPLICABLE;
    var weth = WRAPPED_NATIVE_CURRENCY[chainId];
    if (!weth) return NOT_APPLICABLE;
    var hasInputAmount = Boolean(inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.greaterThan("0"));
    var sufficientBalance = inputAmount && balance && !balance.lessThan(inputAmount);
    var eventProperties = {
      token_in_address: getTokenAddress(inputCurrency),
      token_out_address: getTokenAddress(outputCurrency),
      token_in_symbol: inputCurrency.symbol,
      token_out_symbol: outputCurrency.symbol,
      chain_id: inputCurrency.chainId,
      amount: inputAmount ? formatToDecimal(inputAmount, inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.currency.decimals) : undefined
    };
    if (inputCurrency.isNative && weth.equals(outputCurrency)) {
      return {
        wrapType: WrapType.WRAP,
        execute: sufficientBalance && inputAmount ? /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
          var _WRAPPED_NATIVE_CURRE;
          var network, _error, txReceipt;
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return wethContract.provider.getNetwork();
              case 2:
                network = _context.sent;
                if (!(network.chainId !== chainId || wethContract.address !== ((_WRAPPED_NATIVE_CURRE = WRAPPED_NATIVE_CURRENCY[network.chainId]) === null || _WRAPPED_NATIVE_CURRE === void 0 ? void 0 : _WRAPPED_NATIVE_CURRE.address))) {
                  _context.next = 8;
                  break;
                }
                sendAnalyticsEvent(InterfaceEventName.WRAP_TOKEN_TXN_INVALIDATED, _objectSpread(_objectSpread({}, eventProperties), {}, {
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
                  type: TransactionType.WRAP,
                  unwrapped: false,
                  currencyAmountRaw: inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.quotient.toString(),
                  chainId: chainId
                });
                sendAnalyticsEvent(InterfaceEventName.WRAP_TOKEN_TXN_SUBMITTED, _objectSpread(_objectSpread({}, eventProperties), {}, {
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
        execute: sufficientBalance && inputAmount ? /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
          var txReceipt;
          return _regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return wethContract.withdraw("0x".concat(inputAmount.quotient.toString(16)));
              case 3:
                txReceipt = _context2.sent;
                addTransaction(txReceipt, {
                  type: TransactionType.WRAP,
                  unwrapped: true,
                  currencyAmountRaw: inputAmount === null || inputAmount === void 0 ? void 0 : inputAmount.quotient.toString(),
                  chainId: chainId
                });
                sendAnalyticsEvent(InterfaceEventName.WRAP_TOKEN_TXN_SUBMITTED, _objectSpread(_objectSpread({}, eventProperties), {}, {
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

export { WrapErrorText, WrapType, useWrapCallback as default };
