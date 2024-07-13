'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var chainInfo = require('../../constants/chainInfo.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index$1 = require('../../theme/index.cjs');
var index = require('../../theme/components/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var BodyRow = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  font-size: 12px;\n  font-weight: 485;\n  font-size: 14px;\n  line-height: 20px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var CautionTriangle = styled__default["default"](reactFeather.AlertTriangle)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_accentWarning;
});
var Link = styled__default["default"](index.ExternalLink)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  text-decoration: underline;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.black;
});
var TitleRow = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  display: flex;\n  justify-content: flex-start;\n  margin-bottom: 8px;\n"])));
var TitleText = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  font-weight: 535;\n  font-size: 16px;\n  line-height: 24px;\n  margin: 0px 12px;\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral1;
});
var Wrapper = styled__default["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border-radius: 12px;\n  border: 1px solid ", ";\n  bottom: 60px;\n  display: none;\n  max-width: 348px;\n  padding: 16px 20px;\n  position: fixed;\n  right: 16px;\n  @media screen and (min-width: ", "px) {\n    display: block;\n  }\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface1;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface3;
}, index$1.MEDIA_WIDTHS.deprecated_upToMedium);
function ChainConnectivityWarning() {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var info = chainInfo.getChainInfoOrDefault(chainId);
  var label = info === null || info === void 0 ? void 0 : info.label;
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(TitleRow, null, /*#__PURE__*/React__default["default"].createElement(CautionTriangle, null), /*#__PURE__*/React__default["default"].createElement(TitleText, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "3xf/uJ",
    message: "Network warning"
  }))), /*#__PURE__*/React__default["default"].createElement(BodyRow, null, chainId === sdkCore.ChainId.MAINNET ? /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "iXzD8t",
    message: "You may have lost your network connection."
  }) : /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "3Fxw1j",
    message: "{label} might be down right now, or you may have lost your network connection.",
    values: {
      label: label
    }
  }), " ", info.statusPage !== undefined && /*#__PURE__*/React__default["default"].createElement("span", null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "IHlLC8",
    message: "Check network status"
  }), " ", /*#__PURE__*/React__default["default"].createElement(Link, {
    href: info.statusPage || ""
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "jqVo/k",
    message: "here."
  })))));
}

exports.ChainConnectivityWarning = ChainConnectivityWarning;
