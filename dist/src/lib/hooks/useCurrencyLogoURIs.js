import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import { ChainId } from '@uniswap/sdk-core';
import useHttpLocations from '../../hooks/useHttpLocations.js';
import { useMemo } from 'react';
import { isAddress } from '../../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import EthereumLogo from '../../assets/images/ethereum-logo.png.js';
import AvaxLogo from '../../assets/svg/avax_logo.svg.js';
import BnbLogo from '../../assets/svg/bnb-logo.svg.js';
import celoLogo from '../../assets/svg/celo_logo.svg.js';
import MaticLogo from '../../assets/svg/matic-token-icon.svg.js';
import { NATIVE_CHAIN_ID, isCelo, nativeOnChain } from '../../constants/tokens.js';

function chainIdToNetworkName(networkId) {
  switch (networkId) {
    case ChainId.MAINNET:
      return "ethereum";
    case ChainId.ARBITRUM_ONE:
      return "arbitrum";
    case ChainId.OPTIMISM:
      return "optimism";
    case ChainId.POLYGON:
      return "polygon";
    case ChainId.BNB:
      return "smartchain";
    case ChainId.CELO:
      return "celo";
    case ChainId.AVALANCHE:
      return "avalanchec";
    default:
      return "ethereum";
  }
}
function getNativeLogoURI() {
  var chainId = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ChainId.MAINNET;
  switch (chainId) {
    case ChainId.POLYGON:
    case ChainId.POLYGON_MUMBAI:
      return MaticLogo;
    case ChainId.BNB:
      return BnbLogo;
    case ChainId.CELO:
    case ChainId.CELO_ALFAJORES:
      return celoLogo;
    case ChainId.AVALANCHE:
      return AvaxLogo;
    default:
      return EthereumLogo;
  }
}
function getTokenLogoURI(address) {
  var chainId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : ChainId.MAINNET;
  var networkName = chainIdToNetworkName(chainId);
  var networksWithUrls = [ChainId.ARBITRUM_ONE, ChainId.MAINNET, ChainId.OPTIMISM, ChainId.BNB, ChainId.AVALANCHE];
  if (isCelo(chainId) && address === nativeOnChain(chainId).wrapped.address) {
    return celoLogo;
  }
  if (networksWithUrls.includes(chainId)) {
    return "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/".concat(networkName, "/assets/").concat(address, "/logo.png");
  }
}
function useCurrencyLogoURIs(currency) {
  var locations = useHttpLocations(currency === null || currency === void 0 ? void 0 : currency.logoURI);
  return useMemo(function () {
    var logoURIs = _toConsumableArray(locations);
    if (currency) {
      if (currency.isNative || currency.address === NATIVE_CHAIN_ID) {
        logoURIs.push(getNativeLogoURI(currency.chainId));
      } else if (currency.isToken || currency.address) {
        var checksummedAddress = isAddress(currency.address);
        var logoURI = checksummedAddress && getTokenLogoURI(checksummedAddress, currency.chainId);
        if (logoURI) {
          logoURIs.push(logoURI);
        }
      }
    }
    return logoURIs;
  }, [currency, locations]);
}

export { chainIdToNetworkName, useCurrencyLogoURIs as default, getNativeLogoURI };
