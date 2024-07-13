'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var clsx = require('clsx');
var React = require('react');
var reactSpring = require('react-spring');
var atoms = require('../css/atoms.cjs');
var sprinkles_css = require('../css/sprinkles.css.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n["default"] = e;
  return Object.freeze(n);
}

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var clsx__default = /*#__PURE__*/_interopDefaultLegacy(clsx);
var React__namespace = /*#__PURE__*/_interopNamespace(React);

var _excluded = ["as", "className"];
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var Box = /*#__PURE__*/React__namespace.forwardRef(function (_ref, ref) {
  var _ref$as = _ref.as,
    as = _ref$as === void 0 ? "div" : _ref$as,
    className = _ref.className,
    props = _objectWithoutProperties__default["default"](_ref, _excluded);
  var atomProps = {};
  var nativeProps = {};
  for (var key in props) {
    if (sprinkles_css.sprinkles.properties.has(key)) {
      atomProps[key] = props[key];
    } else {
      nativeProps[key] = props[key];
    }
  }
  var atomicClasses = atoms.atoms(_objectSpread({
    reset: typeof as === "string" ? as : "div"
  }, atomProps));
  return /*#__PURE__*/React__namespace.createElement(as, _objectSpread(_objectSpread({
    className: clsx__default["default"](atomicClasses, className)
  }, nativeProps), {}, {
    ref: ref
  }));
});

// We get this error around the codebase: https://github.com/microsoft/TypeScript/issues/34933
// so you see ts-ignore almost everywhere this component is used
// since we are going to deprecate vanilla-extract, this will be `any` for now
var AnimatedBox = reactSpring.animated(Box);
Box.displayName = "Box";

exports.AnimatedBox = AnimatedBox;
exports.Box = Box;
