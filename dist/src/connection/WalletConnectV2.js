import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _get from '@babel/runtime/helpers/get';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/inherits';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { ChainId } from '@uniswap/sdk-core';
import { URI_AVAILABLE, WalletConnect } from '@web3-react/walletconnect-v2';
import { sendAnalyticsEvent } from '../analytics/index.js';
import { L1_CHAIN_IDS, L2_CHAIN_IDS } from '../constants/chains.js';
import { Z_INDEX } from '../theme/zIndex.js';
import { isIOS } from '../utils/userAgent.js';
import { RPC_URLS } from '../constants/networks.js';

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
  derived = _getPrototypeOf(derived);
  return _possibleConstructorReturn(_this, isNativeReflectConstruct() ? Reflect.construct(derived, args || [], _getPrototypeOf(_this).constructor) : derived.apply(_this, args));
}
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// Avoid testing for the best URL by only passing a single URL per chain.
// Otherwise, WC will not initialize until all URLs have been tested (see getBestUrl in web3-react).
var RPC_URLS_WITHOUT_FALLBACKS = Object.entries(RPC_URLS).reduce(function (map, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
    chainId = _ref2[0],
    urls = _ref2[1];
  return _objectSpread(_objectSpread({}, map), {}, _defineProperty({}, chainId, urls[0]));
}, {});
var WalletConnectV2 = /*#__PURE__*/function (_WalletConnect) {
  function WalletConnectV2(_ref3) {
    var _this2;
    var actions = _ref3.actions,
      defaultChainId = _ref3.defaultChainId,
      _ref3$qrcode = _ref3.qrcode,
      qrcode = _ref3$qrcode === void 0 ? true : _ref3$qrcode,
      onError = _ref3.onError;
    _classCallCheck(this, WalletConnectV2);
    var darkmode = Boolean(window.matchMedia("(prefers-color-scheme: dark)"));
    _this2 = _callSuper(this, WalletConnectV2, [{
      actions: actions,
      options: {
        // projectId: process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID as string,
        projectId: "c6c9bacd35afa3eb9e6cccf6d8464395",
        chains: [defaultChainId],
        optionalChains: [].concat(_toConsumableArray(L1_CHAIN_IDS), _toConsumableArray(L2_CHAIN_IDS)),
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
            "--wcm-z-index": Z_INDEX.modal.toString()
          },
          walletImages: undefined
        }
      },
      onError: onError
    }]);
    _defineProperty(_this2, "ANALYTICS_EVENT", "Wallet Connect QR Scan");
    return _this2;
  }
  _inherits(WalletConnectV2, _WalletConnect);
  return _createClass(WalletConnectV2, [{
    key: "activate",
    value: function activate(chainId) {
      sendAnalyticsEvent(this.ANALYTICS_EVENT);
      return _get(_getPrototypeOf(WalletConnectV2.prototype), "activate", this).call(this, chainId);
    }
  }]);
}(WalletConnect);

// Custom class for Uniswap Wallet specific functionality
var UniwalletConnect = /*#__PURE__*/function (_WalletConnectV) {
  function UniwalletConnect(_ref4) {
    var _this3;
    var actions = _ref4.actions,
      onError = _ref4.onError;
    _classCallCheck(this, UniwalletConnect);
    // disables walletconnect's proprietary qr code modal; instead UniwalletModal will listen for events to trigger our custom modal
    _this3 = _callSuper(this, UniwalletConnect, [{
      actions: actions,
      defaultChainId: ChainId.MAINNET,
      qrcode: false,
      onError: onError
    }]);
    _defineProperty(_this3, "ANALYTICS_EVENT", "Uniswap Wallet QR Scan");
    _this3.events.once(URI_AVAILABLE, function () {
      var _this3$provider;
      (_this3$provider = _this3.provider) === null || _this3$provider === void 0 || _this3$provider.events.on("disconnect", _this3.deactivate);
    });
    _this3.events.on(URI_AVAILABLE, function (uri) {
      if (!uri) return;
      // Emits custom wallet connect code, parseable by the Uniswap Wallet
      _this3.events.emit(UniwalletConnect.UNI_URI_AVAILABLE, "hello_uniwallet:".concat(uri));

      // Opens deeplink to Uniswap Wallet if on iOS
      if (isIOS) {
        // Using window.location.href to open the deep link ensures smooth navigation and leverages OS handling for installed apps,
        // avoiding potential popup blockers or inconsistent behavior associated with window.open
        window.location.href = "uniswap://wc?uri=".concat(encodeURIComponent(uri));
      }
    });
    return _this3;
  }
  _inherits(UniwalletConnect, _WalletConnectV);
  return _createClass(UniwalletConnect, [{
    key: "deactivate",
    value: function deactivate() {
      this.events.emit(URI_AVAILABLE);
      return _get(_getPrototypeOf(UniwalletConnect.prototype), "deactivate", this).call(this);
    }
  }]);
}(WalletConnectV2);
_defineProperty(UniwalletConnect, "UNI_URI_AVAILABLE", "uni_uri_available");

export { UniwalletConnect, WalletConnectV2 };
