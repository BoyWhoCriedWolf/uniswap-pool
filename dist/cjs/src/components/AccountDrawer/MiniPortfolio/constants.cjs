'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var index = require('../../../../node_modules/@lingui/core/dist/index.cjs');
var typesAndHooks = require('../../../graphql/data/__generated__/types-and-hooks.cjs');
var types$1 = require('../../../lib/hooks/orders/types.cjs');
var types = require('../../../state/transactions/types.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);

var _TransactionTitleTabl, _CancelledTransaction;

// use even number because rows are in groups of 2
var DEFAULT_NFT_QUERY_AMOUNT = 26;
var TransactionTitleTable = (_TransactionTitleTabl = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_TransactionTitleTabl, types.TransactionType.SWAP, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "JPHuMW",
  message: "Swapping"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "QSh9Sn",
  message: "Swapped"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "CfRvLF",
  message: "Swap failed"
}))), types.TransactionType.WRAP, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "pYK7bi",
  message: "Wrapping"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "P+Mxf/",
  message: "Wrapped"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "ddvxSw",
  message: "Wrap failed"
}))), types.TransactionType.ADD_LIQUIDITY_V3_POOL, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "nCdyNW",
  message: "Adding liquidity"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "XKqg5o",
  message: "Added liquidity"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "HM1QYw",
  message: "Add liquidity failed"
}))), types.TransactionType.REMOVE_LIQUIDITY_V3, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "UipT5Q",
  message: "Removing liquidity"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "GvNuGV",
  message: "Removed liquidity"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "J8L/FV",
  message: "Remove liquidity failed"
}))), types.TransactionType.CREATE_V3_POOL, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "mRE3dY",
  message: "Creating pool"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "mLvSDk",
  message: "Created pool"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "sg9r6H",
  message: "Create pool failed"
}))), types.TransactionType.COLLECT_FEES, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "SGG5Oz",
  message: "Collecting fees"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "kOXDs3",
  message: "Collected fees"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "04WkZO",
  message: "Collect fees failed"
}))), types.TransactionType.APPROVAL, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "j2Uisd",
  message: "Approving"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "7kb4LU",
  message: "Approved"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "PTlSPZ",
  message: "Approval failed"
}))), types.TransactionType.CLAIM, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "KvG1xW",
  message: "Claiming"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "hRWvpI",
  message: "Claimed"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "96tn/4",
  message: "Claim failed"
}))), types.TransactionType.BUY, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "oS2F65",
  message: "Buying"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "8DIDYI",
  message: "Bought"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "SthrWa",
  message: "Buy failed"
}))), types.TransactionType.SEND, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "9bG48P",
  message: "Sending"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "h69WC6",
  message: "Sent"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "mCk5iK",
  message: "Send failed"
}))), _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_TransactionTitleTabl, types.TransactionType.RECEIVE, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "yGHx1m",
  message: "Receiving"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "fZ5Vnu",
  message: "Received"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "yzUOi4",
  message: "Receive failed"
}))), types.TransactionType.MINT, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "oqUBUI",
  message: "Minting"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "zd8KoI",
  message: "Minted"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "z568AB",
  message: "Mint failed"
}))), types.TransactionType.BURN, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "3Gh6SP",
  message: "Burning"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "i20cQ+",
  message: "Burned"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "kFPRbG",
  message: "Burn failed"
}))), types.TransactionType.VOTE, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "W5kTFy",
  message: "Voting"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "IeO7us",
  message: "Voted"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "W7z+26",
  message: "Vote failed"
}))), types.TransactionType.QUEUE, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "1mvE05",
  message: "Queuing"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "8wu9lr",
  message: "Queued"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "ei4VLE",
  message: "Queue failed"
}))), types.TransactionType.EXECUTE, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "cS4teF",
  message: "Executing"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "L4jnDP",
  message: "Executed"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "H1pQtT",
  message: "Execute failed"
}))), types.TransactionType.BORROW, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "3TzOSk",
  message: "Borrowing"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "fMJQZK",
  message: "Borrowed"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "yx99ag",
  message: "Borrow failed"
}))), types.TransactionType.REPAY, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "UkyQ9/",
  message: "Repaying"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "ARu1L4",
  message: "Repaid"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "6lmbeD",
  message: "Repay failed"
}))), types.TransactionType.DEPLOY, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "0CcwHv",
  message: "Deploying"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "I49YJL",
  message: "Deployed"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "WWqir8",
  message: "Deploy failed"
}))), types.TransactionType.CANCEL, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "y4uH7j",
  message: "Cancelling"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "vv7kpg",
  message: "Cancelled"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "Rsc+XU",
  message: "Cancel failed"
}))), _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_TransactionTitleTabl, types.TransactionType.DELEGATE, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "gnBqsk",
  message: "Delegating"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "Y2GlMM",
  message: "Delegated"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "5KJOGg",
  message: "Delegate failed"
}))), types.TransactionType.DEPOSIT_LIQUIDITY_STAKING, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "n4PWtp",
  message: "Depositing"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "54OlP5",
  message: "Deposited"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "i+4Fbp",
  message: "Deposit failed"
}))), types.TransactionType.WITHDRAW_LIQUIDITY_STAKING, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "QQYsQ7",
  message: "Withdrawing"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "/c094A",
  message: "Withdrew"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "JzNyI/",
  message: "Withdraw failed"
}))), types.TransactionType.ADD_LIQUIDITY_V2_POOL, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "jpp+CH",
  message: "Adding V2 liquidity"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "27XaTl",
  message: "Added V2 liquidity"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "+iRTuj",
  message: "Add V2 liquidity failed"
}))), types.TransactionType.MIGRATE_LIQUIDITY_V3, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "AnmW0o",
  message: "Migrating liquidity"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "Z/smgB",
  message: "Migrated liquidity"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "dzQ9j7",
  message: "Migrate liquidity failed"
}))), types.TransactionType.SUBMIT_PROPOSAL, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "jVqrMl",
  message: "Submitting proposal"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "H+jnNa",
  message: "Submitted proposal"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "W7GFYM",
  message: "Submit proposal failed"
}))));
var CancelledTransactionTitleTable = (_CancelledTransaction = {}, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_CancelledTransaction, types.TransactionType.SWAP, index.i18n._(
/*i18n*/
{
  id: "nkP7FD",
  message: "Swap cancelled"
})), types.TransactionType.WRAP, index.i18n._(
/*i18n*/
{
  id: "MvJojc",
  message: "Wrap cancelled"
})), types.TransactionType.ADD_LIQUIDITY_V3_POOL, index.i18n._(
/*i18n*/
{
  id: "8JQaKf",
  message: "Add liquidity cancelled"
})), types.TransactionType.REMOVE_LIQUIDITY_V3, index.i18n._(
/*i18n*/
{
  id: "nawi+5",
  message: "Remove liquidity cancelled"
})), types.TransactionType.CREATE_V3_POOL, index.i18n._(
/*i18n*/
{
  id: "qBcrGX",
  message: "Create pool cancelled"
})), types.TransactionType.COLLECT_FEES, index.i18n._(
/*i18n*/
{
  id: "nRmZNQ",
  message: "Collect fees cancelled"
})), types.TransactionType.APPROVAL, index.i18n._(
/*i18n*/
{
  id: "MF5T+5",
  message: "Approval cancelled"
})), types.TransactionType.CLAIM, index.i18n._(
/*i18n*/
{
  id: "wc//+W",
  message: "Claim cancelled"
})), types.TransactionType.BUY, index.i18n._(
/*i18n*/
{
  id: "vTAOi3",
  message: "Buy cancelled"
})), types.TransactionType.SEND, index.i18n._(
/*i18n*/
{
  id: "GvqulV",
  message: "Send cancelled"
})), _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_CancelledTransaction, types.TransactionType.RECEIVE, index.i18n._(
/*i18n*/
{
  id: "/KIozE",
  message: "Receive cancelled"
})), types.TransactionType.MINT, index.i18n._(
/*i18n*/
{
  id: "qiplmJ",
  message: "Mint cancelled"
})), types.TransactionType.BURN, index.i18n._(
/*i18n*/
{
  id: "B4sdXm",
  message: "Burn cancelled"
})), types.TransactionType.VOTE, index.i18n._(
/*i18n*/
{
  id: "gTnX+W",
  message: "Vote cancelled"
})), types.TransactionType.QUEUE, index.i18n._(
/*i18n*/
{
  id: "z5LIR1",
  message: "Queue cancelled"
})), types.TransactionType.EXECUTE, index.i18n._(
/*i18n*/
{
  id: "k3q5N6",
  message: "Execute cancelled"
})), types.TransactionType.BORROW, index.i18n._(
/*i18n*/
{
  id: "HEbJ7Y",
  message: "Borrow cancelled"
})), types.TransactionType.REPAY, index.i18n._(
/*i18n*/
{
  id: "pP0eQL",
  message: "Repay cancelled"
})), types.TransactionType.DEPLOY, index.i18n._(
/*i18n*/
{
  id: "z8qE/O",
  message: "Deploy cancelled"
})), types.TransactionType.CANCEL, index.i18n._(
/*i18n*/
{
  id: "nnouqm",
  message: "Cancellation cancelled"
})), _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_CancelledTransaction, types.TransactionType.DELEGATE, index.i18n._(
/*i18n*/
{
  id: "yoGhEX",
  message: "Delegate cancelled"
})), types.TransactionType.DEPOSIT_LIQUIDITY_STAKING, index.i18n._(
/*i18n*/
{
  id: "CCMGtV",
  message: "Deposit cancelled"
})), types.TransactionType.WITHDRAW_LIQUIDITY_STAKING, index.i18n._(
/*i18n*/
{
  id: "lrj8FH",
  message: "Withdrawal cancelled"
})), types.TransactionType.ADD_LIQUIDITY_V2_POOL, index.i18n._(
/*i18n*/
{
  id: "itrTXH",
  message: "Add V2 liquidity cancelled"
})), types.TransactionType.MIGRATE_LIQUIDITY_V3, index.i18n._(
/*i18n*/
{
  id: "VIiRWi",
  message: "Migrate liquidity cancelled"
})), types.TransactionType.SUBMIT_PROPOSAL, index.i18n._(
/*i18n*/
{
  id: "ozqhFw",
  message: "Submit proposal cancelled"
})));
var AlternateTransactionTitleTable = _defineProperty__default["default"](_defineProperty__default["default"]({}, types.TransactionType.WRAP, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "f1nG2C",
  message: "Unwrapping"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "sNANgM",
  message: "Unwrapped"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "N3oE/y",
  message: "Unwrap failed"
}))), types.TransactionType.APPROVAL, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.TransactionStatus.Pending, index.i18n._(
/*i18n*/
{
  id: "WNjAZt",
  message: "Revoking approval"
})), typesAndHooks.TransactionStatus.Confirmed, index.i18n._(
/*i18n*/
{
  id: "rC78D1",
  message: "Revoked approval"
})), typesAndHooks.TransactionStatus.Failed, index.i18n._(
/*i18n*/
{
  id: "NZzLW6",
  message: "Revoke approval failed"
})));
function getActivityTitle(type, status, alternate) {
  if (alternate) {
    var alternateTitle = AlternateTransactionTitleTable[type];
    if (alternateTitle !== undefined) return alternateTitle[status];
  }
  return TransactionTitleTable[type][status];
}
var SwapTitleTable = TransactionTitleTable[types.TransactionType.SWAP];
var OrderTextTable = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, types$1.UniswapXOrderStatus.OPEN, {
  title: SwapTitleTable.PENDING,
  status: typesAndHooks.TransactionStatus.Pending
}), types$1.UniswapXOrderStatus.FILLED, {
  title: SwapTitleTable.CONFIRMED,
  status: typesAndHooks.TransactionStatus.Confirmed
}), types$1.UniswapXOrderStatus.EXPIRED, {
  title: index.i18n._(
  /*i18n*/
  {
    id: "WPV7sy",
    message: "Swap expired"
  }),
  statusMessage: index.i18n._(
  /*i18n*/
  {
    id: "q7hqlT",
    message: "Your swap could not be fulfilled at this time. Please try again."
  }),
  status: typesAndHooks.TransactionStatus.Failed
}), types$1.UniswapXOrderStatus.ERROR, {
  title: SwapTitleTable.FAILED,
  status: typesAndHooks.TransactionStatus.Failed
}), types$1.UniswapXOrderStatus.INSUFFICIENT_FUNDS, {
  title: SwapTitleTable.FAILED,
  statusMessage: index.i18n._(
  /*i18n*/
  {
    id: "7O0FrP",
    message: "Your account had insufficent funds to complete this swap."
  }),
  status: typesAndHooks.TransactionStatus.Failed
}), types$1.UniswapXOrderStatus.CANCELLED, {
  title: index.i18n._(
  /*i18n*/
  {
    id: "nkP7FD",
    message: "Swap cancelled"
  }),
  status: typesAndHooks.TransactionStatus.Failed
});

