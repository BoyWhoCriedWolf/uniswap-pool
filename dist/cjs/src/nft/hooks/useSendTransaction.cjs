'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var abi = require('@ethersproject/abi');
var bignumber = require('@ethersproject/bignumber');
var bytes = require('@ethersproject/bytes');
var analyticsEvents = require('@uniswap/analytics-events');
var index$1 = require('../../analytics/index.cjs');
var zustand = require('zustand');
var middleware = require('zustand/middleware');
var erc721 = require('../../abis/erc721.cjs');
var erc1155 = require('../../abis/erc1155.cjs');
var CryptoPunksMarket = require('../abis/CryptoPunksMarket.cjs');
var index = require('../types/checkout/index.cjs');
var combineItemsWithTxRoute = require('../utils/txRoute/combineItemsWithTxRoute.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var useSendTransaction = zustand.create()(middleware.devtools(function (set) {
  return {
    state: index.TxStateType.New,
    txHash: "",
    purchasedWithErc20: false,
    clearTxHash: function clearTxHash() {
      return set({
        txHash: ""
      });
    },
    setState: function setState(newState) {
      return set(function () {
        return {
          state: newState
        };
      });
    },
    sendTransaction: function () {
      var _sendTransaction = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(signer, selectedAssets, transactionData, purchasedWithErc20) {
        var address, txNoGasLimit, gasLimit, tx, res, txReceipt, nftsPurchased, nftsNotPurchased;
        return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return signer.getAddress();
            case 2:
              address = _context.sent;
              _context.prev = 3;
              txNoGasLimit = {
                to: transactionData.to,
                value: transactionData.valueToSend ? bignumber.BigNumber.from(transactionData.valueToSend) : undefined,
                data: transactionData.data
              };
              _context.next = 7;
              return signer.estimateGas(txNoGasLimit);
            case 7:
              gasLimit = _context.sent.mul(105).div(100);
              // tx['gasLimit'] = gasLimit
              tx = _objectSpread(_objectSpread({}, txNoGasLimit), {}, {
                gasLimit: gasLimit
              }); // TODO test this works when firing off tx
              set({
                state: index.TxStateType.Signing
              });
              _context.next = 12;
              return signer.sendTransaction(tx);
            case 12:
              res = _context.sent;
              set({
                state: index.TxStateType.Confirming
              });
              set({
                txHash: res.hash
              });
              set({
                purchasedWithErc20: purchasedWithErc20
              });
              index$1.sendAnalyticsEvent(analyticsEvents.NFTEventName.NFT_BUY_BAG_SIGNED, {
                transaction_hash: res.hash
              });
              _context.next = 19;
              return res.wait();
            case 19:
              txReceipt = _context.sent;
              if (!(txReceipt.status === 1)) {
                _context.next = 27;
                break;
              }
              nftsPurchased = findNFTsPurchased(txReceipt, address, selectedAssets, transactionData.route);
              nftsNotPurchased = findNFTsNotPurchased(selectedAssets, nftsPurchased);
              set({
                state: index.TxStateType.Success
              });
              return _context.abrupt("return", {
                nftsPurchased: nftsPurchased,
                nftsNotPurchased: nftsNotPurchased,
                txReceipt: txReceipt
              });
            case 27:
              set({
                state: index.TxStateType.Failed
              });
              return _context.abrupt("return", {
                nftsPurchased: [],
                nftsNotPurchased: selectedAssets,
                txReceipt: txReceipt
              });
            case 29:
              _context.next = 36;
              break;
            case 31:
              _context.prev = 31;
              _context.t0 = _context["catch"](3);
              console.log("Error creating multiAssetSwap Transaction", _context.t0);
              if (_context.t0.code === 4001) {
                set({
                  state: index.TxStateType.Denied
                });
              } else {
                set({
                  state: index.TxStateType.Invalid
                });
              }
              return _context.abrupt("return");
            case 36:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[3, 31]]);
      }));
      function sendTransaction(_x, _x2, _x3, _x4) {
        return _sendTransaction.apply(this, arguments);
      }
      return sendTransaction;
    }()
  };
}, {
  name: "useSendTransactionState"
}));
var findNFTsPurchased = function findNFTsPurchased(txReceipt, signerAddress, toBuy, txRoute) {
  if (!txReceipt.logs) {
    return [];
  }
  var erc721Interface = new abi.Interface(erc721);
  var erc1155Interface = new abi.Interface(erc1155);
  var cryptopunksMarketInterface = new abi.Interface(CryptoPunksMarket);

  // Find successfully purchased NFTs (and assign to state nftsPurchased) by parsing events
  var transferErc721BuyEvents = txReceipt.logs.filter(function (x) {
    return x.topics[0] === erc721Interface.getEventTopic("Transfer") && bytes.hexStripZeros(x.topics[2]).toLowerCase() === signerAddress.toLowerCase();
  });
  var transferredErc721 = transferErc721BuyEvents.map(function (x) {
    return {
      address: x.address,
      tokenId: parseInt(x.topics[3]).toString()
    };
  });
  var transferErc1155BuyEvents = txReceipt.logs.filter(function (x) {
    return x.topics[0] === erc1155Interface.getEventTopic("TransferSingle") && bytes.hexStripZeros(x.topics[3]).toLowerCase() === signerAddress.toLowerCase();
  });
  var transferredErc1155 = transferErc1155BuyEvents.map(function (x) {
    return {
      address: x.address,
      tokenId: erc1155Interface.parseLog(x).args[3].toString()
    };
  });

  // Find transferred CryptoPunks
  var transferCryptopunkEvents = txReceipt.logs.filter(function (x) {
    return x.topics[0] === cryptopunksMarketInterface.getEventTopic("PunkTransfer") && bytes.hexStripZeros(x.topics[2]).toLowerCase() === signerAddress.toLowerCase();
  });
  var transferredCryptopunks = transferCryptopunkEvents.map(function (x) {
    return {
      address: x.address,
      tokenId: cryptopunksMarketInterface.parseLog(x).args[2].toString()
    };
  });
  var allTransferred = [].concat(_toConsumableArray__default["default"](transferredErc721), _toConsumableArray__default["default"](transferredErc1155), _toConsumableArray__default["default"](transferredCryptopunks));
  var transferredItems = toBuy.filter(function (assetToBuy) {
    return allTransferred.some(function (purchasedNft) {
      return assetToBuy.address.toLowerCase() === purchasedNft.address.toLowerCase() && parseInt(assetToBuy.tokenId).toString() === purchasedNft.tokenId;
    });
  });
  return combineItemsWithTxRoute.compareAssetsWithTransactionRoute(transferredItems, txRoute).updatedAssets;
};
var findNFTsNotPurchased = function findNFTsNotPurchased(toBuy, nftsPurchased) {
  var nftsNotPurchased = [];
  toBuy.forEach(function (selectedAsset) {
    var purchasedNft = nftsPurchased.find(function (x) {
      return x.address.toLowerCase() === selectedAsset.address.toLowerCase() && x.tokenId === selectedAsset.tokenId;
    });
    if (!purchasedNft) {
      nftsNotPurchased.push(selectedAsset);
    }
  });
  return nftsNotPurchased;
};

exports.useSendTransaction = useSendTransaction;
