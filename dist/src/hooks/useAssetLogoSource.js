import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import tokenLogoLookup from '../constants/tokenLogoLookup.js';
import { isCelo, nativeOnChain } from '../constants/tokens.js';
import { checkWarning, WARNING_LEVEL } from '../constants/tokenSafety.js';
import { getNativeLogoURI, chainIdToNetworkName } from '../lib/hooks/useCurrencyLogoURIs.js';
import uriToHttp from '../lib/utils/uriToHttp.js';
import { useState, useEffect, useCallback } from 'react';
import { isAddress } from '../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import celoLogo from '../assets/svg/celo_logo.svg.js';

var BAD_SRCS = {};

// Converts uri's into fetchable urls
function parseLogoSources(uris) {
  var urls = [];
  uris.forEach(function (uri) {
    return urls.push.apply(urls, _toConsumableArray(uriToHttp(uri)));
  });
  return urls;
}

// Parses uri's, favors non-coingecko images, and improves coingecko logo quality
function prioritizeLogoSources(uris) {
  var parsedUris = uris.map(function (uri) {
    return uriToHttp(uri);
  }).flat(1);
  var preferredUris = [];

  // Consolidate duplicate coingecko urls into one fallback source
  var coingeckoUrl = undefined;
  parsedUris.forEach(function (uri) {
    if (uri.startsWith("https://assets.coingecko")) {
      if (!coingeckoUrl) {
        coingeckoUrl = uri.replace(/small|thumb/g, "large");
      }
    } else {
      preferredUris.push(uri);
    }
  });
  // Places coingecko urls in the back of the source array
  return coingeckoUrl ? [].concat(preferredUris, [coingeckoUrl]) : preferredUris;
}
function getInitialUrl(address, chainId, isNative, backupImg) {
  if (chainId && isNative) return getNativeLogoURI(chainId);
  var networkName = chainId ? chainIdToNetworkName(chainId) : "ethereum";
  var checksummedAddress = isAddress(address);
  if (chainId && isCelo(chainId) && address === nativeOnChain(chainId).wrapped.address) {
    return celoLogo;
  }
  if (checksummedAddress) {
    return "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/".concat(networkName, "/assets/").concat(checksummedAddress, "/logo.png");
  } else {
    return backupImg !== null && backupImg !== void 0 ? backupImg : undefined;
  }
}
function useAssetLogoSource(address, chainId, isNative, backupImg) {
  var _checkWarning;
  var hideLogo = Boolean(address && ((_checkWarning = checkWarning(address, chainId)) === null || _checkWarning === void 0 ? void 0 : _checkWarning.level) === WARNING_LEVEL.BLOCKED);
  var _useState = useState(hideLogo ? undefined : getInitialUrl(address, chainId, isNative, backupImg)),
    _useState2 = _slicedToArray(_useState, 2),
    current = _useState2[0],
    setCurrent = _useState2[1];
  var _useState3 = useState(undefined),
    _useState4 = _slicedToArray(_useState3, 2),
    fallbackSrcs = _useState4[0],
    setFallbackSrcs = _useState4[1];
  useEffect(function () {
    if (hideLogo) return;
    setCurrent(getInitialUrl(address, chainId, isNative));
    setFallbackSrcs(undefined);
  }, [address, chainId, hideLogo, isNative]);
  var nextSrc = useCallback(function () {
    if (current) {
      BAD_SRCS[current] = true;
    }
    // Parses and stores logo sources from tokenlists if assets repo url fails
    if (!fallbackSrcs) {
      var _tokenLogoLookup$getI;
      var uris = (_tokenLogoLookup$getI = tokenLogoLookup.getIcons(address, chainId)) !== null && _tokenLogoLookup$getI !== void 0 ? _tokenLogoLookup$getI : [];
      if (backupImg) uris.push(backupImg);
      var tokenListIcons = prioritizeLogoSources(parseLogoSources(uris));
      setCurrent(tokenListIcons.find(function (src) {
        return !BAD_SRCS[src];
      }));
      setFallbackSrcs(tokenListIcons);
    } else {
      setCurrent(fallbackSrcs.find(function (src) {
        return !BAD_SRCS[src];
      }));
    }
  }, [current, fallbackSrcs, address, chainId, backupImg]);
  return [current, nextSrc];
}

export { useAssetLogoSource as default };
