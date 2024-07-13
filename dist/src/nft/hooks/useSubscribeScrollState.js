import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { useState } from 'react';

function useSubscribeScrollState() {
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    userCanScroll = _useState2[0],
    setUserCanScroll = _useState2[1];
  var _useState3 = useState(0),
    _useState4 = _slicedToArray(_useState3, 2),
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

export { useSubscribeScrollState };
