'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var OffchainActivityModal = require('../AccountDrawer/MiniPortfolio/Activity/OffchainActivityModal.cjs');
var parseLocal = require('../AccountDrawer/MiniPortfolio/Activity/parseLocal.cjs');
var PortfolioLogo = require('../AccountDrawer/MiniPortfolio/PortfolioLogo.cjs');
var PortfolioRow = require('../AccountDrawer/MiniPortfolio/PortfolioRow.cjs');
var index$1 = require('../Column/index.cjs');
var AlertTriangleFilled = require('../Icons/AlertTriangleFilled.cjs');
var index = require('../Row/index.cjs');
var chainInfo = require('../../constants/chainInfo.cjs');
var typesAndHooks = require('../../graphql/data/__generated__/types-and-hooks.cjs');
var Tokens = require('../../hooks/Tokens.cjs');
var useENSName = require('../../hooks/useENSName.cjs');
var reactFeather = require('react-feather');
var hooks$1 = require('../../state/signatures/hooks.cjs');
var hooks = require('../../state/transactions/hooks.cjs');
var styled = require('styled-components');
var index$3 = require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var getExplorerLink = require('../../utils/getExplorerLink.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var StyledClose = styled__default["default"](reactFeather.X)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  right: ", ";\n  top: ", ";\n  color: ", ";\n\n  :hover {\n    cursor: pointer;\n  }\n"])), function (_ref) {
  var $padding = _ref.$padding;
  return "".concat($padding, "px");
}, function (_ref2) {
  var $padding = _ref2.$padding;
  return "".concat($padding, "px");
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
});
var PopupContainer = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  display: inline-block;\n  width: 100%;\n  background-color: ", ";\n  position: relative;\n  border: 1px solid ", ";\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: ", ";\n  transition: ", ";\n\n  padding: ", ";\n\n  ", "\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface1;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface3;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.deprecated_deepShadow;
}, function (_ref7) {
  var theme = _ref7.theme;
  return "visibility ".concat(theme.transition.duration.fast, " ease-in-out");
}, function (_ref8) {
  var padded = _ref8.padded;
  return padded ? "20px 35px 20px 20px" : "2px 0px";
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  min-width: 290px;\n  &:not(:last-of-type) {\n    margin-right: 20px;\n  }\n"])));
});
var RowNoFlex = styled__default["default"](index.AutoRow)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  flex-wrap: nowrap;\n"])));
var ColumnContainer = styled__default["default"](index$1.AutoColumn)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  margin: 0 12px;\n"])));
var PopupAlertTriangle = styled__default["default"](AlertTriangleFilled)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  flex-shrink: 0;\n  width: 32px;\n  height: 32px;\n"])));
function FailedNetworkSwitchPopup(_ref10) {
  var chainId = _ref10.chainId,
    onClose = _ref10.onClose;
  var chainInfo$1 = chainInfo.getChainInfo(chainId);
  return /*#__PURE__*/React__default["default"].createElement(PopupContainer, {
    padded: true
  }, /*#__PURE__*/React__default["default"].createElement(StyledClose, {
    $padding: 20,
    onClick: onClose
  }), /*#__PURE__*/React__default["default"].createElement(RowNoFlex, {
    gap: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(PopupAlertTriangle, null), /*#__PURE__*/React__default["default"].createElement(ColumnContainer, {
    gap: "sm"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, {
    color: "neutral2"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "HV8AwX",
    message: "Failed to switch networks"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "qwMRCz",
    message: "To use Uniswap on {0}, switch the network in your wallet\u2019s settings.",
    values: {
      "0": chainInfo$1.label
    }
  })))));
}
var Descriptor = styled__default["default"](text.ThemedText.BodySmall)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), index$3.EllipsisStyle);
function ActivityPopupContent(_ref11) {
  var activity = _ref11.activity,
    onClick = _ref11.onClick,
    onClose = _ref11.onClose;
  var success = activity.status === typesAndHooks.TransactionStatus.Confirmed && !activity.cancelled;
  var _useENSName = useENSName(activity === null || activity === void 0 ? void 0 : activity.otherAccount),
    ENSName = _useENSName.ENSName;
  return /*#__PURE__*/React__default["default"].createElement(PopupContainer, null, /*#__PURE__*/React__default["default"].createElement(StyledClose, {
    $padding: 16,
    onClick: onClose
  }), /*#__PURE__*/React__default["default"].createElement(PortfolioRow["default"], {
    left: success ? /*#__PURE__*/React__default["default"].createElement(index$1.Column, null, /*#__PURE__*/React__default["default"].createElement(PortfolioLogo.PortfolioLogo, {
      chainId: activity.chainId,
      currencies: activity.currencies,
      images: activity.logos,
      accountAddress: activity.otherAccount
    })) : /*#__PURE__*/React__default["default"].createElement(PopupAlertTriangle, null),
    title: /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, activity.title),
    descriptor: /*#__PURE__*/React__default["default"].createElement(Descriptor, {
      color: "neutral2"
    }, activity.descriptor, ENSName !== null && ENSName !== void 0 ? ENSName : activity.otherAccount),
    onClick: onClick
  }));
}
function TransactionPopupContent(_ref12) {
  var chainId = _ref12.chainId,
    hash = _ref12.hash,
    onClose = _ref12.onClose;
  var transaction = hooks.useTransaction(hash);
  var tokens = Tokens.useAllTokensMultichain();
  var _useFormatter = formatNumbers.useFormatter(),
    formatNumber = _useFormatter.formatNumber;
  if (!transaction) return null;
  var activity = parseLocal.transactionToActivity(transaction, chainId, tokens, formatNumber);
  if (!activity) return null;
  var onClick = function onClick() {
    return window.open(getExplorerLink.getExplorerLink(activity.chainId, activity.hash, getExplorerLink.ExplorerDataType.TRANSACTION), "_blank");
  };
  return /*#__PURE__*/React__default["default"].createElement(ActivityPopupContent, {
    activity: activity,
    onClose: onClose,
    onClick: onClick
  });
}
function UniswapXOrderPopupContent(_ref13) {
  var orderHash = _ref13.orderHash,
    onClose = _ref13.onClose;
  var order = hooks$1.useOrder(orderHash);
  var tokens = Tokens.useAllTokensMultichain();
  var openOffchainActivityModal = OffchainActivityModal.useOpenOffchainActivityModal();
  var _useFormatter2 = formatNumbers.useFormatter(),
    formatNumber = _useFormatter2.formatNumber;
  if (!order) return null;
  var activity = parseLocal.signatureToActivity(order, tokens, formatNumber);
  if (!activity) return null;
  var onClick = function onClick() {
    return openOffchainActivityModal({
      orderHash: orderHash,
      status: order.status
    });
  };
  return /*#__PURE__*/React__default["default"].createElement(ActivityPopupContent, {
    activity: activity,
    onClose: onClose,
    onClick: onClick
  });
}

exports.FailedNetworkSwitchPopup = FailedNetworkSwitchPopup;
exports.TransactionPopupContent = TransactionPopupContent;
exports.UniswapXOrderPopupContent = UniswapXOrderPopupContent;
