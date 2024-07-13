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

export { formatAssetEventProperties };
