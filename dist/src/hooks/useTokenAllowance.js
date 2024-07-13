import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { InterfaceEventName } from '@uniswap/analytics-events';
import { MaxUint256, CurrencyAmount } from '@uniswap/sdk-core';
import { sendAnalyticsEvent } from '../analytics/index.js';
import { useTokenContract } from './useContract.js';
import { useSingleCallResult } from '../lib/hooks/multicall.js';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { TransactionType } from '../state/transactions/types.js';
import { UserRejectedRequestError } from '../utils/errors.js';
import { didUserReject } from '../utils/swapErrorToUserReadableMessage.js';
import { useTrace } from '@uniswap/analytics';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var MAX_ALLOWANCE = MaxUint256.toString();
function useTokenAllowance(token, owner, spender) {
  var contract = useTokenContract(token === null || token === void 0 ? void 0 : token.address, false);
  var inputs = useMemo(function () {
    return [owner, spender];
  }, [owner, spender]);

  // If there is no allowance yet, re-check next observed block.
  // This guarantees that the tokenAllowance is marked isSyncing upon approval and updated upon being synced.
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    blocksPerFetch = _useState2[0],
    setBlocksPerFetch = _useState2[1];
  var _ref = useSingleCallResult(contract, "allowance", inputs, {
      blocksPerFetch: blocksPerFetch
    }),
    result = _ref.result,
    isSyncing = _ref.syncing;
  var rawAmount = result === null || result === void 0 ? void 0 : result.toString(); // convert to a string before using in a hook, to avoid spurious rerenders
  var allowance = useMemo(function () {
    return token && rawAmount ? CurrencyAmount.fromRawAmount(token, rawAmount) : undefined;
  }, [token, rawAmount]);
  useEffect(function () {
    return setBlocksPerFetch(allowance !== null && allowance !== void 0 && allowance.equalTo(0) ? 1 : undefined);
  }, [allowance]);
  return useMemo(function () {
    return {
      tokenAllowance: allowance,
      isSyncing: isSyncing
    };
  }, [allowance, isSyncing]);
}
function useUpdateTokenAllowance(amount, spender) {
  var contract = useTokenContract(amount === null || amount === void 0 ? void 0 : amount.currency.address);
  var trace = useTrace();
  return useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var allowance, response, _amount$currency$symb, symbol;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (amount) {
            _context.next = 3;
            break;
          }
          throw new Error("missing amount");
        case 3:
          if (contract) {
            _context.next = 5;
            break;
          }
          throw new Error("missing contract");
        case 5:
          if (spender) {
            _context.next = 7;
            break;
          }
          throw new Error("missing spender");
        case 7:
          allowance = amount.equalTo(0) ? "0" : MAX_ALLOWANCE;
          _context.next = 10;
          return contract.approve(spender, allowance);
        case 10:
          response = _context.sent;
          sendAnalyticsEvent(InterfaceEventName.APPROVE_TOKEN_TXN_SUBMITTED, _objectSpread({
            chain_id: amount.currency.chainId,
            token_symbol: amount.currency.symbol,
            token_address: amount.currency.address
          }, trace));
          return _context.abrupt("return", {
            response: response,
            info: {
              type: TransactionType.APPROVAL,
              tokenAddress: contract.address,
              spender: spender,
              amount: allowance
            }
          });
        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](0);
          symbol = (_amount$currency$symb = amount === null || amount === void 0 ? void 0 : amount.currency.symbol) !== null && _amount$currency$symb !== void 0 ? _amount$currency$symb : "Token";
          if (!didUserReject(_context.t0)) {
            _context.next = 20;
            break;
          }
          throw new UserRejectedRequestError("".concat(symbol, " token allowance failed: User rejected"));
        case 20:
          throw new Error("".concat(symbol, " token allowance failed: ").concat(_context.t0 instanceof Error ? _context.t0.message : _context.t0));
        case 21:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 15]]);
  })), [amount, contract, spender, trace]);
}
function useRevokeTokenAllowance(token, spender) {
  var amount = useMemo(function () {
    return token ? CurrencyAmount.fromRawAmount(token, 0) : undefined;
  }, [token]);
  return useUpdateTokenAllowance(amount, spender);
}

export { useRevokeTokenAllowance, useTokenAllowance, useUpdateTokenAllowance };
