'use strict';

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var tokenLogoLookup = require('../constants/tokenLogoLookup.cjs');
var tokens = require('../constants/tokens.cjs');
var tokenSafety = require('../constants/tokenSafety.cjs');
var useCurrencyLogoURIs = require('../lib/hooks/useCurrencyLogoURIs.cjs');
var uriToHttp = require('../lib/utils/uriToHttp.cjs');
var React = require('react');
var addresses = require('../utils/addresses.cjs');
require('@ethersproject/constants');
require('@ethersproject/contracts');
var celo_logo = require('../assets/svg/celo_logo.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

var BAD_SRCS = {};

// Converts uri's into fetchable urls
function parseLogoSources(uris) {
  var urls = [];
  uris.forEach(function (uri) {
    return urls.push.apply(urls, _toConsumableArray__default["default"](uriToHttp(uri)));
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
  if (chainId && isNative) return useCurrencyLogoURIs.getNativeLogoURI(chainId);
  var networkName = chainId ? useCurrencyLogoURIs.chainIdToNetworkName(chainId) : "ethereum";
  var checksummedAddress = addresses.isAddress(address);
  if (chainId && tokens.isCelo(chainId) && address === tokens.nativeOnChain(chainId).wrapped.address) {
    return celo_logo;
  }
  if (checksummedAddress) {
    return "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/".concat(networkName, "/assets/").concat(checksummedAddress, "/logo.png");
  } else {
    return backupImg !== null && backupImg !== void 0 ? backupImg : undefined;
  }
}
function useAssetLogoSource(address, chainId, isNative, backupImg) {
  var _checkWarning;
  var hideLogo = Boolean(address && ((_checkWarning = tokenSafety.checkWarning(address, chainId)) === null || _checkWarning === void 0 ? void 0 : _checkWarning.level) === tokenSafety.WARNING_LEVEL.BLOCKED);
  var _useState = React.useState(hideLogo ? undefined : getInitialUrl(address, chainId, isNative, backupImg)),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    current = _useState2[0],
    setCurrent = _useState2[1];
  var _useState3 = React.useState(undefined),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    fallbackSrcs = _useState4[0],
    setFallbackSrcs = _useState4[1];
  React.useEffect(function () {
    if (hideLogo) return;
    setCurrent(getInitialUrl(address, chainId, isNative));
    setFallbackSrcs(undefined);
  }, [address, chainId, hideLogo, isNative]);
  var nextSrc = React.useCallback(function () {
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

module.exports = useAssetLogoSource;
