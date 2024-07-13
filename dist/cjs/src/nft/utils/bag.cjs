'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var index = require('../types/checkout/index.cjs');
var combineItemsWithTxRoute = require('./txRoute/combineItemsWithTxRoute.cjs');
var updatedAssets = require('./updatedAssets.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

function getPurchasableAssets(itemsInBag) {
  return itemsInBag.filter(function (item) {
    return item.status !== index.BagItemStatus.UNAVAILABLE;
  }).map(function (item) {
    return item.asset;
  });
}
function createBagFromUpdatedAssets(unavailable, priceChanged, unchanged) {
  return [].concat(_toConsumableArray__default["default"](unavailable.map(function (unavailableAsset) {
    return {
      asset: unavailableAsset,
      status: index.BagItemStatus.UNAVAILABLE
    };
  })), _toConsumableArray__default["default"](priceChanged.map(function (changedAsset) {
    return {
      asset: changedAsset,
      status: index.BagItemStatus.REVIEWING_PRICE_CHANGE
    };
  })), _toConsumableArray__default["default"](unchanged.map(function (unchangedAsset) {
    return {
      asset: unchangedAsset,
      status: index.BagItemStatus.REVIEWED
    };
  })));
}
function evaluateNextBagState(hasAssets, shouldReview, hasAssetsInReview, shouldRefetchCalldata) {
  if (!hasAssets) {
    return index.BagStatus.ADDING_TO_BAG;
  }
  if (shouldReview) {
    if (hasAssetsInReview) {
      return index.BagStatus.IN_REVIEW;
    }
    return index.BagStatus.CONFIRM_REVIEW;
  }
  if (shouldRefetchCalldata) {
    return index.BagStatus.CONFIRM_QUOTE;
  }
  return index.BagStatus.CONFIRMING_IN_WALLET;
}
function getNextBagState(wishAssetsToBuy, route, purchasingWithErc20) {
  var _compareAssetsWithTra = combineItemsWithTxRoute.compareAssetsWithTransactionRoute(wishAssetsToBuy, route),
    hasPriceAdjustment = _compareAssetsWithTra.hasPriceAdjustment,
    updatedAssets$1 = _compareAssetsWithTra.updatedAssets;
  var shouldRefetchCalldata = hasPriceAdjustment && purchasingWithErc20;
  var _filterUpdatedAssetsB = updatedAssets.filterUpdatedAssetsByState(updatedAssets$1),
    unchanged = _filterUpdatedAssetsB.unchanged,
    priceChanged = _filterUpdatedAssetsB.priceChanged,
    unavailable = _filterUpdatedAssetsB.unavailable;
  var hasAssets = updatedAssets$1.length > 0;
  var hasAssetsInReview = priceChanged.length > 0;
  var hasUnavailableAssets = unavailable.length > 0;
  var shouldReview = hasAssetsInReview || hasUnavailableAssets;
  var newBagItems = createBagFromUpdatedAssets(unavailable, priceChanged, unchanged);
  var nextBagStatus = evaluateNextBagState(hasAssets, shouldReview, hasAssetsInReview, shouldRefetchCalldata);
  return {
    newBagItems: newBagItems,
    nextBagStatus: nextBagStatus
  };
}

exports.getNextBagState = getNextBagState;
exports.getPurchasableAssets = getPurchasableAssets;
