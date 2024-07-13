'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);

var UNI_LIST = "https://gateway.ipfs.io/ipns/tokens.uniswap.org";
var UNI_EXTENDED_LIST = "https://gateway.ipfs.io/ipns/extendedtokens.uniswap.org";
var UNI_UNSUPPORTED_LIST = "https://gateway.ipfs.io/ipns/unsupportedtokens.uniswap.org";
var AAVE_LIST = "tokenlist.aave.eth";
var BA_LIST = "https://raw.githubusercontent.com/The-Blockchain-Association/sec-notice-list/master/ba-sec-list.json";
// TODO(WEB-2282): Re-enable CMC list once we have a better solution for handling large lists.
// const CMC_ALL_LIST = 'https://s3.coinmarketcap.com/generated/dex/tokens/eth-tokens-all.json'
var COINGECKO_LIST = "https://tokens.coingecko.com/uniswap/all.json";
var COINGECKO_BNB_LIST = "https://tokens.coingecko.com/binance-smart-chain/all.json";
var COINGECKO_ARBITRUM_LIST = "https://tokens.coingecko.com/arbitrum-one/all.json";
var COINGECKO_OPTIMISM_LIST = "https://tokens.coingecko.com/optimistic-ethereum/all.json";
var COINGECKO_CELO_LIST = "https://tokens.coingecko.com/celo/all.json";
var COINGECKO_POLYGON_LIST = "https://tokens.coingecko.com/polygon-pos/all.json";
var COINGECKO_AVAX_LIST = "https://tokens.coingecko.com/avalanche/all.json";
var COMPOUND_LIST = "https://raw.githubusercontent.com/compound-finance/token-list/master/compound.tokenlist.json";
var GEMINI_LIST = "https://www.gemini.com/uniswap/manifest.json";
var KLEROS_LIST = "t2crtokens.eth";
var SET_LIST = "https://raw.githubusercontent.com/SetProtocol/uniswap-tokenlist/main/set.tokenlist.json";
var WRAPPED_LIST = "wrapped.tokensoft.eth";
var OPTIMISM_LIST = "https://static.optimism.io/optimism.tokenlist.json";
var ARBITRUM_LIST = "https://bridge.arbitrum.io/token-list-42161.json";
var CELO_LIST = "https://celo-org.github.io/celo-token-list/celo.tokenlist.json";
var PLASMA_BNB_LIST = "https://raw.githubusercontent.com/plasmadlt/plasma-finance-token-list/master/bnb.json";
var AVALANCHE_LIST = "https://raw.githubusercontent.com/ava-labs/avalanche-bridge-resources/main/token_list.json";
var BASE_LIST = "https://raw.githubusercontent.com/ethereum-optimism/ethereum-optimism.github.io/master/optimism.tokenlist.json";
var UNSUPPORTED_LIST_URLS = [BA_LIST, UNI_UNSUPPORTED_LIST];

// default lists to be 'active' aka searched across
var DEFAULT_ACTIVE_LIST_URLS = [UNI_LIST];
var DEFAULT_INACTIVE_LIST_URLS = [UNI_EXTENDED_LIST, COMPOUND_LIST, AAVE_LIST,
//  CMC_ALL_LIST,
COINGECKO_LIST, COINGECKO_BNB_LIST, COINGECKO_ARBITRUM_LIST, COINGECKO_OPTIMISM_LIST, COINGECKO_CELO_LIST, COINGECKO_POLYGON_LIST, COINGECKO_AVAX_LIST, KLEROS_LIST, GEMINI_LIST, WRAPPED_LIST, SET_LIST, ARBITRUM_LIST, OPTIMISM_LIST, CELO_LIST, PLASMA_BNB_LIST, AVALANCHE_LIST, BASE_LIST].concat(UNSUPPORTED_LIST_URLS);
var DEFAULT_LIST_OF_LISTS = [].concat(DEFAULT_ACTIVE_LIST_URLS, _toConsumableArray__default["default"](DEFAULT_INACTIVE_LIST_URLS));

exports.ARBITRUM_LIST = ARBITRUM_LIST;
exports.AVALANCHE_LIST = AVALANCHE_LIST;
exports.BASE_LIST = BASE_LIST;
exports.CELO_LIST = CELO_LIST;
exports.DEFAULT_ACTIVE_LIST_URLS = DEFAULT_ACTIVE_LIST_URLS;
exports.DEFAULT_INACTIVE_LIST_URLS = DEFAULT_INACTIVE_LIST_URLS;
exports.DEFAULT_LIST_OF_LISTS = DEFAULT_LIST_OF_LISTS;
exports.OPTIMISM_LIST = OPTIMISM_LIST;
exports.PLASMA_BNB_LIST = PLASMA_BNB_LIST;
exports.UNI_EXTENDED_LIST = UNI_EXTENDED_LIST;
exports.UNI_LIST = UNI_LIST;
exports.UNSUPPORTED_LIST_URLS = UNSUPPORTED_LIST_URLS;
