import { useWeb3React } from '@web3-react/core';
import ms from 'ms';
import { useEffect } from 'react';
import { isFinalizedOrder } from '../../../state/signatures/hooks.js';

// const UNISWAP_API_URL = process.env.REACT_APP_UNISWAP_API_URL;
const UNISWAP_API_URL = "https://api.uniswap.org/v2";
function fetchOrderStatuses(account, orders) {
  const orderHashes = orders.map(order => order.orderHash).join(",");
  return global.fetch(`${UNISWAP_API_URL}/orders?swapper=${account}&orderHashes=${orderHashes}`);
}
const OFF_CHAIN_ORDER_STATUS_POLLING = ms(`2s`);
function OrderUpdater(_ref) {
  let {
    pendingOrders,
    onOrderUpdate
  } = _ref;
  const {
    account
  } = useWeb3React();
  useEffect(() => {
    async function getOrderStatuses() {
      if (!account || pendingOrders.length === 0) return;

      // Stop polling if all orders in our queue have "finalized" states
      if (pendingOrders.every(order => isFinalizedOrder(order.status))) {
        clearInterval(interval);
        return;
      }
      try {
        const pollOrderStatus = await fetchOrderStatuses(account, pendingOrders);
        const orderStatuses = await pollOrderStatus.json();
        pendingOrders.forEach(pendingOrder => {
          const updatedOrder = orderStatuses.orders.find(order => order.orderHash === pendingOrder.orderHash);
          if (updatedOrder) {
            onOrderUpdate(pendingOrder, updatedOrder);
          }
        });
      } catch (e) {
        console.error("Error fetching order statuses", e);
      }
    }
    const interval = setInterval(getOrderStatuses, OFF_CHAIN_ORDER_STATUS_POLLING);
    return () => clearInterval(interval);
  }, [account, onOrderUpdate, pendingOrders]);
  return null;
}

export { OrderUpdater as default };
