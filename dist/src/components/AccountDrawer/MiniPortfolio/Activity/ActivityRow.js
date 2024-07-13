import React__default, { useCallback } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { BrowserEvent, SharedEventName, InterfaceElementName } from '@uniswap/analytics-events';
import { TraceEvent } from '../../../../analytics/index.js';
import { Column } from '../../../Column/index.js';
import AlertTriangleFilled from '../../../Icons/AlertTriangleFilled.js';
import { LoaderV2 } from '../../../Icons/LoadingSpinner.js';
import Row from '../../../Row/index.js';
import { TransactionStatus } from '../../../../graphql/data/__generated__/types-and-hooks.js';
import useENSName from '../../../../hooks/useENSName.js';
import styled from 'styled-components';
import { EllipsisStyle } from '../../../../theme/components/index.js';
import { shortenAddress } from '../../../../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import { getExplorerLink, ExplorerDataType } from '../../../../utils/getExplorerLink.js';
import { PortfolioLogo } from '../PortfolioLogo.js';
import PortfolioRow from '../PortfolioRow.js';
import { useOpenOffchainActivityModal } from './OffchainActivityModal.js';
import { useTimeSince } from './parseRemote.js';
import { ThemedText } from '../../../../theme/components/text.js';

var _templateObject, _templateObject2;
var ActivityRowDescriptor = styled(ThemedText.BodySmall)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n  ", "\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, EllipsisStyle);
var StyledTimestamp = styled(ThemedText.BodySmall)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  color: ", ";\n  font-variant: small;\n  font-feature-settings: \"tnum\" on, \"lnum\" on, \"ss02\" on;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral2;
});
function StatusIndicator(_ref3) {
  var _ref3$activity = _ref3.activity,
    status = _ref3$activity.status,
    timestamp = _ref3$activity.timestamp;
  var timeSince = useTimeSince(timestamp);
  switch (status) {
    case TransactionStatus.Pending:
      return /*#__PURE__*/React__default.createElement(LoaderV2, null);
    case TransactionStatus.Confirmed:
      return /*#__PURE__*/React__default.createElement(StyledTimestamp, null, timeSince);
    case TransactionStatus.Failed:
      return /*#__PURE__*/React__default.createElement(AlertTriangleFilled, null);
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
  var openOffchainActivityModal = useOpenOffchainActivityModal();
  var _useENSName = useENSName(otherAccount),
    ENSName = _useENSName.ENSName;
  var explorerUrl = getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION);
  var onClick = useCallback(function () {
    if (offchainOrderStatus) {
      openOffchainActivityModal({
        orderHash: hash,
        status: offchainOrderStatus
      });
      return;
    }
    window.open(getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION), "_blank");
  }, [offchainOrderStatus, chainId, hash, openOffchainActivityModal]);
  return /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: SharedEventName.ELEMENT_CLICKED,
    element: InterfaceElementName.MINI_PORTFOLIO_ACTIVITY_ROW,
    properties: {
      hash: hash,
      chain_id: chainId,
      explorer_url: explorerUrl
    }
  }, /*#__PURE__*/React__default.createElement(PortfolioRow, {
    left: /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(PortfolioLogo, {
      chainId: chainId,
      currencies: currencies,
      images: logos,
      accountAddress: otherAccount
    })),
    title: /*#__PURE__*/React__default.createElement(Row, {
      gap: "4px"
    }, prefixIconSrc && /*#__PURE__*/React__default.createElement("img", {
      height: "14px",
      width: "14px",
      src: prefixIconSrc,
      alt: ""
    }), /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, title)),
    descriptor: /*#__PURE__*/React__default.createElement(ActivityRowDescriptor, {
      color: "neutral2"
    }, descriptor, ENSName !== null && ENSName !== void 0 ? ENSName : shortenAddress(otherAccount)),
    right: /*#__PURE__*/React__default.createElement(StatusIndicator, {
      activity: activity
    }),
    onClick: onClick
  }));
}

export { ActivityRow };
