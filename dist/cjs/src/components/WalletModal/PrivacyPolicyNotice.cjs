'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var styled = require('styled-components');
var index = require('../../theme/components/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var StyledLink = styled__default["default"](index.ExternalLink)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  font-weight: 535;\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var LastUpdatedText = styled__default["default"].span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.neutral3;
});
var LAST_UPDATED_DATE = "6.7.23";
function PrivacyPolicyNotice() {
  return /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "Li8zdd",
    message: "By connecting a wallet, you agree to Uniswap Labs'"
  }), " ", /*#__PURE__*/React__default["default"].createElement(StyledLink, {
    href: "https://uniswap.org/terms-of-service/"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "xowcRf",
    message: "Terms of Service"
  }), " "), /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "7+d2ro",
    message: "and consent to its"
  }), " ", /*#__PURE__*/React__default["default"].createElement(StyledLink, {
    href: "https://uniswap.org/privacy-policy"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "tnFG/g",
    message: "Privacy Policy."
  })), /*#__PURE__*/React__default["default"].createElement(LastUpdatedText, null, " (", /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "C3yOz3",
    message: "Last updated"
  }), " ".concat(LAST_UPDATED_DATE, ")")));
}

module.exports = PrivacyPolicyNotice;
