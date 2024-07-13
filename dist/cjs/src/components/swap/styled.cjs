'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var polished = require('polished');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var zIndex = require('../../theme/zIndex.cjs');
var ThemeToggle = require('../../theme/components/ThemeToggle.cjs');
var index = require('../Column/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 8px;\n  width: 100%;\n"])));

// Mostly copied from `AppBody` but it was getting too hard to maintain backwards compatibility.
var SwapWrapperOuter = styled__default["default"].main(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  z-index: ", ";\n  transition: transform 250ms ease;\n\n  &:before {\n    content: \" \";\n    display: flex;\n    position: absolute;\n    inset: 0;\n    transform: scale(1.1);\n    filter: blur(50px);\n    background-color: rgba(252, 114, 255, 0.075);\n    z-index: -2;\n  }\n"])), zIndex.Z_INDEX["default"]);
var SwapWrapper = function SwapWrapper(props) {
  return /*#__PURE__*/React__default["default"].createElement(SwapWrapperOuter, props, /*#__PURE__*/React__default["default"].createElement(SwapWrapperInner, null, props.children));
};
var SwapWrapperInner = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 24px;\n  z-index: -1;\n"])));
var UniswapPopoverContainer = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  padding: 18px;\n  color: ", ";\n  font-weight: 485;\n  font-size: 12px;\n  line-height: 16px;\n  word-break: break-word;\n  background: ", ";\n  border-radius: 20px;\n  border: 1px solid ", ";\n  box-shadow: 0 4px 8px 0 ", ";\n  position: relative;\n  overflow: hidden;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface1;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
}, function (_ref4) {
  var theme = _ref4.theme;
  return polished.transparentize(0.9, theme.shadow1);
});
var springDownKeyframes = "@keyframes spring-down {\n  0% { transform: translateY(-80px); }\n  25% { transform: translateY(4px); }\n  50% { transform: translateY(-1px); }\n  75% { transform: translateY(0px); }\n  100% { transform: translateY(0px); }\n}";
var backUpKeyframes = "@keyframes back-up {\n  0% { transform: translateY(0px); }\n  100% { transform: translateY(-80px); }\n}";
var UniswapXShine = function UniswapXShine(props) {
  var isDarkMode = ThemeToggle.useIsDarkMode();
  return /*#__PURE__*/React__default["default"].createElement(UniswapXShineInner, _extends__default["default"]({}, props, {
    style: _objectSpread({
      opacity: isDarkMode ? 0.15 : 0.05
    }, props.style)
  }));
};
var UniswapXShineInner = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: -1;\n  pointer-events: none;\n  background: linear-gradient(\n    130deg,\n    transparent 20%,\n    ", ",\n    transparent 80%\n  );\n  opacity: 0.15;\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.accent1;
});

// overflow hidden to hide the SwapMustacheShadow
var SwapOptInSmallContainer = styled__default["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  visibility: ", ";\n  overflow: hidden;\n  margin-top: -14px;\n  transform: translateY(", "px);\n  transition: all ease 400ms;\n  animation: ", ";\n\n  ", "\n  ", "\n"])), function (_ref6) {
  var visible = _ref6.visible;
  return visible ? "visible" : "hidden";
}, function (_ref7) {
  var visible = _ref7.visible;
  return visible ? 0 : -80;
}, function (_ref8) {
  var visible = _ref8.visible,
    shouldAnimate = _ref8.shouldAnimate;
  return !shouldAnimate ? "" : visible ? "spring-down 900ms ease forwards" : "back-up 200ms ease forwards";
}, springDownKeyframes, backUpKeyframes);
var UniswapXOptInLargeContainerPositioner = styled__default["default"].div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  top: 211px;\n  right: ", "px;\n  width: 320px;\n  align-items: center;\n  min-height: 170px;\n  display: flex;\n  pointer-events: none;\n"])), -320 - 15);
var UniswapXOptInLargeContainer = styled__default["default"].div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  opacity: ", ";\n  transform: ", ";\n  transition: all ease-in 300ms;\n  transition-delay: ", ";\n  pointer-events: ", ";\n"])), function (_ref9) {
  var visible = _ref9.visible;
  return visible ? 1 : 0;
}, function (_ref10) {
  var visible = _ref10.visible;
  return "translateY(".concat(visible ? 0 : -6, "px)");
}, function (_ref11) {
  var visible = _ref11.visible;
  return visible ? "350ms" : "0";
}, function (_ref12) {
  var visible = _ref12.visible;
  return visible ? "auto" : "none";
});
var SwapMustache = styled__default["default"].main(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  background: ", ";\n  border-radius: 16px;\n  border-top-left-radius: 0;\n  border-top-right-radius: 0;\n  border: 1px solid ", ";\n  border-top-width: 0;\n  padding: 18px;\n  padding-top: calc(12px + 18px);\n  z-index: 0;\n  transition: transform 250ms ease;\n"])), function (_ref13) {
  var theme = _ref13.theme;
  return theme.surface1;
}, function (_ref14) {
  var theme = _ref14.theme;
  return theme.surface3;
});
var SwapMustacheShadow = styled__default["default"].main(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  top: 0;\n  left: 0;\n  border-radius: 16px;\n  height: 100%;\n  width: 100%;\n  transform: translateY(-100%);\n  box-shadow: 0 0 20px 20px ", ";\n  background: red;\n"])), function (_ref15) {
  var theme = _ref15.theme;
  return theme.surface2;
});
var ArrowWrapper = styled__default["default"].div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  // border-radius: 12px;\n  height: 32px;\n  width: 32px;\n  position: relative;\n  margin-top: -18px;\n  margin-bottom: -18px;\n  margin-left: auto;\n  margin-right: auto;\n  // background-color: ", ";\n  // border: 4px solid;\n  // border-color: ", ";\n\n  z-index: 2;\n  ", "\n"])), function (_ref16) {
  var theme = _ref16.theme;
  return theme.surface2;
}, function (_ref17) {
  var theme = _ref17.theme;
  return theme.surface1;
}, function (_ref18) {
  var clickable = _ref18.clickable;
  return clickable ? styled.css(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n          :hover {\n            cursor: pointer;\n            opacity: 0.8;\n          }\n        "]))) : null;
});

