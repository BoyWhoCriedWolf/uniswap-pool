'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var index = require('../../../node_modules/@lingui/react/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var ethers = require('ethers/lib/ethers');
var JSBI = require('jsbi');
var tokens = require('../../constants/tokens.cjs');
var Tokens = require('../../hooks/Tokens.cjs');
var useENSName = require('../../hooks/useENSName.cjs');
var types$1 = require('../../state/governance/types.cjs');
var types = require('../../state/transactions/types.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

function formatAmount(amountRaw, decimals, sigFigs) {
  return new sdkCore.Fraction(amountRaw, JSBI__default["default"].exponentiate(JSBI__default["default"].BigInt(10), JSBI__default["default"].BigInt(decimals))).toSignificant(sigFigs);
}
function FormattedCurrencyAmount(_ref) {
  var rawAmount = _ref.rawAmount,
    symbol = _ref.symbol,
    decimals = _ref.decimals,
    sigFigs = _ref.sigFigs;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, formatAmount(rawAmount, decimals, sigFigs), " ", symbol);
}
function FormattedCurrencyAmountManaged(_ref2) {
  var _currency$symbol;
  var rawAmount = _ref2.rawAmount,
    currencyId = _ref2.currencyId,
    _ref2$sigFigs = _ref2.sigFigs,
    sigFigs = _ref2$sigFigs === void 0 ? 6 : _ref2$sigFigs;
  var currency = Tokens.useCurrency(currencyId);
  return currency ? /*#__PURE__*/React__default["default"].createElement(FormattedCurrencyAmount, {
    rawAmount: rawAmount,
    decimals: currency.decimals,
    sigFigs: sigFigs,
    symbol: (_currency$symbol = currency.symbol) !== null && _currency$symbol !== void 0 ? _currency$symbol : "???"
  }) : null;
}
function ClaimSummary(_ref3) {
  var _ref3$info = _ref3.info,
    recipient = _ref3$info.recipient,
    uniAmountRaw = _ref3$info.uniAmountRaw;
  var _useENSName = useENSName(),
    ENSName = _useENSName.ENSName;
  return typeof uniAmountRaw === "string" ? /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "bSNki7",
    message: "Claim <0/> for {0}",
    values: {
      "0": ENSName !== null && ENSName !== void 0 ? ENSName : recipient
    },
    components: {
      "0": /*#__PURE__*/React__default["default"].createElement(FormattedCurrencyAmount, {
        rawAmount: uniAmountRaw,
        symbol: "UNI",
        decimals: 18,
        sigFigs: 4
      })
    }
  }) : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "5TmU0U",
    message: "Claim UNI reward for {0}",
    values: {
      "0": ENSName !== null && ENSName !== void 0 ? ENSName : recipient
    }
  });
}
function SubmitProposalTransactionSummary() {
  return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "wUhLhH",
    message: "Submit new proposal"
  });
}
function ApprovalSummary(_ref4) {
  var _BigNumber$from;
  var info = _ref4.info;
  var token = Tokens.useToken(info.tokenAddress);
  return (_BigNumber$from = ethers.BigNumber.from(info.amount)) !== null && _BigNumber$from !== void 0 && _BigNumber$from.eq(0) ? /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "a1EvGV",
    message: "Revoke {0}",
    values: {
      "0": token === null || token === void 0 ? void 0 : token.symbol
    }
  }) : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "fgGids",
    message: "Approve {0}",
    values: {
      "0": token === null || token === void 0 ? void 0 : token.symbol
    }
  });
}
function VoteSummary(_ref5) {
  var info = _ref5.info;
  var proposalKey = "".concat(info.governorAddress, "/").concat(info.proposalId);
  if (info.reason && info.reason.trim().length > 0) {
    switch (info.decision) {
      case types$1.VoteOption.For:
        return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
          id: "0l55gd",
          message: "Vote for proposal {proposalKey}",
          values: {
            proposalKey: proposalKey
          }
        });
      case types$1.VoteOption.Abstain:
        return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
          id: "GPbgWr",
          message: "Vote to abstain on proposal {proposalKey}",
          values: {
            proposalKey: proposalKey
          }
        });
      case types$1.VoteOption.Against:
        return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
          id: "wH9gUf",
          message: "Vote against proposal {proposalKey}",
          values: {
            proposalKey: proposalKey
          }
        });
    }
  } else {
    switch (info.decision) {
      case types$1.VoteOption.For:
        return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
          id: "zBAY67",
          message: "Vote for proposal {proposalKey} with reason \"{0}\"",
          values: {
            "0": info.reason,
            proposalKey: proposalKey
          }
        });
      case types$1.VoteOption.Abstain:
        return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
          id: "lkIb/R",
          message: "Vote to abstain on proposal {proposalKey} with reason \"{0}\"",
          values: {
            "0": info.reason,
            proposalKey: proposalKey
          }
        });
      case types$1.VoteOption.Against:
        return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
          id: "wnjcA+",
          message: "Vote against proposal {proposalKey} with reason \"{0}\"",
          values: {
            "0": info.reason,
            proposalKey: proposalKey
          }
        });
    }
  }
}
function QueueSummary(_ref6) {
  var info = _ref6.info;
  var proposalKey = "".concat(info.governorAddress, "/").concat(info.proposalId);
  return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "5BeGFT",
    message: "Queue proposal {proposalKey}.",
    values: {
      proposalKey: proposalKey
    }
  });
}
function ExecuteSummary(_ref7) {
  var info = _ref7.info;
  var proposalKey = "".concat(info.governorAddress, "/").concat(info.proposalId);
  return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "XtYDjM",
    message: "Execute proposal {proposalKey}.",
    values: {
      proposalKey: proposalKey
    }
  });
}
function DelegateSummary(_ref8) {
  var delegatee = _ref8.info.delegatee;
  var _useENSName2 = useENSName(delegatee),
    ENSName = _useENSName2.ENSName;
  return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "0gp1xS",
    message: "Delegate voting power to {0}",
    values: {
      "0": ENSName !== null && ENSName !== void 0 ? ENSName : delegatee
    }
  });
}
function WrapSummary(_ref9) {
  var _ref9$info = _ref9.info,
    chainId = _ref9$info.chainId,
    currencyAmountRaw = _ref9$info.currencyAmountRaw,
    unwrapped = _ref9$info.unwrapped;
  var _native = chainId ? tokens.nativeOnChain(chainId) : undefined;
  if (unwrapped) {
    var _native$symbol, _native$wrapped$symbo, _native$wrapped;
    return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "7jNXA4",
      message: "Unwrap <0/> to {0}",
      values: {
        "0": (_native$symbol = _native === null || _native === void 0 ? void 0 : _native.symbol) !== null && _native$symbol !== void 0 ? _native$symbol : "ETH"
      },
      components: {
        "0": /*#__PURE__*/React__default["default"].createElement(FormattedCurrencyAmount, {
          rawAmount: currencyAmountRaw,
          symbol: (_native$wrapped$symbo = _native === null || _native === void 0 || (_native$wrapped = _native.wrapped) === null || _native$wrapped === void 0 ? void 0 : _native$wrapped.symbol) !== null && _native$wrapped$symbo !== void 0 ? _native$wrapped$symbo : "WETH",
          decimals: 18,
          sigFigs: 6
        })
      }
    });
  } else {
    var _native$wrapped$symbo2, _native$wrapped2, _native$symbol2;
    return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "v6OlxZ",
      message: "Wrap <0/> to {0}",
      values: {
        "0": (_native$wrapped$symbo2 = _native === null || _native === void 0 || (_native$wrapped2 = _native.wrapped) === null || _native$wrapped2 === void 0 ? void 0 : _native$wrapped2.symbol) !== null && _native$wrapped$symbo2 !== void 0 ? _native$wrapped$symbo2 : "WETH"
      },
      components: {
        "0": /*#__PURE__*/React__default["default"].createElement(FormattedCurrencyAmount, {
          rawAmount: currencyAmountRaw,
          symbol: (_native$symbol2 = _native === null || _native === void 0 ? void 0 : _native.symbol) !== null && _native$symbol2 !== void 0 ? _native$symbol2 : "ETH",
          decimals: 18,
          sigFigs: 6
        })
      }
    });
  }
}
function DepositLiquidityStakingSummary() {
  // not worth rendering the tokens since you can should no longer deposit liquidity in the staking contracts
  // todo: deprecate and delete the code paths that allow this, show user more information
  return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "ZnrtHG",
    message: "Deposit liquidity"
  });
}
function WithdrawLiquidityStakingSummary() {
  return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "cs0d7d",
    message: "Withdraw deposited liquidity"
  });
}
function MigrateLiquidityToV3Summary(_ref10) {
  var _ref10$info = _ref10.info,
    baseCurrencyId = _ref10$info.baseCurrencyId,
    quoteCurrencyId = _ref10$info.quoteCurrencyId;
  var baseCurrency = Tokens.useCurrency(baseCurrencyId);
  var quoteCurrency = Tokens.useCurrency(quoteCurrencyId);
  return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "Q67jnO",
    message: "Migrate {0}/{1} liquidity to V3",
    values: {
      "0": baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol,
      "1": quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
    }
  });
}
function CreateV3PoolSummary(_ref11) {
  var _ref11$info = _ref11.info,
    quoteCurrencyId = _ref11$info.quoteCurrencyId,
    baseCurrencyId = _ref11$info.baseCurrencyId;
  var baseCurrency = Tokens.useCurrency(baseCurrencyId);
  var quoteCurrency = Tokens.useCurrency(quoteCurrencyId);
  return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "0oKBc4",
    message: "Create {0}/{1} V3 pool",
    values: {
      "0": baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol,
      "1": quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
    }
  });
}
function CollectFeesSummary(_ref12) {
  var _ref12$info = _ref12.info,
    currencyId0 = _ref12$info.currencyId0,
    currencyId1 = _ref12$info.currencyId1;
  var currency0 = Tokens.useCurrency(currencyId0);
  var currency1 = Tokens.useCurrency(currencyId1);
  return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "RKHSxX",
    message: "Collect {0}/{1} fees",
    values: {
      "0": currency0 === null || currency0 === void 0 ? void 0 : currency0.symbol,
      "1": currency1 === null || currency1 === void 0 ? void 0 : currency1.symbol
    }
  });
}
function RemoveLiquidityV3Summary(_ref13) {
  var _ref13$info = _ref13.info,
    baseCurrencyId = _ref13$info.baseCurrencyId,
    quoteCurrencyId = _ref13$info.quoteCurrencyId,
    expectedAmountBaseRaw = _ref13$info.expectedAmountBaseRaw,
    expectedAmountQuoteRaw = _ref13$info.expectedAmountQuoteRaw;
  return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "bqGPBl",
    message: "Remove <0/> and <1/>",
    components: {
      "0": /*#__PURE__*/React__default["default"].createElement(FormattedCurrencyAmountManaged, {
        rawAmount: expectedAmountBaseRaw,
        currencyId: baseCurrencyId,
        sigFigs: 3
      }),
      "1": /*#__PURE__*/React__default["default"].createElement(FormattedCurrencyAmountManaged, {
        rawAmount: expectedAmountQuoteRaw,
        currencyId: quoteCurrencyId,
        sigFigs: 3
      })
    }
  });
}
function AddLiquidityV3PoolSummary(_ref14) {
  var _ref14$info = _ref14.info,
    createPool = _ref14$info.createPool,
    quoteCurrencyId = _ref14$info.quoteCurrencyId,
    baseCurrencyId = _ref14$info.baseCurrencyId;
  var baseCurrency = Tokens.useCurrency(baseCurrencyId);
  var quoteCurrency = Tokens.useCurrency(quoteCurrencyId);
  return createPool ? /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "xn2Tnb",
    message: "Create pool and add {0}/{1} V3 liquidity",
    values: {
      "0": baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol,
      "1": quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
    }
  }) : /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "8wzCv/",
    message: "Add {0}/{1} V3 liquidity",
    values: {
      "0": baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol,
      "1": quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
    }
  });
}
function AddLiquidityV2PoolSummary(_ref15) {
  var _ref15$info = _ref15.info,
    quoteCurrencyId = _ref15$info.quoteCurrencyId,
    expectedAmountBaseRaw = _ref15$info.expectedAmountBaseRaw,
    expectedAmountQuoteRaw = _ref15$info.expectedAmountQuoteRaw,
    baseCurrencyId = _ref15$info.baseCurrencyId;
  return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "V7B6pr",
    message: "Add <0/> and <1/> to Uniswap V2",
    components: {
      "0": /*#__PURE__*/React__default["default"].createElement(FormattedCurrencyAmountManaged, {
        rawAmount: expectedAmountBaseRaw,
        currencyId: baseCurrencyId,
        sigFigs: 3
      }),
      "1": /*#__PURE__*/React__default["default"].createElement(FormattedCurrencyAmountManaged, {
        rawAmount: expectedAmountQuoteRaw,
        currencyId: quoteCurrencyId,
        sigFigs: 3
      })
    }
  });
}
function SwapSummary(_ref16) {
  var info = _ref16.info;
  if (info.tradeType === sdkCore.TradeType.EXACT_INPUT) {
    var _info$settledOutputCu;
    return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "EA6BTt",
      message: "Swap exactly <0/> for <1/>",
      components: {
        "0": /*#__PURE__*/React__default["default"].createElement(FormattedCurrencyAmountManaged, {
          rawAmount: info.inputCurrencyAmountRaw,
          currencyId: info.inputCurrencyId,
          sigFigs: 6
        }),
        "1": /*#__PURE__*/React__default["default"].createElement(FormattedCurrencyAmountManaged, {
          rawAmount: (_info$settledOutputCu = info.settledOutputCurrencyAmountRaw) !== null && _info$settledOutputCu !== void 0 ? _info$settledOutputCu : info.expectedOutputCurrencyAmountRaw,
          currencyId: info.outputCurrencyId,
          sigFigs: 6
        })
      }
    });
  } else {
    return /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "N078gH",
      message: "Swap <0/> for exactly <1/>",
      components: {
        "0": /*#__PURE__*/React__default["default"].createElement(FormattedCurrencyAmountManaged, {
          rawAmount: info.expectedInputCurrencyAmountRaw,
          currencyId: info.inputCurrencyId,
          sigFigs: 6
        }),
        "1": /*#__PURE__*/React__default["default"].createElement(FormattedCurrencyAmountManaged, {
          rawAmount: info.outputCurrencyAmountRaw,
          currencyId: info.outputCurrencyId,
          sigFigs: 6
        })
      }
    });
  }
}
function TransactionSummary(_ref17) {
  var info = _ref17.info;
  switch (info.type) {
    case types.TransactionType.ADD_LIQUIDITY_V3_POOL:
      return /*#__PURE__*/React__default["default"].createElement(AddLiquidityV3PoolSummary, {
        info: info
      });
    case types.TransactionType.ADD_LIQUIDITY_V2_POOL:
      return /*#__PURE__*/React__default["default"].createElement(AddLiquidityV2PoolSummary, {
        info: info
      });
    case types.TransactionType.CLAIM:
      return /*#__PURE__*/React__default["default"].createElement(ClaimSummary, {
        info: info
      });
    case types.TransactionType.DEPOSIT_LIQUIDITY_STAKING:
      return /*#__PURE__*/React__default["default"].createElement(DepositLiquidityStakingSummary, null);
    case types.TransactionType.WITHDRAW_LIQUIDITY_STAKING:
      return /*#__PURE__*/React__default["default"].createElement(WithdrawLiquidityStakingSummary, null);
    case types.TransactionType.SWAP:
      return /*#__PURE__*/React__default["default"].createElement(SwapSummary, {
        info: info
      });
    case types.TransactionType.APPROVAL:
      return /*#__PURE__*/React__default["default"].createElement(ApprovalSummary, {
        info: info
      });
    case types.TransactionType.VOTE:
      return /*#__PURE__*/React__default["default"].createElement(VoteSummary, {
        info: info
      });
    case types.TransactionType.DELEGATE:
      return /*#__PURE__*/React__default["default"].createElement(DelegateSummary, {
        info: info
      });
    case types.TransactionType.WRAP:
      return /*#__PURE__*/React__default["default"].createElement(WrapSummary, {
        info: info
      });
    case types.TransactionType.CREATE_V3_POOL:
      return /*#__PURE__*/React__default["default"].createElement(CreateV3PoolSummary, {
        info: info
      });
    case types.TransactionType.MIGRATE_LIQUIDITY_V3:
      return /*#__PURE__*/React__default["default"].createElement(MigrateLiquidityToV3Summary, {
        info: info
      });
    case types.TransactionType.COLLECT_FEES:
      return /*#__PURE__*/React__default["default"].createElement(CollectFeesSummary, {
        info: info
      });
    case types.TransactionType.REMOVE_LIQUIDITY_V3:
      return /*#__PURE__*/React__default["default"].createElement(RemoveLiquidityV3Summary, {
        info: info
      });
    case types.TransactionType.QUEUE:
      return /*#__PURE__*/React__default["default"].createElement(QueueSummary, {
        info: info
      });
    case types.TransactionType.EXECUTE:
      return /*#__PURE__*/React__default["default"].createElement(ExecuteSummary, {
        info: info
      });
    case types.TransactionType.SUBMIT_PROPOSAL:
      return /*#__PURE__*/React__default["default"].createElement(SubmitProposalTransactionSummary, null);
  }
}

exports.TransactionSummary = TransactionSummary;
