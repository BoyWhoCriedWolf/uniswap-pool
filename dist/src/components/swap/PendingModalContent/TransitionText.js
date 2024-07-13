import React__default, { useState, useEffect, useRef } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useUnmountingAnimation } from '../../../hooks/useUnmountingAnimation.js';
import styled from 'styled-components';
import { slideInAnimation, slideOutAnimation } from './animations.js';
import { AnimationType } from './Logos.js';

var _templateObject, _templateObject2, _templateObject3;
var Container = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  width: 100%;\n  min-height: 30px;\n"])));
var InitialTextContainer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  transition: display\n    ", ";\n  ", "\n  &.", " {\n    ", "\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.transition.duration.fast, " ").concat(theme.transition.timing.inOut);
}, slideInAnimation, AnimationType.EXITING, slideOutAnimation);
var TransitionTextContainer = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  transition: display\n    ", ";\n  ", "\n  &.", " {\n    ", "\n  }\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.transition.duration.fast, " ").concat(theme.transition.timing.inOut);
}, slideInAnimation, AnimationType.EXITING, slideOutAnimation);
function TransitionText(_ref3) {
  var initialText = _ref3.initialText,
    transitionText = _ref3.transitionText,
    _ref3$transitionTimeM = _ref3.transitionTimeMs,
    transitionTimeMs = _ref3$transitionTimeM === void 0 ? 1500 : _ref3$transitionTimeM,
    onTransition = _ref3.onTransition;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    transitioned = _useState2[0],
    setTransitioned = _useState2[1];
  useEffect(function () {
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
  var initialTextRef = useRef(null);
  useUnmountingAnimation(initialTextRef, function () {
    return AnimationType.EXITING;
  });
  return /*#__PURE__*/React__default.createElement(Container, null, !transitioned && /*#__PURE__*/React__default.createElement(InitialTextContainer, {
    ref: initialTextRef
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "SxzZAf",
    message: "{initialText}",
    values: {
      initialText: initialText
    }
  })), transitioned && /*#__PURE__*/React__default.createElement(TransitionTextContainer, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "0WxfR/",
    message: "{transitionText}",
    values: {
      transitionText: transitionText
    }
  })));
}

export { TransitionText };
