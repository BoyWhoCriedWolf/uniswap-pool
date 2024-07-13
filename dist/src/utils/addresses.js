import { getAddress } from '@ethersproject/address';

// returns the checksummed address if the address is valid, otherwise returns false
function isAddress(value) {
  try {
    // Alphabetical letters must be made lowercase for getAddress to work.
    // See documentation here: https://docs.ethers.io/v5/api/utils/address/
    return getAddress(value.toLowerCase());
  } catch (_unused) {
    return false;
  }
}
function isSameAddress(a, b) {
  return a === b || (a === null || a === void 0 ? void 0 : a.toLowerCase()) === (b === null || b === void 0 ? void 0 : b.toLowerCase()); // Lazy-lowercases the addresses
}

// Shortens an Ethereum address
function shortenAddress() {
  var address = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  var charsStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var charsEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  var parsed = isAddress(address);
  if (!parsed) return "";
  return ellipseAddressAdd0x(parsed, charsStart, charsEnd);
}

/**
 * Shorten an address and add 0x to the start if missing
 * @param targetAddress
 * @param charsStart amount of character to shorten (from both ends / in the beginning)
 * @param charsEnd amount of characters to shorten in the end
 * @returns formatted string
 */
function ellipseAddressAdd0x(targetAddress) {
  var charsStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var charsEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  var hasPrefix = targetAddress.startsWith("0x");
  var prefix = hasPrefix ? "" : "0x";
  return ellipseMiddle(prefix + targetAddress, charsStart + 2, charsEnd);
}

/**
 * Shorten a string with "..." in the middle
 * @param target
 * @param charsStart amount of character to shorten (from both ends / in the beginning)
 * @param charsEnd amount of characters to shorten in the end
 * @returns formatted string
 */
function ellipseMiddle(target) {
  var charsStart = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var charsEnd = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  return "".concat(target.slice(0, charsStart), "...").concat(target.slice(target.length - charsEnd));
}

export { isAddress, isSameAddress, shortenAddress };
