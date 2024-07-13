import React__default from 'react';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { TradeType, Fraction } from '@uniswap/sdk-core';
import { BigNumber } from 'ethers/lib/ethers';
import JSBI from 'jsbi';
import { nativeOnChain } from '../../constants/tokens.js';
import { useToken, useCurrency } from '../../hooks/Tokens.js';
import useENSName from '../../hooks/useENSName.js';
import { VoteOption } from '../../state/governance/types.js';
import { TransactionType } from '../../state/transactions/types.js';

function formatAmount(amountRaw, decimals, sigFigs) {
  return new Fraction(amountRaw, JSBI.exponentiate(JSBI.BigInt(10), JSBI.BigInt(decimals))).toSignificant(sigFigs);
}
function FormattedCurrencyAmount(_ref) {
  var rawAmount = _ref.rawAmount,
    symbol = _ref.symbol,
    decimals = _ref.decimals,
    sigFigs = _ref.sigFigs;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, formatAmount(rawAmount, decimals, sigFigs), " ", symbol);
}
function FormattedCurrencyAmountManaged(_ref2) {
  var _currency$symbol;
  var rawAmount = _ref2.rawAmount,
    currencyId = _ref2.currencyId,
    _ref2$sigFigs = _ref2.sigFigs,
    sigFigs = _ref2$sigFigs === void 0 ? 6 : _ref2$sigFigs;
  var currency = useCurrency(currencyId);
  return currency ? /*#__PURE__*/React__default.createElement(FormattedCurrencyAmount, {
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
  return typeof uniAmountRaw === "string" ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "bSNki7",
    message: "Claim <0/> for {0}",
    values: {
      "0": ENSName !== null && ENSName !== void 0 ? ENSName : recipient
    },
    components: {
      "0": /*#__PURE__*/React__default.createElement(FormattedCurrencyAmount, {
        rawAmount: uniAmountRaw,
        symbol: "UNI",
        decimals: 18,
        sigFigs: 4
      })
    }
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "5TmU0U",
    message: "Claim UNI reward for {0}",
    values: {
      "0": ENSName !== null && ENSName !== void 0 ? ENSName : recipient
    }
  });
}
function SubmitProposalTransactionSummary() {
  return /*#__PURE__*/React__default.createElement(Trans, {
    id: "wUhLhH",
    message: "Submit new proposal"
  });
}
function ApprovalSummary(_ref4) {
  var _BigNumber$from;
  var info = _ref4.info;
  var token = useToken(info.tokenAddress);
  return (_BigNumber$from = BigNumber.from(info.amount)) !== null && _BigNumber$from !== void 0 && _BigNumber$from.eq(0) ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "a1EvGV",
    message: "Revoke {0}",
    values: {
      "0": token === null || token === void 0 ? void 0 : token.symbol
    }
  }) : /*#__PURE__*/React__default.createElement(Trans, {
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
      case VoteOption.For:
        return /*#__PURE__*/React__default.createElement(Trans, {
          id: "0l55gd",
          message: "Vote for proposal {proposalKey}",
          values: {
            proposalKey: proposalKey
          }
        });
      case VoteOption.Abstain:
        return /*#__PURE__*/React__default.createElement(Trans, {
          id: "GPbgWr",
          message: "Vote to abstain on proposal {proposalKey}",
          values: {
            proposalKey: proposalKey
          }
        });
      case VoteOption.Against:
        return /*#__PURE__*/React__default.createElement(Trans, {
          id: "wH9gUf",
          message: "Vote against proposal {proposalKey}",
          values: {
            proposalKey: proposalKey
          }
        });
    }
  } else {
    switch (info.decision) {
      case VoteOption.For:
        return /*#__PURE__*/React__default.createElement(Trans, {
          id: "zBAY67",
          message: "Vote for proposal {proposalKey} with reason \"{0}\"",
          values: {
            "0": info.reason,
            proposalKey: proposalKey
          }
        });
      case VoteOption.Abstain:
        return /*#__PURE__*/React__default.createElement(Trans, {
          id: "lkIb/R",
          message: "Vote to abstain on proposal {proposalKey} with reason \"{0}\"",
          values: {
            "0": info.reason,
            proposalKey: proposalKey
          }
        });
      case VoteOption.Against:
        return /*#__PURE__*/React__default.createElement(Trans, {
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
  return /*#__PURE__*/React__default.createElement(Trans, {
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
  return /*#__PURE__*/React__default.createElement(Trans, {
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
  return /*#__PURE__*/React__default.createElement(Trans, {
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
  var _native = chainId ? nativeOnChain(chainId) : undefined;
  if (unwrapped) {
    var _native$symbol, _native$wrapped$symbo, _native$wrapped;
    return /*#__PURE__*/React__default.createElement(Trans, {
      id: "7jNXA4",
      message: "Unwrap <0/> to {0}",
      values: {
        "0": (_native$symbol = _native === null || _native === void 0 ? void 0 : _native.symbol) !== null && _native$symbol !== void 0 ? _native$symbol : "ETH"
      },
      components: {
        "0": /*#__PURE__*/React__default.createElement(FormattedCurrencyAmount, {
          rawAmount: currencyAmountRaw,
          symbol: (_native$wrapped$symbo = _native === null || _native === void 0 || (_native$wrapped = _native.wrapped) === null || _native$wrapped === void 0 ? void 0 : _native$wrapped.symbol) !== null && _native$wrapped$symbo !== void 0 ? _native$wrapped$symbo : "WETH",
          decimals: 18,
          sigFigs: 6
        })
      }
    });
  } else {
    var _native$wrapped$symbo2, _native$wrapped2, _native$symbol2;
    return /*#__PURE__*/React__default.createElement(Trans, {
      id: "v6OlxZ",
      message: "Wrap <0/> to {0}",
      values: {
        "0": (_native$wrapped$symbo2 = _native === null || _native === void 0 || (_native$wrapped2 = _native.wrapped) === null || _native$wrapped2 === void 0 ? void 0 : _native$wrapped2.symbol) !== null && _native$wrapped$symbo2 !== void 0 ? _native$wrapped$symbo2 : "WETH"
      },
      components: {
        "0": /*#__PURE__*/React__default.createElement(FormattedCurrencyAmount, {
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
  return /*#__PURE__*/React__default.createElement(Trans, {
    id: "ZnrtHG",
    message: "Deposit liquidity"
  });
}
function WithdrawLiquidityStakingSummary() {
  return /*#__PURE__*/React__default.createElement(Trans, {
    id: "cs0d7d",
    message: "Withdraw deposited liquidity"
  });
}
function MigrateLiquidityToV3Summary(_ref10) {
  var _ref10$info = _ref10.info,
    baseCurrencyId = _ref10$info.baseCurrencyId,
    quoteCurrencyId = _ref10$info.quoteCurrencyId;
  var baseCurrency = useCurrency(baseCurrencyId);
  var quoteCurrency = useCurrency(quoteCurrencyId);
  return /*#__PURE__*/React__default.createElement(Trans, {
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
  var baseCurrency = useCurrency(baseCurrencyId);
  var quoteCurrency = useCurrency(quoteCurrencyId);
  return /*#__PURE__*/React__default.createElement(Trans, {
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
  var currency0 = useCurrency(currencyId0);
  var currency1 = useCurrency(currencyId1);
  return /*#__PURE__*/React__default.createElement(Trans, {
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
  return /*#__PURE__*/React__default.createElement(Trans, {
    id: "bqGPBl",
    message: "Remove <0/> and <1/>",
    components: {
      "0": /*#__PURE__*/React__default.createElement(FormattedCurrencyAmountManaged, {
        rawAmount: expectedAmountBaseRaw,
        currencyId: baseCurrencyId,
        sigFigs: 3
      }),
      "1": /*#__PURE__*/React__default.createElement(FormattedCurrencyAmountManaged, {
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
  var baseCurrency = useCurrency(baseCurrencyId);
  var quoteCurrency = useCurrency(quoteCurrencyId);
  return createPool ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "xn2Tnb",
    message: "Create pool and add {0}/{1} V3 liquidity",
    values: {
      "0": baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol,
      "1": quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
    }
  }) : /*#__PURE__*/React__default.createElement(Trans, {
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
  return /*#__PURE__*/React__default.createElement(Trans, {
    id: "V7B6pr",
    message: "Add <0/> and <1/> to Uniswap V2",
    components: {
      "0": /*#__PURE__*/React__default.createElement(FormattedCurrencyAmountManaged, {
        rawAmount: expectedAmountBaseRaw,
        currencyId: baseCurrencyId,
        sigFigs: 3
      }),
      "1": /*#__PURE__*/React__default.createElement(FormattedCurrencyAmountManaged, {
        rawAmount: expectedAmountQuoteRaw,
        currencyId: quoteCurrencyId,
        sigFigs: 3
      })
    }
  });
}
function SwapSummary(_ref16) {
  var info = _ref16.info;
  if (info.tradeType === TradeType.EXACT_INPUT) {
    var _info$settledOutputCu;
    return /*#__PURE__*/React__default.createElement(Trans, {
      id: "EA6BTt",
      message: "Swap exactly <0/> for <1/>",
      components: {
        "0": /*#__PURE__*/React__default.createElement(FormattedCurrencyAmountManaged, {
          rawAmount: info.inputCurrencyAmountRaw,
          currencyId: info.inputCurrencyId,
          sigFigs: 6
        }),
        "1": /*#__PURE__*/React__default.createElement(FormattedCurrencyAmountManaged, {
          rawAmount: (_info$settledOutputCu = info.settledOutputCurrencyAmountRaw) !== null && _info$settledOutputCu !== void 0 ? _info$settledOutputCu : info.expectedOutputCurrencyAmountRaw,
          currencyId: info.outputCurrencyId,
          sigFigs: 6
        })
      }
    });
  } else {
    return /*#__PURE__*/React__default.createElement(Trans, {
      id: "N078gH",
      message: "Swap <0/> for exactly <1/>",
      components: {
        "0": /*#__PURE__*/React__default.createElement(FormattedCurrencyAmountManaged, {
          rawAmount: info.expectedInputCurrencyAmountRaw,
          currencyId: info.inputCurrencyId,
          sigFigs: 6
        }),
        "1": /*#__PURE__*/React__default.createElement(FormattedCurrencyAmountManaged, {
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
    case TransactionType.ADD_LIQUIDITY_V3_POOL:
      return /*#__PURE__*/React__default.createElement(AddLiquidityV3PoolSummary, {
        info: info
      });
    case TransactionType.ADD_LIQUIDITY_V2_POOL:
      return /*#__PURE__*/React__default.createElement(AddLiquidityV2PoolSummary, {
        info: info
      });
    case TransactionType.CLAIM:
      return /*#__PURE__*/React__default.createElement(ClaimSummary, {
        info: info
      });
    case TransactionType.DEPOSIT_LIQUIDITY_STAKING:
      return /*#__PURE__*/React__default.createElement(DepositLiquidityStakingSummary, null);
    case TransactionType.WITHDRAW_LIQUIDITY_STAKING:
      return /*#__PURE__*/React__default.createElement(WithdrawLiquidityStakingSummary, null);
    case TransactionType.SWAP:
      return /*#__PURE__*/React__default.createElement(SwapSummary, {
        info: info
      });
    case TransactionType.APPROVAL:
      return /*#__PURE__*/React__default.createElement(ApprovalSummary, {
        info: info
      });
    case TransactionType.VOTE:
      return /*#__PURE__*/React__default.createElement(VoteSummary, {
        info: info
      });
    case TransactionType.DELEGATE:
      return /*#__PURE__*/React__default.createElement(DelegateSummary, {
        info: info
      });
    case TransactionType.WRAP:
      return /*#__PURE__*/React__default.createElement(WrapSummary, {
        info: info
      });
    case TransactionType.CREATE_V3_POOL:
      return /*#__PURE__*/React__default.createElement(CreateV3PoolSummary, {
        info: info
      });
    case TransactionType.MIGRATE_LIQUIDITY_V3:
      return /*#__PURE__*/React__default.createElement(MigrateLiquidityToV3Summary, {
        info: info
      });
    case TransactionType.COLLECT_FEES:
      return /*#__PURE__*/React__default.createElement(CollectFeesSummary, {
        info: info
      });
    case TransactionType.REMOVE_LIQUIDITY_V3:
      return /*#__PURE__*/React__default.createElement(RemoveLiquidityV3Summary, {
        info: info
      });
    case TransactionType.QUEUE:
      return /*#__PURE__*/React__default.createElement(QueueSummary, {
        info: info
      });
    case TransactionType.EXECUTE:
      return /*#__PURE__*/React__default.createElement(ExecuteSummary, {
        info: info
      });
    case TransactionType.SUBMIT_PROPOSAL:
      return /*#__PURE__*/React__default.createElement(SubmitProposalTransactionSummary, null);
  }
}

export { TransactionSummary };
