'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../../../node_modules/@lingui/core/dist/index.cjs');
require('@babel/runtime/helpers/slicedToArray');
require('@babel/runtime/helpers/asyncToGenerator');
require('@babel/runtime/regenerator');
require('@uniswap/analytics-events');
require('../../analytics/index.cjs');
require('../../constants/misc.cjs');
require('react-redux');
require('../../state/application/reducer.cjs');
var styled = require('styled-components');
var index = require('../../theme/components/index.cjs');
var zIndex = require('../../theme/zIndex.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  display: flex;\n  background-color: ", ";\n  padding: 20px;\n  border-bottom: 1px solid ", ";\n  z-index: ", ";\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n\n  @media only screen and (max-width: ", ") {\n    flex-direction: column;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, zIndex.Z_INDEX.fixed, function (_ref3) {
  var theme = _ref3.theme;
  return "".concat(theme.breakpoint.md, "px");
});
styled__default["default"](text.ThemedText.BodySecondary)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n\n  @media only screen and (max-width: ", ") {\n    @supports (-webkit-line-clamp: 2) {\n      white-space: initial;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n    }\n  }\n\n  @media only screen and (max-width: ", ") {\n    @supports (-webkit-line-clamp: 3) {\n      white-space: initial;\n      display: -webkit-box;\n      -webkit-line-clamp: 3;\n      -webkit-box-orient: vertical;\n    }\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return "".concat(theme.breakpoint.md, "px");
}, function (_ref5) {
  var theme = _ref5.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
styled__default["default"](index.ButtonText)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  flex-shrink: 0;\n  width: max-content;\n\n  :focus {\n    text-decoration: none;\n  }\n"])));
var bannerText = index$1.i18n._(
/*i18n*/
{
  id: "WnoHbm",
  message: "This web application is provided as a tool for users to interact with the Uniswap Protocol on\ntheir own initiative, with no endorsement or recommendation of cryptocurrency trading activities. In doing so,\nUniswap is not recommending that users or potential users engage in cryptoasset trading activity, and users or\npotential users of the web application should not regard this webpage or its contents as involving any form of\nrecommendation, invitation or inducement to deal in cryptoassets."
});

exports.bannerText = bannerText;
