'use strict';

var React = require('react');
var types = require('../../state/routing/types.cjs');
var utils = require('../../state/routing/utils.cjs');
require('../../theme/components/index.cjs');
var UniswapXRouterLabel = require('./UniswapXRouterLabel.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function RouterLabel(_ref) {
  var trade = _ref.trade,
    color = _ref.color;
  if (utils.isUniswapXTrade(trade)) {
    return /*#__PURE__*/React__default["default"].createElement(UniswapXRouterLabel["default"], null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, null, "Uniswap X"));
  }
  if (trade.quoteMethod === types.QuoteMethod.CLIENT_SIDE || trade.quoteMethod === types.QuoteMethod.CLIENT_SIDE_FALLBACK) {
    return /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
      color: color
    }, "Uniswap Client");
  }
  return /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: color
  }, "Uniswap API");
}

module.exports = RouterLabel;
