'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var useCurrentBlockTimestamp = require('../../../hooks/useCurrentBlockTimestamp.cjs');
var useBlockNumber = require('../useBlockNumber.cjs');
var ms = require('ms');
var React = require('react');
var hooks = require('../../../state/transactions/hooks.cjs');
var retry = require('./retry.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

function shouldCheck(lastBlockNumber, tx) {
  if (tx.receipt) return false;
  if (!tx.lastCheckedBlockNumber) return true;
  var blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber;
  if (blocksSinceCheck < 1) return false;
  var minutesPending = (new Date().getTime() - tx.addedTime) / ms__default["default"]("1m");
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
var RETRY_OPTIONS_BY_CHAIN_ID = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, sdkCore.ChainId.ARBITRUM_ONE, {
  n: 10,
  minWait: 250,
  maxWait: 1000
}), sdkCore.ChainId.ARBITRUM_GOERLI, {
  n: 10,
  minWait: 250,
  maxWait: 1000
}), sdkCore.ChainId.OPTIMISM, {
  n: 10,
  minWait: 250,
  maxWait: 1000
}), sdkCore.ChainId.OPTIMISM_GOERLI, {
  n: 10,
  minWait: 250,
  maxWait: 1000
});
var DEFAULT_RETRY_OPTIONS = {
  n: 1,
  minWait: 0,
  maxWait: 0
};
function Updater(_ref) {
  var pendingTransactions = _ref.pendingTransactions,
    onCheck = _ref.onCheck,
    onReceipt = _ref.onReceipt;
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId,
    provider = _useWeb3React.provider;
  var lastBlockNumber = useBlockNumber["default"]();
  var fastForwardBlockNumber = useBlockNumber.useFastForwardBlockNumber();
  var removeTransaction = hooks.useTransactionRemover();
  var blockTimestamp = useCurrentBlockTimestamp();
  var getReceipt = React.useCallback(function (hash) {
    var _RETRY_OPTIONS_BY_CHA2;
    if (!provider || !chainId) throw new Error("No provider or chainId");
    var retryOptions = (_RETRY_OPTIONS_BY_CHA2 = RETRY_OPTIONS_BY_CHAIN_ID[chainId]) !== null && _RETRY_OPTIONS_BY_CHA2 !== void 0 ? _RETRY_OPTIONS_BY_CHA2 : DEFAULT_RETRY_OPTIONS;
    return retry.retry(function () {
      return provider.getTransactionReceipt(hash).then( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(receipt) {
          var _tx;
          return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                if (!(receipt === null)) {
                  _context.next = 3;
                  break;
                }
                if (account) {
                  _tx = pendingTransactions[hash]; // Remove transactions past their deadline or - if there is no deadline - older than 6 hours.
                  if (_tx.deadline) {
                    // Deadlines are expressed as seconds since epoch, as they are used on-chain.
                    if (blockTimestamp && _tx.deadline < blockTimestamp.toNumber()) {
                      removeTransaction(hash);
                    }
                  } else if (_tx.addedTime + ms__default["default"]("6h") < Date.now()) {
                    removeTransaction(hash);
                  }
                }
                throw new retry.RetryableError();
              case 3:
                return _context.abrupt("return", receipt);
              case 4:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        return function (_x) {
          return _ref2.apply(this, arguments);
        };
      }());
    }, retryOptions);
  }, [account, blockTimestamp, chainId, pendingTransactions, provider, removeTransaction]);
  React.useEffect(function () {
    if (!chainId || !provider || !lastBlockNumber) return;
    var cancels = Object.keys(pendingTransactions).filter(function (hash) {
      return shouldCheck(lastBlockNumber, pendingTransactions[hash]);
    }).map(function (hash) {
      var _getReceipt = getReceipt(hash),
        promise = _getReceipt.promise,
        cancel = _getReceipt.cancel;
      promise.then(function (receipt) {
        fastForwardBlockNumber(receipt.blockNumber);
        onReceipt({
          chainId: chainId,
          hash: hash,
          receipt: receipt
        });
      })["catch"](function (error) {
        if (error instanceof retry.CanceledError) return;
        onCheck({
          chainId: chainId,
          hash: hash,
          blockNumber: lastBlockNumber
        });
      });
      return cancel;
    });
    return function () {
      cancels.forEach(function (cancel) {
        return cancel();
      });
    };
  }, [chainId, provider, lastBlockNumber, getReceipt, onReceipt, onCheck, pendingTransactions, fastForwardBlockNumber]);
  return null;
}

exports["default"] = Updater;
exports.shouldCheck = shouldCheck;
