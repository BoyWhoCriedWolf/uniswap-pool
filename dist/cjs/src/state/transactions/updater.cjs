'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var core = require('@web3-react/core');
require('../../analytics/index.cjs');
var misc = require('../../constants/misc.cjs');
var updater = require('../../lib/hooks/transactions/updater.cjs');
var reducer$1 = require('../application/reducer.cjs');
var hooks$1 = require('../hooks.cjs');
var swapFlowLoggers = require('../../tracing/swapFlowLoggers.cjs');
var chains = require('../../constants/chains.cjs');
var hooks = require('../application/hooks.cjs');
var hooks$2 = require('./hooks.cjs');
var reducer = require('./reducer.cjs');
var types = require('./types.cjs');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
  var analyticsContext = analytics.useTrace();
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var addPopup = hooks.useAddPopup();
  // speed up popup dismisall time if on L2
  var isL2 = Boolean(chainId && chains.L2_CHAIN_IDS.includes(chainId));
  var transactions = hooks$1.useAppSelector(function (state) {
    return state.transactions;
  });
  var pendingTransactions = React.useMemo(function () {
    if (!chainId || !transactions[chainId]) return {};
    return Object.values(transactions[chainId]).reduce(function (acc, tx) {
      if (hooks$2.isPendingTx(tx)) acc[tx.hash] = tx;
      return acc;
    }, {});
  }, [chainId, transactions]);
  var dispatch = hooks$1.useAppDispatch();
  var onCheck = React.useCallback(function (_ref) {
    var chainId = _ref.chainId,
      hash = _ref.hash,
      blockNumber = _ref.blockNumber;
    return dispatch(reducer.checkedTransaction({
      chainId: chainId,
      hash: hash,
      blockNumber: blockNumber
    }));
  }, [dispatch]);
  var onReceipt = React.useCallback(function (_ref2) {
    var _pendingTransactions$;
    var chainId = _ref2.chainId,
      hash = _ref2.hash,
      receipt = _ref2.receipt;
    dispatch(reducer.finalizeTransaction({
      chainId: chainId,
      hash: hash,
      receipt: toSerializableReceipt(receipt)
    }));
    if (pendingTransactions[hash] && ((_pendingTransactions$ = pendingTransactions[hash].info) === null || _pendingTransactions$ === void 0 ? void 0 : _pendingTransactions$.type) === types.TransactionType.SWAP) {
      swapFlowLoggers.logSwapSuccess(hash, chainId, analyticsContext);
    }
    addPopup({
      type: reducer$1.PopupType.Transaction,
      hash: hash
    }, hash, isL2 ? misc.L2_TXN_DISMISS_MS : misc.DEFAULT_TXN_DISMISS_MS);
  }, [addPopup, analyticsContext, dispatch, isL2, pendingTransactions]);
  return /*#__PURE__*/React__default["default"].createElement(updater["default"], {
    pendingTransactions: pendingTransactions,
    onCheck: onCheck,
    onReceipt: onReceipt
  });
}

exports["default"] = Updater;
exports.toSerializableReceipt = toSerializableReceipt;
