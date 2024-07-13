'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var index$8 = require('../../../analytics/index.cjs');
var index = require('../../Column/index.cjs');
var LoadingSpinner = require('../../Icons/LoadingSpinner.cjs');
var index$2 = require('../../Row/index.cjs');
var useDisableNFTRoutes = require('../../../hooks/useDisableNFTRoutes.cjs');
var styled = require('styled-components');
var index$1 = require('../../../theme/index.cjs');
require('../../../theme/components/index.cjs');
var index$7 = require('./Activity/index.cjs');
var hooks = require('./Activity/hooks.cjs');
var index$5 = require('./NFTs/index.cjs');
var index$6 = require('./Pools/index.cjs');
var PortfolioRow = require('./PortfolioRow.cjs');
var index$4 = require('./Tokens/index.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var Wrapper = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  margin-top: 28px;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  gap: 12px;\n\n  @media screen and (max-width: ", "px) {\n    margin-bottom: 48px;\n  }\n\n  ", " {\n    &:hover {\n      background: ", ";\n    }\n  }\n"])), index$1.BREAKPOINTS.sm, PortfolioRow.PortfolioRowWrapper, function (_ref) {
  var theme = _ref.theme;
  return theme.deprecated_hoverDefault;
});
var Nav = styled__default["default"](index$2.AutoRow)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  gap: 20px;\n"])));
var NavItem = styled__default["default"](text.ThemedText.SubHeader)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  color: ", ";\n  cursor: pointer;\n  display: flex;\n  justify-content: space-between;\n  transition: ", ";\n\n  &:hover {\n    ", ";\n  }\n"])), function (_ref2) {
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
var PageWrapper = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 12px;\n  margin-right: -16px;\n  margin-left: -16px;\n  width: calc(100% + 32px);\n  flex: 1;\n"])));
var Pages = [{
  title: /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "6RDwJM",
    message: "Tokens"
  }),
  key: "tokens",
  component: index$4,
  loggingElementName: analyticsEvents.InterfaceElementName.MINI_PORTFOLIO_TOKENS_TAB
}, {
  title: /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "8Dh77Z",
    message: "NFTs"
  }),
  key: "nfts",
  component: index$5,
  loggingElementName: analyticsEvents.InterfaceElementName.MINI_PORTFOLIO_NFT_TAB
}, {
  title: /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "lQfOr9",
    message: "Pools"
  }),
  key: "pools",
  component: index$6,
  loggingElementName: analyticsEvents.InterfaceElementName.MINI_PORTFOLIO_POOLS_TAB
}, {
  title: /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "XJOV1Y",
    message: "Activity"
  }),
  key: "activity",
  component: index$7.ActivityTab,
  loggingElementName: analyticsEvents.InterfaceElementName.MINI_PORTFOLIO_ACTIVITY_TAB
}];
function MiniPortfolio(_ref5) {
  var account = _ref5.account;
  var theme = styled.useTheme();
  var _useState = React.useState(0),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    currentPage = _useState2[0],
    setCurrentPage = _useState2[1];
  var shouldDisableNFTRoutes = useDisableNFTRoutes.useDisableNFTRoutes();
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    activityUnread = _useState4[0],
    setActivityUnread = _useState4[1];
  var _Pages$currentPage = Pages[currentPage],
    Page = _Pages$currentPage.component,
    currentKey = _Pages$currentPage.key;
  var _usePendingActivity = hooks.usePendingActivity(),
    hasPendingActivity = _usePendingActivity.hasPendingActivity;
  React.useEffect(function () {
    if (hasPendingActivity && currentKey !== "activity") setActivityUnread(true);
  }, [currentKey, hasPendingActivity]);
  return /*#__PURE__*/React__default["default"].createElement(index$8.Trace, {
    section: analyticsEvents.InterfaceSectionName.MINI_PORTFOLIO
  }, /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(Nav, {
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
    return /*#__PURE__*/React__default["default"].createElement(index$8.TraceEvent, {
      events: [analyticsEvents.BrowserEvent.onClick],
      name: analyticsEvents.SharedEventName.NAVBAR_CLICKED,
      element: loggingElementName,
      key: index
    }, /*#__PURE__*/React__default["default"].createElement(NavItem, {
      onClick: handleNavItemClick,
      active: currentPage === index,
      key: key
    }, /*#__PURE__*/React__default["default"].createElement("span", null, title), showActivityIndicator && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, "\xA0", hasPendingActivity ? /*#__PURE__*/React__default["default"].createElement(LoadingSpinner.LoaderV2, null) : /*#__PURE__*/React__default["default"].createElement("svg", {
      width: "8",
      height: "8",
      viewBox: "0 0 8 8",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg"
    }, /*#__PURE__*/React__default["default"].createElement("circle", {
      cx: "4",
      cy: "4",
      r: "4",
      fill: theme.accent1
    })))));
  })), /*#__PURE__*/React__default["default"].createElement(PageWrapper, {
    "data-testid": "mini-portfolio-page"
  }, /*#__PURE__*/React__default["default"].createElement(Page, {
    account: account
  }))));
}

module.exports = MiniPortfolio;
