import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { axisBottom, select } from 'd3';
import React__default, { useMemo } from 'react';
import styled from 'styled-components';

var _templateObject;
var StyledGroup = styled.g(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  line {\n    display: none;\n  }\n\n  text {\n    color: ", ";\n    transform: translateY(5px);\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var Axis = function Axis(_ref2) {
  var axisGenerator = _ref2.axisGenerator;
  var axisRef = function axisRef(axis) {
    axis && select(axis).call(axisGenerator).call(function (g) {
      return g.select(".domain").remove();
    });
  };
  return /*#__PURE__*/React__default.createElement("g", {
    ref: axisRef
  });
};
var AxisBottom = function AxisBottom(_ref3) {
  var xScale = _ref3.xScale,
    innerHeight = _ref3.innerHeight,
    _ref3$offset = _ref3.offset,
    offset = _ref3$offset === void 0 ? 0 : _ref3$offset;
  return useMemo(function () {
    return /*#__PURE__*/React__default.createElement(StyledGroup, {
      transform: "translate(0, ".concat(innerHeight + offset, ")")
    }, /*#__PURE__*/React__default.createElement(Axis, {
      axisGenerator: axisBottom(xScale).ticks(6)
    }));
  }, [innerHeight, offset, xScale]);
};

export { AxisBottom };
