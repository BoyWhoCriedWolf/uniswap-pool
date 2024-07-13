/**
 * Be careful adding to this enum, always assign a unique value (typescript will not prevent duplicate values).
 * These values is persisted in state and if you change the value it will cause errors
 */
let TransactionType = /*#__PURE__*/function (TransactionType) {
  TransactionType[TransactionType["APPROVAL"] = 0] = "APPROVAL";
  TransactionType[TransactionType["SWAP"] = 1] = "SWAP";
  TransactionType[TransactionType["DEPOSIT_LIQUIDITY_STAKING"] = 2] = "DEPOSIT_LIQUIDITY_STAKING";
  TransactionType[TransactionType["WITHDRAW_LIQUIDITY_STAKING"] = 3] = "WITHDRAW_LIQUIDITY_STAKING";
  TransactionType[TransactionType["CLAIM"] = 4] = "CLAIM";
  TransactionType[TransactionType["VOTE"] = 5] = "VOTE";
  TransactionType[TransactionType["DELEGATE"] = 6] = "DELEGATE";
  TransactionType[TransactionType["WRAP"] = 7] = "WRAP";
  TransactionType[TransactionType["CREATE_V3_POOL"] = 8] = "CREATE_V3_POOL";
  TransactionType[TransactionType["ADD_LIQUIDITY_V3_POOL"] = 9] = "ADD_LIQUIDITY_V3_POOL";
  TransactionType[TransactionType["ADD_LIQUIDITY_V2_POOL"] = 10] = "ADD_LIQUIDITY_V2_POOL";
  TransactionType[TransactionType["MIGRATE_LIQUIDITY_V3"] = 11] = "MIGRATE_LIQUIDITY_V3";
  TransactionType[TransactionType["COLLECT_FEES"] = 12] = "COLLECT_FEES";
  TransactionType[TransactionType["REMOVE_LIQUIDITY_V3"] = 13] = "REMOVE_LIQUIDITY_V3";
  TransactionType[TransactionType["SUBMIT_PROPOSAL"] = 14] = "SUBMIT_PROPOSAL";
  TransactionType[TransactionType["QUEUE"] = 15] = "QUEUE";
  TransactionType[TransactionType["EXECUTE"] = 16] = "EXECUTE";
  TransactionType[TransactionType["BUY"] = 17] = "BUY";
  TransactionType[TransactionType["SEND"] = 18] = "SEND";
  TransactionType[TransactionType["RECEIVE"] = 19] = "RECEIVE";
  TransactionType[TransactionType["MINT"] = 20] = "MINT";
  TransactionType[TransactionType["BURN"] = 21] = "BURN";
  TransactionType[TransactionType["BORROW"] = 22] = "BORROW";
  TransactionType[TransactionType["REPAY"] = 23] = "REPAY";
  TransactionType[TransactionType["DEPLOY"] = 24] = "DEPLOY";
  TransactionType[TransactionType["CANCEL"] = 25] = "CANCEL";
  return TransactionType;
}({});

export { TransactionType };
