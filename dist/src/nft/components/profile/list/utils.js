import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { addressesByNetwork, SupportedChainId } from '@looksrare/sdk';
import { NftStandard } from '../../../../graphql/data/__generated__/types-and-hooks.js';
import ms from 'ms';
import { SetPriceMethod, WarningType } from './shared.js';
import '../../../hooks/useBag.js';
import '../../../hooks/useCollectionFilters.js';
import '../../../hooks/useFiltersExpanded.js';
import '../../../hooks/useIsCollectionLoading.js';
import '../../../../hooks/useScreenSize.js';
import { useNFTList } from '../../../hooks/useNFTList.js';
import '../../../hooks/useProfilePageState.js';
import { useSellAsset } from '../../../hooks/useSellAsset.js';
import '../../../hooks/useSendTransaction.js';
import { useEffect } from 'react';
import '../../../hooks/useTransactionResponse.js';
import '@ethersproject/units';
import '@uniswap/sdk-core';
import '../../../../hooks/useUSDPrice.js';
import '../../../../constants/tokens.js';
import 'jsbi';
import '@web3-react/core';
import '../../../../lib/hooks/useCurrencyBalance.js';
import '../../../hooks/useWalletCollections.js';
import { LOOKSRARE_MARKETPLACE_CONTRACT_721, LOOKSRARE_MARKETPLACE_CONTRACT_1155 } from '../../../queries/looksRare/constants.js';
import { OPENSEA_CROSS_CHAIN_CONDUIT } from '../../../queries/openSea/constants.js';
import { X2Y2_TRANSFER_CONTRACT_721, X2Y2_TRANSFER_CONTRACT_1155 } from '../../../queries/x2y2/index.js';
import { ListingStatus } from '../../../types/sell/index.js';
import { LOOKS_RARE_CREATOR_BASIS_POINTS, approveCollection, signListing } from '../../../utils/listNfts.js';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function approveCollectionRow(_x, _x2, _x3) {
  return _approveCollectionRow.apply(this, arguments);
}
function _approveCollectionRow() {
  _approveCollectionRow = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(collectionRow, signer, setCollectionStatusAndCallback) {
    var callback, marketplace, collectionAddress, nftStandard, addresses, spender;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          callback = function callback() {
            return approveCollectionRow(collectionRow, signer, setCollectionStatusAndCallback);
          };
          setCollectionStatusAndCallback(collectionRow, ListingStatus.SIGNING, callback);
          marketplace = collectionRow.marketplace, collectionAddress = collectionRow.collectionAddress, nftStandard = collectionRow.nftStandard;
          addresses = addressesByNetwork[SupportedChainId.MAINNET];
          spender = marketplace.name === "OpenSea" ? OPENSEA_CROSS_CHAIN_CONDUIT : marketplace.name === "LooksRare" ? collectionRow.nftStandard === NftStandard.Erc721 ? LOOKSRARE_MARKETPLACE_CONTRACT_721 : LOOKSRARE_MARKETPLACE_CONTRACT_1155 : marketplace.name === "X2Y2" ? collectionRow.nftStandard === NftStandard.Erc721 ? X2Y2_TRANSFER_CONTRACT_721 : X2Y2_TRANSFER_CONTRACT_1155 : addresses.TRANSFER_MANAGER_ERC721;
          _context.t0 = !!collectionAddress;
          if (!_context.t0) {
            _context.next = 9;
            break;
          }
          _context.next = 9;
          return approveCollection(spender, collectionAddress, signer, function (newStatus) {
            return setCollectionStatusAndCallback(collectionRow, newStatus, callback);
          }, nftStandard);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return _approveCollectionRow.apply(this, arguments);
}
function signListingRow(_x4, _x5, _x6, _x7, _x8, _x9) {
  return _signListingRow.apply(this, arguments);
}
function _signListingRow() {
  _signListingRow = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(listing, signer, provider, getLooksRareNonce, setLooksRareNonce, setListingStatusAndCallback) {
    var looksRareNonce, callback, asset, marketplace, res;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          looksRareNonce = getLooksRareNonce();
          callback = function callback() {
            return signListingRow(listing, signer, provider, getLooksRareNonce, setLooksRareNonce, setListingStatusAndCallback);
          };
          setListingStatusAndCallback(listing, ListingStatus.SIGNING, callback);
          asset = listing.asset, marketplace = listing.marketplace;
          _context2.next = 6;
          return signListing(marketplace, asset, signer, provider, looksRareNonce, function (newStatus) {
            return setListingStatusAndCallback(listing, newStatus, callback);
          });
        case 6:
          res = _context2.sent;
          res && listing.marketplace.name === "LooksRare" && setLooksRareNonce(looksRareNonce + 1);
        case 8:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _signListingRow.apply(this, arguments);
}
var getTotalEthValue = function getTotalEthValue(sellAssets) {
  var total = sellAssets.reduce(function (total, asset) {
    var _asset$newListings;
    if ((_asset$newListings = asset.newListings) !== null && _asset$newListings !== void 0 && _asset$newListings.length) {
      var _asset$basisPoints, _maxListing$price, _maxListing$price2;
      var maxListing = asset.newListings.reduce(function (a, b) {
        var _a$price, _b$price;
        return ((_a$price = a.price) !== null && _a$price !== void 0 ? _a$price : 0) > ((_b$price = b.price) !== null && _b$price !== void 0 ? _b$price : 0) ? a : b;
      });
      // LooksRare is a unique case where creator royalties are a flat 0.5% or 50 basis points
      var maxFee = maxListing.marketplace.fee + (maxListing.marketplace.name === "LooksRare" ? LOOKS_RARE_CREATOR_BASIS_POINTS : (_asset$basisPoints = asset === null || asset === void 0 ? void 0 : asset.basisPoints) !== null && _asset$basisPoints !== void 0 ? _asset$basisPoints : 0) / 100;
      return total + ((_maxListing$price = maxListing.price) !== null && _maxListing$price !== void 0 ? _maxListing$price : 0) - ((_maxListing$price2 = maxListing.price) !== null && _maxListing$price2 !== void 0 ? _maxListing$price2 : 0) * (maxFee / 100);
    }
    return total;
  }, 0);
  return total ? Math.round(total * 10000 + Number.EPSILON) / 10000 : 0;
};
var getListings = function getListings(sellAssets) {
  var newCollectionsToApprove = [];
  var newListings = [];
  sellAssets.forEach(function (asset) {
    var _asset$marketplaces;
    (_asset$marketplaces = asset.marketplaces) === null || _asset$marketplaces === void 0 || _asset$marketplaces.forEach(function (marketplace) {
      var _asset$newListings2;
      var newListing = {
        image: asset.smallImageUrl,
        name: asset.name || "#".concat(asset.tokenId),
        status: ListingStatus.DEFINED,
        asset: asset,
        marketplace: marketplace,
        price: (_asset$newListings2 = asset.newListings) === null || _asset$newListings2 === void 0 || (_asset$newListings2 = _asset$newListings2.find(function (listing) {
          return listing.marketplace.name === marketplace.name;
        })) === null || _asset$newListings2 === void 0 ? void 0 : _asset$newListings2.price
      };
      newListings.push(newListing);
      if (!newCollectionsToApprove.some(function (collectionRow) {
        return collectionRow.collectionAddress === asset.asset_contract.address && collectionRow.marketplace.name === marketplace.name;
      })) {
        var newCollectionRow = {
          image: asset.asset_contract.image_url,
          name: asset.asset_contract.name,
          status: ListingStatus.DEFINED,
          collectionAddress: asset.asset_contract.address,
          isVerified: asset.collectionIsVerified,
          marketplace: marketplace,
          nftStandard: asset.asset_contract.tokenType
        };
        newCollectionsToApprove.push(newCollectionRow);
      }
    });
  });
  return [newCollectionsToApprove, newListings];
};
var verifyStatus = function verifyStatus(status) {
  return status !== ListingStatus.PAUSED && status !== ListingStatus.APPROVED;
};
function useSubscribeListingState() {
  var sellAssets = useSellAsset(function (state) {
    return state.sellAssets;
  });
  var _useNFTList = useNFTList(function (_ref) {
      var setListings = _ref.setListings,
        setCollectionsRequiringApproval = _ref.setCollectionsRequiringApproval;
      return {
        setListings: setListings,
        setCollectionsRequiringApproval: setCollectionsRequiringApproval
      };
    }),
    setListings = _useNFTList.setListings,
    setCollectionsRequiringApproval = _useNFTList.setCollectionsRequiringApproval;
  useEffect(function () {
    var _getListings = getListings(sellAssets),
      _getListings2 = _slicedToArray(_getListings, 2),
      newCollectionsToApprove = _getListings2[0],
      newListings = _getListings2[1];
    setListings(newListings);
    setCollectionsRequiringApproval(newCollectionsToApprove);
  }, [sellAssets, setCollectionsRequiringApproval, setListings]);
}
function useHandleGlobalPriceToggle(globalOverride, setListPrice, setPrice, listPrice, globalPrice) {
  useEffect(function () {
    var price;
    if (globalOverride) {
      if (!listPrice) setListPrice(globalPrice);
      price = globalPrice;
    } else {
      price = listPrice;
    }
    setPrice(price);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalOverride]);
}
function useSyncPriceWithGlobalMethod(asset, setListPrice, setGlobalPrice, setGlobalOverride, listPrice, globalPrice, globalPriceMethod) {
  useEffect(function () {
    if (globalPriceMethod === SetPriceMethod.FLOOR_PRICE) {
      setListPrice(asset === null || asset === void 0 ? void 0 : asset.floorPrice);
      setGlobalPrice(asset.floorPrice);
    } else if (globalPriceMethod === SetPriceMethod.LAST_PRICE) {
      setListPrice(asset.lastPrice);
      setGlobalPrice(asset.lastPrice);
    } else if (globalPriceMethod === SetPriceMethod.SAME_PRICE) listPrice && !globalPrice ? setGlobalPrice(listPrice) : setListPrice(globalPrice);
    setGlobalOverride(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalPriceMethod]);
}
function useUpdateInputAndWarnings(setWarningType, inputRef, asset, listPrice) {
  useEffect(function () {
    var _asset$floorPrice;
    setWarningType(WarningType.NONE);
    var price = listPrice !== null && listPrice !== void 0 ? listPrice : 0;
    inputRef.current.value = "".concat(price);
    if (price < ((_asset$floorPrice = asset === null || asset === void 0 ? void 0 : asset.floorPrice) !== null && _asset$floorPrice !== void 0 ? _asset$floorPrice : 0) && price > 0) setWarningType(WarningType.BELOW_FLOOR);else if (asset.floor_sell_order_price && price >= asset.floor_sell_order_price && asset.asset_contract.tokenType !== NftStandard.Erc1155) setWarningType(WarningType.ALREADY_LISTED);
  }, [asset.asset_contract.tokenType, asset === null || asset === void 0 ? void 0 : asset.floorPrice, asset.floor_sell_order_price, inputRef, listPrice, setWarningType]);
}
var getRoyalty = function getRoyalty(listingMarket, asset) {
  var _asset$basisPoints2;
  // LooksRare is a unique case where royalties for creators are a flat 0.5% or 50 basis points if royalty is set
  var baseFee = listingMarket.name === "LooksRare" ? asset.basisPoints ? LOOKS_RARE_CREATOR_BASIS_POINTS : 0 : (_asset$basisPoints2 = asset.basisPoints) !== null && _asset$basisPoints2 !== void 0 ? _asset$basisPoints2 : 0;
  return baseFee * 0.01;
};
var BELOW_FLOOR_PRICE_THRESHOLD = 0.8;
var findListingIssues = function findListingIssues(sellAssets) {
  var missingExpiration = sellAssets.some(function (asset) {
    return asset.expirationTime != null && (isNaN(asset.expirationTime) || asset.expirationTime * 1000 - Date.now() < ms("60s"));
  });
  var overMaxExpiration = sellAssets.some(function (asset) {
    return asset.expirationTime != null && asset.expirationTime * 1000 - Date.now() > ms("180d");
  });
  var listingsMissingPrice = [];
  var listingsBelowFloor = [];
  var listingsAboveSellOrderFloor = [];
  var _iterator = _createForOfIteratorHelper(sellAssets),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var asset = _step.value;
      if (asset.newListings) {
        var _iterator2 = _createForOfIteratorHelper(asset.newListings),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _asset$floorPrice2;
            var listing = _step2.value;
            if (!listing.price) listingsMissingPrice.push([asset, listing]);else if (listing.price < ((_asset$floorPrice2 = asset === null || asset === void 0 ? void 0 : asset.floorPrice) !== null && _asset$floorPrice2 !== void 0 ? _asset$floorPrice2 : 0) * BELOW_FLOOR_PRICE_THRESHOLD && !listing.overrideFloorPrice) listingsBelowFloor.push([asset, listing]);else if (asset.floor_sell_order_price && listing.price >= asset.floor_sell_order_price && asset.asset_contract.tokenType !== NftStandard.Erc1155) listingsAboveSellOrderFloor.push([asset, listing]);
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return {
    missingExpiration: missingExpiration,
    overMaxExpiration: overMaxExpiration,
    listingsMissingPrice: listingsMissingPrice,
    listingsBelowFloor: listingsBelowFloor,
    listingsAboveSellOrderFloor: listingsAboveSellOrderFloor
  };
};

export { approveCollectionRow, findListingIssues, getRoyalty, getTotalEthValue, signListingRow, useHandleGlobalPriceToggle, useSubscribeListingState, useSyncPriceWithGlobalMethod, useUpdateInputAndWarnings, verifyStatus };
