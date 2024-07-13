'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../../index.cjs');
var index = require('../../../Column/index.cjs');
var loading = require('../../../Tokens/loading.cjs');
var util = require('../../../../graphql/data/util.cjs');
var jotai = require('jotai');
var EmptyWalletContent = require('../../../../nft/components/profile/view/EmptyWalletContent.cjs');
var styled = require('styled-components');
require('../../../../theme/components/index.cjs');
var PortfolioRow = require('../PortfolioRow.cjs');
var ActivityRow = require('./ActivityRow.cjs');
var hooks = require('./hooks.cjs');
var utils = require('./utils.cjs');
var text = require('../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var ActivityGroupWrapper = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  margin-top: 16px;\n  gap: 8px;\n"])));
var lastFetchedAtom = jotai.atom(0);
function ActivityTab(_ref) {
  var account = _ref.account,
    onOpen = _ref.onOpen;
  var _useAccountDrawer = index$1.useAccountDrawer(),
    _useAccountDrawer2 = _slicedToArray__default["default"](_useAccountDrawer, 2),
    drawerOpen = _useAccountDrawer2[0],
    toggleWalletDrawer = _useAccountDrawer2[1];
  var _useAtom = jotai.useAtom(lastFetchedAtom),
    _useAtom2 = _slicedToArray__default["default"](_useAtom, 2),
    lastFetched = _useAtom2[0],
    setLastFetched = _useAtom2[1];
  var _useAllActivities = hooks.useAllActivities(account),
    activities = _useAllActivities.activities,
    loading$1 = _useAllActivities.loading,
    refetch = _useAllActivities.refetch;

  // We only refetch remote activity if the user renavigates to the activity tab by changing tabs or opening the drawer
  React.useEffect(function () {
    var currentTime = Date.now();
    if (!lastFetched) {
      setLastFetched(currentTime);
    } else if (drawerOpen && lastFetched && currentTime - lastFetched > util.PollingInterval.Slow) {
      refetch();
      setLastFetched(currentTime);
    }
  }, [drawerOpen, lastFetched, refetch, setLastFetched]);
  var activityGroups = React.useMemo(function () {
    return utils.createGroups(activities);
  }, [activities]);
  if (!activityGroups && loading$1) {
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(loading.LoadingBubble, {
      height: "16px",
      width: "80px",
      margin: "16px 16px 8px"
    }), /*#__PURE__*/React__default["default"].createElement(PortfolioRow.PortfolioSkeleton, {
      shrinkRight: true
    }));
  } else if (!activityGroups || (activityGroups === null || activityGroups === void 0 ? void 0 : activityGroups.length) === 0) {
    return /*#__PURE__*/React__default["default"].createElement(EmptyWalletContent.EmptyWalletModule, {
      type: "activity",
      onNavigateClick: toggleWalletDrawer,
      onOpen: onOpen
    });
  } else {
    return /*#__PURE__*/React__default["default"].createElement(PortfolioRow.PortfolioTabWrapper, null, activityGroups.map(function (activityGroup) {
      return /*#__PURE__*/React__default["default"].createElement(ActivityGroupWrapper, {
        key: activityGroup.title
      }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, {
        color: "neutral2",
        marginLeft: "16px"
      }, activityGroup.title), /*#__PURE__*/React__default["default"].createElement(index.Column, {
        "data-testid": "activity-content"
      }, activityGroup.transactions.map(function (activity) {
        return /*#__PURE__*/React__default["default"].createElement(ActivityRow.ActivityRow, {
          key: activity.hash,
          activity: activity
        });
      })));
    }));
  }
}

exports.ActivityTab = ActivityTab;
