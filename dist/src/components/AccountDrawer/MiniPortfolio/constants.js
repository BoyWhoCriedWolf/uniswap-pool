import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { i18n } from '../../../../node_modules/@lingui/core/dist/index.mjs.js';
import { TransactionStatus, SwapOrderStatus } from '../../../graphql/data/__generated__/types-and-hooks.js';
import { UniswapXOrderStatus } from '../../../lib/hooks/orders/types.js';
import { TransactionType } from '../../../state/transactions/types.js';

var _TransactionTitleTabl, _CancelledTransaction;

// use even number because rows are in groups of 2
var DEFAULT_NFT_QUERY_AMOUNT = 26;
var TransactionTitleTable = (_TransactionTitleTabl = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_TransactionTitleTabl, TransactionType.SWAP, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "JPHuMW",
  message: "Swapping"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "QSh9Sn",
  message: "Swapped"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "CfRvLF",
  message: "Swap failed"
}))), TransactionType.WRAP, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "pYK7bi",
  message: "Wrapping"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "P+Mxf/",
  message: "Wrapped"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "ddvxSw",
  message: "Wrap failed"
}))), TransactionType.ADD_LIQUIDITY_V3_POOL, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "nCdyNW",
  message: "Adding liquidity"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "XKqg5o",
  message: "Added liquidity"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "HM1QYw",
  message: "Add liquidity failed"
}))), TransactionType.REMOVE_LIQUIDITY_V3, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "UipT5Q",
  message: "Removing liquidity"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "GvNuGV",
  message: "Removed liquidity"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "J8L/FV",
  message: "Remove liquidity failed"
}))), TransactionType.CREATE_V3_POOL, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "mRE3dY",
  message: "Creating pool"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "mLvSDk",
  message: "Created pool"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "sg9r6H",
  message: "Create pool failed"
}))), TransactionType.COLLECT_FEES, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "SGG5Oz",
  message: "Collecting fees"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "kOXDs3",
  message: "Collected fees"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "04WkZO",
  message: "Collect fees failed"
}))), TransactionType.APPROVAL, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "j2Uisd",
  message: "Approving"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "7kb4LU",
  message: "Approved"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "PTlSPZ",
  message: "Approval failed"
}))), TransactionType.CLAIM, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "KvG1xW",
  message: "Claiming"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "hRWvpI",
  message: "Claimed"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "96tn/4",
  message: "Claim failed"
}))), TransactionType.BUY, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "oS2F65",
  message: "Buying"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "8DIDYI",
  message: "Bought"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "SthrWa",
  message: "Buy failed"
}))), TransactionType.SEND, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "9bG48P",
  message: "Sending"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "h69WC6",
  message: "Sent"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "mCk5iK",
  message: "Send failed"
}))), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_TransactionTitleTabl, TransactionType.RECEIVE, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "yGHx1m",
  message: "Receiving"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "fZ5Vnu",
  message: "Received"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "yzUOi4",
  message: "Receive failed"
}))), TransactionType.MINT, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "oqUBUI",
  message: "Minting"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "zd8KoI",
  message: "Minted"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "z568AB",
  message: "Mint failed"
}))), TransactionType.BURN, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "3Gh6SP",
  message: "Burning"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "i20cQ+",
  message: "Burned"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "kFPRbG",
  message: "Burn failed"
}))), TransactionType.VOTE, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "W5kTFy",
  message: "Voting"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "IeO7us",
  message: "Voted"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "W7z+26",
  message: "Vote failed"
}))), TransactionType.QUEUE, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "1mvE05",
  message: "Queuing"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "8wu9lr",
  message: "Queued"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "ei4VLE",
  message: "Queue failed"
}))), TransactionType.EXECUTE, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "cS4teF",
  message: "Executing"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "L4jnDP",
  message: "Executed"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "H1pQtT",
  message: "Execute failed"
}))), TransactionType.BORROW, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "3TzOSk",
  message: "Borrowing"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "fMJQZK",
  message: "Borrowed"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "yx99ag",
  message: "Borrow failed"
}))), TransactionType.REPAY, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "UkyQ9/",
  message: "Repaying"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "ARu1L4",
  message: "Repaid"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "6lmbeD",
  message: "Repay failed"
}))), TransactionType.DEPLOY, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "0CcwHv",
  message: "Deploying"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "I49YJL",
  message: "Deployed"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "WWqir8",
  message: "Deploy failed"
}))), TransactionType.CANCEL, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "y4uH7j",
  message: "Cancelling"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "vv7kpg",
  message: "Cancelled"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "Rsc+XU",
  message: "Cancel failed"
}))), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_TransactionTitleTabl, TransactionType.DELEGATE, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "gnBqsk",
  message: "Delegating"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "Y2GlMM",
  message: "Delegated"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "5KJOGg",
  message: "Delegate failed"
}))), TransactionType.DEPOSIT_LIQUIDITY_STAKING, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "n4PWtp",
  message: "Depositing"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "54OlP5",
  message: "Deposited"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "i+4Fbp",
  message: "Deposit failed"
}))), TransactionType.WITHDRAW_LIQUIDITY_STAKING, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "QQYsQ7",
  message: "Withdrawing"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "/c094A",
  message: "Withdrew"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "JzNyI/",
  message: "Withdraw failed"
}))), TransactionType.ADD_LIQUIDITY_V2_POOL, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "jpp+CH",
  message: "Adding V2 liquidity"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "27XaTl",
  message: "Added V2 liquidity"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "+iRTuj",
  message: "Add V2 liquidity failed"
}))), TransactionType.MIGRATE_LIQUIDITY_V3, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "AnmW0o",
  message: "Migrating liquidity"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "Z/smgB",
  message: "Migrated liquidity"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "dzQ9j7",
  message: "Migrate liquidity failed"
}))), TransactionType.SUBMIT_PROPOSAL, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "jVqrMl",
  message: "Submitting proposal"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "H+jnNa",
  message: "Submitted proposal"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "W7GFYM",
  message: "Submit proposal failed"
}))));
var CancelledTransactionTitleTable = (_CancelledTransaction = {}, _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_CancelledTransaction, TransactionType.SWAP, i18n._(
/*i18n*/
{
  id: "nkP7FD",
  message: "Swap cancelled"
})), TransactionType.WRAP, i18n._(
/*i18n*/
{
  id: "MvJojc",
  message: "Wrap cancelled"
})), TransactionType.ADD_LIQUIDITY_V3_POOL, i18n._(
/*i18n*/
{
  id: "8JQaKf",
  message: "Add liquidity cancelled"
})), TransactionType.REMOVE_LIQUIDITY_V3, i18n._(
/*i18n*/
{
  id: "nawi+5",
  message: "Remove liquidity cancelled"
})), TransactionType.CREATE_V3_POOL, i18n._(
/*i18n*/
{
  id: "qBcrGX",
  message: "Create pool cancelled"
})), TransactionType.COLLECT_FEES, i18n._(
/*i18n*/
{
  id: "nRmZNQ",
  message: "Collect fees cancelled"
})), TransactionType.APPROVAL, i18n._(
/*i18n*/
{
  id: "MF5T+5",
  message: "Approval cancelled"
})), TransactionType.CLAIM, i18n._(
/*i18n*/
{
  id: "wc//+W",
  message: "Claim cancelled"
})), TransactionType.BUY, i18n._(
/*i18n*/
{
  id: "vTAOi3",
  message: "Buy cancelled"
})), TransactionType.SEND, i18n._(
/*i18n*/
{
  id: "GvqulV",
  message: "Send cancelled"
})), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_CancelledTransaction, TransactionType.RECEIVE, i18n._(
/*i18n*/
{
  id: "/KIozE",
  message: "Receive cancelled"
})), TransactionType.MINT, i18n._(
/*i18n*/
{
  id: "qiplmJ",
  message: "Mint cancelled"
})), TransactionType.BURN, i18n._(
/*i18n*/
{
  id: "B4sdXm",
  message: "Burn cancelled"
})), TransactionType.VOTE, i18n._(
/*i18n*/
{
  id: "gTnX+W",
  message: "Vote cancelled"
})), TransactionType.QUEUE, i18n._(
/*i18n*/
{
  id: "z5LIR1",
  message: "Queue cancelled"
})), TransactionType.EXECUTE, i18n._(
/*i18n*/
{
  id: "k3q5N6",
  message: "Execute cancelled"
})), TransactionType.BORROW, i18n._(
/*i18n*/
{
  id: "HEbJ7Y",
  message: "Borrow cancelled"
})), TransactionType.REPAY, i18n._(
/*i18n*/
{
  id: "pP0eQL",
  message: "Repay cancelled"
})), TransactionType.DEPLOY, i18n._(
/*i18n*/
{
  id: "z8qE/O",
  message: "Deploy cancelled"
})), TransactionType.CANCEL, i18n._(
/*i18n*/
{
  id: "nnouqm",
  message: "Cancellation cancelled"
})), _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_CancelledTransaction, TransactionType.DELEGATE, i18n._(
/*i18n*/
{
  id: "yoGhEX",
  message: "Delegate cancelled"
})), TransactionType.DEPOSIT_LIQUIDITY_STAKING, i18n._(
/*i18n*/
{
  id: "CCMGtV",
  message: "Deposit cancelled"
})), TransactionType.WITHDRAW_LIQUIDITY_STAKING, i18n._(
/*i18n*/
{
  id: "lrj8FH",
  message: "Withdrawal cancelled"
})), TransactionType.ADD_LIQUIDITY_V2_POOL, i18n._(
/*i18n*/
{
  id: "itrTXH",
  message: "Add V2 liquidity cancelled"
})), TransactionType.MIGRATE_LIQUIDITY_V3, i18n._(
/*i18n*/
{
  id: "VIiRWi",
  message: "Migrate liquidity cancelled"
})), TransactionType.SUBMIT_PROPOSAL, i18n._(
/*i18n*/
{
  id: "ozqhFw",
  message: "Submit proposal cancelled"
})));
var AlternateTransactionTitleTable = _defineProperty(_defineProperty({}, TransactionType.WRAP, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "f1nG2C",
  message: "Unwrapping"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "sNANgM",
  message: "Unwrapped"
})), TransactionStatus.Failed, i18n._(
/*i18n*/
{
  id: "N3oE/y",
  message: "Unwrap failed"
}))), TransactionType.APPROVAL, _defineProperty(_defineProperty(_defineProperty({}, TransactionStatus.Pending, i18n._(
/*i18n*/
{
  id: "WNjAZt",
  message: "Revoking approval"
})), TransactionStatus.Confirmed, i18n._(
/*i18n*/
{
  id: "rC78D1",
  message: "Revoked approval"
})), TransactionStatus.Failed, i18n._(
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
var SwapTitleTable = TransactionTitleTable[TransactionType.SWAP];
var OrderTextTable = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, UniswapXOrderStatus.OPEN, {
  title: SwapTitleTable.PENDING,
  status: TransactionStatus.Pending
}), UniswapXOrderStatus.FILLED, {
  title: SwapTitleTable.CONFIRMED,
  status: TransactionStatus.Confirmed
}), UniswapXOrderStatus.EXPIRED, {
  title: i18n._(
  /*i18n*/
  {
    id: "WPV7sy",
    message: "Swap expired"
  }),
  statusMessage: i18n._(
  /*i18n*/
  {
    id: "q7hqlT",
    message: "Your swap could not be fulfilled at this time. Please try again."
  }),
  status: TransactionStatus.Failed
}), UniswapXOrderStatus.ERROR, {
  title: SwapTitleTable.FAILED,
  status: TransactionStatus.Failed
}), UniswapXOrderStatus.INSUFFICIENT_FUNDS, {
  title: SwapTitleTable.FAILED,
  statusMessage: i18n._(
  /*i18n*/
  {
    id: "7O0FrP",
    message: "Your account had insufficent funds to complete this swap."
  }),
  status: TransactionStatus.Failed
}), UniswapXOrderStatus.CANCELLED, {
  title: i18n._(
  /*i18n*/
  {
    id: "nkP7FD",
    message: "Swap cancelled"
  }),
  status: TransactionStatus.Failed
});

