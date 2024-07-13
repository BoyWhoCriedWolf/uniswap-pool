import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { svgPaths } from './Container.js';
import { svgPaths as svgPaths$1 } from './Emblem.js';

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
var UniconNumOptions = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, UniconAttributes.GradientStart, gradientStarts.length), UniconAttributes.GradientEnd, gradientEnds.length), UniconAttributes.Container, svgPaths.length), UniconAttributes.Shape, svgPaths$1.length);

export { UniconAttributes, UniconAttributesArray, UniconNumOptions, blurs, gradientEnds, gradientStarts };
