import React__default, { useState } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useWeb3React } from '@web3-react/core';
import { ButtonEmpty } from '../Button/index.js';
import Card, { OutlineCard } from '../Card/index.js';
import { AutoColumn } from '../Column/index.js';
import CurrencyLogo from '../Logo/CurrencyLogo.js';
import Modal from '../Modal/index.js';
import { RowBetween, AutoRow } from '../Row/index.js';
import styled from 'styled-components';
import { CloseIcon, ExternalLink } from '../../theme/components/index.js';
import { Z_INDEX } from '../../theme/zIndex.js';
import { useUnsupportedTokens } from '../../hooks/Tokens.js';
import { getExplorerLink, ExplorerDataType } from '../../utils/getExplorerLink.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var DetailsFooter = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding-top: calc(16px + 2rem);\n  padding-bottom: 20px;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: -2rem;\n  width: 100%;\n  max-width: 400px;\n  border-bottom-left-radius: 20px;\n  border-bottom-right-radius: 20px;\n  color: ", ";\n  background-color: ", ";\n  z-index: ", ";\n\n  transform: ", ";\n  transition: transform 300ms ease-in-out;\n  text-align: center;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface2;
}, Z_INDEX.deprecated_zero, function (_ref3) {
  var show = _ref3.show;
  return show ? "translateY(0%)" : "translateY(-100%)";
});
var StyledButtonEmpty = styled(ButtonEmpty)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  text-decoration: none;\n"])));
var AddressText = styled(ThemedText.DeprecatedBlue)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  font-size: 12px;\n\n  ", "\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    font-size: 10px;\n"])));
});
function UnsupportedCurrencyFooter(_ref5) {
  var show = _ref5.show,
    currencies = _ref5.currencies;
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showDetails = _useState2[0],
    setShowDetails = _useState2[1];
  var tokens = chainId && currencies ? currencies.map(function (currency) {
    return currency === null || currency === void 0 ? void 0 : currency.wrapped;
  }) : [];
  var unsupportedTokens = useUnsupportedTokens();
  return /*#__PURE__*/React__default.createElement(DetailsFooter, {
    show: show
  }, /*#__PURE__*/React__default.createElement(Modal, {
    isOpen: showDetails,
    onDismiss: function onDismiss() {
      return setShowDetails(false);
    }
  }, /*#__PURE__*/React__default.createElement(Card, {
    padding: "2rem"
  }, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "lg"
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMediumHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "7Osz32",
    message: "Unsupported assets"
  })), /*#__PURE__*/React__default.createElement(CloseIcon, {
    onClick: function onClick() {
      return setShowDetails(false);
    },
    "data-testid": "close-icon"
  })), tokens.map(function (token) {
    var _token$address;
    return token && unsupportedTokens && Object.keys(unsupportedTokens).includes(token.address) && /*#__PURE__*/React__default.createElement(OutlineCard, {
      key: (_token$address = token.address) === null || _token$address === void 0 ? void 0 : _token$address.concat("not-supported"),
      "data-testid": "unsupported-token-card"
    }, /*#__PURE__*/React__default.createElement(AutoColumn, {
      gap: "10px"
    }, /*#__PURE__*/React__default.createElement(AutoRow, {
      gap: "5px",
      align: "center"
    }, /*#__PURE__*/React__default.createElement(CurrencyLogo, {
      currency: token,
      size: "24px"
    }), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBody, {
      fontWeight: 535
    }, token.symbol)), chainId && /*#__PURE__*/React__default.createElement(ExternalLink, {
      href: getExplorerLink(chainId, token.address, ExplorerDataType.ADDRESS)
    }, /*#__PURE__*/React__default.createElement(AddressText, null, token.address))));
  }), /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "lg"
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBody, {
    fontWeight: 535
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "l7X7DE",
    message: "Some assets are not available through this interface because they may not work well with the smart contracts or we are unable to allow trading for legal reasons."
  })))))), /*#__PURE__*/React__default.createElement(StyledButtonEmpty, {
    padding: "0",
    onClick: function onClick() {
      return setShowDetails(true);
    },
    "data-testid": "read-more-button"
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBlue, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "bIjYSY",
    message: "Read more about unsupported assets"
  }))));
}

export { UnsupportedCurrencyFooter as default };
