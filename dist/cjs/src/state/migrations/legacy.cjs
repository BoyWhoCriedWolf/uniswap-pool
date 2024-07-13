'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var misc = require('../../constants/misc.cjs');
var index = require('../index.cjs');
var reducer$2 = require('../lists/reducer.cjs');
var types$1 = require('../routing/types.cjs');
var reducer = require('../transactions/reducer.cjs');
var reducer$1 = require('../user/reducer.cjs');
var types = require('../user/types.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

var currentTimestamp = function currentTimestamp() {
  return new Date().getTime();
};
function tryParseOldState(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (e) {
    return fallback;
  }
}

/**
 * These functions handle all migrations that existed before we started tracking version numbers.
 */

var legacyLocalStorageMigration = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
    var oldTransactions, oldUser, oldLists, oldSignatures, newTransactions, newUser, newLists, newSignatures, result;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          oldTransactions = localStorage.getItem("redux_localstorage_simple_transactions");
          oldUser = localStorage.getItem("redux_localstorage_simple_user");
          oldLists = localStorage.getItem("redux_localstorage_simple_lists");
          oldSignatures = localStorage.getItem("redux_localstorage_simple_signatures");
          newTransactions = tryParseOldState(oldTransactions, reducer.initialState);
          newUser = tryParseOldState(oldUser, reducer$1.initialState);
          newLists = tryParseOldState(oldLists, reducer$2.initialState);
          newSignatures = tryParseOldState(oldSignatures, {});
          result = {
            user: legacyUserMigrations(newUser),
            transactions: legacyTransactionMigrations(newTransactions),
            lists: newLists,
            signatures: newSignatures,
            _persist: {
              version: 0,
              rehydrated: true
            }
          };
          _context.next = 11;
          return index.persistor.flush();
        case 11:
          localStorage.removeItem("redux_localstorage_simple_transactions");
          localStorage.removeItem("redux_localstorage_simple_user");
          localStorage.removeItem("redux_localstorage_simple_lists");
          localStorage.removeItem("redux_localstorage_simple_signatures");
          return _context.abrupt("return", result);
        case 16:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function legacyLocalStorageMigration() {
    return _ref.apply(this, arguments);
  };
}();
function legacyTransactionMigrations(state) {
  // Make a copy of the object so we can mutate it.
  var result = JSON.parse(JSON.stringify(state));
  // in case there are any transactions in the store with the old format, remove them
  Object.keys(result).forEach(function (chainId) {
    var chainTransactions = result[chainId];
    Object.keys(chainTransactions).forEach(function (hash) {
      if (!("info" in chainTransactions[hash])) {
        // clear old transactions that don't have the right format
        delete chainTransactions[hash];
      }
    });
  });
  return result;
}
function legacyUserMigrations(state) {
  // Make a copy of the object so we can mutate it.
  var result = JSON.parse(JSON.stringify(state));
  // If `selectedWallet` is a WalletConnect v1 wallet, reset to default.
  if (result.selectedWallet) {
    var selectedWallet = result.selectedWallet;
    if (selectedWallet === "UNIWALLET" || selectedWallet === "UNISWAP_WALLET" || selectedWallet === "WALLET_CONNECT") {
      delete result.selectedWallet;
    }
  }

  // If `userSlippageTolerance` is not present or its value is invalid, reset to default
  if (typeof result.userSlippageTolerance !== "number" || !Number.isInteger(result.userSlippageTolerance) || result.userSlippageTolerance < 0 || result.userSlippageTolerance > 5000) {
    result.userSlippageTolerance = types.SlippageTolerance.Auto;
  } else {
    if (!result.userSlippageToleranceHasBeenMigratedToAuto && [10, 50, 100].indexOf(result.userSlippageTolerance) !== -1) {
      result.userSlippageTolerance = types.SlippageTolerance.Auto;
      result.userSlippageToleranceHasBeenMigratedToAuto = true;
    }
  }

  // If `userDeadline` is not present or its value is invalid, reset to default
  if (typeof result.userDeadline !== "number" || !Number.isInteger(result.userDeadline) || result.userDeadline < 60 || result.userDeadline > 180 * 60) {
    result.userDeadline = misc.DEFAULT_DEADLINE_FROM_NOW;
  }

  // If `userRouterPreference` is not present, reset to default
  if (typeof result.userRouterPreference !== "string") {
    result.userRouterPreference = types$1.RouterPreference.API;
  }

  // If `userRouterPreference` is `AUTO`, migrate to `API`
  if (result.userRouterPreference === "auto") {
    result.userRouterPreference = types$1.RouterPreference.API;
  }

  //If `buyFiatFlowCompleted` is present, delete it using filtering
  if ("buyFiatFlowCompleted" in result) {
    //ignoring due to type errors occuring since we now remove this state
    //@ts-ignore
    delete result.buyFiatFlowCompleted;
  }
  result.lastUpdateVersionTimestamp = currentTimestamp();
  return result;
}

exports.legacyLocalStorageMigration = legacyLocalStorageMigration;
