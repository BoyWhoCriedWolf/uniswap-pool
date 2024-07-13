'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var toolkit = require('@reduxjs/toolkit');
var actions = require('./actions.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var initialState = {
  independentField: actions.Field.CURRENCY_A,
  typedValue: "",
  otherTypedValue: "",
  startPriceTypedValue: "",
  leftRangeTypedValue: "",
  rightRangeTypedValue: ""
};
var mint = toolkit.createReducer(initialState, function (builder) {
  return builder.addCase(actions.resetMintState, function () {
    return initialState;
  }).addCase(actions.typeInput, function (state, _ref) {
    var _ref$payload = _ref.payload,
      field = _ref$payload.field,
      typedValue = _ref$payload.typedValue,
      noLiquidity = _ref$payload.noLiquidity;
    if (noLiquidity) {
      // they're typing into the field they've last typed in
      if (field === state.independentField) {
        return _objectSpread(_objectSpread({}, state), {}, {
          independentField: field,
          typedValue: typedValue
        });
      }
      // they're typing into a new field, store the other value
      else {
        return _objectSpread(_objectSpread({}, state), {}, {
          independentField: field,
          typedValue: typedValue,
          otherTypedValue: state.typedValue
        });
      }
    } else {
      return _objectSpread(_objectSpread({}, state), {}, {
        independentField: field,
        typedValue: typedValue,
        otherTypedValue: ""
      });
    }
  });
});

exports["default"] = mint;
exports.initialState = initialState;
