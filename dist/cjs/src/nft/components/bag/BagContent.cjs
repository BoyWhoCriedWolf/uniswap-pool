'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var analyticsEvents = require('@uniswap/analytics-events');
var index$1 = require('../../../analytics/index.cjs');
var BagRow = require('./BagRow.cjs');
var Flex = require('../Flex.cjs');
var useBag = require('../../hooks/useBag.cjs');
require('../../hooks/useCollectionFilters.cjs');
require('../../hooks/useFiltersExpanded.cjs');
require('../../hooks/useIsCollectionLoading.cjs');
var useIsMobile = require('../../hooks/useIsMobile.cjs');
require('../../../hooks/useScreenSize.cjs');
require('../../hooks/useNFTList.cjs');
require('../../hooks/useProfilePageState.cjs');
require('../../hooks/useSellAsset.cjs');
require('../../hooks/useSendTransaction.cjs');
require('@babel/runtime/helpers/slicedToArray');
require('../../hooks/useTransactionResponse.cjs');
var useUsdPrice = require('../../hooks/useUsdPrice.cjs');
require('@ethersproject/units');
require('@web3-react/core');
require('../../../lib/hooks/useCurrencyBalance.cjs');
require('../../hooks/useWalletCollections.cjs');
var index = require('../../types/checkout/index.cjs');
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

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var BagContent = function BagContent() {
  var bagStatus = useBag.useBag(function (s) {
    return s.bagStatus;
  });
  var setBagStatus = useBag.useBag(function (s) {
    return s.setBagStatus;
  });
  var markAssetAsReviewed = useBag.useBag(function (s) {
    return s.markAssetAsReviewed;
  });
  var didOpenUnavailableAssets = useBag.useBag(function (s) {
    return s.didOpenUnavailableAssets;
  });
  var setDidOpenUnavailableAssets = useBag.useBag(function (s) {
    return s.setDidOpenUnavailableAssets;
  });
  var uncheckedItemsInBag = useBag.useBag(function (s) {
    return s.itemsInBag;
  });
  var setItemsInBag = useBag.useBag(function (s) {
    return s.setItemsInBag;
  });
  var removeAssetsFromBag = useBag.useBag(function (s) {
    return s.removeAssetsFromBag;
  });
  var isMobile = useIsMobile.useIsMobile();
  var itemsInBag = React.useMemo(function () {
    return pooledAssets.recalculateBagUsingPooledAssets(uncheckedItemsInBag);
  }, [uncheckedItemsInBag]);
  var ethUsdPrice = useUsdPrice.useNativeUsdPrice();
  var _useMemo = React.useMemo(function () {
      var unchangedAssets = itemsInBag.filter(function (item) {
        return item.status === index.BagItemStatus.ADDED_TO_BAG || item.status === index.BagItemStatus.REVIEWED;
      }).map(function (item) {
        return item.asset;
      });
      var priceChangedAssets = itemsInBag.filter(function (item) {
        return item.status === index.BagItemStatus.REVIEWING_PRICE_CHANGE;
      }).map(function (item) {
        return item.asset;
      });
      var unavailableAssets = itemsInBag.filter(function (item) {
        return item.status === index.BagItemStatus.UNAVAILABLE;
      }).map(function (item) {
        return item.asset;
      });
      var availableItems = itemsInBag.filter(function (item) {
        return item.status !== index.BagItemStatus.UNAVAILABLE;
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
  React.useEffect(function () {
    var hasAssetsInReview = priceChangedAssets.length > 0;
    var hasAssets = itemsInBag.length > 0;
    if (hasAssetsInReview) index$1.sendAnalyticsEvent(analyticsEvents.NFTEventName.NFT_BUY_BAG_CHANGED, _objectSpread({
      usd_value: ethUsdPrice,
      bag_quantity: itemsInBag
    }, formatEventProperties.formatAssetEventProperties(priceChangedAssets)));
    if (bagStatus === index.BagStatus.IN_REVIEW && !hasAssetsInReview) {
      if (hasAssets) setBagStatus(index.BagStatus.CONFIRM_REVIEW);else setBagStatus(index.BagStatus.ADDING_TO_BAG);
    }
    if (bagStatus === index.BagStatus.CONFIRM_REVIEW && !hasAssets) {
      setBagStatus(index.BagStatus.ADDING_TO_BAG);
    }
  }, [bagStatus, itemsInBag, priceChangedAssets, setBagStatus, ethUsdPrice]);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Flex.Column, {
    display: priceChangedAssets.length > 0 || unavailableAssets.length > 0 ? "flex" : "none"
  }, unavailableAssets.length > 0 && /*#__PURE__*/React__default["default"].createElement(index$1.Trace, {
    name: analyticsEvents.NFTEventName.NFT_BUY_BAG_CHANGED,
    properties: _objectSpread({
      usd_value: ethUsdPrice,
      bag_quantity: itemsInBag.length
    }, formatEventProperties.formatAssetEventProperties(unavailableAssets)),
    shouldLogImpression: true
  }, /*#__PURE__*/React__default["default"].createElement(BagRow.UnavailableAssetsHeaderRow, {
    assets: unavailableAssets,
    usdPrice: ethUsdPrice,
    clearUnavailableAssets: function clearUnavailableAssets() {
      return setItemsInBag(availableItems);
    },
    didOpenUnavailableAssets: didOpenUnavailableAssets,
    setDidOpenUnavailableAssets: setDidOpenUnavailableAssets,
    isMobile: isMobile
  })), priceChangedAssets.map(function (asset, index) {
    return /*#__PURE__*/React__default["default"].createElement(BagRow.PriceChangeBagRow, {
      key: asset.id,
      asset: asset,
      usdPrice: ethUsdPrice,
      markAssetAsReviewed: markAssetAsReviewed,
      top: index === 0 && unavailableAssets.length === 0,
      isMobile: isMobile
    });
  })), /*#__PURE__*/React__default["default"].createElement(Flex.Column, null, unchangedAssets.slice(0).reverse().map(function (asset) {
    return /*#__PURE__*/React__default["default"].createElement(BagRow.BagRow, {
      key: asset.id,
      asset: asset,
      usdPrice: ethUsdPrice,
      removeAsset: removeAssetsFromBag,
      showRemove: true,
      isMobile: isMobile
    });
  })));
};

exports.BagContent = BagContent;
