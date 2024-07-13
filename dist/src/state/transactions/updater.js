import React__default, { useMemo, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import '../../analytics/index.js';
import { L2_TXN_DISMISS_MS, DEFAULT_TXN_DISMISS_MS } from '../../constants/misc.js';
import Updater$1 from '../../lib/hooks/transactions/updater.js';
import { PopupType } from '../application/reducer.js';
import { useAppSelector, useAppDispatch } from '../hooks.js';
import { logSwapSuccess } from '../../tracing/swapFlowLoggers.js';
import { L2_CHAIN_IDS } from '../../constants/chains.js';
import { useAddPopup } from '../application/hooks.js';
import { isPendingTx } from './hooks.js';
import { checkedTransaction, finalizeTransaction } from './reducer.js';
import { TransactionType } from './types.js';
import { useTrace } from '@uniswap/analytics';

function toSerializableReceipt(receipt) {
  return {
    blockHash: receipt.blockHash,
    blockNumber: receipt.blockNumber,
    contractAddress: receipt.contractAddress,
    from: receipt.from,
    status: receipt.status,
    to: receipt.to,
    transactionHash: receipt.transactionHash,
    transactionIndex: receipt.transactionIndex
  };
}
function Updater() {
  const analyticsContext = useTrace();
  const {
    chainId
  } = useWeb3React();
  const addPopup = useAddPopup();
  // speed up popup dismisall time if on L2
  const isL2 = Boolean(chainId && L2_CHAIN_IDS.includes(chainId));
  const transactions = useAppSelector(state => state.transactions);
  const pendingTransactions = useMemo(() => {
    if (!chainId || !transactions[chainId]) return {};
    return Object.values(transactions[chainId]).reduce((acc, tx) => {
      if (isPendingTx(tx)) acc[tx.hash] = tx;
      return acc;
    }, {});
  }, [chainId, transactions]);
  const dispatch = useAppDispatch();
  const onCheck = useCallback(_ref => {
    let {
      chainId,
      hash,
      blockNumber
    } = _ref;
    return dispatch(checkedTransaction({
      chainId,
      hash,
      blockNumber
    }));
  }, [dispatch]);
  const onReceipt = useCallback(_ref2 => {
    let {
      chainId,
      hash,
      receipt
    } = _ref2;
    dispatch(finalizeTransaction({
      chainId,
      hash,
      receipt: toSerializableReceipt(receipt)
    }));
    if (pendingTransactions[hash] && pendingTransactions[hash].info?.type === TransactionType.SWAP) {
      logSwapSuccess(hash, chainId, analyticsContext);
    }
    addPopup({
      type: PopupType.Transaction,
      hash
    }, hash, isL2 ? L2_TXN_DISMISS_MS : DEFAULT_TXN_DISMISS_MS);
  }, [addPopup, analyticsContext, dispatch, isL2, pendingTransactions]);
  return /*#__PURE__*/React__default.createElement(Updater$1, {
    pendingTransactions: pendingTransactions,
    onCheck: onCheck,
    onReceipt: onReceipt
  });
}

export { Updater as default, toSerializableReceipt };
