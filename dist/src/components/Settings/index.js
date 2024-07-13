import React__default, { useRef, useCallback, useMemo } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useWeb3React } from '@web3-react/core';
import { Scrim } from '../AccountDrawer/index.js';
import AnimatedDropdown from '../AnimatedDropdown/index.js';
import { AutoColumn, Column } from '../Column/index.js';
import Row from '../Row/index.js';
import { isSupportedChain, L2_CHAIN_IDS } from '../../constants/chains.js';
import useDisableScrolling from '../../hooks/useDisableScrolling.js';
import { useOnClickOutside } from '../../hooks/useOnClickOutside.js';
import { Portal } from '../../nft/components/common/Portal.js';
import '../../nft/hooks/useBag.js';
import '../../nft/hooks/useCollectionFilters.js';
import '../../nft/hooks/useFiltersExpanded.js';
import '../../nft/hooks/useIsCollectionLoading.js';
import { useIsMobile } from '../../nft/hooks/useIsMobile.js';
import '../../hooks/useScreenSize.js';
import '../../nft/hooks/useNFTList.js';
import '../../nft/hooks/useProfilePageState.js';
import '../../nft/hooks/useSellAsset.js';
import '../../nft/hooks/useSendTransaction.js';
import '@babel/runtime/helpers/slicedToArray';
import '../../nft/hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../hooks/useUSDPrice.js';
import '../../constants/tokens.js';
import 'jsbi';
import '../../lib/hooks/useCurrencyBalance.js';
import '../../nft/hooks/useWalletCollections.js';
import { X } from 'react-feather';
import { useModalIsOpen, useCloseModal, useToggleSettingsMenu } from '../../state/application/hooks.js';
import { ApplicationModal } from '../../state/application/reducer.js';
import { isUniswapXTrade } from '../../state/routing/utils.js';
import styled from 'styled-components';
import { Divider } from '../../theme/components/index.js';
import { Z_INDEX } from '../../theme/zIndex.js';
import MaxSlippageSettings from './MaxSlippageSettings/index.js';
import MenuButton from './MenuButton/index.js';
import RouterPreferenceSettings from './RouterPreferenceSettings/index.js';
import TransactionDeadlineSettings from './TransactionDeadlineSettings/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var CloseButton = styled.button(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background: transparent;\n  border: none;\n  color: ", ";\n  cursor: pointer;\n  height: 24px;\n  padding: 0;\n  width: 24px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var Menu = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: relative;\n"])));
var MenuFlyout = styled(AutoColumn)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  min-width: 20.125rem;\n  background-color: ", ";\n  border: 1px solid ", ";\n  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04),\n    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);\n  border-radius: 12px;\n  position: absolute;\n  top: 100%;\n  margin-top: 10px;\n  right: 0;\n  z-index: 100;\n  color: ", ";\n  ", ";\n  user-select: none;\n  padding: 16px;\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface1;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral1;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n    min-width: 18.125rem;\n  "])));
});
var ExpandColumn = styled(AutoColumn)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  gap: 16px;\n  padding-top: ", ";\n"])), function (_ref6) {
  var $padTop = _ref6.$padTop;
  return $padTop ? "16px" : "0";
});
var MobileMenuContainer = styled(Row)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  overflow: visible;\n  position: fixed;\n  height: 100%;\n  top: 100vh;\n  left: 0;\n  right: 0;\n  width: 100%;\n  z-index: ", ";\n"])), Z_INDEX.fixed);
var MobileMenuWrapper = styled(Column)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  height: min-content;\n  width: 100%;\n  padding: 8px 16px 24px;\n  background-color: ", ";\n  overflow: hidden;\n  position: absolute;\n  bottom: ", ";\n  transition: bottom ", ";\n  border: ", ";\n  border-radius: 12px;\n  border-bottom-right-radius: 0px;\n  border-bottom-left-radius: 0px;\n  font-size: 16px;\n  box-shadow: unset;\n  z-index: ", ";\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.surface1;
}, function (_ref8) {
  var $open = _ref8.$open;
  return $open ? "100vh" : 0;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.transition.duration.medium;
}, function (_ref10) {
  var theme = _ref10.theme;
  return "1px solid ".concat(theme.surface3);
}, Z_INDEX.modal);
var MobileMenuHeader = styled(Row)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  margin-bottom: 16px;\n"])));
function SettingsTab(_ref11) {
  var autoSlippage = _ref11.autoSlippage,
    chainId = _ref11.chainId,
    trade = _ref11.trade,
    _ref11$showRoutingSet = _ref11.showRoutingSettings,
    showRoutingSettings = _ref11$showRoutingSet === void 0 ? true : _ref11$showRoutingSet;
  var _useWeb3React = useWeb3React(),
    connectedChainId = _useWeb3React.chainId;
  var showDeadlineSettings = Boolean(chainId && !L2_CHAIN_IDS.includes(chainId));
  var node = useRef(null);
  var isOpen = useModalIsOpen(ApplicationModal.SETTINGS);
  var closeModal = useCloseModal();
  var closeMenu = useCallback(function () {
    return closeModal(ApplicationModal.SETTINGS);
  }, [closeModal]);
  var toggleMenu = useToggleSettingsMenu();
  var isMobile = useIsMobile();
  var isOpenMobile = isOpen && isMobile;
  var isOpenDesktop = isOpen && !isMobile;
  useOnClickOutside(node, isOpenDesktop ? closeMenu : undefined);
  useDisableScrolling(isOpen);
  var isChainSupported = isSupportedChain(chainId);
  var Settings = useMemo(function () {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, showRoutingSettings && /*#__PURE__*/React__default.createElement(AutoColumn, {
      gap: "16px"
    }, /*#__PURE__*/React__default.createElement(RouterPreferenceSettings, null)), /*#__PURE__*/React__default.createElement(AnimatedDropdown, {
      open: !isUniswapXTrade(trade)
    }, /*#__PURE__*/React__default.createElement(ExpandColumn, {
      $padTop: showRoutingSettings
    }, showRoutingSettings && /*#__PURE__*/React__default.createElement(Divider, null), /*#__PURE__*/React__default.createElement(MaxSlippageSettings, {
      autoSlippage: autoSlippage
    }), showDeadlineSettings && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Divider, null), /*#__PURE__*/React__default.createElement(TransactionDeadlineSettings, null)))));
  }, [autoSlippage, showDeadlineSettings, showRoutingSettings, trade]);
  return /*#__PURE__*/React__default.createElement(Menu, {
    ref: node
  }, /*#__PURE__*/React__default.createElement(MenuButton, {
    disabled: !isChainSupported || chainId !== connectedChainId,
    isActive: isOpen,
    onClick: toggleMenu
  }), isOpenDesktop && /*#__PURE__*/React__default.createElement(MenuFlyout, null, Settings), isOpenMobile && /*#__PURE__*/React__default.createElement(Portal, null, /*#__PURE__*/React__default.createElement(MobileMenuContainer, {
    "data-testid": "mobile-settings-menu"
  }, /*#__PURE__*/React__default.createElement(Scrim, {
    onClick: closeMenu,
    $open: true
  }), /*#__PURE__*/React__default.createElement(MobileMenuWrapper, {
    $open: true
  }, /*#__PURE__*/React__default.createElement(MobileMenuHeader, {
    padding: "8px 0px 4px"
  }, /*#__PURE__*/React__default.createElement(CloseButton, {
    "data-testid": "mobile-settings-close",
    onClick: closeMenu
  }, /*#__PURE__*/React__default.createElement(X, {
    size: 24
  })), /*#__PURE__*/React__default.createElement(Row, {
    padding: "0px 24px 0px 0px",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Tz0i8g",
    message: "Settings"
  })))), Settings))));
}

export { SettingsTab as default };
