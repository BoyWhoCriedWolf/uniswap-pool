'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var wallet_banner_phone_image = require('../../../assets/images/wallet_banner_phone_image.cjs');
var index$2 = require('../../Button/index.cjs');
var index$1 = require('../../Common/index.cjs');
var index = require('../../Row/index.cjs');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var zIndex = require('../../../theme/zIndex.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var PopupContainer = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n\n  ", ";\n\n  background: url(", ");\n  background-repeat: no-repeat;\n  background-position: top 18px right 15px;\n  background-size: 166px;\n\n  :hover {\n    background-size: 170px;\n  }\n  transition: background-size ", "\n    ", ";\n\n  background-color: ", ";\n  color: ", ";\n  position: fixed;\n  z-index: ", ";\n\n  padding: 24px 16px 16px;\n\n  border-radius: 20px;\n  bottom: 20px;\n  right: 20px;\n  width: 390px;\n  height: 164px;\n\n  border: 1px solid ", ";\n\n  box-shadow: ", ";\n\n  @media only screen and (max-width: ", ") {\n    bottom: 62px;\n  }\n\n  @media only screen and (max-width: ", ") {\n    background-position: top 32px right -10px;\n    width: unset;\n    right: 10px;\n    left: 10px;\n    height: 144px;\n  }\n\n  user-select: none;\n"])), function (_ref) {
  var show = _ref.show;
  return !show && "display: none";
}, wallet_banner_phone_image, function (_ref2) {
  var theme = _ref2.theme;
  return theme.transition.duration.medium;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.transition.timing.inOut;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.chain_84531;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.neutral1;
}, zIndex.Z_INDEX.sticky, function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface3;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.deprecated_deepShadow;
}, function (_ref8) {
  var theme = _ref8.theme;
  return "".concat(theme.breakpoint.md, "px");
}, function (_ref9) {
  var theme = _ref9.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var BaseBackgroundImage = styled__default["default"].img(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  top: 0;\n  left: 0;\n  height: 138px;\n  width: 138px;\n"])));
var ButtonRow = styled__default["default"](index["default"])(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  gap: 16px;\n"])));
var StyledXButton = styled__default["default"](reactFeather.X)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  cursor: pointer;\n  position: absolute;\n  top: 21px;\n  right: 17px;\n\n  color: ", ";\n  ", ";\n"])), function (_ref10) {
  var theme = _ref10.theme;
  return theme.white;
}, index$1.OpacityHoverState);
var BannerButton = styled__default["default"](index$2.BaseButton)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  height: 40px;\n  border-radius: 16px;\n  padding: 10px;\n  ", ";\n"])), index$1.OpacityHoverState);

exports.BannerButton = BannerButton;
exports.BaseBackgroundImage = BaseBackgroundImage;
exports.ButtonRow = ButtonRow;
exports.PopupContainer = PopupContainer;
exports.StyledXButton = StyledXButton;
