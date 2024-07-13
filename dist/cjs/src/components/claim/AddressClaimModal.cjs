'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var address = require('@ethersproject/address');
var core = require('@web3-react/core');
var rebass = require('rebass');
var styled$1 = require('styled-components');
var index$3 = require('../../theme/components/index.cjs');
var addresses = require('../../utils/addresses.cjs');
require('@ethersproject/constants');
require('@ethersproject/contracts');
var blueLoader = require('../../assets/images/blue-loader.cjs');
var tokenLogo = require('../../assets/images/token-logo.cjs');
var useENS = require('../../hooks/useENS.cjs');
var hooks = require('../../state/claim/hooks.cjs');
var hooks$1 = require('../../state/transactions/hooks.cjs');
var getExplorerLink = require('../../utils/getExplorerLink.cjs');
var index$5 = require('../AddressInputPanel/index.cjs');
var index$6 = require('../Button/index.cjs');
var index$4 = require('../Column/index.cjs');
var styled = require('../earn/styled.cjs');
var index = require('../Modal/index.cjs');
var index$1 = require('../Row/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled$1);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var ContentWrapper = styled__default["default"](index$4.AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n"])));
var ModalUpper = styled__default["default"](styled.DataCard)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n  background: radial-gradient(\n    76.02% 75.41% at 1.84% 0%,\n    #ff007a 0%,\n    #021d43 100%\n  );\n"])));
var ConfirmOrLoadingWrapper = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  padding: 24px;\n  position: relative;\n  background: ", ";\n"])), function (_ref) {
  var activeBG = _ref.activeBG;
  return activeBG && "radial-gradient(76.02% 75.41% at 1.84% 0%, rgba(255, 0, 122, 0.2) 0%, rgba(33, 114, 229, 0.2) 100%), #FFFFFF;";
});
var ConfirmedIcon = styled__default["default"](index$4.ColumnCenter)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  padding: 60px 0;\n"])));
function AddressClaimModal(_ref2) {
  var _groupSeparator, _groupSeparator2;
  var isOpen = _ref2.isOpen,
    onDismiss = _ref2.onDismiss;
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;

  // state for smart contract input
  var _useState = React.useState(""),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    typed = _useState2[0],
    setTyped = _useState2[1];
  function handleRecipientType(val) {
    setTyped(val);
  }

  // monitor for third party recipient of claim
  var _useENS = useENS(typed),
    parsedAddress = _useENS.address;

  // used for UI loading states
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    attempting = _useState4[0],
    setAttempting = _useState4[1];

  // monitor the status of the claim from contracts and txns
  var _useClaimCallback = hooks.useClaimCallback(parsedAddress),
    claimCallback = _useClaimCallback.claimCallback;
  var unclaimedAmount = hooks.useUserUnclaimedAmount(parsedAddress);

  // check if the user has something available
  var hasAvailableClaim = hooks.useUserHasAvailableClaim(parsedAddress);
  var _useState5 = React.useState(),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    hash = _useState6[0],
    setHash = _useState6[1];

  // monitor the status of the claim from contracts and txns
  var claimPending = hooks$1.useIsTransactionPending(hash !== null && hash !== void 0 ? hash : "");
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
  return /*#__PURE__*/React__default["default"].createElement(index["default"], {
    isOpen: isOpen,
    onDismiss: wrappedOnDismiss,
    maxHeight: 90
  }, !attempting && /*#__PURE__*/React__default["default"].createElement(ContentWrapper, {
    gap: "lg"
  }, /*#__PURE__*/React__default["default"].createElement(ModalUpper, null, /*#__PURE__*/React__default["default"].createElement(styled.CardBGImage, null), /*#__PURE__*/React__default["default"].createElement(styled.CardNoise, null), /*#__PURE__*/React__default["default"].createElement(styled.CardSection, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedWhite, {
    fontWeight: 535
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "OT2U3c",
    message: "Claim UNI token"
  })), /*#__PURE__*/React__default["default"].createElement(index$3.CloseIcon, {
    onClick: wrappedOnDismiss,
    style: {
      zIndex: 99
    },
    stroke: "white"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedWhite, {
    fontWeight: 535,
    fontSize: 36
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "191ekK",
    message: "{0} UNI",
    values: {
      "0": unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_groupSeparator = {
        groupSeparator: ","
      }) !== null && _groupSeparator !== void 0 ? _groupSeparator : "-")
    }
  }))), /*#__PURE__*/React__default["default"].createElement(styled.Break, null)), /*#__PURE__*/React__default["default"].createElement(index$4.AutoColumn, {
    gap: "md",
    style: {
      padding: "1rem",
      paddingTop: "0"
    },
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedSubHeader, {
    fontWeight: 535
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "8Utjse",
    message: "Enter an address to trigger a UNI claim. If the address has any claimable UNI it will be sent to them on submission."
  })), /*#__PURE__*/React__default["default"].createElement(index$5, {
    value: typed,
    onChange: handleRecipientType
  }), parsedAddress && !hasAvailableClaim && /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedError, {
    error: true
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "YRWR01",
    message: "Address has no available claim"
  })), /*#__PURE__*/React__default["default"].createElement(index$6.ButtonPrimary, {
    disabled: !address.isAddress(parsedAddress !== null && parsedAddress !== void 0 ? parsedAddress : "") || !hasAvailableClaim,
    padding: "16px 16px",
    width: "100%",
    $borderRadius: "12px",
    mt: "1rem",
    onClick: onClaim
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "Vv5NYl",
    message: "Claim UNI"
  })))), (attempting || claimConfirmed) && /*#__PURE__*/React__default["default"].createElement(ConfirmOrLoadingWrapper, {
    activeBG: true
  }, /*#__PURE__*/React__default["default"].createElement(styled.CardNoise, null), /*#__PURE__*/React__default["default"].createElement(styled.CardBGImageSmaller, {
    desaturate: true
  }), /*#__PURE__*/React__default["default"].createElement(index$1.RowBetween, null, /*#__PURE__*/React__default["default"].createElement("div", null), /*#__PURE__*/React__default["default"].createElement(index$3.CloseIcon, {
    onClick: wrappedOnDismiss,
    style: {
      zIndex: 99
    },
    stroke: "black"
  })), /*#__PURE__*/React__default["default"].createElement(ConfirmedIcon, null, !claimConfirmed ? /*#__PURE__*/React__default["default"].createElement(index$3.CustomLightSpinner, {
    src: blueLoader,
    alt: "loader",
    size: "90px"
  }) : /*#__PURE__*/React__default["default"].createElement(index$3.UniTokenAnimated, {
    width: "72px",
    src: tokenLogo,
    alt: "UNI logo"
  })), /*#__PURE__*/React__default["default"].createElement(index$4.AutoColumn, {
    gap: "100px",
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.AutoColumn, {
    gap: "md",
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLargeHeader, {
    fontWeight: 535,
    color: "black"
  }, claimConfirmed ? /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "hRWvpI",
    message: "Claimed"
  }) : /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "KvG1xW",
    message: "Claiming"
  })), !claimConfirmed && /*#__PURE__*/React__default["default"].createElement(rebass.Text, {
    fontSize: 36,
    color: "#ff007a",
    fontWeight: 535
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "191ekK",
    message: "{0} UNI",
    values: {
      "0": unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_groupSeparator2 = {
        groupSeparator: ","
      }) !== null && _groupSeparator2 !== void 0 ? _groupSeparator2 : "-")
    }
  })), parsedAddress && /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLargeHeader, {
    fontWeight: 535,
    color: "black"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "PqfYW9",
    message: "for {0}",
    values: {
      "0": addresses.shortenAddress(parsedAddress)
    }
  }))), claimConfirmed && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedSubHeader, {
    fontWeight: 535,
    color: "black"
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    role: "img",
    "aria-label": "party-hat"
  }, "\uD83C\uDF89", " "), /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "zArj19",
    message: "Welcome to team Unicorn :)"
  }), /*#__PURE__*/React__default["default"].createElement("span", {
    role: "img",
    "aria-label": "party-hat"
  }, "\uD83C\uDF89"))), attempting && !hash && /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedSubHeader, {
    color: "black"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "oG26Rt",
    message: "Confirm this transaction in your wallet"
  })), attempting && hash && !claimConfirmed && chainId && hash && /*#__PURE__*/React__default["default"].createElement(index$3.ExternalLink, {
    href: getExplorerLink.getExplorerLink(chainId, hash, getExplorerLink.ExplorerDataType.TRANSACTION),
    style: {
      zIndex: 99
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "yVxaEc",
    message: "View transaction on Explorer"
  })))));
}

module.exports = AddressClaimModal;
