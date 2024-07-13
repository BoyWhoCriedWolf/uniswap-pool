'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var useApproval = require('../lib/hooks/useApproval.cjs');
var React = require('react');
var hooks = require('../state/transactions/hooks.cjs');
var types = require('../state/transactions/types.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function useGetAndTrackApproval(getApproval) {
  var addTransaction = hooks.useTransactionAdder();
  return React.useCallback(function () {
    return getApproval().then(function (pending) {
      if (pending) {
        var response = pending.response,
          tokenAddress = pending.tokenAddress,
          spender = pending.spenderAddress,
          amount = pending.amount;
        addTransaction(response, {
          type: types.TransactionType.APPROVAL,
          tokenAddress: tokenAddress,
          spender: spender,
          amount: amount.quotient.toString()
        });
      }
    });
  }, [addTransaction, getApproval]);
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
function useApproveCallback(amountToApprove, spender) {
  var _useApproval = useApproval.useApproval(amountToApprove, spender, hooks.useHasPendingApproval),
    _useApproval2 = _slicedToArray__default["default"](_useApproval, 2),
    approval = _useApproval2[0],
    getApproval = _useApproval2[1];
  return [approval, useGetAndTrackApproval(getApproval)];
}

exports.ApprovalState = useApproval.ApprovalState;
exports.useApproveCallback = useApproveCallback;
