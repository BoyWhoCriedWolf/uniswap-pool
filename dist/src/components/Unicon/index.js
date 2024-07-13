import _extends from '@babel/runtime/helpers/extends';
import React__default, { memo, useMemo } from 'react';
import { useIsDarkMode } from '../../theme/components/ThemeToggle.js';
import { blurs, UniconAttributes } from './types.js';
import { deriveUniconAttributeIndices, isEthAddress, getUniconAttributeData } from './utils.js';

var ORIGINAL_CONTAINER_SIZE = 36;
var EMBLEM_XY_SHIFT = 10;
function PathMask(_ref) {
  var id = _ref.id,
    paths = _ref.paths,
    scale = _ref.scale,
    _ref$shift = _ref.shift,
    shift = _ref$shift === void 0 ? 0 : _ref$shift;
  return /*#__PURE__*/React__default.createElement("mask", {
    id: id
  }, /*#__PURE__*/React__default.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: "white"
  }), /*#__PURE__*/React__default.createElement("g", {
    transform: "scale(".concat(scale, ") \n translate(").concat(shift, ", ").concat(shift, ")")
  }, paths.map(function (pathProps) {
    return /*#__PURE__*/React__default.createElement("path", _extends({
      key: pathProps.d
    }, pathProps, {
      fill: "black"
    }));
  })));
}
function UniconMask(_ref2) {
  var maskId = _ref2.maskId,
    attributeData = _ref2.attributeData,
    size = _ref2.size;
  var shapeMaskId = "shape-".concat(maskId);
  var containerMaskId = "container-".concat(maskId);
  return /*#__PURE__*/React__default.createElement("defs", null, /*#__PURE__*/React__default.createElement(PathMask, {
    id: containerMaskId,
    paths: attributeData[UniconAttributes.Container],
    scale: size / ORIGINAL_CONTAINER_SIZE
  }), /*#__PURE__*/React__default.createElement(PathMask, {
    id: shapeMaskId,
    paths: attributeData[UniconAttributes.Shape],
    scale: size / ORIGINAL_CONTAINER_SIZE,
    shift: EMBLEM_XY_SHIFT
  }), /*#__PURE__*/React__default.createElement("mask", {
    id: maskId
  }, /*#__PURE__*/React__default.createElement("g", {
    fill: "white"
  }, /*#__PURE__*/React__default.createElement("g", {
    mask: "url(#".concat(shapeMaskId, ")")
  }, /*#__PURE__*/React__default.createElement("g", {
    transform: "scale(".concat(size / ORIGINAL_CONTAINER_SIZE, ")")
  }, attributeData[UniconAttributes.Container].map(function (pathProps) {
    return /*#__PURE__*/React__default.createElement("path", _extends({
      key: pathProps.d
    }, pathProps));
  }))), /*#__PURE__*/React__default.createElement("g", {
    mask: "url(#".concat(containerMaskId, ")")
  }, /*#__PURE__*/React__default.createElement("g", {
    transform: "scale(".concat(size / ORIGINAL_CONTAINER_SIZE, ")\n        translate(10, 10)")
  }, attributeData[UniconAttributes.Shape].map(function (pathProps) {
    return /*#__PURE__*/React__default.createElement("path", _extends({
      key: pathProps.d
    }, pathProps));
  }))))));
}
function UniconGradient(_ref3) {
  var gradientId = _ref3.gradientId,
    attributeData = _ref3.attributeData;
  return /*#__PURE__*/React__default.createElement("linearGradient", {
    id: gradientId
  }, /*#__PURE__*/React__default.createElement("stop", {
    offset: "0%",
    stopColor: attributeData[UniconAttributes.GradientStart]
  }), /*#__PURE__*/React__default.createElement("stop", {
    offset: "100%",
    stopColor: attributeData[UniconAttributes.GradientEnd]
  }));
}
function UniconBlur(_ref4) {
  var blurId = _ref4.blurId,
    size = _ref4.size;
  return /*#__PURE__*/React__default.createElement("filter", {
    id: blurId,
    x: "-50%",
    y: "-50%",
    height: "200%",
    width: "200%"
  }, /*#__PURE__*/React__default.createElement("feGaussianBlur", {
    "in": "SourceGraphic",
    stdDeviation: size / 3
  }));
}
function UniconSvg(_ref5) {
  var attributeIndices = _ref5.attributeIndices,
    size = _ref5.size,
    address = _ref5.address;
  var isDarkMode = useIsDarkMode();
  var attributeData = useMemo(function () {
    return getUniconAttributeData(attributeIndices);
  }, [attributeIndices]);
  var gradientId = "gradient".concat(address + size);
  var maskId = "mask".concat(address + size);
  var blurId = "blur".concat(address + size);
  var svgProps = {
    viewBox: "0 0 ".concat(size, " ").concat(size)
  };
  if (!attributeIndices || !attributeData) return null;
  return /*#__PURE__*/React__default.createElement("svg", svgProps, /*#__PURE__*/React__default.createElement("defs", null, /*#__PURE__*/React__default.createElement(UniconMask, {
    maskId: maskId,
    attributeData: attributeData,
    size: size
  }), /*#__PURE__*/React__default.createElement(UniconGradient, {
    gradientId: gradientId,
    attributeData: attributeData
  }), /*#__PURE__*/React__default.createElement(UniconBlur, {
    blurId: blurId,
    size: size
  })), /*#__PURE__*/React__default.createElement("g", {
    mask: "url(#".concat(maskId, ")")
  }, /*#__PURE__*/React__default.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: "url(#".concat(gradientId, ")")
  }), !isDarkMode && /*#__PURE__*/React__default.createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: "black",
    opacity: 0.08
  }), /*#__PURE__*/React__default.createElement("ellipse", {
    cx: size / 2,
    cy: 0,
    rx: size / 2,
    ry: size / 2,
    fill: blurs[attributeIndices[UniconAttributes.GradientStart]],
    filter: "url(#".concat(blurId, ")")
  })));
}
function _Unicon(_ref6) {
  var address = _ref6.address,
    _ref6$size = _ref6.size,
    size = _ref6$size === void 0 ? 24 : _ref6$size,
    _ref6$randomSeed = _ref6.randomSeed,
    randomSeed = _ref6$randomSeed === void 0 ? 0 : _ref6$randomSeed,
    mobile = _ref6.mobile;
  var attributeIndices = useMemo(function () {
    return deriveUniconAttributeIndices(address, randomSeed);
  }, [address, randomSeed]);
  if (!address || !isEthAddress(address) || !attributeIndices) return null;
  return /*#__PURE__*/React__default.createElement("div", {
    style: {
      height: size,
      width: size,
      position: "relative"
    }
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      height: size,
      width: size,
      overflow: "visible",
      position: "absolute"
    }
  }, /*#__PURE__*/React__default.createElement(UniconSvg, {
    attributeIndices: attributeIndices,
    size: size,
    address: address,
    mobile: mobile
  })));
}
var Unicon = /*#__PURE__*/memo(_Unicon);

export { Unicon };
