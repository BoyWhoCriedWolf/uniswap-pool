'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reactDom = require('react-dom');

var Portal = function Portal(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/reactDom.createPortal(children, document.body);
};

exports.Portal = Portal;
