import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import MerkleDistributorJSON from '../../../node_modules/@uniswap/merkle-distributor/build/MerkleDistributor.json.js';
import { CurrencyAmount, MERKLE_DISTRIBUTOR_ADDRESS } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import JSBI from 'jsbi';
import { useSingleCallResult } from '../../lib/hooks/multicall.js';
import { useState, useEffect } from 'react';
import { UNI } from '../../constants/tokens.js';
import { useContract } from '../../hooks/useContract.js';
import { isAddress } from '../../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import { calculateGasMargin } from '../../utils/calculateGasMargin.js';
import { useTransactionAdder } from '../transactions/hooks.js';
import { TransactionType } from '../transactions/types.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function useMerkleDistributorContract() {
  return useContract(MERKLE_DISTRIBUTOR_ADDRESS, MerkleDistributorJSON.abi, true);
}
var FETCH_CLAIM_MAPPING_PROMISE = null;
function fetchClaimMapping() {
  var _FETCH_CLAIM_MAPPING_;
  return (_FETCH_CLAIM_MAPPING_ = FETCH_CLAIM_MAPPING_PROMISE) !== null && _FETCH_CLAIM_MAPPING_ !== void 0 ? _FETCH_CLAIM_MAPPING_ : FETCH_CLAIM_MAPPING_PROMISE = fetch("https://raw.githubusercontent.com/Uniswap/mrkl-drop-data-chunks/final/chunks/mapping.json").then(function (res) {
    return res.json();
  })["catch"](function (error) {
    console.error("Failed to get claims mapping", error);
    FETCH_CLAIM_MAPPING_PROMISE = null;
  });
}
var FETCH_CLAIM_FILE_PROMISES = {};
function fetchClaimFile(key) {
  var _FETCH_CLAIM_FILE_PRO;
  return (_FETCH_CLAIM_FILE_PRO = FETCH_CLAIM_FILE_PROMISES[key]) !== null && _FETCH_CLAIM_FILE_PRO !== void 0 ? _FETCH_CLAIM_FILE_PRO : FETCH_CLAIM_FILE_PROMISES[key] = fetch("https://raw.githubusercontent.com/Uniswap/mrkl-drop-data-chunks/final/chunks/".concat(key, ".json")).then(function (res) {
    return res.json();
  })["catch"](function (error) {
    console.error("Failed to get claim file mapping for starting address ".concat(key), error);
    delete FETCH_CLAIM_FILE_PROMISES[key];
  });
}
var FETCH_CLAIM_PROMISES = {};
// returns the claim for the given address, or null if not valid
function fetchClaim(account) {
  var _FETCH_CLAIM_PROMISES;
  var formatted = isAddress(account);
  if (!formatted) return Promise.reject(new Error("Invalid address"));
  return (_FETCH_CLAIM_PROMISES = FETCH_CLAIM_PROMISES[account]) !== null && _FETCH_CLAIM_PROMISES !== void 0 ? _FETCH_CLAIM_PROMISES : FETCH_CLAIM_PROMISES[account] = fetchClaimMapping().then(function (mapping) {
    var sorted = Object.keys(mapping).sort(function (a, b) {
      return a.toLowerCase() < b.toLowerCase() ? -1 : 1;
    });
    var _iterator = _createForOfIteratorHelper(sorted),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _startingAddress = _step.value;
        var lastAddress = mapping[_startingAddress];
        if (_startingAddress.toLowerCase() <= formatted.toLowerCase()) {
          if (formatted.toLowerCase() <= lastAddress.toLowerCase()) {
            return _startingAddress;
          }
        } else {
          throw new Error("Claim for ".concat(formatted, " was not found in partial search"));
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    throw new Error("Claim for ".concat(formatted, " was not found after searching all mappings"));
  }).then(fetchClaimFile).then(function (result) {
    if (result[formatted]) return result[formatted];
    throw new Error("Claim for ".concat(formatted, " was not found in claim file!"));
  })["catch"](function (error) {
    console.debug("Claim fetch failed", error);
    throw error;
  });
}

// parse distributorContract blob and detect if user has claim data
// null means we know it does not
function useUserClaimData(account) {
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _useState = useState({}),
    _useState2 = _slicedToArray(_useState, 2),
    claimInfo = _useState2[0],
    setClaimInfo = _useState2[1];
  useEffect(function () {
    if (!account || chainId !== 1) return;
    fetchClaim(account).then(function (accountClaimInfo) {
      return setClaimInfo(function (claimInfo) {
        return _objectSpread(_objectSpread({}, claimInfo), {}, _defineProperty({}, account, accountClaimInfo));
      });
    })["catch"](function () {
      setClaimInfo(function (claimInfo) {
        return _objectSpread(_objectSpread({}, claimInfo), {}, _defineProperty({}, account, null));
      });
    });
  }, [account, chainId]);
  return account && chainId === 1 ? claimInfo[account] : null;
}

// check if user is in blob and has not yet claimed UNI
function useUserHasAvailableClaim(account) {
  var _isClaimedResult$resu;
  var userClaimData = useUserClaimData(account);
  var distributorContract = useMerkleDistributorContract();
  var isClaimedResult = useSingleCallResult(distributorContract, "isClaimed", [userClaimData === null || userClaimData === void 0 ? void 0 : userClaimData.index]);
  // user is in blob and contract marks as unclaimed
  return Boolean(userClaimData && !isClaimedResult.loading && ((_isClaimedResult$resu = isClaimedResult.result) === null || _isClaimedResult$resu === void 0 ? void 0 : _isClaimedResult$resu[0]) === false);
}
function useUserUnclaimedAmount(account) {
  var _useWeb3React2 = useWeb3React(),
    chainId = _useWeb3React2.chainId;
  var userClaimData = useUserClaimData(account);
  var canClaim = useUserHasAvailableClaim(account);
  var uni = chainId ? UNI[chainId] : undefined;
  if (!uni) return undefined;
  if (!canClaim || !userClaimData) {
    return CurrencyAmount.fromRawAmount(uni, JSBI.BigInt(0));
  }
  return CurrencyAmount.fromRawAmount(uni, JSBI.BigInt(userClaimData.amount));
}
function useClaimCallback(account) {
  // get claim data for this account
  var _useWeb3React3 = useWeb3React(),
    provider = _useWeb3React3.provider,
    chainId = _useWeb3React3.chainId;
  var claimData = useUserClaimData(account);

  // used for popup summary
  var unclaimedAmount = useUserUnclaimedAmount(account);
  var addTransaction = useTransactionAdder();
  var distributorContract = useMerkleDistributorContract();
  var claimCallback = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
      var _distributorContract$;
      var args;
      return _regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            if (!(!claimData || !account || !provider || !chainId || !distributorContract)) {
              _context.next = 2;
              break;
            }
            return _context.abrupt("return");
          case 2:
            args = [claimData.index, account, claimData.amount, claimData.proof];
            return _context.abrupt("return", (_distributorContract$ = distributorContract.estimateGas)["claim"].apply(_distributorContract$, args.concat([{}])).then(function (estimatedGasLimit) {
              return distributorContract.claim.apply(distributorContract, args.concat([{
                value: null,
                gasLimit: calculateGasMargin(estimatedGasLimit)
              }])).then(function (response) {
                addTransaction(response, {
                  type: TransactionType.CLAIM,
                  recipient: account,
                  uniAmountRaw: unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.quotient.toString()
                });
                return response.hash;
              });
            }));
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function claimCallback() {
      return _ref.apply(this, arguments);
    };
  }();
  return {
    claimCallback: claimCallback
  };
}

export { useClaimCallback, useUserHasAvailableClaim, useUserUnclaimedAmount };
