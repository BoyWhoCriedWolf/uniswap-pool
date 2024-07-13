import { useRef, useEffect } from 'react';

function useOnClickOutside(node, handler) {
  var ignoredNodes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
  var handlerRef = useRef(handler);
  useEffect(function () {
    handlerRef.current = handler;
  }, [handler]);
  useEffect(function () {
    var handleClickOutside = function handleClickOutside(e) {
      var _node$current, _ref;
      var nodeClicked = (_node$current = node.current) === null || _node$current === void 0 ? void 0 : _node$current.contains(e.target);
      var ignoredNodeClicked = ignoredNodes.reduce(function (reducer, val) {
        var _val$current;
        return reducer || !!((_val$current = val.current) !== null && _val$current !== void 0 && _val$current.contains(e.target));
      }, false);
      if ((_ref = nodeClicked || ignoredNodeClicked) !== null && _ref !== void 0 ? _ref : false) {
        return;
      }
      if (handlerRef.current) handlerRef.current();
    };
    document.addEventListener("mousedown", handleClickOutside);
    return function () {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [node, ignoredNodes]);
}

export { useOnClickOutside };
