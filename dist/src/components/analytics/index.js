import { InterfaceEventName } from '@uniswap/analytics-events';
import { sendAnalyticsEvent } from '../../analytics/index.js';

function outboundLink(_ref) {
  var label = _ref.label;
  sendAnalyticsEvent(InterfaceEventName.EXTERNAL_LINK_CLICK, {
    label: label
  });
}

export { outboundLink };
