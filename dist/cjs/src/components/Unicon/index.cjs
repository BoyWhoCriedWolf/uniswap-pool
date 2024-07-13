'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var React = require('react');
var ThemeToggle = require('../../theme/components/ThemeToggle.cjs');
var types = require('./types.cjs');
var utils = require('./utils.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ORIGINAL_CONTAINER_SIZE = 36;
var EMBLEM_XY_SHIFT = 10;
function PathMask(_ref) {
  var id = _ref.id,
    paths = _ref.paths,
    scale = _ref.scale,
    _ref$shift = _ref.shift,
    shift = _ref$shift === void 0 ? 0 : _ref$shift;
  return /*#__PURE__*/React__default["default"].createElement("mask", {
    id: id
  }, /*#__PURE__*/React__default["default"].createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: "white"
  }), /*#__PURE__*/React__default["default"].createElement("g", {
    transform: "scale(".concat(scale, ") \n translate(").concat(shift, ", ").concat(shift, ")")
  }, paths.map(function (pathProps) {
    return /*#__PURE__*/React__default["default"].createElement("path", _extends__default["default"]({
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
  return /*#__PURE__*/React__default["default"].createElement("defs", null, /*#__PURE__*/React__default["default"].createElement(PathMask, {
    id: containerMaskId,
    paths: attributeData[types.UniconAttributes.Container],
    scale: size / ORIGINAL_CONTAINER_SIZE
  }), /*#__PURE__*/React__default["default"].createElement(PathMask, {
    id: shapeMaskId,
    paths: attributeData[types.UniconAttributes.Shape],
    scale: size / ORIGINAL_CONTAINER_SIZE,
    shift: EMBLEM_XY_SHIFT
  }), /*#__PURE__*/React__default["default"].createElement("mask", {
    id: maskId
  }, /*#__PURE__*/React__default["default"].createElement("g", {
    fill: "white"
  }, /*#__PURE__*/React__default["default"].createElement("g", {
    mask: "url(#".concat(shapeMaskId, ")")
  }, /*#__PURE__*/React__default["default"].createElement("g", {
    transform: "scale(".concat(size / ORIGINAL_CONTAINER_SIZE, ")")
  }, attributeData[types.UniconAttributes.Container].map(function (pathProps) {
    return /*#__PURE__*/React__default["default"].createElement("path", _extends__default["default"]({
      key: pathProps.d
    }, pathProps));
  }))), /*#__PURE__*/React__default["default"].createElement("g", {
    mask: "url(#".concat(containerMaskId, ")")
  }, /*#__PURE__*/React__default["default"].createElement("g", {
    transform: "scale(".concat(size / ORIGINAL_CONTAINER_SIZE, ")\n        translate(10, 10)")
  }, attributeData[types.UniconAttributes.Shape].map(function (pathProps) {
    return /*#__PURE__*/React__default["default"].createElement("path", _extends__default["default"]({
      key: pathProps.d
    }, pathProps));
  }))))));
}
function UniconGradient(_ref3) {
  var gradientId = _ref3.gradientId,
    attributeData = _ref3.attributeData;
  return /*#__PURE__*/React__default["default"].createElement("linearGradient", {
    id: gradientId
  }, /*#__PURE__*/React__default["default"].createElement("stop", {
    offset: "0%",
    stopColor: attributeData[types.UniconAttributes.GradientStart]
  }), /*#__PURE__*/React__default["default"].createElement("stop", {
    offset: "100%",
    stopColor: attributeData[types.UniconAttributes.GradientEnd]
  }));
}
function UniconBlur(_ref4) {
  var blurId = _ref4.blurId,
    size = _ref4.size;
  return /*#__PURE__*/React__default["default"].createElement("filter", {
    id: blurId,
    x: "-50%",
    y: "-50%",
    height: "200%",
    width: "200%"
  }, /*#__PURE__*/React__default["default"].createElement("feGaussianBlur", {
    "in": "SourceGraphic",
    stdDeviation: size / 3
  }));
}
function UniconSvg(_ref5) {
  var attributeIndices = _ref5.attributeIndices,
    size = _ref5.size,
    address = _ref5.address;
  var isDarkMode = ThemeToggle.useIsDarkMode();
  var attributeData = React.useMemo(function () {
    return utils.getUniconAttributeData(attributeIndices);
  }, [attributeIndices]);
  var gradientId = "gradient".concat(address + size);
  var maskId = "mask".concat(address + size);
  var blurId = "blur".concat(address + size);
  var svgProps = {
    viewBox: "0 0 ".concat(size, " ").concat(size)
  };
  if (!attributeIndices || !attributeData) return null;
  return /*#__PURE__*/React__default["default"].createElement("svg", svgProps, /*#__PURE__*/React__default["default"].createElement("defs", null, /*#__PURE__*/React__default["default"].createElement(UniconMask, {
    maskId: maskId,
    attributeData: attributeData,
    size: size
  }), /*#__PURE__*/React__default["default"].createElement(UniconGradient, {
    gradientId: gradientId,
    attributeData: attributeData
  }), /*#__PURE__*/React__default["default"].createElement(UniconBlur, {
    blurId: blurId,
    size: size
  })), /*#__PURE__*/React__default["default"].createElement("g", {
    mask: "url(#".concat(maskId, ")")
  }, /*#__PURE__*/React__default["default"].createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: "url(#".concat(gradientId, ")")
  }), !isDarkMode && /*#__PURE__*/React__default["default"].createElement("rect", {
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    fill: "black",
    opacity: 0.08
  }), /*#__PURE__*/React__default["default"].createElement("ellipse", {
    cx: size / 2,
    cy: 0,
    rx: size / 2,
    ry: size / 2,
    fill: types.blurs[attributeIndices[types.UniconAttributes.GradientStart]],
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
  var attributeIndices = React.useMemo(function () {
    return utils.deriveUniconAttributeIndices(address, randomSeed);
  }, [address, randomSeed]);
  if (!address || !utils.isEthAddress(address) || !attributeIndices) return null;
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      height: size,
      width: size,
      position: "relative"
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      height: size,
      width: size,
      overflow: "visible",
      position: "absolute"
    }
  }, /*#__PURE__*/React__default["default"].createElement(UniconSvg, {
    attributeIndices: attributeIndices,
    size: size,
    address: address,
    mobile: mobile
  })));
}
var Unicon = /*#__PURE__*/React.memo(_Unicon);

exports.Unicon = Unicon;
