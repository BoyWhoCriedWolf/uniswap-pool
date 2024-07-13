'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var zustand = require('zustand');
var middleware = require('zustand/middleware');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var useSellAsset = zustand.create()(middleware.devtools(function (set) {
  return {
    sellAssets: [],
    issues: 0,
    showResolveIssues: false,
    selectSellAsset: function selectSellAsset(asset) {
      return set(function (_ref) {
        var sellAssets = _ref.sellAssets;
        if (sellAssets.length === 0) return {
          sellAssets: [asset]
        };else return {
          sellAssets: [].concat(_toConsumableArray__default["default"](sellAssets), [asset])
        };
      });
    },
    removeSellAsset: function removeSellAsset(asset) {
      set(function (_ref2) {
        var sellAssets = _ref2.sellAssets;
        if (sellAssets.length === 0) return {
          sellAssets: []
        };else sellAssets.find(function (x) {
          return asset.tokenId === x.tokenId && x.asset_contract.address === asset.asset_contract.address;
        });
        var assetsCopy = _toConsumableArray__default["default"](sellAssets);
        assetsCopy.splice(sellAssets.findIndex(function (n) {
          return n.tokenId === asset.tokenId && n.asset_contract.address === asset.asset_contract.address;
        }), 1);
        return {
          sellAssets: assetsCopy
        };
      });
    },
    reset: function reset() {
      return set(function () {
        return {
          sellAssets: []
        };
      });
    },
    setGlobalExpiration: function setGlobalExpiration(expirationTime) {
      set(function (_ref3) {
        var sellAssets = _ref3.sellAssets;
        var assetsCopy = _toConsumableArray__default["default"](sellAssets);
        assetsCopy.map(function (asset) {
          asset.expirationTime = expirationTime;
          return asset;
        });
        return {
          sellAssets: assetsCopy
        };
      });
    },
    setAssetListPrice: function setAssetListPrice(asset, price, marketplace) {
      set(function (_ref4) {
        var sellAssets = _ref4.sellAssets;
        var assetsCopy = _toConsumableArray__default["default"](sellAssets);
        if (marketplace) {
          var _asset$newListings, _asset$newListings2;
          var listingIndex = (_asset$newListings = asset.newListings) === null || _asset$newListings === void 0 ? void 0 : _asset$newListings.findIndex(function (listing) {
            return listing.marketplace.name === marketplace.name;
          });
          if (asset.newListings && listingIndex != null && listingIndex > -1) {
            asset.newListings[listingIndex] = {
              price: price,
              marketplace: marketplace,
              overrideFloorPrice: false
            };
            if (listingIndex === 0) asset.marketAgnosticPrice = price;
          } else (_asset$newListings2 = asset.newListings) === null || _asset$newListings2 === void 0 || _asset$newListings2.push({
            price: price,
            marketplace: marketplace,
            overrideFloorPrice: false
          });
        } else asset.marketAgnosticPrice = price;
        var index = sellAssets.findIndex(function (n) {
          return n.tokenId === asset.tokenId && n.asset_contract.address === asset.asset_contract.address;
        });
        assetsCopy[index] = asset;
        return {
          sellAssets: assetsCopy
        };
      });
    },
    setGlobalMarketplaces: function setGlobalMarketplaces(marketplaces) {
      set(function (_ref5) {
        var sellAssets = _ref5.sellAssets;
        var assetsCopy = _toConsumableArray__default["default"](sellAssets);
        assetsCopy.map(function (asset) {
          asset.marketplaces = marketplaces;
          asset.newListings = [];
          var _iterator = _createForOfIteratorHelper(marketplaces),
            _step;
          try {
            var _loop = function _loop() {
              var marketplace = _step.value;
              var listingIndex = asset.newListings.findIndex(function (listing) {
                return listing.marketplace.name === marketplace.name;
              });
              var newListing = {
                price: asset.marketAgnosticPrice,
                marketplace: marketplace,
                overrideFloorPrice: false
              };
              listingIndex > -1 ? asset.newListings[listingIndex] = newListing : asset.newListings.push(newListing);
            };
            for (_iterator.s(); !(_step = _iterator.n()).done;) {
              _loop();
            }
          } catch (err) {
            _iterator.e(err);
          } finally {
            _iterator.f();
          }
          return asset;
        });
        return {
          sellAssets: assetsCopy
        };
      });
    },
    removeAssetMarketplace: function removeAssetMarketplace(asset, marketplace) {
      set(function (_ref6) {
        var _asset$marketplaces$f, _asset$marketplaces, _asset$newListings3;
        var sellAssets = _ref6.sellAssets;
        var assetsCopy = _toConsumableArray__default["default"](sellAssets);
        var assetIndex = sellAssets.indexOf(asset);
        var marketplaceIndex = (_asset$marketplaces$f = (_asset$marketplaces = asset.marketplaces) === null || _asset$marketplaces === void 0 ? void 0 : _asset$marketplaces.findIndex(function (oldMarket) {
          return oldMarket.name === marketplace.name;
        })) !== null && _asset$marketplaces$f !== void 0 ? _asset$marketplaces$f : -1;
        var listingIndex = (_asset$newListings3 = asset.newListings) === null || _asset$newListings3 === void 0 ? void 0 : _asset$newListings3.findIndex(function (listing) {
          return listing.marketplace.name === marketplace.name;
        });
        var assetCopy = JSON.parse(JSON.stringify(asset));
        if (marketplaceIndex > -1) {
          assetCopy.marketplaces.splice(marketplaceIndex, 1);
          assetCopy.newListings.splice(listingIndex, 1);
        }
        assetsCopy.splice(assetIndex, 1, assetCopy);
        return {
          sellAssets: assetsCopy
        };
      });
    },
    toggleShowResolveIssues: function toggleShowResolveIssues() {
      set(function (_ref7) {
        var showResolveIssues = _ref7.showResolveIssues;
        return {
          showResolveIssues: !showResolveIssues
        };
      });
    },
    setIssues: function setIssues(issues) {
      return set(function () {
        return {
          issues: issues
        };
      });
    }
  };
}, {
  name: "useSelectAsset"
}));

exports.useSellAsset = useSellAsset;
