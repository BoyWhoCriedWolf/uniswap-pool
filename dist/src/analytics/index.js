import React__default, { memo } from 'react';
import _extends from '@babel/runtime/helpers/extends';
import { Trace as Trace$1, TraceEvent as TraceEvent$1, sendAnalyticsEvent as sendAnalyticsEvent$1 } from '@uniswap/analytics';
export { OriginApplication, getDeviceId, initializeAnalytics, useTrace, user } from '@uniswap/analytics';
import { atomWithStorage, useAtomValue } from 'jotai/utils';

const allowAnalyticsAtomKey = 'allow_analytics';
const allowAnalyticsAtom = atomWithStorage(allowAnalyticsAtomKey, true);
const Trace = /*#__PURE__*/memo(props => {
  const allowAnalytics = useAtomValue(allowAnalyticsAtom);
  const shouldLogImpression = allowAnalytics ? props.shouldLogImpression : false;
  return /*#__PURE__*/React__default.createElement(Trace$1, _extends({}, props, {
    shouldLogImpression: shouldLogImpression
  }));
});
Trace.displayName = 'Trace';
const TraceEvent = /*#__PURE__*/memo(props => {
  const allowAnalytics = useAtomValue(allowAnalyticsAtom);
  const shouldLogImpression = allowAnalytics ? props.shouldLogImpression : false;
  return /*#__PURE__*/React__default.createElement(TraceEvent$1, _extends({}, props, {
    shouldLogImpression: shouldLogImpression
  }));
});
TraceEvent.displayName = 'TraceEvent';
const sendAnalyticsEvent = (event, properties) => {
  let allowAnalytics = true;
  try {
    const value = localStorage.getItem(allowAnalyticsAtomKey);
    if (typeof value === 'string') {
      allowAnalytics = JSON.parse(value);
    }
    // eslint-disable-next-line no-empty
  } catch {}
  if (allowAnalytics) {
    sendAnalyticsEvent$1(event, properties);
  }
};

// This is only used for initial page load so we can get the user's country
const sendInitializationEvent = (event, properties) => {
  sendAnalyticsEvent$1(event, properties);
};

export { Trace, TraceEvent, allowAnalyticsAtom, sendAnalyticsEvent, sendInitializationEvent };
