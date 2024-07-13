import React__default from 'react';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { ChainId, SUPPORTED_CHAINS } from '@uniswap/sdk-core';
import { FeeAmount } from '@uniswap/v3-sdk';

var FEE_AMOUNT_DETAIL = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, FeeAmount.LOWEST, {
  label: "0.01",
  description: /*#__PURE__*/React__default.createElement(Trans, {
    id: "6AHHoU",
    message: "Best for very stable pairs."
  }),
  supportedChains: [ChainId.ARBITRUM_ONE, ChainId.BNB, ChainId.CELO, ChainId.CELO_ALFAJORES, ChainId.MAINNET, ChainId.OPTIMISM, ChainId.POLYGON, ChainId.POLYGON_MUMBAI, ChainId.AVALANCHE, ChainId.BASE]
}), FeeAmount.LOW, {
  label: "0.05",
  description: /*#__PURE__*/React__default.createElement(Trans, {
    id: "ig/lul",
    message: "Best for stable pairs."
  }),
  supportedChains: SUPPORTED_CHAINS
}), FeeAmount.MEDIUM, {
  label: "0.3",
  description: /*#__PURE__*/React__default.createElement(Trans, {
    id: "DlUgFZ",
    message: "Best for most pairs."
  }),
  supportedChains: SUPPORTED_CHAINS
}), FeeAmount.HIGH, {
  label: "1",
  description: /*#__PURE__*/React__default.createElement(Trans, {
    id: "fiGxJ/",
    message: "Best for exotic pairs."
  }),
  supportedChains: SUPPORTED_CHAINS
});

export { FEE_AMOUNT_DETAIL };
