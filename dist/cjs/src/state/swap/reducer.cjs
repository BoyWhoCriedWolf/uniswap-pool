'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var toolkit = require('@reduxjs/toolkit');
var useParsedQueryString = require('../../hooks/useParsedQueryString.cjs');
var actions = require('./actions.cjs');
var hooks = require('./hooks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var initialState = hooks.queryParametersToSwapState(useParsedQueryString.parsedQueryString());
var swapReducer = toolkit.createReducer(initialState, function (builder) {
  return builder.addCase(actions.replaceSwapState, function (state, _ref) {
    var _ref$payload = _ref.payload,
      typedValue = _ref$payload.typedValue,
      recipient = _ref$payload.recipient,
      field = _ref$payload.field,
      inputCurrencyId = _ref$payload.inputCurrencyId,
      outputCurrencyId = _ref$payload.outputCurrencyId;
    return _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.INPUT, {
      currencyId: inputCurrencyId !== null && inputCurrencyId !== void 0 ? inputCurrencyId : null
    }), actions.Field.OUTPUT, {
      currencyId: outputCurrencyId !== null && outputCurrencyId !== void 0 ? outputCurrencyId : null
    }), "independentField", field), "typedValue", typedValue), "recipient", recipient);
  }).addCase(actions.selectCurrency, function (state, _ref3) {
    var _ref3$payload = _ref3.payload,
      currencyId = _ref3$payload.currencyId,
      field = _ref3$payload.field;
    var otherField = field === actions.Field.INPUT ? actions.Field.OUTPUT : actions.Field.INPUT;
    if (currencyId === state[otherField].currencyId) {
      // the case where we have to swap the order
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty__default["default"](_defineProperty__default["default"]({
        independentField: state.independentField === actions.Field.INPUT ? actions.Field.OUTPUT : actions.Field.INPUT
      }, field, {
        currencyId: currencyId
      }), otherField, {
        currencyId: state[field].currencyId
      }));
    } else {
      // the normal case
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty__default["default"]({}, field, {
        currencyId: currencyId
      }));
    }
  }).addCase(actions.switchCurrencies, function (state, _ref4) {
    var _ref4$payload = _ref4.payload,
      newOutputHasTax = _ref4$payload.newOutputHasTax,
      previouslyEstimatedOutput = _ref4$payload.previouslyEstimatedOutput;
    if (newOutputHasTax && state.independentField === actions.Field.INPUT) {
      // To prevent swaps with FOT tokens as exact-outputs, we leave it as an exact-in swap and use the previously estimated output amount as the new exact-in amount.
      return _objectSpread(_objectSpread({}, state), {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Field.INPUT, {
        currencyId: state[actions.Field.OUTPUT].currencyId
      }), actions.Field.OUTPUT, {
        currencyId: state[actions.Field.INPUT].currencyId
      }), "typedValue", previouslyEstimatedOutput));
    }
    return _objectSpread(_objectSpread({}, state), {}, _defineProperty__default["default"](_defineProperty__default["default"]({
      independentField: state.independentField === actions.Field.INPUT ? actions.Field.OUTPUT : actions.Field.INPUT
    }, actions.Field.INPUT, {
      currencyId: state[actions.Field.OUTPUT].currencyId
    }), actions.Field.OUTPUT, {
      currencyId: state[actions.Field.INPUT].currencyId
    }));
  }).addCase(actions.forceExactInput, function (state) {
    return _objectSpread(_objectSpread({}, state), {}, {
      independentField: actions.Field.INPUT,
      typedValue: ""
    });
  }).addCase(actions.typeInput, function (state, _ref5) {
    var _ref5$payload = _ref5.payload,
      field = _ref5$payload.field,
      typedValue = _ref5$payload.typedValue;
    return _objectSpread(_objectSpread({}, state), {}, {
      independentField: field,
      typedValue: typedValue
    });
  }).addCase(actions.setRecipient, function (state, _ref6) {
    var recipient = _ref6.payload.recipient;
    state.recipient = recipient;
  });
});

exports["default"] = swapReducer;
exports.initialState = initialState;
