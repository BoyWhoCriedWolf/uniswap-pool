import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { DEFAULT_DEADLINE_FROM_NOW } from '../../constants/misc.js';
import { persistor } from '../index.js';
import { initialState as initialState$2 } from '../lists/reducer.js';
import { RouterPreference } from '../routing/types.js';
import { initialState } from '../transactions/reducer.js';
import { initialState as initialState$1 } from '../user/reducer.js';
import { SlippageTolerance } from '../user/types.js';

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
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
    var oldTransactions, oldUser, oldLists, oldSignatures, newTransactions, newUser, newLists, newSignatures, result;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          oldTransactions = localStorage.getItem("redux_localstorage_simple_transactions");
          oldUser = localStorage.getItem("redux_localstorage_simple_user");
          oldLists = localStorage.getItem("redux_localstorage_simple_lists");
          oldSignatures = localStorage.getItem("redux_localstorage_simple_signatures");
          newTransactions = tryParseOldState(oldTransactions, initialState);
          newUser = tryParseOldState(oldUser, initialState$1);
          newLists = tryParseOldState(oldLists, initialState$2);
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
          return persistor.flush();
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
    result.userSlippageTolerance = SlippageTolerance.Auto;
  } else {
    if (!result.userSlippageToleranceHasBeenMigratedToAuto && [10, 50, 100].indexOf(result.userSlippageTolerance) !== -1) {
      result.userSlippageTolerance = SlippageTolerance.Auto;
      result.userSlippageToleranceHasBeenMigratedToAuto = true;
    }
  }

  // If `userDeadline` is not present or its value is invalid, reset to default
  if (typeof result.userDeadline !== "number" || !Number.isInteger(result.userDeadline) || result.userDeadline < 60 || result.userDeadline > 180 * 60) {
    result.userDeadline = DEFAULT_DEADLINE_FROM_NOW;
  }

  // If `userRouterPreference` is not present, reset to default
  if (typeof result.userRouterPreference !== "string") {
    result.userRouterPreference = RouterPreference.API;
  }

  // If `userRouterPreference` is `AUTO`, migrate to `API`
  if (result.userRouterPreference === "auto") {
    result.userRouterPreference = RouterPreference.API;
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

export { legacyLocalStorageMigration };
