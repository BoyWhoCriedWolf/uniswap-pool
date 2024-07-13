'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var formatAssetEventProperties = function formatAssetEventProperties(assets) {
  return {
    collection_addresses: assets.map(function (asset) {
      return asset.address;
    }),
    token_ids: assets.map(function (asset) {
      return asset.tokenId;
    }),
    token_types: assets.map(function (asset) {
      return asset.tokenType;
    })
  };
};

exports.formatAssetEventProperties = formatAssetEventProperties;
