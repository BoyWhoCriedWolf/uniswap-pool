'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var analyticsEvents = require('@uniswap/analytics-events');
var sdkCore = require('@uniswap/sdk-core');
var TickLens = require('../../node_modules/@uniswap/v3-periphery/artifacts/contracts/lens/TickLens.sol/TickLens.cjs');
var UniswapInterfaceMulticall = require('../../node_modules/@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.cjs');
var NonfungiblePositionManager = require('../../node_modules/@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.cjs');
var core = require('@web3-react/core');
var argentWalletDetector = require('../abis/argent-wallet-detector.cjs');
var ensPublicResolver = require('../abis/ens-public-resolver.cjs');
var ensRegistrar = require('../abis/ens-registrar.cjs');
var erc20 = require('../abis/erc20.cjs');
var erc20_bytes32 = require('../abis/erc20_bytes32.cjs');
var erc721 = require('../abis/erc721.cjs');
var erc1155 = require('../abis/erc1155.cjs');
var weth = require('../abis/weth.cjs');
var index = require('../analytics/index.cjs');
var providers = require('../constants/providers.cjs');
var tokens = require('../constants/tokens.cjs');
var fallbackProvider = require('../featureFlags/flags/fallbackProvider.cjs');
var React = require('react');
require('@ethersproject/address');
var getContract = require('../utils/getContract.cjs');

var TickLensABI = TickLens["default"].abi;
var MulticallABI = UniswapInterfaceMulticall["default"].abi;
var NFTPositionManagerABI = NonfungiblePositionManager["default"].abi;

// returns null on errors
function useContract(addressOrAddressMap, ABI) {
  var withSignerIfPossible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var _useWeb3React = core.useWeb3React(),
    provider = _useWeb3React.provider,
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId;
  return React.useMemo(function () {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null;
    var address;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract.getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]);
}
function useMainnetContract(address, ABI) {
  var _useWeb3React2 = core.useWeb3React(),
    chainId = _useWeb3React2.chainId;
  var isMainnet = chainId === sdkCore.ChainId.MAINNET;
  var contract = useContract(isMainnet ? address : undefined, ABI, false);
  var providers$1 = fallbackProvider.useFallbackProviderEnabled() ? providers.RPC_PROVIDERS : providers.DEPRECATED_RPC_PROVIDERS;
  return React.useMemo(function () {
    if (isMainnet) return contract;
    if (!address) return null;
    var provider = providers$1[sdkCore.ChainId.MAINNET];
    try {
      return getContract.getContract(address, ABI, provider);
    } catch (error) {
      console.error("Failed to get mainnet contract", error);
      return null;
    }
  }, [isMainnet, contract, address, providers$1, ABI]);
}
function useTokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, erc20, withSignerIfPossible);
}
function useWETHContract(withSignerIfPossible) {
  var _WRAPPED_NATIVE_CURRE;
  var _useWeb3React3 = core.useWeb3React(),
    chainId = _useWeb3React3.chainId;
  return useContract(chainId ? (_WRAPPED_NATIVE_CURRE = tokens.WRAPPED_NATIVE_CURRENCY[chainId]) === null || _WRAPPED_NATIVE_CURRE === void 0 ? void 0 : _WRAPPED_NATIVE_CURRE.address : undefined, weth, withSignerIfPossible);
}
function useERC721Contract(nftAddress) {
  return useContract(nftAddress, erc721, false);
}
function useERC1155Contract(nftAddress) {
  return useContract(nftAddress, erc1155, false);
}
function useArgentWalletDetectorContract() {
  return useContract(sdkCore.ARGENT_WALLET_DETECTOR_ADDRESS, argentWalletDetector, false);
}
function useENSRegistrarContract() {
  return useMainnetContract(sdkCore.ENS_REGISTRAR_ADDRESSES[sdkCore.ChainId.MAINNET], ensRegistrar);
}
function useENSResolverContract(address) {
  return useMainnetContract(address, ensPublicResolver);
}
function useBytes32TokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, erc20_bytes32, withSignerIfPossible);
}
function useInterfaceMulticall() {
  return useContract(sdkCore.MULTICALL_ADDRESSES, MulticallABI, false);
}
function useMainnetInterfaceMulticall() {
  return useMainnetContract(sdkCore.MULTICALL_ADDRESSES[sdkCore.ChainId.MAINNET], MulticallABI);
}
function useV3NFTPositionManagerContract(withSignerIfPossible) {
  var _useWeb3React4 = core.useWeb3React(),
    account = _useWeb3React4.account;
  var contract = useContract(sdkCore.NONFUNGIBLE_POSITION_MANAGER_ADDRESSES, NFTPositionManagerABI, withSignerIfPossible);
  React.useEffect(function () {
    if (contract && account) {
      index.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.WALLET_PROVIDER_USED, {
        source: "useV3NFTPositionManagerContract",
        contract: contract
      });
    }
  }, [account, contract]);
  return contract;
}
function useTickLens() {
  var _useWeb3React5 = core.useWeb3React(),
    chainId = _useWeb3React5.chainId;
  var address = chainId ? sdkCore.TICK_LENS_ADDRESSES[chainId] : undefined;
  return useContract(address, TickLensABI);
}

exports.useArgentWalletDetectorContract = useArgentWalletDetectorContract;
exports.useBytes32TokenContract = useBytes32TokenContract;
exports.useContract = useContract;
exports.useENSRegistrarContract = useENSRegistrarContract;
exports.useENSResolverContract = useENSResolverContract;
exports.useERC1155Contract = useERC1155Contract;
exports.useERC721Contract = useERC721Contract;
exports.useInterfaceMulticall = useInterfaceMulticall;
exports.useMainnetInterfaceMulticall = useMainnetInterfaceMulticall;
exports.useTickLens = useTickLens;
exports.useTokenContract = useTokenContract;
exports.useV3NFTPositionManagerContract = useV3NFTPositionManagerContract;
exports.useWETHContract = useWETHContract;
