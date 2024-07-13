'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var index = require('../../../node_modules/@lingui/core/dist/index.cjs');
var jotai = require('jotai');
var utils = require('jotai/utils');
var SettingsToggle = require('./SettingsToggle.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

var hideSmallBalancesAtom = utils.atomWithStorage("hideSmallBalances", true);
function SmallBalanceToggle() {
  var _useAtom = jotai.useAtom(hideSmallBalancesAtom),
    _useAtom2 = _slicedToArray__default["default"](_useAtom, 2),
    hideSmallBalances = _useAtom2[0],
    updateHideSmallBalances = _useAtom2[1];
  return /*#__PURE__*/React__default["default"].createElement(SettingsToggle.SettingsToggle, {
    title: index.i18n._(
    /*i18n*/
    {
      id: "x1x78C",
      message: "Hide small balances"
    }),
    isActive: hideSmallBalances,
    toggle: function toggle() {
      return void updateHideSmallBalances(function (value) {
        return !value;
      });
    }
  });
}

exports.SmallBalanceToggle = SmallBalanceToggle;
exports.hideSmallBalancesAtom = hideSmallBalancesAtom;
