import React__default, { useRef, useState, useMemo, useEffect } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { scaleLinear, max } from 'd3';
import { Bound } from '../../state/mint/v3/actions.js';
import { Area } from './Area.js';
import { AxisBottom } from './AxisBottom.js';
import { Brush } from './Brush.js';
import { Line } from './Line.js';
import Zoom, { ZoomOverlay } from './Zoom.js';

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
  var zoomRef = useRef(null);
  var _useState = useState(null),
    _useState2 = _slicedToArray(_useState, 2),
    zoom = _useState2[0],
    setZoom = _useState2[1];
  var _useMemo = useMemo(function () {
      return [height - margins.top - margins.bottom, width - margins.left - margins.right];
    }, [width, height, margins]),
    _useMemo2 = _slicedToArray(_useMemo, 2),
    innerHeight = _useMemo2[0],
    innerWidth = _useMemo2[1];
  var _useMemo3 = useMemo(function () {
      var scales = {
        xScale: scaleLinear().domain([current * zoomLevels.initialMin, current * zoomLevels.initialMax]).range([0, innerWidth]),
        yScale: scaleLinear().domain([0, max(series, yAccessor)]).range([innerHeight, 0])
      };
      if (zoom) {
        var newXscale = zoom.rescaleX(scales.xScale);
        scales.xScale.domain(newXscale.domain());
      }
      return scales;
    }, [current, zoomLevels.initialMin, zoomLevels.initialMax, innerWidth, series, innerHeight, zoom]),
    xScale = _useMemo3.xScale,
    yScale = _useMemo3.yScale;
  useEffect(function () {
    // reset zoom as necessary
    setZoom(null);
  }, [zoomLevels]);
  useEffect(function () {
    if (!brushDomain) {
      onBrushDomainChange(xScale.domain(), undefined);
    }
  }, [brushDomain, onBrushDomainChange, xScale]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Zoom, {
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
    showResetButton: Boolean(ticksAtLimit[Bound.LOWER] || ticksAtLimit[Bound.UPPER]),
    zoomLevels: zoomLevels
  }), /*#__PURE__*/React__default.createElement("svg", {
    width: "100%",
    height: "100%",
    viewBox: "0 0 ".concat(width, " ").concat(height),
    style: {
      overflow: "visible"
    }
  }, /*#__PURE__*/React__default.createElement("defs", null, /*#__PURE__*/React__default.createElement("clipPath", {
    id: "".concat(id, "-chart-clip")
  }, /*#__PURE__*/React__default.createElement("rect", {
    x: "0",
    y: "0",
    width: innerWidth,
    height: height
  })), brushDomain &&
  /*#__PURE__*/
  // mask to highlight selected area
  React__default.createElement("mask", {
    id: "".concat(id, "-chart-area-mask")
  }, /*#__PURE__*/React__default.createElement("rect", {
    fill: "white",
    x: xScale(brushDomain[0]),
    y: "0",
    width: xScale(brushDomain[1]) - xScale(brushDomain[0]),
    height: innerHeight
  }))), /*#__PURE__*/React__default.createElement("g", {
    transform: "translate(".concat(margins.left, ",").concat(margins.top, ")")
  }, /*#__PURE__*/React__default.createElement("g", {
    clipPath: "url(#".concat(id, "-chart-clip)")
  }, /*#__PURE__*/React__default.createElement(Area, {
    series: series,
    xScale: xScale,
    yScale: yScale,
    xValue: xAccessor,
    yValue: yAccessor
  }), brushDomain &&
  /*#__PURE__*/
  // duplicate area chart with mask for selected area
  React__default.createElement("g", {
    mask: "url(#".concat(id, "-chart-area-mask)")
  }, /*#__PURE__*/React__default.createElement(Area, {
    series: series,
    xScale: xScale,
    yScale: yScale,
    xValue: xAccessor,
    yValue: yAccessor,
    fill: styles.area.selection
  })), /*#__PURE__*/React__default.createElement(Line, {
    value: current,
    xScale: xScale,
    innerHeight: innerHeight
  }), /*#__PURE__*/React__default.createElement(AxisBottom, {
    xScale: xScale,
    innerHeight: innerHeight
  })), /*#__PURE__*/React__default.createElement(ZoomOverlay, {
    width: innerWidth,
    height: height,
    ref: zoomRef
  }), /*#__PURE__*/React__default.createElement(Brush, {
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

export { Chart };
