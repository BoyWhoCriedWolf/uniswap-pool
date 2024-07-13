'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function useSubscribeScrollState() {
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    userCanScroll = _useState2[0],
    setUserCanScroll = _useState2[1];
  var _useState3 = React.useState(0),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    scrollProgress = _useState4[0],
    setScrollProgress = _useState4[1];
  var scrollRef = function scrollRef(node) {
    if (node !== null) {
      var canScroll = node.scrollHeight > node.clientHeight;
      canScroll !== userCanScroll && setUserCanScroll(canScroll);
    }
  };
  var scrollHandler = function scrollHandler(event) {
    var scrollTop = event.currentTarget.scrollTop;
    var containerHeight = event.currentTarget.clientHeight;
    var scrollHeight = event.currentTarget.scrollHeight;
    setScrollProgress(scrollTop ? (scrollTop + containerHeight) / scrollHeight * 100 : 0);
  };
  return {
    scrollRef: scrollRef,
    scrollHandler: scrollHandler,
    scrollProgress: scrollProgress,
    userCanScroll: userCanScroll
  };
}

exports.useSubscribeScrollState = useSubscribeScrollState;
