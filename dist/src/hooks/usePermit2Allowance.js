import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { PERMIT2_ADDRESS } from '@uniswap/permit2-sdk';
import { useWeb3React } from '@web3-react/core';
import { AVERAGE_L1_BLOCK_TIME } from '../constants/chainInfo.js';
import { usePermitAllowance, useUpdatePermitAllowance } from './usePermitAllowance.js';
import { useTokenAllowance, useUpdateTokenAllowance, useRevokeTokenAllowance } from './useTokenAllowance.js';
import useInterval from '../lib/hooks/useInterval.js';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { TradeFillType } from '../state/routing/types.js';
import { useHasPendingApproval, useHasPendingRevocation, useTransactionAdder } from '../state/transactions/hooks.js';

var ApprovalState = /*#__PURE__*/function (ApprovalState) {
  ApprovalState[ApprovalState["PENDING"] = 0] = "PENDING";
  ApprovalState[ApprovalState["SYNCING"] = 1] = "SYNCING";
  ApprovalState[ApprovalState["SYNCED"] = 2] = "SYNCED";
  return ApprovalState;
}(ApprovalState || {});
var AllowanceState = /*#__PURE__*/function (AllowanceState) {
  AllowanceState[AllowanceState["LOADING"] = 0] = "LOADING";
  AllowanceState[AllowanceState["REQUIRED"] = 1] = "REQUIRED";
  AllowanceState[AllowanceState["ALLOWED"] = 2] = "ALLOWED";
  return AllowanceState;
}({});
function usePermit2Allowance(amount, spender, tradeFillType) {
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;
  var token = amount === null || amount === void 0 ? void 0 : amount.currency;
  var _useTokenAllowance = useTokenAllowance(token, account, PERMIT2_ADDRESS),
    tokenAllowance = _useTokenAllowance.tokenAllowance,
    isApprovalSyncing = _useTokenAllowance.isSyncing;
  var updateTokenAllowance = useUpdateTokenAllowance(amount, PERMIT2_ADDRESS);
  var revokeTokenAllowance = useRevokeTokenAllowance(token, PERMIT2_ADDRESS);
  var isApproved = useMemo(function () {
    if (!amount || !tokenAllowance) return false;
    return tokenAllowance.greaterThan(amount) || tokenAllowance.equalTo(amount);
  }, [amount, tokenAllowance]);

  // Marks approval as loading from the time it is submitted (pending), until it has confirmed and another block synced.
  // This avoids re-prompting the user for an already-submitted but not-yet-observed approval, by marking it loading
  // until it has been re-observed. It wll sync immediately, because confirmation fast-forwards the block number.
  var _useState = useState(ApprovalState.SYNCED),
    _useState2 = _slicedToArray(_useState, 2),
    approvalState = _useState2[0],
    setApprovalState = _useState2[1];
  var isApprovalLoading = approvalState !== ApprovalState.SYNCED;
  var isApprovalPending = useHasPendingApproval(token, PERMIT2_ADDRESS);
  var isRevocationPending = useHasPendingRevocation(token, PERMIT2_ADDRESS);
  useEffect(function () {
    if (isApprovalPending) {
      setApprovalState(ApprovalState.PENDING);
    } else {
      setApprovalState(function (state) {
        if (state === ApprovalState.PENDING && isApprovalSyncing) {
          return ApprovalState.SYNCING;
        } else if (state === ApprovalState.SYNCING && !isApprovalSyncing) {
          return ApprovalState.SYNCED;
        }
        return state;
      });
    }
  }, [isApprovalPending, isApprovalSyncing]);

  // Signature and PermitAllowance will expire, so they should be rechecked at an interval.
  // Calculate now such that the signature will still be valid for the submitting block.
  var _useState3 = useState(Date.now() + AVERAGE_L1_BLOCK_TIME),
    _useState4 = _slicedToArray(_useState3, 2),
    now = _useState4[0],
    setNow = _useState4[1];
  useInterval(useCallback(function () {
    return setNow((Date.now() + AVERAGE_L1_BLOCK_TIME) / 1000);
  }, []), AVERAGE_L1_BLOCK_TIME);
  var _useState5 = useState(),
    _useState6 = _slicedToArray(_useState5, 2),
    signature = _useState6[0],
    setSignature = _useState6[1];
  var isSigned = useMemo(function () {
    if (!amount || !signature) return false;
    return signature.details.token === (token === null || token === void 0 ? void 0 : token.address) && signature.spender === spender && signature.sigDeadline >= now;
  }, [amount, now, signature, spender, token === null || token === void 0 ? void 0 : token.address]);
  var _usePermitAllowance = usePermitAllowance(token, account, spender),
    permitAllowance = _usePermitAllowance.permitAllowance,
    permitExpiration = _usePermitAllowance.expiration,
    nonce = _usePermitAllowance.nonce;
  var updatePermitAllowance = useUpdatePermitAllowance(token, spender, nonce, setSignature);
  var isPermitted = useMemo(function () {
    if (!amount || !permitAllowance || !permitExpiration) return false;
    return (permitAllowance.greaterThan(amount) || permitAllowance.equalTo(amount)) && permitExpiration >= now;
  }, [amount, now, permitAllowance, permitExpiration]);
  var shouldRequestApproval = !(isApproved || isApprovalLoading);

  // UniswapX trades do not need a permit signature step in between because the swap step _is_ the permit signature
  var shouldRequestSignature = tradeFillType === TradeFillType.Classic && !(isPermitted || isSigned);
  var addTransaction = useTransactionAdder();
  var approveAndPermit = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var _yield$updateTokenAll, response, info;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!shouldRequestApproval) {
            _context.next = 7;
            break;
          }
          _context.next = 3;
          return updateTokenAllowance();
        case 3:
          _yield$updateTokenAll = _context.sent;
          response = _yield$updateTokenAll.response;
          info = _yield$updateTokenAll.info;
          addTransaction(response, info);
        case 7:
          if (!shouldRequestSignature) {
            _context.next = 10;
            break;
          }
          _context.next = 10;
          return updatePermitAllowance();
        case 10:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })), [addTransaction, shouldRequestApproval, shouldRequestSignature, updatePermitAllowance, updateTokenAllowance]);
  var approve = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
    var _yield$updateTokenAll2, response, info;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return updateTokenAllowance();
        case 2:
          _yield$updateTokenAll2 = _context2.sent;
          response = _yield$updateTokenAll2.response;
          info = _yield$updateTokenAll2.info;
          addTransaction(response, info);
        case 6:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  })), [addTransaction, updateTokenAllowance]);
  var revoke = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
    var _yield$revokeTokenAll, response, info;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return revokeTokenAllowance();
        case 2:
          _yield$revokeTokenAll = _context3.sent;
          response = _yield$revokeTokenAll.response;
          info = _yield$revokeTokenAll.info;
          addTransaction(response, info);
        case 6:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  })), [addTransaction, revokeTokenAllowance]);
  return useMemo(function () {
    if (token) {
      if (!tokenAllowance || !permitAllowance) {
        return {
          state: AllowanceState.LOADING
        };
      } else if (shouldRequestSignature) {
        return {
          token: token,
          state: AllowanceState.REQUIRED,
          isApprovalLoading: false,
          isApprovalPending: isApprovalPending,
          isRevocationPending: isRevocationPending,
          approveAndPermit: approveAndPermit,
          approve: approve,
          permit: updatePermitAllowance,
          revoke: revoke,
          needsSetupApproval: !isApproved,
          needsPermitSignature: shouldRequestSignature,
          allowedAmount: tokenAllowance
        };
      } else if (!isApproved) {
        return {
          token: token,
          state: AllowanceState.REQUIRED,
          isApprovalLoading: isApprovalLoading,
          isApprovalPending: isApprovalPending,
          isRevocationPending: isRevocationPending,
          approveAndPermit: approveAndPermit,
          approve: approve,
          permit: updatePermitAllowance,
          revoke: revoke,
          needsSetupApproval: true,
          needsPermitSignature: shouldRequestSignature,
          allowedAmount: tokenAllowance
        };
      }
    }
    return {
      token: token,
      state: AllowanceState.ALLOWED,
      permitSignature: !isPermitted && isSigned ? signature : undefined,
      needsSetupApproval: false,
      needsPermitSignature: false
    };
  }, [approve, approveAndPermit, isApprovalLoading, isApprovalPending, isApproved, isPermitted, isSigned, updatePermitAllowance, permitAllowance, revoke, isRevocationPending, shouldRequestSignature, signature, token, tokenAllowance]);
}

export { AllowanceState, usePermit2Allowance as default };
