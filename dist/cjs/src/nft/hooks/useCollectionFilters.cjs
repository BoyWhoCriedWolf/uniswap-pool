'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var zustand = require('zustand');
var middleware = require('zustand/middleware');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var SortBy = /*#__PURE__*/function (SortBy) {
  SortBy[SortBy["LowToHigh"] = 0] = "LowToHigh";
  SortBy[SortBy["HighToLow"] = 1] = "HighToLow";
  SortBy[SortBy["RareToCommon"] = 2] = "RareToCommon";
  SortBy[SortBy["CommonToRare"] = 3] = "CommonToRare";
  return SortBy;
}({});
_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, SortBy.HighToLow, "highest"), SortBy.LowToHigh, "lowest"), SortBy.RareToCommon, "rare"), SortBy.CommonToRare, "common");
_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, SortBy.HighToLow, {
  field: "PRICE",
  asc: false
}), SortBy.LowToHigh, {
  field: "PRICE",
  asc: true
}), SortBy.RareToCommon, {
  field: "RARITY",
  asc: true
}), SortBy.CommonToRare, {
  field: "RARITY",
  asc: false
});
var initialCollectionFilterState = {
  minPrice: "",
  maxPrice: "",
  minRarity: "",
  maxRarity: "",
  traits: [],
  hasRarity: false,
  markets: [],
  marketCount: {},
  buyNow: false,
  search: "",
  sortBy: SortBy.LowToHigh,
  showFullTraitName: {
    shouldShow: false,
    trait_value: "",
    trait_type: ""
  }
};
zustand.create()(middleware.devtools(function (set) {
  return _objectSpread(_objectSpread({}, initialCollectionFilterState), {}, {
    setHasRarity: function setHasRarity(hasRarity) {
      return set({
        hasRarity: hasRarity
      });
    },
    setSortBy: function setSortBy(sortBy) {
      return set({
        sortBy: sortBy
      });
    },
    setSearch: function setSearch(search) {
      return set({
        search: search
      });
    },
    setBuyNow: function setBuyNow(buyNow) {
      return set({
        buyNow: buyNow
      });
    },
    setMarketCount: function setMarketCount(marketCount) {
      return set({
        marketCount: marketCount
      });
    },
    addMarket: function addMarket(market) {
      return set(function (_ref) {
        var markets = _ref.markets;
        return {
          markets: [].concat(_toConsumableArray__default["default"](markets), [market])
        };
      });
    },
    removeMarket: function removeMarket(market) {
      return set(function (_ref2) {
        var markets = _ref2.markets;
        return {
          markets: markets.filter(function (_market) {
            return market !== _market;
          })
        };
      });
    },
    addTrait: function addTrait(trait) {
      return set(function (_ref3) {
        var traits = _ref3.traits;
        return {
          traits: [].concat(_toConsumableArray__default["default"](traits), [trait])
        };
      });
    },
    removeTrait: function removeTrait(trait) {
      return set(function (_ref4) {
        var traits = _ref4.traits;
        return {
          traits: traits.filter(function (x) {
            return JSON.stringify(x) !== JSON.stringify(trait);
          })
        };
      });
    },
    reset: function reset() {
      return set(function () {
        return {
          traits: [],
          minRarity: "",
          maxRarity: "",
          markets: [],
          minPrice: "",
          maxPrice: ""
        };
      });
    },
    setMinPrice: function setMinPrice(price) {
      return set(function () {
        return {
          minPrice: price
        };
      });
    },
    setMaxPrice: function setMaxPrice(price) {
      return set(function () {
        return {
          maxPrice: price
        };
      });
    },
    setMinRarity: function setMinRarity(range) {
      return set(function () {
        return {
          minRarity: range
        };
      });
    },
    setMaxRarity: function setMaxRarity(range) {
      return set(function () {
        return {
          maxRarity: range
        };
      });
    },
    toggleShowFullTraitName: function toggleShowFullTraitName(_ref5) {
      var shouldShow = _ref5.shouldShow,
        trait_value = _ref5.trait_value,
        trait_type = _ref5.trait_type;
      return set(function () {
        return {
          showFullTraitName: {
            shouldShow: shouldShow,
            trait_value: trait_value,
            trait_type: trait_type
          }
        };
      });
    }
  });
}, {
  name: "useCollectionTraits"
}));

exports.SortBy = SortBy;
exports.initialCollectionFilterState = initialCollectionFilterState;
