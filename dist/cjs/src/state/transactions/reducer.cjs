'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var toolkit = require('@reduxjs/toolkit');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// TODO(WEB-2053): update this to be a map of account -> chainId -> txHash -> TransactionDetails
// to simplify usage, once we're able to invalidate localstorage
var initialState = {};
var transactionSlice = toolkit.createSlice({
  name: "transactions",
  initialState: initialState,
  reducers: {
    addTransaction: function addTransaction(transactions, _ref) {
      var _transactions$chainId, _transactions$chainId2;
      var _ref$payload = _ref.payload,
        chainId = _ref$payload.chainId,
        from = _ref$payload.from,
        hash = _ref$payload.hash,
        info = _ref$payload.info,
        nonce = _ref$payload.nonce,
        deadline = _ref$payload.deadline,
        receipt = _ref$payload.receipt;
      if ((_transactions$chainId = transactions[chainId]) !== null && _transactions$chainId !== void 0 && _transactions$chainId[hash]) {
        throw Error("Attempted to add existing transaction.");
      }
      var txs = (_transactions$chainId2 = transactions[chainId]) !== null && _transactions$chainId2 !== void 0 ? _transactions$chainId2 : {};
      txs[hash] = {
        hash: hash,
        info: info,
        from: from,
        addedTime: Date.now(),
        nonce: nonce,
        deadline: deadline,
        receipt: receipt
      };
      transactions[chainId] = txs;
    },
    clearAllTransactions: function clearAllTransactions(transactions, _ref2) {
      var chainId = _ref2.payload.chainId;
      if (!transactions[chainId]) return;
      transactions[chainId] = {};
    },
    removeTransaction: function removeTransaction(transactions, _ref3) {
      var _ref3$payload = _ref3.payload,
        chainId = _ref3$payload.chainId,
        hash = _ref3$payload.hash;
      if (transactions[chainId][hash]) {
        delete transactions[chainId][hash];
      }
    },
    checkedTransaction: function checkedTransaction(transactions, _ref4) {
      var _transactions$chainId3;
      var _ref4$payload = _ref4.payload,
        chainId = _ref4$payload.chainId,
        hash = _ref4$payload.hash,
        blockNumber = _ref4$payload.blockNumber;
      var tx = (_transactions$chainId3 = transactions[chainId]) === null || _transactions$chainId3 === void 0 ? void 0 : _transactions$chainId3[hash];
      if (!tx) {
        return;
      }
      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber;
      } else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber);
      }
    },
    finalizeTransaction: function finalizeTransaction(transactions, _ref5) {
      var _transactions$chainId4;
      var _ref5$payload = _ref5.payload,
        hash = _ref5$payload.hash,
        chainId = _ref5$payload.chainId,
        receipt = _ref5$payload.receipt;
      var tx = (_transactions$chainId4 = transactions[chainId]) === null || _transactions$chainId4 === void 0 ? void 0 : _transactions$chainId4[hash];
      if (!tx) {
        return;
      }
      tx.receipt = receipt;
      tx.confirmedTime = Date.now();
    },
    cancelTransaction: function cancelTransaction(transactions, _ref6) {
      var _transactions$chainId5;
      var _ref6$payload = _ref6.payload,
        hash = _ref6$payload.hash,
        chainId = _ref6$payload.chainId,
        cancelHash = _ref6$payload.cancelHash;
      var tx = (_transactions$chainId5 = transactions[chainId]) === null || _transactions$chainId5 === void 0 ? void 0 : _transactions$chainId5[hash];
      if (tx) {
        var _transactions$chainId6;
        (_transactions$chainId6 = transactions[chainId]) === null || _transactions$chainId6 === void 0 || delete _transactions$chainId6[hash];
        transactions[chainId][cancelHash] = _objectSpread(_objectSpread({}, tx), {}, {
          hash: cancelHash,
          cancelled: true
        });
      }
    }
  }
});
var _transactionSlice$act = transactionSlice.actions,
  addTransaction = _transactionSlice$act.addTransaction;
  _transactionSlice$act.clearAllTransactions;
  var checkedTransaction = _transactionSlice$act.checkedTransaction,
  finalizeTransaction = _transactionSlice$act.finalizeTransaction,
  removeTransaction = _transactionSlice$act.removeTransaction,
  cancelTransaction = _transactionSlice$act.cancelTransaction;
var transactions = transactionSlice.reducer;

exports.addTransaction = addTransaction;
exports.cancelTransaction = cancelTransaction;
exports.checkedTransaction = checkedTransaction;
exports["default"] = transactions;
exports.finalizeTransaction = finalizeTransaction;
exports.initialState = initialState;
exports.removeTransaction = removeTransaction;
