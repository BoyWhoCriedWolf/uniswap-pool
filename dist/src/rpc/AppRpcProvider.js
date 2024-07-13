import _asyncToGenerator from '@babel/runtime/helpers/asyncToGenerator';
import _classCallCheck from '@babel/runtime/helpers/classCallCheck';
import _createClass from '@babel/runtime/helpers/createClass';
import _possibleConstructorReturn from '@babel/runtime/helpers/possibleConstructorReturn';
import _getPrototypeOf from '@babel/runtime/helpers/getPrototypeOf';
import _inherits from '@babel/runtime/helpers/inherits';
import _regeneratorRuntime from '@babel/runtime/regenerator';
import { Provider } from '@ethersproject/providers';
import AppStaticJsonRpcProvider from './StaticJsonRpcProvider.js';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
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
function checkNetworks(networks) {
  var result = null;
  for (var i = 0; i < networks.length; i++) {
    var network = networks[i];

    // Null! We do not know our network; bail.
    if (network == null) {
      throw new Error("unknown network");
    }
    if (result) {
      // Make sure the network matches the previous networks
      if (!(result.name === network.name && result.chainId === network.chainId && (result.ensAddress === network.ensAddress || result.ensAddress == null && network.ensAddress == null))) {
        throw new Error("networks mismatch");
      }
    } else {
      result = network;
    }
  }
  return result;
}
/**
 * This provider balances requests among multiple JSON-RPC endpoints.
 */
var AppRpcProvider = /*#__PURE__*/function (_AppStaticJsonRpcProv) {
  function AppRpcProvider(chainId, providers) {
    var _this2;
    var evaluationIntervalMs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 30000;
    _classCallCheck(this, AppRpcProvider);
    if (providers.length === 0) throw new Error("providers array empty");
    providers.forEach(function (provider, i) {
      if (!Provider.isProvider(provider)) throw new Error("invalid provider ".concat(i));
    });
    checkNetworks(providers.map(function (p) {
      return p.network;
    }));
    _this2 = _callSuper(this, AppRpcProvider, [chainId, providers[0].connection.url]);
    _this2.providerEvaluations = providers.map(function (provider) {
      return {
        provider: provider,
        performance: {
          callCount: 0,
          latency: 1,
          failureCount: 0,
          lastEvaluated: 0
        }
      };
    });
    _this2.evaluationIntervalMs = evaluationIntervalMs;
    return _this2;
  }

  /**
   * Perform a JSON-RPC request.
   * Throws an error if all providers fail to perform the operation.
   */
  _inherits(AppRpcProvider, _AppStaticJsonRpcProv);
  return _createClass(AppRpcProvider, [{
    key: "perform",
    value: function () {
      var _perform = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(method, params) {
        var _this3 = this;
        var currentTime, results, i, _iterator, _step, _step$value, provider, performance;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // Periodically evaluate all providers
              currentTime = Date.now(); // Note that this async action will not affect the current perform call
              this.providerEvaluations.forEach(function (providerEval) {
                if (currentTime - providerEval.performance.lastEvaluated >= _this3.evaluationIntervalMs) {
                  _this3.evaluateProvider(providerEval);
                }
              });
              this.providerEvaluations = AppRpcProvider.sortProviders(this.providerEvaluations.slice());

              // Always broadcast "sendTransaction" to all backends
              if (!(method === "sendTransaction")) {
                _context.next = 17;
                break;
              }
              _context.next = 6;
              return Promise.all(this.providerEvaluations.map(function (_ref) {
                var performance = _ref.performance,
                  provider = _ref.provider;
                performance.callCount++;
                return provider.sendTransaction(params.signedTransaction).then(function (result) {
                  return result.hash;
                }, function (error) {
                  return error;
                });
              }));
            case 6:
              results = _context.sent;
              i = 0;
            case 8:
              if (!(i < results.length)) {
                _context.next = 14;
                break;
              }
              if (!(typeof results[i] === "string")) {
                _context.next = 11;
                break;
              }
              return _context.abrupt("return", results[i]);
            case 11:
              i++;
              _context.next = 8;
              break;
            case 14:
              throw results[0];
            case 17:
              _iterator = _createForOfIteratorHelper(this.providerEvaluations);
              _context.prev = 18;
              _iterator.s();
            case 20:
              if ((_step = _iterator.n()).done) {
                _context.next = 35;
                break;
              }
              _step$value = _step.value, provider = _step$value.provider, performance = _step$value.performance;
              performance.callCount++;
              _context.prev = 23;
              _context.next = 26;
              return provider.perform(method, params);
            case 26:
              return _context.abrupt("return", _context.sent);
            case 29:
              _context.prev = 29;
              _context.t0 = _context["catch"](23);
              performance.failureCount++;
              console.warn("rpc action failed", _context.t0);
            case 33:
              _context.next = 20;
              break;
            case 35:
              _context.next = 40;
              break;
            case 37:
              _context.prev = 37;
              _context.t1 = _context["catch"](18);
              _iterator.e(_context.t1);
            case 40:
              _context.prev = 40;
              _iterator.f();
              return _context.finish(40);
            case 43:
              throw new Error("All providers failed to perform the operation.");
            case 44:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[18, 37, 40, 43], [23, 29]]);
      }));
      function perform(_x, _x2) {
        return _perform.apply(this, arguments);
      }
      return perform;
    }()
    /**
     * Evaluates the performance of a provider. Updates latency and failure count metrics.
     */
  }, {
    key: "evaluateProvider",
    value: function () {
      var _evaluateProvider = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2(config) {
        var startTime, latency;
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              startTime = Date.now();
              config.performance.callCount++;
              _context2.prev = 2;
              _context2.next = 5;
              return config.provider.getBlockNumber();
            case 5:
              _context2.next = 10;
              break;
            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2["catch"](2);
              config.performance.failureCount++;
            case 10:
              latency = Date.now() - startTime;
              config.performance.latency += latency;
              config.performance.lastEvaluated = Date.now();
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, null, [[2, 7]]);
      }));
      function evaluateProvider(_x3) {
        return _evaluateProvider.apply(this, arguments);
      }
      return evaluateProvider;
    }()
  }], [{
    key: "sortProviders",
    value: function sortProviders(providerEvaluations) {
      return providerEvaluations.sort(function (a, b) {
        // Provider a calculations
        var aAverageLatency = a.performance.latency / (a.performance.callCount || 1);
        var aFailRate = (a.performance.failureCount || 0.01) / (a.performance.callCount || 1);

        // Provider b calculations
        var bAverageLatency = b.performance.latency / (b.performance.callCount || 1);
        var bFailRate = (b.performance.failureCount || 0.01) / (b.performance.callCount || 1);
        if (aFailRate < bFailRate) return -1;
        if (aAverageLatency < bAverageLatency) return -1;
        return 1;
      });
    }
  }]);
}(AppStaticJsonRpcProvider);

export { AppRpcProvider as default };
