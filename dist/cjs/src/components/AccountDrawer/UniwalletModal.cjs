'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var index$1 = require('../../analytics/index.cjs');
var index$6 = require('../Column/index.cjs');
var index$2 = require('../Modal/index.cjs');
var index$5 = require('../Row/index.cjs');
var index = require('../../connection/index.cjs');
var activate = require('../../connection/activate.cjs');
var types = require('../../connection/types.cjs');
var WalletConnectV2 = require('../../connection/WalletConnectV2.cjs');
var qrcode_react = require('qrcode.react');
var styled = require('styled-components');
var index$4 = require('../../theme/components/index.cjs');
var userAgent = require('../../utils/userAgent.cjs');
var uniwallet_modal_icon = require('../../assets/images/uniwallet_modal_icon.cjs');
var DownloadButton = require('./DownloadButton.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var UniwalletConnectWrapper = styled__default["default"](index$5.RowBetween)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: column;\n  padding: 20px 16px 16px;\n"])));
var HeaderRow = styled__default["default"](index$5.RowBetween)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n"])));
var QRCodeWrapper = styled__default["default"](index$5.RowBetween)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  aspect-ratio: 1;\n  border-radius: 12px;\n  background-color: ", ";\n  margin: 24px 32px 20px;\n  padding: 10px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.white;
});
var Divider = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  border-bottom: 1px solid ", ";\n  width: 100%;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
});
function UniwalletModal() {
  var _useActivationState = activate.useActivationState(),
    activationState = _useActivationState.activationState,
    cancelActivation = _useActivationState.cancelActivation;
  var _useState = React.useState(),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    uri = _useState2[0],
    setUri = _useState2[1];

  // Displays the modal if not on iOS, a Uniswap Wallet Connection is pending, & qrcode URI is available
  var open = !userAgent.isIOS && activationState.status === activate.ActivationStatus.PENDING && activationState.connection.type === types.ConnectionType.UNISWAP_WALLET_V2 && !!uri;
  React.useEffect(function () {
    var connectorV2 = index.uniwalletWCV2ConnectConnection.connector;
    connectorV2.events.addListener(WalletConnectV2.UniwalletConnect.UNI_URI_AVAILABLE, function (uri) {
      uri && setUri(uri);
    });
  }, []);
  React.useEffect(function () {
    if (open) index$1.sendAnalyticsEvent("Uniswap wallet modal opened");
  }, [open]);
  var theme = styled.useTheme();
  return /*#__PURE__*/React__default["default"].createElement(index$2["default"], {
    isOpen: open,
    onDismiss: cancelActivation
  }, /*#__PURE__*/React__default["default"].createElement(UniwalletConnectWrapper, null, /*#__PURE__*/React__default["default"].createElement(HeaderRow, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "4Ock4M",
    message: "Scan with Uniswap Wallet"
  })), /*#__PURE__*/React__default["default"].createElement(index$4.CloseIcon, {
    onClick: cancelActivation
  })), /*#__PURE__*/React__default["default"].createElement(QRCodeWrapper, null, uri && /*#__PURE__*/React__default["default"].createElement(qrcode_react.QRCodeSVG, {
    value: uri,
    width: "100%",
    height: "100%",
    level: "M",
    fgColor: theme.darkMode ? theme.surface1 : theme.black,
    imageSettings: {
      src: uniwallet_modal_icon,
      height: 33,
      width: 33,
      excavate: false
    }
  })), /*#__PURE__*/React__default["default"].createElement(Divider, null), /*#__PURE__*/React__default["default"].createElement(InfoSection, null)));
}
var InfoSectionWrapper = styled__default["default"](index$5.RowBetween)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: row;\n  padding-top: 20px;\n  gap: 20px;\n"])));
function InfoSection() {
  return /*#__PURE__*/React__default["default"].createElement(InfoSectionWrapper, null, /*#__PURE__*/React__default["default"].createElement(index$6.AutoColumn, {
    gap: "4px"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, {
    color: "neutral1"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "IikX52",
    message: "Don't have Uniswap Wallet?"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "Hmd9BI",
    message: "Download in the App Store to safely store your tokens and NFTs, swap tokens, and connect to crypto apps."
  }))), /*#__PURE__*/React__default["default"].createElement(index$6.Column, null, /*#__PURE__*/React__default["default"].createElement(DownloadButton.DownloadButton, {
    element: analyticsEvents.InterfaceElementName.UNISWAP_WALLET_MODAL_DOWNLOAD_BUTTON
  })));
}

module.exports = UniwalletModal;
