'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var ConnectionType = /*#__PURE__*/function (ConnectionType) {
  ConnectionType["UNISWAP_WALLET_V2"] = "UNISWAP_WALLET_V2";
  ConnectionType["INJECTED"] = "INJECTED";
  ConnectionType["COINBASE_WALLET"] = "COINBASE_WALLET";
  ConnectionType["WALLET_CONNECT_V2"] = "WALLET_CONNECT_V2";
  ConnectionType["NETWORK"] = "NETWORK";
  ConnectionType["GNOSIS_SAFE"] = "GNOSIS_SAFE";
  ConnectionType["DEPRECATED_NETWORK"] = "DEPRECATED_NETWORK";
  return ConnectionType;
}({});
function toConnectionType() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  if (Object.keys(ConnectionType).includes(value)) {
    return value;
  } else {
    return undefined;
  }
}

exports.ConnectionType = ConnectionType;
exports.toConnectionType = toConnectionType;
