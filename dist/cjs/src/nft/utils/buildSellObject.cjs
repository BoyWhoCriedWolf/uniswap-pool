'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../types/checkout/index.cjs');

var buildNftTradeInputFromBagItems = function buildNftTradeInputFromBagItems(itemsInBag) {
  var assetsToBuy = itemsInBag.filter(function (item) {
    return item.status !== index.BagItemStatus.UNAVAILABLE;
  }).map(function (item) {
    return item.asset;
  });
  return buildNftTradeInput(assetsToBuy);
};
var buildNftTradeInput = function buildNftTradeInput(assets) {
  return assets.flatMap(function (asset) {
    var id = asset.id,
      address = asset.address,
      marketplace = asset.marketplace,
      priceInfo = asset.priceInfo,
      tokenId = asset.tokenId,
      tokenType = asset.tokenType;
    if (!id || !marketplace) return [];
    var ethAmountInput = {
      amount: priceInfo.ETHPrice,
      token: {
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        chainId: 1,
        decimals: 18,
        isNative: true
      }
    };
    return [{
      amount: 1,
      contractAddress: address,
      id: id,
      marketplace: marketplace.toUpperCase(),
      quotePrice: ethAmountInput,
      tokenId: tokenId,
      tokenType: tokenType
    }];
  });
};

exports.buildNftTradeInputFromBagItems = buildNftTradeInputFromBagItems;
