import React__default from 'react';
import noop from '../../../utils/noop.js';
import { Box } from '../Box.js';
import { overlay } from './Overlay.css.js';

var stopPropagation = function stopPropagation(event) {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
};
var Overlay = function Overlay(_ref) {
  var _ref$onClick = _ref.onClick,
    onClick = _ref$onClick === void 0 ? noop : _ref$onClick;
  return /*#__PURE__*/React__default.createElement(Box, {
    className: overlay,
    onClick: onClick
  });
};

export { Overlay, stopPropagation };
