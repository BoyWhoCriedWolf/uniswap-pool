'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var analyticsEvents = require('@uniswap/analytics-events');
var index = require('../../analytics/index.cjs');

function outboundLink(_ref) {
  var label = _ref.label;
  index.sendAnalyticsEvent(analyticsEvents.InterfaceEventName.EXTERNAL_LINK_CLICK, {
    label: label
  });
}

exports.outboundLink = outboundLink;
