import React__default, { useCallback, useEffect } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { useWeb3React } from '@web3-react/core';
import { Heart, X } from 'react-feather';
import styled, { keyframes } from 'styled-components';
import '../../theme/components/index.js';
import tokenLogo from '../../assets/images/token-logo.png.js';
import { useShowClaimPopup, useToggleShowClaimPopup, useModalIsOpen, useToggleSelfClaimModal } from '../../state/application/hooks.js';
import { ApplicationModal } from '../../state/application/reducer.js';
import { useUserHasAvailableClaim, useUserUnclaimedAmount } from '../../state/claim/hooks.js';
import { ButtonPrimary } from '../Button/index.js';
import { AutoColumn } from '../Column/index.js';
import { CardBGImage, CardNoise } from '../earn/styled.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var StyledClaimPopup = styled(AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background: radial-gradient(\n    76.02% 75.41% at 1.84% 0%,\n    #ff007a 0%,\n    #021d43 100%\n  );\n  border-radius: 20px;\n  padding: 1.5rem;\n  overflow: hidden;\n  position: relative;\n  max-width: 360px;\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n"])));
var StyledClose = styled(X)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  position: absolute;\n  right: 10px;\n  top: 10px;\n\n  :hover {\n    cursor: pointer;\n  }\n"])));
var rotate = keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  0% {\n    transform: perspective(1000px) rotateY(0deg);\n  }\n\n  100% {\n    transform: perspective(1000px) rotateY(360deg);\n  }\n"])));
var UniToken = styled.img(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  animation: ", " 5s cubic-bezier(0.83, 0, 0.17, 1) infinite;\n"])), rotate);
function ClaimPopup() {
  var _groupSeparator;
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;

  // dont store these in persisted state yet
  var showClaimPopup = useShowClaimPopup();
  var toggleShowClaimPopup = useToggleShowClaimPopup();

  // toggle for showing this modal
  var showClaimModal = useModalIsOpen(ApplicationModal.SELF_CLAIM);
  var toggleSelfClaimModal = useToggleSelfClaimModal();
  var handleToggleSelfClaimModal = useCallback(function () {
    toggleSelfClaimModal();
  }, [toggleSelfClaimModal]);

  // const userHasAvailableclaim = useUserHasAvailableClaim()
  var userHasAvailableclaim = useUserHasAvailableClaim(account);
  var unclaimedAmount = useUserUnclaimedAmount(account);

  // listen for available claim and show popup if needed
  useEffect(function () {
    if (userHasAvailableclaim) {
      toggleShowClaimPopup();
    }
    // the toggleShowClaimPopup function changes every time the popup changes, so this will cause an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHasAvailableclaim]);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, showClaimPopup && !showClaimModal && /*#__PURE__*/React__default.createElement(StyledClaimPopup, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(CardBGImage, null), /*#__PURE__*/React__default.createElement(CardNoise, null), /*#__PURE__*/React__default.createElement(StyledClose, {
    stroke: "white",
    onClick: toggleShowClaimPopup
  }), /*#__PURE__*/React__default.createElement(AutoColumn, {
    style: {
      padding: "2rem 0",
      zIndex: 10
    },
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(UniToken, {
    width: "48px",
    src: tokenLogo
  }), " ", /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedWhite, {
    style: {
      marginTop: "1rem"
    },
    fontSize: 36,
    fontWeight: 535
  }, unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_groupSeparator = {
    groupSeparator: ","
  }) !== null && _groupSeparator !== void 0 ? _groupSeparator : "-"), " UNI"), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedWhite, {
    style: {
      paddingTop: "1.25rem",
      textAlign: "center"
    },
    fontWeight: 535,
    color: "white"
  }, /*#__PURE__*/React__default.createElement("span", {
    role: "img",
    "aria-label": "party"
  }, "\uD83C\uDF89"), " ", /*#__PURE__*/React__default.createElement(Trans, {
    id: "ayzlbD",
    message: "UNI has arrived"
  }), " ", /*#__PURE__*/React__default.createElement("span", {
    role: "img",
    "aria-label": "party"
  }, "\uD83C\uDF89")), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedSubHeader, {
    style: {
      paddingTop: "0.5rem",
      textAlign: "center"
    },
    color: "white"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "sPI8ot",
    message: "Thanks for being part of the Uniswap community <0/>",
    components: {
      "0": /*#__PURE__*/React__default.createElement(Heart, {
        size: 12
      })
    }
  }))), /*#__PURE__*/React__default.createElement(AutoColumn, {
    style: {
      zIndex: 10
    },
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(ButtonPrimary, {
    padding: "8px",
    $borderRadius: "8px",
    width: "fit-content",
    onClick: handleToggleSelfClaimModal
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "Hn7ais",
    message: "Claim your UNI tokens"
  })))));
}

export { ClaimPopup as default };
