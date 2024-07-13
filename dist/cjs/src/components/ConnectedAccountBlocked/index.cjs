'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index$3 = require('../Column/index.cjs');
var TokenSafetyIcon = require('../TokenSafety/TokenSafetyIcon.cjs');
var styled = require('styled-components');
var index$2 = require('../../theme/components/index.cjs');
var index = require('../Modal/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var ContentWrapper = styled__default["default"](index$3.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  margin: 32px;\n  text-align: center;\n  font-size: 12px;\n"])));
function ConnectedAccountBlocked(props) {
  var theme = styled.useTheme();
  return /*#__PURE__*/React__default["default"].createElement(index["default"], {
    isOpen: props.isOpen,
    onDismiss: Function.prototype()
  }, /*#__PURE__*/React__default["default"].createElement(ContentWrapper, null, /*#__PURE__*/React__default["default"].createElement(TokenSafetyIcon.BlockedIcon, {
    size: "22px"
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLargeHeader, {
    lineHeight: 2,
    marginBottom: 1,
    marginTop: 1
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "c2y/7S",
    message: "Blocked address"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedDarkGray, {
    fontSize: 12,
    marginBottom: 12
  }, props.account), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    fontSize: 14,
    marginBottom: 12
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "hycRWp",
    message: "This address is blocked on the Uniswap Labs interface because it is associated with one or more"
  }), " ", /*#__PURE__*/React__default["default"].createElement(index$2.ExternalLink, {
    href: "https://help.uniswap.org/en/articles/6149816"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "Tz0GSZ",
    message: "blocked activities"
  })), "."), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    fontSize: 12
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "WpREeE",
    message: "If you believe this is an error, please send an email including your address to"
  }), " "), /*#__PURE__*/React__default["default"].createElement(index$2.CopyHelper, {
    toCopy: "compliance@uniswap.org",
    fontSize: 14,
    iconSize: 16,
    color: theme.accent1,
    iconPosition: "right"
  }, "compliance@uniswap.org")));
}

module.exports = ConnectedAccountBlocked;
