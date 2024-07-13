import React__default from 'react';
import { QuoteMethod } from '../../state/routing/types.js';
import { isUniswapXTrade } from '../../state/routing/utils.js';
import '../../theme/components/index.js';
import UniswapXRouterLabel from './UniswapXRouterLabel.js';
import { ThemedText } from '../../theme/components/text.js';

function RouterLabel(_ref) {
  var trade = _ref.trade,
    color = _ref.color;
  if (isUniswapXTrade(trade)) {
    return /*#__PURE__*/React__default.createElement(UniswapXRouterLabel, null, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, null, "Uniswap X"));
  }
  if (trade.quoteMethod === QuoteMethod.CLIENT_SIDE || trade.quoteMethod === QuoteMethod.CLIENT_SIDE_FALLBACK) {
    return /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
      color: color
    }, "Uniswap Client");
  }
  return /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: color
  }, "Uniswap API");
}

export { RouterLabel as default };
