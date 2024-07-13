import React__default, { useMemo, useState, useCallback, useEffect } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../../node_modules/@lingui/react/dist/index.mjs.js';
import { NFTEventName } from '@uniswap/analytics-events';
import { sendAnalyticsEvent } from '../../../analytics/index.js';
import { useIsNftProfilePage, useIsNftPage } from '../../../hooks/useIsNftPage.js';
import { BagFooter } from './BagFooter.js';
import { Box } from '../Box.js';
import { Portal } from '../common/Portal.js';
import { Column } from '../Flex.js';
import { Overlay } from '../modals/Overlay.js';
import { useBag } from '../../hooks/useBag.js';
import '../../hooks/useCollectionFilters.js';
import '../../hooks/useFiltersExpanded.js';
import '../../hooks/useIsCollectionLoading.js';
import { useIsMobile } from '../../hooks/useIsMobile.js';
import '../../../hooks/useScreenSize.js';
import '../../hooks/useNFTList.js';
import { useProfilePageState } from '../../hooks/useProfilePageState.js';
import { useSellAsset } from '../../hooks/useSellAsset.js';
import '../../hooks/useSendTransaction.js';
import { useSubscribeScrollState } from '../../hooks/useSubscribeScrollState.js';
import '../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../hooks/useUSDPrice.js';
import '../../../constants/tokens.js';
import 'jsbi';
import '@web3-react/core';
import '../../../lib/hooks/useCurrencyBalance.js';
import '../../hooks/useWalletCollections.js';
import { BagStatus } from '../../types/checkout/index.js';
import { ProfilePageStateType } from '../../types/sell/index.js';
import '@babel/runtime/helpers/toConsumableArray';
import '../icons.js';
import 'uuid';
import { formatAssetEventProperties } from '../../utils/formatEventProperties.js';
import 'video-extensions';
import '../../../locales/en-US.js';
import 'numbro';
import { recalculateBagUsingPooledAssets } from '../../utils/pooledAssets.js';
import '../../utils/time.js';
import '@ethersproject/bignumber';
import styled from 'styled-components';
import { Z_INDEX } from '../../../theme/zIndex.js';
import { assetsContainer } from './Bag.css.js';
import { BagContent } from './BagContent.js';
import { BagHeader } from './BagHeader.js';
import EmptyState from './EmptyContent.js';
import '../../../components/Button/index.js';
import './BagRow.js';
import './../../../../assets/src/nft/css/sprinkles.css.ts.vanilla-319f3907.css';
import './../../../../assets/src/nft/css/common.css.ts.vanilla-056078d2.css';
import './../../../../assets/src/nft/components/bag/BagRow.css.ts.vanilla-e3abd6f7.css';

