'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _classCallCheck = require('@babel/runtime/helpers/classCallCheck');
var _createClass = require('@babel/runtime/helpers/createClass');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var utils = require('./utils.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _classCallCheck__default = /*#__PURE__*/_interopDefaultLegacy(_classCallCheck);
var _createClass__default = /*#__PURE__*/_interopDefaultLegacy(_createClass);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

// These events should happen in this order.
var SwapEventType = /*#__PURE__*/function (SwapEventType) {
  SwapEventType["FIRST_SWAP_ACTION"] = "FIRST_SWAP_ACTION";
  SwapEventType["FIRST_QUOTE_FETCH_STARTED"] = "FIRST_QUOTE_FETCH_STARTED";
  SwapEventType["FIRST_SWAP_SIGNATURE_REQUESTED"] = "FIRST_SWAP_SIGNATURE_REQUESTED";
  SwapEventType["FIRST_SWAP_SIGNATURE_COMPLETED"] = "FIRST_SWAP_SIGNATURE_COMPLETED";
  SwapEventType["FIRST_SWAP_SUCCESS"] = "FIRST_SWAP_SUCCESS";
  return SwapEventType;
}({});
var SwapEventTimestampTracker = /*#__PURE__*/function () {
  function SwapEventTimestampTracker() {
    _classCallCheck__default["default"](this, SwapEventTimestampTracker);
    _defineProperty__default["default"](this, "createdAt", Date.now());
    _defineProperty__default["default"](this, "timestamps", new Map());
  } // Private constructor to prevent direct construction calls with the `new` operator.
  return _createClass__default["default"](SwapEventTimestampTracker, [{
    key: "hasTimestamp",
    value: function hasTimestamp(eventType) {
      return this.timestamps.has(eventType);
    }
  }, {
    key: "setElapsedTime",
    value: function setElapsedTime(eventType) {
      if (this.timestamps.has(eventType)) return undefined;
      var elapsedTime = utils.calculateElapsedTimeWithPerformanceMarkMs(eventType, this.createdAt);
      if (elapsedTime) {
        this.timestamps.set(eventType, elapsedTime);
      }
      return this.timestamps.get(eventType);
    }

    /**
     * Returns the time elapsed between the given event and the start event,
     * or page load if the start event is not provided.
     */
  }, {
    key: "getElapsedTime",
    value: function getElapsedTime(eventType, startEventType) {
      var endTime = this.timestamps.get(eventType);
      if (!endTime) return undefined;
      var startTime = 0;
      if (startEventType) {
        var _this$timestamps$get;
        startTime = (_this$timestamps$get = this.timestamps.get(startEventType)) !== null && _this$timestamps$get !== void 0 ? _this$timestamps$get : 0;
      }
      return endTime - startTime;
    }
  }], [{
    key: "getInstance",
    value: function getInstance() {
      if (!this._instance) {
        this._instance = new SwapEventTimestampTracker();
      }
      return this._instance;
    }
  }]);
}();
var timestampTracker = SwapEventTimestampTracker.getInstance();

exports.SwapEventTimestampTracker = SwapEventTimestampTracker;
exports.SwapEventType = SwapEventType;
exports.timestampTracker = timestampTracker;
