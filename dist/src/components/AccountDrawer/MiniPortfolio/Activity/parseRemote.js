import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { i18n } from '../../../../../node_modules/@lingui/core/dist/index.mjs.js';
import { UNI_ADDRESSES, ChainId, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES } from '@uniswap/sdk-core';
import UniswapXBolt from '../../../../assets/svg/bolt.svg.js';
import moonpayLogoSrc from '../../../../assets/svg/moonpay.svg.js';
import { nativeOnChain } from '../../../../constants/tokens.js';
import { ActivityType, Currency, SwapOrderStatus } from '../../../../graphql/data/__generated__/types-and-hooks.js';
import { gqlToCurrency, supportedChainIdFromGQLChain, logSentryErrorForUnsupportedChain } from '../../../../graphql/data/util.js';
import ms from 'ms';
import { useState, useEffect } from 'react';
import { isSameAddress, isAddress } from '../../../../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import { NumberType } from '../../../../utils/formatNumbers.js';
import { MOONPAY_SENDER_ADDRESSES, OrderStatusTable, OrderTextTable } from '../constants.js';

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
// TODO: Move common contract metadata to a backend service
var UNI_IMG = "https://raw.githubusercontent.com/Uniswap/assets/master/blockchains/ethereum/assets/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984/logo.png";
var ENS_IMG = "https://464911102-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/collections%2F2TjMAeHSzwlQgcOdL48E%2Ficon%2FKWP0gk2C6bdRPliWIA6o%2Fens%20transparent%20background.png?alt=media&token=bd28b063-5a75-4971-890c-97becea09076";
var COMMON_CONTRACTS = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, UNI_ADDRESSES[ChainId.MAINNET].toLowerCase(), {
  title: i18n._(
  /*i18n*/
  {
    id: "r6fWDd",
    message: "UNI Governance"
  }),
  descriptor: i18n._(
  /*i18n*/
  {
    id: "M4g1UJ",
    message: "Contract Interaction"
  }),
  logos: [UNI_IMG]
}), "0x000000000022d473030f116ddee9f6b43ac78ba3", {
  title: i18n._(
  /*i18n*/
  {
    id: "fYpg/3",
    message: "Permit2"
  }),
  descriptor: i18n._(
  /*i18n*/
  {
    id: "FPG1L1",
    message: "Uniswap Protocol"
  }),
  logos: [UNI_IMG]
}), "0x4976fb03c32e5b8cfe2b6ccb31c09ba78ebaba41", {
  title: i18n._(
  /*i18n*/
  {
    id: "2x1KHI",
    message: "Ethereum Name Service"
  }),
  descriptor: i18n._(
  /*i18n*/
  {
    id: "PgApFp",
    message: "Public Resolver"
  }),
  logos: [ENS_IMG]
}), "0x58774bb8acd458a640af0b88238369a167546ef2", {
  title: i18n._(
  /*i18n*/
  {
    id: "2x1KHI",
    message: "Ethereum Name Service"
  }),
  descriptor: i18n._(
  /*i18n*/
  {
    id: "5TddTP",
    message: "DNS Registrar"
  }),
  logos: [ENS_IMG]
}), "0x084b1c3c81545d370f3634392de611caabff8148", {
  title: i18n._(
  /*i18n*/
  {
    id: "2x1KHI",
    message: "Ethereum Name Service"
  }),
  descriptor: i18n._(
  /*i18n*/
  {
    id: "yR/dHY",
    message: "Reverse Registrar"
  }),
  logos: [ENS_IMG]
}), "0x283af0b28c62c092c9727f1ee09c02ca627eb7f5", {
  title: i18n._(
  /*i18n*/
  {
    id: "2x1KHI",
    message: "Ethereum Name Service"
  }),
  descriptor: i18n._(
  /*i18n*/
  {
    id: "0yFypi",
    message: "ETH Registrar Controller"
  }),
  logos: [ENS_IMG]
});
function callsPositionManagerContract(assetActivity) {
  var supportedChain = supportedChainIdFromGQLChain(assetActivity.chain);
  if (!supportedChain) return false;
  return isSameAddress(assetActivity.details.to, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[supportedChain]);
}

