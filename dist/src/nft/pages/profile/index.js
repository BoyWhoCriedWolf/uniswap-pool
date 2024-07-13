import React__default, { useRef, useEffect } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { InterfacePageName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { Trace } from '../../../analytics/index.js';
import { useToggleAccountDrawer } from '../../../components/AccountDrawer/index.js';
import { ButtonPrimary } from '../../../components/Button/index.js';
import { XXXL_BAG_WIDTH } from '../../components/bag/Bag.js';
import { ListPage } from '../../components/profile/list/ListPage.js';
import { ProfilePage } from '../../components/profile/view/ProfilePage.js';
import { useBag } from '../../hooks/useBag.js';
import '../../hooks/useCollectionFilters.js';
import '../../hooks/useFiltersExpanded.js';
import '../../hooks/useIsCollectionLoading.js';
import '../../../hooks/useScreenSize.js';
import '../../hooks/useNFTList.js';
import { useProfilePageState } from '../../hooks/useProfilePageState.js';
import { useSellAsset } from '../../hooks/useSellAsset.js';
import '../../hooks/useSendTransaction.js';
import '@babel/runtime/helpers/slicedToArray';
import '../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../hooks/useUSDPrice.js';
import '../../../constants/tokens.js';
import 'jsbi';
import '../../../lib/hooks/useCurrencyBalance.js';
import { useWalletCollections } from '../../hooks/useWalletCollections.js';
import { ProfilePageStateType } from '../../types/sell/index.js';
import styled from 'styled-components';
import { BREAKPOINTS } from '../../../theme/index.js';
import '../../../theme/components/index.js';
import { LIST_PAGE_MARGIN, LIST_PAGE_MARGIN_MOBILE } from './shared.js';
import { ThemedText } from '../../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var ProfilePageWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: 100%;\n  width: 100%;\n  scrollbar-width: none;\n\n  @media screen and (min-width: ", "px) {\n    height: auto;\n  }\n"])), BREAKPOINTS.lg);
var LoadedAccountPage = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: calc(\n    100% -\n      ", "px\n  );\n  margin: 0px ", "px;\n\n  @media screen and (max-width: ", "px) {\n    width: calc(\n      100% -\n        ", "px\n    );\n    margin: 0px\n      ", "px;\n  }\n"])), function (_ref) {
  var cartExpanded = _ref.cartExpanded,
    isListingNfts = _ref.isListingNfts;
  return isListingNfts ? LIST_PAGE_MARGIN * 2 : cartExpanded ? XXXL_BAG_WIDTH : 0;
}, function (_ref2) {
  var isListingNfts = _ref2.isListingNfts;
  return isListingNfts ? LIST_PAGE_MARGIN : 0;
}, BREAKPOINTS.sm, function (_ref3) {
  var isListingNfts = _ref3.isListingNfts;
  return isListingNfts ? LIST_PAGE_MARGIN_MOBILE * 2 : 0;
}, function (_ref4) {
  var isListingNfts = _ref4.isListingNfts;
  return isListingNfts ? LIST_PAGE_MARGIN_MOBILE : 0;
});
var Center = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  left: 50%;\n  top: 40%;\n  transform: translate(-50%, -50%);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: fixed;\n  white-space: nowrap;\n"])));
var ConnectWalletButton = styled(ButtonPrimary)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  width: min-content;\n  white-space: nowrap;\n  border-radius: 12px;\n  padding: 14px 18px;\n  border: none;\n"])));
function Profile() {
  var sellPageState = useProfilePageState(function (state) {
    return state.state;
  });
  var setSellPageState = useProfilePageState(function (state) {
    return state.setProfilePageState;
  });
  var resetSellAssets = useSellAsset(function (state) {
    return state.reset;
  });
  var clearCollectionFilters = useWalletCollections(function (state) {
    return state.clearCollectionFilters;
  });
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;
  var accountRef = useRef(account);
  var toggleWalletDrawer = useToggleAccountDrawer();
  useEffect(function () {
    if (accountRef.current !== account) {
      accountRef.current = account;
      resetSellAssets();
      setSellPageState(ProfilePageStateType.VIEWING);
      clearCollectionFilters();
    }
  }, [account, resetSellAssets, setSellPageState, clearCollectionFilters]);
  var cartExpanded = useBag(function (state) {
    return state.bagExpanded;
  });
  var isListingNfts = sellPageState === ProfilePageStateType.LISTING;
  return /*#__PURE__*/React__default.createElement(Trace, {
    page: InterfacePageName.NFT_PROFILE_PAGE,
    shouldLogImpression: true
  }, /*#__PURE__*/React__default.createElement(ProfilePageWrapper, null, account ? /*#__PURE__*/React__default.createElement(LoadedAccountPage, {
    cartExpanded: cartExpanded,
    isListingNfts: isListingNfts
  }, !isListingNfts ? /*#__PURE__*/React__default.createElement(ProfilePage, null) : /*#__PURE__*/React__default.createElement(ListPage, null)) : /*#__PURE__*/React__default.createElement(Center, null, /*#__PURE__*/React__default.createElement(ThemedText.HeadlineMedium, {
    lineHeight: "36px",
    color: "neutral2",
    fontWeight: "535",
    marginBottom: "24px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "xZBwjV",
    message: "No items to display"
  })), /*#__PURE__*/React__default.createElement(ConnectWalletButton, {
    onClick: toggleWalletDrawer
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, {
    color: "white",
    lineHeight: "20px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "VHOVEJ",
    message: "Connect wallet"
  }))))));
}

export { Profile as default };
