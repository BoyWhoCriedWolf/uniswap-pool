'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _inherits = require('@babel/runtime/helpers/inherits');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var sdkCore = require('@uniswap/sdk-core');
var invariant = require('tiny-invariant');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var invariant__default = /*#__PURE__*/_interopDefaultLegacy(invariant);

var _objectSpread2, _USDC;
function _callSuper(_this, derived, args) {
  function isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
      return !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    } catch (e) {
      return false;
    }
  }
  derived = _getPrototypeOf__default["default"](derived);
  return _possibleConstructorReturn__default["default"](_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf__default["default"](_this).constructor) : derived.apply(_this, args));
}
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var NATIVE_CHAIN_ID = "NATIVE";

// When decimals are not specified for an ERC20 token
// use default ERC20 token decimals as specified here:
// https://docs.openzeppelin.com/contracts/3.x/erc20
var DEFAULT_ERC20_DECIMALS = 18;
var USDC_MAINNET = new sdkCore.Token(sdkCore.ChainId.MAINNET, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", 6, "USDC", "USD//C");
var USDC_GOERLI = new sdkCore.Token(sdkCore.ChainId.GOERLI, "0x07865c6e87b9f70255377e024ace6630c1eaa37f", 6, "USDC", "USD//C");
var USDC_SEPOLIA = new sdkCore.Token(sdkCore.ChainId.SEPOLIA, "0x6f14C02Fc1F78322cFd7d707aB90f18baD3B54f5", 6, "USDC", "USD//C");
var USDC_OPTIMISM = new sdkCore.Token(sdkCore.ChainId.OPTIMISM, "0x7F5c764cBc14f9669B88837ca1490cCa17c31607", 6, "USDC", "USD//C");
var USDC_OPTIMISM_GOERLI = new sdkCore.Token(sdkCore.ChainId.OPTIMISM_GOERLI, "0x7E07E15D2a87A24492740D16f5bdF58c16db0c4E", 6, "USDC", "USD//C");
var BRIDGED_USDC_ARBITRUM = new sdkCore.Token(sdkCore.ChainId.ARBITRUM_ONE, "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8", 6, "USDC", "USD//C");
var USDC_ARBITRUM = new sdkCore.Token(sdkCore.ChainId.ARBITRUM_ONE, "0xaf88d065e77c8cC2239327C5EDb3A432268e5831", 6, "USDC", "USD//C");
var USDC_ARBITRUM_GOERLI = new sdkCore.Token(sdkCore.ChainId.ARBITRUM_GOERLI, "0x8FB1E3fC51F3b789dED7557E680551d93Ea9d892", 6, "USDC", "USD//C");
var USDC_POLYGON = new sdkCore.Token(sdkCore.ChainId.POLYGON, "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", 6, "USDC", "USD//C");
var USDC_POLYGON_MUMBAI = new sdkCore.Token(sdkCore.ChainId.POLYGON_MUMBAI, "0xe11a86849d99f524cac3e7a0ec1241828e332c62", 6, "USDC", "USD//C");
var PORTAL_USDC_CELO = new sdkCore.Token(sdkCore.ChainId.CELO, "0x37f750B7cC259A2f741AF45294f6a16572CF5cAd", 6, "USDCet", "USDC (Portal from Ethereum)");
var USDC_BASE = new sdkCore.Token(sdkCore.ChainId.BASE, "0xd9aAEc86B65D86f6A7B5B1b0c42FFA531710b6CA", 6, "USD Base Coin", "USDbC");
var DAI = new sdkCore.Token(sdkCore.ChainId.MAINNET, "0x6B175474E89094C44Da98b954EedeAC495271d0F", 18, "DAI", "Dai Stablecoin");
var DAI_ARBITRUM_ONE = new sdkCore.Token(sdkCore.ChainId.ARBITRUM_ONE, "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", 18, "DAI", "Dai stable coin");
var DAI_OPTIMISM = new sdkCore.Token(sdkCore.ChainId.OPTIMISM, "0xDA10009cBd5D07dd0CeCc66161FC93D7c9000da1", 18, "DAI", "Dai stable coin");
var MATIC = new sdkCore.Token(sdkCore.ChainId.MAINNET, "0x7d1afa7b718fb893db30a3abc0cfc608aacfebb0", 18, "MATIC", "Polygon Matic");
var DAI_POLYGON = new sdkCore.Token(sdkCore.ChainId.POLYGON, "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063", 18, "DAI", "Dai Stablecoin");
var USDT_POLYGON = new sdkCore.Token(sdkCore.ChainId.POLYGON, "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", 6, "USDT", "Tether USD");
var WBTC_POLYGON = new sdkCore.Token(sdkCore.ChainId.POLYGON, "0x1bfd67037b42cf73acf2047067bd4f2c47d9bfd6", 8, "WBTC", "Wrapped BTC");
var USDT = new sdkCore.Token(sdkCore.ChainId.MAINNET, "0xdAC17F958D2ee523a2206206994597C13D831ec7", 6, "USDT", "Tether USD");
var USDT_ARBITRUM_ONE = new sdkCore.Token(sdkCore.ChainId.ARBITRUM_ONE, "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9", 6, "USDT", "Tether USD");
var USDT_OPTIMISM = new sdkCore.Token(sdkCore.ChainId.OPTIMISM, "0x94b008aA00579c1307B0EF2c499aD98a8ce58e58", 6, "USDT", "Tether USD");
var WBTC = new sdkCore.Token(sdkCore.ChainId.MAINNET, "0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599", 8, "WBTC", "Wrapped BTC");
var WBTC_ARBITRUM_ONE = new sdkCore.Token(sdkCore.ChainId.ARBITRUM_ONE, "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f", 8, "WBTC", "Wrapped BTC");
var WBTC_OPTIMISM = new sdkCore.Token(sdkCore.ChainId.OPTIMISM, "0x68f180fcCe6836688e9084f035309E29Bf0A2095", 8, "WBTC", "Wrapped BTC");
var WETH_POLYGON_MUMBAI = new sdkCore.Token(sdkCore.ChainId.POLYGON_MUMBAI, "0xa6fa4fb5f76172d178d61b04b0ecd319c5d1c0aa", 18, "WETH", "Wrapped Ether");
var WETH_POLYGON = new sdkCore.Token(sdkCore.ChainId.POLYGON, "0x7ceb23fd6bc0add59e62ac25578270cff1b9f619", 18, "WETH", "Wrapped Ether");
var CELO_CELO = new sdkCore.Token(sdkCore.ChainId.CELO, "0x471EcE3750Da237f93B8E339c536989b8978a438", 18, "CELO", "Celo");
var CUSD_CELO = new sdkCore.Token(sdkCore.ChainId.CELO, "0x765DE816845861e75A25fCA122bb6898B8B1282a", 18, "cUSD", "Celo Dollar");
var CEUR_CELO = new sdkCore.Token(sdkCore.ChainId.CELO, "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73", 18, "cEUR", "Celo Euro Stablecoin");
var PORTAL_ETH_CELO = new sdkCore.Token(sdkCore.ChainId.CELO, "0x66803FB87aBd4aaC3cbB3fAd7C3aa01f6F3FB207", 18, "ETH", "Portal Ether");
var WBTC_CELO = new sdkCore.Token(sdkCore.ChainId.CELO, "0xd71Ffd0940c920786eC4DbB5A12306669b5b81EF", 18, "WBTC", "Wrapped BTC");
var CELO_CELO_ALFAJORES = new sdkCore.Token(sdkCore.ChainId.CELO_ALFAJORES, "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9", 18, "CELO", "Celo");
var CUSD_CELO_ALFAJORES = new sdkCore.Token(sdkCore.ChainId.CELO_ALFAJORES, "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1", 18, "CUSD", "Celo Dollar");
var CEUR_CELO_ALFAJORES = new sdkCore.Token(sdkCore.ChainId.CELO_ALFAJORES, "0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F", 18, "CEUR", "Celo Euro Stablecoin");
var USDC_BSC = new sdkCore.Token(sdkCore.ChainId.BNB, "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d", 18, "USDC", "USDC");
var USDT_BSC = new sdkCore.Token(sdkCore.ChainId.BNB, "0x55d398326f99059fF775485246999027B3197955", 18, "USDT", "USDT");
var ETH_BSC = new sdkCore.Token(sdkCore.ChainId.BNB, "0x2170Ed0880ac9A755fd29B2688956BD959F933F8", 18, "ETH", "Ethereum");
var BTC_BSC = new sdkCore.Token(sdkCore.ChainId.BNB, "0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c", 18, "BTCB", "BTCB");
var BUSD_BSC = new sdkCore.Token(sdkCore.ChainId.BNB, "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", 18, "BUSD", "BUSD");
var DAI_BSC = new sdkCore.Token(sdkCore.ChainId.BNB, "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3", 18, "DAI", "DAI");
var USDC_AVALANCHE = new sdkCore.Token(sdkCore.ChainId.AVALANCHE, "0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E", 6, "USDC", "USDC Token");
var USDT_AVALANCHE = new sdkCore.Token(sdkCore.ChainId.AVALANCHE, "0x9702230A8Ea53601f5cD2dc00fDBc13d4dF4A8c7", 6, "USDT", "Tether USD");
var WETH_AVALANCHE = new sdkCore.Token(sdkCore.ChainId.AVALANCHE, "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB", 18, "WETH", "Wrapped Ether");
var DAI_AVALANCHE = new sdkCore.Token(sdkCore.ChainId.AVALANCHE, "0xd586E7F844cEa2F87f50152665BCbc2C279D8d70", 18, "DAI.e", "Dai.e Token");
var UNI = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, sdkCore.ChainId.MAINNET, new sdkCore.Token(sdkCore.ChainId.MAINNET, sdkCore.UNI_ADDRESSES[sdkCore.ChainId.MAINNET], 18, "UNI", "Uniswap")), sdkCore.ChainId.GOERLI, new sdkCore.Token(sdkCore.ChainId.GOERLI, sdkCore.UNI_ADDRESSES[sdkCore.ChainId.GOERLI], 18, "UNI", "Uniswap")), sdkCore.ChainId.SEPOLIA, new sdkCore.Token(sdkCore.ChainId.SEPOLIA, sdkCore.UNI_ADDRESSES[sdkCore.ChainId.SEPOLIA], 18, "UNI", "Uniswap"));
var ARB = new sdkCore.Token(sdkCore.ChainId.ARBITRUM_ONE, "0x912CE59144191C1204E64559FE8253a0e49E6548", 18, "ARB", "Arbitrum");
var OP = new sdkCore.Token(sdkCore.ChainId.OPTIMISM, "0x4200000000000000000000000000000000000042", 18, "OP", "Optimism");
var LDO = new sdkCore.Token(sdkCore.ChainId.MAINNET, "0x5A98FcBEA516Cf06857215779Fd812CA3beF1B32", 18, "LDO", "Lido DAO Token");
var WRAPPED_NATIVE_CURRENCY = _objectSpread(_objectSpread({}, sdkCore.WETH9), {}, (_objectSpread2 = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_objectSpread2, sdkCore.ChainId.OPTIMISM, new sdkCore.Token(sdkCore.ChainId.OPTIMISM, "0x4200000000000000000000000000000000000006", 18, "WETH", "Wrapped Ether")), sdkCore.ChainId.OPTIMISM_GOERLI, new sdkCore.Token(sdkCore.ChainId.OPTIMISM_GOERLI, "0x4200000000000000000000000000000000000006", 18, "WETH", "Wrapped Ether")), sdkCore.ChainId.BASE, new sdkCore.Token(sdkCore.ChainId.BASE, "0x4200000000000000000000000000000000000006", 18, "WETH", "Wrapped Ether")), sdkCore.ChainId.ARBITRUM_ONE, new sdkCore.Token(sdkCore.ChainId.ARBITRUM_ONE, "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", 18, "WETH", "Wrapped Ether")), sdkCore.ChainId.ARBITRUM_GOERLI, new sdkCore.Token(sdkCore.ChainId.ARBITRUM_GOERLI, "0xe39Ab88f8A4777030A534146A9Ca3B52bd5D43A3", 18, "WETH", "Wrapped Ether")), sdkCore.ChainId.SEPOLIA, new sdkCore.Token(sdkCore.ChainId.SEPOLIA, "0xfFf9976782d46CC05630D1f6eBAb18b2324d6B14", 18, "WETH", "Wrapped Ether")), sdkCore.ChainId.POLYGON, new sdkCore.Token(sdkCore.ChainId.POLYGON, "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", 18, "WMATIC", "Wrapped MATIC")), sdkCore.ChainId.POLYGON_MUMBAI, new sdkCore.Token(sdkCore.ChainId.POLYGON_MUMBAI, "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889", 18, "WMATIC", "Wrapped MATIC")), sdkCore.ChainId.CELO, new sdkCore.Token(sdkCore.ChainId.CELO, "0x471ece3750da237f93b8e339c536989b8978a438", 18, "CELO", "Celo native asset")), sdkCore.ChainId.CELO_ALFAJORES, new sdkCore.Token(sdkCore.ChainId.CELO_ALFAJORES, "0xf194afdf50b03e69bd7d057c1aa9e10c9954e4c9", 18, "CELO", "Celo native asset")), _defineProperty__default["default"](_defineProperty__default["default"](_objectSpread2, sdkCore.ChainId.BNB, new sdkCore.Token(sdkCore.ChainId.BNB, "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", 18, "WBNB", "Wrapped BNB")), sdkCore.ChainId.AVALANCHE, new sdkCore.Token(sdkCore.ChainId.AVALANCHE, "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", 18, "WAVAX", "Wrapped AVAX"))));
function isCelo(chainId) {
  return chainId === sdkCore.ChainId.CELO_ALFAJORES || chainId === sdkCore.ChainId.CELO;
}
function getCeloNativeCurrency(chainId) {
  switch (chainId) {
    case sdkCore.ChainId.CELO_ALFAJORES:
      return CELO_CELO_ALFAJORES;
    case sdkCore.ChainId.CELO:
      return CELO_CELO;
    default:
      throw new Error("Not celo");
  }
}
function isMatic(chainId) {
  return chainId === sdkCore.ChainId.POLYGON_MUMBAI || chainId === sdkCore.ChainId.POLYGON;
}
var MaticNativeCurrency = /*#__PURE__*/function (_NativeCurrency) {
  function MaticNativeCurrency(chainId) {
    _classCallCheck__default["default"](this, MaticNativeCurrency);
    if (!isMatic(chainId)) throw new Error("Not matic");
    return _callSuper(this, MaticNativeCurrency, [chainId, 18, "MATIC", "Polygon Matic"]);
  }
  _inherits__default["default"](MaticNativeCurrency, _NativeCurrency);
  return _createClass__default["default"](MaticNativeCurrency, [{
    key: "equals",
    value: function equals(other) {
      return other.isNative && other.chainId === this.chainId;
    }
  }, {
    key: "wrapped",
    get: function get() {
      if (!isMatic(this.chainId)) throw new Error("Not matic");
      var wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
      invariant__default["default"](wrapped instanceof sdkCore.Token);
      return wrapped;
    }
  }]);
}(sdkCore.NativeCurrency);
function isBsc(chainId) {
  return chainId === sdkCore.ChainId.BNB;
}
var BscNativeCurrency = /*#__PURE__*/function (_NativeCurrency2) {
  function BscNativeCurrency(chainId) {
    _classCallCheck__default["default"](this, BscNativeCurrency);
    if (!isBsc(chainId)) throw new Error("Not bnb");
    return _callSuper(this, BscNativeCurrency, [chainId, 18, "BNB", "BNB"]);
  }
  _inherits__default["default"](BscNativeCurrency, _NativeCurrency2);
  return _createClass__default["default"](BscNativeCurrency, [{
    key: "equals",
    value: function equals(other) {
      return other.isNative && other.chainId === this.chainId;
    }
  }, {
    key: "wrapped",
    get: function get() {
      if (!isBsc(this.chainId)) throw new Error("Not bnb");
      var wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
      invariant__default["default"](wrapped instanceof sdkCore.Token);
      return wrapped;
    }
  }]);
}(sdkCore.NativeCurrency);
function isAvalanche(chainId) {
  return chainId === sdkCore.ChainId.AVALANCHE;
}
var AvaxNativeCurrency = /*#__PURE__*/function (_NativeCurrency3) {
  function AvaxNativeCurrency(chainId) {
    _classCallCheck__default["default"](this, AvaxNativeCurrency);
    if (!isAvalanche(chainId)) throw new Error("Not avalanche");
    return _callSuper(this, AvaxNativeCurrency, [chainId, 18, "AVAX", "AVAX"]);
  }
  _inherits__default["default"](AvaxNativeCurrency, _NativeCurrency3);
  return _createClass__default["default"](AvaxNativeCurrency, [{
    key: "equals",
    value: function equals(other) {
      return other.isNative && other.chainId === this.chainId;
    }
  }, {
    key: "wrapped",
    get: function get() {
      if (!isAvalanche(this.chainId)) throw new Error("Not avalanche");
      var wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
      invariant__default["default"](wrapped instanceof sdkCore.Token);
      return wrapped;
    }
  }]);
}(sdkCore.NativeCurrency);
var ExtendedEther = /*#__PURE__*/function (_Ether) {
  function ExtendedEther() {
    _classCallCheck__default["default"](this, ExtendedEther);
    return _callSuper(this, ExtendedEther, arguments);
  }
  _inherits__default["default"](ExtendedEther, _Ether);
  return _createClass__default["default"](ExtendedEther, [{
    key: "wrapped",
    get: function get() {
      var wrapped = WRAPPED_NATIVE_CURRENCY[this.chainId];
      if (wrapped) return wrapped;
      throw new Error("Unsupported chain ID: ".concat(this.chainId));
    }
  }], [{
    key: "onChain",
    value: function onChain(chainId) {
      var _this$_cachedExtended;
      return (_this$_cachedExtended = this._cachedExtendedEther[chainId]) !== null && _this$_cachedExtended !== void 0 ? _this$_cachedExtended : this._cachedExtendedEther[chainId] = new ExtendedEther(chainId);
    }
  }]);
}(sdkCore.Ether);
_defineProperty__default["default"](ExtendedEther, "_cachedExtendedEther", {});
var cachedNativeCurrency = {};
function nativeOnChain(chainId) {
  if (cachedNativeCurrency[chainId]) return cachedNativeCurrency[chainId];
  var nativeCurrency;
  if (isMatic(chainId)) {
    nativeCurrency = new MaticNativeCurrency(chainId);
  } else if (isCelo(chainId)) {
    nativeCurrency = getCeloNativeCurrency(chainId);
  } else if (isBsc(chainId)) {
    nativeCurrency = new BscNativeCurrency(chainId);
  } else if (isAvalanche(chainId)) {
    nativeCurrency = new AvaxNativeCurrency(chainId);
  } else {
    nativeCurrency = ExtendedEther.onChain(chainId);
  }
  return cachedNativeCurrency[chainId] = nativeCurrency;
}
function getSwapCurrencyId(currency) {
  if (currency.isToken) {
    return currency.address;
  }
  return NATIVE_CHAIN_ID;
}
var TOKEN_SHORTHANDS = {
  USDC: (_USDC = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_USDC, sdkCore.ChainId.MAINNET, USDC_MAINNET.address), sdkCore.ChainId.ARBITRUM_ONE, BRIDGED_USDC_ARBITRUM.address), sdkCore.ChainId.ARBITRUM_GOERLI, USDC_ARBITRUM_GOERLI.address), sdkCore.ChainId.OPTIMISM, USDC_OPTIMISM.address), sdkCore.ChainId.OPTIMISM_GOERLI, USDC_OPTIMISM_GOERLI.address), sdkCore.ChainId.POLYGON, USDC_POLYGON.address), sdkCore.ChainId.POLYGON_MUMBAI, USDC_POLYGON_MUMBAI.address), sdkCore.ChainId.BNB, USDC_BSC.address), sdkCore.ChainId.CELO, PORTAL_USDC_CELO.address), sdkCore.ChainId.CELO_ALFAJORES, PORTAL_USDC_CELO.address), _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_USDC, sdkCore.ChainId.GOERLI, USDC_GOERLI.address), sdkCore.ChainId.SEPOLIA, USDC_SEPOLIA.address), sdkCore.ChainId.AVALANCHE, USDC_AVALANCHE.address))
};

