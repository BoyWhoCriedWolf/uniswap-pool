'use strict';

var tokenLists = require('@uniswap/token-lists');
var core = require('@web3-react/core');
var lists = require('../../constants/lists.cjs');
var tokenSafetyLookup = require('../../constants/tokenSafetyLookup.cjs');
var useStateRehydrated = require('../../hooks/useStateRehydrated.cjs');
var useInterval = require('../../lib/hooks/useInterval.cjs');
var ms = require('ms');
var React = require('react');
var hooks = require('../hooks.cjs');
var hooks$1 = require('./hooks.cjs');
var useFetchListCallback = require('../../hooks/useFetchListCallback.cjs');
var useIsWindowVisible = require('../../hooks/useIsWindowVisible.cjs');
var actions = require('./actions.cjs');
var utils = require('./utils.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

function Updater() {
  var _useWeb3React = core.useWeb3React(),
    provider = _useWeb3React.provider;
  var dispatch = hooks.useAppDispatch();
  var isWindowVisible = useIsWindowVisible();

  // get all loaded lists, and the active urls
  var lists$1 = hooks$1.useAllLists();
  var listsState = hooks.useAppSelector(function (state) {
    return state.lists;
  });
  var rehydrated = useStateRehydrated.useStateRehydrated();
  React.useEffect(function () {
    if (rehydrated) tokenSafetyLookup["default"].update(listsState);
  }, [listsState, rehydrated]);
  var fetchList = useFetchListCallback.useFetchListCallback();
  var fetchAllListsCallback = React.useCallback(function () {
    if (!isWindowVisible) return;
    lists.DEFAULT_LIST_OF_LISTS.forEach(function (url) {
      // Skip validation on unsupported lists
      var isUnsupportedList = lists.UNSUPPORTED_LIST_URLS.includes(url);
      fetchList(url, isUnsupportedList)["catch"](function (error) {
        return console.debug("interval list fetching error", error);
      });
    });
  }, [fetchList, isWindowVisible]);

  // fetch all lists every 10 minutes, but only after we initialize provider
  useInterval(fetchAllListsCallback, provider ? ms__default["default"]("10m") : null);
  React.useEffect(function () {
    if (!rehydrated) return; // loaded lists will not be available until state is rehydrated

    // whenever a list is not loaded and not loading, try again to load it
    Object.keys(lists$1).forEach(function (listUrl) {
      var list = lists$1[listUrl];
      if (!list.current && !list.loadingRequestId && !list.error) {
        fetchList(listUrl)["catch"](function (error) {
          return console.debug("list added fetching error", error);
        });
      }
    });
    lists.UNSUPPORTED_LIST_URLS.forEach(function (listUrl) {
      var list = lists$1[listUrl];
      if (!list || !list.current && !list.loadingRequestId && !list.error) {
        fetchList(listUrl, /* isUnsupportedList= */true)["catch"](function (error) {
          return console.debug("list added fetching error", error);
        });
      }
    });
  }, [dispatch, fetchList, lists$1, rehydrated]);

  // automatically update lists if versions are minor/patch
  React.useEffect(function () {
    Object.keys(lists$1).forEach(function (listUrl) {
      var list = lists$1[listUrl];
      if (list.current && list.pendingUpdate) {
        var bump = tokenLists.getVersionUpgrade(list.current.version, list.pendingUpdate.version);
        switch (bump) {
          case tokenLists.VersionUpgrade.NONE:
            throw new Error("unexpected no version bump");
          case tokenLists.VersionUpgrade.PATCH:
          case tokenLists.VersionUpgrade.MINOR:
            {
              if (utils.shouldAcceptVersionUpdate(listUrl, list.current, list.pendingUpdate, bump)) {
                dispatch(actions.acceptListUpdate(listUrl));
              }
              break;
            }
          // update any active or inactive lists
          case tokenLists.VersionUpgrade.MAJOR:
            dispatch(actions.acceptListUpdate(listUrl));
        }
      }
    });
  }, [dispatch, lists$1]);
  return null;
}

module.exports = Updater;
