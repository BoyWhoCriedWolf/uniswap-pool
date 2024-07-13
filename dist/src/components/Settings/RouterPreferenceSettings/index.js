import React__default from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useWeb3React } from '@web3-react/core';
import { Column } from '../../Column/index.js';
import UniswapXBrandMark from '../../Logo/UniswapXBrandMark.js';
import { RowBetween, RowFixed } from '../../Row/index.js';
import Toggle from '../../Toggle/index.js';
import { isUniswapXSupportedChain } from '../../../constants/chains.js';
import { useUniswapXDefaultEnabled } from '../../../featureFlags/flags/uniswapXDefault.js';
import { useAppDispatch } from '../../../state/hooks.js';
import { RouterPreference } from '../../../state/routing/types.js';
import { useRouterPreference, useUserOptedOutOfUniswapX } from '../../../state/user/hooks.js';
import { updateOptedOutOfUniswapX, updateDisabledUniswapX } from '../../../state/user/reducer.js';
import styled from 'styled-components';
import { ExternalLink, Divider } from '../../../theme/components/index.js';
import { ThemedText } from '../../../theme/components/text.js';

var _templateObject;
var InlineLink = styled(ThemedText.BodySmall)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n  display: inline;\n  cursor: pointer;\n  &:hover {\n    opacity: 0.8;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.accent1;
});
function RouterPreferenceSettings() {
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _useRouterPreference = useRouterPreference(),
    _useRouterPreference2 = _slicedToArray(_useRouterPreference, 2),
    routerPreference = _useRouterPreference2[0],
    setRouterPreference = _useRouterPreference2[1];
  var uniswapXEnabled = chainId && isUniswapXSupportedChain(chainId);
  var dispatch = useAppDispatch();
  var userOptedOutOfUniswapX = useUserOptedOutOfUniswapX();
  var isUniswapXDefaultEnabled = useUniswapXDefaultEnabled();
  var isUniswapXOverrideEnabled = isUniswapXDefaultEnabled && !userOptedOutOfUniswapX;
  var uniswapXInEffect = routerPreference === RouterPreference.X || routerPreference !== RouterPreference.CLIENT && isUniswapXOverrideEnabled;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, uniswapXEnabled && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(RowBetween, {
    gap: "sm"
  }, /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(Column, {
    gap: "xs"
  }, /*#__PURE__*/React__default.createElement(ThemedText.BodySecondary, null, /*#__PURE__*/React__default.createElement(UniswapXBrandMark, null)), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "luHsSe",
    message: "When available, aggregates liquidity sources for better prices and gas free swaps."
  }), " ", /*#__PURE__*/React__default.createElement(ExternalLink, {
    href: "https://support.uniswap.org/hc/en-us/articles/17515415311501"
  }, /*#__PURE__*/React__default.createElement(InlineLink, null, "Learn more"))))), /*#__PURE__*/React__default.createElement(Toggle, {
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
          dispatch(updateOptedOutOfUniswapX({
            optedOutOfUniswapX: true
          }));
        } else {
          // We need to remember if a user disables Uniswap X, so we don't show the opt-in flow again.
          dispatch(updateDisabledUniswapX({
            disabledUniswapX: true
          }));
        }
      }
      setRouterPreference(uniswapXInEffect ? RouterPreference.API : RouterPreference.X);
    }
  })), /*#__PURE__*/React__default.createElement(Divider, null)), /*#__PURE__*/React__default.createElement(RowBetween, {
    gap: "sm"
  }, /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(Column, {
    gap: "xs"
  }, /*#__PURE__*/React__default.createElement(ThemedText.BodySecondary, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "8P1EZe",
    message: "Local routing"
  })))), /*#__PURE__*/React__default.createElement(Toggle, {
    id: "toggle-local-routing-button",
    isActive: routerPreference === RouterPreference.CLIENT,
    toggle: function toggle() {
      return setRouterPreference(routerPreference === RouterPreference.CLIENT ? isUniswapXDefaultEnabled ? RouterPreference.X : RouterPreference.API : RouterPreference.CLIENT);
    }
  })));
}

export { RouterPreferenceSettings as default };
