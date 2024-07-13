'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function useHoverProps() {
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
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

module.exports = useHoverProps;
