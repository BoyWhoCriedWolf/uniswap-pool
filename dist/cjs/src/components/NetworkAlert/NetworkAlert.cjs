'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var chainInfo = require('../../constants/chainInfo.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var colors = require('../../theme/colors.cjs');
var index = require('../../theme/components/index.cjs');
var ThemeToggle = require('../../theme/components/ThemeToggle.cjs');
var index$1 = require('../Column/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _SHOULD_SHOW_ALERT, _dark, _light, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _TEXT_COLORS;
var L2Icon = styled__default["default"].img(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: 24px;\n  height: 24px;\n  margin-right: 16px;\n"])));
var BodyText = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  margin: 8px;\n  font-size: 14px;\n  line-height: 20px;\n"])), function (_ref) {
  var color = _ref.color;
  return color;
});
var RootWrapper = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  margin-top: 16px;\n"])));
var SHOULD_SHOW_ALERT = (_SHOULD_SHOW_ALERT = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_SHOULD_SHOW_ALERT, sdkCore.ChainId.OPTIMISM, true), sdkCore.ChainId.OPTIMISM_GOERLI, true), sdkCore.ChainId.ARBITRUM_ONE, true), sdkCore.ChainId.ARBITRUM_GOERLI, true), sdkCore.ChainId.POLYGON, true), sdkCore.ChainId.POLYGON_MUMBAI, true), sdkCore.ChainId.CELO, true), sdkCore.ChainId.CELO_ALFAJORES, true), sdkCore.ChainId.BNB, true), sdkCore.ChainId.AVALANCHE, true), _defineProperty__default["default"](_SHOULD_SHOW_ALERT, sdkCore.ChainId.BASE, true));
var BG_COLORS_BY_DARK_MODE_AND_CHAIN_ID = {
  dark: (_dark = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_dark, sdkCore.ChainId.POLYGON, "radial-gradient(100% 93.36% at 0% 6.64%, rgba(160, 108, 247, 0.1) 0%, rgba(82, 32, 166, 0.1) 100%)"), sdkCore.ChainId.POLYGON_MUMBAI, "radial-gradient(100% 93.36% at 0% 6.64%, rgba(160, 108, 247, 0.1) 0%, rgba(82, 32, 166, 0.1) 100%)"), sdkCore.ChainId.CELO, "radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(90, 190, 170, 0.15) 0%, rgba(80, 160, 40, 0.15) 100%)"), sdkCore.ChainId.CELO_ALFAJORES, "radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(90, 190, 170, 0.15) 0%, rgba(80, 160, 40, 0.15) 100%)"), sdkCore.ChainId.BNB, "radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(240, 185, 11, 0.16) 0%, rgba(255, 168, 0, 0.16) 100%)"), sdkCore.ChainId.OPTIMISM, "radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.01) 0%, rgba(255, 255, 255, 0.04) 100%),radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.01) 0%, rgba(235, 0, 255, 0.01) 96%)"), sdkCore.ChainId.OPTIMISM_GOERLI, "radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.04) 100%),radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.04) 0%, rgba(235, 0, 255, 0.01 96%)"), sdkCore.ChainId.ARBITRUM_ONE, "radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.01) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(75% 75% at 0% 0%, rgba(150, 190, 220, 0.05) 0%, rgba(33, 114, 229, 0.05) 100%), hsla(0, 0%, 100%, 0.05)"), sdkCore.ChainId.ARBITRUM_GOERLI, "radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.05) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(75% 75% at 0% 0%, rgba(150, 190, 220, 0.05) 0%, rgba(33, 114, 229, 0.1) 100%), hsla(0, 0%, 100%, 0.05)"), sdkCore.ChainId.AVALANCHE, "radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.01) 0%, rgba(255, 255, 255, 0.04) 100%),radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.01) 0%, rgba(235, 0, 255, 0.01) 96%)"), _defineProperty__default["default"](_dark, sdkCore.ChainId.BASE, "radial-gradient(100% 100% at 50% 0%, rgba(10, 41, 75, 0.7) 0%, rgba(0, 82, 255, .1) 40%, rgba(0, 82, 255, 0) 100%), rgb(13, 14, 14);")),
  light: (_light = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_light, sdkCore.ChainId.POLYGON, "radial-gradient(182.71% 205.59% at 2.81% 7.69%, rgba(130, 71, 229, 0.2) 0%, rgba(167, 202, 255, 0.2) 100%)"), sdkCore.ChainId.POLYGON_MUMBAI, "radial-gradient(182.71% 205.59% at 2.81% 7.69%, rgba(130, 71, 229, 0.2) 0%, rgba(167, 202, 255, 0.2) 100%)"), sdkCore.ChainId.CELO, "radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(63, 208, 137, 0.15) 0%, rgba(49, 205, 50, 0.15) 100%)"), sdkCore.ChainId.CELO_ALFAJORES, "radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(63, 208, 137, 0.15) 0%, rgba(49, 205, 50, 0.15) 100%)"), sdkCore.ChainId.BNB, "radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(240, 185, 11, 0.16) 0%, rgba(255, 168, 0, 0.16) 100%)"), sdkCore.ChainId.OPTIMISM, "radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.1)"), sdkCore.ChainId.OPTIMISM_GOERLI, "radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.1)"), sdkCore.ChainId.ARBITRUM_ONE, "radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.1) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(circle at top left, hsla(206, 50%, 75%, 0.01), hsla(215, 79%, 51%, 0.12)), hsla(0, 0%, 100%, 0.1)"), sdkCore.ChainId.ARBITRUM_GOERLI, "radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.1) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(circle at top left, hsla(206, 50%, 75%, 0.01), hsla(215, 79%, 51%, 0.12)), hsla(0, 0%, 100%, 0.1)"), sdkCore.ChainId.AVALANCHE, "radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.1)"), _defineProperty__default["default"](_light, sdkCore.ChainId.BASE, "radial-gradient(100% 100% at 50% 0%, rgba(0, 82, 255, 0.20) 0%, rgba(0, 82, 255, 0.08) 40.0%, rgba(252, 255, 82, 0.00) 100%), rgb(255, 255, 255)"))
};
var ContentWrapper = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  background: ", ";\n  border-radius: 20px;\n  display: flex;\n  flex-direction: row;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n\n  :before {\n    background-image: url(", ");\n    background-repeat: no-repeat;\n    background-size: 300px;\n    content: \"\";\n    height: 300px;\n    opacity: 0.1;\n    position: absolute;\n    transform: rotate(25deg) translate(-90px, -40px);\n    width: 300px;\n    pointer-events: none;\n  }\n"])), function (_ref2) {
  var chainId = _ref2.chainId,
    darkMode = _ref2.darkMode;
  return BG_COLORS_BY_DARK_MODE_AND_CHAIN_ID[darkMode ? "dark" : "light"][chainId];
}, function (_ref3) {
  var logoUrl = _ref3.logoUrl;
  return logoUrl;
});
var Header = styled__default["default"].h2(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  font-weight: 535;\n  font-size: 16px;\n  margin: 0;\n"])));
var LinkOutToBridge = styled__default["default"](index.ExternalLink)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  border-radius: 8px;\n  color: white;\n  display: flex;\n  font-size: 16px;\n  justify-content: space-between;\n  padding: 6px 8px;\n  text-decoration: none !important;\n  width: 100%;\n"])));
var StyledArrowUpRight = styled__default["default"](reactFeather.ArrowUpRight)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  margin-left: 12px;\n  width: 24px;\n  height: 24px;\n"])));
var TEXT_COLORS = (_TEXT_COLORS = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_TEXT_COLORS, sdkCore.ChainId.POLYGON, "rgba(130, 71, 229)"), sdkCore.ChainId.POLYGON_MUMBAI, "rgba(130, 71, 229)"), sdkCore.ChainId.CELO, "rgba(53, 178, 97)"), sdkCore.ChainId.CELO_ALFAJORES, "rgba(53, 178, 97)"), sdkCore.ChainId.OPTIMISM, "#ff3856"), sdkCore.ChainId.OPTIMISM_GOERLI, "#ff3856"), sdkCore.ChainId.ARBITRUM_ONE, "#0490ed"), sdkCore.ChainId.BNB, colors.colors.gold400), sdkCore.ChainId.ARBITRUM_GOERLI, "#0490ed"), sdkCore.ChainId.AVALANCHE, "#ff3856"), _defineProperty__default["default"](_TEXT_COLORS, sdkCore.ChainId.BASE, colors.colors.networkBase));
function shouldShowAlert(chainId) {
  return Boolean(chainId && SHOULD_SHOW_ALERT[chainId]);
}
function NetworkAlert() {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _useDarkModeManager = ThemeToggle.useDarkModeManager(),
    _useDarkModeManager2 = _slicedToArray__default["default"](_useDarkModeManager, 1),
    darkMode = _useDarkModeManager2[0];
  if (!shouldShowAlert(chainId)) {
    return null;
  }
  var chainInfo$1 = chainInfo.getChainInfo(chainId);
  if (!chainInfo$1) return null;
  var label = chainInfo$1.label,
    logoUrl = chainInfo$1.logoUrl,
    bridge = chainInfo$1.bridge;
  var textColor = TEXT_COLORS[chainId];
  return bridge ? /*#__PURE__*/React__default["default"].createElement(RootWrapper, null, /*#__PURE__*/React__default["default"].createElement(ContentWrapper, {
    chainId: chainId,
    darkMode: darkMode,
    logoUrl: logoUrl
  }, /*#__PURE__*/React__default["default"].createElement(LinkOutToBridge, {
    href: bridge
  }, /*#__PURE__*/React__default["default"].createElement(BodyText, {
    color: textColor
  }, /*#__PURE__*/React__default["default"].createElement(L2Icon, {
    src: logoUrl
  }), /*#__PURE__*/React__default["default"].createElement(index$1.Column, null, /*#__PURE__*/React__default["default"].createElement(Header, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "ykrLAS",
    message: "{label} token bridge",
    values: {
      label: label
    }
  })), /*#__PURE__*/React__default["default"].createElement(index.HideSmall, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "Shr+yi",
    message: "Deposit tokens to the {label} network.",
    values: {
      label: label
    }
  })))), /*#__PURE__*/React__default["default"].createElement(StyledArrowUpRight, {
    color: textColor
  })))) : null;
}

exports.NetworkAlert = NetworkAlert;
