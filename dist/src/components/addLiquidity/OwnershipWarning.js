import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { AlertTriangle } from 'react-feather';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3;
var ExplainerText = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var TitleRow = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n  color: ", ";\n  margin-bottom: 8px;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_accentWarning;
});
var Wrapper = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 16px;\n  margin-top: 12px;\n  max-width: 480px;\n  padding: 12px 20px;\n  width: 100%;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_accentWarningSoft;
});
var OwnershipWarning = function OwnershipWarning(_ref4) {
  var ownerAddress = _ref4.ownerAddress;
  return /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement(TitleRow, null, /*#__PURE__*/React__default.createElement(AlertTriangle, {
    style: {
      marginRight: "8px"
    }
  }), /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, {
    color: "deprecated_accentWarning"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "r6y+jM",
    message: "Warning"
  }))), /*#__PURE__*/React__default.createElement(ExplainerText, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "7o/WJ5",
    message: "You are not the owner of this LP position. You will not be able to withdraw the liquidity from this position unless you own the following address: {ownerAddress}",
    values: {
      ownerAddress: ownerAddress
    }
  })));
};

export { OwnershipWarning as default };
