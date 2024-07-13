import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useWeb3React } from '@web3-react/core';
import { AutoColumn } from '../../components/Column/index.js';
import { getChainInfoOrDefault } from '../../constants/chainInfo.js';
import styled from 'styled-components';
import { ExternalLink } from '../../theme/components/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var CTASection = styled.section(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: grid;\n  grid-template-columns: 1fr 1fr;\n  gap: 8px;\n  opacity: 0.8;\n\n  ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    grid-template-columns: auto;\n    grid-template-rows: auto;\n  "])));
});
var CTA = styled(ExternalLink)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  padding: 16px;\n  border-radius: 20px;\n  position: relative;\n  overflow: hidden;\n  border: 1px solid ", ";\n\n  * {\n    color: ", ";\n    text-decoration: none !important;\n  }\n\n  :hover {\n    border: 1px solid ", ";\n\n    text-decoration: none;\n    * {\n      text-decoration: none !important;\n    }\n  }\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral1;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface3;
});
var HeaderText = styled(ThemedText.DeprecatedLabel)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  font-size: 16px;\n  font-weight: 535 !important;\n  ", ";\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    font-size: 16px;\n  "])));
});
var ResponsiveColumn = styled(AutoColumn)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  grid-template-columns: 1fr;\n  width: 100%;\n  gap: 8px;\n\n  ", ";\n  justify-content: space-between;\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n    gap: 8px;\n  "])));
});
function CTACards() {
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _getChainInfoOrDefaul = getChainInfoOrDefault(chainId),
    infoLink = _getChainInfoOrDefaul.infoLink;
  return /*#__PURE__*/React__default.createElement(CTASection, null, /*#__PURE__*/React__default.createElement(CTA, {
    href: "https://support.uniswap.org/hc/en-us/categories/8122334631437-Providing-Liquidity-"
  }, /*#__PURE__*/React__default.createElement(ResponsiveColumn, null, /*#__PURE__*/React__default.createElement(HeaderText, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "4xl+7r",
    message: "Learn about providing liquidity"
  }), " \u2197"), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBody, {
    style: {
      alignItems: "center",
      display: "flex",
      fontWeight: 485
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "xTN8Uu",
    message: "Check out our v3 LP walkthrough and migration guides."
  })))), /*#__PURE__*/React__default.createElement(CTA, {
    "data-testid": "cta-infolink",
    href: infoLink + "pools"
  }, /*#__PURE__*/React__default.createElement(ResponsiveColumn, null, /*#__PURE__*/React__default.createElement(HeaderText, {
    style: {
      alignSelf: "flex-start"
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "T6amNF",
    message: "Top pools"
  }), " \u2197"), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBody, {
    style: {
      alignSelf: "flex-start",
      fontWeight: 485
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "sX+nNt",
    message: "Explore Uniswap Analytics."
  })))));
}

export { CTACards as default };
