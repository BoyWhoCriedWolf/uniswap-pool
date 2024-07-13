'use strict';

var React = require('react');
var index$3 = require('../components/AccountDrawer/index.cjs');
var index$1 = require('../components/Polling/index.cjs');
var index = require('../components/Popups/index.cjs');
var index$2 = require('../components/TopLevelModals/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function AppChrome() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref$onShowNftProfile = _ref.onShowNftProfile,
    onShowNftProfile = _ref$onShowNftProfile === void 0 ? function () {
      return null;
    } : _ref$onShowNftProfile;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index, null), /*#__PURE__*/React__default["default"].createElement(index$1, null), /*#__PURE__*/React__default["default"].createElement(index$2, null), /*#__PURE__*/React__default["default"].createElement(index$3["default"], {
    onShowNftProfile: onShowNftProfile
  }));
}

module.exports = AppChrome;
