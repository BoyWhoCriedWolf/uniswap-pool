'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var sdkCore = require('@uniswap/sdk-core');
var bnbCircle = require('../assets/images/bnbCircle.cjs');
var ethereumLogo = require('../assets/images/ethereum-logo.cjs');
var polygonCircle = require('../assets/images/polygonCircle.cjs');
var arbitrum_logo = require('../assets/svg/arbitrum_logo.cjs');
var avax_logo = require('../assets/svg/avax_logo.cjs');
var avax_square_logo = require('../assets/svg/avax_square_logo.cjs');
var base_logo = require('../assets/svg/base_logo.cjs');
var base_square_logo = require('../assets/svg/base_square_logo.cjs');
var bnb_square_logo = require('../assets/svg/bnb_square_logo.cjs');
var bnbLogo = require('../assets/svg/bnb-logo.cjs');
var celo_logo = require('../assets/svg/celo_logo.cjs');
var celo_square_logo = require('../assets/svg/celo_square_logo.cjs');
var optimism_square_logo = require('../assets/svg/optimism_square_logo.cjs');
var optimistic_ethereum = require('../assets/svg/optimistic_ethereum.cjs');
var polygon_square_logo = require('../assets/svg/polygon_square_logo.cjs');
var polygonMaticLogo = require('../assets/svg/polygon-matic-logo.cjs');
var ms = require('ms');
var colors = require('../theme/colors.cjs');
var lists = require('./lists.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

var _CHAIN_INFO;
var AVERAGE_L1_BLOCK_TIME = ms__default["default"]("12s");

// The block number at which v3 was deployed on each chain, separate from the UNIVERSAL_ROUTER_CREATION_BLOCK
_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, sdkCore.ChainId.MAINNET, 14292820), sdkCore.ChainId.POLYGON, 25459720), sdkCore.ChainId.ARBITRUM_ONE, 175), sdkCore.ChainId.OPTIMISM, 10028767), sdkCore.ChainId.CELO, 13916355), sdkCore.ChainId.BNB, 26324014), sdkCore.ChainId.AVALANCHE, 31422450), sdkCore.ChainId.BASE, 1371680);
var NetworkType = /*#__PURE__*/function (NetworkType) {
  NetworkType[NetworkType["L1"] = 0] = "L1";
  NetworkType[NetworkType["L2"] = 1] = "L2";
  return NetworkType;
}({});
var CHAIN_INFO = (_CHAIN_INFO = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_CHAIN_INFO, sdkCore.ChainId.MAINNET, {
  networkType: NetworkType.L1,
  docs: "https://docs.uniswap.org/",
  explorer: "https://etherscan.io/",
  infoLink: "https://info.uniswap.org/#/",
  label: "Ethereum",
  logoUrl: ethereumLogo,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  color: colors.darkTheme.chain_1
}), sdkCore.ChainId.GOERLI, {
  networkType: NetworkType.L1,
  docs: "https://docs.uniswap.org/",
  explorer: "https://goerli.etherscan.io/",
  infoLink: "https://info.uniswap.org/#/",
  label: "Görli",
  logoUrl: ethereumLogo,
  nativeCurrency: {
    name: "Görli Ether",
    symbol: "görETH",
    decimals: 18
  },
  color: colors.darkTheme.chain_5
}), sdkCore.ChainId.SEPOLIA, {
  networkType: NetworkType.L1,
  docs: "https://docs.uniswap.org/",
  explorer: "https://sepolia.etherscan.io/",
  infoLink: "https://info.uniswap.org/#/",
  label: "Sepolia",
  logoUrl: ethereumLogo,
  nativeCurrency: {
    name: "Sepolia Ether",
    symbol: "SepoliaETH",
    decimals: 18
  },
  color: colors.darkTheme.chain_5
}), sdkCore.ChainId.OPTIMISM, {
  networkType: NetworkType.L2,
  blockWaitMsBeforeWarning: ms__default["default"]("25m"),
  bridge: "https://app.optimism.io/bridge",
  defaultListUrl: lists.OPTIMISM_LIST,
  docs: "https://optimism.io/",
  explorer: "https://optimistic.etherscan.io/",
  infoLink: "https://info.uniswap.org/#/optimism/",
  label: "Optimism",
  logoUrl: optimistic_ethereum,
  // Optimism perfers same icon for both
  circleLogoUrl: optimistic_ethereum,
  squareLogoUrl: optimism_square_logo,
  statusPage: "https://optimism.io/status",
  helpCenterUrl: "https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  color: colors.darkTheme.chain_10,
  backgroundColor: colors.darkTheme.chain_10_background
}), sdkCore.ChainId.OPTIMISM_GOERLI, {
  networkType: NetworkType.L2,
  blockWaitMsBeforeWarning: ms__default["default"]("25m"),
  bridge: "https://app.optimism.io/bridge",
  defaultListUrl: lists.OPTIMISM_LIST,
  docs: "https://optimism.io/",
  explorer: "https://goerli-optimism.etherscan.io/",
  infoLink: "https://info.uniswap.org/#/optimism/",
  label: "Optimism Görli",
  logoUrl: optimistic_ethereum,
  statusPage: "https://optimism.io/status",
  helpCenterUrl: "https://help.uniswap.org/en/collections/3137778-uniswap-on-optimistic-ethereum-oξ",
  nativeCurrency: {
    name: "Optimism Goerli Ether",
    symbol: "görOpETH",
    decimals: 18
  },
  color: colors.darkTheme.chain_420
}), sdkCore.ChainId.ARBITRUM_ONE, {
  networkType: NetworkType.L2,
  blockWaitMsBeforeWarning: ms__default["default"]("10m"),
  bridge: "https://bridge.arbitrum.io/",
  docs: "https://offchainlabs.com/",
  explorer: "https://arbiscan.io/",
  infoLink: "https://info.uniswap.org/#/arbitrum",
  label: "Arbitrum",
  logoUrl: arbitrum_logo,
  circleLogoUrl: arbitrum_logo,
  defaultListUrl: lists.ARBITRUM_LIST,
  helpCenterUrl: "https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum",
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  color: colors.darkTheme.chain_42,
  backgroundColor: colors.darkTheme.chain_42161_background
}), sdkCore.ChainId.ARBITRUM_GOERLI, {
  networkType: NetworkType.L2,
  blockWaitMsBeforeWarning: ms__default["default"]("10m"),
  bridge: "https://bridge.arbitrum.io/",
  docs: "https://offchainlabs.com/",
  explorer: "https://goerli.arbiscan.io/",
  infoLink: "https://info.uniswap.org/#/arbitrum/",
  label: "Arbitrum Goerli",
  logoUrl: arbitrum_logo,
  defaultListUrl: lists.ARBITRUM_LIST,
  // TODO: use arbitrum goerli token list
  helpCenterUrl: "https://help.uniswap.org/en/collections/3137787-uniswap-on-arbitrum",
  nativeCurrency: {
    name: "Goerli Arbitrum Ether",
    symbol: "goerliArbETH",
    decimals: 18
  },
  color: colors.darkTheme.chain_421613
}), sdkCore.ChainId.POLYGON, {
  networkType: NetworkType.L1,
  blockWaitMsBeforeWarning: ms__default["default"]("10m"),
  bridge: "https://wallet.polygon.technology/polygon/bridge",
  docs: "https://polygon.io/",
  explorer: "https://polygonscan.com/",
  infoLink: "https://info.uniswap.org/#/polygon/",
  label: "Polygon",
  logoUrl: polygonMaticLogo,
  circleLogoUrl: polygonCircle,
  squareLogoUrl: polygon_square_logo,
  nativeCurrency: {
    name: "Polygon Matic",
    symbol: "MATIC",
    decimals: 18
  },
  color: colors.darkTheme.chain_137,
  backgroundColor: colors.darkTheme.chain_137_background
}), sdkCore.ChainId.POLYGON_MUMBAI, {
  networkType: NetworkType.L1,
  blockWaitMsBeforeWarning: ms__default["default"]("10m"),
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
}), sdkCore.ChainId.CELO, {
  networkType: NetworkType.L1,
  blockWaitMsBeforeWarning: ms__default["default"]("10m"),
  bridge: "https://www.portalbridge.com/#/transfer",
  docs: "https://docs.celo.org/",
  explorer: "https://celoscan.io/",
  infoLink: "https://info.uniswap.org/#/celo/",
  label: "Celo",
  logoUrl: celo_logo,
  circleLogoUrl: celo_logo,
  squareLogoUrl: celo_square_logo,
  nativeCurrency: {
    name: "Celo",
    symbol: "CELO",
    decimals: 18
  },
  defaultListUrl: lists.CELO_LIST
}), _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_CHAIN_INFO, sdkCore.ChainId.CELO_ALFAJORES, {
  networkType: NetworkType.L1,
  blockWaitMsBeforeWarning: ms__default["default"]("10m"),
  bridge: "https://www.portalbridge.com/#/transfer",
  docs: "https://docs.celo.org/",
  explorer: "https://alfajores-blockscout.celo-testnet.org/",
  infoLink: "https://info.uniswap.org/#/celo/",
  label: "Celo Alfajores",
  logoUrl: celo_logo,
  nativeCurrency: {
    name: "Celo",
    symbol: "CELO",
    decimals: 18
  },
  defaultListUrl: lists.CELO_LIST
}), sdkCore.ChainId.BNB, {
  networkType: NetworkType.L1,
  blockWaitMsBeforeWarning: ms__default["default"]("10m"),
  bridge: "https://cbridge.celer.network/1/56",
  docs: "https://docs.bnbchain.org/",
  explorer: "https://bscscan.com/",
  infoLink: "https://info.uniswap.org/#/bnb/",
  label: "BNB Chain",
  logoUrl: bnbLogo,
  circleLogoUrl: bnbCircle,
  squareLogoUrl: bnb_square_logo,
  nativeCurrency: {
    name: "BNB",
    symbol: "BNB",
    decimals: 18
  },
  defaultListUrl: lists.PLASMA_BNB_LIST,
  color: colors.darkTheme.chain_56,
  backgroundColor: colors.darkTheme.chain_56_background
}), sdkCore.ChainId.AVALANCHE, {
  networkType: NetworkType.L1,
  blockWaitMsBeforeWarning: ms__default["default"]("10m"),
  bridge: "https://core.app/bridge/",
  docs: "https://docs.avax.network/",
  explorer: "https://snowtrace.io/",
  infoLink: "https://info.uniswap.org/#/avax/",
  // TODO(WEB-2336): Add avax support to info site
  label: "Avalanche",
  logoUrl: avax_logo,
  circleLogoUrl: avax_logo,
  squareLogoUrl: avax_square_logo,
  nativeCurrency: {
    name: "AVAX",
    symbol: "AVAX",
    decimals: 18
  },
  defaultListUrl: lists.AVALANCHE_LIST,
  color: colors.darkTheme.chain_43114,
  backgroundColor: colors.darkTheme.chain_43114_background
}), sdkCore.ChainId.BASE, {
  networkType: NetworkType.L2,
  blockWaitMsBeforeWarning: ms__default["default"]("25m"),
  bridge: "https://bridge.base.org/deposit",
  defaultListUrl: lists.BASE_LIST,
  docs: "https://docs.base.org",
  explorer: "https://basescan.org/",
  infoLink: "https://info.uniswap.org/#/base/",
  label: "Base",
  logoUrl: base_logo,
  statusPage: "https://status.base.org/",
  circleLogoUrl: base_logo,
  squareLogoUrl: base_square_logo,
  nativeCurrency: {
    name: "Ether",
    symbol: "ETH",
    decimals: 18
  },
  color: colors.darkTheme.chain_84531
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
var MAINNET_INFO = CHAIN_INFO[sdkCore.ChainId.MAINNET];
function getChainInfoOrDefault(chainId, featureFlags) {
  var _getChainInfo;
  return (_getChainInfo = getChainInfo(chainId, featureFlags)) !== null && _getChainInfo !== void 0 ? _getChainInfo : MAINNET_INFO;
}

exports.AVERAGE_L1_BLOCK_TIME = AVERAGE_L1_BLOCK_TIME;
exports.NetworkType = NetworkType;
exports.getChainInfo = getChainInfo;
exports.getChainInfoOrDefault = getChainInfoOrDefault;
