'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var zustand = require('zustand');
var middleware = require('zustand/middleware');

var useTransactionResponse = zustand.create()(middleware.devtools(function (set) {
  return {
    transactionResponse: undefined,
    setTransactionResponse: function setTransactionResponse(txResponse) {
      return set(function () {
        return {
          transactionResponse: txResponse
        };
      });
    }
  };
}, {
  name: "useTransactionResponse"
}));

exports.useTransactionResponse = useTransactionResponse;
