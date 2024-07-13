'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var bytes = require('@ethersproject/bytes');
var strings = require('@ethersproject/strings');
var analyticsEvents = require('@uniswap/analytics-events');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var index = require('../../analytics/index.cjs');
var chains = require('../../constants/chains.cjs');
var useContract = require('../../hooks/useContract.cjs');
var multicall = require('./multicall.cjs');
var useNativeCurrency = require('./useNativeCurrency.cjs');
var React = require('react');
var tokens = require('../../constants/tokens.cjs');
var addresses = require('../../utils/addresses.cjs');
require('@ethersproject/constants');
require('@ethersproject/contracts');
var reduxMulticall = require('@uniswap/redux-multicall');

// parse a name or symbol from a token response
var BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;
function parseStringOrBytes32(str, bytes32, defaultValue) {
  return str && str.length > 0 ? str :
  // need to check for proper bytes string and valid terminator
  bytes32 && BYTES32_REGEX.test(bytes32) && bytes.arrayify(bytes32)[31] === 0 ? strings.parseBytes32String(bytes32) : defaultValue;
}
var UNKNOWN_TOKEN_SYMBOL = "UNKNOWN";
var UNKNOWN_TOKEN_NAME = "Unknown Token";

/**
 * Returns a Token from the tokenAddress.
 * Returns null if token is loading or null was passed.
 * Returns undefined if tokenAddress is invalid or token does not exist.
 */
function useTokenFromActiveNetwork(tokenAddress) {
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var formattedAddress = addresses.isAddress(tokenAddress);
  var tokenContract = useContract.useTokenContract(formattedAddress ? formattedAddress : undefined, false);
  var tokenContractBytes32 = useContract.useBytes32TokenContract(formattedAddress ? formattedAddress : undefined, false);

  // TODO (WEB-1709): reduce this to one RPC call instead of 5
  // TODO: Fix redux-multicall so that these values do not reload.
  var tokenName = multicall.useSingleCallResult(tokenContract, "name", undefined, reduxMulticall.NEVER_RELOAD);
  var tokenNameBytes32 = multicall.useSingleCallResult(tokenContractBytes32, "name", undefined, reduxMulticall.NEVER_RELOAD);
  var symbol = multicall.useSingleCallResult(tokenContract, "symbol", undefined, reduxMulticall.NEVER_RELOAD);
  var symbolBytes32 = multicall.useSingleCallResult(tokenContractBytes32, "symbol", undefined, reduxMulticall.NEVER_RELOAD);
  var decimals = multicall.useSingleCallResult(tokenContract, "decimals", undefined, reduxMulticall.NEVER_RELOAD);
  var isLoading = React.useMemo(function () {
    return decimals.loading || symbol.loading || tokenName.loading;
  }, [decimals.loading, symbol.loading, tokenName.loading]);
  var parsedDecimals = React.useMemo(function () {
    var _decimals$result$, _decimals$result;
    return (_decimals$result$ = decimals === null || decimals === void 0 || (_decimals$result = decimals.result) === null || _decimals$result === void 0 ? void 0 : _decimals$result[0]) !== null && _decimals$result$ !== void 0 ? _decimals$result$ : tokens.DEFAULT_ERC20_DECIMALS;
  }, [decimals.result]);
  var parsedSymbol = React.useMemo(function () {
    var _symbol$result, _symbolBytes32$result;
    return parseStringOrBytes32((_symbol$result = symbol.result) === null || _symbol$result === void 0 ? void 0 : _symbol$result[0], (_symbolBytes32$result = symbolBytes32.result) === null || _symbolBytes32$result === void 0 ? void 0 : _symbolBytes32$result[0], UNKNOWN_TOKEN_SYMBOL);
  }, [symbol.result, symbolBytes32.result]);
  var parsedName = React.useMemo(function () {
    var _tokenName$result, _tokenNameBytes32$res;
    return parseStringOrBytes32((_tokenName$result = tokenName.result) === null || _tokenName$result === void 0 ? void 0 : _tokenName$result[0], (_tokenNameBytes32$res = tokenNameBytes32.result) === null || _tokenNameBytes32$res === void 0 ? void 0 : _tokenNameBytes32$res[0], UNKNOWN_TOKEN_NAME);
  }, [tokenName.result, tokenNameBytes32.result]);
  return React.useMemo(function () {
    // If the token is on another chain, we cannot fetch it on-chain, and it is invalid.
    if (typeof tokenAddress !== "string" || !chains.isSupportedChain(chainId) || !formattedAddress) return undefined;
    if (isLoading || !chainId) return null;
    return new sdkCore.Token(chainId, formattedAddress, parsedDecimals, parsedSymbol, parsedName);
  }, [chainId, tokenAddress, formattedAddress, isLoading, parsedDecimals, parsedSymbol, parsedName]);
}
/**
 * Returns a Token from the tokenAddress.
 * Returns null if token is loading or null was passed.
 * Returns undefined if tokenAddress is invalid or token does not exist.
 */
