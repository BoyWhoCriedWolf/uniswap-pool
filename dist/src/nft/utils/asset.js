import React__default from 'react';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { SquareNft20MarketplaceIcon, SquareFoundationMarketplaceIcon, SquareRaribleMarketplaceIcon, SquareCryptopunksMarketplaceIcon, SquareEnsVisionMarketplaceIcon, SquareZoraMarketplaceIcon, SquareGemMarketplaceIcon, SquareNftXMarketplaceIcon, SquareSudoSwapMarketplaceIcon, SquareLooksBlurMarketplaceIcon, SquareLooksX2Y2MarketplaceIcon, SquareLooksRareMarketplaceIcon, SquareOpenSeaMarketplaceIcon } from '../components/icons.js';
import { Markets } from '../types/common/index.js';
import { v4 } from 'uuid';

var getAssetHref = function getAssetHref(asset, origin) {
  var address = asset.address !== undefined ? asset.address : asset.asset_contract.address;
  return "/nfts/asset/".concat(address, "/").concat(asset.tokenId).concat(origin ? "?origin=".concat(origin) : "");
};
var getMarketplaceIcon = function getMarketplaceIcon(marketplace) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "16";
  switch (marketplace.toLowerCase()) {
    case Markets.Opensea:
      return /*#__PURE__*/React__default.createElement(SquareOpenSeaMarketplaceIcon, {
        width: size,
        height: size
      });
    case Markets.LooksRare:
      return /*#__PURE__*/React__default.createElement(SquareLooksRareMarketplaceIcon, {
        width: size,
        height: size
      });
    case Markets.X2Y2:
      return /*#__PURE__*/React__default.createElement(SquareLooksX2Y2MarketplaceIcon, {
        width: size,
        height: size,
        gradientId: v4()
      });
    case Markets.Blur:
      return /*#__PURE__*/React__default.createElement(SquareLooksBlurMarketplaceIcon, {
        width: size,
        height: size
      });
    case Markets.Sudoswap:
      return /*#__PURE__*/React__default.createElement(SquareSudoSwapMarketplaceIcon, {
        width: size,
        height: size
      });
    case Markets.NFTX:
      return /*#__PURE__*/React__default.createElement(SquareNftXMarketplaceIcon, {
        width: size,
        height: size,
        gradientId: v4()
      });
    case Markets.Gem:
      return /*#__PURE__*/React__default.createElement(SquareGemMarketplaceIcon, {
        width: size,
        height: size,
        gradientId: v4()
      });
    case Markets.Zora:
      return /*#__PURE__*/React__default.createElement(SquareZoraMarketplaceIcon, {
        width: size,
        height: size,
        gradientId: v4()
      });
    case Markets.Ensvision:
      return /*#__PURE__*/React__default.createElement(SquareEnsVisionMarketplaceIcon, {
        width: size,
        height: size
      });
    case Markets.Cryptopunks:
    case "larvalabs":
      return /*#__PURE__*/React__default.createElement(SquareCryptopunksMarketplaceIcon, {
        width: size,
        height: size
      });
    case Markets.Rarible:
      return /*#__PURE__*/React__default.createElement(SquareRaribleMarketplaceIcon, {
        width: size,
        height: size
      });
    case Markets.Foundation:
      return /*#__PURE__*/React__default.createElement(SquareFoundationMarketplaceIcon, {
        width: size,
        height: size
      });
    case Markets.NFT20:
      return /*#__PURE__*/React__default.createElement(SquareNft20MarketplaceIcon, {
        width: size,
        height: size
      });
    default:
      return null;
  }
};
var generateTweetForPurchase = function generateTweetForPurchase(assets, txHashUrl) {
  var _assets$0$collectionN;
  var multipleCollections = assets.length > 0 && assets.some(function (asset) {
    return asset.address !== assets[0].address;
  });
  var collectionUrl = assets.length > 0 && !multipleCollections ? "collection/".concat(assets[0].address) : "";
  var tweetText = "I just purchased ".concat(multipleCollections ? "".concat(assets.length, " NFTs") : "".concat(assets.length, " ").concat((_assets$0$collectionN = assets[0].collectionName) !== null && _assets$0$collectionN !== void 0 ? _assets$0$collectionN : "NFT"), " with @Uniswap \uD83E\uDD84\n\nhttps://app.uniswap.org/nfts/").concat(collectionUrl, "\n").concat(txHashUrl);
  return "https://twitter.com/intent/tweet?text=".concat(encodeURIComponent(tweetText));
};
function getMinListingPrice(listings) {
  var _Math$min;
  return (_Math$min = Math.min.apply(Math, _toConsumableArray(listings.map(function (listing) {
    var _listing$price;
    return (_listing$price = listing.price) !== null && _listing$price !== void 0 ? _listing$price : 0;
  })))) !== null && _Math$min !== void 0 ? _Math$min : 0;
}
function mapAssetsToCollections(assets) {
  var collections = assets.map(function (asset) {
    var _ref, _asset$collection$twi, _asset$collection, _asset$collection2;
    return (_ref = (_asset$collection$twi = (_asset$collection = asset.collection) === null || _asset$collection === void 0 ? void 0 : _asset$collection.twitterUrl) !== null && _asset$collection$twi !== void 0 ? _asset$collection$twi : (_asset$collection2 = asset.collection) === null || _asset$collection2 === void 0 ? void 0 : _asset$collection2.name) !== null && _ref !== void 0 ? _ref : "";
  });
  var uniqueCollections = _toConsumableArray(new Set(collections));
  return uniqueCollections.map(function (collection) {
    return {
      collection: collection,
      items: assets.filter(function (asset) {
        var _asset$collection3, _asset$collection4;
        return ((_asset$collection3 = asset.collection) === null || _asset$collection3 === void 0 ? void 0 : _asset$collection3.twitterUrl) === collection || ((_asset$collection4 = asset.collection) === null || _asset$collection4 === void 0 ? void 0 : _asset$collection4.name) === collection;
      }).map(function (asset) {
        var _asset$name;
        return (_asset$name = asset.name) !== null && _asset$name !== void 0 ? _asset$name : "";
      })
    };
  });
}
var generateTweetForList = function generateTweetForList(assets) {
  var _assets$0$collection, _assets$0$collection2, _ref2, _assets$0$collection3, _assets$0$newListings, _assets$0$marketplace, _assets$0$marketplace2;
  var tweetText = assets.length == 1 ? "I just listed ".concat((_assets$0$collection = assets[0].collection) !== null && _assets$0$collection !== void 0 && _assets$0$collection.twitterUrl ? "".concat((_assets$0$collection2 = assets[0].collection) === null || _assets$0$collection2 === void 0 ? void 0 : _assets$0$collection2.twitterUrl, " ") : (_ref2 = "".concat((_assets$0$collection3 = assets[0].collection) === null || _assets$0$collection3 === void 0 ? void 0 : _assets$0$collection3.name, " ")) !== null && _ref2 !== void 0 ? _ref2 : "").concat(assets[0].name, " for ").concat(getMinListingPrice((_assets$0$newListings = assets[0].newListings) !== null && _assets$0$newListings !== void 0 ? _assets$0$newListings : []), " ETH on ").concat((_assets$0$marketplace = assets[0].marketplaces) === null || _assets$0$marketplace === void 0 ? void 0 : _assets$0$marketplace.map(function (market) {
    return market.name;
  }).join(", "), ". Buy it on @Uniswap at https://app.uniswap.org/").concat(getAssetHref(assets[0])) : "I just listed ".concat(assets.length, " items on @Uniswap at https://app.uniswap.org/nfts/profile\n\nCollections: ").concat(mapAssetsToCollections(assets).map(function (_ref3) {
    var collection = _ref3.collection,
      items = _ref3.items;
    return "".concat(collection, " ").concat(items.map(function (item) {
      return item;
    }).join(", "));
  }).join(", "), " \n\nMarketplaces: ").concat((_assets$0$marketplace2 = assets[0].marketplaces) === null || _assets$0$marketplace2 === void 0 ? void 0 : _assets$0$marketplace2.map(function (market) {
    return market.name;
  }).join(", "));
  return "https://twitter.com/intent/tweet?text=".concat(encodeURIComponent(tweetText));
};

export { generateTweetForList, generateTweetForPurchase, getAssetHref, getMarketplaceIcon };
