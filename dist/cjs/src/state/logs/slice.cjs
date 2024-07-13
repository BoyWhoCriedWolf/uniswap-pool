'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var toolkit = require('@reduxjs/toolkit');
var utils = require('./utils.cjs');

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var slice = toolkit.createSlice({
  name: "logs",
  initialState: {},
  reducers: {
    addListener: function addListener(state, _ref) {
      var _ref$payload = _ref.payload,
        chainId = _ref$payload.chainId,
        filter = _ref$payload.filter;
      if (!state[chainId]) state[chainId] = {};
      var key = utils.filterToKey(filter);
      if (!state[chainId][key]) state[chainId][key] = {
        listeners: 1
      };else state[chainId][key].listeners++;
    },
    fetchingLogs: function fetchingLogs(state, _ref2) {
      var _ref2$payload = _ref2.payload,
        chainId = _ref2$payload.chainId,
        filters = _ref2$payload.filters,
        blockNumber = _ref2$payload.blockNumber;
      if (!state[chainId]) return;
      var _iterator = _createForOfIteratorHelper(filters),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var filter = _step.value;
          var key = utils.filterToKey(filter);
          if (!state[chainId][key]) continue;
          state[chainId][key].fetchingBlockNumber = blockNumber;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    fetchedLogs: function fetchedLogs(state, _ref3) {
      var _ref3$payload = _ref3.payload,
        chainId = _ref3$payload.chainId,
        filter = _ref3$payload.filter,
        results = _ref3$payload.results;
      if (!state[chainId]) return;
      var key = utils.filterToKey(filter);
      var fetchState = state[chainId][key];
      if (!fetchState || fetchState.results && fetchState.results.blockNumber > results.blockNumber) return;
      fetchState.results = results;
    },
    fetchedLogsError: function fetchedLogsError(state, _ref4) {
      var _ref4$payload = _ref4.payload,
        chainId = _ref4$payload.chainId,
        filter = _ref4$payload.filter,
        blockNumber = _ref4$payload.blockNumber;
      if (!state[chainId]) return;
      var key = utils.filterToKey(filter);
      var fetchState = state[chainId][key];
      if (!fetchState || fetchState.results && fetchState.results.blockNumber > blockNumber) return;
      fetchState.results = {
        blockNumber: blockNumber,
        error: true
      };
    },
    removeListener: function removeListener(state, _ref5) {
      var _ref5$payload = _ref5.payload,
        chainId = _ref5$payload.chainId,
        filter = _ref5$payload.filter;
      if (!state[chainId]) return;
      var key = utils.filterToKey(filter);
      if (!state[chainId][key]) return;
      state[chainId][key].listeners--;
    }
  }
});
var logs = slice.reducer;
var _slice$actions = slice.actions;
  _slice$actions.addListener;
  _slice$actions.removeListener;
  var fetchedLogs = _slice$actions.fetchedLogs,
  fetchedLogsError = _slice$actions.fetchedLogsError,
  fetchingLogs = _slice$actions.fetchingLogs;

exports["default"] = logs;
exports.fetchedLogs = fetchedLogs;
exports.fetchedLogsError = fetchedLogsError;
exports.fetchingLogs = fetchingLogs;
