'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled = require('styled-components');
var big_unicorn = require('../../assets/images/big_unicorn.cjs');
var noise = require('../../assets/images/noise.cjs');
var xl_uni = require('../../assets/images/xl_uni.cjs');
var index = require('../Column/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var DataCard = styled__default["default"](index.AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  background: radial-gradient(\n    76.02% 75.41% at 1.84% 0%,\n    #ff007a 0%,\n    #2172e5 100%\n  );\n  border-radius: 12px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n"])));
var CardBGImage = styled__default["default"].span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  background: url(", ");\n  width: 1000px;\n  height: 600px;\n  position: absolute;\n  border-radius: 12px;\n  opacity: 0.4;\n  top: -100px;\n  left: -100px;\n  transform: rotate(-15deg);\n  user-select: none;\n  ", "\n"])), big_unicorn, function (_ref) {
  var desaturate = _ref.desaturate;
  return desaturate && "filter: saturate(0)";
});
var CardBGImageSmaller = styled__default["default"].span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  background: url(", ");\n  width: 1200px;\n  height: 1200px;\n  position: absolute;\n  border-radius: 12px;\n  top: -300px;\n  left: -300px;\n  opacity: 0.4;\n  user-select: none;\n\n  ", "\n"])), xl_uni, function (_ref2) {
  var desaturate = _ref2.desaturate;
  return desaturate && "filter: saturate(0)";
});
var CardNoise = styled__default["default"].span(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  background: url(", ");\n  background-size: cover;\n  mix-blend-mode: overlay;\n  border-radius: 12px;\n  width: 100%;\n  height: 100%;\n  opacity: 0.15;\n  position: absolute;\n  top: 0;\n  left: 0;\n  user-select: none;\n"])), noise);
var CardSection = styled__default["default"](index.AutoColumn)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  padding: 1rem;\n  z-index: 1;\n  opacity: ", ";\n"])), function (_ref3) {
  var disabled = _ref3.disabled;
  return disabled && "0.4";
});
var Break = styled__default["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  background-color: rgba(255, 255, 255, 0.2);\n  height: 1px;\n"])));

exports.Break = Break;
exports.CardBGImage = CardBGImage;
exports.CardBGImageSmaller = CardBGImageSmaller;
exports.CardNoise = CardNoise;
exports.CardSection = CardSection;
exports.DataCard = DataCard;