// Gets counts for number of NFTs in each collection present
function getCollectionCounts(nftTransfers) {
  return nftTransfers.reduce(function (acc, NFTChange) {
    var _NFTChange$asset$coll, _NFTChange$asset$coll2;
    var key = (_NFTChange$asset$coll = (_NFTChange$asset$coll2 = NFTChange.asset.collection) === null || _NFTChange$asset$coll2 === void 0 ? void 0 : _NFTChange$asset$coll2.name) !== null && _NFTChange$asset$coll !== void 0 ? _NFTChange$asset$coll : NFTChange.asset.name;
    if (key) {
      var _acc$key;
      acc[key] = ((_acc$key = acc === null || acc === void 0 ? void 0 : acc[key]) !== null && _acc$key !== void 0 ? _acc$key : 0) + 1;
    }
    return acc;
  }, {});
}
function getSwapTitle(sent, received) {
  var supportedSentChain = supportedChainIdFromGQLChain(sent.asset.chain);
  var supportedReceivedChain = supportedChainIdFromGQLChain(received.asset.chain);
  if (!supportedSentChain || !supportedReceivedChain) {
    logSentryErrorForUnsupportedChain({
      extras: {
        sentAsset: sent.asset,
        receivedAsset: received.asset
      },
      errorMessage: "Invalid activity from unsupported chain received from GQL"
    });
    return undefined;
  }
  if (sent.tokenStandard === "NATIVE" && isSameAddress(nativeOnChain(supportedSentChain).wrapped.address, received.asset.address)) return i18n._(
  /*i18n*/
  {
    id: "P+Mxf/",
    message: "Wrapped"
  });else if (received.tokenStandard === "NATIVE" && isSameAddress(nativeOnChain(supportedReceivedChain).wrapped.address, received.asset.address)) {
    return i18n._(
    /*i18n*/
    {
      id: "sNANgM",
      message: "Unwrapped"
    });
  } else {
    return i18n._(
    /*i18n*/
    {
      id: "QSh9Sn",
      message: "Swapped"
    });
  }
}
function getSwapDescriptor(_ref) {
  var tokenIn = _ref.tokenIn,
    inputAmount = _ref.inputAmount,
    tokenOut = _ref.tokenOut,
    outputAmount = _ref.outputAmount;
  return "".concat(inputAmount, " ").concat(tokenIn.symbol, " for ").concat(outputAmount, " ").concat(tokenOut.symbol);
}

/**
 *
 * @param transactedValue Transacted value amount from TokenTransfer API response
 * @returns parsed & formatted USD value as a string if currency is of type USD
 */
function getTransactedValue(transactedValue) {
  var _transactedValue$valu;
  if (!transactedValue) return undefined;
  var price = (transactedValue === null || transactedValue === void 0 ? void 0 : transactedValue.currency) === Currency.Usd ? (_transactedValue$valu = transactedValue.value) !== null && _transactedValue$valu !== void 0 ? _transactedValue$valu : undefined : undefined;
  return price;
}
function parseSwap(changes, formatNumberOrString) {
  if (changes.NftTransfer.length > 0 && changes.TokenTransfer.length === 1) {
    var collectionCounts = getCollectionCounts(changes.NftTransfer);
    var title = changes.NftTransfer[0].direction === "IN" ? i18n._(
    /*i18n*/
    {
      id: "8DIDYI",
      message: "Bought"
    }) : i18n._(
    /*i18n*/
    {
      id: "s9KGXU",
      message: "Sold"
    });
    var descriptor = Object.entries(collectionCounts).map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
        collectionName = _ref3[0],
        count = _ref3[1];
      return "".concat(count, " ").concat(collectionName);
    }).join();
    return {
      title: title,
      descriptor: descriptor
    };
  }
  // Some swaps may have more than 2 transfers, e.g. swaps with fees on tranfer
  if (changes.TokenTransfer.length >= 2) {
    var sent = changes.TokenTransfer.find(function (t) {
      return t.direction === "OUT";
    });
    // Any leftover native token is refunded on exact_out swaps where the input token is native
    var refund = changes.TokenTransfer.find(function (t) {
      return t.direction === "IN" && t.asset.id === (sent === null || sent === void 0 ? void 0 : sent.asset.id) && t.asset.standard === "NATIVE";
    });
    var received = changes.TokenTransfer.find(function (t) {
      return t.direction === "IN" && t !== refund;
    });
    if (sent && received) {
      var _refund$quantity;
      var adjustedInput = parseFloat(sent.quantity) - parseFloat((_refund$quantity = refund === null || refund === void 0 ? void 0 : refund.quantity) !== null && _refund$quantity !== void 0 ? _refund$quantity : "0");
      var inputAmount = formatNumberOrString({
        input: adjustedInput,
        type: NumberType.TokenNonTx
      });
      var outputAmount = formatNumberOrString({
        input: received.quantity,
        type: NumberType.TokenNonTx
      });
      return {
        title: getSwapTitle(sent, received),
        descriptor: getSwapDescriptor({
          tokenIn: sent.asset,
          inputAmount: inputAmount,
          tokenOut: received.asset,
          outputAmount: outputAmount
        }),
        currencies: [gqlToCurrency(sent.asset), gqlToCurrency(received.asset)]
      };
    }
  }
  return {
    title: i18n._(
    /*i18n*/
    {
      id: "+Ktenx",
      message: "Unknown Swap"
    })
  };
}

