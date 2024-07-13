import _extends from '@babel/runtime/helpers/extends';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import clsx from 'clsx';
import { Box } from '../Box.js';
import { ApprovedCheckmarkIcon } from '../icons.js';
import React__default from 'react';
import { checkbox, input, checkMark, checkMarkActive } from './Checkbox.css.js';

var _excluded = ["hovered", "children"];
var Checkbox = function Checkbox(_ref) {
  var hovered = _ref.hovered,
    children = _ref.children,
    props = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React__default.createElement(Box, {
    as: "label",
    display: "flex",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    lineHeight: "1"
  }, children, /*#__PURE__*/React__default.createElement(Box, {
    as: "span",
    borderColor: props.checked || hovered ? "accent1" : "neutral2",
    className: checkbox,
    background: props.checked ? "accent1" : undefined
    // This element is purely decorative so
    // we hide it for screen readers
    ,
    "aria-hidden": "true"
  }), /*#__PURE__*/React__default.createElement("input", _extends({}, props, {
    className: input,
    type: "checkbox"
  })), /*#__PURE__*/React__default.createElement(ApprovedCheckmarkIcon, {
    className: clsx(checkMark, props.checked && checkMarkActive)
  }));
};

export { Checkbox };
