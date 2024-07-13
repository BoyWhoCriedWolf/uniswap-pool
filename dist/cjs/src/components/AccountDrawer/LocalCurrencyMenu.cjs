'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../../../node_modules/@lingui/react/dist/index.cjs');
var localCurrencies = require('../../constants/localCurrencies.cjs');
var useActiveLocalCurrency = require('../../hooks/useActiveLocalCurrency.cjs');
var useLocalCurrencyLinkProps = require('../../hooks/useLocalCurrencyLinkProps.cjs');
var styled = require('styled-components');
var shared = require('./shared.cjs');
var SlideOutMenu = require('./SlideOutMenu.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var StyledLocalCurrencyIcon = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: 20px;\n  height: 20px;\n  border-radius: 100%;\n  overflow: hidden;\n"])));
function LocalCurrencyMenuItem(_ref) {
  var localCurrency = _ref.localCurrency,
    isActive = _ref.isActive;
  var _useLocalCurrencyLink = useLocalCurrencyLinkProps.useLocalCurrencyLinkProps(localCurrency),
    to = _useLocalCurrencyLink.to,
    onClick = _useLocalCurrencyLink.onClick;
  var LocalCurrencyIcon = React.useMemo(function () {
    return /*#__PURE__*/React__default["default"].createElement(StyledLocalCurrencyIcon, null, localCurrencies.getLocalCurrencyIcon(localCurrency));
  }, [localCurrency]);
  if (!to) return null;
  return /*#__PURE__*/React__default["default"].createElement(shared.MenuItem, {
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
  var activeLocalCurrency = useActiveLocalCurrency.useActiveLocalCurrency();
  return /*#__PURE__*/React__default["default"].createElement(SlideOutMenu.SlideOutMenu, {
    title: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "Q2lUR2",
      message: "Currency"
    }),
    onClose: onClose
  }, /*#__PURE__*/React__default["default"].createElement(shared.MenuColumn, null, localCurrencies.SUPPORTED_LOCAL_CURRENCIES.map(function (localCurrency) {
    return /*#__PURE__*/React__default["default"].createElement(LocalCurrencyMenuItem, {
      localCurrency: localCurrency,
      isActive: activeLocalCurrency === localCurrency,
      key: localCurrency
    });
  })));
}

module.exports = LocalCurrencyMenu;
