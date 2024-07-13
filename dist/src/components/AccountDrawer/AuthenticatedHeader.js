import React__default, { useCallback, useState } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { InterfaceEventName, BrowserEvent, SharedEventName, InterfaceElementName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { sendAnalyticsEvent, TraceEvent } from '../../analytics/index.js';
import { ThemeButton, ButtonSize, ButtonEmphasis } from '../Button/index.js';
import { Column } from '../Column/index.js';
import { Power } from '../Icons/Power.js';
import { Settings } from '../Icons/Settings.js';
import { AutoRow } from '../Row/index.js';
import { LoadingBubble } from '../Tokens/loading.js';
import { DeltaArrow } from '../Tokens/TokenDetails/Delta.js';
import Tooltip from '../Tooltip/index.js';
import { getConnection } from '../../connection/index.js';
import { useDisableNFTRoutes } from '../../hooks/useDisableNFTRoutes.js';
import useENSName from '../../hooks/useENSName.js';
import { useIsNotOriginCountry } from '../../hooks/useIsNotOriginCountry.js';
import '../../nft/hooks/useBag.js';
import '../../nft/hooks/useCollectionFilters.js';
import '../../nft/hooks/useFiltersExpanded.js';
import '../../nft/hooks/useIsCollectionLoading.js';
import '../../hooks/useScreenSize.js';
import '../../nft/hooks/useNFTList.js';
import { useProfilePageState } from '../../nft/hooks/useProfilePageState.js';
import { useSellAsset } from '../../nft/hooks/useSellAsset.js';
import '../../nft/hooks/useSendTransaction.js';
import '../../nft/hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../hooks/useUSDPrice.js';
import '../../constants/tokens.js';
import 'jsbi';
import '../../lib/hooks/useCurrencyBalance.js';
import { useWalletCollections } from '../../nft/hooks/useWalletCollections.js';
import { useIsNftClaimAvailable } from '../../nft/hooks/useIsNftClaimAvailable.js';
import { ProfilePageStateType } from '../../nft/types/sell/index.js';
import { Info, CreditCard } from 'react-feather';
import { useAppDispatch } from '../../state/hooks.js';
import { updateSelectedWallet } from '../../state/user/reducer.js';
import styled from 'styled-components';
import { ExternalLink, CopyHelper } from '../../theme/components/index.js';
import { shortenAddress } from '../../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import { useFormatter, NumberType } from '../../utils/formatNumbers.js';
import { useCloseModal, useToggleModal, useOpenModal, useFiatOnrampAvailability } from '../../state/application/hooks.js';
import { ApplicationModal } from '../../state/application/reducer.js';
import { useUserUnclaimedAmount, useUserHasAvailableClaim } from '../../state/claim/hooks.js';
import StatusIcon from '../Identicon/StatusIcon.js';
import { useCachedPortfolioBalancesQuery } from '../PrefetchBalancesWrapper/PrefetchBalancesWrapper.js';
import { useToggleAccountDrawer } from './index.js';
import IconButton, { IconHoverText, IconWithConfirmTextButton } from './IconButton.js';
import MiniPortfolio from './MiniPortfolio/index.js';
import { portfolioFadeInAnimation } from './MiniPortfolio/PortfolioRow.js';
import { ThemedText } from '../../theme/components/text.js';
import ButtonLoadingSpinner from '../Button/LoadingButtonSpinner.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15;
var AuthenticatedHeaderWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 20px 16px;\n  display: flex;\n  flex-direction: column;\n  flex: 1;\n"])));
var HeaderButton = styled(ThemeButton)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  border-color: transparent;\n  border-radius: 12px;\n  border-style: solid;\n  border-width: 1px;\n  height: 40px;\n  margin-top: 8px;\n"])));
var WalletButton = styled(ThemeButton)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  border-radius: 12px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  margin-top: 4px;\n  color: white;\n  border: none;\n"])));
var UNIButton = styled(WalletButton)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  border-radius: 12px;\n  padding-top: 10px;\n  padding-bottom: 10px;\n  margin-top: 4px;\n  color: white;\n  border: none;\n  background: linear-gradient(to right, #9139b0 0%, #4261d6 100%);\n"])));
var IconContainer = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  & > a,\n  & > button {\n    margin-right: 8px;\n  }\n\n  & > button:last-child {\n    margin-right: 0px;\n    ", ":last-child {\n      left: 0px;\n    }\n  }\n"])), IconHoverText);
var FiatOnrampNotAvailableText = styled(ThemedText.BodySmall)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  align-items: center;\n  color: ", ";\n  display: flex;\n  justify-content: center;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var FiatOnrampAvailabilityExternalLink = styled(ExternalLink)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  height: 14px;\n  justify-content: center;\n  margin-left: 6px;\n  width: 14px;\n"])));
var StatusWrapper = styled.div(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: 70%;\n  max-width: 70%;\n  padding-right: 8px;\n  display: inline-flex;\n"])));
var AccountNamesWrapper = styled.div(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  overflow: hidden;\n  white-space: nowrap;\n  display: flex;\n  width: 100%;\n  flex-direction: column;\n  justify-content: center;\n  margin-left: 8px;\n"])));
var StyledInfoIcon = styled(Info)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  height: 12px;\n  width: 12px;\n  flex: 1 1 auto;\n"])));
var StyledLoadingButtonSpinner = styled(ButtonLoadingSpinner)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  fill: ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.accent1;
});
var HeaderWrapper = styled.div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  margin-bottom: 20px;\n  display: flex;\n  justify-content: space-between;\n  align-items: flex-start;\n"])));
var CopyText = styled(CopyHelper).attrs({
  iconSize: 14,
  iconPosition: "right"
})(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral([""])));
var FadeInColumn = styled(Column)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral(["\n  ", "\n"])), portfolioFadeInAnimation);
var PortfolioDrawerContainer = styled(Column)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral(["\n  flex: 1;\n"])));
function AuthenticatedHeader(_ref3) {
  var _portfolioBalances$po, _portfolio$tokensTota, _portfolio$tokensTota2, _portfolio$tokensTota3, _groupSeparator;
  var account = _ref3.account,
    openSettings = _ref3.openSettings,
    _ref3$onShowNftProfil = _ref3.onShowNftProfile,
    onShowNftProfile = _ref3$onShowNftProfil === void 0 ? function () {
      return null;
    } : _ref3$onShowNftProfil;
  var _useWeb3React = useWeb3React(),
    connector = _useWeb3React.connector;
  var _useENSName = useENSName(account),
    ENSName = _useENSName.ENSName;
  var dispatch = useAppDispatch();
  var closeModal = useCloseModal();
  var setSellPageState = useProfilePageState(function (state) {
    return state.setProfilePageState;
  });
  var resetSellAssets = useSellAsset(function (state) {
    return state.reset;
  });
  var clearCollectionFilters = useWalletCollections(function (state) {
    return state.clearCollectionFilters;
  });
  var isClaimAvailable = useIsNftClaimAvailable(function (state) {
    return state.isClaimAvailable;
  });
  var shouldShowBuyFiatButton = useIsNotOriginCountry("GB");
  var _useFormatter = useFormatter(),
    formatNumber = _useFormatter.formatNumber,
    formatPercent = _useFormatter.formatPercent;
  var shouldDisableNFTRoutes = useDisableNFTRoutes();
  var unclaimedAmount = useUserUnclaimedAmount(account);
  var isUnclaimed = useUserHasAvailableClaim(account);
  var connection = getConnection(connector);
  var openClaimModal = useToggleModal(ApplicationModal.ADDRESS_CLAIM);
  var openNftModal = useToggleModal(ApplicationModal.UNISWAP_NFT_AIRDROP_CLAIM);
  var disconnect = useCallback(function () {
    if (connector && connector.deactivate) {
      connector.deactivate();
    }
    connector.resetState();
    dispatch(updateSelectedWallet({
      wallet: undefined
    }));
  }, [connector, dispatch]);
  var toggleWalletDrawer = useToggleAccountDrawer();
  var navigateToProfile = useCallback(function () {
    toggleWalletDrawer();
    resetSellAssets();
    setSellPageState(ProfilePageStateType.VIEWING);
    clearCollectionFilters();
    // navigate("/nfts/profile");
    onShowNftProfile();
    closeModal();
  }, [clearCollectionFilters, closeModal,
  // navigate,
  onShowNftProfile, resetSellAssets, setSellPageState, toggleWalletDrawer]);
  var openFiatOnrampModal = useOpenModal(ApplicationModal.FIAT_ONRAMP);
  var openFoRModalWithAnalytics = useCallback(function () {
    toggleWalletDrawer();
    sendAnalyticsEvent(InterfaceEventName.FIAT_ONRAMP_WIDGET_OPENED);
    openFiatOnrampModal();
  }, [openFiatOnrampModal, toggleWalletDrawer]);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    shouldCheck = _useState2[0],
    setShouldCheck = _useState2[1];
  var _useFiatOnrampAvailab = useFiatOnrampAvailability(shouldCheck, openFoRModalWithAnalytics),
    fiatOnrampAvailable = _useFiatOnrampAvailab.available,
    fiatOnrampAvailabilityChecked = _useFiatOnrampAvailab.availabilityChecked,
    error = _useFiatOnrampAvailab.error,
    fiatOnrampAvailabilityLoading = _useFiatOnrampAvailab.loading;
  var handleBuyCryptoClick = useCallback(function () {
    if (!fiatOnrampAvailabilityChecked) {
      setShouldCheck(true);
    } else if (fiatOnrampAvailable) {
      openFoRModalWithAnalytics();
    }
  }, [fiatOnrampAvailabilityChecked, fiatOnrampAvailable, openFoRModalWithAnalytics]);
  var disableBuyCryptoButton = Boolean(error || !fiatOnrampAvailable && fiatOnrampAvailabilityChecked || fiatOnrampAvailabilityLoading);
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    showFiatOnrampUnavailableTooltip = _useState4[0],
    setShow = _useState4[1];
  var openFiatOnrampUnavailableTooltip = useCallback(function () {
    return setShow(true);
  }, [setShow]);
  var closeFiatOnrampUnavailableTooltip = useCallback(function () {
    return setShow(false);
  }, [setShow]);
  var _useCachedPortfolioBa = useCachedPortfolioBalancesQuery({
      account: account
    }),
    portfolioBalances = _useCachedPortfolioBa.data;
  var portfolio = portfolioBalances === null || portfolioBalances === void 0 || (_portfolioBalances$po = portfolioBalances.portfolios) === null || _portfolioBalances$po === void 0 ? void 0 : _portfolioBalances$po[0];
  var totalBalance = portfolio === null || portfolio === void 0 || (_portfolio$tokensTota = portfolio.tokensTotalDenominatedValue) === null || _portfolio$tokensTota === void 0 ? void 0 : _portfolio$tokensTota.value;
  var absoluteChange = portfolio === null || portfolio === void 0 || (_portfolio$tokensTota2 = portfolio.tokensTotalDenominatedValueChange) === null || _portfolio$tokensTota2 === void 0 || (_portfolio$tokensTota2 = _portfolio$tokensTota2.absolute) === null || _portfolio$tokensTota2 === void 0 ? void 0 : _portfolio$tokensTota2.value;
  var percentChange = portfolio === null || portfolio === void 0 || (_portfolio$tokensTota3 = portfolio.tokensTotalDenominatedValueChange) === null || _portfolio$tokensTota3 === void 0 || (_portfolio$tokensTota3 = _portfolio$tokensTota3.percentage) === null || _portfolio$tokensTota3 === void 0 ? void 0 : _portfolio$tokensTota3.value;
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    showDisconnectConfirm = _useState6[0],
    setShowDisconnectConfirm = _useState6[1];
  return /*#__PURE__*/React__default.createElement(AuthenticatedHeaderWrapper, null, /*#__PURE__*/React__default.createElement(HeaderWrapper, null, /*#__PURE__*/React__default.createElement(StatusWrapper, null, /*#__PURE__*/React__default.createElement(StatusIcon, {
    account: account,
    connection: connection,
    size: 40
  }), account && /*#__PURE__*/React__default.createElement(AccountNamesWrapper, null, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, /*#__PURE__*/React__default.createElement(CopyText, {
    toCopy: ENSName !== null && ENSName !== void 0 ? ENSName : account
  }, ENSName !== null && ENSName !== void 0 ? ENSName : shortenAddress(account))), ENSName && /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(CopyText, {
    toCopy: account
  }, shortenAddress(account))))), /*#__PURE__*/React__default.createElement(IconContainer, null, /*#__PURE__*/React__default.createElement(IconButton, {
    hideHorizontal: showDisconnectConfirm,
    "data-testid": "wallet-settings",
    onClick: openSettings,
    Icon: Settings
  }), /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: SharedEventName.ELEMENT_CLICKED,
    element: InterfaceElementName.DISCONNECT_WALLET_BUTTON
  }, /*#__PURE__*/React__default.createElement(IconWithConfirmTextButton, {
    "data-testid": "wallet-disconnect",
    onConfirm: disconnect,
    onShowConfirm: setShowDisconnectConfirm,
    Icon: Power,
    text: "Disconnect",
    dismissOnHoverOut: true
  })))), /*#__PURE__*/React__default.createElement(PortfolioDrawerContainer, null, totalBalance !== undefined ? /*#__PURE__*/React__default.createElement(FadeInColumn, {
    gap: "xs"
  }, /*#__PURE__*/React__default.createElement(ThemedText.HeadlineLarge, {
    fontWeight: 535,
    "data-testid": "portfolio-total-balance"
  }, formatNumber({
    input: totalBalance,
    type: NumberType.PortfolioBalance
  })), /*#__PURE__*/React__default.createElement(AutoRow, {
    marginBottom: "20px"
  }, absoluteChange !== 0 && percentChange && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(DeltaArrow, {
    delta: absoluteChange
  }), /*#__PURE__*/React__default.createElement(ThemedText.BodySecondary, null, "".concat(formatNumber({
    input: Math.abs(absoluteChange),
    type: NumberType.PortfolioBalance
  }), " (").concat(formatPercent(percentChange), ")"))))) : /*#__PURE__*/React__default.createElement(Column, {
    gap: "xs"
  }, /*#__PURE__*/React__default.createElement(LoadingBubble, {
    height: "44px",
    width: "170px"
  }), /*#__PURE__*/React__default.createElement(LoadingBubble, {
    height: "16px",
    width: "100px",
    margin: "4px 0 20px 0"
  })), !shouldDisableNFTRoutes && /*#__PURE__*/React__default.createElement(HeaderButton, {
    "data-testid": "nft-view-self-nfts",
    onClick: navigateToProfile,
    size: ButtonSize.medium,
    emphasis: ButtonEmphasis.highSoft
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "EewCIi",
    message: "View and sell NFTs"
  })), shouldShowBuyFiatButton && /*#__PURE__*/React__default.createElement(HeaderButton, {
    size: ButtonSize.medium,
    emphasis: ButtonEmphasis.highSoft,
    onClick: handleBuyCryptoClick,
    disabled: disableBuyCryptoButton,
    "data-testid": "wallet-buy-crypto"
  }, error ? /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, null, error) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, fiatOnrampAvailabilityLoading ? /*#__PURE__*/React__default.createElement(StyledLoadingButtonSpinner, null) : /*#__PURE__*/React__default.createElement(CreditCard, {
    height: "20px",
    width: "20px"
  }), " ", /*#__PURE__*/React__default.createElement(Trans, {
    id: "+Dv/u4",
    message: "Buy crypto"
  }))), Boolean(!fiatOnrampAvailable && fiatOnrampAvailabilityChecked) && /*#__PURE__*/React__default.createElement(FiatOnrampNotAvailableText, {
    marginTop: "8px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "XafAh1",
    message: "Not available in your region"
  }), /*#__PURE__*/React__default.createElement(Tooltip, {
    show: showFiatOnrampUnavailableTooltip,
    text: /*#__PURE__*/React__default.createElement(Trans, {
      id: "htBHnW",
      message: "Moonpay is not available in some regions. Click to learn more."
    })
  }, /*#__PURE__*/React__default.createElement(FiatOnrampAvailabilityExternalLink, {
    onMouseEnter: openFiatOnrampUnavailableTooltip,
    onMouseLeave: closeFiatOnrampUnavailableTooltip,
    style: {
      color: "inherit"
    },
    href: "https://support.uniswap.org/hc/en-us/articles/11306664890381-Why-isn-t-MoonPay-available-in-my-region-"
  }, /*#__PURE__*/React__default.createElement(StyledInfoIcon, null)))), /*#__PURE__*/React__default.createElement(MiniPortfolio, {
    account: account
  }), isUnclaimed && /*#__PURE__*/React__default.createElement(UNIButton, {
    onClick: openClaimModal,
    size: ButtonSize.medium,
    emphasis: ButtonEmphasis.medium
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "hom7qf",
    message: "Claim"
  }), " ", unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_groupSeparator = {
    groupSeparator: ","
  }) !== null && _groupSeparator !== void 0 ? _groupSeparator : "-"), " ", /*#__PURE__*/React__default.createElement(Trans, {
    id: "c6ZuHs",
    message: "reward"
  })), isClaimAvailable && /*#__PURE__*/React__default.createElement(UNIButton, {
    size: ButtonSize.medium,
    emphasis: ButtonEmphasis.medium,
    onClick: openNftModal
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "+gddpH",
    message: "Claim Uniswap NFT Airdrop"
  }))));
}

export { AuthenticatedHeader as default };
