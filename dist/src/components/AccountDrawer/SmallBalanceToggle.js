import React__default from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { i18n } from '../../../node_modules/@lingui/core/dist/index.mjs.js';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { SettingsToggle } from './SettingsToggle.js';

var hideSmallBalancesAtom = atomWithStorage("hideSmallBalances", true);
function SmallBalanceToggle() {
  var _useAtom = useAtom(hideSmallBalancesAtom),
    _useAtom2 = _slicedToArray(_useAtom, 2),
    hideSmallBalances = _useAtom2[0],
    updateHideSmallBalances = _useAtom2[1];
  return /*#__PURE__*/React__default.createElement(SettingsToggle, {
    title: i18n._(
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

export { SmallBalanceToggle, hideSmallBalancesAtom };
