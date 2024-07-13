'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$4 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index$5 = require('../../../node_modules/@lingui/core/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var core = require('@web3-react/core');
var index$7 = require('../Badge/index.cjs');
var chainInfo = require('../../constants/chainInfo.cjs');
var useCurrencyLogoURIs = require('../../lib/hooks/useCurrencyLogoURIs.cjs');
var reactFeather = require('react-feather');
var hooks = require('../../state/transactions/hooks.cjs');
var styled = require('styled-components');
var index$3 = require('../../theme/components/index.cjs');
var chains = require('../../utils/chains.cjs');
var getExplorerLink = require('../../utils/getExplorerLink.cjs');
var blueLoader = require('../../assets/images/blue-loader.cjs');
var TransactionSummary = require('../AccountDetails/TransactionSummary.cjs');
var index$6 = require('../Button/index.cjs');
var index = require('../Column/index.cjs');
var index$1 = require('../Modal/index.cjs');
var index$2 = require('../Row/index.cjs');
var AnimatedConfirmation = require('./AnimatedConfirmation.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var Wrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border-radius: 20px;\n  outline: 1px solid ", ";\n  width: 100%;\n  padding: 16px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
});
var BottomSection = styled__default["default"](index.AutoColumn)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  border-bottom-left-radius: 20px;\n  border-bottom-right-radius: 20px;\n"])));
var ConfirmedIcon = styled__default["default"](index.ColumnCenter)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  padding: ", ";\n"])), function (_ref3) {
  var inline = _ref3.inline;
  return inline ? "20px 0" : "32px 0;";
});
var StyledLogo = styled__default["default"].img(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  height: 16px;\n  width: 16px;\n  margin-left: 6px;\n"])));
var ConfirmationModalContentWrapper = styled__default["default"](index.AutoColumn)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  padding-bottom: 12px;\n"])));
function ConfirmationPendingContent(_ref4) {
  var onDismiss = _ref4.onDismiss,
    pendingText = _ref4.pendingText,
    inline = _ref4.inline;
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "md"
  }, !inline && /*#__PURE__*/React__default["default"].createElement(index$2.RowBetween, null, /*#__PURE__*/React__default["default"].createElement("div", null), /*#__PURE__*/React__default["default"].createElement(index$3.CloseIcon, {
    onClick: onDismiss
  })), /*#__PURE__*/React__default["default"].createElement(ConfirmedIcon, {
    inline: inline
  }, /*#__PURE__*/React__default["default"].createElement(index$3.CustomLightSpinner, {
    src: blueLoader,
    alt: "loader",
    size: inline ? "40px" : "90px"
  })), /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "md",
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderLarge, {
    color: "neutral1",
    textAlign: "center"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "v/dhKi",
    message: "Waiting for confirmation"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, {
    color: "neutral1",
    textAlign: "center"
  }, pendingText), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, {
    color: "neutral2",
    textAlign: "center",
    marginBottom: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "oG26Rt",
    message: "Confirm this transaction in your wallet"
  })))));
}
function TransactionSubmittedContent(_ref5) {
  var onDismiss = _ref5.onDismiss,
    chainId = _ref5.chainId,
    hash = _ref5.hash,
    currencyToAdd = _ref5.currencyToAdd,
    inline = _ref5.inline;
  var theme = styled.useTheme();
  var _useWeb3React = core.useWeb3React(),
    connector = _useWeb3React.connector;
  var token = currencyToAdd === null || currencyToAdd === void 0 ? void 0 : currencyToAdd.wrapped;
  var logoURL = useCurrencyLogoURIs["default"](token)[0];
  var _useState = React.useState(),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    success = _useState2[0],
    setSuccess = _useState2[1];
  var addToken = React.useCallback(function () {
    if (!(token !== null && token !== void 0 && token.symbol) || !connector.watchAsset) return;
    connector.watchAsset({
      address: token.address,
      symbol: token.symbol,
      decimals: token.decimals,
      image: logoURL
    }).then(function () {
      return setSuccess(true);
    })["catch"](function () {
      return setSuccess(false);
    });
  }, [connector, logoURL, token]);
  var explorerText = chainId === sdkCore.ChainId.MAINNET ? index$5.i18n._(
  /*i18n*/
  {
    id: "J6fH9n",
    message: "View on  Etherscan"
  }) : index$5.i18n._(
  /*i18n*/
  {
    id: "O4DSKu",
    message: "View on Block Explorer"
  });
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, null, !inline && /*#__PURE__*/React__default["default"].createElement(index$2.RowBetween, null, /*#__PURE__*/React__default["default"].createElement("div", null), /*#__PURE__*/React__default["default"].createElement(index$3.CloseIcon, {
    onClick: onDismiss
  })), /*#__PURE__*/React__default["default"].createElement(ConfirmedIcon, {
    inline: inline
  }, /*#__PURE__*/React__default["default"].createElement(reactFeather.ArrowUpCircle, {
    strokeWidth: 1,
    size: inline ? "40px" : "75px",
    color: theme.accent1
  })), /*#__PURE__*/React__default["default"].createElement(ConfirmationModalContentWrapper, {
    gap: "md",
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.MediumHeader, {
    textAlign: "center"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "ExzCxg",
    message: "Transaction submitted"
  })), currencyToAdd && connector.watchAsset && /*#__PURE__*/React__default["default"].createElement(index$6.ButtonLight, {
    mt: "12px",
    padding: "6px 12px",
    width: "fit-content",
    onClick: addToken
  }, !success ? /*#__PURE__*/React__default["default"].createElement(index$2.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "3nLdaX",
    message: "Add {0}",
    values: {
      "0": currencyToAdd.symbol
    }
  })) : /*#__PURE__*/React__default["default"].createElement(index$2.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "e5wMU/",
    message: "Added {0}",
    values: {
      "0": currencyToAdd.symbol
    }
  }), /*#__PURE__*/React__default["default"].createElement(reactFeather.CheckCircle, {
    size: "16px",
    stroke: theme.success,
    style: {
      marginLeft: "6px"
    }
  }))), /*#__PURE__*/React__default["default"].createElement(index$6.ButtonPrimary, {
    onClick: onDismiss,
    style: {
      margin: "20px 0 0 0"
    },
    "data-testid": "dismiss-tx-confirmation"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, {
    color: theme.deprecated_accentTextLightPrimary
  }, inline ? /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "vUOn9d",
    message: "Return"
  }) : /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "yz7wBu",
    message: "Close"
  }))), chainId && hash && /*#__PURE__*/React__default["default"].createElement(index$3.ExternalLink, {
    href: getExplorerLink.getExplorerLink(chainId, hash, getExplorerLink.ExplorerDataType.TRANSACTION)
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.Link, {
    color: theme.accent1
  }, explorerText)))));
}
function ConfirmationModalContent(_ref6) {
  var title = _ref6.title,
    bottomContent = _ref6.bottomContent,
    onDismiss = _ref6.onDismiss,
    topContent = _ref6.topContent,
    headerContent = _ref6.headerContent;
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "sm"
  }, /*#__PURE__*/React__default["default"].createElement(index$2["default"], null, headerContent === null || headerContent === void 0 ? void 0 : headerContent(), /*#__PURE__*/React__default["default"].createElement(index$2["default"], {
    justify: "center",
    marginLeft: "24px"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, title)), /*#__PURE__*/React__default["default"].createElement(index$3.CloseIcon, {
    onClick: onDismiss,
    "data-testid": "confirmation-close-icon"
  })), topContent()), bottomContent && /*#__PURE__*/React__default["default"].createElement(BottomSection, {
    gap: "12px"
  }, bottomContent()));
}
function L2Content(_ref7) {
  var _transaction$receipt;
  var onDismiss = _ref7.onDismiss,
    chainId = _ref7.chainId,
    hash = _ref7.hash,
    pendingText = _ref7.pendingText,
    inline = _ref7.inline;
  var theme = styled.useTheme();
  var transaction = hooks.useTransaction(hash);
  var confirmed = hooks.useIsTransactionConfirmed(hash);
  var transactionSuccess = (transaction === null || transaction === void 0 || (_transaction$receipt = transaction.receipt) === null || _transaction$receipt === void 0 ? void 0 : _transaction$receipt.status) === 1;

  // convert unix time difference to seconds
  var secondsToConfirm = transaction !== null && transaction !== void 0 && transaction.confirmedTime ? (transaction.confirmedTime - transaction.addedTime) / 1000 : undefined;
  var info = chainInfo.getChainInfo(chainId);
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, null, !inline && /*#__PURE__*/React__default["default"].createElement(index$2.RowBetween, {
    mb: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(index$7["default"], null, /*#__PURE__*/React__default["default"].createElement(index$2.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(StyledLogo, {
    src: info.logoUrl,
    style: {
      margin: "0 8px 0 0"
    }
  }), info.label)), /*#__PURE__*/React__default["default"].createElement(index$3.CloseIcon, {
    onClick: onDismiss
  })), /*#__PURE__*/React__default["default"].createElement(ConfirmedIcon, {
    inline: inline
  }, confirmed ? transactionSuccess ?
  /*#__PURE__*/
  // <CheckCircle strokeWidth={1} size={inline ? '40px' : '90px'} color={theme.success} />
  React__default["default"].createElement(AnimatedConfirmation, null) : /*#__PURE__*/React__default["default"].createElement(reactFeather.AlertCircle, {
    strokeWidth: 1,
    size: inline ? "40px" : "90px",
    color: theme.critical
  }) : /*#__PURE__*/React__default["default"].createElement(index$3.CustomLightSpinner, {
    src: blueLoader,
    alt: "loader",
    size: inline ? "40px" : "90px"
  })), /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "md",
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderLarge, {
    textAlign: "center"
  }, !hash ? /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "fgo6o9",
    message: "Confirm transaction in wallet"
  }) : !confirmed ? /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "ExzCxg",
    message: "Transaction submitted"
  }) : transactionSuccess ? /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "zzDlyQ",
    message: "Success"
  }) : /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "SlfejT",
    message: "Error"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySecondary, {
    textAlign: "center"
  }, transaction ? /*#__PURE__*/React__default["default"].createElement(TransactionSummary.TransactionSummary, {
    info: transaction.info
  }) : pendingText), chainId && hash ? /*#__PURE__*/React__default["default"].createElement(index$3.ExternalLink, {
    href: getExplorerLink.getExplorerLink(chainId, hash, getExplorerLink.ExplorerDataType.TRANSACTION)
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, {
    color: theme.accent1
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "Sjplg3",
    message: "View on Explorer"
  }))) : /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      height: "17px"
    }
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, {
    color: theme.neutral3,
    marginTop: "20px"
  }, !secondsToConfirm ? /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      height: "24px"
    }
  }) : /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "W1RH6d",
    message: "Transaction completed in"
  }), /*#__PURE__*/React__default["default"].createElement("span", {
    style: {
      fontWeight: 535,
      marginLeft: "4px",
      color: theme.neutral1
    }
  }, secondsToConfirm, " seconds \uD83C\uDF89"))), /*#__PURE__*/React__default["default"].createElement(index$6.ButtonPrimary, {
    onClick: onDismiss,
    style: {
      margin: "4px 0 0 0"
    }
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderLarge, null, inline ? /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "vUOn9d",
    message: "Return"
  }) : /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "yz7wBu",
    message: "Close"
  }))))));
}
function TransactionConfirmationModal(_ref8) {
  var isOpen = _ref8.isOpen,
    onDismiss = _ref8.onDismiss,
    attemptingTxn = _ref8.attemptingTxn,
    hash = _ref8.hash,
    pendingText = _ref8.pendingText,
    reviewContent = _ref8.reviewContent,
    currencyToAdd = _ref8.currencyToAdd;
  var _useWeb3React2 = core.useWeb3React(),
    chainId = _useWeb3React2.chainId;
  if (!chainId) return null;

  // confirmation screen
  return /*#__PURE__*/React__default["default"].createElement(index$1["default"], {
    isOpen: isOpen,
    $scrollOverlay: true,
    onDismiss: onDismiss,
    maxHeight: 90
  }, chains.isL2ChainId(chainId) && (hash || attemptingTxn) ? /*#__PURE__*/React__default["default"].createElement(L2Content, {
    chainId: chainId,
    hash: hash,
    onDismiss: onDismiss,
    pendingText: pendingText
  }) : attemptingTxn ? /*#__PURE__*/React__default["default"].createElement(ConfirmationPendingContent, {
    onDismiss: onDismiss,
    pendingText: pendingText
  }) : hash ? /*#__PURE__*/React__default["default"].createElement(TransactionSubmittedContent, {
    chainId: chainId,
    hash: hash,
    onDismiss: onDismiss,
    currencyToAdd: currencyToAdd
  }) : reviewContent());
}

exports.ConfirmationModalContent = ConfirmationModalContent;
exports["default"] = TransactionConfirmationModal;
