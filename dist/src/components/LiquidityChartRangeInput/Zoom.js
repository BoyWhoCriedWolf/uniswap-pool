import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { ButtonGray } from '../Button/index.js';
import { select, zoomIdentity, zoom } from 'd3';
import React__default, { useRef, useMemo, useEffect } from 'react';
import { RefreshCcw, ZoomIn, ZoomOut } from 'react-feather';
import styled from 'styled-components';

var _templateObject, _templateObject2, _templateObject3;
var Wrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: grid;\n  grid-template-columns: repeat(", ", 1fr);\n  grid-gap: 6px;\n\n  position: absolute;\n  top: -32px;\n  right: 0;\n"])), function (_ref) {
  var count = _ref.count;
  return count.toString();
});
var Button = styled(ButtonGray)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  &:hover {\n    background-color: ", ";\n    color: ", ";\n  }\n\n  width: 32px;\n  height: 32px;\n  padding: 4px;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral1;
});
var ZoomOverlay = styled.rect(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  fill: transparent;\n  cursor: grab;\n\n  &:active {\n    cursor: grabbing;\n  }\n"])));
function Zoom(_ref4) {
  var svg = _ref4.svg,
    xScale = _ref4.xScale,
    setZoom = _ref4.setZoom,
    width = _ref4.width,
    height = _ref4.height,
    resetBrush = _ref4.resetBrush,
    showResetButton = _ref4.showResetButton,
    zoomLevels = _ref4.zoomLevels;
  var zoomBehavior = useRef();
  var _useMemo = useMemo(function () {
      return [function () {
        return svg && zoomBehavior.current && select(svg).transition().call(zoomBehavior.current.scaleBy, 2);
      }, function () {
        return svg && zoomBehavior.current && select(svg).transition().call(zoomBehavior.current.scaleBy, 0.5);
      }, function () {
        return svg && zoomBehavior.current && select(svg).transition().call(zoomBehavior.current.scaleTo, 0.5);
      }, function () {
        return svg && zoomBehavior.current && select(svg).call(zoomBehavior.current.transform, zoomIdentity.translate(0, 0).scale(1)).transition().call(zoomBehavior.current.scaleTo, 0.5);
      }];
    }, [svg]),
    _useMemo2 = _slicedToArray(_useMemo, 4),
    zoomIn = _useMemo2[0],
    zoomOut = _useMemo2[1],
    zoomInitial = _useMemo2[2],
    zoomReset = _useMemo2[3];
  useEffect(function () {
    if (!svg) return;
    zoomBehavior.current = zoom().scaleExtent([zoomLevels.min, zoomLevels.max]).extent([[0, 0], [width, height]]).on("zoom", function (_ref5) {
      var transform = _ref5.transform;
      return setZoom(transform);
    });
    select(svg).call(zoomBehavior.current);
  }, [height, width, setZoom, svg, xScale, zoomBehavior, zoomLevels, zoomLevels.max, zoomLevels.min]);
  useEffect(function () {
    // reset zoom to initial on zoomLevel change
    zoomInitial();
  }, [zoomInitial, zoomLevels]);
  return /*#__PURE__*/React__default.createElement(Wrapper, {
    count: showResetButton ? 3 : 2
  }, showResetButton && /*#__PURE__*/React__default.createElement(Button, {
    onClick: function onClick() {
      resetBrush();
      zoomReset();
    },
    disabled: false
  }, /*#__PURE__*/React__default.createElement(RefreshCcw, {
    size: 16
  })), /*#__PURE__*/React__default.createElement(Button, {
    onClick: zoomIn,
    disabled: false
  }, /*#__PURE__*/React__default.createElement(ZoomIn, {
    size: 16
  })), /*#__PURE__*/React__default.createElement(Button, {
    onClick: zoomOut,
    disabled: false
  }, /*#__PURE__*/React__default.createElement(ZoomOut, {
    size: 16
  })));
}

export { ZoomOverlay, Zoom as default };