function useTokenFromMapOrNetwork(tokens, tokenAddress) {
  var address = addresses.isAddress(tokenAddress);
  var token = address ? tokens[address] : undefined;
  var tokenFromNetwork = useTokenFromActiveNetwork(token ? undefined : address ? address : undefined);
  React.useEffect(function () {
    if (tokenFromNetwork) {
      index.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.WALLET_PROVIDER_USED, {
        source: "useTokenFromActiveNetwork",
        token: tokenFromNetwork
      });
    }
  }, [tokenFromNetwork]);
  return tokenFromNetwork !== null && tokenFromNetwork !== void 0 ? tokenFromNetwork : token;
}

/**
 * Returns a Currency from the currencyId.
 * Returns null if currency is loading or null was passed.
 * Returns undefined if currencyId is invalid or token does not exist.
 */
function useCurrencyFromMap(tokens$1, chainId, currencyId) {
  var _wrappedNative$addres;
  var nativeCurrency = useNativeCurrency(chainId);
  var isNative = Boolean(nativeCurrency && (currencyId === null || currencyId === void 0 ? void 0 : currencyId.toUpperCase()) === "ETH");
  var shorthandMatchAddress = React.useMemo(function () {
    var _TOKEN_SHORTHANDS$cur;
    var chain = chains.asSupportedChain(chainId);
    return chain && currencyId ? (_TOKEN_SHORTHANDS$cur = tokens.TOKEN_SHORTHANDS[currencyId.toUpperCase()]) === null || _TOKEN_SHORTHANDS$cur === void 0 ? void 0 : _TOKEN_SHORTHANDS$cur[chain] : undefined;
  }, [chainId, currencyId]);
  var token = useTokenFromMapOrNetwork(tokens$1, isNative ? undefined : shorthandMatchAddress !== null && shorthandMatchAddress !== void 0 ? shorthandMatchAddress : currencyId);
  if (currencyId === null || currencyId === undefined || !chains.isSupportedChain(chainId)) return;

  // this case so we use our builtin wrapped token instead of wrapped tokens on token lists
  var wrappedNative = nativeCurrency === null || nativeCurrency === void 0 ? void 0 : nativeCurrency.wrapped;
  if ((wrappedNative === null || wrappedNative === void 0 || (_wrappedNative$addres = wrappedNative.address) === null || _wrappedNative$addres === void 0 ? void 0 : _wrappedNative$addres.toUpperCase()) === (currencyId === null || currencyId === void 0 ? void 0 : currencyId.toUpperCase())) return wrappedNative;
  return isNative ? nativeCurrency : token;
}

exports.UNKNOWN_TOKEN_SYMBOL = UNKNOWN_TOKEN_SYMBOL;
exports.useCurrencyFromMap = useCurrencyFromMap;
exports.useTokenFromActiveNetwork = useTokenFromActiveNetwork;
exports.useTokenFromMapOrNetwork = useTokenFromMapOrNetwork;
