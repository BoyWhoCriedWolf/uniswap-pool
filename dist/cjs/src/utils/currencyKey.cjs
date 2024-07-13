'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tokens = require('../constants/tokens.cjs');
var typesAndHooks = require('../graphql/data/__generated__/types-and-hooks.cjs');
var util = require('../graphql/data/util.cjs');

function buildCurrencyKey(chainId, address) {
  // We lowercase for compatibility/indexability between gql tokens and sdk currencies
  return "".concat(chainId, "-").concat(address.toLowerCase());
}
function currencyKey(currency) {
  return buildCurrencyKey(currency.chainId, currency.isToken ? currency.address : tokens.NATIVE_CHAIN_ID);
}
function currencyKeyFromGraphQL(contract) {
  var chainId = util.supportedChainIdFromGQLChain(contract.chain);
  var address = contract.standard === typesAndHooks.TokenStandard.Native ? tokens.NATIVE_CHAIN_ID : contract.address;
  if (!address) throw new Error("Non-native token missing address");
  if (!chainId) throw new Error("Unsupported chain from pools query");
  return buildCurrencyKey(chainId, address);
}

exports.buildCurrencyKey = buildCurrencyKey;
exports.currencyKey = currencyKey;
exports.currencyKeyFromGraphQL = currencyKeyFromGraphQL;
