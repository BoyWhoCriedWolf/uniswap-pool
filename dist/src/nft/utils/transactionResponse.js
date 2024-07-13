import { BigNumber } from '@ethersproject/bignumber';
import { formatEther } from '@ethersproject/units';
import 'react';
import '@babel/runtime/helpers/toConsumableArray';
import '../components/icons.js';
import 'uuid';
import 'video-extensions';
import '../../locales/en-US.js';
import 'numbro';
import './pooledAssets.js';
import './time.js';
import { getTotalNftValue } from './updatedAssets.js';

var parseTransactionResponse = function parseTransactionResponse(transactionResponse, ethPrice) {
  var nftsPurchased = [];
  var nftsNotPurchased = [];
  var showPurchasedModal = false;
  var showRefundModal = false;
  var totalPurchaseValue = BigNumber.from(0);
  var totalRefundValue = BigNumber.from(0);
  var totalUSDRefund = 0;
  var txFeeFiat = 0;
  if (transactionResponse !== undefined) {
    var purchasedNfts = transactionResponse.nftsPurchased,
      notPurchasedNfts = transactionResponse.nftsNotPurchased,
      txReceipt = transactionResponse.txReceipt;
    if (nftsPurchased && nftsNotPurchased && txReceipt) {
      nftsPurchased = purchasedNfts;
      nftsNotPurchased = notPurchasedNfts;
      showPurchasedModal = nftsPurchased.length >= 1;
      showRefundModal = nftsNotPurchased.length >= 1;
      totalPurchaseValue = getTotalNftValue(nftsPurchased);
      totalRefundValue = getTotalNftValue(nftsNotPurchased);
      totalUSDRefund = totalRefundValue && parseFloat(formatEther(totalRefundValue)) * ethPrice;
      var txFee = BigNumber.from(txReceipt ? txReceipt.gasUsed : 0).mul(BigNumber.from(txReceipt ? txReceipt.effectiveGasPrice : 0));
      txFeeFiat = parseFloat(formatEther(txFee)) * ethPrice;
    }
  }
  return {
    nftsPurchased: nftsPurchased,
    nftsNotPurchased: nftsNotPurchased,
    showPurchasedModal: showPurchasedModal,
    showRefundModal: showRefundModal,
    totalPurchaseValue: totalPurchaseValue,
    totalRefundValue: totalRefundValue,
    totalUSDRefund: totalUSDRefund,
    txFeeFiat: txFeeFiat
  };
};

// Given the length of the array of successfully purchased NFTs, returns the maxHeight and maxWidth of each asset preview
var getSuccessfulImageSize = function getSuccessfulImageSize(numSuccessful, isMobile) {
  var sizeModifier = isMobile ? 2 : 1;
  if (numSuccessful === 1) {
    return 474 / sizeModifier;
  } else if (numSuccessful === 2) {
    return 280 / sizeModifier;
  } else if (numSuccessful === 3 || numSuccessful >= 5 && numSuccessful < 7) {
    return 184 / sizeModifier;
  } else if (numSuccessful === 4 || numSuccessful >= 7 && numSuccessful < 13) {
    return 136 / sizeModifier;
  } else if (numSuccessful >= 13 && numSuccessful < 21) {
    return 108 / sizeModifier;
  } else return isMobile ? 39 : 64;
};

export { getSuccessfulImageSize, parseTransactionResponse };
