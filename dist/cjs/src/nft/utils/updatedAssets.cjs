'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bignumber = require('@ethersproject/bignumber');

var updatedAssetPriceDifference = function updatedAssetPriceDifference(asset) {
  if (!asset.updatedPriceInfo) return bignumber.BigNumber.from(0);
  return bignumber.BigNumber.from(asset.updatedPriceInfo.ETHPrice).sub(bignumber.BigNumber.from(asset.priceInfo.ETHPrice));
};
var sortUpdatedAssets = function sortUpdatedAssets(x, y) {
  return updatedAssetPriceDifference(x).gt(updatedAssetPriceDifference(y)) ? -1 : 1;
};
var getTotalNftValue = function getTotalNftValue(nfts) {
  return nfts && nfts.reduce(function (ethTotal, nft) {
    return ethTotal.add(bignumber.BigNumber.from(nft.updatedPriceInfo ? nft.updatedPriceInfo.ETHPrice : nft.priceInfo.ETHPrice));
  }, bignumber.BigNumber.from(0));
};
function filterUpdatedAssetsByState(assets) {
  var unchanged = assets.filter(function (asset) {
    return !asset.updatedPriceInfo && !asset.isUnavailable;
  });
  var priceChanged = assets.filter(function (asset) {
    return asset.updatedPriceInfo;
  }).sort(sortUpdatedAssets);
  var unavailable = assets.filter(function (asset) {
    return asset.isUnavailable;
  });
  return {
    unchanged: unchanged,
    priceChanged: priceChanged,
    unavailable: unavailable
  };
}

exports.filterUpdatedAssetsByState = filterUpdatedAssetsByState;
exports.getTotalNftValue = getTotalNftValue;
