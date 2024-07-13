'use strict';

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var lists = require('../constants/lists.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var DEFAULT_LIST_PRIORITIES = lists.DEFAULT_LIST_OF_LISTS.reduce(function (acc, listUrl, index) {
  return _objectSpread(_objectSpread({}, acc), {}, _defineProperty__default["default"]({}, listUrl, index + 1));
}, {});

// use ordering of default list of lists to assign priority
function sortByListPriority(urlA, urlB) {
  var A = DEFAULT_LIST_PRIORITIES[urlA];
  var B = DEFAULT_LIST_PRIORITIES[urlB];
  if (!A) return 0;
  if (!B) return 0;
  return A - B;
}

module.exports = sortByListPriority;
