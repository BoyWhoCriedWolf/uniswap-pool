'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var middleware = require('zustand/middleware');
var shallow = require('zustand/shallow');
var traditional = require('zustand/traditional');

var useTokenInput = traditional.createWithEqualityFn()(middleware.devtools(function (set) {
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
}), shallow.shallow);

exports.useTokenInput = useTokenInput;
