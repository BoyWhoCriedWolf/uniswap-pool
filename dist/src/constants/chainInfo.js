import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { ChainId } from '@uniswap/sdk-core';
import bnbCircleLogoUrl from '../assets/images/bnbCircle.svg.js';
import EthereumLogo from '../assets/images/ethereum-logo.png.js';
import polygonCircleLogoUrl from '../assets/images/polygonCircle.png.js';
import arbitrumLogoUrl from '../assets/svg/arbitrum_logo.svg.js';
import AvaxLogo from '../assets/svg/avax_logo.svg.js';
import avaxSquareLogo from '../assets/svg/avax_square_logo.svg.js';
import baseLogo from '../assets/svg/base_logo.svg.js';
import baseSquareLogo from '../assets/svg/base_square_logo.svg.js';
import bnbSquareLogoUrl from '../assets/svg/bnb_square_logo.svg.js';
import BnbLogo from '../assets/svg/bnb-logo.svg.js';
import celoLogo from '../assets/svg/celo_logo.svg.js';
import celoSquareLogoUrl from '../assets/svg/celo_square_logo.svg.js';
import optimismSquareLogoUrl from '../assets/svg/optimism_square_logo.svg.js';
import optimismLogoUrl from '../assets/svg/optimistic_ethereum.svg.js';
import polygonSquareLogoUrl from '../assets/svg/polygon_square_logo.svg.js';
import polygonMaticLogo from '../assets/svg/polygon-matic-logo.svg.js';
import ms from 'ms';
import { darkTheme } from '../theme/colors.js';
import { OPTIMISM_LIST, ARBITRUM_LIST, CELO_LIST, PLASMA_BNB_LIST, AVALANCHE_LIST, BASE_LIST } from './lists.js';

var _CHAIN_INFO;
var AVERAGE_L1_BLOCK_TIME = ms("12s");

