'use strict';

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var v3Sdk = require('@uniswap/v3-sdk');
var React = require('react');
var actions = require('../state/mint/v3/actions.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function useIsTickAtLimit(feeAmount, tickLower, tickUpper) {
  return React.useMemo(function () {
    return _defineProperty__default["default"](_defineProperty__default["default"]({}, actions.Bound.LOWER, feeAmount && tickLower ? tickLower === v3Sdk.nearestUsableTick(v3Sdk.TickMath.MIN_TICK, v3Sdk.TICK_SPACINGS[feeAmount]) : undefined), actions.Bound.UPPER, feeAmount && tickUpper ? tickUpper === v3Sdk.nearestUsableTick(v3Sdk.TickMath.MAX_TICK, v3Sdk.TICK_SPACINGS[feeAmount]) : undefined);
  }, [feeAmount, tickLower, tickUpper]);
}

module.exports = useIsTickAtLimit;
