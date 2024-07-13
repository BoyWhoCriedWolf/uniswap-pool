import { BigNumber } from '@ethersproject/bignumber';
import { SUPPORTED_CHAINS } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { getTransactionStatus } from '../../components/AccountDrawer/MiniPortfolio/Activity/parseLocal.js';
import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks.js';
import { TradeFillType } from '../routing/types.js';
import { addTransaction, removeTransaction, cancelTransaction } from './reducer.js';
import { TransactionType } from './types.js';

// helper that can take a ethers library transaction response and add it to the list of transactions
function useTransactionAdder() {
  const {
    chainId,
    account
  } = useWeb3React();
  const dispatch = useAppDispatch();
  return useCallback((response, info, deadline) => {
    if (!account) return;
    if (!chainId) return;
    const {
      hash,
      nonce
    } = response;
    if (!hash) {
      throw Error("No transaction hash found.");
    }
    dispatch(addTransaction({
      hash,
      from: account,
      info,
      chainId,
      nonce,
      deadline
    }));
  }, [account, chainId, dispatch]);
}
function useTransactionRemover() {
  const {
    chainId,
    account
  } = useWeb3React();
  const dispatch = useAppDispatch();
  return useCallback(hash => {
    if (!account) return;
    if (!chainId) return;
    dispatch(removeTransaction({
      hash,
      chainId
    }));
  }, [account, chainId, dispatch]);
}
function useTransactionCanceller() {
  const dispatch = useAppDispatch();
  return useCallback((hash, chainId, cancelHash) => {
    dispatch(cancelTransaction({
      hash,
      chainId,
      cancelHash
    }));
  }, [dispatch]);
}
function useMultichainTransactions() {
  const state = useAppSelector(state => state.transactions);
  return SUPPORTED_CHAINS.flatMap(chainId => state[chainId] ? Object.values(state[chainId]).map(tx => [tx, chainId]) : []);
}

// returns all the transactions for the current chain
function useAllTransactions() {
  const {
    chainId
  } = useWeb3React();
  const state = useAppSelector(state => state.transactions);
  return chainId ? state[chainId] ?? {} : {};
}
function useTransaction(transactionHash) {
  const allTransactions = useAllTransactions();
  if (!transactionHash) {
    return undefined;
  }
  return allTransactions[transactionHash];
}
function useIsTransactionPending(transactionHash) {
  const transactions = useAllTransactions();
  if (!transactionHash || !transactions[transactionHash]) return false;
  return isPendingTx(transactions[transactionHash]);
}
function useIsTransactionConfirmed(transactionHash) {
  const transactions = useAllTransactions();
  if (!transactionHash || !transactions[transactionHash]) return false;
  return Boolean(transactions[transactionHash].receipt);
}
function useSwapTransactionStatus(swapResult) {
  const transaction = useTransaction(swapResult?.type === TradeFillType.Classic ? swapResult.response.hash : undefined);
  if (!transaction) return undefined;
  return getTransactionStatus(transaction);
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
function isTransactionRecent(tx) {
  return new Date().getTime() - tx.addedTime < 86_400_000;
}
function usePendingApprovalAmount(token, spender) {
  const allTransactions = useAllTransactions();
  return useMemo(() => {
    if (typeof token?.address !== "string" || typeof spender !== "string") {
      return undefined;
    }
    for (const txHash in allTransactions) {
      const tx = allTransactions[txHash];
      if (!tx || tx.receipt || tx.info.type !== TransactionType.APPROVAL) continue;
      if (tx.info.spender === spender && tx.info.tokenAddress === token.address && isTransactionRecent(tx)) {
        return BigNumber.from(tx.info.amount);
      }
    }
    return undefined;
  }, [allTransactions, spender, token?.address]);
}

// returns whether a token has a pending approval transaction
function useHasPendingApproval(token, spender) {
  return usePendingApprovalAmount(token, spender)?.gt(0) ?? false;
}
function useHasPendingRevocation(token, spender) {
  return usePendingApprovalAmount(token, spender)?.eq(0) ?? false;
}
function isPendingTx(tx) {
  return !tx.receipt && !tx.cancelled;
}
function usePendingTransactions() {
  const allTransactions = useAllTransactions();
  const {
    account
  } = useWeb3React();
  return useMemo(() => Object.values(allTransactions).filter(tx => tx.from === account && isPendingTx(tx)), [account, allTransactions]);
}

export { isPendingTx, useHasPendingApproval, useHasPendingRevocation, useIsTransactionConfirmed, useIsTransactionPending, useMultichainTransactions, usePendingTransactions, useSwapTransactionStatus, useTransaction, useTransactionAdder, useTransactionCanceller, useTransactionRemover };
