import React__default, { useEffect } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { useWeb3React } from '@web3-react/core';
import IconButton from '../AccountDrawer/IconButton.js';
import { AutoColumn } from '../Column/index.js';
import { Settings } from '../Icons/Settings.js';
import { AutoRow } from '../Row/index.js';
import { networkConnection, deprecatedNetworkConnection, connections } from '../../connection/index.js';
import { useActivationState, ActivationStatus } from '../../connection/activate.js';
import { isSupportedChain } from '../../constants/chains.js';
import { useFallbackProviderEnabled } from '../../featureFlags/flags/fallbackProvider.js';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { flexColumnNoWrap } from '../../theme/styles.js';
import ConnectionErrorView from './ConnectionErrorView.js';
import Option from './Option.js';
import PrivacyPolicyNotice from './PrivacyPolicyNotice.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var Wrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n  background-color: ", ";\n  width: 100%;\n  padding: 14px 16px 16px;\n  flex: 1;\n"])), flexColumnNoWrap, function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
});
var OptionGrid = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: grid;\n  grid-gap: 2px;\n  border-radius: 12px;\n  overflow: hidden;\n  ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n    grid-template-columns: 1fr;\n  "])));
});
var PrivacyPolicyWrapper = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  padding: 0 4px;\n"])));
function WalletModal(_ref3) {
  var openSettings = _ref3.openSettings;
  var _useWeb3React = useWeb3React(),
    connector = _useWeb3React.connector,
    chainId = _useWeb3React.chainId;
  var _useActivationState = useActivationState(),
    activationState = _useActivationState.activationState;
  var fallbackProviderEnabled = useFallbackProviderEnabled();
  // Keep the network connector in sync with any active user connector to prevent chain-switching on wallet disconnection.
  useEffect(function () {
    if (chainId && isSupportedChain(chainId) && connector !== networkConnection.connector) {
      if (fallbackProviderEnabled) {
        networkConnection.connector.activate(chainId);
      } else {
        deprecatedNetworkConnection.connector.activate(chainId);
      }
    }
  }, [chainId, connector, fallbackProviderEnabled]);
  return /*#__PURE__*/React__default.createElement(Wrapper, {
    "data-testid": "wallet-modal"
  }, /*#__PURE__*/React__default.createElement(AutoRow, {
    justify: "space-between",
    width: "100%",
    marginBottom: "16px"
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, "Connect a wallet"), /*#__PURE__*/React__default.createElement(IconButton, {
    Icon: Settings,
    onClick: openSettings,
    "data-testid": "wallet-settings"
  })), activationState.status === ActivationStatus.ERROR ? /*#__PURE__*/React__default.createElement(ConnectionErrorView, null) : /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "16px"
  }, /*#__PURE__*/React__default.createElement(OptionGrid, {
    "data-testid": "option-grid"
  }, connections.filter(function (connection) {
    return connection.shouldDisplay();
  }).map(function (connection) {
    return /*#__PURE__*/React__default.createElement(Option, {
      key: connection.getName(),
      connection: connection
    });
  })), /*#__PURE__*/React__default.createElement(PrivacyPolicyWrapper, null, /*#__PURE__*/React__default.createElement(PrivacyPolicyNotice, null))));
}

export { WalletModal as default };
