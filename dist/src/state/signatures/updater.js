import React__default, { useMemo, useCallback } from 'react';
import { TradeType } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { L2_TXN_DISMISS_MS, DEFAULT_TXN_DISMISS_MS } from '../../constants/misc.js';
import { UniswapXOrderStatus } from '../../lib/hooks/orders/types.js';
import OrderUpdater from '../../lib/hooks/orders/updater.js';
import { PopupType } from '../application/reducer.js';
import { useAppDispatch } from '../hooks.js';
import { addTransaction } from '../transactions/reducer.js';
import { toSerializableReceipt } from '../transactions/updater.js';
import { isL2ChainId } from '../../utils/chains.js';
import { useAddPopup } from '../application/hooks.js';
import { useAllSignatures } from './hooks.js';
import { updateSignature } from './reducer.js';
import { SignatureType } from './types.js';

function Updater() {
  const {
    provider
  } = useWeb3React();
  const addPopup = useAddPopup();
  const signatures = useAllSignatures();
  const pendingOrders = useMemo(() => Object.values(signatures).filter(signature => signature.type === SignatureType.SIGN_UNISWAPX_ORDER && signature.status === UniswapXOrderStatus.OPEN), [signatures]);
  const dispatch = useAppDispatch();
  const onOrderUpdate = useCallback((order, update) => {
    if (order.status === update.orderStatus) return;
    const popupDismissalTime = isL2ChainId(order.chainId) ? L2_TXN_DISMISS_MS : DEFAULT_TXN_DISMISS_MS;
    const updatedOrder = {
      ...order,
      status: update.orderStatus
    };
    if (update.orderStatus === UniswapXOrderStatus.FILLED && update.txHash) {
      updatedOrder.txHash = update.txHash;
      // Updates the order to contain the settled/on-chain output amount
      if (updatedOrder.swapInfo.tradeType === TradeType.EXACT_INPUT) {
        updatedOrder.swapInfo = {
          ...updatedOrder.swapInfo,
          settledOutputCurrencyAmountRaw: update.settledAmounts?.[0]?.amountOut
        };
      }
      // Wait to update a filled order until the on-chain tx is available.
      provider?.getTransactionReceipt(update.txHash).then(receipt => {
        dispatch(addTransaction({
          chainId: updatedOrder.chainId,
          from: updatedOrder.offerer,
          // TODO(WEB-2053): use filler as from once tx reducer is organized by account
          hash: update.txHash,
          info: updatedOrder.swapInfo,
          receipt: toSerializableReceipt(receipt)
        }));
        dispatch(updateSignature(updatedOrder));
        addPopup({
          type: PopupType.Transaction,
          hash: update.txHash
        }, update.txHash, popupDismissalTime);
      });
    } else {
      dispatch(updateSignature(updatedOrder));
      addPopup({
        type: PopupType.Order,
        orderHash: order.orderHash
      }, updatedOrder.orderHash, popupDismissalTime);
    }
  }, [addPopup, dispatch, provider]);
  return /*#__PURE__*/React__default.createElement(OrderUpdater, {
    pendingOrders: pendingOrders,
    onOrderUpdate: onOrderUpdate
  });
}

export { Updater as default };
