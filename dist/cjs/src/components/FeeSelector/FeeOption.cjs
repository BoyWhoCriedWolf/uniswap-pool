'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../Button/index.cjs');
var index$1 = require('../Column/index.cjs');
var React = require('react');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var FeeTierPercentageBadge = require('./FeeTierPercentageBadge.cjs');
var shared = require('./shared.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var ResponsiveText = styled__default["default"](text.ThemedText.DeprecatedLabel)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  line-height: 16px;\n  font-size: 14px;\n\n  ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n    font-size: 12px;\n    line-height: 12px;\n  "])));
});
function FeeOption(_ref2) {
  var feeAmount = _ref2.feeAmount,
    active = _ref2.active,
    poolState = _ref2.poolState,
    distributions = _ref2.distributions,
    onClick = _ref2.onClick;
  return /*#__PURE__*/React__default["default"].createElement(index.ButtonRadioChecked, {
    active: active,
    onClick: onClick
  }, /*#__PURE__*/React__default["default"].createElement(index$1.AutoColumn, {
    gap: "sm",
    justify: "flex-start"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.AutoColumn, {
    justify: "flex-start",
    gap: "6px"
  }, /*#__PURE__*/React__default["default"].createElement(ResponsiveText, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "hbO8db",
    message: "{0}%",
    values: {
      "0": shared.FEE_AMOUNT_DETAIL[feeAmount].label
    }
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    fontWeight: 485,
    fontSize: "12px",
    textAlign: "left"
  }, shared.FEE_AMOUNT_DETAIL[feeAmount].description)), distributions && /*#__PURE__*/React__default["default"].createElement(FeeTierPercentageBadge.FeeTierPercentageBadge, {
    distributions: distributions,
    feeAmount: feeAmount,
    poolState: poolState
  })));
}

exports.FeeOption = FeeOption;
