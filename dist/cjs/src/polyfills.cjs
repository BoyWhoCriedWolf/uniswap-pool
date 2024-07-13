'use strict';

require('polyfill-object.fromentries');
var resizeObserver = require('@juggle/resize-observer');
var flat = require('array.prototype.flat');
var flatMap = require('array.prototype.flatmap');
var bufferEs6 = require('../node_modules/rollup-plugin-node-polyfills/polyfills/buffer-es6.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var flat__default = /*#__PURE__*/_interopDefaultLegacy(flat);
var flatMap__default = /*#__PURE__*/_interopDefaultLegacy(flatMap);

flat__default["default"].shim();
flatMap__default["default"].shim();
if (!window.Buffer) {
  window.Buffer = bufferEs6.Buffer;
}
if (!window.ResizeObserver) {
  window.ResizeObserver = resizeObserver.ResizeObserver;
}