// styles
styled__default["default"].span(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral__default["default"](["\n  &::after {\n    display: inline-block;\n    animation: ellipsis 1.25s infinite;\n    content: \".\";\n    width: 1em;\n    text-align: left;\n  }\n  @keyframes ellipsis {\n    0% {\n      content: \".\";\n    }\n    33% {\n      content: \"..\";\n    }\n    66% {\n      content: \"...\";\n    }\n  }\n"])));
var SwapCallbackErrorInner = styled__default["default"].div(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border-radius: 1rem;\n  display: flex;\n  align-items: center;\n  font-size: 0.825rem;\n  width: 100%;\n  padding: 3rem 1.25rem 1rem 1rem;\n  margin-top: -2rem;\n  color: ", ";\n  z-index: -1;\n  p {\n    padding: 0;\n    margin: 0;\n    font-weight: 535;\n  }\n"])), function (_ref19) {
  var theme = _ref19.theme;
  return polished.transparentize(0.9, theme.critical);
}, function (_ref20) {
  var theme = _ref20.theme;
  return theme.critical;
});
var SwapCallbackErrorInnerAlertTriangle = styled__default["default"].div(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  margin-right: 12px;\n  border-radius: 12px;\n  min-width: 48px;\n  height: 48px;\n"])), function (_ref21) {
  var theme = _ref21.theme;
  return polished.transparentize(0.9, theme.critical);
});
function SwapCallbackError(_ref22) {
  var error = _ref22.error;
  return /*#__PURE__*/React__default["default"].createElement(SwapCallbackErrorInner, null, /*#__PURE__*/React__default["default"].createElement(SwapCallbackErrorInnerAlertTriangle, null, /*#__PURE__*/React__default["default"].createElement(reactFeather.AlertTriangle, {
    size: 24
  })), /*#__PURE__*/React__default["default"].createElement("p", {
    style: {
      wordBreak: "break-word"
    }
  }, error));
}
var SwapShowAcceptChanges = styled__default["default"](index.AutoColumn)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  color: ", ";\n  padding: 12px;\n  border-radius: 12px;\n  margin-top: 8px;\n"])), function (_ref23) {
  var theme = _ref23.theme;
  return polished.transparentize(0.95, theme.accent1);
}, function (_ref24) {
  var theme = _ref24.theme;
  return theme.accent1;
});

exports.ArrowWrapper = ArrowWrapper;
exports.SwapCallbackError = SwapCallbackError;
exports.SwapMustache = SwapMustache;
exports.SwapMustacheShadow = SwapMustacheShadow;
exports.SwapOptInSmallContainer = SwapOptInSmallContainer;
exports.SwapShowAcceptChanges = SwapShowAcceptChanges;
exports.SwapWrapper = SwapWrapper;
exports.UniswapPopoverContainer = UniswapPopoverContainer;
exports.UniswapXOptInLargeContainer = UniswapXOptInLargeContainer;
exports.UniswapXOptInLargeContainerPositioner = UniswapXOptInLargeContainerPositioner;
exports.UniswapXShine = UniswapXShine;
