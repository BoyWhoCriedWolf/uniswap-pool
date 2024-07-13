'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var index = require('../../../node_modules/@lingui/react/dist/index.cjs');
var locales = require('../../constants/locales.cjs');
var useActiveLocale = require('../../hooks/useActiveLocale.cjs');
var useLocationLinkProps = require('../../hooks/useLocationLinkProps.cjs');
var shared = require('./shared.cjs');
var SlideOutMenu = require('./SlideOutMenu.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function LanguageMenuItem(_ref) {
  var locale = _ref.locale,
    isActive = _ref.isActive;
  var _useLocationLinkProps = useLocationLinkProps.useLocationLinkProps(),
    to = _useLocationLinkProps.to,
    onClick = _useLocationLinkProps.onClick;
  return /*#__PURE__*/React__default["default"].createElement(shared.MenuItem, {
    label: locales.LOCALE_LABEL[locale],
    onClick: onClick,
    to: to,
    isActive: isActive,
    testId: "wallet-language-item"
  });
}
function LanguageMenuItems() {
  var activeLocale = useActiveLocale.useActiveLocale();
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, locales.SUPPORTED_LOCALES.map(function (locale) {
    return /*#__PURE__*/React__default["default"].createElement(LanguageMenuItem, {
      locale: locale,
      isActive: activeLocale === locale,
      key: locale
    });
  }));
}
function LanguageMenu(_ref2) {
  var onClose = _ref2.onClose;
  return /*#__PURE__*/React__default["default"].createElement(SlideOutMenu.SlideOutMenu, {
    title: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "vXIe7J",
      message: "Language"
    }),
    onClose: onClose
  }, /*#__PURE__*/React__default["default"].createElement(shared.MenuColumn, null, /*#__PURE__*/React__default["default"].createElement(LanguageMenuItems, null)));
}

exports.LanguageMenuItems = LanguageMenuItems;
exports["default"] = LanguageMenu;
