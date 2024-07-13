import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { parseEther } from '@ethersproject/units';
import { addressesByNetwork, SupportedChainId, signMakerOrder } from '@looksrare/sdk';
import { Seaport } from '@opensea/seaport-js';
import { ItemType } from '@opensea/seaport-js/lib/constants';
import { ZERO_ADDRESS } from '../../constants/misc.js';
import { NftStandard } from '../../graphql/data/__generated__/types-and-hooks.js';
import { createLooksRareOrder } from '../queries/looksRare/createLooksRareOrder.js';
import { LOOKSRARE_MARKETPLACE_CONTRACT_721 } from '../queries/looksRare/constants.js';
import { PostOpenSeaSellOrder } from '../queries/openSea/PostOpenSeaSellOrder.js';
import { OPENSEA_KEY_TO_CONDUIT, OPENSEA_DEFAULT_CROSS_CHAIN_CONDUIT_KEY, INVERSE_BASIS_POINTS, OPENSEA_SEAPORT_V1_5_CONTRACT, OPENSEA_FEE_ADDRESS } from '../queries/openSea/constants.js';
import { newX2Y2Order, getX2Y2OrderId } from '../queries/x2y2/index.js';
import ERC721 from '../../abis/erc721.json.js';
import ERC1155 from '../../abis/erc1155.json.js';
import { ListingStatus } from '../types/sell/index.js';
import { encodeOrder, signOrderData, createSellOrder } from './x2y2.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var LOOKS_RARE_CREATOR_BASIS_POINTS = 50;
var ListingMarkets = [{
  name: "X2Y2",
  fee: 0.5
}, {
  name: "OpenSea",
  fee: 2.5
}];
var createConsiderationItem = function createConsiderationItem(basisPoints, recipient) {
  return {
    amount: basisPoints,
    recipient: recipient
  };
};
var getConsiderationItems = function getConsiderationItems(asset, price, signerAddress) {
  var _asset$basisPoints, _ListingMarkets$find$, _ListingMarkets$find, _asset$asset_contract, _asset$asset_contract2;
  var creatorFeeBasisPoints = (_asset$basisPoints = asset === null || asset === void 0 ? void 0 : asset.basisPoints) !== null && _asset$basisPoints !== void 0 ? _asset$basisPoints : 0;
  var openSeaBasisPoints = ((_ListingMarkets$find$ = (_ListingMarkets$find = ListingMarkets.find(function (market) {
    return market.name === "OpenSea";
  })) === null || _ListingMarkets$find === void 0 ? void 0 : _ListingMarkets$find.fee) !== null && _ListingMarkets$find$ !== void 0 ? _ListingMarkets$find$ : 0) * 100;
  var sellerBasisPoints = INVERSE_BASIS_POINTS - creatorFeeBasisPoints - openSeaBasisPoints;
  var creatorFee = price.mul(BigNumber.from(creatorFeeBasisPoints)).div(BigNumber.from(INVERSE_BASIS_POINTS)).toString();
  var sellerFee = price.mul(BigNumber.from(sellerBasisPoints)).div(BigNumber.from(INVERSE_BASIS_POINTS)).toString();
  var openSeaFee = price.mul(BigNumber.from(openSeaBasisPoints)).div(BigNumber.from(INVERSE_BASIS_POINTS)).toString();
  return {
    sellerFee: createConsiderationItem(sellerFee, signerAddress),
    creatorFee: creatorFeeBasisPoints > 0 ? createConsiderationItem(creatorFee, (_asset$asset_contract = asset === null || asset === void 0 || (_asset$asset_contract2 = asset.asset_contract) === null || _asset$asset_contract2 === void 0 ? void 0 : _asset$asset_contract2.payout_address) !== null && _asset$asset_contract !== void 0 ? _asset$asset_contract : "") : undefined,
    openSeaFee: openSeaBasisPoints ? createConsiderationItem(openSeaFee, OPENSEA_FEE_ADDRESS) : undefined
  };
};
function approveCollection(_x, _x2, _x3, _x4) {
  return _approveCollection.apply(this, arguments);
}
function _approveCollection() {
  _approveCollection = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(operator, collectionAddress, signer, setStatus) {
    var nftStandard,
      contract,
      signerAddress,
      approved,
      approvalTransaction,
      tx,
      _args = arguments;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          nftStandard = _args.length > 4 && _args[4] !== undefined ? _args[4] : NftStandard.Erc721;
          contract = new Contract(collectionAddress, nftStandard === NftStandard.Erc721 ? ERC721 : ERC1155, signer);
          _context.next = 4;
          return signer.getAddress();
        case 4:
          signerAddress = _context.sent;
          _context.prev = 5;
          _context.next = 8;
          return contract.isApprovedForAll(signerAddress, operator);
        case 8:
          approved = _context.sent;
          if (!approved) {
            _context.next = 12;
            break;
          }
          setStatus(ListingStatus.APPROVED);
          return _context.abrupt("return");
        case 12:
          setStatus(ListingStatus.SIGNING);
          _context.next = 15;
          return contract.setApprovalForAll(operator, true);
        case 15:
          approvalTransaction = _context.sent;
          setStatus(ListingStatus.PENDING);
          _context.next = 19;
          return approvalTransaction.wait();
        case 19:
          tx = _context.sent;
          tx.status === 1 ? setStatus(ListingStatus.APPROVED) : setStatus(ListingStatus.FAILED);
          _context.next = 26;
          break;
        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](5);
          if (_context.t0.code === 4001) setStatus(ListingStatus.REJECTED);else setStatus(ListingStatus.FAILED);
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[5, 23]]);
  }));
  return _approveCollection.apply(this, arguments);
}
function signListing(_x5, _x6, _x7, _x8) {
  return _signListing.apply(this, arguments);
}
function _signListing() {
  _signListing = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(marketplace, asset, signer, provider) {
    var _asset$newListings;
    var looksRareNonce,
      setStatus,
      seaport,
      signerAddress,
      listingPrice,
      listingInWei,
      _getConsiderationItem,
      sellerFee,
      creatorFee,
      openSeaFee,
      considerationItems,
      _yield$seaport$create,
      executeAllActions,
      order,
      seaportV15Order,
      res,
      addresses,
      currentTime,
      makerOrder,
      signatureHash,
      payload,
      _res,
      orderItem,
      _order,
      prevOrderId,
      _payload,
      resp,
      _args2 = arguments;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          looksRareNonce = _args2.length > 4 && _args2[4] !== undefined ? _args2[4] : 0;
          setStatus = _args2.length > 5 ? _args2[5] : undefined;
          seaport = new Seaport(provider, {
            conduitKeyToConduit: OPENSEA_KEY_TO_CONDUIT,
            overrides: {
              defaultConduitKey: OPENSEA_DEFAULT_CROSS_CHAIN_CONDUIT_KEY
            },
            seaportVersion: "1.5"
          });
          _context2.next = 5;
          return signer.getAddress();
        case 5:
          signerAddress = _context2.sent;
          listingPrice = (_asset$newListings = asset.newListings) === null || _asset$newListings === void 0 || (_asset$newListings = _asset$newListings.find(function (listing) {
            return listing.marketplace.name === marketplace.name;
          })) === null || _asset$newListings === void 0 ? void 0 : _asset$newListings.price;
          if (!(!listingPrice || !asset.expirationTime || !asset.asset_contract.address || !asset.tokenId)) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", false);
        case 9:
          _context2.t0 = marketplace.name;
          _context2.next = _context2.t0 === "OpenSea" ? 12 : _context2.t0 === "LooksRare" ? 36 : _context2.t0 === "X2Y2" ? 56 : 77;
          break;
        case 12:
          _context2.prev = 12;
          listingInWei = parseEther("".concat(listingPrice));
          _getConsiderationItem = getConsiderationItems(asset, listingInWei, signerAddress), sellerFee = _getConsiderationItem.sellerFee, creatorFee = _getConsiderationItem.creatorFee, openSeaFee = _getConsiderationItem.openSeaFee;
          considerationItems = [sellerFee, creatorFee, openSeaFee].filter(function (item) {
            return item !== undefined;
          });
          _context2.next = 18;
          return seaport.createOrder({
            offer: [{
              itemType: asset.asset_contract.tokenType === NftStandard.Erc721 ? ItemType.ERC721 : ItemType.ERC1155,
              token: asset.asset_contract.address,
              identifier: asset.tokenId,
              amount: "1"
            }],
            consideration: considerationItems,
            endTime: asset.expirationTime.toString(),
            zone: ZERO_ADDRESS,
            allowPartialFills: true
          }, signerAddress);
        case 18:
          _yield$seaport$create = _context2.sent;
          executeAllActions = _yield$seaport$create.executeAllActions;
          _context2.next = 22;
          return executeAllActions();
        case 22:
          order = _context2.sent;
          seaportV15Order = _objectSpread(_objectSpread({}, order), {}, {
            protocol_address: OPENSEA_SEAPORT_V1_5_CONTRACT
          });
          setStatus(ListingStatus.PENDING);
          _context2.next = 27;
          return PostOpenSeaSellOrder(seaportV15Order);
        case 27:
          res = _context2.sent;
          res ? setStatus(ListingStatus.APPROVED) : setStatus(ListingStatus.FAILED);
          return _context2.abrupt("return", res);
        case 32:
          _context2.prev = 32;
          _context2.t1 = _context2["catch"](12);
          if (_context2.t1.code === 4001) setStatus(ListingStatus.REJECTED);else setStatus(ListingStatus.FAILED);
          return _context2.abrupt("return", false);
        case 36:
          addresses = addressesByNetwork[SupportedChainId.MAINNET];
          currentTime = Math.round(Date.now() / 1000);
          makerOrder = {
            // true --> ask / false --> bid
            isOrderAsk: true,
            // signer address of the maker order
            signer: signerAddress,
            // collection address
            collection: asset.asset_contract.address,
            // Price in WEI
            price: parseEther(listingPrice.toString()),
            // Token ID
            tokenId: BigNumber.from(asset.tokenId),
            // amount of tokens to sell/purchase (must be 1 for ERC721, 1+ for ERC1155)
            amount: BigNumber.from(1),
            // strategy for trade execution (e.g., DutchAuction, StandardSaleForFixedPrice), see addresses in the SDK
            strategy: addresses.STRATEGY_STANDARD_SALE,
            // currency address
            currency: addresses.WETH,
            // order nonce (must be unique unless new maker order is meant to override existing one e.g., lower ask price)
            nonce: BigNumber.from(looksRareNonce),
            // startTime timestamp in seconds
            startTime: BigNumber.from(currentTime),
            // endTime timestamp in seconds
            endTime: BigNumber.from(asset.expirationTime),
            // minimum ratio to be received by the user (per 10000)
            // As of 11.10.22 LooksRare charges 1.5% + 0.5% if there's creator royalties set https://docs.looksrare.org/blog/looksrare-offers-zero-royalty-trading-shares-protocol-fees-with-creators-instead
            minPercentageToAsk: BigNumber.from(10000).sub(BigNumber.from(150 + (asset.basisPoints ? 50 : 0))).toNumber(),
            // params (e.g., price, target account for private sale)
            params: []
          };
          _context2.prev = 39;
          _context2.next = 42;
          return signMakerOrder(signer, SupportedChainId.MAINNET, makerOrder, LOOKSRARE_MARKETPLACE_CONTRACT_721);
        case 42:
          signatureHash = _context2.sent;
          setStatus(ListingStatus.PENDING);
          payload = {
            signature: signatureHash,
            tokenId: asset.tokenId,
            collection: asset.asset_contract.address,
            strategy: addresses.STRATEGY_STANDARD_SALE,
            currency: addresses.WETH,
            signer: signerAddress,
            isOrderAsk: true,
            nonce: looksRareNonce,
            amount: 1,
            price: parseEther(listingPrice.toString()).toString(),
            startTime: currentTime,
            endTime: asset.expirationTime,
            minPercentageToAsk: 10000 - (150 + (asset.basisPoints ? 50 : 0)),
            params: []
          };
          _context2.next = 47;
          return createLooksRareOrder(payload);
        case 47:
          _res = _context2.sent;
          _res ? setStatus(ListingStatus.APPROVED) : setStatus(ListingStatus.FAILED);
          return _context2.abrupt("return", _res);
        case 52:
          _context2.prev = 52;
          _context2.t2 = _context2["catch"](39);
          if (_context2.t2.code === 4001) setStatus(ListingStatus.REJECTED);else setStatus(ListingStatus.FAILED);
          return _context2.abrupt("return", false);
        case 56:
          orderItem = {
            price: parseEther(listingPrice.toString()),
            tokens: [{
              token: asset.asset_contract.address,
              tokenId: BigNumber.from(asset.tokenId),
              amount: 1
            }]
          };
          _order = createSellOrder(signerAddress, asset.expirationTime, [orderItem], asset.asset_contract.tokenType);
          _context2.prev = 58;
          _context2.next = 61;
          return getX2Y2OrderId(asset.asset_contract.address, asset.tokenId);
        case 61:
          prevOrderId = _context2.sent;
          _context2.next = 64;
          return signOrderData(provider, _order);
        case 64:
          _payload = {
            order: encodeOrder(_order),
            isBundle: false,
            bundleName: "",
            bundleDesc: "",
            orderIds: prevOrderId ? [prevOrderId] : [],
            changePrice: Boolean(prevOrderId),
            isCollection: false
          };
          setStatus(ListingStatus.PENDING);
          // call server api
          _context2.next = 68;
          return newX2Y2Order(_payload);
        case 68:
          resp = _context2.sent;
          resp ? setStatus(ListingStatus.APPROVED) : setStatus(ListingStatus.FAILED);
          return _context2.abrupt("return", resp);
        case 73:
          _context2.prev = 73;
          _context2.t3 = _context2["catch"](58);
          if (_context2.t3.code === 4001) setStatus(ListingStatus.REJECTED);else setStatus(ListingStatus.FAILED);
          return _context2.abrupt("return", false);
        case 77:
          return _context2.abrupt("return", false);
        case 78:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[12, 32], [39, 52], [58, 73]]);
  }));
  return _signListing.apply(this, arguments);
}

export { LOOKS_RARE_CREATOR_BASIS_POINTS, ListingMarkets, approveCollection, signListing };
