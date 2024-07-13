import extensions from 'video-extensions';

var isVideo = function isVideo(path) {
  return extensions.find(function (ext) {
    return path === null || path === void 0 ? void 0 : path.endsWith(".".concat(ext));
  }) !== undefined;
};

export { isVideo };
