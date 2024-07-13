import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { i18n } from '../../../../../node_modules/@lingui/core/dist/index.mjs.js';
import { BigNumber } from '@ethersproject/bignumber';
import { TradeType, CurrencyAmount } from '@uniswap/sdk-core';
import UniswapXBolt from '../../../../assets/svg/bolt.svg.js';
import { nativeOnChain } from '../../../../constants/tokens.js';
import { TransactionStatus } from '../../../../graphql/data/__generated__/types-and-hooks.js';
import { useAllTokensMultichain } from '../../../../hooks/Tokens.js';
import { useMemo } from 'react';
import { isOnChainOrder, useAllSignatures } from '../../../../state/signatures/hooks.js';
import { SignatureType } from '../../../../state/signatures/types.js';
import { useMultichainTransactions } from '../../../../state/transactions/hooks.js';
import { TransactionType } from '../../../../state/transactions/types.js';
import { useFormatter, NumberType } from '../../../../utils/formatNumbers.js';
import { getActivityTitle, CancelledTransactionTitleTable, OrderTextTable } from '../constants.js';

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function getCurrency(currencyId, chainId, tokens) {
  var _tokens$chainId;
  return currencyId === "ETH" ? nativeOnChain(chainId) : (_tokens$chainId = tokens[chainId]) === null || _tokens$chainId === void 0 ? void 0 : _tokens$chainId[currencyId];
}
function buildCurrencyDescriptor(currencyA, amtA, currencyB, amtB, formatNumber) {
  var _currencyA$symbol, _currencyB$symbol;
  var delimiter = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : i18n._(
  /*i18n*/
  {
    id: "sQv06Y",
    message: "for"
  });
  var formattedA = currencyA ? formatNumber({
    input: parseFloat(CurrencyAmount.fromRawAmount(currencyA, amtA).toSignificant()),
    type: NumberType.TokenNonTx
  }) : i18n._(
  /*i18n*/
  {
    id: "Ef7StM",
    message: "Unknown"
  });
  var symbolA = (_currencyA$symbol = currencyA === null || currencyA === void 0 ? void 0 : currencyA.symbol) !== null && _currencyA$symbol !== void 0 ? _currencyA$symbol : "";
  var formattedB = currencyB ? formatNumber({
    input: parseFloat(CurrencyAmount.fromRawAmount(currencyB, amtB).toSignificant()),
    type: NumberType.TokenNonTx
  }) : i18n._(
  /*i18n*/
  {
    id: "Ef7StM",
    message: "Unknown"
  });
  var symbolB = (_currencyB$symbol = currencyB === null || currencyB === void 0 ? void 0 : currencyB.symbol) !== null && _currencyB$symbol !== void 0 ? _currencyB$symbol : "";
  return [formattedA, symbolA, delimiter, formattedB, symbolB].filter(Boolean).join(" ");
}
function parseSwap(swap, chainId, tokens, formatNumber) {
  var _swap$settledOutputCu;
  var tokenIn = getCurrency(swap.inputCurrencyId, chainId, tokens);
  var tokenOut = getCurrency(swap.outputCurrencyId, chainId, tokens);
  var _ref = swap.tradeType === TradeType.EXACT_INPUT ? [swap.inputCurrencyAmountRaw, (_swap$settledOutputCu = swap.settledOutputCurrencyAmountRaw) !== null && _swap$settledOutputCu !== void 0 ? _swap$settledOutputCu : swap.expectedOutputCurrencyAmountRaw] : [swap.expectedInputCurrencyAmountRaw, swap.outputCurrencyAmountRaw],
    _ref2 = _slicedToArray(_ref, 2),
    inputRaw = _ref2[0],
    outputRaw = _ref2[1];
  return {
    descriptor: buildCurrencyDescriptor(tokenIn, inputRaw, tokenOut, outputRaw, formatNumber, undefined),
    currencies: [tokenIn, tokenOut],
    prefixIconSrc: swap.isUniswapXOrder ? UniswapXBolt : undefined
  };
}
function parseWrap(wrap, chainId, status, formatNumber) {
  var _native = nativeOnChain(chainId);
  var wrapped = _native.wrapped;
  var _ref3 = wrap.unwrapped ? [wrapped, _native] : [_native, wrapped],
    _ref4 = _slicedToArray(_ref3, 2),
    input = _ref4[0],
    output = _ref4[1];
  var descriptor = buildCurrencyDescriptor(input, wrap.currencyAmountRaw, output, wrap.currencyAmountRaw, formatNumber);
  var title = getActivityTitle(TransactionType.WRAP, status, wrap.unwrapped);
  var currencies = wrap.unwrapped ? [wrapped, _native] : [_native, wrapped];
  return {
    title: title,
    descriptor: descriptor,
    currencies: currencies
  };
}
function parseApproval(approval, chainId, tokens, status) {
  var _ref5, _currency$symbol;
  var currency = getCurrency(approval.tokenAddress, chainId, tokens);
  var descriptor = (_ref5 = (_currency$symbol = currency === null || currency === void 0 ? void 0 : currency.symbol) !== null && _currency$symbol !== void 0 ? _currency$symbol : currency === null || currency === void 0 ? void 0 : currency.name) !== null && _ref5 !== void 0 ? _ref5 : i18n._(
  /*i18n*/
  {
    id: "Ef7StM",
    message: "Unknown"
  });
  return {
    title: getActivityTitle(TransactionType.APPROVAL, status, BigNumber.from(approval.amount).eq(0) /* use alternate if it's a revoke */),

    descriptor: descriptor,
    currencies: [currency]
  };
}
function parseLP(lp, chainId, tokens, formatNumber) {
  var baseCurrency = getCurrency(lp.baseCurrencyId, chainId, tokens);
  var quoteCurrency = getCurrency(lp.quoteCurrencyId, chainId, tokens);
  var _ref6 = [lp.expectedAmountBaseRaw, lp.expectedAmountQuoteRaw],
    baseRaw = _ref6[0],
    quoteRaw = _ref6[1];
  var descriptor = buildCurrencyDescriptor(baseCurrency, baseRaw, quoteCurrency, quoteRaw, formatNumber, i18n._(
  /*i18n*/
  {
    id: "HZFm5R",
    message: "and"
  }));
  return {
    descriptor: descriptor,
    currencies: [baseCurrency, quoteCurrency]
  };
}
function parseCollectFees(collect, chainId, tokens, formatNumber) {
  // Adapts CollectFeesTransactionInfo to generic LP type
  var baseCurrencyId = collect.currencyId0,
    quoteCurrencyId = collect.currencyId1,
    expectedAmountBaseRaw = collect.expectedCurrencyOwed0,
    expectedAmountQuoteRaw = collect.expectedCurrencyOwed1;
  return parseLP({
    baseCurrencyId: baseCurrencyId,
    quoteCurrencyId: quoteCurrencyId,
    expectedAmountBaseRaw: expectedAmountBaseRaw,
    expectedAmountQuoteRaw: expectedAmountQuoteRaw
  }, chainId, tokens, formatNumber);
}
function parseMigrateCreateV3(lp, chainId, tokens) {
  var _baseCurrency$symbol, _quoteCurrency$symbol;
  var baseCurrency = getCurrency(lp.baseCurrencyId, chainId, tokens);
  var baseSymbol = (_baseCurrency$symbol = baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol) !== null && _baseCurrency$symbol !== void 0 ? _baseCurrency$symbol : i18n._(
  /*i18n*/
  {
    id: "Ef7StM",
    message: "Unknown"
  });
  var quoteCurrency = getCurrency(lp.quoteCurrencyId, chainId, tokens);
  var quoteSymbol = (_quoteCurrency$symbol = quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol) !== null && _quoteCurrency$symbol !== void 0 ? _quoteCurrency$symbol : i18n._(
  /*i18n*/
  {
    id: "Ef7StM",
    message: "Unknown"
  });
  var descriptor = i18n._(
  /*i18n*/
  {
    id: "sSAdIg",
    message: "{baseSymbol} and {quoteSymbol}",
    values: {
      baseSymbol: baseSymbol,
      quoteSymbol: quoteSymbol
    }
  });
  return {
    descriptor: descriptor,
    currencies: [baseCurrency, quoteCurrency]
  };
}
function getTransactionStatus(details) {
  var _details$receipt;
  return !details.receipt ? TransactionStatus.Pending : details.receipt.status === 1 || ((_details$receipt = details.receipt) === null || _details$receipt === void 0 ? void 0 : _details$receipt.status) === undefined ? TransactionStatus.Confirmed : TransactionStatus.Failed;
}
function transactionToActivity(details, chainId, tokens, formatNumber) {
  try {
    var _details$confirmedTim;
    var status = getTransactionStatus(details);
    var defaultFields = {
      hash: details.hash,
      chainId: chainId,
      title: getActivityTitle(details.info.type, status),
      status: status,
      timestamp: ((_details$confirmedTim = details.confirmedTime) !== null && _details$confirmedTim !== void 0 ? _details$confirmedTim : details.addedTime) / 1000,
      from: details.from,
      nonce: details.nonce,
      cancelled: details.cancelled
    };
    var additionalFields = {};
    var info = details.info;
    if (info.type === TransactionType.SWAP) {
      additionalFields = parseSwap(info, chainId, tokens, formatNumber);
    } else if (info.type === TransactionType.APPROVAL) {
      additionalFields = parseApproval(info, chainId, tokens, status);
    } else if (info.type === TransactionType.WRAP) {
      additionalFields = parseWrap(info, chainId, status, formatNumber);
    } else if (info.type === TransactionType.ADD_LIQUIDITY_V3_POOL || info.type === TransactionType.REMOVE_LIQUIDITY_V3 || info.type === TransactionType.ADD_LIQUIDITY_V2_POOL) {
      additionalFields = parseLP(info, chainId, tokens, formatNumber);
    } else if (info.type === TransactionType.COLLECT_FEES) {
      additionalFields = parseCollectFees(info, chainId, tokens, formatNumber);
    } else if (info.type === TransactionType.MIGRATE_LIQUIDITY_V3 || info.type === TransactionType.CREATE_V3_POOL) {
      additionalFields = parseMigrateCreateV3(info, chainId, tokens);
    }
    var activity = _objectSpread(_objectSpread({}, defaultFields), additionalFields);
    if (details.cancelled) {
      activity.title = CancelledTransactionTitleTable[details.info.type];
      activity.status = TransactionStatus.Confirmed;
    }
    return activity;
  } catch (error) {
    console.debug("Failed to parse transaction ".concat(details.hash), error);
    return undefined;
  }
}
function signatureToActivity(signature, tokens, formatNumber) {
  switch (signature.type) {
    case SignatureType.SIGN_UNISWAPX_ORDER:
      {
        // Only returns Activity items for orders that don't have an on-chain counterpart
        if (isOnChainOrder(signature.status)) return undefined;
        var _OrderTextTable$signa = OrderTextTable[signature.status],
          title = _OrderTextTable$signa.title,
          statusMessage = _OrderTextTable$signa.statusMessage,
          status = _OrderTextTable$signa.status;
        return _objectSpread({
          hash: signature.orderHash,
          chainId: signature.chainId,
          title: title,
          status: status,
          offchainOrderStatus: signature.status,
          timestamp: signature.addedTime / 1000,
          from: signature.offerer,
          statusMessage: statusMessage,
          prefixIconSrc: UniswapXBolt
        }, parseSwap(signature.swapInfo, signature.chainId, tokens, formatNumber));
      }
    default:
      return undefined;
  }
}
function useLocalActivities(account) {
  var allTransactions = useMultichainTransactions();
  var allSignatures = useAllSignatures();
  var tokens = useAllTokensMultichain();
  var _useFormatter = useFormatter(),
    formatNumber = _useFormatter.formatNumber;
  return useMemo(function () {
    var activityMap = {};
    var _iterator = _createForOfIteratorHelper(allTransactions),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _step$value = _slicedToArray(_step.value, 2),
          transaction = _step$value[0],
          chainId = _step$value[1];
        if (transaction.from !== account) continue;
        var _activity = transactionToActivity(transaction, chainId, tokens, formatNumber);
        if (_activity) activityMap[transaction.hash] = _activity;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    for (var _i = 0, _Object$values = Object.values(allSignatures); _i < _Object$values.length; _i++) {
      var signature = _Object$values[_i];
      if (signature.offerer !== account) continue;
      var activity = signatureToActivity(signature, tokens, formatNumber);
      if (activity) activityMap[signature.id] = activity;
    }
    return activityMap;
  }, [account, allSignatures, allTransactions, formatNumber, tokens]);
}

export { getTransactionStatus, signatureToActivity, transactionToActivity, useLocalActivities };
