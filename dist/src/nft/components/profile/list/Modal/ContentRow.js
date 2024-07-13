import React__default, { useRef, useEffect } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Column } from '../../../../../components/Column/index.js';
import Loader from '../../../../../components/Icons/LoadingSpinner.js';
import Row from '../../../../../components/Row/index.js';
import { VerifiedIcon } from '../../../icons.js';
import { ListingStatus } from '../../../../types/sell/index.js';
import { getMarketplaceIcon } from '../../../../utils/asset.js';
import '@ethersproject/units';
import 'video-extensions';
import '../../../../../locales/en-US.js';
import 'numbro';
import '../../../../utils/pooledAssets.js';
import '../../../../utils/time.js';
import '@ethersproject/bignumber';
import { Check, XOctagon } from 'react-feather';
import styled, { css, useTheme } from 'styled-components';
import '../../../../../theme/components/index.js';
import { opacify } from '../../../../../theme/utils.js';
import { ThemedText } from '../../../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;
var ContentColumn = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 12px;\n  padding-bottom: ", ";\n"])), function (_ref) {
  var theme = _ref.theme,
    failed = _ref.failed;
  return failed && opacify(12, theme.critical);
}, function (_ref2) {
  var failed = _ref2.failed;
  return failed && "16px";
});
var ContentRowWrapper = styled(Row)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  padding: 16px;\n  border: ", ";\n  border-radius: 12px;\n  opacity: ", ";\n"])), function (_ref3) {
  var failed = _ref3.failed,
    theme = _ref3.theme;
  return !failed && "1px solid ".concat(theme.surface3);
}, function (_ref4) {
  var active = _ref4.active,
    failed = _ref4.failed;
  return active || failed ? "1" : "0.6";
});
var CollectionIcon = styled.img(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  border-radius: 100px;\n  height: 24px;\n  width: 24px;\n  z-index: 1;\n"])));
var AssetIcon = styled.img(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  border-radius: 4px;\n  height: 24px;\n  width: 24px;\n  z-index: 1;\n"])));
var MarketplaceIcon = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  border-radius: 4px;\n  height: 24px;\n  width: 24px;\n  margin-left: -4px;\n  margin-right: 12px;\n"])));
var ContentName = styled(ThemedText.SubHeaderSmall)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  color: ", ";\n  line-height: 20px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  max-width: 40%;\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.neutral1;
});
var ProceedText = styled.span(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  font-weight: 535;\n  font-size: 12px;\n  line-height: 16px;\n  color: ", ";\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.neutral2;
});
var FailedText = styled.span(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  font-weight: 535;\n  font-size: 10px;\n  line-height: 12px;\n  color: ", ";\n  margin-left: 4px;\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.critical;
});
var StyledVerifiedIcon = styled(VerifiedIcon)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  height: 16px;\n  width: 16px;\n  margin-left: 4px;\n"])));
var IconWrapper = styled.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  margin-left: auto;\n  margin-right: 0px;\n"])));
var ButtonRow = styled(Row)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  padding: 0px 16px;\n  justify-content: space-between;\n"])));
var failedButtonStyle = css(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  width: 152px;\n  cursor: pointer;\n  padding: 8px 0px;\n  text-align: center;\n  font-weight: 535;\n  font-size: 14px;\n  line-height: 16px;\n  border-radius: 12px;\n  border: none;\n\n  &:hover {\n    opacity: 0.6;\n  }\n"])));
var RemoveButton = styled.button(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  color: ", ";\n  ", "\n"])), function (_ref8) {
  var theme = _ref8.theme;
  return theme.critical;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.neutral1;
}, failedButtonStyle);
var RetryButton = styled.button(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  color: ", ";\n  ", "\n"])), function (_ref10) {
  var theme = _ref10.theme;
  return theme.surface3;
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.neutral1;
}, failedButtonStyle);
var ContentRow = function ContentRow(_ref12) {
  var row = _ref12.row,
    isCollectionApprovalSection = _ref12.isCollectionApprovalSection,
    removeRow = _ref12.removeRow;
  var theme = useTheme();
  var rowRef = useRef();
  var failed = row.status === ListingStatus.FAILED || row.status === ListingStatus.REJECTED;
  useEffect(function () {
    var _rowRef$current;
    row.status === ListingStatus.SIGNING && ((_rowRef$current = rowRef.current) === null || _rowRef$current === void 0 ? void 0 : _rowRef$current.scroll);
  }, [row.status]);
  return /*#__PURE__*/React__default.createElement(ContentColumn, {
    failed: failed
  }, /*#__PURE__*/React__default.createElement(ContentRowWrapper, {
    active: row.status === ListingStatus.SIGNING || row.status === ListingStatus.APPROVED,
    failed: failed,
    ref: rowRef
  }, isCollectionApprovalSection ? /*#__PURE__*/React__default.createElement(CollectionIcon, {
    src: row.image
  }) : /*#__PURE__*/React__default.createElement(AssetIcon, {
    src: row.image
  }), /*#__PURE__*/React__default.createElement(MarketplaceIcon, null, getMarketplaceIcon(row.marketplace.name, "24")), /*#__PURE__*/React__default.createElement(ContentName, null, row.name), isCollectionApprovalSection && row.isVerified && /*#__PURE__*/React__default.createElement(StyledVerifiedIcon, null), /*#__PURE__*/React__default.createElement(IconWrapper, null, row.status === ListingStatus.DEFINED || row.status === ListingStatus.PENDING ? /*#__PURE__*/React__default.createElement(Loader, {
    height: "14px",
    width: "14px",
    stroke: row.status === ListingStatus.PENDING ? theme.accent1 : theme.neutral3
  }) : row.status === ListingStatus.SIGNING ? /*#__PURE__*/React__default.createElement(ProceedText, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "CpEYLQ",
    message: "Proceed in wallet"
  })) : row.status === ListingStatus.APPROVED ? /*#__PURE__*/React__default.createElement(Check, {
    height: "20",
    width: "20",
    stroke: theme.success
  }) : failed && /*#__PURE__*/React__default.createElement(Row, null, /*#__PURE__*/React__default.createElement(XOctagon, {
    height: "20",
    width: "20",
    color: theme.critical
  }), /*#__PURE__*/React__default.createElement(FailedText, null, row.status === ListingStatus.FAILED ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "7Bj3x9",
    message: "Failed"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "ekCRTP",
    message: "Rejected"
  }))))), failed && /*#__PURE__*/React__default.createElement(ButtonRow, {
    justify: "space-between"
  }, /*#__PURE__*/React__default.createElement(RemoveButton, {
    onClick: function onClick() {
      return removeRow(row);
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "t/YqKh",
    message: "Remove"
  })), /*#__PURE__*/React__default.createElement(RetryButton, {
    onClick: row.callback
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "6gRgw8",
    message: "Retry"
  }))));
};

export { ContentRow };
