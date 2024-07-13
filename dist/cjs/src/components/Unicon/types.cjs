'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var Container = require('./Container.cjs');
var Emblem = require('./Emblem.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

var UniconAttributes = /*#__PURE__*/function (UniconAttributes) {
  UniconAttributes[UniconAttributes["GradientStart"] = 0] = "GradientStart";
  UniconAttributes[UniconAttributes["GradientEnd"] = 1] = "GradientEnd";
  UniconAttributes[UniconAttributes["Container"] = 2] = "Container";
  UniconAttributes[UniconAttributes["Shape"] = 3] = "Shape";
  return UniconAttributes;
}({});
var UniconAttributesArray = [UniconAttributes.GradientStart, UniconAttributes.GradientEnd, UniconAttributes.Container, UniconAttributes.Shape];
var gradientStarts = ["#6100FF", "#5065FD", "#36DBFF", "#5CFE9D", "#B1F13C", "#F9F40B", "#FF6F1E", "#F14544", "#FC72FF", "#C0C0C0"];
var blurs = ["#D3EBA3", "#F06DF3", "#9D99F5", "#EDE590", "#B0EDFE", "#FBAA7F", "#C8BB9B", "#9D99F5", "#A26AF3", "#D3EBA3"];
var gradientEnds = ["#D0B2F3", "#BDB8FA", "#63CDE8", "#76D191", "#9BCD46", "#EDE590", "#FBAA7F", "#FEA79B", "#F5A1F5", "#B8C3B7"];
var UniconNumOptions = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, UniconAttributes.GradientStart, gradientStarts.length), UniconAttributes.GradientEnd, gradientEnds.length), UniconAttributes.Container, Container.svgPaths.length), UniconAttributes.Shape, Emblem.svgPaths.length);

exports.UniconAttributes = UniconAttributes;
exports.UniconAttributesArray = UniconAttributesArray;
exports.UniconNumOptions = UniconNumOptions;
exports.blurs = blurs;
exports.gradientEnds = gradientEnds;
exports.gradientStarts = gradientStarts;
