'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var analyticsEvents = require('@uniswap/analytics-events');
var index$1 = require('../../../../analytics/index.cjs');
var index$2 = require('../../../Column/index.cjs');
var AlertTriangleFilled = require('../../../Icons/AlertTriangleFilled.cjs');
var LoadingSpinner = require('../../../Icons/LoadingSpinner.cjs');
var index$3 = require('../../../Row/index.cjs');
var typesAndHooks = require('../../../../graphql/data/__generated__/types-and-hooks.cjs');
var useENSName = require('../../../../hooks/useENSName.cjs');
var styled = require('styled-components');
var index = require('../../../../theme/components/index.cjs');
var addresses = require('../../../../utils/addresses.cjs');
require('@ethersproject/constants');
require('@ethersproject/contracts');
var getExplorerLink = require('../../../../utils/getExplorerLink.cjs');
var PortfolioLogo = require('../PortfolioLogo.cjs');
var PortfolioRow = require('../PortfolioRow.cjs');
var OffchainActivityModal = require('./OffchainActivityModal.cjs');
var parseRemote = require('./parseRemote.cjs');
var text = require('../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var ActivityRowDescriptor = styled__default["default"](text.ThemedText.BodySmall)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, index.EllipsisStyle);
var StyledTimestamp = styled__default["default"](text.ThemedText.BodySmall)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  font-variant: small;\n  font-feature-settings: \"tnum\" on, \"lnum\" on, \"ss02\" on;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
});
function StatusIndicator(_ref3) {
  var _ref3$activity = _ref3.activity,
    status = _ref3$activity.status,
    timestamp = _ref3$activity.timestamp;
  var timeSince = parseRemote.useTimeSince(timestamp);
  switch (status) {
    case typesAndHooks.TransactionStatus.Pending:
      return /*#__PURE__*/React__default["default"].createElement(LoadingSpinner.LoaderV2, null);
    case typesAndHooks.TransactionStatus.Confirmed:
      return /*#__PURE__*/React__default["default"].createElement(StyledTimestamp, null, timeSince);
    case typesAndHooks.TransactionStatus.Failed:
      return /*#__PURE__*/React__default["default"].createElement(AlertTriangleFilled, null);
  }
}
function ActivityRow(_ref4) {
  var activity = _ref4.activity;
  var chainId = activity.chainId,
    title = activity.title,
    descriptor = activity.descriptor,
    logos = activity.logos,
    otherAccount = activity.otherAccount,
    currencies = activity.currencies,
    hash = activity.hash,
    prefixIconSrc = activity.prefixIconSrc,
    offchainOrderStatus = activity.offchainOrderStatus;
  var openOffchainActivityModal = OffchainActivityModal.useOpenOffchainActivityModal();
  var _useENSName = useENSName(otherAccount),
    ENSName = _useENSName.ENSName;
  var explorerUrl = getExplorerLink.getExplorerLink(chainId, hash, getExplorerLink.ExplorerDataType.TRANSACTION);
  var onClick = React.useCallback(function () {
    if (offchainOrderStatus) {
      openOffchainActivityModal({
        orderHash: hash,
        status: offchainOrderStatus
      });
      return;
    }
    window.open(getExplorerLink.getExplorerLink(chainId, hash, getExplorerLink.ExplorerDataType.TRANSACTION), "_blank");
  }, [offchainOrderStatus, chainId, hash, openOffchainActivityModal]);
  return /*#__PURE__*/React__default["default"].createElement(index$1.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.SharedEventName.ELEMENT_CLICKED,
    element: analyticsEvents.InterfaceElementName.MINI_PORTFOLIO_ACTIVITY_ROW,
    properties: {
      hash: hash,
      chain_id: chainId,
      explorer_url: explorerUrl
    }
  }, /*#__PURE__*/React__default["default"].createElement(PortfolioRow["default"], {
    left: /*#__PURE__*/React__default["default"].createElement(index$2.Column, null, /*#__PURE__*/React__default["default"].createElement(PortfolioLogo.PortfolioLogo, {
      chainId: chainId,
      currencies: currencies,
      images: logos,
      accountAddress: otherAccount
    })),
    title: /*#__PURE__*/React__default["default"].createElement(index$3["default"], {
      gap: "4px"
    }, prefixIconSrc && /*#__PURE__*/React__default["default"].createElement("img", {
      height: "14px",
      width: "14px",
      src: prefixIconSrc,
      alt: ""
    }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, title)),
    descriptor: /*#__PURE__*/React__default["default"].createElement(ActivityRowDescriptor, {
      color: "neutral2"
    }, descriptor, ENSName !== null && ENSName !== void 0 ? ENSName : addresses.shortenAddress(otherAccount)),
    right: /*#__PURE__*/React__default["default"].createElement(StatusIndicator, {
      activity: activity
    }),
    onClick: onClick
  }));
}

exports.ActivityRow = ActivityRow;
