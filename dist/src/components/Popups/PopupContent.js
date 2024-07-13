import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useOpenOffchainActivityModal } from '../AccountDrawer/MiniPortfolio/Activity/OffchainActivityModal.js';
import { transactionToActivity, signatureToActivity } from '../AccountDrawer/MiniPortfolio/Activity/parseLocal.js';
import { PortfolioLogo } from '../AccountDrawer/MiniPortfolio/PortfolioLogo.js';
import PortfolioRow from '../AccountDrawer/MiniPortfolio/PortfolioRow.js';
import { AutoColumn, Column } from '../Column/index.js';
import AlertTriangleFilled from '../Icons/AlertTriangleFilled.js';
import { AutoRow } from '../Row/index.js';
import { getChainInfo } from '../../constants/chainInfo.js';
import { TransactionStatus } from '../../graphql/data/__generated__/types-and-hooks.js';
import { useAllTokensMultichain } from '../../hooks/Tokens.js';
import useENSName from '../../hooks/useENSName.js';
import { X } from 'react-feather';
import { useOrder } from '../../state/signatures/hooks.js';
import { useTransaction } from '../../state/transactions/hooks.js';
import styled from 'styled-components';
import { EllipsisStyle } from '../../theme/components/index.js';
import { useFormatter } from '../../utils/formatNumbers.js';
import { getExplorerLink, ExplorerDataType } from '../../utils/getExplorerLink.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var StyledClose = styled(X)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  right: ", ";\n  top: ", ";\n  color: ", ";\n\n  :hover {\n    cursor: pointer;\n  }\n"])), function (_ref) {
  var $padding = _ref.$padding;
  return "".concat($padding, "px");
}, function (_ref2) {
  var $padding = _ref2.$padding;
  return "".concat($padding, "px");
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
});
var PopupContainer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: 100%;\n  background-color: ", ";\n  position: relative;\n  border: 1px solid ", ";\n  border-radius: 16px;\n  overflow: hidden;\n  box-shadow: ", ";\n  transition: ", ";\n\n  padding: ", ";\n\n  ", "\n"])), function (_ref4) {
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
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  min-width: 290px;\n  &:not(:last-of-type) {\n    margin-right: 20px;\n  }\n"])));
});
var RowNoFlex = styled(AutoRow)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  flex-wrap: nowrap;\n"])));
var ColumnContainer = styled(AutoColumn)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  margin: 0 12px;\n"])));
var PopupAlertTriangle = styled(AlertTriangleFilled)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  flex-shrink: 0;\n  width: 32px;\n  height: 32px;\n"])));
function FailedNetworkSwitchPopup(_ref10) {
  var chainId = _ref10.chainId,
    onClose = _ref10.onClose;
  var chainInfo = getChainInfo(chainId);
  return /*#__PURE__*/React__default.createElement(PopupContainer, {
    padded: true
  }, /*#__PURE__*/React__default.createElement(StyledClose, {
    $padding: 20,
    onClick: onClose
  }), /*#__PURE__*/React__default.createElement(RowNoFlex, {
    gap: "12px"
  }, /*#__PURE__*/React__default.createElement(PopupAlertTriangle, null), /*#__PURE__*/React__default.createElement(ColumnContainer, {
    gap: "sm"
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, {
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "HV8AwX",
    message: "Failed to switch networks"
  })), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "qwMRCz",
    message: "To use Uniswap on {0}, switch the network in your wallet\u2019s settings.",
    values: {
      "0": chainInfo.label
    }
  })))));
}
var Descriptor = styled(ThemedText.BodySmall)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  ", "\n"])), EllipsisStyle);
function ActivityPopupContent(_ref11) {
  var activity = _ref11.activity,
    onClick = _ref11.onClick,
    onClose = _ref11.onClose;
  var success = activity.status === TransactionStatus.Confirmed && !activity.cancelled;
  var _useENSName = useENSName(activity === null || activity === void 0 ? void 0 : activity.otherAccount),
    ENSName = _useENSName.ENSName;
  return /*#__PURE__*/React__default.createElement(PopupContainer, null, /*#__PURE__*/React__default.createElement(StyledClose, {
    $padding: 16,
    onClick: onClose
  }), /*#__PURE__*/React__default.createElement(PortfolioRow, {
    left: success ? /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(PortfolioLogo, {
      chainId: activity.chainId,
      currencies: activity.currencies,
      images: activity.logos,
      accountAddress: activity.otherAccount
    })) : /*#__PURE__*/React__default.createElement(PopupAlertTriangle, null),
    title: /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, activity.title),
    descriptor: /*#__PURE__*/React__default.createElement(Descriptor, {
      color: "neutral2"
    }, activity.descriptor, ENSName !== null && ENSName !== void 0 ? ENSName : activity.otherAccount),
    onClick: onClick
  }));
}
function TransactionPopupContent(_ref12) {
  var chainId = _ref12.chainId,
    hash = _ref12.hash,
    onClose = _ref12.onClose;
  var transaction = useTransaction(hash);
  var tokens = useAllTokensMultichain();
  var _useFormatter = useFormatter(),
    formatNumber = _useFormatter.formatNumber;
  if (!transaction) return null;
  var activity = transactionToActivity(transaction, chainId, tokens, formatNumber);
  if (!activity) return null;
  var onClick = function onClick() {
    return window.open(getExplorerLink(activity.chainId, activity.hash, ExplorerDataType.TRANSACTION), "_blank");
  };
  return /*#__PURE__*/React__default.createElement(ActivityPopupContent, {
    activity: activity,
    onClose: onClose,
    onClick: onClick
  });
}
function UniswapXOrderPopupContent(_ref13) {
  var orderHash = _ref13.orderHash,
    onClose = _ref13.onClose;
  var order = useOrder(orderHash);
  var tokens = useAllTokensMultichain();
  var openOffchainActivityModal = useOpenOffchainActivityModal();
  var _useFormatter2 = useFormatter(),
    formatNumber = _useFormatter2.formatNumber;
  if (!order) return null;
  var activity = signatureToActivity(order, tokens, formatNumber);
  if (!activity) return null;
  var onClick = function onClick() {
    return openOffchainActivityModal({
      orderHash: orderHash,
      status: order.status
    });
  };
  return /*#__PURE__*/React__default.createElement(ActivityPopupContent, {
    activity: activity,
    onClose: onClose,
    onClick: onClick
  });
}

export { FailedNetworkSwitchPopup, TransactionPopupContent, UniswapXOrderPopupContent };
