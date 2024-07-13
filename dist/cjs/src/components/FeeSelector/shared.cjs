'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var index = require('../../../node_modules/@lingui/react/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var v3Sdk = require('@uniswap/v3-sdk');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

var FEE_AMOUNT_DETAIL = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, v3Sdk.FeeAmount.LOWEST, {
  label: "0.01",
  description: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "6AHHoU",
    message: "Best for very stable pairs."
  }),
  supportedChains: [sdkCore.ChainId.ARBITRUM_ONE, sdkCore.ChainId.BNB, sdkCore.ChainId.CELO, sdkCore.ChainId.CELO_ALFAJORES, sdkCore.ChainId.MAINNET, sdkCore.ChainId.OPTIMISM, sdkCore.ChainId.POLYGON, sdkCore.ChainId.POLYGON_MUMBAI, sdkCore.ChainId.AVALANCHE, sdkCore.ChainId.BASE]
}), v3Sdk.FeeAmount.LOW, {
  label: "0.05",
  description: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "ig/lul",
    message: "Best for stable pairs."
  }),
  supportedChains: sdkCore.SUPPORTED_CHAINS
}), v3Sdk.FeeAmount.MEDIUM, {
  label: "0.3",
  description: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "DlUgFZ",
    message: "Best for most pairs."
  }),
  supportedChains: sdkCore.SUPPORTED_CHAINS
}), v3Sdk.FeeAmount.HIGH, {
  label: "1",
  description: /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "fiGxJ/",
    message: "Best for exotic pairs."
  }),
  supportedChains: sdkCore.SUPPORTED_CHAINS
});

exports.FEE_AMOUNT_DETAIL = FEE_AMOUNT_DETAIL;
