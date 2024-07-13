import { createSlice } from '@reduxjs/toolkit';

// TODO(WEB-2053): update this to be a map of account -> chainId -> txHash -> TransactionDetails
// to simplify usage, once we're able to invalidate localstorage
const initialState = {};
const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction(transactions, _ref) {
      let {
        payload: {
          chainId,
          from,
          hash,
          info,
          nonce,
          deadline,
          receipt
        }
      } = _ref;
      if (transactions[chainId]?.[hash]) {
        throw Error("Attempted to add existing transaction.");
      }
      const txs = transactions[chainId] ?? {};
      txs[hash] = {
        hash,
        info,
        from,
        addedTime: Date.now(),
        nonce,
        deadline,
        receipt
      };
      transactions[chainId] = txs;
    },
    clearAllTransactions(transactions, _ref2) {
      let {
        payload: {
          chainId
        }
      } = _ref2;
      if (!transactions[chainId]) return;
      transactions[chainId] = {};
    },
    removeTransaction(transactions, _ref3) {
      let {
        payload: {
          chainId,
          hash
        }
      } = _ref3;
      if (transactions[chainId][hash]) {
        delete transactions[chainId][hash];
      }
    },
    checkedTransaction(transactions, _ref4) {
      let {
        payload: {
          chainId,
          hash,
          blockNumber
        }
      } = _ref4;
      const tx = transactions[chainId]?.[hash];
      if (!tx) {
        return;
      }
      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber;
      } else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
      }
    },
    finalizeTransaction(transactions, _ref5) {
      let {
        payload: {
          hash,
          chainId,
          receipt
        }
      } = _ref5;
      const tx = transactions[chainId]?.[hash];
      if (!tx) {
        return;
      }
      tx.receipt = receipt;
      tx.confirmedTime = Date.now();
    },
    cancelTransaction(transactions, _ref6) {
      let {
        payload: {
          hash,
          chainId,
          cancelHash
        }
      } = _ref6;
      const tx = transactions[chainId]?.[hash];
      if (tx) {
        delete transactions[chainId]?.[hash];
        transactions[chainId][cancelHash] = {
          ...tx,
          hash: cancelHash,
          cancelled: true
        };
      }
    }
  }
});
const {
  addTransaction,
  clearAllTransactions,
  checkedTransaction,
  finalizeTransaction,
  removeTransaction,
  cancelTransaction
} = transactionSlice.actions;
var transactions = transactionSlice.reducer;

export { addTransaction, cancelTransaction, checkedTransaction, clearAllTransactions, transactions as default, finalizeTransaction, initialState, removeTransaction };
