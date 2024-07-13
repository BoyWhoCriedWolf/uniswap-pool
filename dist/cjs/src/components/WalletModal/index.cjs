'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var core = require('@web3-react/core');
var IconButton = require('../AccountDrawer/IconButton.cjs');
var index$2 = require('../Column/index.cjs');
var Settings = require('../Icons/Settings.cjs');
var index$1 = require('../Row/index.cjs');
var index = require('../../connection/index.cjs');
var activate = require('../../connection/activate.cjs');
var chains = require('../../constants/chains.cjs');
var fallbackProvider = require('../../featureFlags/flags/fallbackProvider.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var styles = require('../../theme/styles.cjs');
var ConnectionErrorView = require('./ConnectionErrorView.cjs');
var Option = require('./Option.cjs');
var PrivacyPolicyNotice = require('./PrivacyPolicyNotice.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var Wrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  background-color: ", ";\n  width: 100%;\n  padding: 14px 16px 16px;\n  flex: 1;\n"])), styles.flexColumnNoWrap, function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
});
var OptionGrid = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  display: grid;\n  grid-gap: 2px;\n  border-radius: 12px;\n  overflow: hidden;\n  ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n    grid-template-columns: 1fr;\n  "])));
});
var PrivacyPolicyWrapper = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  padding: 0 4px;\n"])));
function WalletModal(_ref3) {
  var openSettings = _ref3.openSettings;
  var _useWeb3React = core.useWeb3React(),
    connector = _useWeb3React.connector,
    chainId = _useWeb3React.chainId;
  var _useActivationState = activate.useActivationState(),
    activationState = _useActivationState.activationState;
  var fallbackProviderEnabled = fallbackProvider.useFallbackProviderEnabled();
  // Keep the network connector in sync with any active user connector to prevent chain-switching on wallet disconnection.
  React.useEffect(function () {
    if (chainId && chains.isSupportedChain(chainId) && connector !== index.networkConnection.connector) {
      if (fallbackProviderEnabled) {
        index.networkConnection.connector.activate(chainId);
      } else {
        index.deprecatedNetworkConnection.connector.activate(chainId);
      }
    }
  }, [chainId, connector, fallbackProviderEnabled]);
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, {
    "data-testid": "wallet-modal"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.AutoRow, {
    justify: "space-between",
    width: "100%",
    marginBottom: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, "Connect a wallet"), /*#__PURE__*/React__default["default"].createElement(IconButton["default"], {
    Icon: Settings.Settings,
    onClick: openSettings,
    "data-testid": "wallet-settings"
  })), activationState.status === activate.ActivationStatus.ERROR ? /*#__PURE__*/React__default["default"].createElement(ConnectionErrorView, null) : /*#__PURE__*/React__default["default"].createElement(index$2.AutoColumn, {
    gap: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(OptionGrid, {
    "data-testid": "option-grid"
  }, index.connections.filter(function (connection) {
    return connection.shouldDisplay();
  }).map(function (connection) {
    return /*#__PURE__*/React__default["default"].createElement(Option, {
      key: connection.getName(),
      connection: connection
    });
  })), /*#__PURE__*/React__default["default"].createElement(PrivacyPolicyWrapper, null, /*#__PURE__*/React__default["default"].createElement(PrivacyPolicyNotice, null))));
}

module.exports = WalletModal;
