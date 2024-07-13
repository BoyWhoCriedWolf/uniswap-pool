import { ChainId } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import useCurrentBlockTimestamp from '../../../hooks/useCurrentBlockTimestamp.js';
import useBlockNumber, { useFastForwardBlockNumber } from '../useBlockNumber.js';
import ms from 'ms';
import { useCallback, useEffect } from 'react';
import { useTransactionRemover } from '../../../state/transactions/hooks.js';
import { retry, CanceledError, RetryableError } from './retry.js';

function shouldCheck(lastBlockNumber, tx) {
  if (tx.receipt) return false;
  if (!tx.lastCheckedBlockNumber) return true;
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) return false;
  const minutesPending = (new Date().getTime() - tx.addedTime) / ms(`1m`);
  if (minutesPending > 60) {
    // every 10 blocks if pending longer than an hour
    return blocksSinceCheck > 9;
  } else if (minutesPending > 5) {
    // every 3 blocks if pending longer than 5 minutes
    return blocksSinceCheck > 2;
  } else {
    // otherwise every block
    return true;
  }
}
const RETRY_OPTIONS_BY_CHAIN_ID = {
  [ChainId.ARBITRUM_ONE]: {
    n: 10,
    minWait: 250,
    maxWait: 1000
  },
  [ChainId.ARBITRUM_GOERLI]: {
    n: 10,
    minWait: 250,
    maxWait: 1000
  },
  [ChainId.OPTIMISM]: {
    n: 10,
    minWait: 250,
    maxWait: 1000
  },
  [ChainId.OPTIMISM_GOERLI]: {
    n: 10,
    minWait: 250,
    maxWait: 1000
  }
};
const DEFAULT_RETRY_OPTIONS = {
  n: 1,
  minWait: 0,
  maxWait: 0
};
function Updater(_ref) {
  let {
    pendingTransactions,
    onCheck,
    onReceipt
  } = _ref;
  const {
    account,
    chainId,
    provider
  } = useWeb3React();
  const lastBlockNumber = useBlockNumber();
  const fastForwardBlockNumber = useFastForwardBlockNumber();
  const removeTransaction = useTransactionRemover();
  const blockTimestamp = useCurrentBlockTimestamp();
  const getReceipt = useCallback(hash => {
    if (!provider || !chainId) throw new Error("No provider or chainId");
    const retryOptions = RETRY_OPTIONS_BY_CHAIN_ID[chainId] ?? DEFAULT_RETRY_OPTIONS;
    return retry(() => provider.getTransactionReceipt(hash).then(async receipt => {
      if (receipt === null) {
        if (account) {
          const tx = pendingTransactions[hash];
          // Remove transactions past their deadline or - if there is no deadline - older than 6 hours.
          if (tx.deadline) {
            // Deadlines are expressed as seconds since epoch, as they are used on-chain.
            if (blockTimestamp && tx.deadline < blockTimestamp.toNumber()) {
              removeTransaction(hash);
            }
          } else if (tx.addedTime + ms(`6h`) < Date.now()) {
            removeTransaction(hash);
          }
        }
        throw new RetryableError();
      }
      return receipt;
    }), retryOptions);
  }, [account, blockTimestamp, chainId, pendingTransactions, provider, removeTransaction]);
  useEffect(() => {
    if (!chainId || !provider || !lastBlockNumber) return;
    const cancels = Object.keys(pendingTransactions).filter(hash => shouldCheck(lastBlockNumber, pendingTransactions[hash])).map(hash => {
      const {
        promise,
        cancel
      } = getReceipt(hash);
      promise.then(receipt => {
        fastForwardBlockNumber(receipt.blockNumber);
        onReceipt({
          chainId,
          hash,
          receipt
        });
      }).catch(error => {
        if (error instanceof CanceledError) return;
        onCheck({
          chainId,
          hash,
          blockNumber: lastBlockNumber
        });
      });
      return cancel;
    });
    return () => {
      cancels.forEach(cancel => cancel());
    };
  }, [chainId, provider, lastBlockNumber, getReceipt, onReceipt, onCheck, pendingTransactions, fastForwardBlockNumber]);
  return null;
}

export { Updater as default, shouldCheck };
