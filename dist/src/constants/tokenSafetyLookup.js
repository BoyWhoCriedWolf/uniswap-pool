import { initialState } from '../state/lists/reducer.js';
import { UNI_EXTENDED_LIST, UNI_LIST, UNSUPPORTED_LIST_URLS } from './lists.js';
import { COMMON_BASES } from './routing.js';
import BROKEN_LIST from './tokenLists/broken.tokenlist.json.js';
import { NATIVE_CHAIN_ID } from './tokens.js';

let TOKEN_LIST_TYPES = /*#__PURE__*/function (TOKEN_LIST_TYPES) {
  TOKEN_LIST_TYPES[TOKEN_LIST_TYPES["UNI_DEFAULT"] = 1] = "UNI_DEFAULT";
  TOKEN_LIST_TYPES[TOKEN_LIST_TYPES["UNI_EXTENDED"] = 2] = "UNI_EXTENDED";
  TOKEN_LIST_TYPES[TOKEN_LIST_TYPES["UNKNOWN"] = 3] = "UNKNOWN";
  TOKEN_LIST_TYPES[TOKEN_LIST_TYPES["BLOCKED"] = 4] = "BLOCKED";
  TOKEN_LIST_TYPES[TOKEN_LIST_TYPES["BROKEN"] = 5] = "BROKEN";
  return TOKEN_LIST_TYPES;
}({});
class TokenSafetyLookupTable {
  initialized = false;
  dict = {};

  // TODO(WEB-2488): Index lookups by chainId
  update(lists) {
    this.initialized = true;

    // Initialize extended tokens first
    lists.byUrl[UNI_EXTENDED_LIST]?.current?.tokens.forEach(token => {
      this.dict[token.address.toLowerCase()] = TOKEN_LIST_TYPES.UNI_EXTENDED;
    });

    // Initialize default tokens second, so that any tokens on both default and extended will display as default (no warning)
    lists.byUrl[UNI_LIST]?.current?.tokens.forEach(token => {
      this.dict[token.address.toLowerCase()] = TOKEN_LIST_TYPES.UNI_DEFAULT;
    });

    // TODO: Figure out if this list is still relevant
    BROKEN_LIST.tokens.forEach(token => {
      this.dict[token.address.toLowerCase()] = TOKEN_LIST_TYPES.BROKEN;
    });

    // Initialize blocked tokens from all urls included
    UNSUPPORTED_LIST_URLS.map(url => lists.byUrl[url]?.current?.tokens).filter(x => !!x).flat(1).forEach(token => {
      this.dict[token.address.toLowerCase()] = TOKEN_LIST_TYPES.BLOCKED;
    });
  }
  checkToken(address, chainId) {
    if (!this.initialized) this.update(initialState);
    if (address === NATIVE_CHAIN_ID.toLowerCase()) {
      return TOKEN_LIST_TYPES.UNI_DEFAULT;
    } else if (chainId && COMMON_BASES[chainId]?.some(base => address === base.wrapped.address.toLowerCase())) {
      return TOKEN_LIST_TYPES.UNI_DEFAULT;
    } else {
      return this.dict[address] ?? TOKEN_LIST_TYPES.UNKNOWN;
    }
  }
}
var TokenSafetyLookupTable$1 = new TokenSafetyLookupTable();

export { TOKEN_LIST_TYPES, TokenSafetyLookupTable$1 as default };
