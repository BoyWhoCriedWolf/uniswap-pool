import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { MaxUint256 } from '@ethersproject/constants';
import { InterfaceEventName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { sendAnalyticsEvent } from '../../analytics/index.js';
import { useTokenContract } from '../../hooks/useContract.js';
import { useTokenAllowance } from '../../hooks/useTokenAllowance.js';
import { getTokenAddress } from '../utils/analytics.js';
import { useCallback, useMemo } from 'react';
import { calculateGasMargin } from '../../utils/calculateGasMargin.js';

var ApprovalState = /*#__PURE__*/function (ApprovalState) {
  ApprovalState["UNKNOWN"] = "UNKNOWN";
  ApprovalState["NOT_APPROVED"] = "NOT_APPROVED";
  ApprovalState["PENDING"] = "PENDING";
  ApprovalState["APPROVED"] = "APPROVED";
  return ApprovalState;
}({});
function useApprovalStateForSpender(amountToApprove, spender, useIsPendingApproval) {
  var _amountToApprove$curr;
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;
  var token = amountToApprove !== null && amountToApprove !== void 0 && (_amountToApprove$curr = amountToApprove.currency) !== null && _amountToApprove$curr !== void 0 && _amountToApprove$curr.isToken ? amountToApprove.currency : undefined;
  var _useTokenAllowance = useTokenAllowance(token, account !== null && account !== void 0 ? account : undefined, spender),
    tokenAllowance = _useTokenAllowance.tokenAllowance;
  var pendingApproval = useIsPendingApproval(token, spender);
  return useMemo(function () {
    if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;
    if (amountToApprove.currency.isNative) return ApprovalState.APPROVED;
    // we might not have enough data to know whether or not we need to approve
    if (!tokenAllowance) return ApprovalState.UNKNOWN;

    // amountToApprove will be defined if tokenAllowance is
    return tokenAllowance.lessThan(amountToApprove) ? pendingApproval ? ApprovalState.PENDING : ApprovalState.NOT_APPROVED : ApprovalState.APPROVED;
  }, [amountToApprove, pendingApproval, spender, tokenAllowance]);
}
function useApproval(amountToApprove, spender, useIsPendingApproval) {
  var _amountToApprove$curr2;
  var _useWeb3React2 = useWeb3React(),
    chainId = _useWeb3React2.chainId;
  var token = amountToApprove !== null && amountToApprove !== void 0 && (_amountToApprove$curr2 = amountToApprove.currency) !== null && _amountToApprove$curr2 !== void 0 && _amountToApprove$curr2.isToken ? amountToApprove.currency : undefined;

  // check the current approval status
  var approvalState = useApprovalStateForSpender(amountToApprove, spender, useIsPendingApproval);
  var tokenContract = useTokenContract(token === null || token === void 0 ? void 0 : token.address);
  var approve = useCallback( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var logFailure, useExact, estimatedGas;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          logFailure = function _logFailure(error) {
            console.warn("".concat((token === null || token === void 0 ? void 0 : token.symbol) || "Token", " approval failed:"), error);
            return;
          };
          if (!(approvalState !== ApprovalState.NOT_APPROVED)) {
            _context.next = 5;
            break;
          }
          return _context.abrupt("return", logFailure("approve was called unnecessarily"));
        case 5:
          if (chainId) {
            _context.next = 9;
            break;
          }
          return _context.abrupt("return", logFailure("no chainId"));
        case 9:
          if (token) {
            _context.next = 13;
            break;
          }
          return _context.abrupt("return", logFailure("no token"));
        case 13:
          if (tokenContract) {
            _context.next = 17;
            break;
          }
          return _context.abrupt("return", logFailure("tokenContract is null"));
        case 17:
          if (amountToApprove) {
            _context.next = 21;
            break;
          }
          return _context.abrupt("return", logFailure("missing amount to approve"));
        case 21:
          if (spender) {
            _context.next = 23;
            break;
          }
          return _context.abrupt("return", logFailure("no spender"));
        case 23:
          useExact = false;
          _context.next = 26;
          return tokenContract.estimateGas.approve(spender, MaxUint256)["catch"](function () {
            // general fallback for tokens which restrict approval amounts
            useExact = true;
            return tokenContract.estimateGas.approve(spender, amountToApprove.quotient.toString());
          });
        case 26:
          estimatedGas = _context.sent;
          return _context.abrupt("return", tokenContract.approve(spender, useExact ? amountToApprove.quotient.toString() : MaxUint256, {
            gasLimit: calculateGasMargin(estimatedGas)
          }).then(function (response) {
            var eventProperties = {
              chain_id: chainId,
              token_symbol: token === null || token === void 0 ? void 0 : token.symbol,
              token_address: getTokenAddress(token)
            };
            sendAnalyticsEvent(InterfaceEventName.APPROVE_TOKEN_TXN_SUBMITTED, eventProperties);
            return {
              response: response,
              tokenAddress: token.address,
              spenderAddress: spender,
              amount: amountToApprove
            };
          })["catch"](function (error) {
            logFailure(error);
            throw error;
          }));
        case 28:
        case "end":
          return _context.stop();
      }
    }, _callee);
  })), [approvalState, token, tokenContract, amountToApprove, spender, chainId]);
  return [approvalState, approve];
}

export { ApprovalState, useApproval };
