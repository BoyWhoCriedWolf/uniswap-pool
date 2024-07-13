'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var extensions = require('video-extensions');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var extensions__default = /*#__PURE__*/_interopDefaultLegacy(extensions);

var isVideo = function isVideo(path) {
  return extensions__default["default"].find(function (ext) {
    return path === null || path === void 0 ? void 0 : path.endsWith(".".concat(ext));
  }) !== undefined;
};

exports.isVideo = isVideo;
