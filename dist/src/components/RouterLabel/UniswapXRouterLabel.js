import React__default, { useRef } from 'react';
import _extends from '@babel/runtime/helpers/extends';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import Row from '../Row/index.js';
import styled from 'styled-components';
import { v4 } from 'uuid';

var _excluded = ["children", "disableTextGradient", "testId"];
var _templateObject;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// Gradient with a fallback to solid color.
var Gradient = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: #4673fa;\n\n  @supports (-webkit-background-clip: text) and\n    (-webkit-text-fill-color: transparent) {\n    background-image: linear-gradient(\n      91.39deg,\n      #4673fa -101.76%,\n      #9646fa 101.76%\n    );\n    -webkit-background-clip: text;\n    -webkit-text-fill-color: transparent;\n  }\n"])));

// Uniswap X SVG icon with gradient, copied from Figma.
// In order for gradient to work, we must give its definition a unique ID that does not collide
// with other occurences of this component on the page.
var UniswapXRouterIcon = function UniswapXRouterIcon(_ref) {
  var testId = _ref.testId;
  var componentIdRef = useRef(v4());
  var componentId = "AutoRouterIconGradient".concat(componentIdRef.current);
  return /*#__PURE__*/React__default.createElement("svg", {
    width: "10",
    height: "14",
    viewBox: "0 0 10 14",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "data-testid": testId
  }, /*#__PURE__*/React__default.createElement("defs", null, /*#__PURE__*/React__default.createElement("linearGradient", {
    id: componentId,
    x1: "-10.1807",
    y1: "-12.0006",
    x2: "10.6573",
    y2: "-11.6017",
    gradientUnits: "userSpaceOnUse"
  }, /*#__PURE__*/React__default.createElement("stop", {
    stopColor: "#4673FA"
  }), /*#__PURE__*/React__default.createElement("stop", {
    offset: "1",
    stopColor: "#9646FA"
  }))), /*#__PURE__*/React__default.createElement("path", {
    d: "M9.97131 6.19803C9.91798 6.07737 9.79866 6.00003 9.66666 6.00003H6.66666V1.00003C6.66666 0.862034 6.58201 0.738037 6.45267 0.688704C6.32267 0.638704 6.17799 0.674696 6.08532 0.776696L0.0853237 7.44336C-0.00267631 7.54136 -0.0253169 7.68137 0.0286831 7.80204C0.0820164 7.9227 0.20133 8.00003 0.33333 8.00003H3.33333V13C3.33333 13.138 3.41799 13.262 3.54732 13.3114C3.58665 13.326 3.62666 13.3334 3.66666 13.3334C3.75933 13.3334 3.85 13.2947 3.91467 13.2227L9.91467 6.55603C10.0027 6.4587 10.0246 6.31803 9.97131 6.19803Z",
    fill: "url(#".concat(componentId, ")")
  }));
};
function UniswapXRouterLabel(_ref2) {
  var children = _ref2.children,
    disableTextGradient = _ref2.disableTextGradient,
    testId = _ref2.testId,
    rest = _objectWithoutProperties(_ref2, _excluded);
  return /*#__PURE__*/React__default.createElement(Row, _extends({
    gap: "xs",
    width: "auto"
  }, rest, {
    style: _objectSpread({
      display: "inline-flex"
    }, rest.style)
  }), /*#__PURE__*/React__default.createElement(UniswapXRouterIcon, {
    testId: testId
  }), disableTextGradient ? children : /*#__PURE__*/React__default.createElement(Gradient, null, children));
}

export { Gradient as UniswapXGradient, UniswapXRouterIcon, UniswapXRouterLabel as default };
