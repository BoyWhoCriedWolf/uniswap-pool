'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var d3 = require('d3');
var actions = require('../../state/mint/v3/actions.cjs');
var Area = require('./Area.cjs');
var AxisBottom = require('./AxisBottom.cjs');
var Brush = require('./Brush.cjs');
var Line = require('./Line.cjs');
var Zoom = require('./Zoom.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

var xAccessor = function xAccessor(d) {
  return d.price0;
};
var yAccessor = function yAccessor(d) {
  return d.activeLiquidity;
};
function Chart(_ref) {
  var _ref$id = _ref.id,
    id = _ref$id === void 0 ? "liquidityChartRangeInput" : _ref$id,
    _ref$data = _ref.data,
    series = _ref$data.series,
    current = _ref$data.current,
    ticksAtLimit = _ref.ticksAtLimit,
    styles = _ref.styles,
    _ref$dimensions = _ref.dimensions,
    width = _ref$dimensions.width,
    height = _ref$dimensions.height,
    margins = _ref.margins,
    _ref$interactive = _ref.interactive,
    interactive = _ref$interactive === void 0 ? true : _ref$interactive,
    brushDomain = _ref.brushDomain,
    brushLabels = _ref.brushLabels,
    onBrushDomainChange = _ref.onBrushDomainChange,
    zoomLevels = _ref.zoomLevels;
  var zoomRef = React.useRef(null);
  var _useState = React.useState(null),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    zoom = _useState2[0],
    setZoom = _useState2[1];
  var _useMemo = React.useMemo(function () {
      return [height - margins.top - margins.bottom, width - margins.left - margins.right];
    }, [width, height, margins]),
    _useMemo2 = _slicedToArray__default["default"](_useMemo, 2),
    innerHeight = _useMemo2[0],
    innerWidth = _useMemo2[1];
  var _useMemo3 = React.useMemo(function () {
      var scales = {
        xScale: d3.scaleLinear().domain([current * zoomLevels.initialMin, current * zoomLevels.initialMax]).range([0, innerWidth]),
        yScale: d3.scaleLinear().domain([0, d3.max(series, yAccessor)]).range([innerHeight, 0])
      };
      if (zoom) {
        var newXscale = zoom.rescaleX(scales.xScale);
        scales.xScale.domain(newXscale.domain());
      }
      return scales;
    }, [current, zoomLevels.initialMin, zoomLevels.initialMax, innerWidth, series, innerHeight, zoom]),
    xScale = _useMemo3.xScale,
    yScale = _useMemo3.yScale;
  React.useEffect(function () {
    // reset zoom as necessary
    setZoom(null);
  }, [zoomLevels]);
  React.useEffect(function () {
    if (!brushDomain) {
      onBrushDomainChange(xScale.domain(), undefined);
    }
  }, [brushDomain, onBrushDomainChange, xScale]);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Zoom["default"], {
    svg: zoomRef.current,
    xScale: xScale,
    setZoom: setZoom,
    width: innerWidth,
    height:
    // allow zooming inside the x-axis
    height,
    resetBrush: function resetBrush() {
      onBrushDomainChange([current * zoomLevels.initialMin, current * zoomLevels.initialMax], "reset");
    },
    showResetButton: Boolean(ticksAtLimit[actions.Bound.LOWER] || ticksAtLimit[actions.Bound.UPPER]),
    zoomLevels: zoomLevels
  }), /*#__PURE__*/React__default["default"].createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 ".concat(width, " ").concat(height),
    style: {
      overflow: "visible"
    }
  }, /*#__PURE__*/React__default["default"].createElement("defs", null, /*#__PURE__*/React__default["default"].createElement("clipPath", {
    id: "".concat(id, "-chart-clip")
  }, /*#__PURE__*/React__default["default"].createElement("rect", {
    x: "0",
    y: "0",
    width: innerWidth,
    height: height
  })), brushDomain &&
  /*#__PURE__*/
  // mask to highlight selected area
  React__default["default"].createElement("mask", {
    id: "".concat(id, "-chart-area-mask")
  }, /*#__PURE__*/React__default["default"].createElement("rect", {
    fill: "white",
    x: xScale(brushDomain[0]),
    y: "0",
    width: xScale(brushDomain[1]) - xScale(brushDomain[0]),
    height: innerHeight
  }))), /*#__PURE__*/React__default["default"].createElement("g", {
    transform: "translate(".concat(margins.left, ",").concat(margins.top, ")")
  }, /*#__PURE__*/React__default["default"].createElement("g", {
    clipPath: "url(#".concat(id, "-chart-clip)")
  }, /*#__PURE__*/React__default["default"].createElement(Area.Area, {
    series: series,
    xScale: xScale,
    yScale: yScale,
    xValue: xAccessor,
    yValue: yAccessor
  }), brushDomain &&
  /*#__PURE__*/
  // duplicate area chart with mask for selected area
  React__default["default"].createElement("g", {
    mask: "url(#".concat(id, "-chart-area-mask)")
  }, /*#__PURE__*/React__default["default"].createElement(Area.Area, {
    series: series,
    xScale: xScale,
    yScale: yScale,
    xValue: xAccessor,
    yValue: yAccessor,
    fill: styles.area.selection
  })), /*#__PURE__*/React__default["default"].createElement(Line.Line, {
    value: current,
    xScale: xScale,
    innerHeight: innerHeight
  }), /*#__PURE__*/React__default["default"].createElement(AxisBottom.AxisBottom, {
    xScale: xScale,
    innerHeight: innerHeight
  })), /*#__PURE__*/React__default["default"].createElement(Zoom.ZoomOverlay, {
    width: innerWidth,
    height: height,
    ref: zoomRef
  }), /*#__PURE__*/React__default["default"].createElement(Brush.Brush, {
    id: id,
    xScale: xScale,
    interactive: interactive,
    brushLabelValue: brushLabels,
    brushExtent: brushDomain !== null && brushDomain !== void 0 ? brushDomain : xScale.domain(),
    innerWidth: innerWidth,
    innerHeight: innerHeight,
    setBrushExtent: onBrushDomainChange,
    westHandleColor: styles.brush.handle.west,
    eastHandleColor: styles.brush.handle.east
  }))));
}

exports.Chart = Chart;
