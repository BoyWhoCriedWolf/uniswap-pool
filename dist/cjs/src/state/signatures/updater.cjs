'use strict';

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var misc = require('../../constants/misc.cjs');
var types$1 = require('../../lib/hooks/orders/types.cjs');
var updater$1 = require('../../lib/hooks/orders/updater.cjs');
var reducer$2 = require('../application/reducer.cjs');
var hooks$2 = require('../hooks.cjs');
var reducer = require('../transactions/reducer.cjs');
var updater = require('../transactions/updater.cjs');
var chains = require('../../utils/chains.cjs');
var hooks = require('../application/hooks.cjs');
var hooks$1 = require('./hooks.cjs');
var reducer$1 = require('./reducer.cjs');
var types = require('./types.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Updater() {
  var _useWeb3React = core.useWeb3React(),
    provider = _useWeb3React.provider;
  var addPopup = hooks.useAddPopup();
  var signatures = hooks$1.useAllSignatures();
  var pendingOrders = React.useMemo(function () {
    return Object.values(signatures).filter(function (signature) {
      return signature.type === types.SignatureType.SIGN_UNISWAPX_ORDER && signature.status === types$1.UniswapXOrderStatus.OPEN;
    });
  }, [signatures]);
  var dispatch = hooks$2.useAppDispatch();
  var onOrderUpdate = React.useCallback(function (order, update) {
    if (order.status === update.orderStatus) return;
    var popupDismissalTime = chains.isL2ChainId(order.chainId) ? misc.L2_TXN_DISMISS_MS : misc.DEFAULT_TXN_DISMISS_MS;
    var updatedOrder = _objectSpread(_objectSpread({}, order), {}, {
      status: update.orderStatus
    });
    if (update.orderStatus === types$1.UniswapXOrderStatus.FILLED && update.txHash) {
      updatedOrder.txHash = update.txHash;
      // Updates the order to contain the settled/on-chain output amount
      if (updatedOrder.swapInfo.tradeType === sdkCore.TradeType.EXACT_INPUT) {
        var _update$settledAmount;
        updatedOrder.swapInfo = _objectSpread(_objectSpread({}, updatedOrder.swapInfo), {}, {
          settledOutputCurrencyAmountRaw: (_update$settledAmount = update.settledAmounts) === null || _update$settledAmount === void 0 || (_update$settledAmount = _update$settledAmount[0]) === null || _update$settledAmount === void 0 ? void 0 : _update$settledAmount.amountOut
        });
      }
      // Wait to update a filled order until the on-chain tx is available.
      provider === null || provider === void 0 || provider.getTransactionReceipt(update.txHash).then(function (receipt) {
        dispatch(reducer.addTransaction({
          chainId: updatedOrder.chainId,
          from: updatedOrder.offerer,
          // TODO(WEB-2053): use filler as from once tx reducer is organized by account
          hash: update.txHash,
          info: updatedOrder.swapInfo,
          receipt: updater.toSerializableReceipt(receipt)
        }));
        dispatch(reducer$1.updateSignature(updatedOrder));
        addPopup({
          type: reducer$2.PopupType.Transaction,
          hash: update.txHash
        }, update.txHash, popupDismissalTime);
      });
    } else {
      dispatch(reducer$1.updateSignature(updatedOrder));
      addPopup({
        type: reducer$2.PopupType.Order,
        orderHash: order.orderHash
      }, updatedOrder.orderHash, popupDismissalTime);
    }
  }, [addPopup, dispatch, provider]);
  return /*#__PURE__*/React__default["default"].createElement(updater$1, {
    pendingOrders: pendingOrders,
    onOrderUpdate: onOrderUpdate
  });
}

module.exports = Updater;
