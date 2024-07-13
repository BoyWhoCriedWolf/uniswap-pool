'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../../../../../components/Column/index.cjs');
var LoadingSpinner = require('../../../../../components/Icons/LoadingSpinner.cjs');
var index$1 = require('../../../../../components/Row/index.cjs');
var icons = require('../../../icons.cjs');
var index$2 = require('../../../../types/sell/index.cjs');
var asset = require('../../../../utils/asset.cjs');
require('@ethersproject/units');
require('video-extensions');
require('../../../../../locales/en-US.cjs');
require('numbro');
require('../../../../utils/pooledAssets.cjs');
require('../../../../utils/time.cjs');
require('@ethersproject/bignumber');
var reactFeather = require('react-feather');
var styled = require('styled-components');
require('../../../../../theme/components/index.cjs');
var utils = require('../../../../../theme/utils.cjs');
var text = require('../../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14;
var ContentColumn = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border-radius: 12px;\n  padding-bottom: ", ";\n"])), function (_ref) {
  var theme = _ref.theme,
    failed = _ref.failed;
  return failed && utils.opacify(12, theme.critical);
}, function (_ref2) {
  var failed = _ref2.failed;
  return failed && "16px";
});
var ContentRowWrapper = styled__default["default"](index$1["default"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  padding: 16px;\n  border: ", ";\n  border-radius: 12px;\n  opacity: ", ";\n"])), function (_ref3) {
  var failed = _ref3.failed,
    theme = _ref3.theme;
  return !failed && "1px solid ".concat(theme.surface3);
}, function (_ref4) {
  var active = _ref4.active,
    failed = _ref4.failed;
  return active || failed ? "1" : "0.6";
});
var CollectionIcon = styled__default["default"].img(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 100px;\n  height: 24px;\n  width: 24px;\n  z-index: 1;\n"])));
var AssetIcon = styled__default["default"].img(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 4px;\n  height: 24px;\n  width: 24px;\n  z-index: 1;\n"])));
var MarketplaceIcon = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 4px;\n  height: 24px;\n  width: 24px;\n  margin-left: -4px;\n  margin-right: 12px;\n"])));
var ContentName = styled__default["default"](text.ThemedText.SubHeaderSmall)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  line-height: 20px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  max-width: 40%;\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.neutral1;
});
var ProceedText = styled__default["default"].span(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  font-weight: 535;\n  font-size: 12px;\n  line-height: 16px;\n  color: ", ";\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.neutral2;
});
var FailedText = styled__default["default"].span(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  font-weight: 535;\n  font-size: 10px;\n  line-height: 12px;\n  color: ", ";\n  margin-left: 4px;\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.critical;
});
var StyledVerifiedIcon = styled__default["default"](icons.VerifiedIcon)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  height: 16px;\n  width: 16px;\n  margin-left: 4px;\n"])));
var IconWrapper = styled__default["default"].div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  margin-left: auto;\n  margin-right: 0px;\n"])));
var ButtonRow = styled__default["default"](index$1["default"])(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  padding: 0px 16px;\n  justify-content: space-between;\n"])));
var failedButtonStyle = styled.css(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n  width: 152px;\n  cursor: pointer;\n  padding: 8px 0px;\n  text-align: center;\n  font-weight: 535;\n  font-size: 14px;\n  line-height: 16px;\n  border-radius: 12px;\n  border: none;\n\n  &:hover {\n    opacity: 0.6;\n  }\n"])));
var RemoveButton = styled__default["default"].button(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  color: ", ";\n  ", "\n"])), function (_ref8) {
  var theme = _ref8.theme;
  return theme.critical;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.neutral1;
}, failedButtonStyle);
var RetryButton = styled__default["default"].button(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  color: ", ";\n  ", "\n"])), function (_ref10) {
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
  var theme = styled.useTheme();
  var rowRef = React.useRef();
  var failed = row.status === index$2.ListingStatus.FAILED || row.status === index$2.ListingStatus.REJECTED;
  React.useEffect(function () {
    var _rowRef$current;
    row.status === index$2.ListingStatus.SIGNING && ((_rowRef$current = rowRef.current) === null || _rowRef$current === void 0 ? void 0 : _rowRef$current.scroll);
  }, [row.status]);
  return /*#__PURE__*/React__default["default"].createElement(ContentColumn, {
    failed: failed
  }, /*#__PURE__*/React__default["default"].createElement(ContentRowWrapper, {
    active: row.status === index$2.ListingStatus.SIGNING || row.status === index$2.ListingStatus.APPROVED,
    failed: failed,
    ref: rowRef
  }, isCollectionApprovalSection ? /*#__PURE__*/React__default["default"].createElement(CollectionIcon, {
    src: row.image
  }) : /*#__PURE__*/React__default["default"].createElement(AssetIcon, {
    src: row.image
  }), /*#__PURE__*/React__default["default"].createElement(MarketplaceIcon, null, asset.getMarketplaceIcon(row.marketplace.name, "24")), /*#__PURE__*/React__default["default"].createElement(ContentName, null, row.name), isCollectionApprovalSection && row.isVerified && /*#__PURE__*/React__default["default"].createElement(StyledVerifiedIcon, null), /*#__PURE__*/React__default["default"].createElement(IconWrapper, null, row.status === index$2.ListingStatus.DEFINED || row.status === index$2.ListingStatus.PENDING ? /*#__PURE__*/React__default["default"].createElement(LoadingSpinner["default"], {
    height: "14px",
    width: "14px",
    stroke: row.status === index$2.ListingStatus.PENDING ? theme.accent1 : theme.neutral3
  }) : row.status === index$2.ListingStatus.SIGNING ? /*#__PURE__*/React__default["default"].createElement(ProceedText, null, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "CpEYLQ",
    message: "Proceed in wallet"
  })) : row.status === index$2.ListingStatus.APPROVED ? /*#__PURE__*/React__default["default"].createElement(reactFeather.Check, {
    height: "20",
    width: "20",
    stroke: theme.success
  }) : failed && /*#__PURE__*/React__default["default"].createElement(index$1["default"], null, /*#__PURE__*/React__default["default"].createElement(reactFeather.XOctagon, {
    height: "20",
    width: "20",
    color: theme.critical
  }), /*#__PURE__*/React__default["default"].createElement(FailedText, null, row.status === index$2.ListingStatus.FAILED ? /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "7Bj3x9",
    message: "Failed"
  }) : /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "ekCRTP",
    message: "Rejected"
  }))))), failed && /*#__PURE__*/React__default["default"].createElement(ButtonRow, {
    justify: "space-between"
  }, /*#__PURE__*/React__default["default"].createElement(RemoveButton, {
    onClick: function onClick() {
      return removeRow(row);
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "t/YqKh",
    message: "Remove"
  })), /*#__PURE__*/React__default["default"].createElement(RetryButton, {
    onClick: row.callback
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "6gRgw8",
    message: "Retry"
  }))));
};

exports.ContentRow = ContentRow;
