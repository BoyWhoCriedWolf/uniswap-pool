'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var dialog = require('@reach/dialog');
var React = require('react');
var reactSpring = require('react-spring');
var reactUseGesture = require('react-use-gesture');
var styled = require('styled-components');
var zIndex = require('../../theme/zIndex.cjs');
var userAgent = require('../../utils/userAgent.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var MODAL_TRANSITION_DURATION = 200;
var AnimatedDialogOverlay = reactSpring.animated(dialog.DialogOverlay);
var StyledDialogOverlay = styled__default["default"](AnimatedDialogOverlay)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  &[data-reach-dialog-overlay] {\n    z-index: ", ";\n    background-color: transparent;\n    overflow: hidden;\n\n    display: flex;\n    align-items: center;\n    @media screen and (max-width: ", "px) {\n      align-items: flex-end;\n    }\n    overflow-y: ", ";\n    justify-content: center;\n\n    background-color: ", ";\n  }\n"])), zIndex.Z_INDEX.modalBackdrop, function (_ref) {
  var theme = _ref.theme;
  return theme.breakpoint.sm;
}, function (_ref2) {
  var $scrollOverlay = _ref2.$scrollOverlay;
  return $scrollOverlay && "scroll";
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.scrim;
});
var AnimatedDialogContent = reactSpring.animated(dialog.DialogContent);
var StyledDialogContent = styled__default["default"](AnimatedDialogContent)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  overflow-y: auto;\n\n  &[data-reach-dialog-content] {\n    margin: auto;\n    background-color: ", ";\n    border: ", ";\n    box-shadow: ", ";\n    padding: 0px;\n    width: 50vw;\n    overflow-y: auto;\n    overflow-x: hidden;\n    max-width: ", "px;\n    ", "\n    ", "\n    display: ", ";\n    border-radius: 20px;\n\n    @media screen and (max-width: ", "px) {\n      width: 65vw;\n    }\n    @media screen and (max-width: ", "px) {\n      margin: 0;\n      width: 100vw;\n      border-radius: 20px;\n      border-bottom-left-radius: 0;\n      border-bottom-right-radius: 0;\n    }\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface2;
}, function (_ref5) {
  var theme = _ref5.theme,
    $hideBorder = _ref5.$hideBorder;
  return !$hideBorder && "1px solid ".concat(theme.surface3);
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.deprecated_deepShadow;
}, function (_ref7) {
  var $maxWidth = _ref7.$maxWidth;
  return $maxWidth;
}, function (_ref8) {
  var $maxHeight = _ref8.$maxHeight;
  return $maxHeight && styled.css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n        max-height: ", "vh;\n      "])), $maxHeight);
}, function (_ref9) {
  var $minHeight = _ref9.$minHeight;
  return $minHeight && styled.css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n        min-height: ", "vh;\n      "])), $minHeight);
}, function (_ref10) {
  var $scrollOverlay = _ref10.$scrollOverlay;
  return $scrollOverlay ? "inline-table" : "flex";
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.breakpoint.md;
}, function (_ref12) {
  var theme = _ref12.theme;
  return theme.breakpoint.sm;
});
function Modal(_ref13) {
  var isOpen = _ref13.isOpen,
    onDismiss = _ref13.onDismiss,
    _ref13$minHeight = _ref13.minHeight,
    minHeight = _ref13$minHeight === void 0 ? false : _ref13$minHeight,
    _ref13$maxHeight = _ref13.maxHeight,
    maxHeight = _ref13$maxHeight === void 0 ? 90 : _ref13$maxHeight,
    _ref13$maxWidth = _ref13.maxWidth,
    maxWidth = _ref13$maxWidth === void 0 ? 420 : _ref13$maxWidth,
    height = _ref13.height,
    initialFocusRef = _ref13.initialFocusRef,
    children = _ref13.children,
    _ref13$onSwipe = _ref13.onSwipe,
    onSwipe = _ref13$onSwipe === void 0 ? onDismiss : _ref13$onSwipe,
    $scrollOverlay = _ref13.$scrollOverlay,
    _ref13$hideBorder = _ref13.hideBorder,
    hideBorder = _ref13$hideBorder === void 0 ? false : _ref13$hideBorder;
  var fadeTransition = reactSpring.useTransition(isOpen, {
    config: {
      duration: MODAL_TRANSITION_DURATION
    },
    from: {
      opacity: 0
    },
    enter: {
      opacity: 1
    },
    leave: {
      opacity: 0
    }
  });
  var _useSpring = reactSpring.useSpring(function () {
      return {
        y: 0,
        config: {
          mass: 1,
          tension: 210,
          friction: 20
        }
      };
    }),
    _useSpring2 = _slicedToArray__default["default"](_useSpring, 2),
    y = _useSpring2[0].y,
    set = _useSpring2[1];
  var bind = reactUseGesture.useGesture({
    onDrag: function onDrag(state) {
      set({
        y: state.down ? state.movement[1] : 0
      });
      if (state.movement[1] > 300 || state.velocity > 3 && state.direction[1] > 0) {
        onSwipe === null || onSwipe === void 0 || onSwipe();
      }
    }
  });
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, fadeTransition(function (_ref14, item) {
    var opacity = _ref14.opacity;
    return item && /*#__PURE__*/React__default["default"].createElement(StyledDialogOverlay, {
      style: {
        opacity: opacity.to({
          range: [0.0, 1.0],
          output: [0, 1]
        })
      },
      onDismiss: onDismiss,
      initialFocusRef: initialFocusRef,
      unstable_lockFocusAcrossFrames: false,
      $scrollOverlay: $scrollOverlay
    }, /*#__PURE__*/React__default["default"].createElement(StyledDialogContent, _extends__default["default"]({}, userAgent.isMobile ? _objectSpread(_objectSpread({}, bind()), {}, {
      style: {
        transform: y.interpolate(function (y) {
          return "translateY(".concat(y > 0 ? y : 0, "px)");
        })
      }
    }) : {}, {
      "aria-label": "dialog",
      $minHeight: height !== null && height !== void 0 ? height : minHeight,
      $maxHeight: height !== null && height !== void 0 ? height : maxHeight,
      $scrollOverlay: $scrollOverlay,
      $hideBorder: hideBorder,
      $maxWidth: maxWidth
    }), !initialFocusRef && userAgent.isMobile ? /*#__PURE__*/React__default["default"].createElement("div", {
      tabIndex: 1
    }) : null, children));
  }));
}

exports.MODAL_TRANSITION_DURATION = MODAL_TRANSITION_DURATION;
exports["default"] = Modal;