// Non-exhaustive list of addresses Moonpay uses when sending purchased tokens
var MOONPAY_SENDER_ADDRESSES = ["0x8216874887415e2650d12d53ff53516f04a74fd7", "0x151b381058f91cf871e7ea1ee83c45326f61e96d", "0xb287eac48ab21c5fb1d3723830d60b4c797555b0", "0xd108fd0e8c8e71552a167e7a44ff1d345d233ba6"];

// Converts GQL backend orderStatus enum to the enum used by the frontend and UniswapX backend
var OrderStatusTable = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, typesAndHooks.SwapOrderStatus.Open, types$1.UniswapXOrderStatus.OPEN), typesAndHooks.SwapOrderStatus.Expired, types$1.UniswapXOrderStatus.EXPIRED), typesAndHooks.SwapOrderStatus.Error, types$1.UniswapXOrderStatus.ERROR), typesAndHooks.SwapOrderStatus.Cancelled, types$1.UniswapXOrderStatus.CANCELLED), typesAndHooks.SwapOrderStatus.Filled, types$1.UniswapXOrderStatus.FILLED), typesAndHooks.SwapOrderStatus.InsufficientFunds, types$1.UniswapXOrderStatus.INSUFFICIENT_FUNDS);

exports.CancelledTransactionTitleTable = CancelledTransactionTitleTable;
exports.DEFAULT_NFT_QUERY_AMOUNT = DEFAULT_NFT_QUERY_AMOUNT;
exports.MOONPAY_SENDER_ADDRESSES = MOONPAY_SENDER_ADDRESSES;
exports.OrderStatusTable = OrderStatusTable;
exports.OrderTextTable = OrderTextTable;
exports.getActivityTitle = getActivityTitle;
