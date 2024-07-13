import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _extends from '@babel/runtime/helpers/extends';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import React__default, { useState, useCallback, useRef, useEffect, forwardRef } from 'react';
import styled, { css } from 'styled-components';
import useResizeObserver from 'use-resize-observer';
import { TRANSITION_DURATIONS } from '../../theme/styles.js';
import Row from '../Row/index.js';

var _excluded = ["Icon"],
  _excluded2 = ["Icon", "text", "onConfirm", "onShowConfirm", "onClick", "dismissOnHoverOut", "dismissOnHoverDurationMs"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7;
var IconHoverText = styled.span(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n  position: absolute;\n  top: 28px;\n  border-radius: 8px;\n  transform: translateX(-50%);\n  opacity: 0;\n  font-size: 12px;\n  padding: 5px;\n  left: 10px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var getWidthTransition = function getWidthTransition(_ref2) {
  var theme = _ref2.theme;
  return "width ".concat(theme.transition.timing.inOut, " ").concat(theme.transition.duration.fast);
};
var IconStyles = css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  transition: ", ";\n  border-radius: 12px;\n  display: flex;\n  padding: 0;\n  cursor: pointer;\n  position: relative;\n  overflow: hidden;\n  height: 32px;\n  width: ", ";\n  color: ", ";\n  :hover {\n    background-color: ", ";\n    transition: ", ";\n\n    ", " {\n      opacity: 1;\n    }\n  }\n  :active {\n    background-color: ", ";\n    transition: background-color\n        ", " linear,\n      ", ";\n  }\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface1;
}, getWidthTransition, function (_ref4) {
  var hideHorizontal = _ref4.hideHorizontal;
  return hideHorizontal ? "0px" : "32px";
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.neutral2;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface2;
}, function (_ref7) {
  var _ref7$theme$transitio = _ref7.theme.transition,
    duration = _ref7$theme$transitio.duration,
    timing = _ref7$theme$transitio.timing;
  return "".concat(duration.fast, " background-color ").concat(timing["in"], ", ").concat(getWidthTransition);
}, IconHoverText, function (_ref8) {
  var theme = _ref8.theme;
  return theme.surface1;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.transition.duration.fast;
}, getWidthTransition);
var IconBlockLink = styled.a(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  ", ";\n"])), IconStyles);
var IconBlockButton = styled.button(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  ", ";\n  border: none;\n  outline: none;\n"])), IconStyles);
var IconWrapper = styled.span(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  width: 24px;\n  height: 24px;\n  margin: auto;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n"])));
var IconBlock = /*#__PURE__*/forwardRef(function IconBlock(props, ref) {
  if ("href" in props) {
    return /*#__PURE__*/React__default.createElement(IconBlockLink, _extends({
      ref: ref
    }, props));
  }
  // ignoring 'button' 'type' conflict between React and styled-components
  // @ts-ignore
  return /*#__PURE__*/React__default.createElement(IconBlockButton, _extends({
    ref: ref
  }, props));
});
var IconButton = function IconButton(_ref10) {
  var Icon = _ref10.Icon,
    rest = _objectWithoutProperties(_ref10, _excluded);
  return /*#__PURE__*/React__default.createElement(IconBlock, rest, /*#__PURE__*/React__default.createElement(IconWrapper, null, /*#__PURE__*/React__default.createElement(Icon, {
    size: 24
  })));
};
var TextWrapper = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-shrink: 0;\n  overflow: hidden;\n  min-width: min-content;\n  font-weight: 485;\n"])));
var TextHide = styled.div(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  overflow: hidden;\n  transition: width ", "\n      ", ",\n    max-width ", "\n      ", ";\n"])), function (_ref11) {
  var theme = _ref11.theme;
  return theme.transition.timing.inOut;
}, function (_ref12) {
  var theme = _ref12.theme;
  return theme.transition.duration.fast;
}, function (_ref13) {
  var theme = _ref13.theme;
  return theme.transition.timing.inOut;
}, function (_ref14) {
  var theme = _ref14.theme;
  return theme.transition.duration.fast;
});

/**
 * Allows for hiding and showing some text next to an IconButton
 * Note that for width transitions to animate in CSS we need to always specify the width (no auto)
 * so there's resize observing and measuring going on here.
 */
var IconWithConfirmTextButton = function IconWithConfirmTextButton(_ref15) {
  var Icon = _ref15.Icon,
    text = _ref15.text,
    onConfirm = _ref15.onConfirm,
    onShowConfirm = _ref15.onShowConfirm,
    _onClick = _ref15.onClick,
    dismissOnHoverOut = _ref15.dismissOnHoverOut,
    _ref15$dismissOnHover = _ref15.dismissOnHoverDurationMs,
    dismissOnHoverDurationMs = _ref15$dismissOnHover === void 0 ? TRANSITION_DURATIONS.slow : _ref15$dismissOnHover,
    rest = _objectWithoutProperties(_ref15, _excluded2);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showText = _useState2[0],
    setShowTextWithoutCallback = _useState2[1];
  var _useState3 = useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    frame = _useState4[0],
    setFrame = _useState4[1];
  var frameObserver = useResizeObserver();
  var hiddenObserver = useResizeObserver();
  var setShowText = useCallback(function (val) {
    setShowTextWithoutCallback(val);
    onShowConfirm === null || onShowConfirm === void 0 || onShowConfirm(val);
  }, [onShowConfirm]);
  var dimensionsRef = useRef({
    frame: 0,
    innerText: 0
  });
  var dimensions = function () {
    // once opened, we avoid updating it to prevent constant resize loop
    if (!showText) {
      dimensionsRef.current = {
        frame: frameObserver.width || 0,
        innerText: hiddenObserver.width || 0
      };
    }
    return dimensionsRef.current;
  }();

  // keyboard action to cancel
  useEffect(function () {
    if (typeof window === "undefined") return;
    if (!showText || !frame) return;
    var closeAndPrevent = function closeAndPrevent(e) {
      setShowText(false);
      e.preventDefault();
      e.stopPropagation();
    };
    var clickHandler = function clickHandler(e) {
      var target = e.target;
      var shouldClose = !(target instanceof HTMLElement) || !frame.contains(target);
      if (shouldClose) {
        closeAndPrevent(e);
      }
    };
    var keyHandler = function keyHandler(e) {
      if (e.key === "Escape") {
        closeAndPrevent(e);
      }
    };
    window.addEventListener("click", clickHandler, {
      capture: true
    });
    window.addEventListener("keydown", keyHandler, {
      capture: true
    });
    return function () {
      window.removeEventListener("click", clickHandler, {
        capture: true
      });
      window.removeEventListener("keydown", keyHandler, {
        capture: true
      });
    };
  }, [frame, setShowText, showText]);
  var xPad = showText ? 8 : 0;
  var width = showText ? dimensions.frame + dimensions.innerText + xPad : 32;
  var mouseLeaveTimeout = useRef();
  return /*#__PURE__*/React__default.createElement(IconBlock, _extends({
    ref: function ref(node) {
      frameObserver.ref(node);
      setFrame(node);
    }
  }, rest, {
    style: {
      width: width,
      paddingLeft: xPad,
      paddingRight: xPad
    }
    // @ts-ignore MouseEvent is valid, its a subset of the two mouse events,
    // even manually typing this all out more specifically it still gets mad about any casting for some reason
    ,
    onClick: function onClick(e) {
      if (showText) {
        onConfirm === null || onConfirm === void 0 || onConfirm();
      } else {
        _onClick === null || _onClick === void 0 || _onClick(e);
        setShowText(!showText);
      }
    }
  }, dismissOnHoverOut && {
    onMouseLeave: function onMouseLeave() {
      mouseLeaveTimeout.current = setTimeout(function () {
        setShowText(false);
      }, dismissOnHoverDurationMs);
    },
    onMouseEnter: function onMouseEnter() {
      if (mouseLeaveTimeout.current) {
        clearTimeout(mouseLeaveTimeout.current);
      }
    }
  }), /*#__PURE__*/React__default.createElement(Row, {
    height: "100%",
    gap: "xs"
  }, /*#__PURE__*/React__default.createElement(IconWrapper, null, /*#__PURE__*/React__default.createElement(Icon, {
    width: 24,
    height: 24
  })), /*#__PURE__*/React__default.createElement(TextHide, {
    style: {
      maxWidth: showText ? dimensions.innerText : 0,
      width: showText ? dimensions.innerText : 0,
      // this negative transform offsets for the shift it does due to being 0 width
      transform: showText ? undefined : "translateX(-8px)",
      minWidth: showText ? dimensions.innerText : 0
    }
  }, /*#__PURE__*/React__default.createElement(TextWrapper, {
    ref: hiddenObserver.ref
  }, text))));
};

export { IconHoverText, IconWithConfirmTextButton, IconButton as default };
