import React__default, { useState, useEffect } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { InterfaceElementName } from '@uniswap/analytics-events';
import { sendAnalyticsEvent } from '../../analytics/index.js';
import { AutoColumn, Column } from '../Column/index.js';
import Modal from '../Modal/index.js';
import { RowBetween } from '../Row/index.js';
import { uniwalletWCV2ConnectConnection } from '../../connection/index.js';
import { useActivationState, ActivationStatus } from '../../connection/activate.js';
import { ConnectionType } from '../../connection/types.js';
import { UniwalletConnect } from '../../connection/WalletConnectV2.js';
import { QRCodeSVG } from 'qrcode.react';
import styled, { useTheme } from 'styled-components';
import { CloseIcon } from '../../theme/components/index.js';
import { isIOS } from '../../utils/userAgent.js';
import uniPng from '../../assets/images/uniwallet_modal_icon.png.js';
import { DownloadButton } from './DownloadButton.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var UniwalletConnectWrapper = styled(RowBetween)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: column;\n  padding: 20px 16px 16px;\n"])));
var HeaderRow = styled(RowBetween)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n"])));
var QRCodeWrapper = styled(RowBetween)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  aspect-ratio: 1;\n  border-radius: 12px;\n  background-color: ", ";\n  margin: 24px 32px 20px;\n  padding: 10px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.white;
});
var Divider = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  border-bottom: 1px solid ", ";\n  width: 100%;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
});
function UniwalletModal() {
  var _useActivationState = useActivationState(),
    activationState = _useActivationState.activationState,
    cancelActivation = _useActivationState.cancelActivation;
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    uri = _useState2[0],
    setUri = _useState2[1];

  // Displays the modal if not on iOS, a Uniswap Wallet Connection is pending, & qrcode URI is available
  var open = !isIOS && activationState.status === ActivationStatus.PENDING && activationState.connection.type === ConnectionType.UNISWAP_WALLET_V2 && !!uri;
  useEffect(function () {
    var connectorV2 = uniwalletWCV2ConnectConnection.connector;
    connectorV2.events.addListener(UniwalletConnect.UNI_URI_AVAILABLE, function (uri) {
      uri && setUri(uri);
    });
  }, []);
  useEffect(function () {
    if (open) sendAnalyticsEvent("Uniswap wallet modal opened");
  }, [open]);
  var theme = useTheme();
  return /*#__PURE__*/React__default.createElement(Modal, {
    isOpen: open,
    onDismiss: cancelActivation
  }, /*#__PURE__*/React__default.createElement(UniwalletConnectWrapper, null, /*#__PURE__*/React__default.createElement(HeaderRow, null, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "4Ock4M",
    message: "Scan with Uniswap Wallet"
  })), /*#__PURE__*/React__default.createElement(CloseIcon, {
    onClick: cancelActivation
  })), /*#__PURE__*/React__default.createElement(QRCodeWrapper, null, uri && /*#__PURE__*/React__default.createElement(QRCodeSVG, {
    value: uri,
    width: "100%",
    height: "100%",
    level: "M",
    fgColor: theme.darkMode ? theme.surface1 : theme.black,
    imageSettings: {
      src: uniPng,
      height: 33,
      width: 33,
      excavate: false
    }
  })), /*#__PURE__*/React__default.createElement(Divider, null), /*#__PURE__*/React__default.createElement(InfoSection, null)));
}
var InfoSectionWrapper = styled(RowBetween)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  padding-top: 20px;\n  gap: 20px;\n"])));
function InfoSection() {
  return /*#__PURE__*/React__default.createElement(InfoSectionWrapper, null, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "4px"
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, {
    color: "neutral1"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "IikX52",
    message: "Don't have Uniswap Wallet?"
  })), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Hmd9BI",
    message: "Download in the App Store to safely store your tokens and NFTs, swap tokens, and connect to crypto apps."
  }))), /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(DownloadButton, {
    element: InterfaceElementName.UNISWAP_WALLET_MODAL_DOWNLOAD_BUTTON
  })));
}

export { UniwalletModal as default };
