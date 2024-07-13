'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var core = require('@web3-react/core');
var index$1 = require('../../Column/index.cjs');
var UniswapXBrandMark = require('../../Logo/UniswapXBrandMark.cjs');
var index = require('../../Row/index.cjs');
var index$4 = require('../../Toggle/index.cjs');
var chains = require('../../../constants/chains.cjs');
var uniswapXDefault = require('../../../featureFlags/flags/uniswapXDefault.cjs');
var hooks$1 = require('../../../state/hooks.cjs');
var types = require('../../../state/routing/types.cjs');
var hooks = require('../../../state/user/hooks.cjs');
var reducer = require('../../../state/user/reducer.cjs');
var styled = require('styled-components');
var index$3 = require('../../../theme/components/index.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var InlineLink = styled__default["default"](text.ThemedText.BodySmall)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  display: inline;\n  cursor: pointer;\n  &:hover {\n    opacity: 0.8;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.accent1;
});
function RouterPreferenceSettings() {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _useRouterPreference = hooks.useRouterPreference(),
    _useRouterPreference2 = _slicedToArray__default["default"](_useRouterPreference, 2),
    routerPreference = _useRouterPreference2[0],
    setRouterPreference = _useRouterPreference2[1];
  var uniswapXEnabled = chainId && chains.isUniswapXSupportedChain(chainId);
  var dispatch = hooks$1.useAppDispatch();
  var userOptedOutOfUniswapX = hooks.useUserOptedOutOfUniswapX();
  var isUniswapXDefaultEnabled = uniswapXDefault.useUniswapXDefaultEnabled();
  var isUniswapXOverrideEnabled = isUniswapXDefaultEnabled && !userOptedOutOfUniswapX;
  var uniswapXInEffect = routerPreference === types.RouterPreference.X || routerPreference !== types.RouterPreference.CLIENT && isUniswapXOverrideEnabled;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, uniswapXEnabled && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index.RowBetween, {
    gap: "sm"
  }, /*#__PURE__*/React__default["default"].createElement(index.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(index$1.Column, {
    gap: "xs"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySecondary, null, /*#__PURE__*/React__default["default"].createElement(UniswapXBrandMark, null)), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "luHsSe",
    message: "When available, aggregates liquidity sources for better prices and gas free swaps."
  }), " ", /*#__PURE__*/React__default["default"].createElement(index$3.ExternalLink, {
    href: "https://support.uniswap.org/hc/en-us/articles/17515415311501"
  }, /*#__PURE__*/React__default["default"].createElement(InlineLink, null, "Learn more"))))), /*#__PURE__*/React__default["default"].createElement(index$4, {
    id: "toggle-uniswap-x-button"
    // If UniswapX-by-default is enabled we need to render this as active even if routerPreference === RouterPreference.API
    // because we're going to default to the UniswapX quote.
    // If the user manually toggles it off, this doesn't apply.
    ,
    isActive: uniswapXInEffect,
    toggle: function toggle() {
      if (uniswapXInEffect) {
        if (isUniswapXDefaultEnabled) {
          // We need to remember if a opts out of UniswapX, so we don't request UniswapX quotes.
          dispatch(reducer.updateOptedOutOfUniswapX({
            optedOutOfUniswapX: true
          }));
        } else {
          // We need to remember if a user disables Uniswap X, so we don't show the opt-in flow again.
          dispatch(reducer.updateDisabledUniswapX({
            disabledUniswapX: true
          }));
        }
      }
      setRouterPreference(uniswapXInEffect ? types.RouterPreference.API : types.RouterPreference.X);
    }
  })), /*#__PURE__*/React__default["default"].createElement(index$3.Divider, null)), /*#__PURE__*/React__default["default"].createElement(index.RowBetween, {
    gap: "sm"
  }, /*#__PURE__*/React__default["default"].createElement(index.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(index$1.Column, {
    gap: "xs"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySecondary, null, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "8P1EZe",
    message: "Local routing"
  })))), /*#__PURE__*/React__default["default"].createElement(index$4, {
    id: "toggle-local-routing-button",
    isActive: routerPreference === types.RouterPreference.CLIENT,
    toggle: function toggle() {
      return setRouterPreference(routerPreference === types.RouterPreference.CLIENT ? isUniswapXDefaultEnabled ? types.RouterPreference.X : types.RouterPreference.API : types.RouterPreference.CLIENT);
    }
  })));
}

module.exports = RouterPreferenceSettings;
