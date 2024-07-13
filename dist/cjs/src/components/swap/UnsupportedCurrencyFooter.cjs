'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$5 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var core = require('@web3-react/core');
var index = require('../Button/index.cjs');
var index$2 = require('../Card/index.cjs');
var index$3 = require('../Column/index.cjs');
var CurrencyLogo = require('../Logo/CurrencyLogo.cjs');
var index$1 = require('../Modal/index.cjs');
var index$4 = require('../Row/index.cjs');
var styled = require('styled-components');
var index$6 = require('../../theme/components/index.cjs');
var zIndex = require('../../theme/zIndex.cjs');
var Tokens = require('../../hooks/Tokens.cjs');
var getExplorerLink = require('../../utils/getExplorerLink.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var DetailsFooter = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  padding-top: calc(16px + 2rem);\n  padding-bottom: 20px;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: -2rem;\n  width: 100%;\n  max-width: 400px;\n  border-bottom-left-radius: 20px;\n  border-bottom-right-radius: 20px;\n  color: ", ";\n  background-color: ", ";\n  z-index: ", ";\n\n  transform: ", ";\n  transition: transform 300ms ease-in-out;\n  text-align: center;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface2;
}, zIndex.Z_INDEX.deprecated_zero, function (_ref3) {
  var show = _ref3.show;
  return show ? "translateY(0%)" : "translateY(-100%)";
});
var StyledButtonEmpty = styled__default["default"](index.ButtonEmpty)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  text-decoration: none;\n"])));
var AddressText = styled__default["default"](text.ThemedText.DeprecatedBlue)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  font-size: 12px;\n\n  ", "\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n    font-size: 10px;\n"])));
});
function UnsupportedCurrencyFooter(_ref5) {
  var show = _ref5.show,
    currencies = _ref5.currencies;
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    showDetails = _useState2[0],
    setShowDetails = _useState2[1];
  var tokens = chainId && currencies ? currencies.map(function (currency) {
    return currency === null || currency === void 0 ? void 0 : currency.wrapped;
  }) : [];
  var unsupportedTokens = Tokens.useUnsupportedTokens();
  return /*#__PURE__*/React__default["default"].createElement(DetailsFooter, {
    show: show
  }, /*#__PURE__*/React__default["default"].createElement(index$1["default"], {
    isOpen: showDetails,
    onDismiss: function onDismiss() {
      return setShowDetails(false);
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$2["default"], {
    padding: "2rem"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.AutoColumn, {
    gap: "lg"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMediumHeader, null, /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
    id: "7Osz32",
    message: "Unsupported assets"
  })), /*#__PURE__*/React__default["default"].createElement(index$6.CloseIcon, {
    onClick: function onClick() {
      return setShowDetails(false);
    },
    "data-testid": "close-icon"
  })), tokens.map(function (token) {
    var _token$address;
    return token && unsupportedTokens && Object.keys(unsupportedTokens).includes(token.address) && /*#__PURE__*/React__default["default"].createElement(index$2.OutlineCard, {
      key: (_token$address = token.address) === null || _token$address === void 0 ? void 0 : _token$address.concat("not-supported"),
      "data-testid": "unsupported-token-card"
    }, /*#__PURE__*/React__default["default"].createElement(index$3.AutoColumn, {
      gap: "10px"
    }, /*#__PURE__*/React__default["default"].createElement(index$4.AutoRow, {
      gap: "5px",
      align: "center"
    }, /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
      currency: token,
      size: "24px"
    }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedBody, {
      fontWeight: 535
    }, token.symbol)), chainId && /*#__PURE__*/React__default["default"].createElement(index$6.ExternalLink, {
      href: getExplorerLink.getExplorerLink(chainId, token.address, getExplorerLink.ExplorerDataType.ADDRESS)
    }, /*#__PURE__*/React__default["default"].createElement(AddressText, null, token.address))));
  }), /*#__PURE__*/React__default["default"].createElement(index$3.AutoColumn, {
    gap: "lg"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedBody, {
    fontWeight: 535
  }, /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
    id: "l7X7DE",
    message: "Some assets are not available through this interface because they may not work well with the smart contracts or we are unable to allow trading for legal reasons."
  })))))), /*#__PURE__*/React__default["default"].createElement(StyledButtonEmpty, {
    padding: "0",
    onClick: function onClick() {
      return setShowDetails(true);
    },
    "data-testid": "read-more-button"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedBlue, null, /*#__PURE__*/React__default["default"].createElement(index$5.Trans, {
    id: "bIjYSY",
    message: "Read more about unsupported assets"
  }))));
}

module.exports = UnsupportedCurrencyFooter;
