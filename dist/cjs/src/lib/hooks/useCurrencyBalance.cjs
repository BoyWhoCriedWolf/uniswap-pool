'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var abi = require('@ethersproject/abi');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var erc20 = require('../../abis/erc20.cjs');
var JSBI = require('jsbi');
var multicall = require('./multicall.cjs');
var React = require('react');
var tokens = require('../../constants/tokens.cjs');
var useContract = require('../../hooks/useContract.cjs');
var addresses = require('../../utils/addresses.cjs');
require('@ethersproject/constants');
require('@ethersproject/contracts');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

/**
 * Returns a map of the given addresses to their eventually consistent ETH balances.
 */
function useNativeCurrencyBalances(uncheckedAddresses) {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var multicallContract = useContract.useInterfaceMulticall();
  var validAddressInputs = React.useMemo(function () {
    return uncheckedAddresses ? uncheckedAddresses.map(addresses.isAddress).filter(function (a) {
      return a !== false;
    }).sort().map(function (addr) {
      return [addr];
    }) : [];
  }, [uncheckedAddresses]);
  var results = multicall.useSingleContractMultipleData(multicallContract, "getEthBalance", validAddressInputs);
  return React.useMemo(function () {
    return validAddressInputs.reduce(function (memo, _ref, i) {
      var _results$i;
      var _ref2 = _slicedToArray__default["default"](_ref, 1),
        address = _ref2[0];
      var value = results === null || results === void 0 || (_results$i = results[i]) === null || _results$i === void 0 || (_results$i = _results$i.result) === null || _results$i === void 0 ? void 0 : _results$i[0];
      if (value && chainId) memo[address] = sdkCore.CurrencyAmount.fromRawAmount(tokens.nativeOnChain(chainId), JSBI__default["default"].BigInt(value.toString()));
      return memo;
    }, {});
  }, [validAddressInputs, chainId, results]);
}
var ERC20Interface = new abi.Interface(erc20);
var tokenBalancesGasRequirement = {
  gasRequired: 185000
};

/**
 * Returns a map of token addresses to their eventually consistent token balances for a single account.
 */
function useTokenBalancesWithLoadingIndicator(address, tokens) {
  var _useWeb3React2 = core.useWeb3React(),
    chainId = _useWeb3React2.chainId; // we cannot fetch balances cross-chain
  var validatedTokens = React.useMemo(function () {
    var _tokens$filter;
    return (_tokens$filter = tokens === null || tokens === void 0 ? void 0 : tokens.filter(function (t) {
      return addresses.isAddress(t === null || t === void 0 ? void 0 : t.address) !== false && (t === null || t === void 0 ? void 0 : t.chainId) === chainId;
    })) !== null && _tokens$filter !== void 0 ? _tokens$filter : [];
  }, [chainId, tokens]);
  var validatedTokenAddresses = React.useMemo(function () {
    return validatedTokens.map(function (vt) {
      return vt.address;
    });
  }, [validatedTokens]);
  var balances = multicall.useMultipleContractSingleData(validatedTokenAddresses, ERC20Interface, "balanceOf", React.useMemo(function () {
    return [address];
  }, [address]), tokenBalancesGasRequirement);
  var anyLoading = React.useMemo(function () {
    return balances.some(function (callState) {
      return callState.loading;
    });
  }, [balances]);
  return React.useMemo(function () {
    return [address && validatedTokens.length > 0 ? validatedTokens.reduce(function (memo, token, i) {
      var _balances$i;
      var value = balances === null || balances === void 0 || (_balances$i = balances[i]) === null || _balances$i === void 0 || (_balances$i = _balances$i.result) === null || _balances$i === void 0 ? void 0 : _balances$i[0];
      var amount = value ? JSBI__default["default"].BigInt(value.toString()) : undefined;
      if (amount) {
        memo[token.address] = sdkCore.CurrencyAmount.fromRawAmount(token, amount);
      }
      return memo;
    }, {}) : {}, anyLoading];
  }, [address, validatedTokens, anyLoading, balances]);
}
function useTokenBalances(address, tokens) {
  return useTokenBalancesWithLoadingIndicator(address, tokens)[0];
}

// get the balance for a single token/account combo
function useTokenBalance(account, token) {
  var tokenBalances = useTokenBalances(account, React.useMemo(function () {
    return [token];
  }, [token]));
  if (!token) return undefined;
  return tokenBalances[token.address];
}
function useCurrencyBalances(account, currencies) {
  var tokens = React.useMemo(function () {
    var _currencies$filter;
    return (_currencies$filter = currencies === null || currencies === void 0 ? void 0 : currencies.filter(function (currency) {
      var _currency$isToken;
      return (_currency$isToken = currency === null || currency === void 0 ? void 0 : currency.isToken) !== null && _currency$isToken !== void 0 ? _currency$isToken : false;
    })) !== null && _currencies$filter !== void 0 ? _currencies$filter : [];
  }, [currencies]);
  var _useWeb3React3 = core.useWeb3React(),
    chainId = _useWeb3React3.chainId;
  var tokenBalances = useTokenBalances(account, tokens);
  var containsETH = React.useMemo(function () {
    var _currencies$some;
    return (_currencies$some = currencies === null || currencies === void 0 ? void 0 : currencies.some(function (currency) {
      return currency === null || currency === void 0 ? void 0 : currency.isNative;
    })) !== null && _currencies$some !== void 0 ? _currencies$some : false;
  }, [currencies]);
  var ethBalance = useNativeCurrencyBalances(React.useMemo(function () {
    return containsETH ? [account] : [];
  }, [containsETH, account]));
  return React.useMemo(function () {
    var _currencies$map;
    return (_currencies$map = currencies === null || currencies === void 0 ? void 0 : currencies.map(function (currency) {
      if (!account || !currency || currency.chainId !== chainId) return undefined;
      if (currency.isToken) return tokenBalances[currency.address];
      if (currency.isNative) return ethBalance[account];
      return undefined;
    })) !== null && _currencies$map !== void 0 ? _currencies$map : [];
  }, [account, chainId, currencies, ethBalance, tokenBalances]);
}
function useCurrencyBalance(account, currency) {
  return useCurrencyBalances(account, React.useMemo(function () {
    return [currency];
  }, [currency]))[0];
}

exports["default"] = useCurrencyBalance;
exports.useCurrencyBalances = useCurrencyBalances;
exports.useNativeCurrencyBalances = useNativeCurrencyBalances;
exports.useTokenBalance = useTokenBalance;
exports.useTokenBalances = useTokenBalances;
exports.useTokenBalancesWithLoadingIndicator = useTokenBalancesWithLoadingIndicator;
