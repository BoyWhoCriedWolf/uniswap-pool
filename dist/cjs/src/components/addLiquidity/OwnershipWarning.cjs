'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../../node_modules/@lingui/react/dist/index.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
var ExplainerText = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var TitleRow = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  display: flex;\n  flex-direction: row;\n  color: ", ";\n  margin-bottom: 8px;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_accentWarning;
});
var Wrapper = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border-radius: 16px;\n  margin-top: 12px;\n  max-width: 480px;\n  padding: 12px 20px;\n  width: 100%;\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_accentWarningSoft;
});
var OwnershipWarning = function OwnershipWarning(_ref4) {
  var ownerAddress = _ref4.ownerAddress;
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(TitleRow, null, /*#__PURE__*/React__default["default"].createElement(reactFeather.AlertTriangle, {
    style: {
      marginRight: "8px"
    }
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, {
    color: "deprecated_accentWarning"
  }, /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "r6y+jM",
    message: "Warning"
  }))), /*#__PURE__*/React__default["default"].createElement(ExplainerText, null, /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "7o/WJ5",
    message: "You are not the owner of this LP position. You will not be able to withdraw the liquidity from this position unless you own the following address: {ownerAddress}",
    values: {
      ownerAddress: ownerAddress
    }
  })));
};

module.exports = OwnershipWarning;