/**
 * Wrap/unwrap transactions are labelled as lend transactions on the backend.
 * This function parses the transaction changes to determine if the transaction is a wrap/unwrap transaction.
 */
function parseLend(changes, formatNumberOrString) {
  var _changes$TokenTransfe, _changes$TokenTransfe2, _gqlToCurrency, _gqlToCurrency2;
  var _native = (_changes$TokenTransfe = changes.TokenTransfer.find(function (t) {
    return t.tokenStandard === "NATIVE";
  })) === null || _changes$TokenTransfe === void 0 ? void 0 : _changes$TokenTransfe.asset;
  var erc20 = (_changes$TokenTransfe2 = changes.TokenTransfer.find(function (t) {
    return t.tokenStandard === "ERC20";
  })) === null || _changes$TokenTransfe2 === void 0 ? void 0 : _changes$TokenTransfe2.asset;
  if (_native && erc20 && ((_gqlToCurrency = gqlToCurrency(_native)) === null || _gqlToCurrency === void 0 ? void 0 : _gqlToCurrency.wrapped.address) === ((_gqlToCurrency2 = gqlToCurrency(erc20)) === null || _gqlToCurrency2 === void 0 ? void 0 : _gqlToCurrency2.wrapped.address)) {
    return parseSwap(changes, formatNumberOrString);
  }
  return {
    title: i18n._(
    /*i18n*/
    {
      id: "HyMpAR",
      message: "Unknown Lend"
    })
  };
}
function parseSwapOrder(changes, formatNumberOrString) {
  return _objectSpread(_objectSpread({}, parseSwap(changes, formatNumberOrString)), {}, {
    prefixIconSrc: UniswapXBolt
  });
}
function parseApprove(changes) {
  if (changes.TokenApproval.length === 1) {
    var title = parseInt(changes.TokenApproval[0].quantity) === 0 ? i18n._(
    /*i18n*/
    {
      id: "qFn8Ux",
      message: "Revoked Approval"
    }) : i18n._(
    /*i18n*/
    {
      id: "7kb4LU",
      message: "Approved"
    });
    var descriptor = "".concat(changes.TokenApproval[0].asset.symbol);
    var currencies = [gqlToCurrency(changes.TokenApproval[0].asset)];
    return {
      title: title,
      descriptor: descriptor,
      currencies: currencies
    };
  }
  return {
    title: i18n._(
    /*i18n*/
    {
      id: "axyN7/",
      message: "Unknown Approval"
    })
  };
}
function parseLPTransfers(changes, formatNumberOrString) {
  var _poolTokenA$asset$pro, _poolTokenB$asset$pro;
  var poolTokenA = changes.TokenTransfer[0];
  var poolTokenB = changes.TokenTransfer[1];
  var tokenAQuanitity = formatNumberOrString({
    input: poolTokenA.quantity,
    type: NumberType.TokenNonTx
  });
  var tokenBQuantity = formatNumberOrString({
    input: poolTokenB.quantity,
    type: NumberType.TokenNonTx
  });
  return {
    descriptor: "".concat(tokenAQuanitity, " ").concat(poolTokenA.asset.symbol, " and ").concat(tokenBQuantity, " ").concat(poolTokenB.asset.symbol),
    logos: [(_poolTokenA$asset$pro = poolTokenA.asset.project) === null || _poolTokenA$asset$pro === void 0 || (_poolTokenA$asset$pro = _poolTokenA$asset$pro.logo) === null || _poolTokenA$asset$pro === void 0 ? void 0 : _poolTokenA$asset$pro.url, (_poolTokenB$asset$pro = poolTokenB.asset.project) === null || _poolTokenB$asset$pro === void 0 || (_poolTokenB$asset$pro = _poolTokenB$asset$pro.logo) === null || _poolTokenB$asset$pro === void 0 ? void 0 : _poolTokenB$asset$pro.url],
    currencies: [gqlToCurrency(poolTokenA.asset), gqlToCurrency(poolTokenB.asset)]
  };
}
function parseSendReceive(changes, formatNumberOrString, assetActivity) {
  // TODO(cartcrom): remove edge cases after backend implements
  // Edge case: Receiving two token transfers in interaction w/ V3 manager === removing liquidity. These edge cases should potentially be moved to backend
  if (changes.TokenTransfer.length === 2 && callsPositionManagerContract(assetActivity)) {
    return _objectSpread({
      title: i18n._(
      /*i18n*/
      {
        id: "06jTc3",
        message: "Removed Liquidity"
      })
    }, parseLPTransfers(changes, formatNumberOrString));
  }
  var transfer;
  var assetName;
  var amount;
  var currencies;
  if (changes.NftTransfer.length === 1) {
    var _transfer$asset$colle;
    transfer = changes.NftTransfer[0];
    assetName = (_transfer$asset$colle = transfer.asset.collection) === null || _transfer$asset$colle === void 0 ? void 0 : _transfer$asset$colle.name;
    amount = "1";
  } else if (changes.TokenTransfer.length === 1) {
    transfer = changes.TokenTransfer[0];
    assetName = transfer.asset.symbol;
    amount = formatNumberOrString({
      input: transfer.quantity,
      type: NumberType.TokenNonTx
    });
    currencies = [gqlToCurrency(transfer.asset)];
  }
  if (transfer && assetName && amount) {
    var isMoonpayPurchase = MOONPAY_SENDER_ADDRESSES.some(function (address) {
      var _transfer;
      return isSameAddress(address, (_transfer = transfer) === null || _transfer === void 0 ? void 0 : _transfer.sender);
    });
    if (transfer.direction === "IN") {
      return isMoonpayPurchase && transfer.__typename === "TokenTransfer" ? {
        title: i18n._(
        /*i18n*/
        {
          id: "dsFmM+",
          message: "Purchased"
        }),
        descriptor: "".concat(amount, " ").concat(assetName, " ").concat(i18n._(
        /*i18n*/
        {
          id: "sQv06Y",
          message: "for"
        }), " ").concat(formatNumberOrString({
          input: getTransactedValue(transfer.transactedValue),
          type: NumberType.FiatTokenPrice
        })),
        logos: [moonpayLogoSrc],
        currencies: currencies
      } : {
        title: i18n._(
        /*i18n*/
        {
          id: "fZ5Vnu",
          message: "Received"
        }),
        descriptor: "".concat(amount, " ").concat(assetName, " ").concat(i18n._(
        /*i18n*/
        {
          id: "GtmO8/",
          message: "from"
        }), " "),
        otherAccount: isAddress(transfer.sender) || undefined,
        currencies: currencies
      };
    } else {
      return {
        title: i18n._(
        /*i18n*/
        {
          id: "h69WC6",
          message: "Sent"
        }),
        descriptor: "".concat(amount, " ").concat(assetName, " ").concat(i18n._(
        /*i18n*/
        {
          id: "dMtLDE",
          message: "to"
        }), " "),
        otherAccount: isAddress(transfer.recipient) || undefined,
        currencies: currencies
      };
    }
  }
  return {
    title: i18n._(
    /*i18n*/
    {
      id: "oSv6Z/",
      message: "Unknown Send"
    })
  };
}
function parseMint(changes, formatNumberOrString, assetActivity) {
  var collectionMap = getCollectionCounts(changes.NftTransfer);
  if (Object.keys(collectionMap).length === 1) {
    var collectionName = Object.keys(collectionMap)[0];

    // Edge case: Minting a v3 positon represents adding liquidity
    if (changes.TokenTransfer.length === 2 && callsPositionManagerContract(assetActivity)) {
      return _objectSpread({
        title: i18n._(
        /*i18n*/
        {
          id: "kA57wI",
          message: "Added Liquidity"
        })
      }, parseLPTransfers(changes, formatNumberOrString));
    }
    return {
      title: i18n._(
      /*i18n*/
      {
        id: "zd8KoI",
        message: "Minted"
      }),
      descriptor: "".concat(collectionMap[collectionName], " ").concat(collectionName)
    };
  }
  return {
    title: i18n._(
    /*i18n*/
    {
      id: "omfa7x",
      message: "Unknown Mint"
    })
  };
}
function parseUnknown(_changes, _formatNumberOrString, assetActivity) {
  return _objectSpread({
    title: i18n._(
    /*i18n*/
    {
      id: "M4g1UJ",
      message: "Contract Interaction"
    })
  }, COMMON_CONTRACTS[assetActivity.details.to.toLowerCase()]);
}
var ActivityParserByType = _defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty(_defineProperty({}, ActivityType.Swap, parseSwap), ActivityType.Lend, parseLend), ActivityType.SwapOrder, parseSwapOrder), ActivityType.Approve, parseApprove), ActivityType.Send, parseSendReceive), ActivityType.Receive, parseSendReceive), ActivityType.Mint, parseMint), ActivityType.Unknown, parseUnknown);
function getLogoSrcs(changes) {
  // Uses set to avoid duplicate logos (e.g. nft's w/ same image url)
  var logoSet = new Set();
  // Uses only NFT logos if they are present (will not combine nft image w/ token image)
  if (changes.NftTransfer.length > 0) {
    changes.NftTransfer.forEach(function (nftChange) {
      var _nftChange$asset$imag;
      return logoSet.add((_nftChange$asset$imag = nftChange.asset.image) === null || _nftChange$asset$imag === void 0 ? void 0 : _nftChange$asset$imag.url);
    });
  } else {
    changes.TokenTransfer.forEach(function (tokenChange) {
      var _tokenChange$asset$pr;
      return logoSet.add((_tokenChange$asset$pr = tokenChange.asset.project) === null || _tokenChange$asset$pr === void 0 || (_tokenChange$asset$pr = _tokenChange$asset$pr.logo) === null || _tokenChange$asset$pr === void 0 ? void 0 : _tokenChange$asset$pr.url);
    });
    changes.TokenApproval.forEach(function (tokenChange) {
      var _tokenChange$asset$pr2;
      return logoSet.add((_tokenChange$asset$pr2 = tokenChange.asset.project) === null || _tokenChange$asset$pr2 === void 0 || (_tokenChange$asset$pr2 = _tokenChange$asset$pr2.logo) === null || _tokenChange$asset$pr2 === void 0 ? void 0 : _tokenChange$asset$pr2.url);
    });
  }
  return Array.from(logoSet);
}
function parseUniswapXOrder(_ref4) {
  var _inputToken$project, _outputToken$project;
  var details = _ref4.details,
    chain = _ref4.chain,
    timestamp = _ref4.timestamp;
  // We currently only have a polling mechanism for locally-sent pending orders, so we hide remote pending orders since they won't update upon completion
  // TODO(WEB-2487): Add polling mechanism for remote orders to allow displaying remote pending orders
  if (details.orderStatus === SwapOrderStatus.Open) return undefined;
  var inputToken = details.inputToken,
    inputTokenQuantity = details.inputTokenQuantity,
    outputToken = details.outputToken,
    outputTokenQuantity = details.outputTokenQuantity,
    orderStatus = details.orderStatus;
  var uniswapXOrderStatus = OrderStatusTable[orderStatus];
  var _OrderTextTable$unisw = OrderTextTable[uniswapXOrderStatus],
    status = _OrderTextTable$unisw.status,
    statusMessage = _OrderTextTable$unisw.statusMessage,
    title = _OrderTextTable$unisw.title;
  var descriptor = getSwapDescriptor({
    tokenIn: inputToken,
    inputAmount: inputTokenQuantity,
    tokenOut: outputToken,
    outputAmount: outputTokenQuantity
  });
  var supportedChain = supportedChainIdFromGQLChain(chain);
  if (!supportedChain) {
    logSentryErrorForUnsupportedChain({
      extras: {
        details: details
      },
      errorMessage: "Invalid activity from unsupported chain received from GQL"
    });
    return undefined;
  }
  return {
    hash: details.hash,
    chainId: supportedChain,
    status: status,
    statusMessage: statusMessage,
    offchainOrderStatus: uniswapXOrderStatus,
    timestamp: timestamp,
    logos: [(_inputToken$project = inputToken.project) === null || _inputToken$project === void 0 || (_inputToken$project = _inputToken$project.logo) === null || _inputToken$project === void 0 ? void 0 : _inputToken$project.url, (_outputToken$project = outputToken.project) === null || _outputToken$project === void 0 || (_outputToken$project = _outputToken$project.logo) === null || _outputToken$project === void 0 ? void 0 : _outputToken$project.url],
    currencies: [gqlToCurrency(inputToken), gqlToCurrency(outputToken)],
    title: title,
    descriptor: descriptor,
    from: details.offerer,
    prefixIconSrc: UniswapXBolt
  };
}
function parseRemoteActivity(assetActivity, formatNumberOrString) {
  try {
    var _ActivityParserByType2;
    if (assetActivity.details.__typename === "SwapOrderDetails") {
      return parseUniswapXOrder(assetActivity);
    }

    // @ts-ignore
    var _changes2 = assetActivity.details.assetChanges.reduce(
    // @ts-ignore
    function (acc, assetChange) {
      if (assetChange.__typename === "NftApproval") acc.NftApproval.push(assetChange);else if (assetChange.__typename === "NftApproveForAll") acc.NftApproveForAll.push(assetChange);else if (assetChange.__typename === "NftTransfer") acc.NftTransfer.push(assetChange);else if (assetChange.__typename === "TokenTransfer") acc.TokenTransfer.push(assetChange);else if (assetChange.__typename === "TokenApproval") acc.TokenApproval.push(assetChange);
      return acc;
    }, {
      NftTransfer: [],
      TokenTransfer: [],
      TokenApproval: [],
      NftApproval: [],
      NftApproveForAll: []
    });
    var supportedChain = supportedChainIdFromGQLChain(assetActivity.chain);
    if (!supportedChain) {
      logSentryErrorForUnsupportedChain({
        extras: {
          assetActivity: assetActivity
        },
        errorMessage: "Invalid activity from unsupported chain received from GQL"
      });
      return undefined;
    }
    var defaultFields = _defineProperty(_defineProperty(_defineProperty(_defineProperty({
      // @ts-ignore
      hash: assetActivity.details.hash,
      chainId: supportedChain,
      // @ts-ignore
      status: assetActivity.details.status,
      timestamp: assetActivity.timestamp,
      logos: getLogoSrcs(_changes2),
      // @ts-ignore
      title: assetActivity.details.type
    }, "title", assetActivity.details.type), "descriptor", assetActivity.details.to), "from", assetActivity.details.from), "nonce", assetActivity.details.nonce);

    // @ts-ignore
    var parsedFields = (_ActivityParserByType2 = ActivityParserByType[assetActivity.details.type]) === null || _ActivityParserByType2 === void 0 ? void 0 : _ActivityParserByType2.call(ActivityParserByType, _changes2, formatNumberOrString, assetActivity);
    return _objectSpread(_objectSpread({}, defaultFields), parsedFields);
  } catch (e) {
    console.error("Failed to parse activity", e, assetActivity);
    return undefined;
  }
}
function parseRemoteActivities(formatNumberOrString, assetActivities) {
  return assetActivities === null || assetActivities === void 0 ? void 0 : assetActivities.reduce(function (acc, assetActivity) {
    var activity = parseRemoteActivity(assetActivity, formatNumberOrString);
    if (activity) acc[activity.hash] = activity;
    return acc;
  }, {});
}
var getTimeSince = function getTimeSince(timestamp) {
  var seconds = Math.floor(Date.now() - timestamp * 1000);
  var interval;
  // TODO(cartcrom): use locale to determine date shorthands to use for non-english
  if ((interval = seconds / ms("1y")) > 1) return Math.floor(interval) + "y";
  if ((interval = seconds / ms("30d")) > 1) return Math.floor(interval) + "mo";
  if ((interval = seconds / ms("1d")) > 1) return Math.floor(interval) + "d";
  if ((interval = seconds / ms("1h")) > 1) return Math.floor(interval) + "h";
  if ((interval = seconds / ms("1m")) > 1) return Math.floor(interval) + "m";else return Math.floor(seconds / ms("1s")) + "s";
};

/**
 * Keeps track of the time since a given timestamp, keeping it up to date every second when necessary
 * @param timestamp
 * @returns
 */
function useTimeSince(timestamp) {
  var _useState = useState(getTimeSince(timestamp)),
    _useState2 = _slicedToArray(_useState, 2),
    timeSince = _useState2[0],
    setTimeSince = _useState2[1];
  useEffect(function () {
    var refreshTime = function refreshTime() {
      return setTimeout(function () {
        if (Math.floor(Date.now() - timestamp * 1000) / ms("61s") <= 1) {
          setTimeSince(getTimeSince(timestamp));
          timeout = refreshTime();
        }
      }, ms("1s"));
    };
    var timeout = refreshTime();
    return function () {
      timeout && clearTimeout(timeout);
    };
  }, [timestamp]);
  return timeSince;
}

export { parseRemoteActivities, useTimeSince };
