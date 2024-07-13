'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index$1 = require('../Button/index.cjs');
var index = require('../Column/index.cjs');
var CurrencyLogo = require('../Logo/CurrencyLogo.cjs');
var TokenSafetyLabel = require('./TokenSafetyLabel.cjs');
var tokenSafety = require('../../constants/tokenSafety.cjs');
var Tokens = require('../../hooks/Tokens.cjs');
var reactFeather = require('react-feather');
var rebass = require('rebass');
var hooks = require('../../state/user/hooks.cjs');
var styled = require('styled-components');
var index$2 = require('../../theme/components/index.cjs');
var getExplorerLink = require('../../utils/getExplorerLink.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15;
var Wrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  position: relative;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n"])));
var Container = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  padding: 32px 40px;\n  display: flex;\n  flex-flow: column;\n  align-items: center;\n"])));
var LogoContainer = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  gap: 16px;\n"])));
var ShortColumn = styled__default["default"](index.AutoColumn)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  margin-top: 10px;\n"])));
var InfoText = styled__default["default"](rebass.Text)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  padding: 0 12px 0 12px;\n  font-size: 14px;\n  line-height: 20px;\n  text-align: center;\n"])));
var StyledButton = styled__default["default"](index$1.ButtonPrimary)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  margin-top: 24px;\n  width: 100%;\n  font-weight: 535;\n"])));
var StyledCancelButton = styled__default["default"](index$2.ButtonText)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  margin-top: 16px;\n  color: ", ";\n  font-weight: 535;\n  font-size: 14px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var StyledCloseButton = styled__default["default"](StyledButton)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  color: ", ";\n\n  &:hover {\n    background-color: ", ";\n    opacity: ", ";\n    transition: opacity 250ms ease;\n  }\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral1;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.surface3;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.opacity.hover;
});
var Buttons = function Buttons(_ref6) {
  var warning = _ref6.warning,
    onContinue = _ref6.onContinue,
    onCancel = _ref6.onCancel,
    onBlocked = _ref6.onBlocked,
    showCancel = _ref6.showCancel;
  return warning.canProceed ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(StyledButton, {
    onClick: onContinue
  }, !tokenSafety.displayWarningLabel(warning) ? /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "xGVfLh",
    message: "Continue"
  }) : /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "5ZRfjk",
    message: "I understand"
  })), showCancel && /*#__PURE__*/React__default["default"].createElement(StyledCancelButton, {
    onClick: onCancel
  }, "Cancel")) : /*#__PURE__*/React__default["default"].createElement(StyledCloseButton, {
    onClick: onBlocked !== null && onBlocked !== void 0 ? onBlocked : onCancel
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "yz7wBu",
    message: "Close"
  }));
};
var SafetyLabel = function SafetyLabel(_ref7) {
  var warning = _ref7.warning;
  return /*#__PURE__*/React__default["default"].createElement(TokenSafetyLabel, {
    level: warning.level,
    canProceed: warning.canProceed
  }, warning.message);
};

