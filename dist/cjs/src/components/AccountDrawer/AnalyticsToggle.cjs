'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var index$1 = require('../../../node_modules/@lingui/core/dist/index.cjs');
var index = require('../../analytics/index.cjs');
var jotai = require('jotai');
var SettingsToggle = require('./SettingsToggle.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

function AnalyticsToggle() {
  var _useAtom = jotai.useAtom(index.allowAnalyticsAtom),
    _useAtom2 = _slicedToArray__default["default"](_useAtom, 2),
    allowAnalytics = _useAtom2[0],
    updateAllowAnalytics = _useAtom2[1];
  return /*#__PURE__*/React__default["default"].createElement(SettingsToggle.SettingsToggle, {
    title: index$1.i18n._(
    /*i18n*/
    {
      id: "wPqqLQ",
      message: "Allow analytics"
    }),
    description: index$1.i18n._(
    /*i18n*/
    {
      id: "OVAVPi",
      message: "We use anonymized data to enhance your experience with Uniswap Labs products."
    }),
    isActive: allowAnalytics,
    toggle: function toggle() {
      return void updateAllowAnalytics(function (value) {
        return !value;
      });
    }
  });
}

exports.AnalyticsToggle = AnalyticsToggle;
