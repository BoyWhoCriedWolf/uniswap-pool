import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

var useTransactionResponse = create()(devtools(function (set) {
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

export { useTransactionResponse };
