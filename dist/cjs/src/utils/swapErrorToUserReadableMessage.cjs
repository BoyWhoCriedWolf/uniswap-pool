'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../node_modules/@lingui/core/dist/index.cjs');
var errors = require('./errors.cjs');

function getReason(error) {
  var reason;
  while (error) {
    var _ref, _error$reason, _error$error, _error$data;
    reason = (_ref = (_error$reason = error.reason) !== null && _error$reason !== void 0 ? _error$reason : error.message) !== null && _ref !== void 0 ? _ref : reason;
    error = (_error$error = error.error) !== null && _error$error !== void 0 ? _error$error : (_error$data = error.data) === null || _error$data === void 0 ? void 0 : _error$data.originalError;
  }
  return reason;
}
function didUserReject(error) {
  var reason = getReason(error);
  if ((error === null || error === void 0 ? void 0 : error.code) === 4001 ||
  // ethers v5.7.0 wrapped error
  (error === null || error === void 0 ? void 0 : error.code) === "ACTION_REJECTED" ||
  // For Rainbow :
  reason !== null && reason !== void 0 && reason.match(/request/i) && reason !== null && reason !== void 0 && reason.match(/reject/i) || // For Frame:
  reason !== null && reason !== void 0 && reason.match(/declined/i) || // For SafePal:
  reason !== null && reason !== void 0 && reason.match(/cancell?ed by user/i) || // For Trust:
  reason !== null && reason !== void 0 && reason.match(/user cancell?ed/i) || // For Coinbase:
  reason !== null && reason !== void 0 && reason.match(/user denied/i) || // For Fireblocks
  reason !== null && reason !== void 0 && reason.match(/user rejected/i) || error instanceof errors.UserRejectedRequestError) {
    return true;
  }
  return false;
}

/**
 * This is hacking out the revert reason from the ethers provider thrown error however it can.
 * This object seems to be undocumented by ethers.
 * @param error - An error from the ethers provider
 */
function swapErrorToUserReadableMessage(error) {
  var _reason, _reason2;
  if (didUserReject(error)) {
    return index.i18n._(
    /*i18n*/
    {
      id: "g/i+bG",
      message: "Transaction rejected"
    });
  }
  var reason = getReason(error);
  if (((_reason = reason) === null || _reason === void 0 ? void 0 : _reason.indexOf("execution reverted: ")) === 0) reason = reason.substr("execution reverted: ".length);
  switch (reason) {
    case "UniswapV2Router: EXPIRED":
      return index.i18n._(
      /*i18n*/
      {
        id: "OdrZN/",
        message: "This transaction could not be sent because the deadline has passed. Please check that your transaction deadline is not too low."
      });
    case "UniswapV2Router: INSUFFICIENT_OUTPUT_AMOUNT":
    case "UniswapV2Router: EXCESSIVE_INPUT_AMOUNT":
      return index.i18n._(
      /*i18n*/
      {
        id: "FlgrfT",
        message: "This transaction will not succeed either due to price movement or fee on transfer. Try increasing your slippage tolerance."
      });
    case "TransferHelper: TRANSFER_FROM_FAILED":
      return index.i18n._(
      /*i18n*/
      {
        id: "N1WubG",
        message: "The input token cannot be transferred. There may be an issue with the input token."
      });
    case "UniswapV2: TRANSFER_FAILED":
      return index.i18n._(
      /*i18n*/
      {
        id: "s0KCro",
        message: "The output token cannot be transferred. There may be an issue with the output token."
      });
    case "UniswapV2: K":
      return index.i18n._(
      /*i18n*/
      {
        id: "g/Mv4m",
        message: "The Uniswap invariant x*y=k was not satisfied by the swap. This usually means one of the tokens you are swapping incorporates custom behavior on transfer."
      });
    case "Too little received":
    case "Too much requested":
    case "STF":
      return index.i18n._(
      /*i18n*/
      {
        id: "VrjoWm",
        message: "This transaction will not succeed due to price movement. Try increasing your slippage tolerance. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3."
      });
    case "TF":
      return index.i18n._(
      /*i18n*/
      {
        id: "TsuVze",
        message: "The output token cannot be transferred. There may be an issue with the output token. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3."
      });
    default:
      if (((_reason2 = reason) === null || _reason2 === void 0 ? void 0 : _reason2.indexOf("undefined is not an object")) !== -1) {
        console.error(error, reason);
        return index.i18n._(
        /*i18n*/
        {
          id: "xRsyI2",
          message: "An error occurred when trying to execute this swap. You may need to increase your slippage tolerance. If that does not work, there may be an incompatibility with the token you are trading. Note: fee on transfer and rebase tokens are incompatible with Uniswap V3."
        });
      }
      return index.i18n._(
      /*i18n*/
      {
        id: "55H792",
        message: "{0} Try increasing your slippage tolerance.\nNote: fee-on-transfer and rebase tokens are incompatible with Uniswap V3.",
        values: {
          "0": reason ? reason : "Unknown error."
        }
      });
  }
}

exports.didUserReject = didUserReject;
exports.swapErrorToUserReadableMessage = swapErrorToUserReadableMessage;
