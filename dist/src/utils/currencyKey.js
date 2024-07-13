import { NATIVE_CHAIN_ID } from '../constants/tokens.js';
import { TokenStandard } from '../graphql/data/__generated__/types-and-hooks.js';
import { supportedChainIdFromGQLChain } from '../graphql/data/util.js';

function buildCurrencyKey(chainId, address) {
  // We lowercase for compatibility/indexability between gql tokens and sdk currencies
  return "".concat(chainId, "-").concat(address.toLowerCase());
}
function currencyKey(currency) {
  return buildCurrencyKey(currency.chainId, currency.isToken ? currency.address : NATIVE_CHAIN_ID);
}
function currencyKeyFromGraphQL(contract) {
  var chainId = supportedChainIdFromGQLChain(contract.chain);
  var address = contract.standard === TokenStandard.Native ? NATIVE_CHAIN_ID : contract.address;
  if (!address) throw new Error("Non-native token missing address");
  if (!chainId) throw new Error("Unsupported chain from pools query");
  return buildCurrencyKey(chainId, address);
}

export { buildCurrencyKey, currencyKey, currencyKeyFromGraphQL };
