'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled = require('styled-components');
var CurrencyLogo = require('../Logo/CurrencyLogo.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
var Wrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  display: flex;\n  flex-direction: row;\n  margin-left: ", ";\n"])), function (_ref) {
  var sizeraw = _ref.sizeraw,
    margin = _ref.margin;
  return margin && (sizeraw / 3 + 8).toString() + "px";
});
var HigherLogoWrapper = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  z-index: 1;\n"])));
var CoveredLogoWapper = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  left: ", " !important;\n"])), function (_ref2) {
  var sizeraw = _ref2.sizeraw;
  return "-" + (sizeraw / 2).toString() + "px";
});
function DoubleCurrencyLogo(_ref3) {
  var currency0 = _ref3.currency0,
    currency1 = _ref3.currency1,
    _ref3$size = _ref3.size,
    size = _ref3$size === void 0 ? 16 : _ref3$size,
    _ref3$margin = _ref3.margin,
    margin = _ref3$margin === void 0 ? false : _ref3$margin;
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, {
    sizeraw: size,
    margin: margin
  }, currency0 && /*#__PURE__*/React__default["default"].createElement(HigherLogoWrapper, null, /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
    hideL2Icon: true,
    currency: currency0,
    size: size.toString() + "px"
  })), currency1 && /*#__PURE__*/React__default["default"].createElement(CoveredLogoWapper, {
    sizeraw: size
  }, /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
    hideL2Icon: true,
    currency: currency1,
    size: size.toString() + "px"
  })));
}

module.exports = DoubleCurrencyLogo;
