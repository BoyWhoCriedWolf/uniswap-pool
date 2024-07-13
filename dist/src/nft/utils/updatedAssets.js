import { BigNumber } from '@ethersproject/bignumber';

var updatedAssetPriceDifference = function updatedAssetPriceDifference(asset) {
  if (!asset.updatedPriceInfo) return BigNumber.from(0);
  return BigNumber.from(asset.updatedPriceInfo.ETHPrice).sub(BigNumber.from(asset.priceInfo.ETHPrice));
};
var sortUpdatedAssets = function sortUpdatedAssets(x, y) {
  return updatedAssetPriceDifference(x).gt(updatedAssetPriceDifference(y)) ? -1 : 1;
};
var getTotalNftValue = function getTotalNftValue(nfts) {
  return nfts && nfts.reduce(function (ethTotal, nft) {
    return ethTotal.add(BigNumber.from(nft.updatedPriceInfo ? nft.updatedPriceInfo.ETHPrice : nft.priceInfo.ETHPrice));
  }, BigNumber.from(0));
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

export { filterUpdatedAssetsByState, getTotalNftValue };
