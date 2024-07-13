'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../../../components/Row/index.cjs');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var RemoveIconWrap = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  left: 50%;\n  top: 30px;\n  transform: translateX(-50%);\n  width: 32px;\n  visibility: ", ";\n"])), function (_ref) {
  var hovered = _ref.hovered;
  return hovered ? "visible" : "hidden";
});
var TitleRow = styled__default["default"](index["default"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  justify-content: space-between;\n  margin-bottom: 8px;\n"])));
var SetPriceMethod = /*#__PURE__*/function (SetPriceMethod) {
  SetPriceMethod[SetPriceMethod["SAME_PRICE"] = 0] = "SAME_PRICE";
  SetPriceMethod[SetPriceMethod["FLOOR_PRICE"] = 1] = "FLOOR_PRICE";
  SetPriceMethod[SetPriceMethod["LAST_PRICE"] = 2] = "LAST_PRICE";
  SetPriceMethod[SetPriceMethod["CUSTOM"] = 3] = "CUSTOM";
  return SetPriceMethod;
}({});
var WarningType = /*#__PURE__*/function (WarningType) {
  WarningType[WarningType["BELOW_FLOOR"] = 0] = "BELOW_FLOOR";
  WarningType[WarningType["ALREADY_LISTED"] = 1] = "ALREADY_LISTED";
  WarningType[WarningType["NONE"] = 2] = "NONE";
  return WarningType;
}({});

exports.RemoveIconWrap = RemoveIconWrap;
exports.SetPriceMethod = SetPriceMethod;
exports.TitleRow = TitleRow;
exports.WarningType = WarningType;
