import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { isPooledMarket, Markets } from '../../types/common/index.js';
import 'react';
import '@babel/runtime/helpers/toConsumableArray';
import '../../components/icons.js';
import 'uuid';
import { isInSameSudoSwapPool, isInSameMarketplaceCollection } from '../collection.js';
import { formatWeiToDecimal } from '../currency.js';
import 'video-extensions';
import '../../../locales/en-US.js';
import 'numbro';
import { calcAvgGroupPoolPrice } from '../pooledAssets.js';
import '../time.js';
import '@ethersproject/bignumber';
import '@ethersproject/units';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var isTheSame = function isTheSame(item, routeAsset) {
  // if route asset has id, match by id
  if ("id" in routeAsset && routeAsset.id) {
    return routeAsset.id === item.id;
  } else {
    return "address" in routeAsset && routeAsset.address.toLowerCase() === item.address.toLowerCase() && routeAsset.tokenId === item.tokenId;
  }
};
var getPriceDiff = function getPriceDiff(oldPrice, newPrice) {
  var hasPriceDiff = oldPrice !== newPrice;
  var hasVisiblePriceDiff = formatWeiToDecimal(oldPrice) !== formatWeiToDecimal(newPrice);
  return {
    hasPriceDiff: hasPriceDiff,
    hasVisiblePriceDiff: hasVisiblePriceDiff
  };
};
var isAveragePriceOfPooledAssets = function isAveragePriceOfPooledAssets(asset, numberOfAssetsInPool, expectedPrice) {
  return !getPriceDiff(calcAvgGroupPoolPrice(asset, numberOfAssetsInPool), expectedPrice).hasVisiblePriceDiff;
};
var isAveragedPrice = function isAveragedPrice(item, items, route, txRoute) {
  if (!(route && "priceInfo" in route.assetOut)) return false;
  return !!item.marketplace && isPooledMarket(item.marketplace) && isAveragePriceOfPooledAssets(item, items.filter(function (routeItem) {
    return itemInRouteAndSamePool(item, routeItem, txRoute);
  }).length, route.assetOut.priceInfo.basePrice);
};
var getRouteForItem = function getRouteForItem(item, txRoute) {
  return txRoute && txRoute.find(function (r) {
    return r.action === "Buy" && isTheSame(item, r.assetOut);
  });
};
var itemHasRoute = function itemHasRoute(item, txRoute) {
  return !!getRouteForItem(item, txRoute);
};
var itemInRouteAndSamePool = function itemInRouteAndSamePool(item, routeItem, txRoute) {
  return itemHasRoute(routeItem, txRoute) && (item.marketplace === Markets.Sudoswap ? isInSameSudoSwapPool(item, routeItem) : isInSameMarketplaceCollection(item, routeItem));
};
var compareAssetsWithTransactionRoute = function compareAssetsWithTransactionRoute(items, txRoute) {
  var hasPriceAdjustment = false;
  var updatedAssets = items.map(function (item) {
    var route = getRouteForItem(item, txRoute);
    if (txRoute && !route) {
      return _objectSpread(_objectSpread({}, item), {}, {
        isUnavailable: true
      });
    }
    var newPriceInfo = item.updatedPriceInfo ? item.updatedPriceInfo : item.priceInfo;
    if (route && "priceInfo" in route.assetOut) {
      var _getPriceDiff = getPriceDiff(newPriceInfo.basePrice, route.assetOut.priceInfo.basePrice),
        hasPriceDiff = _getPriceDiff.hasPriceDiff,
        hasVisiblePriceDiff = _getPriceDiff.hasVisiblePriceDiff;
      newPriceInfo = route.assetOut.priceInfo;
      hasPriceAdjustment = hasPriceDiff;
      if (hasVisiblePriceDiff) {
        if (!isAveragedPrice(item, items, route, txRoute)) {
          return _objectSpread(_objectSpread({}, item), {}, {
            updatedPriceInfo: newPriceInfo
          });
        }
      }
    }
    return _objectSpread(_objectSpread({}, item), {}, {
      priceInfo: newPriceInfo,
      updatedPriceInfo: undefined,
      orderSource: route && "orderSource" in route.assetOut ? route.assetOut.orderSource : undefined
    });
  });
  return {
    hasPriceAdjustment: hasPriceAdjustment,
    updatedAssets: updatedAssets
  };
};

export { compareAssetsWithTransactionRoute };
