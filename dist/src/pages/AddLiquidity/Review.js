import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { AutoColumn } from '../../components/Column/index.js';
import { PositionPreview } from '../../components/PositionPreview/index.js';
import styled from 'styled-components';

var _templateObject;
var Wrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding-top: 12px;\n"])));
function Review(_ref) {
  var position = _ref.position,
    outOfRange = _ref.outOfRange,
    ticksAtLimit = _ref.ticksAtLimit;
  return /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "lg"
  }, position ? /*#__PURE__*/React__default.createElement(PositionPreview, {
    position: position,
    inRange: !outOfRange,
    ticksAtLimit: ticksAtLimit,
    title: "Selected Range"
  }) : null));
}

export { Review };
