import React__default from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { ChainId } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { getChainInfo } from '../../constants/chainInfo.js';
import { ArrowUpRight } from 'react-feather';
import styled from 'styled-components';
import { colors } from '../../theme/colors.js';
import { ExternalLink, HideSmall } from '../../theme/components/index.js';
import { useDarkModeManager } from '../../theme/components/ThemeToggle.js';
import { Column } from '../Column/index.js';

var _templateObject, _templateObject2, _templateObject3, _SHOULD_SHOW_ALERT, _dark, _light, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _TEXT_COLORS;
var L2Icon = styled.img(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 24px;\n  height: 24px;\n  margin-right: 16px;\n"])));
var BodyText = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  color: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: flex-start;\n  margin: 8px;\n  font-size: 14px;\n  line-height: 20px;\n"])), function (_ref) {
  var color = _ref.color;
  return color;
});
var RootWrapper = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  margin-top: 16px;\n"])));
var SHOULD_SHOW_ALERT = (_SHOULD_SHOW_ALERT = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_SHOULD_SHOW_ALERT, ChainId.OPTIMISM, true), ChainId.OPTIMISM_GOERLI, true), ChainId.ARBITRUM_ONE, true), ChainId.ARBITRUM_GOERLI, true), ChainId.POLYGON, true), ChainId.POLYGON_MUMBAI, true), ChainId.CELO, true), ChainId.CELO_ALFAJORES, true), ChainId.BNB, true), ChainId.AVALANCHE, true), _defineProperty(_SHOULD_SHOW_ALERT, ChainId.BASE, true));
var BG_COLORS_BY_DARK_MODE_AND_CHAIN_ID = {
  dark: (_dark = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_dark, ChainId.POLYGON, "radial-gradient(100% 93.36% at 0% 6.64%, rgba(160, 108, 247, 0.1) 0%, rgba(82, 32, 166, 0.1) 100%)"), ChainId.POLYGON_MUMBAI, "radial-gradient(100% 93.36% at 0% 6.64%, rgba(160, 108, 247, 0.1) 0%, rgba(82, 32, 166, 0.1) 100%)"), ChainId.CELO, "radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(90, 190, 170, 0.15) 0%, rgba(80, 160, 40, 0.15) 100%)"), ChainId.CELO_ALFAJORES, "radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(90, 190, 170, 0.15) 0%, rgba(80, 160, 40, 0.15) 100%)"), ChainId.BNB, "radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(240, 185, 11, 0.16) 0%, rgba(255, 168, 0, 0.16) 100%)"), ChainId.OPTIMISM, "radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.01) 0%, rgba(255, 255, 255, 0.04) 100%),radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.01) 0%, rgba(235, 0, 255, 0.01) 96%)"), ChainId.OPTIMISM_GOERLI, "radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.04) 100%),radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.04) 0%, rgba(235, 0, 255, 0.01 96%)"), ChainId.ARBITRUM_ONE, "radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.01) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(75% 75% at 0% 0%, rgba(150, 190, 220, 0.05) 0%, rgba(33, 114, 229, 0.05) 100%), hsla(0, 0%, 100%, 0.05)"), ChainId.ARBITRUM_GOERLI, "radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.05) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(75% 75% at 0% 0%, rgba(150, 190, 220, 0.05) 0%, rgba(33, 114, 229, 0.1) 100%), hsla(0, 0%, 100%, 0.05)"), ChainId.AVALANCHE, "radial-gradient(948% 292% at 42% 0%, rgba(255, 58, 212, 0.01) 0%, rgba(255, 255, 255, 0.04) 100%),radial-gradient(98% 96% at 2% 0%, rgba(255, 39, 39, 0.01) 0%, rgba(235, 0, 255, 0.01) 96%)"), _defineProperty(_dark, ChainId.BASE, "radial-gradient(100% 100% at 50% 0%, rgba(10, 41, 75, 0.7) 0%, rgba(0, 82, 255, .1) 40%, rgba(0, 82, 255, 0) 100%), rgb(13, 14, 14);")),
  light: (_light = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_light, ChainId.POLYGON, "radial-gradient(182.71% 205.59% at 2.81% 7.69%, rgba(130, 71, 229, 0.2) 0%, rgba(167, 202, 255, 0.2) 100%)"), ChainId.POLYGON_MUMBAI, "radial-gradient(182.71% 205.59% at 2.81% 7.69%, rgba(130, 71, 229, 0.2) 0%, rgba(167, 202, 255, 0.2) 100%)"), ChainId.CELO, "radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(63, 208, 137, 0.15) 0%, rgba(49, 205, 50, 0.15) 100%)"), ChainId.CELO_ALFAJORES, "radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(63, 208, 137, 0.15) 0%, rgba(49, 205, 50, 0.15) 100%)"), ChainId.BNB, "radial-gradient(182.71% 150.59% at 2.81% 7.69%, rgba(240, 185, 11, 0.16) 0%, rgba(255, 168, 0, 0.16) 100%)"), ChainId.OPTIMISM, "radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.1)"), ChainId.OPTIMISM_GOERLI, "radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.1)"), ChainId.ARBITRUM_ONE, "radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.1) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(circle at top left, hsla(206, 50%, 75%, 0.01), hsla(215, 79%, 51%, 0.12)), hsla(0, 0%, 100%, 0.1)"), ChainId.ARBITRUM_GOERLI, "radial-gradient(285% 8200% at 30% 50%, rgba(40, 160, 240, 0.1) 0%, rgba(219, 255, 0, 0) 100%),radial-gradient(circle at top left, hsla(206, 50%, 75%, 0.01), hsla(215, 79%, 51%, 0.12)), hsla(0, 0%, 100%, 0.1)"), ChainId.AVALANCHE, "radial-gradient(92% 105% at 50% 7%, rgba(255, 58, 212, 0.04) 0%, rgba(255, 255, 255, 0.03) 100%),radial-gradient(100% 97% at 0% 12%, rgba(235, 0, 255, 0.1) 0%, rgba(243, 19, 19, 0.1) 100%), hsla(0, 0%, 100%, 0.1)"), _defineProperty(_light, ChainId.BASE, "radial-gradient(100% 100% at 50% 0%, rgba(0, 82, 255, 0.20) 0%, rgba(0, 82, 255, 0.08) 40.0%, rgba(252, 255, 82, 0.00) 100%), rgb(255, 255, 255)"))
};
var ContentWrapper = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  background: ", ";\n  border-radius: 20px;\n  display: flex;\n  flex-direction: row;\n  overflow: hidden;\n  position: relative;\n  width: 100%;\n\n  :before {\n    background-image: url(", ");\n    background-repeat: no-repeat;\n    background-size: 300px;\n    content: \"\";\n    height: 300px;\n    opacity: 0.1;\n    position: absolute;\n    transform: rotate(25deg) translate(-90px, -40px);\n    width: 300px;\n    pointer-events: none;\n  }\n"])), function (_ref2) {
  var chainId = _ref2.chainId,
    darkMode = _ref2.darkMode;
  return BG_COLORS_BY_DARK_MODE_AND_CHAIN_ID[darkMode ? "dark" : "light"][chainId];
}, function (_ref3) {
  var logoUrl = _ref3.logoUrl;
  return logoUrl;
});
var Header = styled.h2(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  font-weight: 535;\n  font-size: 16px;\n  margin: 0;\n"])));
var LinkOutToBridge = styled(ExternalLink)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  align-items: center;\n  border-radius: 8px;\n  color: white;\n  display: flex;\n  font-size: 16px;\n  justify-content: space-between;\n  padding: 6px 8px;\n  text-decoration: none !important;\n  width: 100%;\n"])));
var StyledArrowUpRight = styled(ArrowUpRight)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  margin-left: 12px;\n  width: 24px;\n  height: 24px;\n"])));
var TEXT_COLORS = (_TEXT_COLORS = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_TEXT_COLORS, ChainId.POLYGON, "rgba(130, 71, 229)"), ChainId.POLYGON_MUMBAI, "rgba(130, 71, 229)"), ChainId.CELO, "rgba(53, 178, 97)"), ChainId.CELO_ALFAJORES, "rgba(53, 178, 97)"), ChainId.OPTIMISM, "#ff3856"), ChainId.OPTIMISM_GOERLI, "#ff3856"), ChainId.ARBITRUM_ONE, "#0490ed"), ChainId.BNB, colors.gold400), ChainId.ARBITRUM_GOERLI, "#0490ed"), ChainId.AVALANCHE, "#ff3856"), _defineProperty(_TEXT_COLORS, ChainId.BASE, colors.networkBase));
function shouldShowAlert(chainId) {
  return Boolean(chainId && SHOULD_SHOW_ALERT[chainId]);
}
function NetworkAlert() {
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _useDarkModeManager = useDarkModeManager(),
    _useDarkModeManager2 = _slicedToArray(_useDarkModeManager, 1),
    darkMode = _useDarkModeManager2[0];
  if (!shouldShowAlert(chainId)) {
    return null;
  }
  var chainInfo = getChainInfo(chainId);
  if (!chainInfo) return null;
  var label = chainInfo.label,
    logoUrl = chainInfo.logoUrl,
    bridge = chainInfo.bridge;
  var textColor = TEXT_COLORS[chainId];
  return bridge ? /*#__PURE__*/React__default.createElement(RootWrapper, null, /*#__PURE__*/React__default.createElement(ContentWrapper, {
    chainId: chainId,
    darkMode: darkMode,
    logoUrl: logoUrl
  }, /*#__PURE__*/React__default.createElement(LinkOutToBridge, {
    href: bridge
  }, /*#__PURE__*/React__default.createElement(BodyText, {
    color: textColor
  }, /*#__PURE__*/React__default.createElement(L2Icon, {
    src: logoUrl
  }), /*#__PURE__*/React__default.createElement(Column, null, /*#__PURE__*/React__default.createElement(Header, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "ykrLAS",
    message: "{label} token bridge",
    values: {
      label: label
    }
  })), /*#__PURE__*/React__default.createElement(HideSmall, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Shr+yi",
    message: "Deposit tokens to the {label} network.",
    values: {
      label: label
    }
  })))), /*#__PURE__*/React__default.createElement(StyledArrowUpRight, {
    color: textColor
  })))) : null;
}

export { NetworkAlert };
