import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _get from '@babel/runtime/helpers/get';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/inherits';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { deepCopy } from '@ethersproject/properties';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { isPlain } from '@reduxjs/toolkit';
import { AVERAGE_L1_BLOCK_TIME } from '../constants/chainInfo.js';
import { CHAIN_IDS_TO_NAMES } from '../constants/chains.js';

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
var AppStaticJsonRpcProvider = /*#__PURE__*/function (_StaticJsonRpcProvide) {
  function AppStaticJsonRpcProvider(chainId, url) {
    var _this2;
    _classCallCheck(this, AppStaticJsonRpcProvider);
    // Including networkish allows ethers to skip the initial detectNetwork call.
    _this2 = _callSuper(this, AppStaticJsonRpcProvider, [url, /* networkish= */{
      chainId: chainId,
      name: CHAIN_IDS_TO_NAMES[chainId]
    }]);

    // NB: Third-party providers (eg MetaMask) will have their own polling intervals,
    // which should be left as-is to allow operations (eg transaction confirmation) to resolve faster.
    // Network providers (eg AppStaticJsonRpcProvider) need to update less frequently to be considered responsive.
    _defineProperty(_this2, "_blockCache", new Map());
    _this2.pollingInterval = AVERAGE_L1_BLOCK_TIME;
    return _this2;
  }
  _inherits(AppStaticJsonRpcProvider, _StaticJsonRpcProvide);
  return _createClass(AppStaticJsonRpcProvider, [{
    key: "blockCache",
    get: function get() {
      var _this3 = this;
      // If the blockCache has not yet been initialized this block, do so by
      // setting a listener to clear it on the next block.
      if (!this._blockCache.size) {
        this.once("block", function () {
          return _this3._blockCache.clear();
        });
      }
      return this._blockCache;
    }
  }, {
    key: "send",
    value: function send(method, params) {
      // Only cache eth_call's.
      if (method !== "eth_call") return _get(_getPrototypeOf(AppStaticJsonRpcProvider.prototype), "send", this).call(this, method, params);

      // Only cache if params are serializable.
      if (!isPlain(params)) return _get(_getPrototypeOf(AppStaticJsonRpcProvider.prototype), "send", this).call(this, method, params);
      var key = "call:".concat(JSON.stringify(params));
      var cached = this.blockCache.get(key);
      if (cached) {
        this.emit("debug", {
          action: "request",
          request: deepCopy({
            method: method,
            params: params,
            id: "cache"
          }),
          provider: this
        });
        return cached;
      }
      var result = _get(_getPrototypeOf(AppStaticJsonRpcProvider.prototype), "send", this).call(this, method, params);
      this.blockCache.set(key, result);
      return result;
    }
  }]);
}(StaticJsonRpcProvider);

export { AppStaticJsonRpcProvider as default };
