'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var typesAndHooks = require('../../../../graphql/data/__generated__/types-and-hooks.cjs');
var React = require('react');
var hooks$1 = require('../../../../state/signatures/hooks.cjs');
var hooks = require('../../../../state/transactions/hooks.cjs');
var formatNumbers = require('../../../../utils/formatNumbers.cjs');
var parseLocal = require('./parseLocal.cjs');
var parseRemote = require('./parseRemote.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/** Detects transactions from same account with the same nonce and different hash */
function findCancelTx(localActivity, remoteMap, account) {
  // handles locally cached tx's that were stored before we started tracking nonces
  if (!localActivity.nonce || localActivity.status !== typesAndHooks.TransactionStatus.Pending) return undefined;
  for (var _i = 0, _Object$values = Object.values(remoteMap); _i < _Object$values.length; _i++) {
    var remoteTx = _Object$values[_i];
    if (!remoteTx) continue;

    // A pending tx is 'cancelled' when another tx with the same account & nonce but different hash makes it on chain
    if (remoteTx.nonce === localActivity.nonce && remoteTx.from.toLowerCase() === account.toLowerCase() && remoteTx.hash.toLowerCase() !== localActivity.hash.toLowerCase() && remoteTx.chainId === localActivity.chainId) {
      return remoteTx.hash;
    }
  }
  return undefined;
}

/** Deduplicates local and remote activities */
function combineActivities() {
  var localMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var remoteMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var txHashes = _toConsumableArray__default["default"](new Set([].concat(_toConsumableArray__default["default"](Object.keys(localMap)), _toConsumableArray__default["default"](Object.keys(remoteMap)))));
  return txHashes.reduce(function (acc, hash) {
    var _localMap$hash, _remoteMap$hash;
    var localActivity = (_localMap$hash = localMap === null || localMap === void 0 ? void 0 : localMap[hash]) !== null && _localMap$hash !== void 0 ? _localMap$hash : {};
    var remoteActivity = (_remoteMap$hash = remoteMap === null || remoteMap === void 0 ? void 0 : remoteMap[hash]) !== null && _remoteMap$hash !== void 0 ? _remoteMap$hash : {};
    if (localActivity.cancelled) {
      // Hides misleading activities caused by cross-chain nonce collisions previously being incorrectly labelled as cancelled txs in redux
      if (localActivity.chainId !== remoteActivity.chainId) {
        acc.push(remoteActivity);
        return acc;
      }
      // Remote data only contains data of the cancel tx, rather than the original tx, so we prefer local data here
      acc.push(localActivity);
    } else {
      // Generally prefer remote values to local value because i.e. remote swap amounts are on-chain rather than client-estimated
      acc.push(_objectSpread(_objectSpread({}, localActivity), remoteActivity));
    }
    return acc;
  }, []);
}
function useAllActivities(account) {
  var _useFormatter = formatNumbers.useFormatter(),
    formatNumberOrString = _useFormatter.formatNumberOrString;
  var _useActivityQuery = typesAndHooks.useActivityQuery({
      variables: {
        account: account
      },
      errorPolicy: "all",
      fetchPolicy: "cache-first"
    }),
    data = _useActivityQuery.data,
    loading = _useActivityQuery.loading,
    refetch = _useActivityQuery.refetch;
  var localMap = parseLocal.useLocalActivities(account);
  var remoteMap = React.useMemo(function () {
    var _data$portfolios;
    return parseRemote.parseRemoteActivities(formatNumberOrString, data === null || data === void 0 || (_data$portfolios = data.portfolios) === null || _data$portfolios === void 0 ? void 0 : _data$portfolios[0].assetActivities);
  }, [data === null || data === void 0 ? void 0 : data.portfolios, formatNumberOrString]);
  var updateCancelledTx = hooks.useTransactionCanceller();

  /* Updates locally stored pendings tx's when remote data contains a conflicting cancellation tx */
  React.useEffect(function () {
    if (!remoteMap) return;
    Object.values(localMap).forEach(function (localActivity) {
      if (!localActivity) return;
      var cancelHash = findCancelTx(localActivity, remoteMap, account);
      if (cancelHash) updateCancelledTx(localActivity.hash, localActivity.chainId, cancelHash);
    });
  }, [account, localMap, remoteMap, updateCancelledTx]);
  var combinedActivities = React.useMemo(function () {
    return remoteMap ? combineActivities(localMap, remoteMap) : undefined;
  }, [localMap, remoteMap]);
  return {
    loading: loading,
    activities: combinedActivities,
    refetch: refetch
  };
}
function usePendingActivity() {
  var pendingTransactions = hooks.usePendingTransactions();
  var pendingOrders = hooks$1.usePendingOrders();
  var hasPendingActivity = pendingTransactions.length > 0 || pendingOrders.length > 0;
  var pendingActivityCount = pendingTransactions.length + pendingOrders.length;
  return {
    hasPendingActivity: hasPendingActivity,
    pendingActivityCount: pendingActivityCount
  };
}

exports.useAllActivities = useAllActivities;
exports.usePendingActivity = usePendingActivity;
