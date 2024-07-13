import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Interface } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { hexStripZeros } from '@ethersproject/bytes';
import { NFTEventName } from '@uniswap/analytics-events';
import { sendAnalyticsEvent } from '../../analytics/index.js';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import ERC721 from '../../abis/erc721.json.js';
import ERC1155 from '../../abis/erc1155.json.js';
import CryptoPunksMarket from '../abis/CryptoPunksMarket.json.js';
import { TxStateType } from '../types/checkout/index.js';
import { compareAssetsWithTransactionRoute } from '../utils/txRoute/combineItemsWithTxRoute.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var useSendTransaction = create()(devtools(function (set) {
  return {
    state: TxStateType.New,
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
      var _sendTransaction = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(signer, selectedAssets, transactionData, purchasedWithErc20) {
        var address, txNoGasLimit, gasLimit, tx, res, txReceipt, nftsPurchased, nftsNotPurchased;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return signer.getAddress();
            case 2:
              address = _context.sent;
              _context.prev = 3;
              txNoGasLimit = {
                to: transactionData.to,
                value: transactionData.valueToSend ? BigNumber.from(transactionData.valueToSend) : undefined,
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
                state: TxStateType.Signing
              });
              _context.next = 12;
              return signer.sendTransaction(tx);
            case 12:
              res = _context.sent;
              set({
                state: TxStateType.Confirming
              });
              set({
                txHash: res.hash
              });
              set({
                purchasedWithErc20: purchasedWithErc20
              });
              sendAnalyticsEvent(NFTEventName.NFT_BUY_BAG_SIGNED, {
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
                state: TxStateType.Success
              });
              return _context.abrupt("return", {
                nftsPurchased: nftsPurchased,
                nftsNotPurchased: nftsNotPurchased,
                txReceipt: txReceipt
              });
            case 27:
              set({
                state: TxStateType.Failed
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
                  state: TxStateType.Denied
                });
              } else {
                set({
                  state: TxStateType.Invalid
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
  var erc721Interface = new Interface(ERC721);
  var erc1155Interface = new Interface(ERC1155);
  var cryptopunksMarketInterface = new Interface(CryptoPunksMarket);

  // Find successfully purchased NFTs (and assign to state nftsPurchased) by parsing events
  var transferErc721BuyEvents = txReceipt.logs.filter(function (x) {
    return x.topics[0] === erc721Interface.getEventTopic("Transfer") && hexStripZeros(x.topics[2]).toLowerCase() === signerAddress.toLowerCase();
  });
  var transferredErc721 = transferErc721BuyEvents.map(function (x) {
    return {
      address: x.address,
      tokenId: parseInt(x.topics[3]).toString()
    };
  });
  var transferErc1155BuyEvents = txReceipt.logs.filter(function (x) {
    return x.topics[0] === erc1155Interface.getEventTopic("TransferSingle") && hexStripZeros(x.topics[3]).toLowerCase() === signerAddress.toLowerCase();
  });
  var transferredErc1155 = transferErc1155BuyEvents.map(function (x) {
    return {
      address: x.address,
      tokenId: erc1155Interface.parseLog(x).args[3].toString()
    };
  });

  // Find transferred CryptoPunks
  var transferCryptopunkEvents = txReceipt.logs.filter(function (x) {
    return x.topics[0] === cryptopunksMarketInterface.getEventTopic("PunkTransfer") && hexStripZeros(x.topics[2]).toLowerCase() === signerAddress.toLowerCase();
  });
  var transferredCryptopunks = transferCryptopunkEvents.map(function (x) {
    return {
      address: x.address,
      tokenId: cryptopunksMarketInterface.parseLog(x).args[2].toString()
    };
  });
  var allTransferred = [].concat(_toConsumableArray(transferredErc721), _toConsumableArray(transferredErc1155), _toConsumableArray(transferredCryptopunks));
  var transferredItems = toBuy.filter(function (assetToBuy) {
    return allTransferred.some(function (purchasedNft) {
      return assetToBuy.address.toLowerCase() === purchasedNft.address.toLowerCase() && parseInt(assetToBuy.tokenId).toString() === purchasedNft.tokenId;
    });
  });
  return compareAssetsWithTransactionRoute(transferredItems, txRoute).updatedAssets;
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

export { useSendTransaction };
