'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _possibleConstructorReturn = require('@babel/runtime/helpers/possibleConstructorReturn');
var _get = require('@babel/runtime/helpers/get');
var _getPrototypeOf = require('@babel/runtime/helpers/getPrototypeOf');
var _inherits = require('@babel/runtime/helpers/inherits');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var sdkCore = require('@uniswap/sdk-core');
var walletconnectV2 = require('@web3-react/walletconnect-v2');
var index = require('../analytics/index.cjs');
var chains = require('../constants/chains.cjs');
var zIndex = require('../theme/zIndex.cjs');
var userAgent = require('../utils/userAgent.cjs');
var networks = require('../constants/networks.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _possibleConstructorReturn__default = /*#__PURE__*/_interopDefaultLegacy(_possibleConstructorReturn);
var _get__default = /*#__PURE__*/_interopDefaultLegacy(_get);
var _getPrototypeOf__default = /*#__PURE__*/_interopDefaultLegacy(_getPrototypeOf);
var _inherits__default = /*#__PURE__*/_interopDefaultLegacy(_inherits);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

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

// Avoid testing for the best URL by only passing a single URL per chain.
// Otherwise, WC will not initialize until all URLs have been tested (see getBestUrl in web3-react).
var RPC_URLS_WITHOUT_FALLBACKS = Object.entries(networks.RPC_URLS).reduce(function (map, _ref) {
  var _ref2 = _slicedToArray__default["default"](_ref, 2),
    chainId = _ref2[0],
    urls = _ref2[1];
  return _objectSpread(_objectSpread({}, map), {}, _defineProperty__default["default"]({}, chainId, urls[0]));
}, {});
var WalletConnectV2 = /*#__PURE__*/function (_WalletConnect) {
  function WalletConnectV2(_ref3) {
    var _this2;
    var actions = _ref3.actions,
      defaultChainId = _ref3.defaultChainId,
      _ref3$qrcode = _ref3.qrcode,
      qrcode = _ref3$qrcode === void 0 ? true : _ref3$qrcode,
      onError = _ref3.onError;
    _classCallCheck__default["default"](this, WalletConnectV2);
    var darkmode = Boolean(window.matchMedia("(prefers-color-scheme: dark)"));
    _this2 = _callSuper(this, WalletConnectV2, [{
      actions: actions,
      options: {
        // projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string,
        projectId: "c6c9bacd35afa3eb9e6cccf6d8464395",
        chains: [defaultChainId],
        optionalChains: [].concat(_toConsumableArray__default["default"](chains.L1_CHAIN_IDS), _toConsumableArray__default["default"](chains.L2_CHAIN_IDS)),
        showQrModal: qrcode,
        rpcMap: RPC_URLS_WITHOUT_FALLBACKS,
        // as of 6/16/2023 there are no docs for `optionalMethods`
        // this set of optional methods fixes a bug we encountered where permit2 signatures were never received from the connected wallet
        // source: https://uniswapteam.slack.com/archives/C03R5G8T8BH/p1686858618164089?thread_ts=1686778867.145689&cid=C03R5G8T8BH
        optionalMethods: ["eth_signTypedData", "eth_signTypedData_v4", "eth_sign"],
        qrModalOptions: {
          desktopWallets: undefined,
          enableExplorer: true,
          explorerExcludedWalletIds: undefined,
          explorerRecommendedWalletIds: undefined,
          mobileWallets: undefined,
          privacyPolicyUrl: undefined,
          termsOfServiceUrl: undefined,
          themeMode: darkmode ? "dark" : "light",
          themeVariables: {
            "--wcm-font-family": '"Inter custom", sans-serif',
            "--wcm-z-index": zIndex.Z_INDEX.modal.toString()
          },
          walletImages: undefined
        }
      },
      onError: onError
    }]);
    _defineProperty__default["default"](_this2, "ANALYTICS_EVENT", "Wallet Connect QR Scan");
    return _this2;
  }
  _inherits__default["default"](WalletConnectV2, _WalletConnect);
  return _createClass__default["default"](WalletConnectV2, [{
    key: "activate",
    value: function activate(chainId) {
      index.sendAnalyticsEvent(this.ANALYTICS_EVENT);
      return _get__default["default"](_getPrototypeOf__default["default"](WalletConnectV2.prototype), "activate", this).call(this, chainId);
    }
  }]);
}(walletconnectV2.WalletConnect);

// Custom class for Uniswap Wallet specific functionality
var UniwalletConnect = /*#__PURE__*/function (_WalletConnectV) {
  function UniwalletConnect(_ref4) {
    var _this3;
    var actions = _ref4.actions,
      onError = _ref4.onError;
    _classCallCheck__default["default"](this, UniwalletConnect);
    // disables walletconnect's proprietary qr code modal; instead UniwalletModal will listen for events to trigger our custom modal
    _this3 = _callSuper(this, UniwalletConnect, [{
      actions: actions,
      defaultChainId: sdkCore.ChainId.MAINNET,
      qrcode: false,
      onError: onError
    }]);
    _defineProperty__default["default"](_this3, "ANALYTICS_EVENT", "Uniswap Wallet QR Scan");
    _this3.events.once(walletconnectV2.URI_AVAILABLE, function () {
      var _this3$provider;
      (_this3$provider = _this3.provider) === null || _this3$provider === void 0 || _this3$provider.events.on("disconnect", _this3.deactivate);
    });
    _this3.events.on(walletconnectV2.URI_AVAILABLE, function (uri) {
      if (!uri) return;
      // Emits custom wallet connect code, parseable by the Uniswap Wallet
      _this3.events.emit(UniwalletConnect.UNI_URI_AVAILABLE, "hello_uniwallet:".concat(uri));

      // Opens deeplink to Uniswap Wallet if on iOS
      if (userAgent.isIOS) {
        // Using window.location.href to open the deep link ensures smooth navigation and leverages OS handling for installed apps,
        // avoiding potential popup blockers or inconsistent behavior associated with window.open
        window.location.href = "uniswap://wc?uri=".concat(encodeURIComponent(uri));
      }
    });
    return _this3;
  }
  _inherits__default["default"](UniwalletConnect, _WalletConnectV);
  return _createClass__default["default"](UniwalletConnect, [{
    key: "deactivate",
    value: function deactivate() {
      this.events.emit(walletconnectV2.URI_AVAILABLE);
      return _get__default["default"](_getPrototypeOf__default["default"](UniwalletConnect.prototype), "deactivate", this).call(this);
    }
  }]);
}(WalletConnectV2);
_defineProperty__default["default"](UniwalletConnect, "UNI_URI_AVAILABLE", "uni_uri_available");

exports.UniwalletConnect = UniwalletConnect;
exports.WalletConnectV2 = WalletConnectV2;
