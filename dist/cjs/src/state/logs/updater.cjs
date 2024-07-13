'use strict';

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var core = require('@web3-react/core');
var useBlockNumber = require('../../lib/hooks/useBlockNumber.cjs');
var React = require('react');
var hooks = require('../hooks.cjs');
var slice = require('./slice.cjs');
var utils = require('./utils.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function Updater() {
  var dispatch = hooks.useAppDispatch();
  var state = hooks.useAppSelector(function (state) {
    return state.logs;
  });
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId,
    provider = _useWeb3React.provider;
  var blockNumber = useBlockNumber["default"]();
  var filtersNeedFetch = React.useMemo(function () {
    if (!chainId || typeof blockNumber !== "number") return [];
    var active = state[chainId];
    if (!active) return [];
    return Object.keys(active).filter(function (key) {
      var _active$key = active[key],
        fetchingBlockNumber = _active$key.fetchingBlockNumber,
        results = _active$key.results,
        listeners = _active$key.listeners;
      if (listeners === 0) return false;
      if (typeof fetchingBlockNumber === "number" && fetchingBlockNumber >= blockNumber) return false;
      if (results && typeof results.blockNumber === "number" && results.blockNumber >= blockNumber) return false;
      // this condition ensures that if a log is historical, and it's already fetched, we don't re-fetch it
      if (utils.isHistoricalLog(utils.keyToFilter(key), blockNumber) && (results === null || results === void 0 ? void 0 : results.logs) !== undefined) return false;
      return true;
    }).map(function (key) {
      return utils.keyToFilter(key);
    });
  }, [blockNumber, chainId, state]);
  React.useEffect(function () {
    if (!provider || !chainId || typeof blockNumber !== "number" || filtersNeedFetch.length === 0) return;
    dispatch(slice.fetchingLogs({
      chainId: chainId,
      filters: filtersNeedFetch,
      blockNumber: blockNumber
    }));
    filtersNeedFetch.forEach(function (filter) {
      var _filter$fromBlock, _filter$toBlock;
      // provide defaults if {from,to}Block are missing
      var fromBlock = (_filter$fromBlock = filter.fromBlock) !== null && _filter$fromBlock !== void 0 ? _filter$fromBlock : 0;
      var toBlock = (_filter$toBlock = filter.toBlock) !== null && _filter$toBlock !== void 0 ? _filter$toBlock : blockNumber;
      if (typeof fromBlock === "string") fromBlock = Number.parseInt(fromBlock);
      if (typeof toBlock === "string") toBlock = Number.parseInt(toBlock);
      provider.getLogs(_objectSpread(_objectSpread({}, filter), {}, {
        fromBlock: fromBlock,
        toBlock: toBlock
      })).then(function (logs) {
        dispatch(slice.fetchedLogs({
          chainId: chainId,
          filter: filter,
          results: {
            logs: logs,
            blockNumber: blockNumber
          }
        }));
      })["catch"](function (error) {
        console.error("Failed to get logs", filter, error);
        dispatch(slice.fetchedLogsError({
          chainId: chainId,
          filter: filter,
          blockNumber: blockNumber
        }));
      });
    });
  }, [blockNumber, chainId, dispatch, filtersNeedFetch, provider]);
  return null;
}

module.exports = Updater;
