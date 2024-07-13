'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var RoutingActions = /*#__PURE__*/function (RoutingActions) {
  RoutingActions["Buy"] = "Buy";
  RoutingActions["Sell"] = "Sell";
  RoutingActions["Swap"] = "Swap";
  return RoutingActions;
}({});
var TxStateType = /*#__PURE__*/function (TxStateType) {
  TxStateType["Success"] = "Success";
  TxStateType["Denied"] = "Denied";
  TxStateType["Invalid"] = "Invalid";
  TxStateType["Failed"] = "Failed";
  TxStateType["New"] = "New";
  TxStateType["Signing"] = "Signing";
  TxStateType["Confirming"] = "Confirming";
  return TxStateType;
}({});
var BagItemStatus = /*#__PURE__*/function (BagItemStatus) {
  BagItemStatus["ADDED_TO_BAG"] = "Added to bag";
  BagItemStatus["REVIEWED"] = "Reviewed";
  BagItemStatus["REVIEWING_PRICE_CHANGE"] = "REVIEWING_PRICE_CHANGE";
  BagItemStatus["UNAVAILABLE"] = "UNAVAILABLE";
  return BagItemStatus;
}({});
var BagStatus = /*#__PURE__*/function (BagStatus) {
  BagStatus["ADDING_TO_BAG"] = "Adding to bag";
  BagStatus["FETCHING_ROUTE"] = "Fetching route";
  BagStatus["IN_REVIEW"] = "In review";
  BagStatus["WARNING"] = "Warning";
  BagStatus["CONFIRM_REVIEW"] = "Confirming review";
  BagStatus["FETCHING_FINAL_ROUTE"] = "Fetching final route";
  BagStatus["CONFIRMING_IN_WALLET"] = "Confirming in wallet";
  BagStatus["PROCESSING_TRANSACTION"] = "Processing";
  BagStatus["CONFIRM_QUOTE"] = "Confirm quote";
  return BagStatus;
}({});

exports.BagItemStatus = BagItemStatus;
exports.BagStatus = BagStatus;
exports.RoutingActions = RoutingActions;
exports.TxStateType = TxStateType;
