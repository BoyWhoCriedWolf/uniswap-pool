'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var core = require('@web3-react/core');
var types$1 = require('../../lib/hooks/orders/types.cjs');
var React = require('react');
var reactRedux = require('react-redux');
var hooks = require('../hooks.cjs');
var reducer = require('./reducer.cjs');
var types = require('./types.cjs');

function useAllSignatures() {
  var _useAppSelector;
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  var signatures = (_useAppSelector = hooks.useAppSelector(function (state) {
    return state.signatures;
  })) !== null && _useAppSelector !== void 0 ? _useAppSelector : {};
  if (!account || !signatures[account]) return {};
  return signatures[account];
}
function usePendingOrders() {
  var signatures = useAllSignatures();
  return React.useMemo(function () {
    return Object.values(signatures).filter(isPendingOrder);
  }, [signatures]);
}
function useOrder(orderHash) {
  var signatures = useAllSignatures();
  return React.useMemo(function () {
    var order = signatures[orderHash];
    if (!order || order.type !== types.SignatureType.SIGN_UNISWAPX_ORDER) return undefined;
    return order;
  }, [signatures, orderHash]);
}
function useAddOrder() {
  var dispatch = reactRedux.useDispatch();
  return React.useCallback(function (offerer, orderHash, chainId, expiry, swapInfo) {
    dispatch(reducer.addSignature({
      type: types.SignatureType.SIGN_UNISWAPX_ORDER,
      offerer: offerer,
      id: orderHash,
      chainId: chainId,
      expiry: expiry,
      orderHash: orderHash,
      swapInfo: swapInfo,
      status: types$1.UniswapXOrderStatus.OPEN,
      addedTime: Date.now()
    }));
  }, [dispatch]);
}
function isFinalizedOrder(orderStatus) {
  return orderStatus !== types$1.UniswapXOrderStatus.OPEN;
}
function isOnChainOrder(orderStatus) {
  return orderStatus === types$1.UniswapXOrderStatus.FILLED || orderStatus === types$1.UniswapXOrderStatus.CANCELLED;
}
function isPendingOrder(signature) {
  return signature.type === types.SignatureType.SIGN_UNISWAPX_ORDER && signature.status === types$1.UniswapXOrderStatus.OPEN;
}

exports.isFinalizedOrder = isFinalizedOrder;
exports.isOnChainOrder = isOnChainOrder;
exports.useAddOrder = useAddOrder;
exports.useAllSignatures = useAllSignatures;
exports.useOrder = useOrder;
exports.usePendingOrders = usePendingOrders;
