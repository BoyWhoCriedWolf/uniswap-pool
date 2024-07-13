import React__default, { useMemo } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { SUPPORTED_LOCAL_CURRENCIES, getLocalCurrencyIcon } from '../../constants/localCurrencies.js';
import { useActiveLocalCurrency } from '../../hooks/useActiveLocalCurrency.js';
import { useLocalCurrencyLinkProps } from '../../hooks/useLocalCurrencyLinkProps.js';
import styled from 'styled-components';
import { MenuColumn, MenuItem } from './shared.js';
import { SlideOutMenu } from './SlideOutMenu.js';

var _templateObject;
var StyledLocalCurrencyIcon = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 20px;\n  height: 20px;\n  border-radius: 100%;\n  overflow: hidden;\n"])));
function LocalCurrencyMenuItem(_ref) {
  var localCurrency = _ref.localCurrency,
    isActive = _ref.isActive;
  var _useLocalCurrencyLink = useLocalCurrencyLinkProps(localCurrency),
    to = _useLocalCurrencyLink.to,
    onClick = _useLocalCurrencyLink.onClick;
  var LocalCurrencyIcon = useMemo(function () {
    return /*#__PURE__*/React__default.createElement(StyledLocalCurrencyIcon, null, getLocalCurrencyIcon(localCurrency));
  }, [localCurrency]);
  if (!to) return null;
  return /*#__PURE__*/React__default.createElement(MenuItem, {
    label: localCurrency,
    logo: LocalCurrencyIcon,
    isActive: isActive,
    to: to,
    onClick: onClick,
    testId: "wallet-local-currency-item"
  });
}
function LocalCurrencyMenu(_ref2) {
  var onClose = _ref2.onClose;
  var activeLocalCurrency = useActiveLocalCurrency();
  return /*#__PURE__*/React__default.createElement(SlideOutMenu, {
    title: /*#__PURE__*/React__default.createElement(Trans, {
      id: "Q2lUR2",
      message: "Currency"
    }),
    onClose: onClose
  }, /*#__PURE__*/React__default.createElement(MenuColumn, null, SUPPORTED_LOCAL_CURRENCIES.map(function (localCurrency) {
    return /*#__PURE__*/React__default.createElement(LocalCurrencyMenuItem, {
      localCurrency: localCurrency,
      isActive: activeLocalCurrency === localCurrency,
      key: localCurrency
    });
  })));
}

export { LocalCurrencyMenu as default };
