import React__default, { useState, useEffect } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { InterfaceElementName, InterfaceSectionName, BrowserEvent, SharedEventName } from '@uniswap/analytics-events';
import { Trace, TraceEvent } from '../../../analytics/index.js';
import { Column } from '../../Column/index.js';
import { LoaderV2 } from '../../Icons/LoadingSpinner.js';
import { AutoRow } from '../../Row/index.js';
import { useDisableNFTRoutes } from '../../../hooks/useDisableNFTRoutes.js';
import styled, { useTheme } from 'styled-components';
import { BREAKPOINTS } from '../../../theme/index.js';
import '../../../theme/components/index.js';
import { ActivityTab } from './Activity/index.js';
import { usePendingActivity } from './Activity/hooks.js';
import NFTs from './NFTs/index.js';
import Pools from './Pools/index.js';
import { PortfolioRowWrapper } from './PortfolioRow.js';
import Tokens from './Tokens/index.js';
import { ThemedText } from '../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var Wrapper = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  margin-top: 28px;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  gap: 12px;\n\n  @media screen and (max-width: ", "px) {\n    margin-bottom: 48px;\n  }\n\n  ", " {\n    &:hover {\n      background: ", ";\n    }\n  }\n"])), BREAKPOINTS.sm, PortfolioRowWrapper, function (_ref) {
  var theme = _ref.theme;
  return theme.deprecated_hoverDefault;
});
var Nav = styled(AutoRow)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  gap: 20px;\n"])));
var NavItem = styled(ThemedText.SubHeader)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  align-items: center;\n  color: ", ";\n  cursor: pointer;\n  display: flex;\n  justify-content: space-between;\n  transition: ", ";\n\n  &:hover {\n    ", ";\n  }\n"])), function (_ref2) {
  var theme = _ref2.theme,
    active = _ref2.active;
  return active ? theme.neutral1 : theme.neutral2;
}, function (_ref3) {
  var theme = _ref3.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.ease, " color");
}, function (_ref4) {
  var theme = _ref4.theme,
    active = _ref4.active;
  return !active && "color: ".concat(theme.neutral2);
});
var PageWrapper = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  border-radius: 12px;\n  margin-right: -16px;\n  margin-left: -16px;\n  width: calc(100% + 32px);\n  flex: 1;\n"])));
var Pages = [{
  title: /*#__PURE__*/React__default.createElement(Trans, {
    id: "6RDwJM",
    message: "Tokens"
  }),
  key: "tokens",
  component: Tokens,
  loggingElementName: InterfaceElementName.MINI_PORTFOLIO_TOKENS_TAB
}, {
  title: /*#__PURE__*/React__default.createElement(Trans, {
    id: "8Dh77Z",
    message: "NFTs"
  }),
  key: "nfts",
  component: NFTs,
  loggingElementName: InterfaceElementName.MINI_PORTFOLIO_NFT_TAB
}, {
  title: /*#__PURE__*/React__default.createElement(Trans, {
    id: "lQfOr9",
    message: "Pools"
  }),
  key: "pools",
  component: Pools,
  loggingElementName: InterfaceElementName.MINI_PORTFOLIO_POOLS_TAB
}, {
  title: /*#__PURE__*/React__default.createElement(Trans, {
    id: "XJOV1Y",
    message: "Activity"
  }),
  key: "activity",
  component: ActivityTab,
  loggingElementName: InterfaceElementName.MINI_PORTFOLIO_ACTIVITY_TAB
}];
function MiniPortfolio(_ref5) {
  var account = _ref5.account;
  var theme = useTheme();
  var _useState = useState(0),
    _useState2 = _slicedToArray(_useState, 2),
    currentPage = _useState2[0],
    setCurrentPage = _useState2[1];
  var shouldDisableNFTRoutes = useDisableNFTRoutes();
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    activityUnread = _useState4[0],
    setActivityUnread = _useState4[1];
  var _Pages$currentPage = Pages[currentPage],
    Page = _Pages$currentPage.component,
    currentKey = _Pages$currentPage.key;
  var _usePendingActivity = usePendingActivity(),
    hasPendingActivity = _usePendingActivity.hasPendingActivity;
  useEffect(function () {
    if (hasPendingActivity && currentKey !== "activity") setActivityUnread(true);
  }, [currentKey, hasPendingActivity]);
  return /*#__PURE__*/React__default.createElement(Trace, {
    section: InterfaceSectionName.MINI_PORTFOLIO
  }, /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement(Nav, {
    "data-testid": "mini-portfolio-navbar"
  }, Pages.map(function (_ref6, index) {
    var title = _ref6.title,
      loggingElementName = _ref6.loggingElementName,
      key = _ref6.key;
    if (shouldDisableNFTRoutes && loggingElementName.includes("nft")) return null;
    var isUnselectedActivity = key === "activity" && currentKey !== "activity";
    var showActivityIndicator = isUnselectedActivity && (hasPendingActivity || activityUnread);
    var handleNavItemClick = function handleNavItemClick() {
      setCurrentPage(index);
      if (key === "activity") setActivityUnread(false);
    };
    return /*#__PURE__*/React__default.createElement(TraceEvent, {
      events: [BrowserEvent.onClick],
      name: SharedEventName.NAVBAR_CLICKED,
      element: loggingElementName,
      key: index
    }, /*#__PURE__*/React__default.createElement(NavItem, {
      onClick: handleNavItemClick,
      active: currentPage === index,
      key: key
    }, /*#__PURE__*/React__default.createElement("span", null, title), showActivityIndicator && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, "\xA0", hasPendingActivity ? /*#__PURE__*/React__default.createElement(LoaderV2, null) : /*#__PURE__*/React__default.createElement("svg", {
      width: "8",
      height: "8",
      viewBox: "0 0 8 8",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React__default.createElement("circle", {
      cx: "4",
      cy: "4",
      r: "4",
      fill: theme.accent1
    })))));
  })), /*#__PURE__*/React__default.createElement(PageWrapper, {
    "data-testid": "mini-portfolio-page"
  }, /*#__PURE__*/React__default.createElement(Page, {
    account: account
  }))));
}

export { MiniPortfolio as default };
