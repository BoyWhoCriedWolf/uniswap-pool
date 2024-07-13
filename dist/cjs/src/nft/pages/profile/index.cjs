'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$5 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$4 = require('../../../analytics/index.cjs');
var index$2 = require('../../../components/AccountDrawer/index.cjs');
var index$1 = require('../../../components/Button/index.cjs');
var Bag = require('../../components/bag/Bag.cjs');
var ListPage = require('../../components/profile/list/ListPage.cjs');
var ProfilePage = require('../../components/profile/view/ProfilePage.cjs');
var useBag = require('../../hooks/useBag.cjs');
require('../../hooks/useCollectionFilters.cjs');
require('../../hooks/useFiltersExpanded.cjs');
require('../../hooks/useIsCollectionLoading.cjs');
require('../../../hooks/useScreenSize.cjs');
require('../../hooks/useNFTList.cjs');
var useProfilePageState = require('../../hooks/useProfilePageState.cjs');
var useSellAsset = require('../../hooks/useSellAsset.cjs');
require('../../hooks/useSendTransaction.cjs');
require('@babel/runtime/helpers/slicedToArray');
require('../../hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('@uniswap/sdk-core');
require('../../../hooks/useUSDPrice.cjs');
require('../../../constants/tokens.cjs');
require('jsbi');
require('../../../lib/hooks/useCurrencyBalance.cjs');
var useWalletCollections = require('../../hooks/useWalletCollections.cjs');
var index$3 = require('../../types/sell/index.cjs');
var styled = require('styled-components');
var index = require('../../../theme/index.cjs');
require('../../../theme/components/index.cjs');
var shared = require('./shared.cjs');
var text = require('../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var ProfilePageWrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  height: 100%;\n  width: 100%;\n  scrollbar-width: none;\n\n  @media screen and (min-width: ", "px) {\n    height: auto;\n  }\n"])), index.BREAKPOINTS.lg);
var LoadedAccountPage = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  width: calc(\n    100% -\n      ", "px\n  );\n  margin: 0px ", "px;\n\n  @media screen and (max-width: ", "px) {\n    width: calc(\n      100% -\n        ", "px\n    );\n    margin: 0px\n      ", "px;\n  }\n"])), function (_ref) {
  var cartExpanded = _ref.cartExpanded,
    isListingNfts = _ref.isListingNfts;
  return isListingNfts ? shared.LIST_PAGE_MARGIN * 2 : cartExpanded ? Bag.XXXL_BAG_WIDTH : 0;
}, function (_ref2) {
  var isListingNfts = _ref2.isListingNfts;
  return isListingNfts ? shared.LIST_PAGE_MARGIN : 0;
}, index.BREAKPOINTS.sm, function (_ref3) {
  var isListingNfts = _ref3.isListingNfts;
  return isListingNfts ? shared.LIST_PAGE_MARGIN_MOBILE * 2 : 0;
}, function (_ref4) {
  var isListingNfts = _ref4.isListingNfts;
  return isListingNfts ? shared.LIST_PAGE_MARGIN_MOBILE : 0;
});
var Center = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  left: 50%;\n  top: 40%;\n  transform: translate(-50%, -50%);\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  position: fixed;\n  white-space: nowrap;\n"])));
var ConnectWalletButton = styled__default["default"](index$1.ButtonPrimary)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  width: min-content;\n  white-space: nowrap;\n  border-radius: 12px;\n  padding: 14px 18px;\n  border: none;\n"])));
function Profile() {
  var sellPageState = useProfilePageState.useProfilePageState(function (state) {
    return state.state;
  });
  var setSellPageState = useProfilePageState.useProfilePageState(function (state) {
    return state.setProfilePageState;
  });
  var resetSellAssets = useSellAsset.useSellAsset(function (state) {
    return state.reset;
  });
  var clearCollectionFilters = useWalletCollections.useWalletCollections(function (state) {
    return state.clearCollectionFilters;
  });
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  var accountRef = React.useRef(account);
  var toggleWalletDrawer = index$2.useToggleAccountDrawer();
  React.useEffect(function () {
    if (accountRef.current !== account) {
      accountRef.current = account;
      resetSellAssets();
      setSellPageState(index$3.ProfilePageStateType.VIEWING);
      clearCollectionFilters();
    }
  }, [account, resetSellAssets, setSellPageState, clearCollectionFilters]);
  var cartExpanded = useBag.useBag(function (state) {
    return state.bagExpanded;
  });
  var isListingNfts = sellPageState === index$3.ProfilePageStateType.LISTING;
  return /*#__PURE__*/React__default["default"].createElement(index$4.Trace, {
    page: analyticsEvents.InterfacePageName.NFT_PROFILE_PAGE,
    shouldLogImpression: true
  }, /*#__PURE__*/React__default["default"].createElement(ProfilePageWrapper, null, account ? /*#__PURE__*/React__default["default"].createElement(LoadedAccountPage, {
    cartExpanded: cartExpanded,
    isListingNfts: isListingNfts
  }, !isListingNfts ? /*#__PURE__*/React__default["default"].createElement(ProfilePage.ProfilePage, null) : /*#__PURE__*/React__default["default"].createElement(ListPage.ListPage, null)) : /*#__PURE__*/React__default["default"].createElement(Center, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineMedium, {
    lineHeight: "36px",
    color: "neutral2",
    fontWeight: "535",
    marginBottom: "24px"
  }, /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
    id: "xZBwjV",
    message: "No items to display"
  })), /*#__PURE__*/React__default["default"].createElement(ConnectWalletButton, {
    onClick: toggleWalletDrawer
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, {
    color: "white",
    lineHeight: "20px"
  }, /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
    id: "VHOVEJ",
    message: "Connect wallet"
  }))))));
}

module.exports = Profile;
