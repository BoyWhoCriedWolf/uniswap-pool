'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var analytics = require('@uniswap/analytics');
var utils = require('jotai/utils');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);

var allowAnalyticsAtomKey = 'allow_analytics';
var allowAnalyticsAtom = utils.atomWithStorage(allowAnalyticsAtomKey, true);
var Trace = /*#__PURE__*/React.memo(function (props) {
  var allowAnalytics = utils.useAtomValue(allowAnalyticsAtom);
  var shouldLogImpression = allowAnalytics ? props.shouldLogImpression : false;
  return /*#__PURE__*/React__default["default"].createElement(analytics.Trace, _extends__default["default"]({}, props, {
    shouldLogImpression: shouldLogImpression
  }));
});
Trace.displayName = 'Trace';
var TraceEvent = /*#__PURE__*/React.memo(function (props) {
  var allowAnalytics = utils.useAtomValue(allowAnalyticsAtom);
  var shouldLogImpression = allowAnalytics ? props.shouldLogImpression : false;
  return /*#__PURE__*/React__default["default"].createElement(analytics.TraceEvent, _extends__default["default"]({}, props, {
    shouldLogImpression: shouldLogImpression
  }));
});
TraceEvent.displayName = 'TraceEvent';
var sendAnalyticsEvent = function sendAnalyticsEvent(event, properties) {
  var allowAnalytics = true;
  try {
    var value = localStorage.getItem(allowAnalyticsAtomKey);
    if (typeof value === 'string') {
      allowAnalytics = JSON.parse(value);
    }
    // eslint-disable-next-line no-empty
  } catch (_unused) {}
  if (allowAnalytics) {
    analytics.sendAnalyticsEvent(event, properties);
  }
};

// This is only used for initial page load so we can get the user's country
var sendInitializationEvent = function sendInitializationEvent(event, properties) {
  analytics.sendAnalyticsEvent(event, properties);
};

Object.defineProperty(exports, 'OriginApplication', {
  enumerable: true,
  get: function () { return analytics.OriginApplication; }
});
Object.defineProperty(exports, 'getDeviceId', {
  enumerable: true,
  get: function () { return analytics.getDeviceId; }
});
Object.defineProperty(exports, 'initializeAnalytics', {
  enumerable: true,
  get: function () { return analytics.initializeAnalytics; }
});
Object.defineProperty(exports, 'useTrace', {
  enumerable: true,
  get: function () { return analytics.useTrace; }
});
Object.defineProperty(exports, 'user', {
  enumerable: true,
  get: function () { return analytics.user; }
});
exports.Trace = Trace;
exports.TraceEvent = TraceEvent;
exports.allowAnalyticsAtom = allowAnalyticsAtom;
exports.sendAnalyticsEvent = sendAnalyticsEvent;
exports.sendInitializationEvent = sendInitializationEvent;
