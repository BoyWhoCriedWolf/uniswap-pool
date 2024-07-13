'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../Card/index.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var utils = require('../../theme/utils.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var index$1 = require('../Column/index.cjs');
var index$4 = require('../Row/index.cjs');
var index$2 = require('../Tooltip/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var StyledCard = styled__default["default"](index.OutlineCard)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 12px;\n  border: 1px solid ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return utils.opacify(24, theme.critical);
});
function PriceImpactWarning(_ref2) {
  var priceImpact = _ref2.priceImpact;
  var _useFormatter = formatNumbers.useFormatter(),
    formatPriceImpact = _useFormatter.formatPriceImpact;
  var theme = styled.useTheme();
  return /*#__PURE__*/React__default["default"].createElement(StyledCard, null, /*#__PURE__*/React__default["default"].createElement(index$1.AutoColumn, {
    gap: "sm"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.MouseoverTooltip, {
    text: /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
      id: "EDyYqw",
      message: "A swap of this size may have a high price impact, given the current liquidity in the pool. There may be a large difference between the amount of your input token and what you will receive in the output token"
    })
  }, /*#__PURE__*/React__default["default"].createElement(index$4.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(index$4.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedSubHeader, {
    color: theme.critical
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "NF0esC",
    message: "Price impact warning"
  }))), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, {
    textAlign: "right",
    fontSize: 14,
    color: "critical"
  }, formatPriceImpact(priceImpact))))));
}

module.exports = PriceImpactWarning;
