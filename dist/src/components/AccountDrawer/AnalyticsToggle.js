import React__default from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { i18n } from '../../../node_modules/@lingui/core/dist/index.mjs.js';
import { allowAnalyticsAtom } from '../../analytics/index.js';
import { useAtom } from 'jotai';
import { SettingsToggle } from './SettingsToggle.js';

function AnalyticsToggle() {
  var _useAtom = useAtom(allowAnalyticsAtom),
    _useAtom2 = _slicedToArray(_useAtom, 2),
    allowAnalytics = _useAtom2[0],
    updateAllowAnalytics = _useAtom2[1];
  return /*#__PURE__*/React__default.createElement(SettingsToggle, {
    title: i18n._(
    /*i18n*/
    {
      id: "wPqqLQ",
      message: "Allow analytics"
    }),
    description: i18n._(
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

export { AnalyticsToggle };
