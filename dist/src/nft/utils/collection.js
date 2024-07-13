var isInSameSudoSwapPool = function isInSameSudoSwapPool(assetA, assetB) {
  if (!assetA.sellorders || !assetB.sellorders) return false;
  var assetASudoSwapPoolParameters = assetA.sellorders[0].protocolParameters;
  var assetBSudoSwapPoolParameters = assetB.sellorders[0].protocolParameters;
  var assetAPoolAddress = assetASudoSwapPoolParameters !== null && assetASudoSwapPoolParameters !== void 0 && assetASudoSwapPoolParameters.poolAddress ? assetASudoSwapPoolParameters.poolAddress : undefined;
  var assetBPoolAddress = assetBSudoSwapPoolParameters !== null && assetBSudoSwapPoolParameters !== void 0 && assetBSudoSwapPoolParameters.poolAddress ? assetBSudoSwapPoolParameters.poolAddress : undefined;
  if (!assetAPoolAddress || !assetBPoolAddress) return false;
  if (assetAPoolAddress !== assetBPoolAddress) return false;
  return true;
};
var isInSameMarketplaceCollection = function isInSameMarketplaceCollection(assetA, assetB) {
  return assetA.address === assetB.address && assetA.marketplace === assetB.marketplace;
};

export { isInSameMarketplaceCollection, isInSameSudoSwapPool };
