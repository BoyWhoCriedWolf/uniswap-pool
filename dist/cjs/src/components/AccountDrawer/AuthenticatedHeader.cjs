'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$8 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$6 = require('../../analytics/index.cjs');
var index = require('../Button/index.cjs');
var index$2 = require('../Column/index.cjs');
var Power = require('../Icons/Power.cjs');
var Settings = require('../Icons/Settings.cjs');
var index$7 = require('../Row/index.cjs');
var loading = require('../Tokens/loading.cjs');
var Delta = require('../Tokens/TokenDetails/Delta.cjs');
var index$9 = require('../Tooltip/index.cjs');
var index$3 = require('../../connection/index.cjs');
var useDisableNFTRoutes = require('../../hooks/useDisableNFTRoutes.cjs');
var useENSName = require('../../hooks/useENSName.cjs');
var useIsNotOriginCountry = require('../../hooks/useIsNotOriginCountry.cjs');
require('../../nft/hooks/useBag.cjs');
require('../../nft/hooks/useCollectionFilters.cjs');
require('../../nft/hooks/useFiltersExpanded.cjs');
require('../../nft/hooks/useIsCollectionLoading.cjs');
require('../../hooks/useScreenSize.cjs');
require('../../nft/hooks/useNFTList.cjs');
var useProfilePageState = require('../../nft/hooks/useProfilePageState.cjs');
var useSellAsset = require('../../nft/hooks/useSellAsset.cjs');
require('../../nft/hooks/useSendTransaction.cjs');
require('../../nft/hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('@uniswap/sdk-core');
require('../../hooks/useUSDPrice.cjs');
require('../../constants/tokens.cjs');
require('jsbi');
require('../../lib/hooks/useCurrencyBalance.cjs');
var useWalletCollections = require('../../nft/hooks/useWalletCollections.cjs');
var useIsNftClaimAvailable = require('../../nft/hooks/useIsNftClaimAvailable.cjs');
var index$5 = require('../../nft/types/sell/index.cjs');
var reactFeather = require('react-feather');
var hooks = require('../../state/hooks.cjs');
var reducer$1 = require('../../state/user/reducer.cjs');
var styled = require('styled-components');
var index$1 = require('../../theme/components/index.cjs');
var addresses = require('../../utils/addresses.cjs');
require('@ethersproject/constants');
require('@ethersproject/contracts');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var hooks$1 = require('../../state/application/hooks.cjs');
var reducer = require('../../state/application/reducer.cjs');
var hooks$2 = require('../../state/claim/hooks.cjs');
var StatusIcon = require('../Identicon/StatusIcon.cjs');
var PrefetchBalancesWrapper = require('../PrefetchBalancesWrapper/PrefetchBalancesWrapper.cjs');
var index$4 = require('./index.cjs');
var IconButton = require('./IconButton.cjs');
var index$a = require('./MiniPortfolio/index.cjs');
var PortfolioRow = require('./MiniPortfolio/PortfolioRow.cjs');
var text = require('../../theme/components/text.cjs');
var LoadingButtonSpinner = require('../Button/LoadingButtonSpinner.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15;
var AuthenticatedHeaderWrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding: 20px 16px;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n"])));
var HeaderButton = styled__default["default"](index.ThemeButton)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  border-color: transparent;\n  border-radius: 12px;\n  border-style: solid;\n  border-width: 1px;\n  height: 40px;\n  margin-top: 8px;\n"])));
var WalletButton = styled__default["default"](index.ThemeButton)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 12px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  margin-top: 4px;\n  color: white;\n  border: none;\n"])));
var UNIButton = styled__default["default"](WalletButton)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 12px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  margin-top: 4px;\n  color: white;\n  border: none;\n  background: linear-gradient(to right, #9139b0 0%, #4261d6 100%);\n"])));
var IconContainer = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  align-items: center;\n  & > a,\n  & > button {\n    margin-right: 8px;\n  }\n\n  & > button:last-child {\n    margin-right: 0px;\n    ", ":last-child {\n      left: 0px;\n    }\n  }\n"])), IconButton.IconHoverText);
var FiatOnrampNotAvailableText = styled__default["default"](text.ThemedText.BodySmall)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var FiatOnrampAvailabilityExternalLink = styled__default["default"](index$1.ExternalLink)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  display: flex;\n  height: 14px;\n  justify-content: center;\n  margin-left: 6px;\n  width: 14px;\n"])));
var StatusWrapper = styled__default["default"].div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  display: inline-block;\n  width: 70%;\n  max-width: 70%;\n  padding-right: 8px;\n  display: inline-flex;\n"])));
var AccountNamesWrapper = styled__default["default"].div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  overflow: hidden;\n  white-space: nowrap;\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  justify-content: center;\n  margin-left: 8px;\n"])));
var StyledInfoIcon = styled__default["default"](reactFeather.Info)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  height: 12px;\n  width: 12px;\n  flex: 1 1 auto;\n"])));
var StyledLoadingButtonSpinner = styled__default["default"](LoadingButtonSpinner)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  fill: ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.accent1;
});
var HeaderWrapper = styled__default["default"].div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n  margin-bottom: 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n"])));
var CopyText = styled__default["default"](index$1.CopyHelper).attrs({
  iconSize: 14,
  iconPosition: "right"
})(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral__default["default"]([""])));
var FadeInColumn = styled__default["default"](index$2.Column)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), PortfolioRow.portfolioFadeInAnimation);
var PortfolioDrawerContainer = styled__default["default"](index$2.Column)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral__default["default"](["\n  flex: 1;\n"])));
function AuthenticatedHeader(_ref3) {
  var _portfolioBalances$po, _portfolio$tokensTota, _portfolio$tokensTota2, _portfolio$tokensTota3, _groupSeparator;
  var account = _ref3.account,
    openSettings = _ref3.openSettings,
    _ref3$onShowNftProfil = _ref3.onShowNftProfile,
    onShowNftProfile = _ref3$onShowNftProfil === void 0 ? function () {
      return null;
    } : _ref3$onShowNftProfil;
  var _useWeb3React = core.useWeb3React(),
    connector = _useWeb3React.connector;
  var _useENSName = useENSName(account),
    ENSName = _useENSName.ENSName;
  var dispatch = hooks.useAppDispatch();
  var closeModal = hooks$1.useCloseModal();
  var setSellPageState = useProfilePageState.useProfilePageState(function (state) {
    return state.setProfilePageState;
  });
  var resetSellAssets = useSellAsset.useSellAsset(function (state) {
    return state.reset;
  });
  var clearCollectionFilters = useWalletCollections.useWalletCollections(function (state) {
    return state.clearCollectionFilters;
  });
  var isClaimAvailable = useIsNftClaimAvailable.useIsNftClaimAvailable(function (state) {
    return state.isClaimAvailable;
  });
  var shouldShowBuyFiatButton = useIsNotOriginCountry.useIsNotOriginCountry("GB");
  var _useFormatter = formatNumbers.useFormatter(),
    formatNumber = _useFormatter.formatNumber,
    formatPercent = _useFormatter.formatPercent;
  var shouldDisableNFTRoutes = useDisableNFTRoutes.useDisableNFTRoutes();
  var unclaimedAmount = hooks$2.useUserUnclaimedAmount(account);
  var isUnclaimed = hooks$2.useUserHasAvailableClaim(account);
  var connection = index$3.getConnection(connector);
  var openClaimModal = hooks$1.useToggleModal(reducer.ApplicationModal.ADDRESS_CLAIM);
  var openNftModal = hooks$1.useToggleModal(reducer.ApplicationModal.UNISWAP_NFT_AIRDROP_CLAIM);
  var disconnect = React.useCallback(function () {
    if (connector && connector.deactivate) {
      connector.deactivate();
    }
    connector.resetState();
    dispatch(reducer$1.updateSelectedWallet({
      wallet: undefined
    }));
  }, [connector, dispatch]);
  var toggleWalletDrawer = index$4.useToggleAccountDrawer();
  var navigateToProfile = React.useCallback(function () {
    toggleWalletDrawer();
    resetSellAssets();
    setSellPageState(index$5.ProfilePageStateType.VIEWING);
    clearCollectionFilters();
    // navigate("/nfts/profile");
    onShowNftProfile();
    closeModal();
  }, [clearCollectionFilters, closeModal,
  // navigate,
  onShowNftProfile, resetSellAssets, setSellPageState, toggleWalletDrawer]);
  var openFiatOnrampModal = hooks$1.useOpenModal(reducer.ApplicationModal.FIAT_ONRAMP);
  var openFoRModalWithAnalytics = React.useCallback(function () {
    toggleWalletDrawer();
    index$6.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.FIAT_ONRAMP_WIDGET_OPENED);
    openFiatOnrampModal();
  }, [openFiatOnrampModal, toggleWalletDrawer]);
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    shouldCheck = _useState2[0],
    setShouldCheck = _useState2[1];
  var _useFiatOnrampAvailab = hooks$1.useFiatOnrampAvailability(shouldCheck, openFoRModalWithAnalytics),
    fiatOnrampAvailable = _useFiatOnrampAvailab.available,
    fiatOnrampAvailabilityChecked = _useFiatOnrampAvailab.availabilityChecked,
    error = _useFiatOnrampAvailab.error,
    fiatOnrampAvailabilityLoading = _useFiatOnrampAvailab.loading;
  var handleBuyCryptoClick = React.useCallback(function () {
    if (!fiatOnrampAvailabilityChecked) {
      setShouldCheck(true);
    } else if (fiatOnrampAvailable) {
      openFoRModalWithAnalytics();
    }
  }, [fiatOnrampAvailabilityChecked, fiatOnrampAvailable, openFoRModalWithAnalytics]);
  var disableBuyCryptoButton = Boolean(error || !fiatOnrampAvailable && fiatOnrampAvailabilityChecked || fiatOnrampAvailabilityLoading);
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    showFiatOnrampUnavailableTooltip = _useState4[0],
    setShow = _useState4[1];
  var openFiatOnrampUnavailableTooltip = React.useCallback(function () {
    return setShow(true);
  }, [setShow]);
  var closeFiatOnrampUnavailableTooltip = React.useCallback(function () {
    return setShow(false);
  }, [setShow]);
  var _useCachedPortfolioBa = PrefetchBalancesWrapper.useCachedPortfolioBalancesQuery({
      account: account
    }),
    portfolioBalances = _useCachedPortfolioBa.data;
  var portfolio = portfolioBalances === null || portfolioBalances === void 0 || (_portfolioBalances$po = portfolioBalances.portfolios) === null || _portfolioBalances$po === void 0 ? void 0 : _portfolioBalances$po[0];
  var totalBalance = portfolio === null || portfolio === void 0 || (_portfolio$tokensTota = portfolio.tokensTotalDenominatedValue) === null || _portfolio$tokensTota === void 0 ? void 0 : _portfolio$tokensTota.value;
  var absoluteChange = portfolio === null || portfolio === void 0 || (_portfolio$tokensTota2 = portfolio.tokensTotalDenominatedValueChange) === null || _portfolio$tokensTota2 === void 0 || (_portfolio$tokensTota2 = _portfolio$tokensTota2.absolute) === null || _portfolio$tokensTota2 === void 0 ? void 0 : _portfolio$tokensTota2.value;
  var percentChange = portfolio === null || portfolio === void 0 || (_portfolio$tokensTota3 = portfolio.tokensTotalDenominatedValueChange) === null || _portfolio$tokensTota3 === void 0 || (_portfolio$tokensTota3 = _portfolio$tokensTota3.percentage) === null || _portfolio$tokensTota3 === void 0 ? void 0 : _portfolio$tokensTota3.value;
  var _useState5 = React.useState(false),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    showDisconnectConfirm = _useState6[0],
    setShowDisconnectConfirm = _useState6[1];
  return /*#__PURE__*/React__default["default"].createElement(AuthenticatedHeaderWrapper, null, /*#__PURE__*/React__default["default"].createElement(HeaderWrapper, null, /*#__PURE__*/React__default["default"].createElement(StatusWrapper, null, /*#__PURE__*/React__default["default"].createElement(StatusIcon["default"], {
    account: account,
    connection: connection,
    size: 40
  }), account && /*#__PURE__*/React__default["default"].createElement(AccountNamesWrapper, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, /*#__PURE__*/React__default["default"].createElement(CopyText, {
    toCopy: ENSName !== null && ENSName !== void 0 ? ENSName : account
  }, ENSName !== null && ENSName !== void 0 ? ENSName : addresses.shortenAddress(account))), ENSName && /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default["default"].createElement(CopyText, {
    toCopy: account
  }, addresses.shortenAddress(account))))), /*#__PURE__*/React__default["default"].createElement(IconContainer, null, /*#__PURE__*/React__default["default"].createElement(IconButton["default"], {
    hideHorizontal: showDisconnectConfirm,
    "data-testid": "wallet-settings",
    onClick: openSettings,
    Icon: Settings.Settings
  }), /*#__PURE__*/React__default["default"].createElement(index$6.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.SharedEventName.ELEMENT_CLICKED,
    element: analyticsEvents.InterfaceElementName.DISCONNECT_WALLET_BUTTON
  }, /*#__PURE__*/React__default["default"].createElement(IconButton.IconWithConfirmTextButton, {
    "data-testid": "wallet-disconnect",
    onConfirm: disconnect,
    onShowConfirm: setShowDisconnectConfirm,
    Icon: Power.Power,
    text: "Disconnect",
    dismissOnHoverOut: true
  })))), /*#__PURE__*/React__default["default"].createElement(PortfolioDrawerContainer, null, totalBalance !== undefined ? /*#__PURE__*/React__default["default"].createElement(FadeInColumn, {
    gap: "xs"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineLarge, {
    fontWeight: 535,
    "data-testid": "portfolio-total-balance"
  }, formatNumber({
    input: totalBalance,
    type: formatNumbers.NumberType.PortfolioBalance
  })), /*#__PURE__*/React__default["default"].createElement(index$7.AutoRow, {
    marginBottom: "20px"
  }, absoluteChange !== 0 && percentChange && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Delta.DeltaArrow, {
    delta: absoluteChange
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySecondary, null, "".concat(formatNumber({
    input: Math.abs(absoluteChange),
    type: formatNumbers.NumberType.PortfolioBalance
  }), " (").concat(formatPercent(percentChange), ")"))))) : /*#__PURE__*/React__default["default"].createElement(index$2.Column, {
    gap: "xs"
  }, /*#__PURE__*/React__default["default"].createElement(loading.LoadingBubble, {
    height: "44px",
    width: "170px"
  }), /*#__PURE__*/React__default["default"].createElement(loading.LoadingBubble, {
    height: "16px",
    width: "100px",
    margin: "4px 0 20px 0"
  })), !shouldDisableNFTRoutes && /*#__PURE__*/React__default["default"].createElement(HeaderButton, {
    "data-testid": "nft-view-self-nfts",
    onClick: navigateToProfile,
    size: index.ButtonSize.medium,
    emphasis: index.ButtonEmphasis.highSoft
  }, /*#__PURE__*/React__default["default"].createElement(index$8.Trans, {
    id: "EewCIi",
    message: "View and sell NFTs"
  })), shouldShowBuyFiatButton && /*#__PURE__*/React__default["default"].createElement(HeaderButton, {
    size: index.ButtonSize.medium,
    emphasis: index.ButtonEmphasis.highSoft,
    onClick: handleBuyCryptoClick,
    disabled: disableBuyCryptoButton,
    "data-testid": "wallet-buy-crypto"
  }, error ? /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, null, error) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, fiatOnrampAvailabilityLoading ? /*#__PURE__*/React__default["default"].createElement(StyledLoadingButtonSpinner, null) : /*#__PURE__*/React__default["default"].createElement(reactFeather.CreditCard, {
    height: "20px",
    width: "20px"
  }), " ", /*#__PURE__*/React__default["default"].createElement(index$8.Trans, {
    id: "+Dv/u4",
    message: "Buy crypto"
  }))), Boolean(!fiatOnrampAvailable && fiatOnrampAvailabilityChecked) && /*#__PURE__*/React__default["default"].createElement(FiatOnrampNotAvailableText, {
    marginTop: "8px"
  }, /*#__PURE__*/React__default["default"].createElement(index$8.Trans, {
    id: "XafAh1",
    message: "Not available in your region"
  }), /*#__PURE__*/React__default["default"].createElement(index$9["default"], {
    show: showFiatOnrampUnavailableTooltip,
    text: /*#__PURE__*/React__default["default"].createElement(index$8.Trans, {
      id: "htBHnW",
      message: "Moonpay is not available in some regions. Click to learn more."
    })
  }, /*#__PURE__*/React__default["default"].createElement(FiatOnrampAvailabilityExternalLink, {
    onMouseEnter: openFiatOnrampUnavailableTooltip,
    onMouseLeave: closeFiatOnrampUnavailableTooltip,
    style: {
      color: "inherit"
    },
    href: "https://support.uniswap.org/hc/en-us/articles/11306664890381-Why-isn-t-MoonPay-available-in-my-region-"
  }, /*#__PURE__*/React__default["default"].createElement(StyledInfoIcon, null)))), /*#__PURE__*/React__default["default"].createElement(index$a, {
    account: account
  }), isUnclaimed && /*#__PURE__*/React__default["default"].createElement(UNIButton, {
    onClick: openClaimModal,
    size: index.ButtonSize.medium,
    emphasis: index.ButtonEmphasis.medium
  }, /*#__PURE__*/React__default["default"].createElement(index$8.Trans, {
    id: "hom7qf",
    message: "Claim"
  }), " ", unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_groupSeparator = {
    groupSeparator: ","
  }) !== null && _groupSeparator !== void 0 ? _groupSeparator : "-"), " ", /*#__PURE__*/React__default["default"].createElement(index$8.Trans, {
    id: "c6ZuHs",
    message: "reward"
  })), isClaimAvailable && /*#__PURE__*/React__default["default"].createElement(UNIButton, {
    size: index.ButtonSize.medium,
    emphasis: index.ButtonEmphasis.medium,
    onClick: openNftModal
  }, /*#__PURE__*/React__default["default"].createElement(index$8.Trans, {
    id: "+gddpH",
    message: "Claim Uniswap NFT Airdrop"
  }))));
}

module.exports = AuthenticatedHeader;
