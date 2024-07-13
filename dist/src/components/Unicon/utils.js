import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { isAddress } from 'ethers/lib/utils';
import { svgPaths } from './Container.js';
import { svgPaths as svgPaths$1 } from './Emblem.js';
import { UniconAttributes, UniconNumOptions, UniconAttributesArray, gradientStarts, gradientEnds } from './types.js';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var NUM_CHARS_TO_USE_PER_ATTRIBUTE = 2;
var isEthAddress = function isEthAddress(address) {
  return address.startsWith("0x") && isAddress(address.toLowerCase());
};
var deriveUniconAttributeIndices = function deriveUniconAttributeIndices(address) {
  var randomSeed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!isEthAddress(address)) return;
  var hexAddr = address.slice(-40);
  var newIndices = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, UniconAttributes.GradientStart, 0), UniconAttributes.GradientEnd, 0), UniconAttributes.Container, 0), UniconAttributes.Shape, 0);
  var _iterator = _createForOfIteratorHelper(UniconAttributesArray),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var a = _step.value;
      var optionHex = hexAddr.slice(NUM_CHARS_TO_USE_PER_ATTRIBUTE * a, NUM_CHARS_TO_USE_PER_ATTRIBUTE * (a + 1));
      var optionDec = parseInt(optionHex, 16) + randomSeed;
      var optionIndex = optionDec % UniconNumOptions[a];
      newIndices[a] = optionIndex;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return newIndices;
};
var getUniconAttributeData = function getUniconAttributeData(attributeIndices) {
  return _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, UniconAttributes.GradientStart, gradientStarts[attributeIndices[UniconAttributes.GradientStart]]), UniconAttributes.GradientEnd, gradientEnds[attributeIndices[UniconAttributes.GradientEnd]]), UniconAttributes.Container, svgPaths[attributeIndices[UniconAttributes.Container]]), UniconAttributes.Shape, svgPaths$1[attributeIndices[UniconAttributes.Shape]]);
};

export { deriveUniconAttributeIndices, getUniconAttributeData, isEthAddress };
