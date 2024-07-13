'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var index$2 = require('../../../analytics/index.cjs');
var useIsNftPage = require('../../../hooks/useIsNftPage.cjs');
var BagFooter = require('./BagFooter.cjs');
var Box = require('../Box.cjs');
var Portal = require('../common/Portal.cjs');
var Flex = require('../Flex.cjs');
var Overlay = require('../modals/Overlay.cjs');
var useBag = require('../../hooks/useBag.cjs');
require('../../hooks/useCollectionFilters.cjs');
require('../../hooks/useFiltersExpanded.cjs');
require('../../hooks/useIsCollectionLoading.cjs');
var useIsMobile = require('../../hooks/useIsMobile.cjs');
require('../../../hooks/useScreenSize.cjs');
require('../../hooks/useNFTList.cjs');
var useProfilePageState = require('../../hooks/useProfilePageState.cjs');
var useSellAsset = require('../../hooks/useSellAsset.cjs');
require('../../hooks/useSendTransaction.cjs');
var useSubscribeScrollState = require('../../hooks/useSubscribeScrollState.cjs');
require('../../hooks/useTransactionResponse.cjs');
require('@ethersproject/units');
require('@uniswap/sdk-core');
require('../../../hooks/useUSDPrice.cjs');
require('../../../constants/tokens.cjs');
require('jsbi');
require('@web3-react/core');
require('../../../lib/hooks/useCurrencyBalance.cjs');
require('../../hooks/useWalletCollections.cjs');
var index = require('../../types/checkout/index.cjs');
var index$1 = require('../../types/sell/index.cjs');
require('@babel/runtime/helpers/toConsumableArray');
require('../icons.cjs');
require('uuid');
var formatEventProperties = require('../../utils/formatEventProperties.cjs');
require('video-extensions');
require('../../../locales/en-US.cjs');
require('numbro');
var pooledAssets = require('../../utils/pooledAssets.cjs');
require('../../utils/time.cjs');
require('@ethersproject/bignumber');
var styled = require('styled-components');
var zIndex = require('../../../theme/zIndex.cjs');
var Bag_css = require('./Bag.css.cjs');
var BagContent = require('./BagContent.cjs');
var BagHeader = require('./BagHeader.cjs');
var EmptyContent = require('./EmptyContent.cjs');
require('../../../components/Button/index.cjs');
require('./BagRow.cjs');
require('./../../../../assets/src/nft/css/sprinkles.css.ts.vanilla-319f3907.css');
require('./../../../../assets/src/nft/css/common.css.ts.vanilla-056078d2.css');
require('./../../../../assets/src/nft/components/bag/BagRow.css.ts.vanilla-e3abd6f7.css');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var BAG_WIDTH = 320;
var XXXL_BAG_WIDTH = 360;
var BagContainer = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n  top: 88px;\n  right: 20px;\n  width: ", "px;\n  height: calc(100vh - 108px);\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 16px;\n  box-shadow: ", ";\n  z-index: ", ";\n\n  @media only screen and (max-width: ", ") {\n    right: 0px;\n    top: 0px;\n    width: 100%;\n    height: 100%;\n    border-radius: 0px;\n    border: none;\n  }\n\n  @media only screen and (min-width: ", ") {\n    width: ", "px;\n  }\n"])), BAG_WIDTH, function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_shallowShadow;
}, function (_ref4) {
  var raiseZIndex = _ref4.raiseZIndex,
    isProfilePage = _ref4.isProfilePage;
  return raiseZIndex ? isProfilePage ? zIndex.Z_INDEX.modalOverTooltip : zIndex.Z_INDEX.modalBackdrop - 1 : 3;
}, function (_ref5) {
  var theme = _ref5.theme;
  return "".concat(theme.breakpoint.sm, "px");
}, function (_ref6) {
  var theme = _ref6.theme;
  return "".concat(theme.breakpoint.xxxl, "px");
}, XXXL_BAG_WIDTH);
styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  position: fixed;\n  background: rgba(0, 0, 0, 0.7);\n  top: 0px;\n  width: 100%;\n  height: 100%;\n"])));
var ContinueButton = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  background: ", ";\n  color: ", ";\n  margin: 32px 28px 16px;\n  padding: 10px 0px;\n  border-radius: 12px;\n  text-align: center;\n  font-size: 16px;\n  font-weight: 535;\n  line-height: 20px;\n  cursor: pointer;\n  transition: ", ";\n\n  :hover {\n    opacity: ", ";\n  }\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.accent1;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.deprecated_accentTextLightPrimary;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.transition.duration.medium;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.opacity.hover;
});
var ScrollingIndicator = function ScrollingIndicator(_ref11) {
  var top = _ref11.top,
    show = _ref11.show;
  return /*#__PURE__*/React__default["default"].createElement(Box.Box, {
    marginX: "24",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "transparent",
    borderTopColor: top ? "transparent" : "surface3",
    borderBottomColor: top ? "surface3" : "transparent",
    opacity: show ? "1" : "0",
    transition: "250"
  });
};
var Bag = function Bag() {
  var _useSellAsset = useSellAsset.useSellAsset(function (_ref12) {
      var reset = _ref12.reset,
        sellAssets = _ref12.sellAssets;
      return {
        resetSellAssets: reset,
        sellAssets: sellAssets
      };
    });
    _useSellAsset.resetSellAssets;
    var sellAssets = _useSellAsset.sellAssets;
  var _useProfilePageState = useProfilePageState.useProfilePageState(function (_ref13) {
      var setProfilePageState = _ref13.setProfilePageState;
      return {
        setProfilePageState: setProfilePageState
      };
    }),
    setProfilePageState = _useProfilePageState.setProfilePageState;
  var _useBag = useBag.useBag(function (state) {
      return _objectSpread(_objectSpread({}, state), {}, {
        bagIsLocked: state.isLocked,
        uncheckedItemsInBag: state.itemsInBag
      });
    }),
    bagStatus = _useBag.bagStatus,
    bagIsLocked = _useBag.bagIsLocked,
    reset = _useBag.reset,
    bagExpanded = _useBag.bagExpanded,
    toggleBag = _useBag.toggleBag,
    setBagExpanded = _useBag.setBagExpanded;
  var _useBag2 = useBag.useBag(function (_ref14) {
      var itemsInBag = _ref14.itemsInBag;
      return {
        uncheckedItemsInBag: itemsInBag
      };
    }),
    uncheckedItemsInBag = _useBag2.uncheckedItemsInBag;
  var isProfilePage = useIsNftPage.useIsNftProfilePage();
  var isNFTPage = useIsNftPage.useIsNftPage();
  var isMobile = useIsMobile.useIsMobile();
  var itemsInBag = React.useMemo(function () {
    return pooledAssets.recalculateBagUsingPooledAssets(uncheckedItemsInBag);
  }, [uncheckedItemsInBag]);
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    isModalOpen = _useState2[0],
    setModalIsOpen = _useState2[1];
  var _useSubscribeScrollSt = useSubscribeScrollState.useSubscribeScrollState(),
    userCanScroll = _useSubscribeScrollSt.userCanScroll,
    scrollRef = _useSubscribeScrollSt.scrollRef,
    scrollProgress = _useSubscribeScrollSt.scrollProgress,
    scrollHandler = _useSubscribeScrollSt.scrollHandler;
  var handleCloseBag = React.useCallback(function () {
    setBagExpanded({
      bagExpanded: false,
      manualClose: true
    });
  }, [setBagExpanded]);
  React.useEffect(function () {
    if (bagIsLocked && !isModalOpen) setModalIsOpen(true);
  }, [bagIsLocked, isModalOpen]);
  var hasAssetsToShow = itemsInBag.length > 0;
  var isBuyingAssets = itemsInBag.length > 0;
  var isSellingAssets = sellAssets.length > 0;
  var shouldRenderEmptyState = Boolean(!isBuyingAssets && bagStatus === index.BagStatus.ADDING_TO_BAG || isProfilePage );
  var eventProperties = React.useMemo(function () {
    return _objectSpread({}, formatEventProperties.formatAssetEventProperties(itemsInBag.map(function (item) {
      return item.asset;
    })));
  }, [itemsInBag]);
  if (!bagExpanded || !isNFTPage) {
    return null;
  }
  return /*#__PURE__*/React__default["default"].createElement(Portal.Portal, null, /*#__PURE__*/React__default["default"].createElement(BagContainer, {
    "data-testid": "nft-bag",
    raiseZIndex: isMobile || isModalOpen,
    isProfilePage: isProfilePage
  }, /*#__PURE__*/React__default["default"].createElement(BagHeader.BagHeader, {
    numberOfAssets: itemsInBag.length,
    closeBag: handleCloseBag,
    resetFlow: reset,
    isProfilePage: isProfilePage
  }), shouldRenderEmptyState && /*#__PURE__*/React__default["default"].createElement(EmptyContent, null), /*#__PURE__*/React__default["default"].createElement(ScrollingIndicator, {
    top: true,
    show: userCanScroll && scrollProgress > 0
  }), /*#__PURE__*/React__default["default"].createElement(Flex.Column, {
    ref: scrollRef,
    className: Bag_css.assetsContainer,
    onScroll: scrollHandler,
    gap: "12"
  }, /*#__PURE__*/React__default["default"].createElement(BagContent.BagContent, null)), hasAssetsToShow && !isProfilePage && /*#__PURE__*/React__default["default"].createElement(BagFooter.BagFooter, {
    setModalIsOpen: setModalIsOpen,
    eventProperties: eventProperties
  }), isSellingAssets && isProfilePage && /*#__PURE__*/React__default["default"].createElement(ContinueButton, {
    onClick: function onClick() {
      toggleBag();
      setProfilePageState(index$1.ProfilePageStateType.LISTING);
      index$2.sendAnalyticsEvent(analyticsEvents.NFTEventName.NFT_PROFILE_PAGE_START_SELL, {
        list_quantity: sellAssets.length,
        collection_addresses: sellAssets.map(function (asset) {
          return asset.asset_contract.address;
        }),
        token_ids: sellAssets.map(function (asset) {
          return asset.tokenId;
        })
      });
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "xGVfLh",
    message: "Continue"
  }))), isModalOpen && /*#__PURE__*/React__default["default"].createElement(Overlay.Overlay, {
    onClick: function onClick() {
      return !bagIsLocked ? setModalIsOpen(false) : undefined;
    }
  }));
};

exports.BAG_WIDTH = BAG_WIDTH;
exports.XXXL_BAG_WIDTH = XXXL_BAG_WIDTH;
exports["default"] = Bag;
