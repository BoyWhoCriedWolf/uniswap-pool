import { devtools } from 'zustand/middleware';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

var useTokenInput = createWithEqualityFn()(devtools(function (set) {
  return {
    inputCurrency: undefined,
    tokenTradeInput: undefined,
    setInputCurrency: function setInputCurrency(currency) {
      return set(function () {
        return {
          inputCurrency: currency
        };
      });
    },
    clearInputCurrency: function clearInputCurrency() {
      return set(function () {
        return {
          inputCurrency: undefined
        };
      });
    },
    setTokenTradeInput: function setTokenTradeInput(tokenTradeInput) {
      return set(function () {
        return {
          tokenTradeInput: tokenTradeInput
        };
      });
    }
  };
}, {
  name: "useTokenInput"
}), shallow);

export { useTokenInput };
