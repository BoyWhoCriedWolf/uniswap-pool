import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { defaultAbiCoder } from '@ethersproject/abi';
import { BigNumber } from '@ethersproject/bignumber';
import { hexZeroPad } from '@ethersproject/bytes';
import { AddressZero } from '@ethersproject/constants';
import { keccak256 } from '@ethersproject/keccak256';
import { randomBytes } from '@ethersproject/random';
import { NftStandard } from '../../graphql/data/__generated__/types-and-hooks.js';

var dataParamType = "tuple(address token, uint256 tokenId, uint256 amount)[]";
var orderItemParamType = "tuple(uint256 price, bytes data)";
var orderParamTypes = ["uint256", "address", "uint256", "uint256", "uint256", "uint256", "address", "bytes", "uint256", "".concat(orderItemParamType, "[]")];
var orderParamType = "tuple(uint256 salt, address user, uint256 network, uint256 intent, uint256 delegateType, uint256 deadline, address currency, bytes dataMask, ".concat(orderItemParamType, "[] items, bytes32 r, bytes32 s, uint8 v, uint8 signVersion)");
var randomSalt = function randomSalt() {
  var randomHex = BigNumber.from(randomBytes(16)).toHexString();
  return hexZeroPad(randomHex, 64);
};
var encodeItemData = function encodeItemData(data) {
  return defaultAbiCoder.encode([dataParamType], [data]);
};
var signOrderData = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(web3Provider, order) {
    var orderData, orderHash, orderSig;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          orderData = defaultAbiCoder.encode(orderParamTypes, [order.salt, order.user, order.network, order.intent, order.delegateType, order.deadline, order.currency, order.dataMask, order.items.length, order.items]);
          orderHash = keccak256(orderData);
          _context.next = 4;
          return web3Provider.send("personal_sign", [orderHash, order.user]);
        case 4:
          orderSig = _context.sent;
          order.r = "0x".concat(orderSig.slice(2, 66));
          order.s = "0x".concat(orderSig.slice(66, 130));
          order.v = parseInt(orderSig.slice(130, 132), 16);
          fixSignature(order);
        case 9:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function signOrderData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var fixSignature = function fixSignature(data) {
  // in geth its always 27/28, in ganache its 0/1. Change to 27/28 to prevent
  // signature malleability if version is 0/1
  // see https://github.com/ethereum/go-ethereum/blob/v1.8.23/internal/ethapi/api.go#L465
  if (data.v < 27) {
    data.v = data.v + 27;
  }
};
var encodeOrder = function encodeOrder(order) {
  return defaultAbiCoder.encode([orderParamType], [order]);
};
var createSellOrder = function createSellOrder(user, deadline, items) {
  var nftStandard = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : NftStandard.Erc721;
  var salt = randomSalt();
  var network = 1; // mainnet
  var intent = 1; // INTENT_SELL
  var delegateType = nftStandard === NftStandard.Erc721 ? 1 : 2;
  var currency = AddressZero; // ETH
  return {
    salt: salt,
    user: user,
    network: network,
    intent: intent,
    delegateType: delegateType,
    deadline: deadline,
    currency: currency,
    dataMask: "0x",
    items: items.map(function (item) {
      return {
        price: item.price,
        data: encodeItemData(item.tokens)
      };
    }),
    r: "",
    s: "",
    v: 0,
    signVersion: 1
  };
};

export { createSellOrder, encodeOrder, signOrderData };
