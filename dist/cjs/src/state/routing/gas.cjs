'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _asyncToGenerator = require('@babel/runtime/helpers/asyncToGenerator');
var _regeneratorRuntime = require('@babel/runtime/regenerator');
var permit2Sdk = require('@uniswap/permit2-sdk');
var erc20 = require('../../abis/erc20.cjs');
var weth = require('../../abis/weth.cjs');
var providers = require('../../constants/providers.cjs');
var tokens = require('../../constants/tokens.cjs');
require('@ethersproject/address');
var getContract = require('../../utils/getContract.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _asyncToGenerator__default = /*#__PURE__*/_interopDefaultLegacy(_asyncToGenerator);
var _regeneratorRuntime__default = /*#__PURE__*/_interopDefaultLegacy(_regeneratorRuntime);

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// TODO(UniswapX): add fallback gas limits per chain? l2s have higher costs
var WRAP_FALLBACK_GAS_LIMIT = 45000;
var APPROVE_FALLBACK_GAS_LIMIT = 65000;
function getApproveInfo(_x, _x2, _x3, _x4) {
  return _getApproveInfo.apply(this, arguments);
}
function _getApproveInfo() {
  _getApproveInfo = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee(account, currency, amount, usdCostPerGas) {
    var provider, tokenContract, approveGasUseEstimate, allowance, approveTx;
    return _regeneratorRuntime__default["default"].wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (!currency.isNative) {
            _context.next = 2;
            break;
          }
          return _context.abrupt("return", {
            needsApprove: false
          });
        case 2:
          if (!(!account || !usdCostPerGas)) {
            _context.next = 4;
            break;
          }
          return _context.abrupt("return", {
            needsApprove: false
          });
        case 4:
          provider = providers.DEPRECATED_RPC_PROVIDERS[currency.chainId];
          tokenContract = getContract.getContract(currency.address, erc20, provider);
          _context.prev = 6;
          _context.next = 9;
          return tokenContract.callStatic.allowance(account, permit2Sdk.PERMIT2_ADDRESS);
        case 9:
          allowance = _context.sent;
          if (allowance.lt(amount)) {
            _context.next = 12;
            break;
          }
          return _context.abrupt("return", {
            needsApprove: false
          });
        case 12:
          _context.next = 17;
          break;
        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](6);
          return _context.abrupt("return", {
            needsApprove: false
          });
        case 17:
          _context.prev = 17;
          _context.next = 20;
          return tokenContract.populateTransaction.approve(permit2Sdk.PERMIT2_ADDRESS, permit2Sdk.MaxUint256);
        case 20:
          approveTx = _context.sent;
          _context.next = 23;
          return provider.estimateGas(_objectSpread({
            from: account
          }, approveTx));
        case 23:
          approveGasUseEstimate = _context.sent.toNumber();
          _context.next = 29;
          break;
        case 26:
          _context.prev = 26;
          _context.t1 = _context["catch"](17);
          // estimateGas will error if the account doesn't have sufficient token balance, but we should show an estimated cost anyway
          approveGasUseEstimate = APPROVE_FALLBACK_GAS_LIMIT;
        case 29:
          return _context.abrupt("return", {
            needsApprove: true,
            approveGasEstimateUSD: approveGasUseEstimate * usdCostPerGas
          });
        case 30:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[6, 14], [17, 26]]);
  }));
  return _getApproveInfo.apply(this, arguments);
}
function getWrapInfo(_x5, _x6, _x7, _x8, _x9) {
  return _getWrapInfo.apply(this, arguments);
}
function _getWrapInfo() {
  _getWrapInfo = _asyncToGenerator__default["default"]( /*#__PURE__*/_regeneratorRuntime__default["default"].mark(function _callee2(needsWrap, account, chainId, amount, usdCostPerGas) {
    var _WRAPPED_NATIVE_CURRE;
    var provider, wethAddress, wrapGasUseEstimate, wethContract, wethTx;
    return _regeneratorRuntime__default["default"].wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          if (needsWrap) {
            _context2.next = 2;
            break;
          }
          return _context2.abrupt("return", {
            needsWrap: false
          });
        case 2:
          provider = providers.DEPRECATED_RPC_PROVIDERS[chainId];
          wethAddress = (_WRAPPED_NATIVE_CURRE = tokens.WRAPPED_NATIVE_CURRENCY[chainId]) === null || _WRAPPED_NATIVE_CURRE === void 0 ? void 0 : _WRAPPED_NATIVE_CURRE.address; // If any of these arguments aren't provided, then we cannot generate wrap cost info
          if (!(!wethAddress || !usdCostPerGas)) {
            _context2.next = 6;
            break;
          }
          return _context2.abrupt("return", {
            needsWrap: false
          });
        case 6:
          _context2.prev = 6;
          wethContract = getContract.getContract(wethAddress, weth, provider, account);
          _context2.next = 10;
          return wethContract.populateTransaction.deposit({
            value: amount
          });
        case 10:
          wethTx = _context2.sent;
          _context2.next = 13;
          return provider.estimateGas(_objectSpread({
            from: account
          }, wethTx));
        case 13:
          wrapGasUseEstimate = _context2.sent.toNumber();
          _context2.next = 19;
          break;
        case 16:
          _context2.prev = 16;
          _context2.t0 = _context2["catch"](6);
          wrapGasUseEstimate = WRAP_FALLBACK_GAS_LIMIT;
        case 19:
          return _context2.abrupt("return", {
            needsWrap: true,
            wrapGasEstimateUSD: wrapGasUseEstimate * usdCostPerGas
          });
        case 20:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[6, 16]]);
  }));
  return _getWrapInfo.apply(this, arguments);
}

exports.getApproveInfo = getApproveInfo;
exports.getWrapInfo = getWrapInfo;