// The block number at which v3 was deployed on each chain, separate from the UNIVERSAL_ROUTER_CREATION_BLOCK
_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ChainId.MAINNET, 14292820), ChainId.POLYGON, 25459720), ChainId.ARBITRUM_ONE, 175), ChainId.OPTIMISM, 10028767), ChainId.CELO, 13916355), ChainId.BNB, 26324014), ChainId.AVALANCHE, 31422450), ChainId.BASE, 1371680);
var NetworkType = /*#__PURE__*/function (NetworkType) {
  NetworkType[NetworkType["L1"] = 0] = "L1";
  NetworkType[NetworkType["L2"] = 1] = "L2";
  return NetworkType;
}({});
var CHAIN_INFO = (_CHAIN_INFO = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_CHAIN_INFO, ChainId.MAINNET, {
  networkType: NetworkType.L1,
  docs: "https://docs.uniswap.org/",
  explorer: "https://etherscan.io/",
  infoLink: "https://info.uniswap.org/#/",
  label: "Ethereum",
  logoUrl: EthereumLogo,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  color: darkTheme.chain_1
}), ChainId.GOERLI, {
  networkType: NetworkType.L1,
  docs: "https://docs.uniswap.org/",
  explorer: "https://goerli.etherscan.io/",
  infoLink: "https://info.uniswap.org/#/",
  label: "Görli",
  logoUrl: EthereumLogo,
  nativeCurrency: {
    name: "Görli Ether",
    symbol: "görETH",
    decimals: 18
  },
  color: darkTheme.chain_5
}), ChainId.SEPOLIA, {
  networkType: NetworkType.L1,
  docs: "https://docs.uniswap.org/",
  explorer: "https://sepolia.etherscan.io/",
  infoLink: "https://info.uniswap.org/#/",
  label: "Sepolia",
  logoUrl: EthereumLogo,
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "SepoliaETH",
    decimals: 18
  },
  color: darkTheme.chain_5
}), ChainId.OPTIMISM, {
  networkType: NetworkType.L2,
  blockWaitMsBeforeWarning: ms("25m"),
  bridge: "https://app.optimism.io/bridge",
  defaultListUrl: OPTIMISM_LIST,
  docs: "https://optimism.io/",
  explorer: "https://optimistic.etherscan.io/",
  infoLink: "https://info.uniswap.org/#/optimism/",
  label: "Optimism",
  logoUrl: optimismLogoUrl,
  // Optimism perfers same icon for both
  circleLogoUrl: optimismLogoUrl,
  squareLogoUrl: optimismSquareLogoUrl,
  statusPage: "https://optimism.io/status",
  helpCenterUrl: "https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  color: darkTheme.chain_10,
  backgroundColor: darkTheme.chain_10_background
}), ChainId.OPTIMISM_GOERLI, {
  networkType: NetworkType.L2,
  blockWaitMsBeforeWarning: ms("25m"),
  bridge: "https://app.optimism.io/bridge",
  defaultListUrl: OPTIMISM_LIST,
  docs: "https://optimism.io/",
  explorer: "https://goerli-optimism.etherscan.io/",
  infoLink: "https://info.uniswap.org/#/optimism/",
  label: "Optimism Görli",
  logoUrl: optimismLogoUrl,
  statusPage: "https://optimism.io/status",
  helpCenterUrl: "https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ",
  nativeCurrency: {
    name: "Optimism Goerli Ether",
    symbol: "görOpETH",
    decimals: 18
  },
  color: darkTheme.chain_420
}), ChainId.ARBITRUM_ONE, {
  networkType: NetworkType.L2,
  blockWaitMsBeforeWarning: ms("10m"),
  bridge: "https://bridge.arbitrum.io/",
  docs: "https://offchainlabs.com/",
  explorer: "https://arbiscan.io/",
  infoLink: "https://info.uniswap.org/#/arbitrum",
  label: "Arbitrum",
  logoUrl: arbitrumLogoUrl,
  circleLogoUrl: arbitrumLogoUrl,
  defaultListUrl: ARBITRUM_LIST,
  helpCenterUrl: "https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  color: darkTheme.chain_42,
  backgroundColor: darkTheme.chain_42161_background
}), ChainId.ARBITRUM_GOERLI, {
  networkType: NetworkType.L2,
  blockWaitMsBeforeWarning: ms("10m"),
  bridge: "https://bridge.arbitrum.io/",
  docs: "https://offchainlabs.com/",
  explorer: "https://goerli.arbiscan.io/",
  infoLink: "https://info.uniswap.org/#/arbitrum/",
  label: "Arbitrum Goerli",
  logoUrl: arbitrumLogoUrl,
  defaultListUrl: ARBITRUM_LIST,
  // TODO: use arbitrum goerli token list
  helpCenterUrl: "https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum",
  nativeCurrency: {
    name: "Goerli Arbitrum Ether",
    symbol: "goerliArbETH",
    decimals: 18
  },
  color: darkTheme.chain_421613
}), ChainId.POLYGON, {
  networkType: NetworkType.L1,
  blockWaitMsBeforeWarning: ms("10m"),
  bridge: "https://wallet.polygon.technology/polygon/bridge",
  docs: "https://polygon.io/",
  explorer: "https://polygonscan.com/",
  infoLink: "https://info.uniswap.org/#/polygon/",
  label: "Polygon",
  logoUrl: polygonMaticLogo,
  circleLogoUrl: polygonCircleLogoUrl,
  squareLogoUrl: polygonSquareLogoUrl,
  nativeCurrency: {
    name: "Polygon Matic",
    symbol: "MATIC",
    decimals: 18
  },
  color: darkTheme.chain_137,
  backgroundColor: darkTheme.chain_137_background
}), ChainId.POLYGON_MUMBAI, {
  networkType: NetworkType.L1,
  blockWaitMsBeforeWarning: ms("10m"),
  bridge: "https://wallet.polygon.technology/polygon/bridge/deposit",
  docs: "https://polygon.io/",
  explorer: "https://mumbai.polygonscan.com/",
  infoLink: "https://info.uniswap.org/#/polygon/",
  label: "Polygon Mumbai",
  logoUrl: polygonMaticLogo,
  nativeCurrency: {
    name: "Polygon Mumbai Matic",
    symbol: "mMATIC",
    decimals: 18
  }
}), ChainId.CELO, {
  networkType: NetworkType.L1,
  blockWaitMsBeforeWarning: ms("10m"),
  bridge: "https://www.portalbridge.com/#/transfer",
  docs: "https://docs.celo.org/",
  explorer: "https://celoscan.io/",
  infoLink: "https://info.uniswap.org/#/celo/",
  label: "Celo",
  logoUrl: celoLogo,
  circleLogoUrl: celoLogo,
  squareLogoUrl: celoSquareLogoUrl,
  nativeCurrency: {
    name: "Celo",
    symbol: "CELO",
    decimals: 18
  },
  defaultListUrl: CELO_LIST
}), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_CHAIN_INFO, ChainId.CELO_ALFAJORES, {
  networkType: NetworkType.L1,
  blockWaitMsBeforeWarning: ms("10m"),
  bridge: "https://www.portalbridge.com/#/transfer",
  docs: "https://docs.celo.org/",
  explorer: "https://alfajores-blockscout.celo-testnet.org/",
  infoLink: "https://info.uniswap.org/#/celo/",
  label: "Celo Alfajores",
  logoUrl: celoLogo,
  nativeCurrency: {
    name: "Celo",
    symbol: "CELO",
    decimals: 18
  },
  defaultListUrl: CELO_LIST
}), ChainId.BNB, {
  networkType: NetworkType.L1,
  blockWaitMsBeforeWarning: ms("10m"),
  bridge: "https://cbridge.celer.network/1/56",
  docs: "https://docs.bnbchain.org/",
  explorer: "https://bscscan.com/",
  infoLink: "https://info.uniswap.org/#/bnb/",
  label: "BNB Chain",
  logoUrl: BnbLogo,
  circleLogoUrl: bnbCircleLogoUrl,
  squareLogoUrl: bnbSquareLogoUrl,
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  defaultListUrl: PLASMA_BNB_LIST,
  color: darkTheme.chain_56,
  backgroundColor: darkTheme.chain_56_background
}), ChainId.AVALANCHE, {
  networkType: NetworkType.L1,
  blockWaitMsBeforeWarning: ms("10m"),
  bridge: "https://core.app/bridge/",
  docs: "https://docs.avax.network/",
  explorer: "https://snowtrace.io/",
  infoLink: "https://info.uniswap.org/#/avax/",
  // TODO(WEB-2336): Add avax support to info site
  label: "Avalanche",
  logoUrl: AvaxLogo,
  circleLogoUrl: AvaxLogo,
  squareLogoUrl: avaxSquareLogo,
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18
  },
  defaultListUrl: AVALANCHE_LIST,
  color: darkTheme.chain_43114,
  backgroundColor: darkTheme.chain_43114_background
}), ChainId.BASE, {
  networkType: NetworkType.L2,
  blockWaitMsBeforeWarning: ms("25m"),
  bridge: "https://bridge.base.org/deposit",
  defaultListUrl: BASE_LIST,
  docs: "https://docs.base.org",
  explorer: "https://basescan.org/",
  infoLink: "https://info.uniswap.org/#/base/",
  label: "Base",
  logoUrl: baseLogo,
  statusPage: "https://status.base.org/",
  circleLogoUrl: baseLogo,
  squareLogoUrl: baseSquareLogo,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  color: darkTheme.chain_84531
}));
/**
 * Overloaded method for returning ChainInfo given a chainID
 * Return type varies depending on input type:
 * number | undefined -> returns chaininfo | undefined
 * ChainId -> returns L1ChainInfo | L2ChainInfo
 * SupportedL1ChainId -> returns L1ChainInfo
 * SupportedL2ChainId -> returns L2ChainInfo
 */
function getChainInfo(chainId, featureFlags) {
  if (featureFlags && chainId in featureFlags) {
    return featureFlags[chainId] ? CHAIN_INFO[chainId] : undefined;
  }
  if (chainId) {
    var _CHAIN_INFO$chainId;
    return (_CHAIN_INFO$chainId = CHAIN_INFO[chainId]) !== null && _CHAIN_INFO$chainId !== void 0 ? _CHAIN_INFO$chainId : undefined;
  }
  return undefined;
}
var MAINNET_INFO = CHAIN_INFO[ChainId.MAINNET];
function getChainInfoOrDefault(chainId, featureFlags) {
  var _getChainInfo;
  return (_getChainInfo = getChainInfo(chainId, featureFlags)) !== null && _getChainInfo !== void 0 ? _getChainInfo : MAINNET_INFO;
}

export { AVERAGE_L1_BLOCK_TIME, NetworkType, getChainInfo, getChainInfoOrDefault };
