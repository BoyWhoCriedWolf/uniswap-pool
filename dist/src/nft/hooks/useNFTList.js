import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { ListingStatus } from '../types/sell/index.js';
import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var useNFTList = createWithEqualityFn()(devtools(function (set, get) {
  return {
    looksRareNonce: 0,
    listings: [],
    collectionsRequiringApproval: [],
    setLooksRareNonce: function setLooksRareNonce(nonce) {
      return set(function () {
        return {
          looksRareNonce: nonce
        };
      });
    },
    getLooksRareNonce: function getLooksRareNonce() {
      return get().looksRareNonce;
    },
    setListings: function setListings(listings) {
      return set(function () {
        var updatedListings = listings.map(function (listing) {
          var oldListing = get().listings.find(function (oldListing) {
            return oldListing.asset.asset_contract.address === listing.asset.asset_contract.address && oldListing.asset.tokenId === listing.asset.tokenId && oldListing.marketplace.name === listing.marketplace.name && oldListing.price === listing.price;
          });
          var oldStatus = oldListing === null || oldListing === void 0 ? void 0 : oldListing.status;
          var oldCallback = oldListing === null || oldListing === void 0 ? void 0 : oldListing.callback;
          var status = function status() {
            switch (oldStatus) {
              case ListingStatus.APPROVED:
                return ListingStatus.APPROVED;
              case ListingStatus.FAILED:
                return listing.status === ListingStatus.SIGNING ? ListingStatus.SIGNING : ListingStatus.FAILED;
              case ListingStatus.REJECTED:
                return listing.status === ListingStatus.SIGNING ? ListingStatus.SIGNING : ListingStatus.REJECTED;
              default:
                return listing.status;
            }
          };
          return _objectSpread(_objectSpread({}, listing), {}, {
            status: status(),
            callback: oldCallback !== null && oldCallback !== void 0 ? oldCallback : listing.callback
          });
        });
        return {
          listings: updatedListings
        };
      });
    },
    setCollectionsRequiringApproval: function setCollectionsRequiringApproval(collections) {
      return set(function () {
        var updatedCollections = collections.map(function (collection) {
          var oldCollection = get().collectionsRequiringApproval.find(function (oldCollection) {
            return oldCollection.collectionAddress === collection.collectionAddress && oldCollection.marketplace.name === collection.marketplace.name;
          });
          var oldStatus = oldCollection === null || oldCollection === void 0 ? void 0 : oldCollection.status;
          var oldCallback = oldCollection === null || oldCollection === void 0 ? void 0 : oldCollection.callback;
          var status = function status() {
            switch (oldStatus) {
              case ListingStatus.APPROVED:
                return ListingStatus.APPROVED;
              case ListingStatus.FAILED:
                return collection.status === ListingStatus.SIGNING ? ListingStatus.SIGNING : ListingStatus.FAILED;
              case ListingStatus.REJECTED:
                return collection.status === ListingStatus.SIGNING ? ListingStatus.SIGNING : ListingStatus.REJECTED;
              default:
                return collection.status;
            }
          };
          return _objectSpread(_objectSpread({}, collection), {}, {
            status: status(),
            callback: oldCallback !== null && oldCallback !== void 0 ? oldCallback : collection.callback
          });
        });
        return {
          collectionsRequiringApproval: updatedCollections
        };
      });
    },
    setListingStatusAndCallback: function setListingStatusAndCallback(listing, status, callback) {
      return set(function (_ref) {
        var listings = _ref.listings;
        var listingsCopy = _toConsumableArray(listings);
        var oldListingIndex = listingsCopy.findIndex(function (oldListing) {
          return oldListing.name === listing.name && oldListing.price === listing.price && oldListing.marketplace.name === listing.marketplace.name;
        });
        if (oldListingIndex > -1) {
          var updatedListing = _objectSpread(_objectSpread({}, listings[oldListingIndex]), {}, {
            status: status,
            callback: callback !== null && callback !== void 0 ? callback : listings[oldListingIndex].callback
          });
          listingsCopy.splice(oldListingIndex, 1, updatedListing);
        }
        return {
          listings: listingsCopy
        };
      });
    },
    setCollectionStatusAndCallback: function setCollectionStatusAndCallback(collection, status, callback) {
      return set(function (_ref2) {
        var collectionsRequiringApproval = _ref2.collectionsRequiringApproval;
        var collectionsCopy = _toConsumableArray(collectionsRequiringApproval);
        var oldCollectionIndex = collectionsCopy.findIndex(function (oldCollection) {
          return oldCollection.name === collection.name && oldCollection.marketplace.name === collection.marketplace.name;
        });
        if (oldCollectionIndex > -1) {
          var updatedCollection = _objectSpread(_objectSpread({}, collectionsCopy[oldCollectionIndex]), {}, {
            status: status,
            callback: callback !== null && callback !== void 0 ? callback : collectionsCopy[oldCollectionIndex].callback
          });
          collectionsCopy.splice(oldCollectionIndex, 1, updatedCollection);
        }
        return {
          collectionsRequiringApproval: collectionsCopy
        };
      });
    }
  };
}), shallow);

export { useNFTList };
