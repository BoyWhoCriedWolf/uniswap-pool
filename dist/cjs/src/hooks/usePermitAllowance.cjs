'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var permit2Sdk = require('@uniswap/permit2-sdk');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var permit2 = require('../abis/permit2.cjs');
var useContract = require('./useContract.cjs');
var multicall = require('../lib/hooks/multicall.cjs');
var ms = require('ms');
var React = require('react');
var errors = require('../utils/errors.cjs');
var signing = require('../utils/signing.cjs');
var swapErrorToUserReadableMessage = require('../utils/swapErrorToUserReadableMessage.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var PERMIT_EXPIRATION = ms__default["default"]("30d");
var PERMIT_SIG_EXPIRATION = ms__default["default"]("30m");
function toDeadline(expiration) {
  return Math.floor((Date.now() + expiration) / 1000);
}
function usePermitAllowance(token, owner, spender) {
  var contract = useContract.useContract(permit2Sdk.PERMIT2_ADDRESS, permit2);
  var inputs = React.useMemo(function () {
    return [owner, token === null || token === void 0 ? void 0 : token.address, spender];
  }, [owner, spender, token === null || token === void 0 ? void 0 : token.address]);

  // If there is no allowance yet, re-check next observed block.
  // This guarantees that the permitAllowance is synced upon submission and updated upon being synced.
  var _useState = React.useState(),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    blocksPerFetch = _useState2[0],
    setBlocksPerFetch = _useState2[1];
  var result = multicall.useSingleCallResult(contract, "allowance", inputs, {
    blocksPerFetch: blocksPerFetch
  }).result;
  var rawAmount = result === null || result === void 0 ? void 0 : result.amount.toString(); // convert to a string before using in a hook, to avoid spurious rerenders
  var allowance = React.useMemo(function () {
    return token && rawAmount ? sdkCore.CurrencyAmount.fromRawAmount(token, rawAmount) : undefined;
  }, [token, rawAmount]);
  React.useEffect(function () {
    return setBlocksPerFetch(allowance !== null && allowance !== void 0 && allowance.equalTo(0) ? 1 : undefined);
  }, [allowance]);
  return React.useMemo(function () {
    return {
      permitAllowance: allowance,
      expiration: result === null || result === void 0 ? void 0 : result.expiration,
      nonce: result === null || result === void 0 ? void 0 : result.nonce
    };
  }, [allowance, result === null || result === void 0 ? void 0 : result.expiration, result === null || result === void 0 ? void 0 : result.nonce]);
}
function useUpdatePermitAllowance(token, spender, nonce, onPermitSignature) {
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId,
    provider = _useWeb3React.provider;
  return React.useCallback( /*#__PURE__*/_asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee() {
    var permit, _AllowanceTransfer$ge, domain, types, values, _signature, _token$symbol, symbol;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          if (chainId) {
            _context.next = 3;
            break;
          }
          throw new Error("missing chainId");
        case 3:
          if (provider) {
            _context.next = 5;
            break;
          }
          throw new Error("missing provider");
        case 5:
          if (token) {
            _context.next = 7;
            break;
          }
          throw new Error("missing token");
        case 7:
          if (spender) {
            _context.next = 9;
            break;
          }
          throw new Error("missing spender");
        case 9:
          if (!(nonce === undefined)) {
            _context.next = 11;
            break;
          }
          throw new Error("missing nonce");
        case 11:
          permit = {
            details: {
              token: token.address,
              amount: permit2Sdk.MaxAllowanceTransferAmount,
              expiration: toDeadline(PERMIT_EXPIRATION),
              nonce: nonce
            },
            spender: spender,
            sigDeadline: toDeadline(PERMIT_SIG_EXPIRATION)
          };
          _AllowanceTransfer$ge = permit2Sdk.AllowanceTransfer.getPermitData(permit, permit2Sdk.PERMIT2_ADDRESS, chainId), domain = _AllowanceTransfer$ge.domain, types = _AllowanceTransfer$ge.types, values = _AllowanceTransfer$ge.values;
          _context.next = 15;
          return signing.signTypedData(provider.getSigner(account), domain, types, values);
        case 15:
          _signature = _context.sent;
          onPermitSignature === null || onPermitSignature === void 0 || onPermitSignature(_objectSpread(_objectSpread({}, permit), {}, {
            signature: _signature
          }));
          return _context.abrupt("return");
        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](0);
          symbol = (_token$symbol = token === null || token === void 0 ? void 0 : token.symbol) !== null && _token$symbol !== void 0 ? _token$symbol : "Token";
          if (!swapErrorToUserReadableMessage.didUserReject(_context.t0)) {
            _context.next = 25;
            break;
          }
          throw new errors.UserRejectedRequestError("".concat(symbol, " permit allowance failed: User rejected signature"));
        case 25:
          throw errors.toReadableError("".concat(symbol, " permit allowance failed:"), _context.t0);
        case 26:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 20]]);
  })), [account, chainId, nonce, onPermitSignature, provider, spender, token]);
}

exports.usePermitAllowance = usePermitAllowance;
exports.useUpdatePermitAllowance = useUpdatePermitAllowance;
