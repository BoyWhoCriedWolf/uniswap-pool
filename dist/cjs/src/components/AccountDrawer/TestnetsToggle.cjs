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

var showTestnetsAtom = utils.atomWithStorage("showTestnets", false);
function TestnetsToggle() {
  var _useAtom = jotai.useAtom(showTestnetsAtom),
    _useAtom2 = _slicedToArray__default["default"](_useAtom, 2),
    showTestnets = _useAtom2[0],
    updateShowTestnets = _useAtom2[1];
  return /*#__PURE__*/React__default["default"].createElement(SettingsToggle.SettingsToggle, {
    title: index.i18n._(
    /*i18n*/
    {
      id: "SK9kkG",
      message: "Show testnets"
    }),
    dataid: "testnets-toggle",
    isActive: showTestnets,
    toggle: function toggle() {
      return void updateShowTestnets(function (value) {
        return !value;
      });
    }
  });
}

exports.TestnetsToggle = TestnetsToggle;
exports.showTestnetsAtom = showTestnetsAtom;
