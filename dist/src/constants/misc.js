import { Percent } from '@uniswap/sdk-core';
import JSBI from 'jsbi';

const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

// TODO(WEB-1984): Convert the deadline to minutes and remove unecessary conversions from
// seconds to minutes in the codebase.
// 30 minutes, denominated in seconds
const DEFAULT_DEADLINE_FROM_NOW = 60 * 30;
const L2_DEADLINE_FROM_NOW = 60 * 5;

// transaction popup dismisal amounts
const DEFAULT_TXN_DISMISS_MS = 10000;
const L2_TXN_DISMISS_MS = 5000;
const BIG_INT_ZERO = JSBI.BigInt(0);

// one basis JSBI.BigInt
const BIPS_BASE = JSBI.BigInt(10000);
new Percent(JSBI.BigInt(1), BIPS_BASE);

// used for warning states
const ALLOWED_PRICE_IMPACT_LOW = new Percent(JSBI.BigInt(100), BIPS_BASE); // 1%
const ALLOWED_PRICE_IMPACT_MEDIUM = new Percent(JSBI.BigInt(300), BIPS_BASE); // 3%
const ALLOWED_PRICE_IMPACT_HIGH = new Percent(JSBI.BigInt(500), BIPS_BASE); // 5%
// if the price slippage exceeds this number, force the user to type 'confirm' to execute
const PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN = new Percent(JSBI.BigInt(1000), BIPS_BASE); // 10%
// for non expert mode disable swaps above this
const BLOCKED_PRICE_IMPACT_NON_EXPERT = new Percent(JSBI.BigInt(1500), BIPS_BASE); // 15%

const ZERO_PERCENT = new Percent("0");
const ONE_HUNDRED_PERCENT = new Percent("1");

export { ALLOWED_PRICE_IMPACT_HIGH, ALLOWED_PRICE_IMPACT_LOW, ALLOWED_PRICE_IMPACT_MEDIUM, BIG_INT_ZERO, BLOCKED_PRICE_IMPACT_NON_EXPERT, DEFAULT_DEADLINE_FROM_NOW, DEFAULT_TXN_DISMISS_MS, L2_DEADLINE_FROM_NOW, L2_TXN_DISMISS_MS, ONE_HUNDRED_PERCENT, PRICE_IMPACT_WITHOUT_FEE_CONFIRM_MIN, ZERO_ADDRESS, ZERO_PERCENT };
