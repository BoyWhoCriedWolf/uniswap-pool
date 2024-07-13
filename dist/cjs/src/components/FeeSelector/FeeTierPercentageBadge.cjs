'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../Badge/index.cjs');
var usePools = require('../../hooks/usePools.cjs');
var React = require('react');
require('../../theme/components/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function FeeTierPercentageBadge(_ref) {
  var _distributions$feeAmo;
  var feeAmount = _ref.feeAmount,
    distributions = _ref.distributions,
    poolState = _ref.poolState;
  return /*#__PURE__*/React__default["default"].createElement(index["default"], null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, {
    fontSize: 10
  }, !distributions || poolState === usePools.PoolState.NOT_EXISTS || poolState === usePools.PoolState.INVALID ? /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "cKHbrZ",
    message: "Not created"
  }) : distributions[feeAmount] !== undefined ? /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "P1NNMy",
    message: "{0}% select",
    values: {
      "0": (_distributions$feeAmo = distributions[feeAmount]) === null || _distributions$feeAmo === void 0 ? void 0 : _distributions$feeAmo.toFixed(0)
    }
  }) : /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "plhHQt",
    message: "No data"
  })));
}

exports.FeeTierPercentageBadge = FeeTierPercentageBadge;
