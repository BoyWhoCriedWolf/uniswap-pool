'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tokens = require('../../constants/tokens.cjs');

// List of tokens that require existing allowance to be reset before approving the new amount (mainnet only).
// See the `approve` function here: https://etherscan.io/address/0xdAC17F958D2ee523a2206206994597C13D831ec7#code
var RESET_APPROVAL_TOKENS = [tokens.USDT, tokens.LDO];

exports.RESET_APPROVAL_TOKENS = RESET_APPROVAL_TOKENS;
