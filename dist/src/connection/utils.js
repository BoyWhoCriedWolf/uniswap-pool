import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import BRAVE_ICON from '../assets/wallets/brave-icon.svg.js';
import INJECTED_DARK_ICON from '../assets/wallets/browser-wallet-dark.svg.js';
import INJECTED_LIGHT_ICON from '../assets/wallets/browser-wallet-light.svg.js';
import LEDGER_ICON from '../assets/wallets/ledger-icon.svg.js';
import METAMASK_ICON from '../assets/wallets/metamask-icon.svg.js';
import RABBY_ICON from '../assets/wallets/rabby-icon.svg.js';
import TRUST_WALLET_ICON from '../assets/wallets/trustwallet-icon.svg.js';
import { ConnectionType } from './types.js';

var getIsInjected = function getIsInjected() {
  return Boolean(window.ethereum);
};
var InjectedWalletTable = {
  isBraveWallet: {
    name: "Brave",
    icon: BRAVE_ICON
  },
  isRabby: {
    name: "Rabby",
    icon: RABBY_ICON
  },
  isTrust: {
    name: "Trust Wallet",
    icon: TRUST_WALLET_ICON
  },
  isLedgerConnect: {
    name: "Ledger",
    icon: LEDGER_ICON
  }
};

/**
 * Checks the window object for the presence of a known injectors and returns the most relevant injector name and icon.
 * Returns a default metamask installation object if no wallet is detected.
 *
 * @param isDarkMode - optional parameter to determine which color mode of the
 */
function getInjection(isDarkMode) {
  var _window$ethereum2;
  for (var _i = 0, _Object$entries = Object.entries(InjectedWalletTable); _i < _Object$entries.length; _i++) {
    var _window$ethereum;
    var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
      key = _Object$entries$_i[0],
      wallet = _Object$entries$_i[1];
    if ((_window$ethereum = window.ethereum) !== null && _window$ethereum !== void 0 && _window$ethereum[key]) return wallet;
  }

  // Check for MetaMask last, as other injectors will also set this flag, i.e. Brave browser and Phantom wallet
  if ((_window$ethereum2 = window.ethereum) !== null && _window$ethereum2 !== void 0 && _window$ethereum2.isMetaMask) return {
    name: "MetaMask",
    icon: METAMASK_ICON
  };

  // Prompt metamask installation when there is no injection present or the only injection detected is coinbase (CB has separate entry point in UI)
  if (!window.ethereum || window.ethereum.isCoinbaseWallet) return {
    name: "Install MetaMask",
    icon: METAMASK_ICON
  };

  // Use a generic icon when injection is present but no known non-coinbase wallet is detected
  return {
    name: "Browser Wallet",
    icon: isDarkMode ? INJECTED_DARK_ICON : INJECTED_LIGHT_ICON
  };
}

/**
 * Returns true if `isMetaMask` is set to true and another non-metamask injector cannot be detected.
 *
 * Some non-metamask wallets set `isMetaMask` to true for dapp-compatability reasons. If one of these
 * injectors are detected, this function will return false.
 * https://wallet-docs.brave.com/ethereum/wallet-detection#compatability-with-metamask
 */
var getIsMetaMaskWallet = function getIsMetaMaskWallet() {
  return getInjection().name === "MetaMask";
};
var getIsCoinbaseWallet = function getIsCoinbaseWallet() {
  var _window$ethereum3;
  return Boolean((_window$ethereum3 = window.ethereum) === null || _window$ethereum3 === void 0 ? void 0 : _window$ethereum3.isCoinbaseWallet);
};

// https://eips.ethereum.org/EIPS/eip-1193#provider-errors
var ErrorCode = /*#__PURE__*/function (ErrorCode) {
  ErrorCode[ErrorCode["USER_REJECTED_REQUEST"] = 4001] = "USER_REJECTED_REQUEST";
  ErrorCode[ErrorCode["UNAUTHORIZED"] = 4100] = "UNAUTHORIZED";
  ErrorCode[ErrorCode["UNSUPPORTED_METHOD"] = 4200] = "UNSUPPORTED_METHOD";
  ErrorCode[ErrorCode["DISCONNECTED"] = 4900] = "DISCONNECTED";
  ErrorCode[ErrorCode["CHAIN_DISCONNECTED"] = 4901] = "CHAIN_DISCONNECTED";
  ErrorCode[ErrorCode["CHAIN_NOT_ADDED"] = 4902] = "CHAIN_NOT_ADDED";
  ErrorCode[ErrorCode["MM_ALREADY_PENDING"] = -32002] = "MM_ALREADY_PENDING";
  ErrorCode["WC_V2_MODAL_CLOSED"] = "Error: Connection request reset. Please try again.";
  ErrorCode["WC_MODAL_CLOSED"] = "Error: User closed modal";
  ErrorCode["CB_REJECTED_REQUEST"] = "Error: User denied account authorization";
  return ErrorCode;
}({});

// TODO(WEB-1973): merge this function with existing didUserReject for Swap errors
function didUserReject(connection, error) {
  var _error$toString, _error$toString2;
  return (error === null || error === void 0 ? void 0 : error.code) === ErrorCode.USER_REJECTED_REQUEST || connection.type === ConnectionType.WALLET_CONNECT_V2 && (error === null || error === void 0 || (_error$toString = error.toString) === null || _error$toString === void 0 ? void 0 : _error$toString.call(error)) === ErrorCode.WC_V2_MODAL_CLOSED || connection.type === ConnectionType.COINBASE_WALLET && (error === null || error === void 0 || (_error$toString2 = error.toString) === null || _error$toString2 === void 0 ? void 0 : _error$toString2.call(error)) === ErrorCode.CB_REJECTED_REQUEST;
}

export { ErrorCode, didUserReject, getInjection, getIsCoinbaseWallet, getIsInjected, getIsMetaMaskWallet };
