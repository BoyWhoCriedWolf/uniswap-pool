import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import styled from 'styled-components';
import { ExternalLink } from '../../theme/components/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2;
var StyledLink = styled(ExternalLink)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  font-weight: 535;\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var LastUpdatedText = styled.span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral3;
});
var LAST_UPDATED_DATE = "6.7.23";
function PrivacyPolicyNotice() {
  return /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Li8zdd",
    message: "By connecting a wallet, you agree to Uniswap Labs'"
  }), " ", /*#__PURE__*/React__default.createElement(StyledLink, {
    href: "https://uniswap.org/terms-of-service/"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "xowcRf",
    message: "Terms of Service"
  }), " "), /*#__PURE__*/React__default.createElement(Trans, {
    id: "7+d2ro",
    message: "and consent to its"
  }), " ", /*#__PURE__*/React__default.createElement(StyledLink, {
    href: "https://uniswap.org/privacy-policy"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "tnFG/g",
    message: "Privacy Policy."
  })), /*#__PURE__*/React__default.createElement(LastUpdatedText, null, " (", /*#__PURE__*/React__default.createElement(Trans, {
    id: "C3yOz3",
    message: "Last updated"
  }), " ".concat(LAST_UPDATED_DATE, ")")));
}

export { PrivacyPolicyNotice as default };
