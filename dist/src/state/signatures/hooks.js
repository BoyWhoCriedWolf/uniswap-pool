import { useWeb3React } from '@web3-react/core';
import { UniswapXOrderStatus } from '../../lib/hooks/orders/types.js';
import { useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../hooks.js';
import { addSignature } from './reducer.js';
import { SignatureType } from './types.js';

function useAllSignatures() {
  const {
    account
  } = useWeb3React();
  const signatures = useAppSelector(state => state.signatures) ?? {};
  if (!account || !signatures[account]) return {};
  return signatures[account];
}
function usePendingOrders() {
  const signatures = useAllSignatures();
  return useMemo(() => {
    return Object.values(signatures).filter(isPendingOrder);
  }, [signatures]);
}
function useOrder(orderHash) {
  const signatures = useAllSignatures();
  return useMemo(() => {
    const order = signatures[orderHash];
    if (!order || order.type !== SignatureType.SIGN_UNISWAPX_ORDER) return undefined;
    return order;
  }, [signatures, orderHash]);
}
function useAddOrder() {
  const dispatch = useDispatch();
  return useCallback((offerer, orderHash, chainId, expiry, swapInfo) => {
    dispatch(addSignature({
      type: SignatureType.SIGN_UNISWAPX_ORDER,
      offerer,
      id: orderHash,
      chainId,
      expiry,
      orderHash,
      swapInfo,
      status: UniswapXOrderStatus.OPEN,
      addedTime: Date.now()
    }));
  }, [dispatch]);
}
function isFinalizedOrder(orderStatus) {
  return orderStatus !== UniswapXOrderStatus.OPEN;
}
function isOnChainOrder(orderStatus) {
  return orderStatus === UniswapXOrderStatus.FILLED || orderStatus === UniswapXOrderStatus.CANCELLED;
}
function isPendingOrder(signature) {
  return signature.type === SignatureType.SIGN_UNISWAPX_ORDER && signature.status === UniswapXOrderStatus.OPEN;
}

export { isFinalizedOrder, isOnChainOrder, useAddOrder, useAllSignatures, useOrder, usePendingOrders };
