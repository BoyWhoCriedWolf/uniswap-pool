'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var clsx = require('clsx');
var reset_css = require('./reset.css.cjs');
var sprinkles_css = require('./sprinkles.css.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var clsx__default = /*#__PURE__*/_interopDefaultLegacy(clsx);

var _excluded = ["reset"];
var atoms = function atoms(_ref) {
  var reset = _ref.reset,
    rest = _objectWithoutProperties__default["default"](_ref, _excluded);
  if (!reset) return sprinkles_css.sprinkles(rest);
  var elementReset = reset_css.element[reset];
  var sprinklesClasses = sprinkles_css.sprinkles(rest);
  return clsx__default["default"](reset_css.base, elementReset, sprinklesClasses);
};

exports.atoms = atoms;
