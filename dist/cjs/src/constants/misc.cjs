'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sdkCore = require('@uniswap/sdk-core');
var JSBI = require('jsbi');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

var ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

// TODO(WEB-1984): Convert the deadline to minutes and remove unecessary conversions from
// seconds to minutes in the codebase.
// 30 minutes, denominated in seconds
var DEFAULT_DEADLINE_FROM_NOW = 60 * 30;
var L2_DEADLINE_FROM_NOW = 60 * 5;

// transaction popup dismisal amounts
var DEFAULT_TXN_DISMISS_MS = 10000;
var L2_TXN_DISMISS_MS = 5000;
var BIG_INT_ZERO = JSBI__default["default"].BigInt(0);

// one basis JSBI.BigInt
var BIPS_BASE = JSBI__default["default"].BigInt(10000);
new sdkCore.Percent(JSBI__default["default"].BigInt(1), BIPS_BASE);

// used for warning states
var ALLOWED_PRICE_IMPACT_LOW = new sdkCore.Percent(JSBI__default["default"].BigInt(100), BIPS_BASE); // 1%
var ALLOWED_PRICE_IMPACT_MEDIUM = new sdkCore.Percent(JSBI__default["default"].BigInt(300), BIPS_BASE); // 3%
var ALLOWED_PRICE_IMPACT_HIGH = new sdkCore.Percent(JSBI__default["default"].BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
var PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = new sdkCore.Percent(JSBI__default["default"].BigInt(1000), BIPS_BASE); // 10%
// for non expert mode disable swaps above this
var BLOCKED_PRICE_IMPACT_NON_EXPERT = new sdkCore.Percent(JSBI__default["default"].BigInt(1500), BIPS_BASE); // 15%

var ZERO_PERCENT = new sdkCore.Percent("0");
var ONE_HUNDRED_PERCENT = new sdkCore.Percent("1");

exports.ALLOWED_PRICE_IMPACT_HIGH = ALLOWED_PRICE_IMPACT_HIGH;
exports.ALLOWED_PRICE_IMPACT_LOW = ALLOWED_PRICE_IMPACT_LOW;
exports.ALLOWED_PRICE_IMPACT_MEDIUM = ALLOWED_PRICE_IMPACT_MEDIUM;
exports.BIG_INT_ZERO = BIG_INT_ZERO;
exports.BLOCKED_PRICE_IMPACT_NON_EXPERT = BLOCKED_PRICE_IMPACT_NON_EXPERT;
exports.DEFAULT_DEADLINE_FROM_NOW = DEFAULT_DEADLINE_FROM_NOW;
exports.DEFAULT_TXN_DISMISS_MS = DEFAULT_TXN_DISMISS_MS;
exports.L2_DEADLINE_FROM_NOW = L2_DEADLINE_FROM_NOW;
exports.L2_TXN_DISMISS_MS = L2_TXN_DISMISS_MS;
exports.ONE_HUNDRED_PERCENT = ONE_HUNDRED_PERCENT;
exports.PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN;
exports.ZERO_ADDRESS = ZERO_ADDRESS;
exports.ZERO_PERCENT = ZERO_PERCENT;
