import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { createReducer } from '@reduxjs/toolkit';
import { Field, resetMintState, setFullRange, typeStartPriceInput, typeLeftRangeInput, typeRightRangeInput, typeInput } from './actions.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var initialState = {
  independentField: Field.CURRENCY_A,
  typedValue: "",
  startPriceTypedValue: "",
  leftRangeTypedValue: "",
  rightRangeTypedValue: ""
};
var mintV3 = createReducer(initialState, function (builder) {
  return builder.addCase(resetMintState, function () {
    return initialState;
  }).addCase(setFullRange, function (state) {
    return _objectSpread(_objectSpread({}, state), {}, {
      leftRangeTypedValue: true,
      rightRangeTypedValue: true
    });
  }).addCase(typeStartPriceInput, function (state, _ref) {
    var typedValue = _ref.payload.typedValue;
    return _objectSpread(_objectSpread({}, state), {}, {
      startPriceTypedValue: typedValue
    });
  }).addCase(typeLeftRangeInput, function (state, _ref2) {
    var typedValue = _ref2.payload.typedValue;
    return _objectSpread(_objectSpread({}, state), {}, {
      leftRangeTypedValue: typedValue
    });
  }).addCase(typeRightRangeInput, function (state, _ref3) {
    var typedValue = _ref3.payload.typedValue;
    return _objectSpread(_objectSpread({}, state), {}, {
      rightRangeTypedValue: typedValue
    });
  }).addCase(typeInput, function (state, _ref4) {
    var _ref4$payload = _ref4.payload,
      field = _ref4$payload.field,
      typedValue = _ref4$payload.typedValue,
      noLiquidity = _ref4$payload.noLiquidity;
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
          typedValue: typedValue
        });
      }
    } else {
      return _objectSpread(_objectSpread({}, state), {}, {
        independentField: field,
        typedValue: typedValue
      });
    }
  });
});

export { mintV3 as default };
