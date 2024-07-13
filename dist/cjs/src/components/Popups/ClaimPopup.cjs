'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var core = require('@web3-react/core');
var reactFeather = require('react-feather');
var styled$1 = require('styled-components');
require('../../theme/components/index.cjs');
var tokenLogo = require('../../assets/images/token-logo.cjs');
var hooks = require('../../state/application/hooks.cjs');
var reducer = require('../../state/application/reducer.cjs');
var hooks$1 = require('../../state/claim/hooks.cjs');
var index$2 = require('../Button/index.cjs');
var index = require('../Column/index.cjs');
var styled = require('../earn/styled.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled$1);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var StyledClaimPopup = styled__default["default"](index.AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  background: radial-gradient(\n    76.02% 75.41% at 1.84% 0%,\n    #ff007a 0%,\n    #021d43 100%\n  );\n  border-radius: 20px;\n  padding: 1.5rem;\n  overflow: hidden;\n  position: relative;\n  max-width: 360px;\n  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);\n"])));
var StyledClose = styled__default["default"](reactFeather.X)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  right: 10px;\n  top: 10px;\n\n  :hover {\n    cursor: pointer;\n  }\n"])));
var rotate = styled$1.keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  0% {\n    transform: perspective(1000px) rotateY(0deg);\n  }\n\n  100% {\n    transform: perspective(1000px) rotateY(360deg);\n  }\n"])));
var UniToken = styled__default["default"].img(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  animation: ", " 5s cubic-bezier(0.83, 0, 0.17, 1) infinite;\n"])), rotate);
function ClaimPopup() {
  var _groupSeparator;
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;

  // dont store these in persisted state yet
  var showClaimPopup = hooks.useShowClaimPopup();
  var toggleShowClaimPopup = hooks.useToggleShowClaimPopup();

  // toggle for showing this modal
  var showClaimModal = hooks.useModalIsOpen(reducer.ApplicationModal.SELF_CLAIM);
  var toggleSelfClaimModal = hooks.useToggleSelfClaimModal();
  var handleToggleSelfClaimModal = React.useCallback(function () {
    toggleSelfClaimModal();
  }, [toggleSelfClaimModal]);

  // const userHasAvailableclaim = useUserHasAvailableClaim()
  var userHasAvailableclaim = hooks$1.useUserHasAvailableClaim(account);
  var unclaimedAmount = hooks$1.useUserUnclaimedAmount(account);

  // listen for available claim and show popup if needed
  React.useEffect(function () {
    if (userHasAvailableclaim) {
      toggleShowClaimPopup();
    }
    // the toggleShowClaimPopup function changes every time the popup changes, so this will cause an infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userHasAvailableclaim]);
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, showClaimPopup && !showClaimModal && /*#__PURE__*/React__default["default"].createElement(StyledClaimPopup, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(styled.CardBGImage, null), /*#__PURE__*/React__default["default"].createElement(styled.CardNoise, null), /*#__PURE__*/React__default["default"].createElement(StyledClose, {
    stroke: "white",
    onClick: toggleShowClaimPopup
  }), /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    style: {
      padding: "2rem 0",
      zIndex: 10
    },
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(UniToken, {
    width: "48px",
    src: tokenLogo
  }), " ", /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedWhite, {
    style: {
      marginTop: "1rem"
    },
    fontSize: 36,
    fontWeight: 535
  }, unclaimedAmount === null || unclaimedAmount === void 0 ? void 0 : unclaimedAmount.toFixed(0, (_groupSeparator = {
    groupSeparator: ","
  }) !== null && _groupSeparator !== void 0 ? _groupSeparator : "-"), " UNI"), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedWhite, {
    style: {
      paddingTop: "1.25rem",
      textAlign: "center"
    },
    fontWeight: 535,
    color: "white"
  }, /*#__PURE__*/React__default["default"].createElement("span", {
    role: "img",
    "aria-label": "party"
  }, "\uD83C\uDF89"), " ", /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "ayzlbD",
    message: "UNI has arrived"
  }), " ", /*#__PURE__*/React__default["default"].createElement("span", {
    role: "img",
    "aria-label": "party"
  }, "\uD83C\uDF89")), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedSubHeader, {
    style: {
      paddingTop: "0.5rem",
      textAlign: "center"
    },
    color: "white"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "sPI8ot",
    message: "Thanks for being part of the Uniswap community <0/>",
    components: {
      "0": /*#__PURE__*/React__default["default"].createElement(reactFeather.Heart, {
        size: 12
      })
    }
  }))), /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    style: {
      zIndex: 10
    },
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.ButtonPrimary, {
    padding: "8px",
    $borderRadius: "8px",
    width: "fit-content",
    onClick: handleToggleSelfClaimModal
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "Hn7ais",
    message: "Claim your UNI tokens"
  })))));
}

module.exports = ClaimPopup;