var _templateObject, _templateObject2, _templateObject3;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var BAG_WIDTH = 320;
var XXXL_BAG_WIDTH = 360;
var BagContainer = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: fixed;\n  display: flex;\n  flex-direction: column;\n  top: 88px;\n  right: 20px;\n  width: ", "px;\n  height: calc(100vh - 108px);\n  background: ", ";\n  border: 1px solid ", ";\n  border-radius: 16px;\n  box-shadow: ", ";\n  z-index: ", ";\n\n  @media only screen and (max-width: ", ") {\n    right: 0px;\n    top: 0px;\n    width: 100%;\n    height: 100%;\n    border-radius: 0px;\n    border: none;\n  }\n\n  @media only screen and (min-width: ", ") {\n    width: ", "px;\n  }\n"])), BAG_WIDTH, function (_ref) {
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
  return raiseZIndex ? isProfilePage ? Z_INDEX.modalOverTooltip : Z_INDEX.modalBackdrop - 1 : 3;
}, function (_ref5) {
  var theme = _ref5.theme;
  return "".concat(theme.breakpoint.sm, "px");
}, function (_ref6) {
  var theme = _ref6.theme;
  return "".concat(theme.breakpoint.xxxl, "px");
}, XXXL_BAG_WIDTH);
styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: fixed;\n  background: rgba(0, 0, 0, 0.7);\n  top: 0px;\n  width: 100%;\n  height: 100%;\n"])));
var ContinueButton = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  background: ", ";\n  color: ", ";\n  margin: 32px 28px 16px;\n  padding: 10px 0px;\n  border-radius: 12px;\n  text-align: center;\n  font-size: 16px;\n  font-weight: 535;\n  line-height: 20px;\n  cursor: pointer;\n  transition: ", ";\n\n  :hover {\n    opacity: ", ";\n  }\n"])), function (_ref7) {
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
  return /*#__PURE__*/React__default.createElement(Box, {
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
  var _useSellAsset = useSellAsset(function (_ref12) {
      var reset = _ref12.reset,
        sellAssets = _ref12.sellAssets;
      return {
        resetSellAssets: reset,
        sellAssets: sellAssets
      };
    });
    _useSellAsset.resetSellAssets;
    var sellAssets = _useSellAsset.sellAssets;
  var _useProfilePageState = useProfilePageState(function (_ref13) {
      var setProfilePageState = _ref13.setProfilePageState;
      return {
        setProfilePageState: setProfilePageState
      };
    }),
    setProfilePageState = _useProfilePageState.setProfilePageState;
  var _useBag = useBag(function (state) {
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
  var _useBag2 = useBag(function (_ref14) {
      var itemsInBag = _ref14.itemsInBag;
      return {
        uncheckedItemsInBag: itemsInBag
      };
    }),
    uncheckedItemsInBag = _useBag2.uncheckedItemsInBag;
  var isProfilePage = useIsNftProfilePage();
  var isNFTPage = useIsNftPage();
  var isMobile = useIsMobile();
  var itemsInBag = useMemo(function () {
    return recalculateBagUsingPooledAssets(uncheckedItemsInBag);
  }, [uncheckedItemsInBag]);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    isModalOpen = _useState2[0],
    setModalIsOpen = _useState2[1];
  var _useSubscribeScrollSt = useSubscribeScrollState(),
    userCanScroll = _useSubscribeScrollSt.userCanScroll,
    scrollRef = _useSubscribeScrollSt.scrollRef,
    scrollProgress = _useSubscribeScrollSt.scrollProgress,
    scrollHandler = _useSubscribeScrollSt.scrollHandler;
  var handleCloseBag = useCallback(function () {
    setBagExpanded({
      bagExpanded: false,
      manualClose: true
    });
  }, [setBagExpanded]);
  useEffect(function () {
    if (bagIsLocked && !isModalOpen) setModalIsOpen(true);
  }, [bagIsLocked, isModalOpen]);
  var hasAssetsToShow = itemsInBag.length > 0;
  var isBuyingAssets = itemsInBag.length > 0;
  var isSellingAssets = sellAssets.length > 0;
  var shouldRenderEmptyState = Boolean(!isBuyingAssets && bagStatus === BagStatus.ADDING_TO_BAG || isProfilePage );
  var eventProperties = useMemo(function () {
    return _objectSpread({}, formatAssetEventProperties(itemsInBag.map(function (item) {
      return item.asset;
    })));
  }, [itemsInBag]);
  if (!bagExpanded || !isNFTPage) {
    return null;
  }
  return /*#__PURE__*/React__default.createElement(Portal, null, /*#__PURE__*/React__default.createElement(BagContainer, {
    "data-testid": "nft-bag",
    raiseZIndex: isMobile || isModalOpen,
    isProfilePage: isProfilePage
  }, /*#__PURE__*/React__default.createElement(BagHeader, {
    numberOfAssets: itemsInBag.length,
    closeBag: handleCloseBag,
    resetFlow: reset,
    isProfilePage: isProfilePage
  }), shouldRenderEmptyState && /*#__PURE__*/React__default.createElement(EmptyState, null), /*#__PURE__*/React__default.createElement(ScrollingIndicator, {
    top: true,
    show: userCanScroll && scrollProgress > 0
  }), /*#__PURE__*/React__default.createElement(Column, {
    ref: scrollRef,
    className: assetsContainer,
    onScroll: scrollHandler,
    gap: "12"
  }, /*#__PURE__*/React__default.createElement(BagContent, null)), hasAssetsToShow && !isProfilePage && /*#__PURE__*/React__default.createElement(BagFooter, {
    setModalIsOpen: setModalIsOpen,
    eventProperties: eventProperties
  }), isSellingAssets && isProfilePage && /*#__PURE__*/React__default.createElement(ContinueButton, {
    onClick: function onClick() {
      toggleBag();
      setProfilePageState(ProfilePageStateType.LISTING);
      sendAnalyticsEvent(NFTEventName.NFT_PROFILE_PAGE_START_SELL, {
        list_quantity: sellAssets.length,
        collection_addresses: sellAssets.map(function (asset) {
          return asset.asset_contract.address;
        }),
        token_ids: sellAssets.map(function (asset) {
          return asset.tokenId;
        })
      });
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "xGVfLh",
    message: "Continue"
  }))), isModalOpen && /*#__PURE__*/React__default.createElement(Overlay, {
    onClick: function onClick() {
      return !bagIsLocked ? setModalIsOpen(false) : undefined;
    }
  }));
};

export { BAG_WIDTH, XXXL_BAG_WIDTH, Bag as default };