exports.ARB = ARB;
exports.BRIDGED_USDC_ARBITRUM = BRIDGED_USDC_ARBITRUM;
exports.BTC_BSC = BTC_BSC;
exports.BUSD_BSC = BUSD_BSC;
exports.CEUR_CELO = CEUR_CELO;
exports.CEUR_CELO_ALFAJORES = CEUR_CELO_ALFAJORES;
exports.CUSD_CELO = CUSD_CELO;
exports.CUSD_CELO_ALFAJORES = CUSD_CELO_ALFAJORES;
exports.DAI = DAI;
exports.DAI_ARBITRUM_ONE = DAI_ARBITRUM_ONE;
exports.DAI_AVALANCHE = DAI_AVALANCHE;
exports.DAI_BSC = DAI_BSC;
exports.DAI_OPTIMISM = DAI_OPTIMISM;
exports.DAI_POLYGON = DAI_POLYGON;
exports.DEFAULT_ERC20_DECIMALS = DEFAULT_ERC20_DECIMALS;
exports.ETH_BSC = ETH_BSC;
exports.LDO = LDO;
exports.MATIC = MATIC;
exports.NATIVE_CHAIN_ID = NATIVE_CHAIN_ID;
exports.OP = OP;
exports.PORTAL_ETH_CELO = PORTAL_ETH_CELO;
exports.PORTAL_USDC_CELO = PORTAL_USDC_CELO;
exports.TOKEN_SHORTHANDS = TOKEN_SHORTHANDS;
exports.UNI = UNI;
exports.USDC_ARBITRUM = USDC_ARBITRUM;
exports.USDC_ARBITRUM_GOERLI = USDC_ARBITRUM_GOERLI;
exports.USDC_AVALANCHE = USDC_AVALANCHE;
exports.USDC_BASE = USDC_BASE;
exports.USDC_BSC = USDC_BSC;
exports.USDC_MAINNET = USDC_MAINNET;
exports.USDC_OPTIMISM = USDC_OPTIMISM;
exports.USDC_POLYGON = USDC_POLYGON;
exports.USDT = USDT;
exports.USDT_ARBITRUM_ONE = USDT_ARBITRUM_ONE;
exports.USDT_AVALANCHE = USDT_AVALANCHE;
exports.USDT_BSC = USDT_BSC;
exports.USDT_OPTIMISM = USDT_OPTIMISM;
exports.USDT_POLYGON = USDT_POLYGON;
exports.WBTC = WBTC;
exports.WBTC_ARBITRUM_ONE = WBTC_ARBITRUM_ONE;
exports.WBTC_CELO = WBTC_CELO;
exports.WBTC_OPTIMISM = WBTC_OPTIMISM;
exports.WBTC_POLYGON = WBTC_POLYGON;
exports.WETH_AVALANCHE = WETH_AVALANCHE;
exports.WETH_POLYGON = WETH_POLYGON;
exports.WETH_POLYGON_MUMBAI = WETH_POLYGON_MUMBAI;
exports.WRAPPED_NATIVE_CURRENCY = WRAPPED_NATIVE_CURRENCY;
exports.getSwapCurrencyId = getSwapCurrencyId;
exports.isAvalanche = isAvalanche;
exports.isBsc = isBsc;
exports.isCelo = isCelo;
exports.isMatic = isMatic;
exports.nativeOnChain = nativeOnChain;
