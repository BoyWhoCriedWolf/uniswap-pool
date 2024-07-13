import React__default, { useState, useCallback, useEffect, useMemo } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { useWeb3React } from '@web3-react/core';
import { Column } from '../Column/index.js';
import WalletModal from '../WalletModal/index.js';
import styled from 'styled-components';
import AuthenticatedHeader from './AuthenticatedHeader.js';
import LanguageMenu from './LanguageMenu.js';
import LocalCurrencyMenu from './LocalCurrencyMenu.js';
import SettingsMenu from './SettingsMenu.js';

var _templateObject;
var DefaultMenuWrap = styled(Column)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n"])));
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
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;
  var isAuthenticated = !!account;
  var _useState = useState(MenuState.DEFAULT),
    _useState2 = _slicedToArray(_useState, 2),
    menu = _useState2[0],
    setMenu = _useState2[1];
  var openSettings = useCallback(function () {
    return setMenu(MenuState.SETTINGS);
  }, []);
  var closeSettings = useCallback(function () {
    return setMenu(MenuState.DEFAULT);
  }, []);
  var openLanguageSettings = useCallback(function () {
    return setMenu(MenuState.LANGUAGE_SETTINGS);
  }, []);
  var openLocalCurrencySettings = useCallback(function () {
    return setMenu(MenuState.LOCAL_CURRENCY_SETTINGS);
  }, []);
  useEffect(function () {
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
  var SubMenu = useMemo(function () {
    switch (menu) {
      case MenuState.DEFAULT:
        return isAuthenticated ? /*#__PURE__*/React__default.createElement(AuthenticatedHeader, {
          account: account,
          openSettings: openSettings,
          onShowNftProfile: onShowNftProfile
        }) : /*#__PURE__*/React__default.createElement(WalletModal, {
          openSettings: openSettings
        });
      case MenuState.SETTINGS:
        return /*#__PURE__*/React__default.createElement(SettingsMenu, {
          onClose: closeSettings,
          openLanguageSettings: openLanguageSettings,
          openLocalCurrencySettings: openLocalCurrencySettings
        });
      case MenuState.LANGUAGE_SETTINGS:
        return /*#__PURE__*/React__default.createElement(LanguageMenu, {
          onClose: openSettings
        });
      case MenuState.LOCAL_CURRENCY_SETTINGS:
        return /*#__PURE__*/React__default.createElement(LocalCurrencyMenu, {
          onClose: openSettings
        });
    }
  }, [account, closeSettings, isAuthenticated, menu, openLanguageSettings, openLocalCurrencySettings, openSettings, onShowNftProfile]);
  return /*#__PURE__*/React__default.createElement(DefaultMenuWrap, null, SubMenu);
}

export { DefaultMenu as default };
