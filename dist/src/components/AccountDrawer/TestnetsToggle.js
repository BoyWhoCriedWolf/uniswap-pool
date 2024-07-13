import React__default from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { i18n } from '../../../node_modules/@lingui/core/dist/index.mjs.js';
import { useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { SettingsToggle } from './SettingsToggle.js';

var showTestnetsAtom = atomWithStorage("showTestnets", false);
function TestnetsToggle() {
  var _useAtom = useAtom(showTestnetsAtom),
    _useAtom2 = _slicedToArray(_useAtom, 2),
    showTestnets = _useAtom2[0],
    updateShowTestnets = _useAtom2[1];
  return /*#__PURE__*/React__default.createElement(SettingsToggle, {
    title: i18n._(
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

export { TestnetsToggle, showTestnetsAtom };
