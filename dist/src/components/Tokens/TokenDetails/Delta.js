import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { ArrowChangeDown } from '../../Icons/ArrowChangeDown.js';
import { ArrowChangeUp } from '../../Icons/ArrowChangeUp.js';
import styled from 'styled-components';

var _templateObject, _templateObject2, _templateObject3;
var StyledUpArrow = styled(ArrowChangeUp)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme,
    $noColor = _ref.$noColor;
  return $noColor ? theme.neutral2 : theme.success;
});
var StyledDownArrow = styled(ArrowChangeDown)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme,
    $noColor = _ref2.$noColor;
  return $noColor ? theme.neutral2 : theme.critical;
});
function isValidDelta(delta) {
  // Null-check not including zero
  return delta !== null && delta !== undefined && delta !== Infinity && !isNaN(delta);
}
function DeltaArrow(_ref3) {
  var delta = _ref3.delta,
    _ref3$noColor = _ref3.noColor,
    noColor = _ref3$noColor === void 0 ? false : _ref3$noColor,
    _ref3$size = _ref3.size,
    size = _ref3$size === void 0 ? 16 : _ref3$size;
  if (!isValidDelta(delta)) return null;
  return Math.sign(delta) < 0 ? /*#__PURE__*/React__default.createElement(StyledDownArrow, {
    width: size,
    height: size,
    key: "arrow-down",
    "aria-label": "down",
    $noColor: noColor
  }) : /*#__PURE__*/React__default.createElement(StyledUpArrow, {
    width: size,
    height: size,
    key: "arrow-up",
    "aria-label": "up",
    $noColor: noColor
  });
}
styled.span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  color: ", ";\n"])), function (_ref4) {
  var theme = _ref4.theme,
    delta = _ref4.delta;
  return delta !== undefined ? Math.sign(delta) < 0 ? theme.critical : theme.success : theme.neutral1;
});

export { DeltaArrow };
