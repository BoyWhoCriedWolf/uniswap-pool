import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useApproval } from '../lib/hooks/useApproval.js';
export { ApprovalState } from '../lib/hooks/useApproval.js';
import { useCallback } from 'react';
import { useTransactionAdder, useHasPendingApproval } from '../state/transactions/hooks.js';
import { TransactionType } from '../state/transactions/types.js';

function useGetAndTrackApproval(getApproval) {
  var addTransaction = useTransactionAdder();
  return useCallback(function () {
    return getApproval().then(function (pending) {
      if (pending) {
        var response = pending.response,
          tokenAddress = pending.tokenAddress,
          spender = pending.spenderAddress,
          amount = pending.amount;
        addTransaction(response, {
          type: TransactionType.APPROVAL,
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
  var _useApproval = useApproval(amountToApprove, spender, useHasPendingApproval),
    _useApproval2 = _slicedToArray(_useApproval, 2),
    approval = _useApproval2[0],
    getApproval = _useApproval2[1];
  return [approval, useGetAndTrackApproval(getApproval)];
}

export { useApproveCallback };
