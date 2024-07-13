import React__default, { useState, useCallback } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { i18n } from '../../../node_modules/@lingui/core/dist/index.mjs.js';
import { ChainId } from '@uniswap/sdk-core';
import { useWeb3React } from '@web3-react/core';
import Badge from '../Badge/index.js';
import { getChainInfo } from '../../constants/chainInfo.js';
import useCurrencyLogoURIs from '../../lib/hooks/useCurrencyLogoURIs.js';
import { ArrowUpCircle, CheckCircle, AlertCircle } from 'react-feather';
import { useTransaction, useIsTransactionConfirmed } from '../../state/transactions/hooks.js';
import styled, { useTheme } from 'styled-components';
import { CloseIcon, CustomLightSpinner, ExternalLink } from '../../theme/components/index.js';
import { isL2ChainId } from '../../utils/chains.js';
import { getExplorerLink, ExplorerDataType } from '../../utils/getExplorerLink.js';
import Circle from '../../assets/images/blue-loader.svg.js';
import { TransactionSummary } from '../AccountDetails/TransactionSummary.js';
import { ButtonLight, ButtonPrimary } from '../Button/index.js';
import { AutoColumn, ColumnCenter } from '../Column/index.js';
import Modal from '../Modal/index.js';
import Row, { RowBetween, RowFixed } from '../Row/index.js';
import AnimatedConfirmation from './AnimatedConfirmation.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var Wrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 20px;\n  outline: 1px solid ", ";\n  width: 100%;\n  padding: 16px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
});
var BottomSection = styled(AutoColumn)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  border-bottom-left-radius: 20px;\n  border-bottom-right-radius: 20px;\n"])));
var ConfirmedIcon = styled(ColumnCenter)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  padding: ", ";\n"])), function (_ref3) {
  var inline = _ref3.inline;
  return inline ? "20px 0" : "32px 0;";
});
var StyledLogo = styled.img(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  height: 16px;\n  width: 16px;\n  margin-left: 6px;\n"])));
var ConfirmationModalContentWrapper = styled(AutoColumn)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  padding-bottom: 12px;\n"])));
function ConfirmationPendingContent(_ref4) {
  var onDismiss = _ref4.onDismiss,
    pendingText = _ref4.pendingText,
    inline = _ref4.inline;
  return /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md"
  }, !inline && /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement("div", null), /*#__PURE__*/React__default.createElement(CloseIcon, {
    onClick: onDismiss
  })), /*#__PURE__*/React__default.createElement(ConfirmedIcon, {
    inline: inline
  }, /*#__PURE__*/React__default.createElement(CustomLightSpinner, {
    src: Circle,
    alt: "loader",
    size: inline ? "40px" : "90px"
  })), /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderLarge, {
    color: "neutral1",
    textAlign: "center"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "v/dhKi",
    message: "Waiting for confirmation"
  })), /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, {
    color: "neutral1",
    textAlign: "center"
  }, pendingText), /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, {
    color: "neutral2",
    textAlign: "center",
    marginBottom: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
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
  var theme = useTheme();
  var _useWeb3React = useWeb3React(),
    connector = _useWeb3React.connector;
  var token = currencyToAdd === null || currencyToAdd === void 0 ? void 0 : currencyToAdd.wrapped;
  var logoURL = useCurrencyLogoURIs(token)[0];
  var _useState = useState(),
    _useState2 = _slicedToArray(_useState, 2),
    success = _useState2[0],
    setSuccess = _useState2[1];
  var addToken = useCallback(function () {
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
  var explorerText = chainId === ChainId.MAINNET ? i18n._(
  /*i18n*/
  {
    id: "J6fH9n",
    message: "View on  Etherscan"
  }) : i18n._(
  /*i18n*/
  {
    id: "O4DSKu",
    message: "View on Block Explorer"
  });
  return /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement(AutoColumn, null, !inline && /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement("div", null), /*#__PURE__*/React__default.createElement(CloseIcon, {
    onClick: onDismiss
  })), /*#__PURE__*/React__default.createElement(ConfirmedIcon, {
    inline: inline
  }, /*#__PURE__*/React__default.createElement(ArrowUpCircle, {
    strokeWidth: 1,
    size: inline ? "40px" : "75px",
    color: theme.accent1
  })), /*#__PURE__*/React__default.createElement(ConfirmationModalContentWrapper, {
    gap: "md",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(ThemedText.MediumHeader, {
    textAlign: "center"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "ExzCxg",
    message: "Transaction submitted"
  })), currencyToAdd && connector.watchAsset && /*#__PURE__*/React__default.createElement(ButtonLight, {
    mt: "12px",
    padding: "6px 12px",
    width: "fit-content",
    onClick: addToken
  }, !success ? /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "3nLdaX",
    message: "Add {0}",
    values: {
      "0": currencyToAdd.symbol
    }
  })) : /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "e5wMU/",
    message: "Added {0}",
    values: {
      "0": currencyToAdd.symbol
    }
  }), /*#__PURE__*/React__default.createElement(CheckCircle, {
    size: "16px",
    stroke: theme.success,
    style: {
      marginLeft: "6px"
    }
  }))), /*#__PURE__*/React__default.createElement(ButtonPrimary, {
    onClick: onDismiss,
    style: {
      margin: "20px 0 0 0"
    },
    "data-testid": "dismiss-tx-confirmation"
  }, /*#__PURE__*/React__default.createElement(ThemedText.HeadlineSmall, {
    color: theme.deprecated_accentTextLightPrimary
  }, inline ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "vUOn9d",
    message: "Return"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "yz7wBu",
    message: "Close"
  }))), chainId && hash && /*#__PURE__*/React__default.createElement(ExternalLink, {
    href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)
  }, /*#__PURE__*/React__default.createElement(ThemedText.Link, {
    color: theme.accent1
  }, explorerText)))));
}
function ConfirmationModalContent(_ref6) {
  var title = _ref6.title,
    bottomContent = _ref6.bottomContent,
    onDismiss = _ref6.onDismiss,
    topContent = _ref6.topContent,
    headerContent = _ref6.headerContent;
  return /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "sm"
  }, /*#__PURE__*/React__default.createElement(Row, null, headerContent === null || headerContent === void 0 ? void 0 : headerContent(), /*#__PURE__*/React__default.createElement(Row, {
    justify: "center",
    marginLeft: "24px"
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, title)), /*#__PURE__*/React__default.createElement(CloseIcon, {
    onClick: onDismiss,
    "data-testid": "confirmation-close-icon"
  })), topContent()), bottomContent && /*#__PURE__*/React__default.createElement(BottomSection, {
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
  var theme = useTheme();
  var transaction = useTransaction(hash);
  var confirmed = useIsTransactionConfirmed(hash);
  var transactionSuccess = (transaction === null || transaction === void 0 || (_transaction$receipt = transaction.receipt) === null || _transaction$receipt === void 0 ? void 0 : _transaction$receipt.status) === 1;

  // convert unix time difference to seconds
  var secondsToConfirm = transaction !== null && transaction !== void 0 && transaction.confirmedTime ? (transaction.confirmedTime - transaction.addedTime) / 1000 : undefined;
  var info = getChainInfo(chainId);
  return /*#__PURE__*/React__default.createElement(Wrapper, null, /*#__PURE__*/React__default.createElement(AutoColumn, null, !inline && /*#__PURE__*/React__default.createElement(RowBetween, {
    mb: "16px"
  }, /*#__PURE__*/React__default.createElement(Badge, null, /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(StyledLogo, {
    src: info.logoUrl,
    style: {
      margin: "0 8px 0 0"
    }
  }), info.label)), /*#__PURE__*/React__default.createElement(CloseIcon, {
    onClick: onDismiss
  })), /*#__PURE__*/React__default.createElement(ConfirmedIcon, {
    inline: inline
  }, confirmed ? transactionSuccess ?
  /*#__PURE__*/
  // <CheckCircle strokeWidth={1} size={inline ? '40px' : '90px'} color={theme.success} />
  React__default.createElement(AnimatedConfirmation, null) : /*#__PURE__*/React__default.createElement(AlertCircle, {
    strokeWidth: 1,
    size: inline ? "40px" : "90px",
    color: theme.critical
  }) : /*#__PURE__*/React__default.createElement(CustomLightSpinner, {
    src: Circle,
    alt: "loader",
    size: inline ? "40px" : "90px"
  })), /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderLarge, {
    textAlign: "center"
  }, !hash ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "fgo6o9",
    message: "Confirm transaction in wallet"
  }) : !confirmed ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "ExzCxg",
    message: "Transaction submitted"
  }) : transactionSuccess ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "zzDlyQ",
    message: "Success"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "SlfejT",
    message: "Error"
  })), /*#__PURE__*/React__default.createElement(ThemedText.BodySecondary, {
    textAlign: "center"
  }, transaction ? /*#__PURE__*/React__default.createElement(TransactionSummary, {
    info: transaction.info
  }) : pendingText), chainId && hash ? /*#__PURE__*/React__default.createElement(ExternalLink, {
    href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION)
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, {
    color: theme.accent1
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Sjplg3",
    message: "View on Explorer"
  }))) : /*#__PURE__*/React__default.createElement("div", {
    style: {
      height: "17px"
    }
  }), /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, {
    color: theme.neutral3,
    marginTop: "20px"
  }, !secondsToConfirm ? /*#__PURE__*/React__default.createElement("div", {
    style: {
      height: "24px"
    }
  }) : /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "W1RH6d",
    message: "Transaction completed in"
  }), /*#__PURE__*/React__default.createElement("span", {
    style: {
      fontWeight: 535,
      marginLeft: "4px",
      color: theme.neutral1
    }
  }, secondsToConfirm, " seconds \uD83C\uDF89"))), /*#__PURE__*/React__default.createElement(ButtonPrimary, {
    onClick: onDismiss,
    style: {
      margin: "4px 0 0 0"
    }
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderLarge, null, inline ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "vUOn9d",
    message: "Return"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
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
  var _useWeb3React2 = useWeb3React(),
    chainId = _useWeb3React2.chainId;
  if (!chainId) return null;

  // confirmation screen
  return /*#__PURE__*/React__default.createElement(Modal, {
    isOpen: isOpen,
    $scrollOverlay: true,
    onDismiss: onDismiss,
    maxHeight: 90
  }, isL2ChainId(chainId) && (hash || attemptingTxn) ? /*#__PURE__*/React__default.createElement(L2Content, {
    chainId: chainId,
    hash: hash,
    onDismiss: onDismiss,
    pendingText: pendingText
  }) : attemptingTxn ? /*#__PURE__*/React__default.createElement(ConfirmationPendingContent, {
    onDismiss: onDismiss,
    pendingText: pendingText
  }) : hash ? /*#__PURE__*/React__default.createElement(TransactionSubmittedContent, {
    chainId: chainId,
    hash: hash,
    onDismiss: onDismiss,
    currencyToAdd: currencyToAdd
  }) : reviewContent());
}

export { ConfirmationModalContent, TransactionConfirmationModal as default };
