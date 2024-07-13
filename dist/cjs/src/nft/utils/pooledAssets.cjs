'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var bignumber = require('@ethersproject/bignumber');
var index$1 = require('../types/checkout/index.cjs');
var index = require('../types/common/index.cjs');
require('react');
require('../components/icons.cjs');
require('uuid');
var collection = require('./collection.cjs');
require('@ethersproject/units');
require('video-extensions');
require('../../locales/en-US.cjs');
require('numbro');
require('./time.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

var PRECISION = "1000000000000000000";
var PROTOCOL_FEE_MULTIPLIER = bignumber.BigNumber.from("5000000000000000");
var BondingCurve = /*#__PURE__*/function (BondingCurve) {
  BondingCurve["Linear"] = "LINEAR";
  BondingCurve["Exponential"] = "EXPONENTIAL";
  BondingCurve["Xyk"] = "XYK";
  return BondingCurve;
}(BondingCurve || {});
var getPoolParameters = function getPoolParameters(protocolParameters) {
  var _poolMetadata, _poolMetadata2;
  return {
    delta: protocolParameters !== null && protocolParameters !== void 0 && protocolParameters.delta ? protocolParameters.delta : undefined,
    fee: protocolParameters !== null && protocolParameters !== void 0 && protocolParameters.ammFeeFixed ? protocolParameters.ammFeeFixed : undefined,
    spotPrice: protocolParameters === null || protocolParameters === void 0 || (_poolMetadata = protocolParameters.poolMetadata) === null || _poolMetadata === void 0 ? void 0 : _poolMetadata.spotPrice,
    bondingCurve: protocolParameters === null || protocolParameters === void 0 || (_poolMetadata2 = protocolParameters.poolMetadata) === null || _poolMetadata2 === void 0 ? void 0 : _poolMetadata2.bondingCurve
  };
};
var calculateScaledPrice = function calculateScaledPrice(currentPrice, poolFee) {
  var protocolFee = currentPrice.mul(PROTOCOL_FEE_MULTIPLIER).div(bignumber.BigNumber.from(PRECISION));
  var tradeFee = currentPrice.mul(poolFee).div(bignumber.BigNumber.from(PRECISION));
  return currentPrice.add(protocolFee).add(tradeFee);
};
var calcSudoSwapLinearBondingCurve = function calcSudoSwapLinearBondingCurve(currentPrice, delta) {
  var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  for (var i = 0; i <= position; i++) {
    currentPrice = currentPrice.add(delta);
  }
  return currentPrice;
};
var calcSudoSwapExponentialBondingCurve = function calcSudoSwapExponentialBondingCurve(currentPrice, delta) {
  var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  for (var i = 0; i <= position; i++) {
    currentPrice = currentPrice.mul(delta).div(bignumber.BigNumber.from(PRECISION));
  }
  return currentPrice;
};
var calcSudoSwapXykBondingCurve = function calcSudoSwapXykBondingCurve(currentPrice, sudoSwapPool) {
  var position = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var virtualTokenBalance = bignumber.BigNumber.from(sudoSwapPool.spotPrice);
  var virtualNFTBalance = bignumber.BigNumber.from(sudoSwapPool.delta);
  if (virtualNFTBalance.sub(bignumber.BigNumber.from(1)).gt(bignumber.BigNumber.from(0))) {
    currentPrice = virtualTokenBalance.div(virtualNFTBalance.sub(bignumber.BigNumber.from(1)));
  } else {
    return undefined;
  }
  for (var i = 1; i <= position; i++) {
    virtualTokenBalance = virtualTokenBalance.add(currentPrice);
    virtualNFTBalance = virtualNFTBalance.sub(bignumber.BigNumber.from(1));
    if (!virtualNFTBalance.sub(bignumber.BigNumber.from(1)).isZero()) {
      currentPrice = virtualTokenBalance.div(virtualNFTBalance.sub(bignumber.BigNumber.from(1)));
    } else {
      return undefined;
    }
  }
  return currentPrice;
};
var calcSudoSwapPrice = function calcSudoSwapPrice(asset) {
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!asset.sellorders) return undefined;
  var sudoSwapParameters = asset.sellorders[0].protocolParameters;
  var sudoSwapPool = getPoolParameters(sudoSwapParameters);
  if (!sudoSwapPool.fee || !sudoSwapPool.delta || !sudoSwapPool.spotPrice || !sudoSwapPool.bondingCurve) return undefined;
  var currentPrice = bignumber.BigNumber.from(sudoSwapPool.spotPrice);
  var delta = bignumber.BigNumber.from(sudoSwapPool.delta);
  var poolFee = bignumber.BigNumber.from(sudoSwapPool.fee);
  if (sudoSwapPool.bondingCurve === BondingCurve.Linear) {
    currentPrice = calcSudoSwapLinearBondingCurve(currentPrice, delta, position);
  } else if (sudoSwapPool.bondingCurve === BondingCurve.Exponential) {
    currentPrice = calcSudoSwapExponentialBondingCurve(currentPrice, delta, position);
  } else if (sudoSwapPool.bondingCurve === BondingCurve.Xyk) {
    var xykCurrentPrice = calcSudoSwapXykBondingCurve(currentPrice, sudoSwapPool, position);
    if (xykCurrentPrice) {
      currentPrice = xykCurrentPrice;
    } else {
      return undefined;
    }
  } else {
    return undefined;
  }
  return calculateScaledPrice(currentPrice, poolFee).toString();
};
var calcAmmBasedPoolprice = function calcAmmBasedPoolprice(asset) {
  var _poolMetadata$ethRese, _poolMetadata3, _poolMetadata$tokenRe, _poolMetadata4;
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!asset.sellorders) return "";
  var amountToBuy = bignumber.BigNumber.from(0);
  var marginalBuy = bignumber.BigNumber.from(0);
  var nft = asset.sellorders[0].protocolParameters;
  var decimals = bignumber.BigNumber.from(1).mul(10).pow(18);
  var ammFee = nft !== null && nft !== void 0 && nft.ammFeePercent ? (100 + nft.ammFeePercent) * 100 : 110 * 100;
  if (asset.marketplace === index.Markets.NFTX) {
    var sixteenmul = bignumber.BigNumber.from(1).mul(10).pow(16);
    amountToBuy = bignumber.BigNumber.from(ammFee).div(100).mul(position + 1);
    amountToBuy = amountToBuy.mul(sixteenmul);
    marginalBuy = bignumber.BigNumber.from(ammFee).div(100).mul(position);
    marginalBuy = marginalBuy.mul(sixteenmul);
  }
  if (asset.marketplace === index.Markets.NFT20) {
    amountToBuy = bignumber.BigNumber.from(100).mul(position + 1);
    amountToBuy = amountToBuy.mul(decimals);
    marginalBuy = bignumber.BigNumber.from(100).mul(position);
    marginalBuy = marginalBuy.mul(decimals);
  }
  var ethReserves = bignumber.BigNumber.from((_poolMetadata$ethRese = nft === null || nft === void 0 || (_poolMetadata3 = nft.poolMetadata) === null || _poolMetadata3 === void 0 || (_poolMetadata3 = _poolMetadata3.ethReserves) === null || _poolMetadata3 === void 0 ? void 0 : _poolMetadata3.toLocaleString("fullwide", {
    useGrouping: false
  })) !== null && _poolMetadata$ethRese !== void 0 ? _poolMetadata$ethRese : 1);
  var tokenReserves = bignumber.BigNumber.from((_poolMetadata$tokenRe = nft === null || nft === void 0 || (_poolMetadata4 = nft.poolMetadata) === null || _poolMetadata4 === void 0 || (_poolMetadata4 = _poolMetadata4.tokenReserves) === null || _poolMetadata4 === void 0 ? void 0 : _poolMetadata4.toLocaleString("fullwide", {
    useGrouping: false
  })) !== null && _poolMetadata$tokenRe !== void 0 ? _poolMetadata$tokenRe : 1);
  var numerator = ethReserves.mul(amountToBuy).mul(1000);
  var denominator = tokenReserves.sub(amountToBuy).mul(997);
  var marginalnumerator = ethReserves.mul(marginalBuy).mul(1000);
  var marginaldenominator = tokenReserves.sub(marginalBuy).mul(997);
  var price = numerator.div(denominator);
  var marginalprice = marginalnumerator.div(marginaldenominator);
  price = price.sub(marginalprice);
  price = price.mul(101).div(100);
  return price.toString();
};
var calcPoolPrice = function calcPoolPrice(asset) {
  var _calcSudoSwapPrice;
  var position = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  if (!asset.sellorders) return "";
  if (asset.marketplace === index.Markets.Sudoswap) return (_calcSudoSwapPrice = calcSudoSwapPrice(asset, position)) !== null && _calcSudoSwapPrice !== void 0 ? _calcSudoSwapPrice : "0";
  return calcAmmBasedPoolprice(asset, position);
};
var calcAvgGroupPoolPrice = function calcAvgGroupPoolPrice(asset, numberOfAssets) {
  var total = bignumber.BigNumber.from(0);
  for (var i = 0; i < numberOfAssets; i++) {
    if (asset.marketplace === index.Markets.Sudoswap) {
      var _calcSudoSwapPrice2;
      total = total.add(bignumber.BigNumber.from((_calcSudoSwapPrice2 = calcSudoSwapPrice(asset, i)) !== null && _calcSudoSwapPrice2 !== void 0 ? _calcSudoSwapPrice2 : "0"));
    } else {
      total = total.add(bignumber.BigNumber.from(calcPoolPrice(asset, i)));
    }
  }
  return total.div(numberOfAssets).toString();
};
var recalculatePooledAssetPrice = function recalculatePooledAssetPrice(asset, position) {
  var _calcSudoSwapPrice3;
  return asset.marketplace === index.Markets.Sudoswap ? (_calcSudoSwapPrice3 = calcSudoSwapPrice(asset, position)) !== null && _calcSudoSwapPrice3 !== void 0 ? _calcSudoSwapPrice3 : "" : calcPoolPrice(asset, position);
};
var recalculateBagUsingPooledAssets = function recalculateBagUsingPooledAssets(uncheckedItemsInBag) {
  if (!uncheckedItemsInBag.some(function (item) {
    return item.asset.marketplace && index.isPooledMarket(item.asset.marketplace);
  }) || uncheckedItemsInBag.every(function (item) {
    return item.status === index$1.BagItemStatus.REVIEWED || item.status === index$1.BagItemStatus.REVIEWING_PRICE_CHANGE;
  })) return uncheckedItemsInBag;
  var itemsInBag = _toConsumableArray__default["default"](uncheckedItemsInBag);
  itemsInBag.forEach(function (item) {
    if (item.asset.marketplace) if (index.isPooledMarket(item.asset.marketplace)) {
      var asset = item.asset;
      var isPriceChangedAsset = !!asset.updatedPriceInfo;
      var itemsInPool = asset.marketplace === index.Markets.Sudoswap ? itemsInBag.filter(function (bagItem) {
        return collection.isInSameSudoSwapPool(item.asset, bagItem.asset);
      }) : itemsInBag.filter(function (bagItem) {
        return collection.isInSameMarketplaceCollection(item.asset, bagItem.asset);
      });
      var calculatedPrice = isPriceChangedAsset ? calcAvgGroupPoolPrice(asset, itemsInPool.length) : recalculatePooledAssetPrice(asset, itemsInPool.findIndex(function (itemInPool) {
        return itemInPool.asset.tokenId === asset.tokenId;
      }));
      if (isPriceChangedAsset && item.asset.updatedPriceInfo) item.asset.updatedPriceInfo.ETHPrice = item.asset.updatedPriceInfo.basePrice = calculatedPrice;else item.asset.priceInfo.ETHPrice = calculatedPrice;
    }
  });
  return itemsInBag;
};

exports.calcAvgGroupPoolPrice = calcAvgGroupPoolPrice;
exports.calcPoolPrice = calcPoolPrice;
exports.recalculateBagUsingPooledAssets = recalculateBagUsingPooledAssets;
