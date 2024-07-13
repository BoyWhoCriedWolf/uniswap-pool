'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bignumber = require('@ethersproject/bignumber');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var parseLocal = require('../../components/AccountDrawer/MiniPortfolio/Activity/parseLocal.cjs');
var React = require('react');
var hooks = require('../hooks.cjs');
var types = require('../routing/types.cjs');
var reducer = require('./reducer.cjs');
var types$1 = require('./types.cjs');

// helper that can take a ethers library transaction response and add it to the list of transactions
function useTransactionAdder() {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId,
    account = _useWeb3React.account;
  var dispatch = hooks.useAppDispatch();
  return React.useCallback(function (response, info, deadline) {
    if (!account) return;
    if (!chainId) return;
    var hash = response.hash,
      nonce = response.nonce;
    if (!hash) {
      throw Error("No transaction hash found.");
    }
    dispatch(reducer.addTransaction({
      hash: hash,
      from: account,
      info: info,
      chainId: chainId,
      nonce: nonce,
      deadline: deadline
    }));
  }, [account, chainId, dispatch]);
}
function useTransactionRemover() {
  var _useWeb3React2 = core.useWeb3React(),
    chainId = _useWeb3React2.chainId,
    account = _useWeb3React2.account;
  var dispatch = hooks.useAppDispatch();
  return React.useCallback(function (hash) {
    if (!account) return;
    if (!chainId) return;
    dispatch(reducer.removeTransaction({
      hash: hash,
      chainId: chainId
    }));
  }, [account, chainId, dispatch]);
}
function useTransactionCanceller() {
  var dispatch = hooks.useAppDispatch();
  return React.useCallback(function (hash, chainId, cancelHash) {
    dispatch(reducer.cancelTransaction({
      hash: hash,
      chainId: chainId,
      cancelHash: cancelHash
    }));
  }, [dispatch]);
}
function useMultichainTransactions() {
  var state = hooks.useAppSelector(function (state) {
    return state.transactions;
  });
  return sdkCore.SUPPORTED_CHAINS.flatMap(function (chainId) {
    return state[chainId] ? Object.values(state[chainId]).map(function (tx) {
      return [tx, chainId];
    }) : [];
  });
}

// returns all the transactions for the current chain
function useAllTransactions() {
  var _state$chainId;
  var _useWeb3React3 = core.useWeb3React(),
    chainId = _useWeb3React3.chainId;
  var state = hooks.useAppSelector(function (state) {
    return state.transactions;
  });
  return chainId ? (_state$chainId = state[chainId]) !== null && _state$chainId !== void 0 ? _state$chainId : {} : {};
}
function useTransaction(transactionHash) {
  var allTransactions = useAllTransactions();
  if (!transactionHash) {
    return undefined;
  }
  return allTransactions[transactionHash];
}
function useIsTransactionPending(transactionHash) {
  var transactions = useAllTransactions();
  if (!transactionHash || !transactions[transactionHash]) return false;
  return isPendingTx(transactions[transactionHash]);
}
function useIsTransactionConfirmed(transactionHash) {
  var transactions = useAllTransactions();
  if (!transactionHash || !transactions[transactionHash]) return false;
  return Boolean(transactions[transactionHash].receipt);
}
function useSwapTransactionStatus(swapResult) {
  var transaction = useTransaction((swapResult === null || swapResult === void 0 ? void 0 : swapResult.type) === types.TradeFillType.Classic ? swapResult.response.hash : undefined);
  if (!transaction) return undefined;
  return parseLocal.getTransactionStatus(transaction);
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
function isTransactionRecent(tx) {
  return new Date().getTime() - tx.addedTime < 86400000;
}
function usePendingApprovalAmount(token, spender) {
  var allTransactions = useAllTransactions();
  return React.useMemo(function () {
    if (typeof (token === null || token === void 0 ? void 0 : token.address) !== "string" || typeof spender !== "string") {
      return undefined;
    }
    for (var _txHash in allTransactions) {
      var tx = allTransactions[_txHash];
      if (!tx || tx.receipt || tx.info.type !== types$1.TransactionType.APPROVAL) continue;
      if (tx.info.spender === spender && tx.info.tokenAddress === token.address && isTransactionRecent(tx)) {
        return bignumber.BigNumber.from(tx.info.amount);
      }
    }
    return undefined;
  }, [allTransactions, spender, token === null || token === void 0 ? void 0 : token.address]);
}

// returns whether a token has a pending approval transaction
function useHasPendingApproval(token, spender) {
  var _usePendingApprovalAm, _usePendingApprovalAm2;
  return (_usePendingApprovalAm = (_usePendingApprovalAm2 = usePendingApprovalAmount(token, spender)) === null || _usePendingApprovalAm2 === void 0 ? void 0 : _usePendingApprovalAm2.gt(0)) !== null && _usePendingApprovalAm !== void 0 ? _usePendingApprovalAm : false;
}
function useHasPendingRevocation(token, spender) {
  var _usePendingApprovalAm3, _usePendingApprovalAm4;
  return (_usePendingApprovalAm3 = (_usePendingApprovalAm4 = usePendingApprovalAmount(token, spender)) === null || _usePendingApprovalAm4 === void 0 ? void 0 : _usePendingApprovalAm4.eq(0)) !== null && _usePendingApprovalAm3 !== void 0 ? _usePendingApprovalAm3 : false;
}
function isPendingTx(tx) {
  return !tx.receipt && !tx.cancelled;
}
function usePendingTransactions() {
  var allTransactions = useAllTransactions();
  var _useWeb3React4 = core.useWeb3React(),
    account = _useWeb3React4.account;
  return React.useMemo(function () {
    return Object.values(allTransactions).filter(function (tx) {
      return tx.from === account && isPendingTx(tx);
    });
  }, [account, allTransactions]);
}

exports.isPendingTx = isPendingTx;
exports.useHasPendingApproval = useHasPendingApproval;
exports.useHasPendingRevocation = useHasPendingRevocation;
exports.useIsTransactionConfirmed = useIsTransactionConfirmed;
exports.useIsTransactionPending = useIsTransactionPending;
exports.useMultichainTransactions = useMultichainTransactions;
exports.usePendingTransactions = usePendingTransactions;
exports.useSwapTransactionStatus = useSwapTransactionStatus;
exports.useTransaction = useTransaction;
exports.useTransactionAdder = useTransactionAdder;
exports.useTransactionCanceller = useTransactionCanceller;
exports.useTransactionRemover = useTransactionRemover;
