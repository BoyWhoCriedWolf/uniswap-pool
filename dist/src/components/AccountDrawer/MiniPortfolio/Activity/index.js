import React__default, { useEffect, useMemo } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { useAccountDrawer } from '../../index.js';
import { Column } from '../../../Column/index.js';
import { LoadingBubble } from '../../../Tokens/loading.js';
import { PollingInterval } from '../../../../graphql/data/util.js';
import { atom, useAtom } from 'jotai';
import { EmptyWalletModule } from '../../../../nft/components/profile/view/EmptyWalletContent.js';
import styled from 'styled-components';
import '../../../../theme/components/index.js';
import { PortfolioSkeleton, PortfolioTabWrapper } from '../PortfolioRow.js';
import { ActivityRow } from './ActivityRow.js';
import { useAllActivities } from './hooks.js';
import { createGroups } from './utils.js';
import { ThemedText } from '../../../../theme/components/text.js';

var _templateObject;
var ActivityGroupWrapper = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin-top: 16px;\n  gap: 8px;\n"])));
var lastFetchedAtom = atom(0);
function ActivityTab(_ref) {
  var account = _ref.account,
    onOpen = _ref.onOpen;
  var _useAccountDrawer = useAccountDrawer(),
    _useAccountDrawer2 = _slicedToArray(_useAccountDrawer, 2),
    drawerOpen = _useAccountDrawer2[0],
    toggleWalletDrawer = _useAccountDrawer2[1];
  var _useAtom = useAtom(lastFetchedAtom),
    _useAtom2 = _slicedToArray(_useAtom, 2),
    lastFetched = _useAtom2[0],
    setLastFetched = _useAtom2[1];
  var _useAllActivities = useAllActivities(account),
    activities = _useAllActivities.activities,
    loading = _useAllActivities.loading,
    refetch = _useAllActivities.refetch;

  // We only refetch remote activity if the user renavigates to the activity tab by changing tabs or opening the drawer
  useEffect(function () {
    var currentTime = Date.now();
    if (!lastFetched) {
      setLastFetched(currentTime);
    } else if (drawerOpen && lastFetched && currentTime - lastFetched > PollingInterval.Slow) {
      refetch();
      setLastFetched(currentTime);
    }
  }, [drawerOpen, lastFetched, refetch, setLastFetched]);
  var activityGroups = useMemo(function () {
    return createGroups(activities);
  }, [activities]);
  if (!activityGroups && loading) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(LoadingBubble, {
      height: "16px",
      width: "80px",
      margin: "16px 16px 8px"
    }), /*#__PURE__*/React__default.createElement(PortfolioSkeleton, {
      shrinkRight: true
    }));
  } else if (!activityGroups || (activityGroups === null || activityGroups === void 0 ? void 0 : activityGroups.length) === 0) {
    return /*#__PURE__*/React__default.createElement(EmptyWalletModule, {
      type: "activity",
      onNavigateClick: toggleWalletDrawer,
      onOpen: onOpen
    });
  } else {
    return /*#__PURE__*/React__default.createElement(PortfolioTabWrapper, null, activityGroups.map(function (activityGroup) {
      return /*#__PURE__*/React__default.createElement(ActivityGroupWrapper, {
        key: activityGroup.title
      }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, {
        color: "neutral2",
        marginLeft: "16px"
      }, activityGroup.title), /*#__PURE__*/React__default.createElement(Column, {
        "data-testid": "activity-content"
      }, activityGroup.transactions.map(function (activity) {
        return /*#__PURE__*/React__default.createElement(ActivityRow, {
          key: activity.hash,
          activity: activity
        });
      })));
    }));
  }
}

export { ActivityTab };
