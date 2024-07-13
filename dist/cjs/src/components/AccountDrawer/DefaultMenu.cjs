'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var core = require('@web3-react/core');
var index = require('../Column/index.cjs');
var index$1 = require('../WalletModal/index.cjs');
var styled = require('styled-components');
var AuthenticatedHeader = require('./AuthenticatedHeader.cjs');
var LanguageMenu = require('./LanguageMenu.cjs');
var LocalCurrencyMenu = require('./LocalCurrencyMenu.cjs');
var SettingsMenu = require('./SettingsMenu.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var DefaultMenuWrap = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  height: 100%;\n"])));
var MenuState = /*#__PURE__*/function (MenuState) {
  MenuState[MenuState["DEFAULT"] = 0] = "DEFAULT";
  MenuState[MenuState["SETTINGS"] = 1] = "SETTINGS";
  MenuState[MenuState["LANGUAGE_SETTINGS"] = 2] = "LANGUAGE_SETTINGS";
  MenuState[MenuState["LOCAL_CURRENCY_SETTINGS"] = 3] = "LOCAL_CURRENCY_SETTINGS";
  return MenuState;
}(MenuState || {});
function DefaultMenu(_ref) {
  var drawerOpen = _ref.drawerOpen,
    _ref$onShowNftProfile = _ref.onShowNftProfile,
    onShowNftProfile = _ref$onShowNftProfile === void 0 ? function () {
      return null;
    } : _ref$onShowNftProfile;
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  var isAuthenticated = !!account;
  var _useState = React.useState(MenuState.DEFAULT),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    menu = _useState2[0],
    setMenu = _useState2[1];
  var openSettings = React.useCallback(function () {
    return setMenu(MenuState.SETTINGS);
  }, []);
  var closeSettings = React.useCallback(function () {
    return setMenu(MenuState.DEFAULT);
  }, []);
  var openLanguageSettings = React.useCallback(function () {
    return setMenu(MenuState.LANGUAGE_SETTINGS);
  }, []);
  var openLocalCurrencySettings = React.useCallback(function () {
    return setMenu(MenuState.LOCAL_CURRENCY_SETTINGS);
  }, []);
  React.useEffect(function () {
    if (!drawerOpen && menu !== MenuState.DEFAULT) {
      // wait for the drawer to close before resetting the menu
      var timer = setTimeout(function () {
        closeSettings();
      }, 250);
      return function () {
        return clearTimeout(timer);
      };
    }
    return;
  }, [drawerOpen, menu, closeSettings]);
  var SubMenu = React.useMemo(function () {
    switch (menu) {
      case MenuState.DEFAULT:
        return isAuthenticated ? /*#__PURE__*/React__default["default"].createElement(AuthenticatedHeader, {
          account: account,
          openSettings: openSettings,
          onShowNftProfile: onShowNftProfile
        }) : /*#__PURE__*/React__default["default"].createElement(index$1, {
          openSettings: openSettings
        });
      case MenuState.SETTINGS:
        return /*#__PURE__*/React__default["default"].createElement(SettingsMenu, {
          onClose: closeSettings,
          openLanguageSettings: openLanguageSettings,
          openLocalCurrencySettings: openLocalCurrencySettings
        });
      case MenuState.LANGUAGE_SETTINGS:
        return /*#__PURE__*/React__default["default"].createElement(LanguageMenu["default"], {
          onClose: openSettings
        });
      case MenuState.LOCAL_CURRENCY_SETTINGS:
        return /*#__PURE__*/React__default["default"].createElement(LocalCurrencyMenu, {
          onClose: openSettings
        });
    }
  }, [account, closeSettings, isAuthenticated, menu, openLanguageSettings, openLocalCurrencySettings, openSettings, onShowNftProfile]);
  return /*#__PURE__*/React__default["default"].createElement(DefaultMenuWrap, null, SubMenu);
}

module.exports = DefaultMenu;
