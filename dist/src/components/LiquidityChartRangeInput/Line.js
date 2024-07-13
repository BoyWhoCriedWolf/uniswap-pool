import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import React__default, { useMemo } from 'react';
import styled from 'styled-components';

var _templateObject;
var StyledLine = styled.line(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  opacity: 0.5;\n  stroke-width: 2;\n  stroke: ", ";\n  fill: none;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var Line = function Line(_ref2) {
  var value = _ref2.value,
    xScale = _ref2.xScale,
    innerHeight = _ref2.innerHeight;
  return useMemo(function () {
    return /*#__PURE__*/React__default.createElement(StyledLine, {
      x1: xScale(value),
      y1: "0",
      x2: xScale(value),
      y2: innerHeight
    });
  }, [value, xScale, innerHeight]);
};

export { Line };
