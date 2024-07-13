import { arrayify } from '@ethersproject/bytes';
import { parseBytes32String } from '@ethersproject/strings';
import { InterfaceEventName } from '@uniswap/analytics-events';
import { Token } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import { sendAnalyticsEvent } from '../../analytics/index.js';
import { isSupportedChain, asSupportedChain } from '../../constants/chains.js';
import { useTokenContract, useBytes32TokenContract } from '../../hooks/useContract.js';
import { useSingleCallResult } from './multicall.js';
import useNativeCurrency from './useNativeCurrency.js';
import { useEffect, useMemo } from 'react';
import { DEFAULT_ERC20_DECIMALS, TOKEN_SHORTHANDS } from '../../constants/tokens.js';
import { isAddress } from '../../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import { NEVER_RELOAD } from '@uniswap/redux-multicall';

// parse a name or symbol from a token response
var BYTES32_REGEX = /^0x[a-fA-F0-9]{64}$/;
function parseStringOrBytes32(str, bytes32, defaultValue) {
  return str && str.length > 0 ? str :
  // need to check for proper bytes string and valid terminator
  bytes32 && BYTES32_REGEX.test(bytes32) && arrayify(bytes32)[31] === 0 ? parseBytes32String(bytes32) : defaultValue;
}
var UNKNOWN_TOKEN_SYMBOL = "UNKNOWN";
var UNKNOWN_TOKEN_NAME = "Unknown Token";

/**
 * Returns a Token from the tokenAddress.
 * Returns null if token is loading or null was passed.
 * Returns undefined if tokenAddress is invalid or token does not exist.
 */
function useTokenFromActiveNetwork(tokenAddress) {
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var formattedAddress = isAddress(tokenAddress);
  var tokenContract = useTokenContract(formattedAddress ? formattedAddress : undefined, false);
  var tokenContractBytes32 = useBytes32TokenContract(formattedAddress ? formattedAddress : undefined, false);

  // TODO (WEB-1709): reduce this to one RPC call instead of 5
  // TODO: Fix redux-multicall so that these values do not reload.
  var tokenName = useSingleCallResult(tokenContract, "name", undefined, NEVER_RELOAD);
  var tokenNameBytes32 = useSingleCallResult(tokenContractBytes32, "name", undefined, NEVER_RELOAD);
  var symbol = useSingleCallResult(tokenContract, "symbol", undefined, NEVER_RELOAD);
  var symbolBytes32 = useSingleCallResult(tokenContractBytes32, "symbol", undefined, NEVER_RELOAD);
  var decimals = useSingleCallResult(tokenContract, "decimals", undefined, NEVER_RELOAD);
  var isLoading = useMemo(function () {
    return decimals.loading || symbol.loading || tokenName.loading;
  }, [decimals.loading, symbol.loading, tokenName.loading]);
  var parsedDecimals = useMemo(function () {
    var _decimals$result$, _decimals$result;
    return (_decimals$result$ = decimals === null || decimals === void 0 || (_decimals$result = decimals.result) === null || _decimals$result === void 0 ? void 0 : _decimals$result[0]) !== null && _decimals$result$ !== void 0 ? _decimals$result$ : DEFAULT_ERC20_DECIMALS;
  }, [decimals.result]);
  var parsedSymbol = useMemo(function () {
    var _symbol$result, _symbolBytes32$result;
    return parseStringOrBytes32((_symbol$result = symbol.result) === null || _symbol$result === void 0 ? void 0 : _symbol$result[0], (_symbolBytes32$result = symbolBytes32.result) === null || _symbolBytes32$result === void 0 ? void 0 : _symbolBytes32$result[0], UNKNOWN_TOKEN_SYMBOL);
  }, [symbol.result, symbolBytes32.result]);
  var parsedName = useMemo(function () {
    var _tokenName$result, _tokenNameBytes32$res;
    return parseStringOrBytes32((_tokenName$result = tokenName.result) === null || _tokenName$result === void 0 ? void 0 : _tokenName$result[0], (_tokenNameBytes32$res = tokenNameBytes32.result) === null || _tokenNameBytes32$res === void 0 ? void 0 : _tokenNameBytes32$res[0], UNKNOWN_TOKEN_NAME);
  }, [tokenName.result, tokenNameBytes32.result]);
  return useMemo(function () {
    // If the token is on another chain, we cannot fetch it on-chain, and it is invalid.
    if (typeof tokenAddress !== "string" || !isSupportedChain(chainId) || !formattedAddress) return undefined;
    if (isLoading || !chainId) return null;
    return new Token(chainId, formattedAddress, parsedDecimals, parsedSymbol, parsedName);
  }, [chainId, tokenAddress, formattedAddress, isLoading, parsedDecimals, parsedSymbol, parsedName]);
}
/**
 * Returns a Token from the tokenAddress.
 * Returns null if token is loading or null was passed.
 * Returns undefined if tokenAddress is invalid or token does not exist.
 */
function useTokenFromMapOrNetwork(tokens, tokenAddress) {
  var address = isAddress(tokenAddress);
  var token = address ? tokens[address] : undefined;
  var tokenFromNetwork = useTokenFromActiveNetwork(token ? undefined : address ? address : undefined);
  useEffect(function () {
    if (tokenFromNetwork) {
      sendAnalyticsEvent(InterfaceEventName.WALLET_PROVIDER_USED, {
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
function useCurrencyFromMap(tokens, chainId, currencyId) {
  var _wrappedNative$addres;
  var nativeCurrency = useNativeCurrency(chainId);
  var isNative = Boolean(nativeCurrency && (currencyId === null || currencyId === void 0 ? void 0 : currencyId.toUpperCase()) === "ETH");
  var shorthandMatchAddress = useMemo(function () {
    var _TOKEN_SHORTHANDS$cur;
    var chain = asSupportedChain(chainId);
    return chain && currencyId ? (_TOKEN_SHORTHANDS$cur = TOKEN_SHORTHANDS[currencyId.toUpperCase()]) === null || _TOKEN_SHORTHANDS$cur === void 0 ? void 0 : _TOKEN_SHORTHANDS$cur[chain] : undefined;
  }, [chainId, currencyId]);
  var token = useTokenFromMapOrNetwork(tokens, isNative ? undefined : shorthandMatchAddress !== null && shorthandMatchAddress !== void 0 ? shorthandMatchAddress : currencyId);
  if (currencyId === null || currencyId === undefined || !isSupportedChain(chainId)) return;

  // this case so we use our builtin wrapped token instead of wrapped tokens on token lists
  var wrappedNative = nativeCurrency === null || nativeCurrency === void 0 ? void 0 : nativeCurrency.wrapped;
  if ((wrappedNative === null || wrappedNative === void 0 || (_wrappedNative$addres = wrappedNative.address) === null || _wrappedNative$addres === void 0 ? void 0 : _wrappedNative$addres.toUpperCase()) === (currencyId === null || currencyId === void 0 ? void 0 : currencyId.toUpperCase())) return wrappedNative;
  return isNative ? nativeCurrency : token;
}

export { UNKNOWN_TOKEN_SYMBOL, useCurrencyFromMap, useTokenFromActiveNetwork, useTokenFromMapOrNetwork };
