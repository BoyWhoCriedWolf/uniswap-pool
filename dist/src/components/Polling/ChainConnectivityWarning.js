import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { ChainId } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { getChainInfoOrDefault } from '../../constants/chainInfo.js';
import { AlertTriangle } from 'react-feather';
import styled from 'styled-components';
import { MEDIA_WIDTHS } from '../../theme/index.js';
import { ExternalLink } from '../../theme/components/index.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var BodyRow = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n  font-size: 12px;\n  font-weight: 485;\n  font-size: 14px;\n  line-height: 20px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var CautionTriangle = styled(AlertTriangle)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_accentWarning;
});
var Link = styled(ExternalLink)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  color: ", ";\n  text-decoration: underline;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.black;
});
var TitleRow = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  justify-content: flex-start;\n  margin-bottom: 8px;\n"])));
var TitleText = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  color: ", ";\n  font-weight: 535;\n  font-size: 16px;\n  line-height: 24px;\n  margin: 0px 12px;\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral1;
});
var Wrapper = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 12px;\n  border: 1px solid ", ";\n  bottom: 60px;\n  display: none;\n  max-width: 348px;\n  padding: 16px 20px;\n  position: fixed;\n  right: 16px;\n  @media screen and (min-width: ", "px) {\n    display: block;\n  }\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface1;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface3;
}, MEDIA_WIDTHS.deprecated_upToMedium);
function ChainConnectivityWarning() {
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var info = getChainInfoOrDefault(chainId);
  var label = info === null || info === void 0 ? void 0 : info.label;
  return /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement(TitleRow, null, /*#__PURE__*/React__default.createElement(CautionTriangle, null), /*#__PURE__*/React__default.createElement(TitleText, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "3xf/uJ",
    message: "Network warning"
  }))), /*#__PURE__*/React__default.createElement(BodyRow, null, chainId === ChainId.MAINNET ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "iXzD8t",
    message: "You may have lost your network connection."
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "3Fxw1j",
    message: "{label} might be down right now, or you may have lost your network connection.",
    values: {
      label: label
    }
  }), " ", info.statusPage !== undefined && /*#__PURE__*/React__default.createElement("span", null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "IHlLC8",
    message: "Check network status"
  }), " ", /*#__PURE__*/React__default.createElement(Link, {
    href: info.statusPage || ""
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "jqVo/k",
    message: "here."
  })))));
}

export { ChainConnectivityWarning };
