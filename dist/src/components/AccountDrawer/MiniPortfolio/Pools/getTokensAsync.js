import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Token } from '@uniswap/sdk-core';
import ERC20_ABI from '../../../../abis/erc20.json.js';
import { DEFAULT_ERC20_DECIMALS } from '../../../../constants/tokens.js';
import { Interface } from 'ethers/lib/utils';
import { isAddress } from '../../../../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import { arrayToSlices } from '../../../../utils/arrays.js';
import { currencyKey, buildCurrencyKey } from '../../../../utils/currencyKey.js';

var DEFAULT_GAS_LIMIT = 1000000;
var Erc20 = new Interface(ERC20_ABI);
var Erc20Bytes32 = new Interface(ERC20_ABI); // Used for tokens that return bytes32 for name/symbol rather than string

// TODO(WEB-1760): cartcrom - adapt support for multi-function multi-interface multicalls into redux-multicall to remove than this custom cache/chunking logic
// Infura rejects calls with gas costs > 10x the current block gas limit; in such case we split the call into 2 chunks
function fetchChunk(_x, _x2) {
  return _fetchChunk.apply(this, arguments);
}
function _fetchChunk() {
  _fetchChunk = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(multicall, chunk) {
    var _error$message, half;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
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
            var _ref2 = _slicedToArray(_ref, 2),
              c0 = _ref2[0],
              c1 = _ref2[1];
            return [].concat(_toConsumableArray(c0), _toConsumableArray(c1));
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
    var _data = _slicedToArray(data, 5),
      nameData = _data[0],
      symbolData = _data[1],
      decimalsData = _data[2],
      nameDataBytes32 = _data[3],
      symbolDataBytes32 = _data[4];
    var name = nameData.success ? Erc20.decodeFunctionResult("name", nameData.returnData)[0] : nameDataBytes32.success ? Erc20Bytes32.decodeFunctionResult("name", nameDataBytes32.returnData)[0] : undefined;
    var symbol = symbolData.success ? Erc20.decodeFunctionResult("symbol", symbolData.returnData)[0] : symbolDataBytes32.success ? Erc20Bytes32.decodeFunctionResult("symbol", symbolDataBytes32.returnData)[0] : undefined;
    var decimals = decimalsData.success ? parseInt(decimalsData.returnData) : DEFAULT_ERC20_DECIMALS;
    return new Token(chainId, address, decimals, symbol, name);
  } catch (error) {
    console.error("Failed to fetch token at address ".concat(address, " on chain ").concat(chainId));
    return undefined;
  }
}
function parseTokens(addresses, chainId, returnData) {
  var tokenDataSlices = arrayToSlices(returnData, 5);
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
  _getTokensAsync = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(addresses, chainId, multicall) {
    var formattedAddresses, calls, previouslyCalledTokens, calledTokens, tokenMap, resolvedPreviousTokens;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (!(addresses.length === 0)) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", {});
        case 2:
          formattedAddresses = [];
          calls = [];
          previouslyCalledTokens = [];
          addresses.forEach(function (tokenAddress) {
            var key = buildCurrencyKey(chainId, tokenAddress);
            var previousCall = TokenPromiseCache[key];
            if (previousCall !== undefined) {
              previouslyCalledTokens.push(previousCall);
            } else {
              var formattedAddress = isAddress(tokenAddress);
              if (!formattedAddress) return;
              formattedAddresses.push(formattedAddress);
              calls.push.apply(calls, _toConsumableArray(createCallsForToken(formattedAddress)));
            }
          });
          calledTokens = fetchChunk(multicall, calls).then(function (returnData) {
            return parseTokens(addresses, chainId, returnData);
          }); // Caches tokens currently being fetched for further calls to use
          formattedAddresses.forEach(function (address) {
            return TokenPromiseCache[buildCurrencyKey(chainId, address)] = calledTokens.then(function (tokenMap) {
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
            return token && (tokenMap[currencyKey(token)] = token);
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

export { DEFAULT_GAS_LIMIT, getTokensAsync };