// Non-exhaustive list of addresses Moonpay uses when sending purchased tokens
var MOONPAY_SENDER_ADDRESSES = ["0x8216874887415e2650d12d53ff53516f04a74fd7", "0x151b381058f91cf871e7ea1ee83c45326f61e96d", "0xb287eac48ab21c5fb1d3723830d60b4c797555b0", "0xd108fd0e8c8e71552a167e7a44ff1d345d233ba6"];

// Converts GQL backend orderStatus enum to the enum used by the frontend and UniswapX backend
var OrderStatusTable = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, SwapOrderStatus.Open, UniswapXOrderStatus.OPEN), SwapOrderStatus.Expired, UniswapXOrderStatus.EXPIRED), SwapOrderStatus.Error, UniswapXOrderStatus.ERROR), SwapOrderStatus.Cancelled, UniswapXOrderStatus.CANCELLED), SwapOrderStatus.Filled, UniswapXOrderStatus.FILLED), SwapOrderStatus.InsufficientFunds, UniswapXOrderStatus.INSUFFICIENT_FUNDS);

export { CancelledTransactionTitleTable, DEFAULT_NFT_QUERY_AMOUNT, MOONPAY_SENDER_ADDRESSES, OrderStatusTable, OrderTextTable, getActivityTitle };
