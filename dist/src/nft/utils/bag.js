import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { BagItemStatus, BagStatus } from '../types/checkout/index.js';
import { compareAssetsWithTransactionRoute } from './txRoute/combineItemsWithTxRoute.js';
import { filterUpdatedAssetsByState } from './updatedAssets.js';

function getPurchasableAssets(itemsInBag) {
  return itemsInBag.filter(function (item) {
    return item.status !== BagItemStatus.UNAVAILABLE;
  }).map(function (item) {
    return item.asset;
  });
}
function createBagFromUpdatedAssets(unavailable, priceChanged, unchanged) {
  return [].concat(_toConsumableArray(unavailable.map(function (unavailableAsset) {
    return {
      asset: unavailableAsset,
      status: BagItemStatus.UNAVAILABLE
    };
  })), _toConsumableArray(priceChanged.map(function (changedAsset) {
    return {
      asset: changedAsset,
      status: BagItemStatus.REVIEWING_PRICE_CHANGE
    };
  })), _toConsumableArray(unchanged.map(function (unchangedAsset) {
    return {
      asset: unchangedAsset,
      status: BagItemStatus.REVIEWED
    };
  })));
}
function evaluateNextBagState(hasAssets, shouldReview, hasAssetsInReview, shouldRefetchCalldata) {
  if (!hasAssets) {
    return BagStatus.ADDING_TO_BAG;
  }
  if (shouldReview) {
    if (hasAssetsInReview) {
      return BagStatus.IN_REVIEW;
    }
    return BagStatus.CONFIRM_REVIEW;
  }
  if (shouldRefetchCalldata) {
    return BagStatus.CONFIRM_QUOTE;
  }
  return BagStatus.CONFIRMING_IN_WALLET;
}
function getNextBagState(wishAssetsToBuy, route, purchasingWithErc20) {
  var _compareAssetsWithTra = compareAssetsWithTransactionRoute(wishAssetsToBuy, route),
    hasPriceAdjustment = _compareAssetsWithTra.hasPriceAdjustment,
    updatedAssets = _compareAssetsWithTra.updatedAssets;
  var shouldRefetchCalldata = hasPriceAdjustment && purchasingWithErc20;
  var _filterUpdatedAssetsB = filterUpdatedAssetsByState(updatedAssets),
    unchanged = _filterUpdatedAssetsB.unchanged,
    priceChanged = _filterUpdatedAssetsB.priceChanged,
    unavailable = _filterUpdatedAssetsB.unavailable;
  var hasAssets = updatedAssets.length > 0;
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

export { getNextBagState, getPurchasableAssets };
