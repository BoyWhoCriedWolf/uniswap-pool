import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import clsx from 'clsx';
import * as React from 'react';
import { animated } from 'react-spring';
import { atoms } from '../css/atoms.js';
import { sprinkles } from '../css/sprinkles.css.js';

var _excluded = ["as", "className"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Box = /*#__PURE__*/React.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
    as = _ref$as === void 0 ? "div" : _ref$as,
    className = _ref.className,
    props = _objectWithoutProperties(_ref, _excluded);
  var atomProps = {};
  var nativeProps = {};
  for (var key in props) {
    if (sprinkles.properties.has(key)) {
      atomProps[key] = props[key];
    } else {
      nativeProps[key] = props[key];
    }
  }
  var atomicClasses = atoms(_objectSpread({
    reset: typeof as === "string" ? as : "div"
  }, atomProps));
  return /*#__PURE__*/React.createElement(as, _objectSpread(_objectSpread({
    className: clsx(atomicClasses, className)
  }, nativeProps), {}, {
    ref: ref
  }));
});

// We get this error around the codebase: https://github.com/microsoft/TypeScript/issues/34933
// so you see ts-ignore almost everywhere this component is used
// since we are going to deprecate vanilla-extract, this will be `any` for now
var AnimatedBox = animated(Box);
Box.displayName = "Box";

export { AnimatedBox, Box };
