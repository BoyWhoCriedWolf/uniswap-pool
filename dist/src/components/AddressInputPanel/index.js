import React__default, { useCallback } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { i18n } from '../../../node_modules/@lingui/core/dist/index.mjs.js';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useWeb3React } from '@web3-react/core';
import styled, { useTheme } from 'styled-components';
import { ExternalLink } from '../../theme/components/index.js';
import { flexColumnNoWrap } from '../../theme/styles.js';
import useENS from '../../hooks/useENS.js';
import { getExplorerLink, ExplorerDataType } from '../../utils/getExplorerLink.js';
import { AutoColumn } from '../Column/index.js';
import { RowBetween } from '../Row/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var InputPanel = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n  position: relative;\n  border-radius: 1.25rem;\n  background-color: ", ";\n  z-index: 1;\n  width: 100%;\n"])), flexColumnNoWrap, function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
});
var ContainerRow = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 1.25rem;\n  border: 1px solid\n    ", ";\n  transition: border-color 300ms\n      ", ",\n    color 500ms ", ";\n  background-color: ", ";\n"])), function (_ref2) {
  var error = _ref2.error,
    theme = _ref2.theme;
  return error ? theme.critical : theme.surface3;
}, function (_ref3) {
  var error = _ref3.error;
  return error ? "step-end" : "step-start";
}, function (_ref4) {
  var error = _ref4.error;
  return error ? "step-end" : "step-start";
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface1;
});
var InputContainer = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  flex: 1;\n  padding: 1rem;\n"])));
var Input = styled.input(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  font-size: 1.25rem;\n  outline: none;\n  border: none;\n  flex: 1 1 auto;\n  width: 0;\n  background-color: ", ";\n  transition: color 300ms ", ";\n  color: ", ";\n  overflow: hidden;\n  text-overflow: ellipsis;\n  font-weight: 535;\n  width: 100%;\n  ::placeholder {\n    color: ", ";\n  }\n  padding: 0px;\n  -webkit-appearance: textfield;\n\n  ::-webkit-search-decoration {\n    -webkit-appearance: none;\n  }\n\n  ::-webkit-outer-spin-button,\n  ::-webkit-inner-spin-button {\n    -webkit-appearance: none;\n  }\n\n  ::placeholder {\n    color: ", ";\n  }\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface1;
}, function (_ref7) {
  var error = _ref7.error;
  return error ? "step-end" : "step-start";
}, function (_ref8) {
  var error = _ref8.error,
    theme = _ref8.theme;
  return error ? theme.critical : theme.neutral1;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.neutral3;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.neutral3;
});
function AddressInputPanel(_ref11) {
  var id = _ref11.id,
    _ref11$className = _ref11.className,
    className = _ref11$className === void 0 ? "recipient-address-input" : _ref11$className,
    label = _ref11.label,
    placeholder = _ref11.placeholder,
    value = _ref11.value,
    onChange = _ref11.onChange;
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var theme = useTheme();
  var _useENS = useENS(value),
    address = _useENS.address,
    loading = _useENS.loading,
    name = _useENS.name;
  var handleInput = useCallback(function (event) {
    var input = event.target.value;
    var withoutSpaces = input.replace(/\s+/g, "");
    onChange(withoutSpaces);
  }, [onChange]);
  var error = Boolean(value.length > 0 && !loading && !address);
  return /*#__PURE__*/React__default.createElement(InputPanel, {
    id: id
  }, /*#__PURE__*/React__default.createElement(ContainerRow, {
    error: error
  }, /*#__PURE__*/React__default.createElement(InputContainer, null, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBlack, {
    color: theme.neutral2,
    fontWeight: 535,
    fontSize: 14
  }, label !== null && label !== void 0 ? label : /*#__PURE__*/React__default.createElement(Trans, {
    id: "I3QpvQ",
    message: "Recipient"
  })), address && chainId && /*#__PURE__*/React__default.createElement(ExternalLink, {
    href: getExplorerLink(chainId, name !== null && name !== void 0 ? name : address, ExplorerDataType.ADDRESS),
    style: {
      fontSize: "14px"
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "4MNk2N",
    message: "(View on Explorer)"
  }))), /*#__PURE__*/React__default.createElement(Input, {
    className: className,
    type: "text",
    autoComplete: "off",
    autoCorrect: "off",
    autoCapitalize: "off",
    spellCheck: "false",
    placeholder: placeholder !== null && placeholder !== void 0 ? placeholder : i18n._(
    /*i18n*/
    {
      id: "Eg2mpp",
      message: "Wallet Address or ENS name"
    }),
    error: error,
    pattern: "^(0x[a-fA-F0-9]{40})$",
    onChange: handleInput,
    value: value
  })))));
}

export { AddressInputPanel as default };
