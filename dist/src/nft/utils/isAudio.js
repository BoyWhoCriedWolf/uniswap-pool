var set = new Set(["mp3", "wav"]);
var isAudio = function isAudio(file) {
  if (!file) return false;
  var fileType = file.substring(file.lastIndexOf(".") + 1);
  return set.has(fileType);
};

export { isAudio };
