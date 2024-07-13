'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../../node_modules/@lingui/react/dist/index.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var Divider = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  height: 1px;\n  border-width: 0;\n  margin: 12px 0;\n  background-color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
});
function OutputTaxTooltipBody(_ref2) {
  var currencySymbol = _ref2.currencySymbol;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, {
    color: "textPrimary"
  }, /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "xR+oyM",
    message: "Exact input only"
  })), /*#__PURE__*/React__default["default"].createElement(Divider, null), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelMicro, {
    color: "textPrimary"
  }, currencySymbol ? /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "n7SHzO",
    message: "{currencySymbol} fees don't allow for accurate exact outputs. Use the `You pay` field instead.",
    values: {
      currencySymbol: currencySymbol
    }
  }) : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "pl9Brs",
    message: "Fees on the selected output token don't allow for accurate exact outputs. Use the `You pay` field instead."
  })));
}

exports.OutputTaxTooltipBody = OutputTaxTooltipBody;
