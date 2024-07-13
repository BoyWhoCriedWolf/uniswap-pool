'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$9 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var core = require('@web3-react/core');
var index$8 = require('../AccountDrawer/index.cjs');
var index$3 = require('../AnimatedDropdown/index.cjs');
var index = require('../Column/index.cjs');
var index$1 = require('../Row/index.cjs');
var chains = require('../../constants/chains.cjs');
var useDisableScrolling = require('../../hooks/useDisableScrolling.cjs');
var useOnClickOutside = require('../../hooks/useOnClickOutside.cjs');
var Portal = require('../../nft/components/common/Portal.cjs');
require('../../nft/hooks/useBag.cjs');
require('../../nft/hooks/useCollectionFilters.cjs');
require('../../nft/hooks/useFiltersExpanded.cjs');
require('../../nft/hooks/useIsCollectionLoading.cjs');
var useIsMobile = require('../../nft/hooks/useIsMobile.cjs');
require('../../hooks/useScreenSize.cjs');
require('../../nft/hooks/useNFTList.cjs');
require('../../nft/hooks/useProfilePageState.cjs');
require('../../nft/hooks/useSellAsset.cjs');
require('../../nft/hooks/useSendTransaction.cjs');
require('@babel/runtime/helpers/slicedToArray');
require('../../nft/hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('@uniswap/sdk-core');
require('../../hooks/useUSDPrice.cjs');
require('../../constants/tokens.cjs');
require('jsbi');
require('../../lib/hooks/useCurrencyBalance.cjs');
require('../../nft/hooks/useWalletCollections.cjs');
var reactFeather = require('react-feather');
var hooks = require('../../state/application/hooks.cjs');
var reducer = require('../../state/application/reducer.cjs');
var utils = require('../../state/routing/utils.cjs');
var styled = require('styled-components');
var index$4 = require('../../theme/components/index.cjs');
var zIndex = require('../../theme/zIndex.cjs');
var index$5 = require('./MaxSlippageSettings/index.cjs');
var index$7 = require('./MenuButton/index.cjs');
var index$2 = require('./RouterPreferenceSettings/index.cjs');
var index$6 = require('./TransactionDeadlineSettings/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8;
var CloseButton = styled__default["default"].button(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  background: transparent;\n  border: none;\n  color: ", ";\n  cursor: pointer;\n  height: 24px;\n  padding: 0;\n  width: 24px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
var Menu = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n"])));
var MenuFlyout = styled__default["default"](index.AutoColumn)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  min-width: 20.125rem;\n  background-color: ", ";\n  border: 1px solid ", ";\n  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04),\n    0px 16px 24px rgba(0, 0, 0, 0.04), 0px 24px 32px rgba(0, 0, 0, 0.01);\n  border-radius: 12px;\n  position: absolute;\n  top: 100%;\n  margin-top: 10px;\n  right: 0;\n  z-index: 100;\n  color: ", ";\n  ", ";\n  user-select: none;\n  padding: 16px;\n"])), function (_ref2) {
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
  return theme.deprecated_mediaWidth.deprecated_upToMedium(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n    min-width: 18.125rem;\n  "])));
});
var ExpandColumn = styled__default["default"](index.AutoColumn)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  gap: 16px;\n  padding-top: ", ";\n"])), function (_ref6) {
  var $padTop = _ref6.$padTop;
  return $padTop ? "16px" : "0";
});
var MobileMenuContainer = styled__default["default"](index$1["default"])(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  overflow: visible;\n  position: fixed;\n  height: 100%;\n  top: 100vh;\n  left: 0;\n  right: 0;\n  width: 100%;\n  z-index: ", ";\n"])), zIndex.Z_INDEX.fixed);
var MobileMenuWrapper = styled__default["default"](index.Column)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  height: min-content;\n  width: 100%;\n  padding: 8px 16px 24px;\n  background-color: ", ";\n  overflow: hidden;\n  position: absolute;\n  bottom: ", ";\n  transition: bottom ", ";\n  border: ", ";\n  border-radius: 12px;\n  border-bottom-right-radius: 0px;\n  border-bottom-left-radius: 0px;\n  font-size: 16px;\n  box-shadow: unset;\n  z-index: ", ";\n"])), function (_ref7) {
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
}, zIndex.Z_INDEX.modal);
var MobileMenuHeader = styled__default["default"](index$1["default"])(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  margin-bottom: 16px;\n"])));
function SettingsTab(_ref11) {
  var autoSlippage = _ref11.autoSlippage,
    chainId = _ref11.chainId,
    trade = _ref11.trade,
    _ref11$showRoutingSet = _ref11.showRoutingSettings,
    showRoutingSettings = _ref11$showRoutingSet === void 0 ? true : _ref11$showRoutingSet;
  var _useWeb3React = core.useWeb3React(),
    connectedChainId = _useWeb3React.chainId;
  var showDeadlineSettings = Boolean(chainId && !chains.L2_CHAIN_IDS.includes(chainId));
  var node = React.useRef(null);
  var isOpen = hooks.useModalIsOpen(reducer.ApplicationModal.SETTINGS);
  var closeModal = hooks.useCloseModal();
  var closeMenu = React.useCallback(function () {
    return closeModal(reducer.ApplicationModal.SETTINGS);
  }, [closeModal]);
  var toggleMenu = hooks.useToggleSettingsMenu();
  var isMobile = useIsMobile.useIsMobile();
  var isOpenMobile = isOpen && isMobile;
  var isOpenDesktop = isOpen && !isMobile;
  useOnClickOutside.useOnClickOutside(node, isOpenDesktop ? closeMenu : undefined);
  useDisableScrolling(isOpen);
  var isChainSupported = chains.isSupportedChain(chainId);
  var Settings = React.useMemo(function () {
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, showRoutingSettings && /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
      gap: "16px"
    }, /*#__PURE__*/React__default["default"].createElement(index$2, null)), /*#__PURE__*/React__default["default"].createElement(index$3, {
      open: !utils.isUniswapXTrade(trade)
    }, /*#__PURE__*/React__default["default"].createElement(ExpandColumn, {
      $padTop: showRoutingSettings
    }, showRoutingSettings && /*#__PURE__*/React__default["default"].createElement(index$4.Divider, null), /*#__PURE__*/React__default["default"].createElement(index$5, {
      autoSlippage: autoSlippage
    }), showDeadlineSettings && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(index$4.Divider, null), /*#__PURE__*/React__default["default"].createElement(index$6, null)))));
  }, [autoSlippage, showDeadlineSettings, showRoutingSettings, trade]);
  return /*#__PURE__*/React__default["default"].createElement(Menu, {
    ref: node
  }, /*#__PURE__*/React__default["default"].createElement(index$7, {
    disabled: !isChainSupported || chainId !== connectedChainId,
    isActive: isOpen,
    onClick: toggleMenu
  }), isOpenDesktop && /*#__PURE__*/React__default["default"].createElement(MenuFlyout, null, Settings), isOpenMobile && /*#__PURE__*/React__default["default"].createElement(Portal.Portal, null, /*#__PURE__*/React__default["default"].createElement(MobileMenuContainer, {
    "data-testid": "mobile-settings-menu"
  }, /*#__PURE__*/React__default["default"].createElement(index$8.Scrim, {
    onClick: closeMenu,
    $open: true
  }), /*#__PURE__*/React__default["default"].createElement(MobileMenuWrapper, {
    $open: true
  }, /*#__PURE__*/React__default["default"].createElement(MobileMenuHeader, {
    padding: "8px 0px 4px"
  }, /*#__PURE__*/React__default["default"].createElement(CloseButton, {
    "data-testid": "mobile-settings-close",
    onClick: closeMenu
  }, /*#__PURE__*/React__default["default"].createElement(reactFeather.X, {
    size: 24
  })), /*#__PURE__*/React__default["default"].createElement(index$1["default"], {
    padding: "0px 24px 0px 0px",
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, /*#__PURE__*/React__default["default"].createElement(index$9.Trans, {
    id: "Tz0i8g",
    message: "Settings"
  })))), Settings))));
}

module.exports = SettingsTab;
