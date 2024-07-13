import React__default, { useState, useEffect } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { transparentize } from 'polished';
import styled from 'styled-components';
import noop from '../../utils/noop.js';
import Popover from '../Popover/index.js';

var _excluded = ["text", "open", "close", "disabled", "size"],
  _excluded2 = ["text", "disabled", "children", "onOpen", "forceShow", "timeout"];
var _templateObject;
var TooltipSize = /*#__PURE__*/function (TooltipSize) {
  TooltipSize["ExtraSmall"] = "200px";
  TooltipSize["Small"] = "256px";
  TooltipSize["Large"] = "400px";
  return TooltipSize;
}({});
var getPaddingForSize = function getPaddingForSize(size) {
  switch (size) {
    case TooltipSize.ExtraSmall:
      return "8px";
    case TooltipSize.Small:
      return "12px";
    case TooltipSize.Large:
      return "16px 20px";
  }
};
var TooltipContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  max-width: ", ";\n  width: calc(100vw - 16px);\n  cursor: default;\n  padding: ", ";\n  pointer-events: auto;\n\n  color: ", ";\n  font-weight: 485;\n  font-size: 12px;\n  line-height: 16px;\n  word-break: break-word;\n\n  background: ", ";\n  border-radius: 12px;\n  border: 1px solid ", ";\n  box-shadow: 0 4px 8px 0 ", ";\n"])), function (_ref) {
  var size = _ref.size;
  return size;
}, function (_ref2) {
  var size = _ref2.size;
  return getPaddingForSize(size);
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral1;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface1;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface3;
}, function (_ref6) {
  var theme = _ref6.theme;
  return transparentize(0.9, theme.shadow1);
});
// TODO(WEB-2024)
// Migrate to MouseoverTooltip and move this component inline to MouseoverTooltip
function Tooltip(_ref7) {
  var text = _ref7.text,
    open = _ref7.open,
    close = _ref7.close,
    disabled = _ref7.disabled,
    _ref7$size = _ref7.size,
    size = _ref7$size === void 0 ? TooltipSize.Small : _ref7$size,
    rest = _objectWithoutProperties(_ref7, _excluded);
  return /*#__PURE__*/React__default.createElement(Popover, _extends({
    content: text && /*#__PURE__*/React__default.createElement(TooltipContainer, {
      size: size,
      onMouseEnter: disabled ? noop : open,
      onMouseLeave: disabled ? noop : close
    }, text)
  }, rest));
}

// TODO(WEB-2024)
// Do not pass through PopoverProps. Prefer higher-level interface to control MouseoverTooltip.
function MouseoverTooltip(props) {
  var text = props.text,
    disabled = props.disabled,
    children = props.children,
    onOpen = props.onOpen,
    forceShow = props.forceShow,
    timeout = props.timeout,
    rest = _objectWithoutProperties(props, _excluded2);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  var open = function open() {
    setShow(true);
    onOpen === null || onOpen === void 0 || onOpen();
  };
  var close = function close() {
    return setShow(false);
  };
  useEffect(function () {
    if (show && timeout) {
      var tooltipTimer = setTimeout(function () {
        setShow(false);
      }, timeout);
      return function () {
        clearTimeout(tooltipTimer);
      };
    }
    return;
  }, [timeout, show]);
  return /*#__PURE__*/React__default.createElement(Tooltip, _extends({}, rest, {
    open: open,
    close: close,
    disabled: disabled,
    show: forceShow || show,
    text: disabled ? null : text
  }), /*#__PURE__*/React__default.createElement("div", {
    onMouseEnter: disabled ? noop : open,
    onMouseLeave: disabled || timeout ? noop : close
  }, children));
}

export { MouseoverTooltip, TooltipSize, Tooltip as default };
