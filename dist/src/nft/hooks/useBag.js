import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { NftStandard } from '../../graphql/data/__generated__/types-and-hooks.js';
import { BagStatus, BagItemStatus } from '../types/checkout/index.js';
import { v4 } from 'uuid';
import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var useBag = createWithEqualityFn()(devtools(function (set, get) {
  return {
    bagStatus: BagStatus.ADDING_TO_BAG,
    bagExpanded: false,
    bagManuallyClosed: false,
    setBagStatus: function setBagStatus(newBagStatus) {
      return set(function () {
        return {
          bagStatus: newBagStatus
        };
      });
    },
    markAssetAsReviewed: function markAssetAsReviewed(asset, toKeep) {
      return set(function (_ref) {
        var itemsInBag = _ref.itemsInBag;
        if (itemsInBag.length === 0) return {
          itemsInBag: []
        };
        var itemsInBagCopy = _toConsumableArray(itemsInBag);
        var index = itemsInBagCopy.findIndex(function (item) {
          return item.asset.id === asset.id;
        });
        if (!toKeep && index !== -1) itemsInBagCopy.splice(index, 1);else if (index !== -1) {
          itemsInBagCopy[index].status = BagItemStatus.REVIEWED;
        }
        return {
          itemsInBag: itemsInBagCopy
        };
      });
    },
    didOpenUnavailableAssets: false,
    setDidOpenUnavailableAssets: function setDidOpenUnavailableAssets(didOpen) {
      return set(function () {
        return {
          didOpenUnavailableAssets: didOpen
        };
      });
    },
    setBagExpanded: function setBagExpanded(_ref2) {
      var bagExpanded = _ref2.bagExpanded,
        manualClose = _ref2.manualClose;
      return set(function (_ref3) {
        var bagManuallyClosed = _ref3.bagManuallyClosed;
        return {
          bagExpanded: bagExpanded,
          bagManuallyClosed: manualClose || bagManuallyClosed
        };
      });
    },
    toggleBag: function toggleBag() {
      return set(function (_ref4) {
        var bagExpanded = _ref4.bagExpanded;
        return {
          bagExpanded: !bagExpanded
        };
      });
    },
    usedSweep: false,
    isLocked: false,
    setLocked: function setLocked(_isLocked) {
      return set(function () {
        return {
          isLocked: _isLocked
        };
      });
    },
    itemsInBag: [],
    setItemsInBag: function setItemsInBag(items) {
      return set(function () {
        return {
          itemsInBag: items
        };
      });
    },
    addAssetsToBag: function addAssetsToBag(assets) {
      var fromSweep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return set(function (_ref5) {
        var itemsInBag = _ref5.itemsInBag;
        if (get().isLocked) return {
          itemsInBag: get().itemsInBag
        };
        var items = [];
        var itemsInBagCopy = _toConsumableArray(itemsInBag);
        assets.forEach(function (asset) {
          var index = -1;
          if (asset.tokenType !== NftStandard.Erc1155) {
            index = itemsInBag.findIndex(function (n) {
              return n.asset.tokenId === asset.tokenId && n.asset.address === asset.address;
            });
          }
          if (index !== -1) {
            itemsInBagCopy[index].inSweep = fromSweep;
          } else {
            var assetWithId = {
              asset: _objectSpread({
                id: v4()
              }, asset),
              status: BagItemStatus.ADDED_TO_BAG,
              inSweep: fromSweep
            };
            items.push(assetWithId);
          }
        });
        if (itemsInBag.length === 0) return {
          itemsInBag: items,
          bagStatus: BagStatus.ADDING_TO_BAG,
          usedSweep: fromSweep
        };else return {
          itemsInBag: [].concat(_toConsumableArray(itemsInBagCopy), items),
          bagStatus: BagStatus.ADDING_TO_BAG,
          usedSweep: fromSweep
        };
      });
    },
    removeAssetsFromBag: function removeAssetsFromBag(assets) {
      var fromSweep = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      set(function (_ref6) {
        var itemsInBag = _ref6.itemsInBag;
        if (get().isLocked) return {
          itemsInBag: get().itemsInBag
        };
        if (itemsInBag.length === 0) return {
          itemsInBag: []
        };
        var itemsCopy = itemsInBag.filter(function (item) {
          return !assets.some(function (asset) {
            return asset.id ? asset.id === item.asset.id : asset.tokenId === item.asset.tokenId && asset.address === item.asset.address;
          });
        });
        return {
          itemsInBag: itemsCopy,
          usedSweep: fromSweep
        };
      });
    },
    lockSweepItems: function lockSweepItems(contractAddress) {
      return set(function (_ref7) {
        var itemsInBag = _ref7.itemsInBag;
        if (get().isLocked) return {
          itemsInBag: get().itemsInBag
        };
        var itemsInBagCopy = itemsInBag.map(function (item) {
          return item.asset.address === contractAddress && item.inSweep ? _objectSpread(_objectSpread({}, item), {}, {
            inSweep: false
          }) : item;
        });
        if (itemsInBag.length === 0) return {
          itemsInBag: itemsInBag
        };else return {
          itemsInBag: _toConsumableArray(itemsInBagCopy)
        };
      });
    },
    reset: function reset() {
      return set(function () {
        if (!get().isLocked) return {
          bagStatus: BagStatus.ADDING_TO_BAG,
          itemsInBag: [],
          didOpenUnavailableAssets: false,
          isLocked: false,
          bagManuallyClosed: false,
          bagExpanded: false
        };else return {};
      });
    }
  };
}, {
  name: "useBag"
}), shallow);

export { useBag };