// TODO: Replace color with stylesheet color
var LinkColumn = styled__default["default"](index.AutoColumn)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  margin-top: 16px;\n  position: relative;\n"])));
var ExplorerContainer = styled__default["default"].div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  height: 32px;\n  margin-top: 10px;\n  font-size: 20px;\n  background-color: ", ";\n  color: ", ";\n  border-radius: 8px;\n  padding: 2px 12px;\n  display: flex;\n  align-items: center;\n  overflow: hidden;\n"])), function (_ref8) {
  var theme = _ref8.theme;
  return theme.accent2;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.accent1;
});
var ExplorerLinkWrapper = styled__default["default"].div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  overflow: hidden;\n  align-items: center;\n  cursor: pointer;\n\n  :hover {\n    opacity: ", ";\n  }\n  :active {\n    opacity: ", ";\n  }\n"])), function (_ref10) {
  var theme = _ref10.theme;
  return theme.opacity.hover;
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.opacity.click;
});
var ExplorerLink = styled__default["default"].div(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n  display: block;\n  font-size: 14px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n"])));
var ExplorerLinkIcon = styled__default["default"](reactFeather.ExternalLink)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral__default["default"](["\n  height: 16px;\n  width: 18px;\n  margin-left: 8px;\n"])));
var LinkIconWrapper = styled__default["default"].div(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral__default["default"](["\n  justify-content: center;\n  display: flex;\n"])));
function ExternalLinkIcon() {
  return /*#__PURE__*/React__default["default"].createElement(LinkIconWrapper, null, /*#__PURE__*/React__default["default"].createElement(ExplorerLinkIcon, null));
}
function ExplorerView(_ref12) {
  var token = _ref12.token;
  if (token) {
    var explorerLink = getExplorerLink.getExplorerLink(token === null || token === void 0 ? void 0 : token.chainId, token === null || token === void 0 ? void 0 : token.address, getExplorerLink.ExplorerDataType.TOKEN);
    return /*#__PURE__*/React__default["default"].createElement(ExplorerContainer, null, /*#__PURE__*/React__default["default"].createElement(ExplorerLinkWrapper, {
      onClick: function onClick() {
        return window.open(explorerLink, "_blank");
      }
    }, /*#__PURE__*/React__default["default"].createElement(ExplorerLink, null, explorerLink), /*#__PURE__*/React__default["default"].createElement(ExternalLinkIcon, null)), /*#__PURE__*/React__default["default"].createElement(index$2.CopyLinkIcon, {
      toCopy: explorerLink
    }));
  } else {
    return null;
  }
}
var StyledExternalLink = styled__default["default"](index$2.ExternalLink)(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  stroke: currentColor;\n  font-weight: 535;\n"])), function (_ref13) {
  var theme = _ref13.theme;
  return theme.accent1;
});
function TokenSafety(_ref14) {
  var tokenAddress = _ref14.tokenAddress,
    secondTokenAddress = _ref14.secondTokenAddress,
    onContinue = _ref14.onContinue,
    onCancel = _ref14.onCancel,
    onBlocked = _ref14.onBlocked,
    showCancel = _ref14.showCancel;
  var logos = [];
  var urls = [];
  var token1Warning = tokenAddress ? tokenSafety.checkWarning(tokenAddress) : null;
  var token1 = Tokens.useToken(tokenAddress);
  var token2Warning = secondTokenAddress ? tokenSafety.checkWarning(secondTokenAddress) : null;
  var token2 = Tokens.useToken(secondTokenAddress);
  var token1Unsupported = !(token1Warning !== null && token1Warning !== void 0 && token1Warning.canProceed);
  var token2Unsupported = !(token2Warning !== null && token2Warning !== void 0 && token2Warning.canProceed);

  // Logic for only showing the 'unsupported' warning if one is supported and other isn't
  if (token1 && token1Warning && (token1Unsupported || !(token2Warning && token2Unsupported))) {
    logos.push( /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
      currency: token1,
      size: "48px"
    }));
    urls.push( /*#__PURE__*/React__default["default"].createElement(ExplorerView, {
      token: token1
    }));
  }
  if (token2 && token2Warning && (token2Unsupported || !(token1Warning && token1Unsupported))) {
    logos.push( /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
      currency: token2,
      size: "48px"
    }));
    urls.push( /*#__PURE__*/React__default["default"].createElement(ExplorerView, {
      token: token2
    }));
  }
  var plural = logos.length > 1;
  // Show higher level warning if two are present
  var displayWarning = token1Warning;
  if (!token1Warning || token2Warning && token2Unsupported && !token1Unsupported) {
    displayWarning = token2Warning;
  }

  // If a warning is acknowledged, import these tokens
  var addToken = hooks.useAddUserToken();
  var acknowledge = function acknowledge() {
    if (token1) {
      addToken(token1);
    }
    if (token2) {
      addToken(token2);
    }
    onContinue();
  };
  var _getWarningCopy = tokenSafety.getWarningCopy(displayWarning, plural),
    heading = _getWarningCopy.heading,
    description = _getWarningCopy.description;
  var learnMoreUrl = /*#__PURE__*/React__default["default"].createElement(StyledExternalLink, {
    href: tokenSafety.TOKEN_SAFETY_ARTICLE
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "zwWKhA",
    message: "Learn more"
  }));
  return displayWarning ? /*#__PURE__*/React__default["default"].createElement(Wrapper, {
    "data-testid": "TokenSafetyWrapper"
  }, /*#__PURE__*/React__default["default"].createElement(Container, null, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, null, /*#__PURE__*/React__default["default"].createElement(LogoContainer, null, logos)), tokenSafety.displayWarningLabel(displayWarning) && /*#__PURE__*/React__default["default"].createElement(ShortColumn, null, /*#__PURE__*/React__default["default"].createElement(SafetyLabel, {
    warning: displayWarning
  })), /*#__PURE__*/React__default["default"].createElement(ShortColumn, null, /*#__PURE__*/React__default["default"].createElement(InfoText, null, heading, " ", description, " ", learnMoreUrl)), /*#__PURE__*/React__default["default"].createElement(LinkColumn, null, urls), /*#__PURE__*/React__default["default"].createElement(Buttons, {
    warning: displayWarning,
    onContinue: acknowledge,
    onCancel: onCancel,
    onBlocked: onBlocked,
    showCancel: showCancel
  }))) : /*#__PURE__*/React__default["default"].createElement(Wrapper, null, /*#__PURE__*/React__default["default"].createElement(Container, null, /*#__PURE__*/React__default["default"].createElement(ShortColumn, null, /*#__PURE__*/React__default["default"].createElement(SafetyLabel, {
    warning: tokenSafety.NotFoundWarning
  })), /*#__PURE__*/React__default["default"].createElement(ShortColumn, null, /*#__PURE__*/React__default["default"].createElement(InfoText, null, heading, " ", description, " ", learnMoreUrl)), /*#__PURE__*/React__default["default"].createElement(Buttons, {
    warning: tokenSafety.NotFoundWarning,
    onCancel: onCancel,
    showCancel: true
  })));
}

module.exports = TokenSafety;
