import React__default, { useState } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { isAddress } from '@ethersproject/address';
import { useWeb3React } from '@web3-react/core';
import { Text } from 'rebass';
import styled from 'styled-components';
import { CloseIcon, CustomLightSpinner, UniTokenAnimated, ExternalLink } from '../../theme/components/index.js';
import { shortenAddress } from '../../utils/addresses.js';
import '@ethersproject/constants';
import '@ethersproject/contracts';
import Circle from '../../assets/images/blue-loader.svg.js';
import tokenLogo from '../../assets/images/token-logo.png.js';
import useENS from '../../hooks/useENS.js';
import { useClaimCallback, useUserUnclaimedAmount, useUserHasAvailableClaim } from '../../state/claim/hooks.js';
import { useIsTransactionPending } from '../../state/transactions/hooks.js';
import { getExplorerLink, ExplorerDataType } from '../../utils/getExplorerLink.js';
import AddressInputPanel from '../AddressInputPanel/index.js';
import { ButtonPrimary } from '../Button/index.js';
import { AutoColumn, ColumnCenter } from '../Column/index.js';
import { CardBGImage, CardNoise, CardSection, Break, CardBGImageSmaller, DataCard } from '../earn/styled.js';
import Modal from '../Modal/index.js';
import { RowBetween } from '../Row/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var ContentWrapper = styled(AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n"])));
var ModalUpper = styled(DataCard)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n  background: radial-gradient(\n    76.02% 75.41% at 1.84% 0%,\n    #ff007a 0%,\n    #021d43 100%\n  );\n"])));
var ConfirmOrLoadingWrapper = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  width: 100%;\n  padding: 24px;\n  position: relative;\n  background: ", ";\n"])), function (_ref) {
  var activeBG = _ref.activeBG;
  return activeBG && "radial-gradient(76.02% 75.41% at 1.84% 0%, rgba(255, 0, 122, 0.2) 0%, rgba(33, 114, 229, 0.2) 100%), #FFFFFF;";
});
var ConfirmedIcon = styled(ColumnCenter)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  padding: 60px 0;\n"])));
function AddressClaimModal(_ref2) {
  var _groupSeparator, _groupSeparator2;
  var isOpen = _ref2.isOpen,
    onDismiss = _ref2.onDismiss;
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;

  // state for smart contract input
  var _useState = useState(""),
    _useState2 = _slicedToArray(_useState, 2),
    typed = _useState2[0],
    setTyped = _useState2[1];
  function handleRecipientType(val) {
    setTyped(val);
  }

  // monitor for third party recipient of claim
  var _useENS = useENS(typed),
    parsedAddress = _useENS.address;

  // used for UI loading states
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    attempting = _useState4[0],
    setAttempting = _useState4[1];

  // monitor the status of the claim from contracts and txns
  var _useClaimCallback = useClaimCallback(parsedAddress),
    claimCallback = _useClaimCallback.claimCallback;
  var unclaimedAmount = useUserUnclaimedAmount(parsedAddress);

  // check if the user has something available
  var hasAvailableClaim = useUserHasAvailableClaim(parsedAddress);
  var _useState5 = useState(),
    _useState6 = _slicedToArray(_useState5, 2),
    hash = _useState6[0],
    setHash = _useState6[1];

  // monitor the status of the claim from contracts and txns
  var claimPending = useIsTransactionPending(hash !== null && hash !== void 0 ? hash : "");
  var claimConfirmed = hash && !claimPending;

  // use the hash to monitor this txn

  function onClaim() {
    setAttempting(true);
    claimCallback().then(function (hash) {
      setHash(hash);
    })
    // reset modal and log error
    ["catch"](function (error) {
      setAttempting(false);
      console.log(error);
    });
  }
  function wrappedOnDismiss() {
    setAttempting(false);
    setHash(undefined);
    setTyped("");
    onDismiss();
  }
  return /*#__PURE__*/React__default.createElement(Modal, {
    isOpen: isOpen,
    onDismiss: wrappedOnDismiss,
    maxHeight: 90
  }, !attempting && /*#__PURE__*/React__default.createElement(ContentWrapper, {
    gap: "lg"
  }, /*#__PURE__*/React__default.createElement(ModalUpper, null, /*#__PURE__*/React__default.createElement(CardBGImage, null), /*#__PURE__*/React__default.createElement(CardNoise, null), /*#__PURE__*/React__default.createElement(CardSection, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedWhite, {
    fontWeight: 535
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "OT2U3c",
    message: "Claim UNI token"
  })), /*#__PURE__*/React__default.createElement(CloseIcon, {
    onClick: wrappedOnDismiss,
    style: {
      zIndex: 99
    },
    stroke: "white"
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedWhite, {
    fontWeight: 535,
    fontSize: 36
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "191ekK",
    message: "{0} UNI",
    values: {
      "0": unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_groupSeparator = {
        groupSeparator: ","
      }) !== null && _groupSeparator !== void 0 ? _groupSeparator : "-")
    }
  }))), /*#__PURE__*/React__default.createElement(Break, null)), /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md",
    style: {
      padding: "1rem",
      paddingTop: "0"
    },
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedSubHeader, {
    fontWeight: 535
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "8Utjse",
    message: "Enter an address to trigger a UNI claim. If the address has any claimable UNI it will be sent to them on submission."
  })), /*#__PURE__*/React__default.createElement(AddressInputPanel, {
    value: typed,
    onChange: handleRecipientType
  }), parsedAddress && !hasAvailableClaim && /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedError, {
    error: true
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "YRWR01",
    message: "Address has no available claim"
  })), /*#__PURE__*/React__default.createElement(ButtonPrimary, {
    disabled: !isAddress(parsedAddress !== null && parsedAddress !== void 0 ? parsedAddress : "") || !hasAvailableClaim,
    padding: "16px 16px",
    width: "100%",
    $borderRadius: "12px",
    mt: "1rem",
    onClick: onClaim
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Vv5NYl",
    message: "Claim UNI"
  })))), (attempting || claimConfirmed) && /*#__PURE__*/React__default.createElement(ConfirmOrLoadingWrapper, {
    activeBG: true
  }, /*#__PURE__*/React__default.createElement(CardNoise, null), /*#__PURE__*/React__default.createElement(CardBGImageSmaller, {
    desaturate: true
  }), /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement("div", null), /*#__PURE__*/React__default.createElement(CloseIcon, {
    onClick: wrappedOnDismiss,
    style: {
      zIndex: 99
    },
    stroke: "black"
  })), /*#__PURE__*/React__default.createElement(ConfirmedIcon, null, !claimConfirmed ? /*#__PURE__*/React__default.createElement(CustomLightSpinner, {
    src: Circle,
    alt: "loader",
    size: "90px"
  }) : /*#__PURE__*/React__default.createElement(UniTokenAnimated, {
    width: "72px",
    src: tokenLogo,
    alt: "UNI logo"
  })), /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "100px",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLargeHeader, {
    fontWeight: 535,
    color: "black"
  }, claimConfirmed ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "hRWvpI",
    message: "Claimed"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "KvG1xW",
    message: "Claiming"
  })), !claimConfirmed && /*#__PURE__*/React__default.createElement(Text, {
    fontSize: 36,
    color: "#ff007a",
    fontWeight: 535
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "191ekK",
    message: "{0} UNI",
    values: {
      "0": unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_groupSeparator2 = {
        groupSeparator: ","
      }) !== null && _groupSeparator2 !== void 0 ? _groupSeparator2 : "-")
    }
  })), parsedAddress && /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLargeHeader, {
    fontWeight: 535,
    color: "black"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "PqfYW9",
    message: "for {0}",
    values: {
      "0": shortenAddress(parsedAddress)
    }
  }))), claimConfirmed && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedSubHeader, {
    fontWeight: 535,
    color: "black"
  }, /*#__PURE__*/React__default.createElement("span", {
    role: "img",
    "aria-label": "party-hat"
  }, "\uD83C\uDF89", " "), /*#__PURE__*/React__default.createElement(Trans, {
    id: "zArj19",
    message: "Welcome to team Unicorn :)"
  }), /*#__PURE__*/React__default.createElement("span", {
    role: "img",
    "aria-label": "party-hat"
  }, "\uD83C\uDF89"))), attempting && !hash && /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedSubHeader, {
    color: "black"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "oG26Rt",
    message: "Confirm this transaction in your wallet"
  })), attempting && hash && !claimConfirmed && chainId && hash && /*#__PURE__*/React__default.createElement(ExternalLink, {
    href: getExplorerLink(chainId, hash, ExplorerDataType.TRANSACTION),
    style: {
      zIndex: 99
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "yVxaEc",
    message: "View transaction on Explorer"
  })))));
}

export { AddressClaimModal as default };
