import { InterfaceEventName } from '@uniswap/analytics-events';
import { ENS_REGISTRAR_ADDRESSES, ChainId, MULTICALL_ADDRESSES, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES, ARGENT_WALLET_DETECTOR_ADDRESS, TICK_LENS_ADDRESSES } from '@uniswap/sdk-core';
import TickLensJson from '../../node_modules/@uniswap/v3-periphery/artifacts/contracts/lens/TickLens.sol/TickLens.json.js';
import MulticallJSON from '../../node_modules/@uniswap/v3-periphery/artifacts/contracts/lens/UniswapInterfaceMulticall.sol/UniswapInterfaceMulticall.json.js';
import NFTPositionManagerJSON from '../../node_modules/@uniswap/v3-periphery/artifacts/contracts/NonfungiblePositionManager.sol/NonfungiblePositionManager.json.js';
import { useWeb3React } from '@web3-react/core';
import ARGENT_WALLET_DETECTOR_ABI from '../abis/argent-wallet-detector.json.js';
import ENS_PUBLIC_RESOLVER_ABI from '../abis/ens-public-resolver.json.js';
import ENS_ABI from '../abis/ens-registrar.json.js';
import ERC20_ABI from '../abis/erc20.json.js';
import ERC20_BYTES32_ABI from '../abis/erc20_bytes32.json.js';
import ERC721 from '../abis/erc721.json.js';
import ERC1155 from '../abis/erc1155.json.js';
import WETH_ABI from '../abis/weth.json.js';
import { sendAnalyticsEvent } from '../analytics/index.js';
import { RPC_PROVIDERS, DEPRECATED_RPC_PROVIDERS } from '../constants/providers.js';
import { WRAPPED_NATIVE_CURRENCY } from '../constants/tokens.js';
import { useFallbackProviderEnabled } from '../featureFlags/flags/fallbackProvider.js';
import { useMemo, useEffect } from 'react';
import '@ethersproject/address';
import { getContract } from '../utils/getContract.js';

const {
  abi: TickLensABI
} = TickLensJson;
const {
  abi: MulticallABI
} = MulticallJSON;
const {
  abi: NFTPositionManagerABI
} = NFTPositionManagerJSON;

// returns null on errors
function useContract(addressOrAddressMap, ABI) {
  let withSignerIfPossible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  const {
    provider,
    account,
    chainId
  } = useWeb3React();
  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null;
    let address;
    if (typeof addressOrAddressMap === "string") address = addressOrAddressMap;else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error("Failed to get contract", error);
      return null;
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]);
}
function useMainnetContract(address, ABI) {
  const {
    chainId
  } = useWeb3React();
  const isMainnet = chainId === ChainId.MAINNET;
  const contract = useContract(isMainnet ? address : undefined, ABI, false);
  const providers = useFallbackProviderEnabled() ? RPC_PROVIDERS : DEPRECATED_RPC_PROVIDERS;
  return useMemo(() => {
    if (isMainnet) return contract;
    if (!address) return null;
    const provider = providers[ChainId.MAINNET];
    try {
      return getContract(address, ABI, provider);
    } catch (error) {
      console.error("Failed to get mainnet contract", error);
      return null;
    }
  }, [isMainnet, contract, address, providers, ABI]);
}
function useTokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible);
}
function useWETHContract(withSignerIfPossible) {
  const {
    chainId
  } = useWeb3React();
  return useContract(chainId ? WRAPPED_NATIVE_CURRENCY[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible);
}
function useERC721Contract(nftAddress) {
  return useContract(nftAddress, ERC721, false);
}
function useERC1155Contract(nftAddress) {
  return useContract(nftAddress, ERC1155, false);
}
function useArgentWalletDetectorContract() {
  return useContract(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false);
}
function useENSRegistrarContract() {
  return useMainnetContract(ENS_REGISTRAR_ADDRESSES[ChainId.MAINNET], ENS_ABI);
}
function useENSResolverContract(address) {
  return useMainnetContract(address, ENS_PUBLIC_RESOLVER_ABI);
}
function useBytes32TokenContract(tokenAddress, withSignerIfPossible) {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible);
}
function useInterfaceMulticall() {
  return useContract(MULTICALL_ADDRESSES, MulticallABI, false);
}
function useMainnetInterfaceMulticall() {
  return useMainnetContract(MULTICALL_ADDRESSES[ChainId.MAINNET], MulticallABI);
}
function useV3NFTPositionManagerContract(withSignerIfPossible) {
  const {
    account
  } = useWeb3React();
  const contract = useContract(NONFUNGIBLE_POSITION_MANAGER_ADDRESSES, NFTPositionManagerABI, withSignerIfPossible);
  useEffect(() => {
    if (contract && account) {
      sendAnalyticsEvent(InterfaceEventName.WALLET_PROVIDER_USED, {
        source: "useV3NFTPositionManagerContract",
        contract
      });
    }
  }, [account, contract]);
  return contract;
}
function useTickLens() {
  const {
    chainId
  } = useWeb3React();
  const address = chainId ? TICK_LENS_ADDRESSES[chainId] : undefined;
  return useContract(address, TickLensABI);
}

export { useArgentWalletDetectorContract, useBytes32TokenContract, useContract, useENSRegistrarContract, useENSResolverContract, useERC1155Contract, useERC721Contract, useInterfaceMulticall, useMainnetInterfaceMulticall, useTickLens, useTokenContract, useV3NFTPositionManagerContract, useWETHContract };
