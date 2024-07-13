'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var sdkCore = require('@uniswap/sdk-core');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

var _BLOCK_EXPLORER_PREFI;
var BLOCK_EXPLORER_PREFIXES = (_BLOCK_EXPLORER_PREFI = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_BLOCK_EXPLORER_PREFI, sdkCore.ChainId.MAINNET, "https://etherscan.io"), sdkCore.ChainId.GOERLI, "https://goerli.etherscan.io"), sdkCore.ChainId.SEPOLIA, "https://sepolia.etherscan.io"), sdkCore.ChainId.OPTIMISM, "https://optimistic.etherscan.io"), sdkCore.ChainId.OPTIMISM_GOERLI, "https://goerli-optimism.etherscan.io"), sdkCore.ChainId.POLYGON, "https://polygonscan.com"), sdkCore.ChainId.POLYGON_MUMBAI, "https://mumbai.polygonscan.com"), sdkCore.ChainId.CELO, "https://celoscan.io"), sdkCore.ChainId.CELO_ALFAJORES, "https://alfajores-blockscout.celo-testnet.org"), sdkCore.ChainId.BNB, "https://bscscan.com"), _defineProperty__default["default"](_defineProperty__default["default"](_BLOCK_EXPLORER_PREFI, sdkCore.ChainId.AVALANCHE, "https://snowtrace.io"), sdkCore.ChainId.BASE, "https://basescan.org"));
var ExplorerDataType = /*#__PURE__*/function (ExplorerDataType) {
  ExplorerDataType["TRANSACTION"] = "transaction";
  ExplorerDataType["TOKEN"] = "token";
  ExplorerDataType["ADDRESS"] = "address";
  ExplorerDataType["BLOCK"] = "block";
  return ExplorerDataType;
}({});

/**
 * Return the explorer link for the given data and data type
 * @param chainId the ID of the chain for which to return the data
 * @param data the data to return a link for
 * @param type the type of the data
 */
function getExplorerLink(chainId, data, type) {
  var _BLOCK_EXPLORER_PREFI2;
  if (chainId === sdkCore.ChainId.ARBITRUM_ONE) {
    switch (type) {
      case ExplorerDataType.TRANSACTION:
        return "https://arbiscan.io/tx/".concat(data);
      case ExplorerDataType.ADDRESS:
      case ExplorerDataType.TOKEN:
        return "https://arbiscan.io/address/".concat(data);
      case ExplorerDataType.BLOCK:
        return "https://arbiscan.io/block/".concat(data);
      default:
        return "https://arbiscan.io/";
    }
  }
  if (chainId === sdkCore.ChainId.ARBITRUM_GOERLI) {
    switch (type) {
      case ExplorerDataType.TRANSACTION:
        return "https://goerli.arbiscan.io/tx/".concat(data);
      case ExplorerDataType.ADDRESS:
      case ExplorerDataType.TOKEN:
        return "https://goerli.arbiscan.io/address/".concat(data);
      case ExplorerDataType.BLOCK:
        return "https://goerli.arbiscan.io/block/".concat(data);
      default:
        return "https://goerli.arbiscan.io/";
    }
  }
  var prefix = (_BLOCK_EXPLORER_PREFI2 = BLOCK_EXPLORER_PREFIXES[chainId]) !== null && _BLOCK_EXPLORER_PREFI2 !== void 0 ? _BLOCK_EXPLORER_PREFI2 : "https://etherscan.io";
  switch (type) {
    case ExplorerDataType.TRANSACTION:
      return "".concat(prefix, "/tx/").concat(data);
    case ExplorerDataType.TOKEN:
      return "".concat(prefix, "/token/").concat(data);
    case ExplorerDataType.BLOCK:
      if (chainId === sdkCore.ChainId.OPTIMISM || chainId === sdkCore.ChainId.OPTIMISM_GOERLI) {
        return "".concat(prefix, "/tx/").concat(data);
      }
      return "".concat(prefix, "/block/").concat(data);
    case ExplorerDataType.ADDRESS:
      return "".concat(prefix, "/address/").concat(data);
    default:
      return "".concat(prefix);
  }
}

exports.ExplorerDataType = ExplorerDataType;
exports.getExplorerLink = getExplorerLink;
