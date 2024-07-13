import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { createReducer } from '@reduxjs/toolkit';
import { parsedQueryString } from '../../hooks/useParsedQueryString.js';
import { replaceSwapState, Field, selectCurrency, switchCurrencies, forceExactInput, typeInput, setRecipient } from './actions.js';
import { queryParametersToSwapState } from './hooks.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var initialState = queryParametersToSwapState(parsedQueryString());
var swapReducer = createReducer(initialState, function (builder) {
  return builder.addCase(replaceSwapState, function (state, _ref) {
    var _ref$payload = _ref.payload,
      typedValue = _ref$payload.typedValue,
      recipient = _ref$payload.recipient,
      field = _ref$payload.field,
      inputCurrencyId = _ref$payload.inputCurrencyId,
      outputCurrencyId = _ref$payload.outputCurrencyId;
    return _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, Field.INPUT, {
      currencyId: inputCurrencyId !== null && inputCurrencyId !== void 0 ? inputCurrencyId : null
    }), Field.OUTPUT, {
      currencyId: outputCurrencyId !== null && outputCurrencyId !== void 0 ? outputCurrencyId : null
    }), "independentField", field), "typedValue", typedValue), "recipient", recipient);
  }).addCase(selectCurrency, function (state, _ref3) {
    var _ref3$payload = _ref3.payload,
      currencyId = _ref3$payload.currencyId,
      field = _ref3$payload.field;
    var otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT;
    if (currencyId === state[otherField].currencyId) {
      // the case where we have to swap the order
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty(_defineProperty({
        independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT
      }, field, {
        currencyId: currencyId
      }), otherField, {
        currencyId: state[field].currencyId
      }));
    } else {
      // the normal case
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty({}, field, {
        currencyId: currencyId
      }));
    }
  }).addCase(switchCurrencies, function (state, _ref4) {
    var _ref4$payload = _ref4.payload,
      newOutputHasTax = _ref4$payload.newOutputHasTax,
      previouslyEstimatedOutput = _ref4$payload.previouslyEstimatedOutput;
    if (newOutputHasTax && state.independentField === Field.INPUT) {
      // To prevent swaps with FOT tokens as exact-outputs, we leave it as an exact-in swap and use the previously estimated output amount as the new exact-in amount.
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty(_defineProperty(_defineProperty({}, Field.INPUT, {
        currencyId: state[Field.OUTPUT].currencyId
      }), Field.OUTPUT, {
        currencyId: state[Field.INPUT].currencyId
      }), "typedValue", previouslyEstimatedOutput));
    }
    return _objectSpread(_objectSpread({}, state), {}, _defineProperty(_defineProperty({
      independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT
    }, Field.INPUT, {
      currencyId: state[Field.OUTPUT].currencyId
    }), Field.OUTPUT, {
      currencyId: state[Field.INPUT].currencyId
    }));
  }).addCase(forceExactInput, function (state) {
    return _objectSpread(_objectSpread({}, state), {}, {
      independentField: Field.INPUT,
      typedValue: ""
    });
  }).addCase(typeInput, function (state, _ref5) {
    var _ref5$payload = _ref5.payload,
      field = _ref5$payload.field,
      typedValue = _ref5$payload.typedValue;
    return _objectSpread(_objectSpread({}, state), {}, {
      independentField: field,
      typedValue: typedValue
    });
  }).addCase(setRecipient, function (state, _ref6) {
    var recipient = _ref6.payload.recipient;
    state.recipient = recipient;
  });
});

export { swapReducer as default, initialState };
