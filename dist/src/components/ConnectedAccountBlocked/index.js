import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Column } from '../Column/index.js';
import { BlockedIcon } from '../TokenSafety/TokenSafetyIcon.js';
import styled, { useTheme } from 'styled-components';
import { ExternalLink, CopyHelper } from '../../theme/components/index.js';
import Modal from '../Modal/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
var ContentWrapper = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  align-items: center;\n  margin: 32px;\n  text-align: center;\n  font-size: 12px;\n"])));
function ConnectedAccountBlocked(props) {
  var theme = useTheme();
  return /*#__PURE__*/React__default.createElement(Modal, {
    isOpen: props.isOpen,
    onDismiss: Function.prototype()
  }, /*#__PURE__*/React__default.createElement(ContentWrapper, null, /*#__PURE__*/React__default.createElement(BlockedIcon, {
    size: "22px"
  }), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLargeHeader, {
    lineHeight: 2,
    marginBottom: 1,
    marginTop: 1
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "c2y/7S",
    message: "Blocked address"
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedDarkGray, {
    fontSize: 12,
    marginBottom: 12
  }, props.account), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    fontSize: 14,
    marginBottom: 12
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "hycRWp",
    message: "This address is blocked on the Uniswap Labs interface because it is associated with one or more"
  }), " ", /*#__PURE__*/React__default.createElement(ExternalLink, {
    href: "https://help.uniswap.org/en/articles/6149816"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Tz0GSZ",
    message: "blocked activities"
  })), "."), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    fontSize: 12
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "WpREeE",
    message: "If you believe this is an error, please send an email including your address to"
  }), " "), /*#__PURE__*/React__default.createElement(CopyHelper, {
    toCopy: "compliance@uniswap.org",
    fontSize: 14,
    iconSize: 16,
    color: theme.accent1,
    iconPosition: "right"
  }, "compliance@uniswap.org")));
}

export { ConnectedAccountBlocked as default };
