'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var useUnmountingAnimation = require('../../../hooks/useUnmountingAnimation.cjs');
var styled = require('styled-components');
var animations = require('./animations.cjs');
var Logos = require('./Logos.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
var Container = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  width: 100%;\n  min-height: 30px;\n"])));
var InitialTextContainer = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  transition: display\n    ", ";\n  ", "\n  &.", " {\n    ", "\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.transition.duration.fast, " ").concat(theme.transition.timing.inOut);
}, animations.slideInAnimation, Logos.AnimationType.EXITING, animations.slideOutAnimation);
var TransitionTextContainer = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  transition: display\n    ", ";\n  ", "\n  &.", " {\n    ", "\n  }\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.transition.duration.fast, " ").concat(theme.transition.timing.inOut);
}, animations.slideInAnimation, Logos.AnimationType.EXITING, animations.slideOutAnimation);
function TransitionText(_ref3) {
  var initialText = _ref3.initialText,
    transitionText = _ref3.transitionText,
    _ref3$transitionTimeM = _ref3.transitionTimeMs,
    transitionTimeMs = _ref3$transitionTimeM === void 0 ? 1500 : _ref3$transitionTimeM,
    onTransition = _ref3.onTransition;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    transitioned = _useState2[0],
    setTransitioned = _useState2[1];
  React.useEffect(function () {
    // Transition from initial text to transition text.
    var timeout = setTimeout(function () {
      if (!transitioned) {
        setTransitioned(true);
        onTransition === null || onTransition === void 0 || onTransition();
      }
    }, transitionTimeMs);
    return function () {
      return clearTimeout(timeout);
    };
  }, [onTransition, transitionTimeMs, transitioned]);
  var initialTextRef = React.useRef(null);
  useUnmountingAnimation.useUnmountingAnimation(initialTextRef, function () {
    return Logos.AnimationType.EXITING;
  });
  return /*#__PURE__*/React__default["default"].createElement(Container, null, !transitioned && /*#__PURE__*/React__default["default"].createElement(InitialTextContainer, {
    ref: initialTextRef
  }, /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "SxzZAf",
    message: "{initialText}",
    values: {
      initialText: initialText
    }
  })), transitioned && /*#__PURE__*/React__default["default"].createElement(TransitionTextContainer, null, /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "0WxfR/",
    message: "{transitionText}",
    values: {
      transitionText: transitionText
    }
  })));
}

exports.TransitionText = TransitionText;
