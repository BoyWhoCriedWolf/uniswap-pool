'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var sdkCore = require('@uniswap/sdk-core');
var erc20 = require('../../../../abis/erc20.cjs');
var tokens = require('../../../../constants/tokens.cjs');
var utils = require('ethers/lib/utils');
var addresses = require('../../../../utils/addresses.cjs');
require('@ethersproject/constants');
require('@ethersproject/contracts');
var arrays = require('../../../../utils/arrays.cjs');
var currencyKey = require('../../../../utils/currencyKey.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

var DEFAULT_GAS_LIMIT = 1000000;
var Erc20 = new utils.Interface(erc20);
var Erc20Bytes32 = new utils.Interface(erc20); // Used for tokens that return bytes32 for name/symbol rather than string

// TODO(WEB-1760): cartcrom - adapt support for multi-function multi-interface multicalls into redux-multicall to remove than this custom cache/chunking logic
// Infura rejects calls with gas costs > 10x the current block gas limit; in such case we split the call into 2 chunks
function fetchChunk(_x, _x2) {
  return _fetchChunk.apply(this, arguments);
}
function _fetchChunk() {
  _fetchChunk = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(multicall, chunk) {
    var _error$message, half;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return multicall.callStatic.multicall(chunk);
        case 3:
          return _context.abrupt("return", _context.sent.returnData);
        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          if (!(_context.t0.code === -32603 || ((_error$message = _context.t0.message) === null || _error$message === void 0 ? void 0 : _error$message.indexOf("execution ran out of gas")) !== -1)) {
            _context.next = 12;
            break;
          }
          if (!(chunk.length > 1)) {
            _context.next = 12;
            break;
          }
          half = Math.floor(chunk.length / 2);
          return _context.abrupt("return", Promise.all([fetchChunk(multicall, chunk.slice(0, half)), fetchChunk(multicall, chunk.slice(half, chunk.length))]).then(function (_ref) {
            var _ref2 = _slicedToArray__default["default"](_ref, 2),
              c0 = _ref2[0],
              c1 = _ref2[1];
            return [].concat(_toConsumableArray__default["default"](c0), _toConsumableArray__default["default"](c1));
          }));
        case 12:
          console.error("Failed to fetch chunk", _context.t0);
          throw _context.t0;
        case 14:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 6]]);
  }));
  return _fetchChunk.apply(this, arguments);
}
function tryParseToken(address, chainId, data) {
  try {
    var _data = _slicedToArray__default["default"](data, 5),
      nameData = _data[0],
      symbolData = _data[1],
      decimalsData = _data[2],
      nameDataBytes32 = _data[3],
      symbolDataBytes32 = _data[4];
    var name = nameData.success ? Erc20.decodeFunctionResult("name", nameData.returnData)[0] : nameDataBytes32.success ? Erc20Bytes32.decodeFunctionResult("name", nameDataBytes32.returnData)[0] : undefined;
    var symbol = symbolData.success ? Erc20.decodeFunctionResult("symbol", symbolData.returnData)[0] : symbolDataBytes32.success ? Erc20Bytes32.decodeFunctionResult("symbol", symbolDataBytes32.returnData)[0] : undefined;
    var decimals = decimalsData.success ? parseInt(decimalsData.returnData) : tokens.DEFAULT_ERC20_DECIMALS;
    return new sdkCore.Token(chainId, address, decimals, symbol, name);
  } catch (error) {
    console.error("Failed to fetch token at address ".concat(address, " on chain ").concat(chainId));
    return undefined;
  }
}
function parseTokens(addresses, chainId, returnData) {
  var tokenDataSlices = arrays.arrayToSlices(returnData, 5);
  return tokenDataSlices.reduce(function (acc, slice, index) {
    var parsedToken = tryParseToken(addresses[index], chainId, slice);
    if (parsedToken) acc[parsedToken.address] = parsedToken;
    return acc;
  }, {});
}
var createCalls = function createCalls(target, callData) {
  return callData.map(function (callData) {
    return {
      target: target,
      callData: callData,
      gasLimit: DEFAULT_GAS_LIMIT
    };
  });
};
function createCallsForToken(address) {
  return createCalls(address, [Erc20.encodeFunctionData("name"), Erc20.encodeFunctionData("symbol"), Erc20.encodeFunctionData("decimals"), Erc20Bytes32.encodeFunctionData("name"), Erc20Bytes32.encodeFunctionData("symbol")]);
}

// Prevents tokens from being fetched multiple times
var TokenPromiseCache = {};

// Returns tokens using a single RPC call to the multicall contract
function getTokensAsync(_x3, _x4, _x5) {
  return _getTokensAsync.apply(this, arguments);
}
function _getTokensAsync() {
  _getTokensAsync = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(addresses$1, chainId, multicall) {
    var formattedAddresses, calls, previouslyCalledTokens, calledTokens, tokenMap, resolvedPreviousTokens;
    return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(addresses$1.length === 0)) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", {});
        case 2:
          formattedAddresses = [];
          calls = [];
          previouslyCalledTokens = [];
          addresses$1.forEach(function (tokenAddress) {
            var key = currencyKey.buildCurrencyKey(chainId, tokenAddress);
            var previousCall = TokenPromiseCache[key];
            if (previousCall !== undefined) {
              previouslyCalledTokens.push(previousCall);
            } else {
              var formattedAddress = addresses.isAddress(tokenAddress);
              if (!formattedAddress) return;
              formattedAddresses.push(formattedAddress);
              calls.push.apply(calls, _toConsumableArray__default["default"](createCallsForToken(formattedAddress)));
            }
          });
          calledTokens = fetchChunk(multicall, calls).then(function (returnData) {
            return parseTokens(addresses$1, chainId, returnData);
          }); // Caches tokens currently being fetched for further calls to use
          formattedAddresses.forEach(function (address) {
            return TokenPromiseCache[currencyKey.buildCurrencyKey(chainId, address)] = calledTokens.then(function (tokenMap) {
              return tokenMap[address];
            });
          });
          _context2.next = 10;
          return calledTokens;
        case 10:
          tokenMap = _context2.sent;
          _context2.next = 13;
          return Promise.all(previouslyCalledTokens);
        case 13:
          resolvedPreviousTokens = _context2.sent;
          resolvedPreviousTokens.forEach(function (token) {
            return token && (tokenMap[currencyKey.currencyKey(token)] = token);
          });
          return _context2.abrupt("return", tokenMap);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getTokensAsync.apply(this, arguments);
}

exports.DEFAULT_GAS_LIMIT = DEFAULT_GAS_LIMIT;
exports.getTokensAsync = getTokensAsync;
