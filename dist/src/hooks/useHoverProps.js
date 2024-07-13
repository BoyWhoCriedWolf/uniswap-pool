import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useState } from 'react';

function useHoverProps() {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    hover = _useState2[0],
    setHover = _useState2[1];
  var hoverProps = {
    onMouseEnter: function onMouseEnter() {
      return setHover(true);
    },
    onMouseLeave: function onMouseLeave() {
      return setHover(false);
    }
  };
  return [hover, hoverProps];
}

export { useHoverProps as default };
