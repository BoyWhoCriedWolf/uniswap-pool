'use strict';

var React = require('react');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var InputStepCounter = require('../InputStepCounter/InputStepCounter.cjs');
var index = require('../Row/index.cjs');
var actions = require('../../state/mint/v3/actions.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

// currencyA is the base token
function RangeSelector(_ref) {
  var _ref2, _ref3, _leftPrice$toSignific, _rightPrice$toSignifi;
  var priceLower = _ref.priceLower,
    priceUpper = _ref.priceUpper,
    onLeftRangeInput = _ref.onLeftRangeInput,
    onRightRangeInput = _ref.onRightRangeInput,
    getDecrementLower = _ref.getDecrementLower,
    getIncrementLower = _ref.getIncrementLower,
    getDecrementUpper = _ref.getDecrementUpper,
    getIncrementUpper = _ref.getIncrementUpper,
    currencyA = _ref.currencyA,
    currencyB = _ref.currencyB,
    feeAmount = _ref.feeAmount,
    ticksAtLimit = _ref.ticksAtLimit;
  var tokenA = (_ref2 = currencyA !== null && currencyA !== void 0 ? currencyA : undefined) === null || _ref2 === void 0 ? void 0 : _ref2.wrapped;
  var tokenB = (_ref3 = currencyB !== null && currencyB !== void 0 ? currencyB : undefined) === null || _ref3 === void 0 ? void 0 : _ref3.wrapped;
  var isSorted = tokenA && tokenB && tokenA.sortsBefore(tokenB);
  var leftPrice = isSorted ? priceLower : priceUpper === null || priceUpper === void 0 ? void 0 : priceUpper.invert();
  var rightPrice = isSorted ? priceUpper : priceLower === null || priceLower === void 0 ? void 0 : priceLower.invert();
  return /*#__PURE__*/React__default["default"].createElement(index.AutoRow, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(InputStepCounter, {
    value: ticksAtLimit[isSorted ? actions.Bound.LOWER : actions.Bound.UPPER] ? "0" : (_leftPrice$toSignific = leftPrice === null || leftPrice === void 0 ? void 0 : leftPrice.toSignificant(8)) !== null && _leftPrice$toSignific !== void 0 ? _leftPrice$toSignific : "",
    onUserInput: onLeftRangeInput,
    decrement: isSorted ? getDecrementLower : getIncrementUpper,
    increment: isSorted ? getIncrementLower : getDecrementUpper,
    decrementDisabled: leftPrice === undefined || ticksAtLimit[isSorted ? actions.Bound.LOWER : actions.Bound.UPPER],
    incrementDisabled: leftPrice === undefined || ticksAtLimit[isSorted ? actions.Bound.LOWER : actions.Bound.UPPER],
    feeAmount: feeAmount,
    label: leftPrice ? "".concat(currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol) : "-",
    title: /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
      id: "uEoBVI",
      message: "Low price"
    }),
    tokenA: currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol,
    tokenB: currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol
  }), /*#__PURE__*/React__default["default"].createElement(InputStepCounter, {
    value: ticksAtLimit[isSorted ? actions.Bound.UPPER : actions.Bound.LOWER] ? "∞" : (_rightPrice$toSignifi = rightPrice === null || rightPrice === void 0 ? void 0 : rightPrice.toSignificant(8)) !== null && _rightPrice$toSignifi !== void 0 ? _rightPrice$toSignifi : "",
    onUserInput: onRightRangeInput,
    decrement: isSorted ? getDecrementUpper : getIncrementLower,
    increment: isSorted ? getIncrementUpper : getDecrementLower,
    incrementDisabled: rightPrice === undefined || ticksAtLimit[isSorted ? actions.Bound.UPPER : actions.Bound.LOWER],
    decrementDisabled: rightPrice === undefined || ticksAtLimit[isSorted ? actions.Bound.UPPER : actions.Bound.LOWER],
    feeAmount: feeAmount,
    label: rightPrice ? "".concat(currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol) : "-",
    tokenA: currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol,
    tokenB: currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol,
    title: /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
      id: "kAC8rT",
      message: "High price"
    })
  }));
}

module.exports = RangeSelector;
