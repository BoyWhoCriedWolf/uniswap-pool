import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { InterfaceEventName } from '@uniswap/analytics-events';
import { ChainId, Percent } from '@uniswap/sdk-core';
import { WETH_ADDRESS as WETH_ADDRESS$1 } from '@uniswap/universal-router-sdk';
import { useWeb3React } from '@web3-react/core';
import FOT_DETECTOR_ABI from '../abis/fee-on-transfer-detector.json.js';
import { sendAnalyticsEvent } from '../analytics/index.js';
import { ZERO_PERCENT } from '../constants/misc.js';
import { useState, useEffect } from 'react';
import { useContract } from './useContract.js';

var FEE_ON_TRANSFER_DETECTOR_ADDRESS = "0x19C97dc2a25845C7f9d1d519c8C2d4809c58b43f";
function useFeeOnTransferDetectorContract() {
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;
  var contract = useContract(FEE_ON_TRANSFER_DETECTOR_ADDRESS, FOT_DETECTOR_ABI);
  useEffect(function () {
    if (contract && account) {
      sendAnalyticsEvent(InterfaceEventName.WALLET_PROVIDER_USED, {
        source: "useFeeOnTransferDetectorContract",
        contract: contract
      });
    }
  }, [account, contract]);
  return contract;
}

// TODO(WEB-2787): add tax-fetching for other chains
var WETH_ADDRESS = WETH_ADDRESS$1(ChainId.MAINNET);
var AMOUNT_TO_BORROW = 10000; // smallest amount that has full precision over bps

var FEE_CACHE = {};
function getSwapTaxes(_x, _x2, _x3) {
  return _getSwapTaxes.apply(this, arguments);
}
function _getSwapTaxes() {
  _getSwapTaxes = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(fotDetector, inputTokenAddress, outputTokenAddress) {
    var _ref, _FEE_CACHE$inputToken, _ref2, _FEE_CACHE$outputToke;
    var addresses, data, inputTax, outputTax;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          addresses = [];
          if (inputTokenAddress && FEE_CACHE[inputTokenAddress] === undefined) {
            addresses.push(inputTokenAddress);
          }
          if (outputTokenAddress && FEE_CACHE[outputTokenAddress] === undefined) {
            addresses.push(outputTokenAddress);
          }
          _context.prev = 3;
          if (!addresses.length) {
            _context.next = 9;
            break;
          }
          _context.next = 7;
          return fotDetector.callStatic.batchValidate(addresses, WETH_ADDRESS, AMOUNT_TO_BORROW);
        case 7:
          data = _context.sent;
          addresses.forEach(function (address, index) {
            var _data$index = data[index],
              sellFeeBps = _data$index.sellFeeBps,
              buyFeeBps = _data$index.buyFeeBps;
            var sellTax = new Percent(sellFeeBps.toNumber(), 10000);
            var buyTax = new Percent(buyFeeBps.toNumber(), 10000);
            FEE_CACHE[address] = {
              sellTax: sellTax,
              buyTax: buyTax
            };
          });
        case 9:
          _context.next = 14;
          break;
        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](3);
          console.warn("Failed to get swap taxes for token(s):", addresses, _context.t0);
        case 14:
          inputTax = (_ref = inputTokenAddress ? (_FEE_CACHE$inputToken = FEE_CACHE[inputTokenAddress]) === null || _FEE_CACHE$inputToken === void 0 ? void 0 : _FEE_CACHE$inputToken.sellTax : ZERO_PERCENT) !== null && _ref !== void 0 ? _ref : ZERO_PERCENT;
          outputTax = (_ref2 = outputTokenAddress ? (_FEE_CACHE$outputToke = FEE_CACHE[outputTokenAddress]) === null || _FEE_CACHE$outputToke === void 0 ? void 0 : _FEE_CACHE$outputToke.buyTax : ZERO_PERCENT) !== null && _ref2 !== void 0 ? _ref2 : ZERO_PERCENT;
          return _context.abrupt("return", {
            inputTax: inputTax,
            outputTax: outputTax
          });
        case 17:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[3, 11]]);
  }));
  return _getSwapTaxes.apply(this, arguments);
}
function useSwapTaxes(inputTokenAddress, outputTokenAddress) {
  var fotDetector = useFeeOnTransferDetectorContract();
  var _useState = useState({
      inputTax: ZERO_PERCENT,
      outputTax: ZERO_PERCENT
    }),
    _useState2 = _slicedToArray(_useState, 2),
    _useState2$ = _useState2[0],
    inputTax = _useState2$.inputTax,
    outputTax = _useState2$.outputTax,
    setTaxes = _useState2[1];
  var _useWeb3React2 = useWeb3React(),
    chainId = _useWeb3React2.chainId;
  useEffect(function () {
    if (!fotDetector || chainId !== ChainId.MAINNET) return;
    getSwapTaxes(fotDetector, inputTokenAddress, outputTokenAddress).then(setTaxes);
  }, [fotDetector, inputTokenAddress, outputTokenAddress, chainId]);
  return {
    inputTax: inputTax,
    outputTax: outputTax
  };
}

export { useSwapTaxes };
