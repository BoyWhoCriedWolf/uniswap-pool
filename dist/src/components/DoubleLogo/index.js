import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import styled from 'styled-components';
import CurrencyLogo from '../Logo/CurrencyLogo.js';

var _templateObject, _templateObject2, _templateObject3;
var Wrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  display: flex;\n  flex-direction: row;\n  margin-left: ", ";\n"])), function (_ref) {
  var sizeraw = _ref.sizeraw,
    margin = _ref.margin;
  return margin && (sizeraw / 3 + 8).toString() + "px";
});
var HigherLogoWrapper = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  z-index: 1;\n"])));
var CoveredLogoWapper = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  position: absolute;\n  left: ", " !important;\n"])), function (_ref2) {
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
  return /*#__PURE__*/React__default.createElement(Wrapper, {
    sizeraw: size,
    margin: margin
  }, currency0 && /*#__PURE__*/React__default.createElement(HigherLogoWrapper, null, /*#__PURE__*/React__default.createElement(CurrencyLogo, {
    hideL2Icon: true,
    currency: currency0,
    size: size.toString() + "px"
  })), currency1 && /*#__PURE__*/React__default.createElement(CoveredLogoWapper, {
    sizeraw: size
  }, /*#__PURE__*/React__default.createElement(CurrencyLogo, {
    hideL2Icon: true,
    currency: currency1,
    size: size.toString() + "px"
  })));
}

export { DoubleCurrencyLogo as default };
