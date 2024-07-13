import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { createReducer } from '@reduxjs/toolkit';
import { Field, typeInput } from './actions.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var initialState = {
  independentField: Field.LIQUIDITY_PERCENT,
  typedValue: "0"
};
var burn = createReducer(initialState, function (builder) {
  return builder.addCase(typeInput, function (state, _ref) {
    var _ref$payload = _ref.payload,
      field = _ref$payload.field,
      typedValue = _ref$payload.typedValue;
    return _objectSpread(_objectSpread({}, state), {}, {
      independentField: field,
      typedValue: typedValue
    });
  });
});

export { burn as default };
