'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var sdkCore = require('@uniswap/sdk-core');
var useHttpLocations = require('../../hooks/useHttpLocations.cjs');
var React = require('react');
var addresses = require('../../utils/addresses.cjs');
require('@ethersproject/constants');
require('@ethersproject/contracts');
var ethereumLogo = require('../../assets/images/ethereum-logo.cjs');
var avax_logo = require('../../assets/svg/avax_logo.cjs');
var bnbLogo = require('../../assets/svg/bnb-logo.cjs');
var celo_logo = require('../../assets/svg/celo_logo.cjs');
var maticTokenIcon = require('../../assets/svg/matic-token-icon.cjs');
var tokens = require('../../constants/tokens.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

function chainIdToNetworkName(networkId) {
  switch (networkId) {
    case sdkCore.ChainId.MAINNET:
      return "ethereum";
    case sdkCore.ChainId.ARBITRUM_ONE:
      return "arbitrum";
    case sdkCore.ChainId.OPTIMISM:
      return "optimism";
    case sdkCore.ChainId.POLYGON:
      return "polygon";
    case sdkCore.ChainId.BNB:
      return "smartchain";
    case sdkCore.ChainId.CELO:
      return "celo";
    case sdkCore.ChainId.AVALANCHE:
      return "avalanchec";
    default:
      return "ethereum";
  }
}
function getNativeLogoURI() {
  var chainId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : sdkCore.ChainId.MAINNET;
  switch (chainId) {
    case sdkCore.ChainId.POLYGON:
    case sdkCore.ChainId.POLYGON_MUMBAI:
      return maticTokenIcon;
    case sdkCore.ChainId.BNB:
      return bnbLogo;
    case sdkCore.ChainId.CELO:
    case sdkCore.ChainId.CELO_ALFAJORES:
      return celo_logo;
    case sdkCore.ChainId.AVALANCHE:
      return avax_logo;
    default:
      return ethereumLogo;
  }
}
function getTokenLogoURI(address) {
  var chainId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : sdkCore.ChainId.MAINNET;
  var networkName = chainIdToNetworkName(chainId);
  var networksWithUrls = [sdkCore.ChainId.ARBITRUM_ONE, sdkCore.ChainId.MAINNET, sdkCore.ChainId.OPTIMISM, sdkCore.ChainId.BNB, sdkCore.ChainId.AVALANCHE];
  if (tokens.isCelo(chainId) && address === tokens.nativeOnChain(chainId).wrapped.address) {
    return celo_logo;
  }
  if (networksWithUrls.includes(chainId)) {
    return "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/".concat(networkName, "/assets/").concat(address, "/logo.png");
  }
}
function useCurrencyLogoURIs(currency) {
  var locations = useHttpLocations(currency === null || currency === void 0 ? void 0 : currency.logoURI);
  return React.useMemo(function () {
    var logoURIs = _toConsumableArray__default["default"](locations);
    if (currency) {
      if (currency.isNative || currency.address === tokens.NATIVE_CHAIN_ID) {
        logoURIs.push(getNativeLogoURI(currency.chainId));
      } else if (currency.isToken || currency.address) {
        var checksummedAddress = addresses.isAddress(currency.address);
        var logoURI = checksummedAddress && getTokenLogoURI(checksummedAddress, currency.chainId);
        if (logoURI) {
          logoURIs.push(logoURI);
        }
      }
    }
    return logoURIs;
  }, [currency, locations]);
}

exports.chainIdToNetworkName = chainIdToNetworkName;
exports["default"] = useCurrencyLogoURIs;
exports.getNativeLogoURI = getNativeLogoURI;
