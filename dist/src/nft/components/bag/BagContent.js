import React__default, { useMemo, useEffect } from 'react';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { NFTEventName } from '@uniswap/analytics-events';
import { sendAnalyticsEvent, Trace } from '../../../analytics/index.js';
import { UnavailableAssetsHeaderRow, PriceChangeBagRow, BagRow } from './BagRow.js';
import { Column } from '../Flex.js';
import { useBag } from '../../hooks/useBag.js';
import '../../hooks/useCollectionFilters.js';
import '../../hooks/useFiltersExpanded.js';
import '../../hooks/useIsCollectionLoading.js';
import { useIsMobile } from '../../hooks/useIsMobile.js';
import '../../../hooks/useScreenSize.js';
import '../../hooks/useNFTList.js';
import '../../hooks/useProfilePageState.js';
import '../../hooks/useSellAsset.js';
import '../../hooks/useSendTransaction.js';
import '@babel/runtime/helpers/slicedToArray';
import '../../hooks/useTransactionResponse.js';
import { useNativeUsdPrice } from '../../hooks/useUsdPrice.js';
import '@ethersproject/units';
import '@web3-react/core';
import '../../../lib/hooks/useCurrencyBalance.js';
import '../../hooks/useWalletCollections.js';
import { BagItemStatus, BagStatus } from '../../types/checkout/index.js';
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

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var BagContent = function BagContent() {
  var bagStatus = useBag(function (s) {
    return s.bagStatus;
  });
  var setBagStatus = useBag(function (s) {
    return s.setBagStatus;
  });
  var markAssetAsReviewed = useBag(function (s) {
    return s.markAssetAsReviewed;
  });
  var didOpenUnavailableAssets = useBag(function (s) {
    return s.didOpenUnavailableAssets;
  });
  var setDidOpenUnavailableAssets = useBag(function (s) {
    return s.setDidOpenUnavailableAssets;
  });
  var uncheckedItemsInBag = useBag(function (s) {
    return s.itemsInBag;
  });
  var setItemsInBag = useBag(function (s) {
    return s.setItemsInBag;
  });
  var removeAssetsFromBag = useBag(function (s) {
    return s.removeAssetsFromBag;
  });
  var isMobile = useIsMobile();
  var itemsInBag = useMemo(function () {
    return recalculateBagUsingPooledAssets(uncheckedItemsInBag);
  }, [uncheckedItemsInBag]);
  var ethUsdPrice = useNativeUsdPrice();
  var _useMemo = useMemo(function () {
      var unchangedAssets = itemsInBag.filter(function (item) {
        return item.status === BagItemStatus.ADDED_TO_BAG || item.status === BagItemStatus.REVIEWED;
      }).map(function (item) {
        return item.asset;
      });
      var priceChangedAssets = itemsInBag.filter(function (item) {
        return item.status === BagItemStatus.REVIEWING_PRICE_CHANGE;
      }).map(function (item) {
        return item.asset;
      });
      var unavailableAssets = itemsInBag.filter(function (item) {
        return item.status === BagItemStatus.UNAVAILABLE;
      }).map(function (item) {
        return item.asset;
      });
      var availableItems = itemsInBag.filter(function (item) {
        return item.status !== BagItemStatus.UNAVAILABLE;
      });
      return {
        unchangedAssets: unchangedAssets,
        priceChangedAssets: priceChangedAssets,
        unavailableAssets: unavailableAssets,
        availableItems: availableItems
      };
    }, [itemsInBag]),
    unchangedAssets = _useMemo.unchangedAssets,
    priceChangedAssets = _useMemo.priceChangedAssets,
    unavailableAssets = _useMemo.unavailableAssets,
    availableItems = _useMemo.availableItems;
  useEffect(function () {
    var hasAssetsInReview = priceChangedAssets.length > 0;
    var hasAssets = itemsInBag.length > 0;
    if (hasAssetsInReview) sendAnalyticsEvent(NFTEventName.NFT_BUY_BAG_CHANGED, _objectSpread({
      usd_value: ethUsdPrice,
      bag_quantity: itemsInBag
    }, formatAssetEventProperties(priceChangedAssets)));
    if (bagStatus === BagStatus.IN_REVIEW && !hasAssetsInReview) {
      if (hasAssets) setBagStatus(BagStatus.CONFIRM_REVIEW);else setBagStatus(BagStatus.ADDING_TO_BAG);
    }
    if (bagStatus === BagStatus.CONFIRM_REVIEW && !hasAssets) {
      setBagStatus(BagStatus.ADDING_TO_BAG);
    }
  }, [bagStatus, itemsInBag, priceChangedAssets, setBagStatus, ethUsdPrice]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Column, {
    display: priceChangedAssets.length > 0 || unavailableAssets.length > 0 ? "flex" : "none"
  }, unavailableAssets.length > 0 && /*#__PURE__*/React__default.createElement(Trace, {
    name: NFTEventName.NFT_BUY_BAG_CHANGED,
    properties: _objectSpread({
      usd_value: ethUsdPrice,
      bag_quantity: itemsInBag.length
    }, formatAssetEventProperties(unavailableAssets)),
    shouldLogImpression: true
  }, /*#__PURE__*/React__default.createElement(UnavailableAssetsHeaderRow, {
    assets: unavailableAssets,
    usdPrice: ethUsdPrice,
    clearUnavailableAssets: function clearUnavailableAssets() {
      return setItemsInBag(availableItems);
    },
    didOpenUnavailableAssets: didOpenUnavailableAssets,
    setDidOpenUnavailableAssets: setDidOpenUnavailableAssets,
    isMobile: isMobile
  })), priceChangedAssets.map(function (asset, index) {
    return /*#__PURE__*/React__default.createElement(PriceChangeBagRow, {
      key: asset.id,
      asset: asset,
      usdPrice: ethUsdPrice,
      markAssetAsReviewed: markAssetAsReviewed,
      top: index === 0 && unavailableAssets.length === 0,
      isMobile: isMobile
    });
  })), /*#__PURE__*/React__default.createElement(Column, null, unchangedAssets.slice(0).reverse().map(function (asset) {
    return /*#__PURE__*/React__default.createElement(BagRow, {
      key: asset.id,
      asset: asset,
      usdPrice: ethUsdPrice,
      removeAsset: removeAssetsFromBag,
      showRemove: true,
      isMobile: isMobile
    });
  })));
};

export { BagContent };
