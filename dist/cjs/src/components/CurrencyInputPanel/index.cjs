'use strict';

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$4 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$5 = require('../../analytics/index.cjs');
var styled$1 = require('../Loader/styled.cjs');
var PrefetchBalancesWrapper = require('../PrefetchBalancesWrapper/PrefetchBalancesWrapper.cjs');
var chains = require('../../constants/chains.cjs');
var polished = require('polished');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var styles = require('../../theme/styles.cjs');
var formatCurrencyAmount = require('../../utils/formatCurrencyAmount.cjs');
var dropdown = require('../../assets/images/dropdown.cjs');
var useCurrencyBalance = require('../../lib/hooks/useCurrencyBalance.cjs');
var index = require('../Button/index.cjs');
var index$3 = require('../DoubleLogo/index.cjs');
var CurrencyLogo = require('../Logo/CurrencyLogo.cjs');
var index$1 = require('../NumericalInput/index.cjs');
var index$2 = require('../Row/index.cjs');
var CurrencySearchModal = require('../SearchModal/CurrencySearchModal.cjs');
var FiatValue = require('./FiatValue.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _excluded = ["value", "onUserInput", "onMax", "showMaxButton", "onCurrencySelect", "currency", "otherCurrency", "id", "showCommonBases", "showCurrencyAmount", "disableNonToken", "renderBalance", "fiatValue", "hideBalance", "pair", "hideInput", "locked", "loading"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;
var InputPanel = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  position: relative;\n  border-radius: ", ";\n  background-color: ", ";\n\n  z-index: 1;\n  width: ", ";\n  transition: height 1s ease;\n  will-change: height;\n"])), styles.flexColumnNoWrap, function (_ref) {
  var hideInput = _ref.hideInput;
  return hideInput ? "16px" : "20px";
}, function (_ref2) {
  var theme = _ref2.theme,
    hideInput = _ref2.hideInput;
  return hideInput ? "transparent" : theme.surface2;
}, function (_ref3) {
  var hideInput = _ref3.hideInput;
  return hideInput ? "100%" : "initial";
});
var Container = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  border-radius: ", ";\n  border: 1px solid ", ";\n  background-color: ", ";\n  width: ", ";\n  ", "\n"])), function (_ref4) {
  var hideInput = _ref4.hideInput;
  return hideInput ? "16px" : "20px";
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface3;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface2;
}, function (_ref7) {
  var hideInput = _ref7.hideInput;
  return hideInput ? "100%" : "initial";
}, function (_ref8) {
  var theme = _ref8.theme,
    hideInput = _ref8.hideInput,
    disabled = _ref8.disabled;
  return !disabled && "\n    :focus,\n    :hover {\n      border: 1px solid ".concat(hideInput ? " transparent" : theme.surface2, ";\n    }\n  ");
});
var CurrencySelect = styled__default["default"](index.ButtonGray)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  background-color: ", ";\n  opacity: ", ";\n  box-shadow: ", ";\n  color: ", ";\n  cursor: pointer;\n  border-radius: 16px;\n  outline: none;\n  user-select: none;\n  border: none;\n  font-size: 24px;\n  font-weight: 535;\n  height: ", ";\n  width: ", ";\n  padding: 0 8px;\n  justify-content: space-between;\n  margin-left: ", ";\n  :focus,\n  :hover {\n    background-color: ", ";\n  }\n  visibility: ", ";\n  ", "\n"])), function (_ref9) {
  var selected = _ref9.selected,
    theme = _ref9.theme;
  return selected ? theme.surface1 : theme.accent1;
}, function (_ref10) {
  var disabled = _ref10.disabled;
  return !disabled ? 1 : 0.4;
}, function (_ref11) {
  var theme = _ref11.theme;
  return theme.deprecated_shallowShadow;
}, function (_ref12) {
  var selected = _ref12.selected,
    theme = _ref12.theme;
  return selected ? theme.neutral1 : theme.white;
}, function (_ref13) {
  var hideInput = _ref13.hideInput;
  return hideInput ? "2.8rem" : "2.4rem";
}, function (_ref14) {
  var hideInput = _ref14.hideInput;
  return hideInput ? "100%" : "initial";
}, function (_ref15) {
  var hideInput = _ref15.hideInput;
  return hideInput ? "0" : "12px";
}, function (_ref16) {
  var selected = _ref16.selected,
    theme = _ref16.theme;
  return selected ? theme.surface2 : polished.darken(0.05, theme.accent1);
}, function (_ref17) {
  var visible = _ref17.visible;
  return visible ? "visible" : "hidden";
}, function (_ref18) {
  var pointerEvents = _ref18.pointerEvents;
  return pointerEvents && "pointer-events: none";
});
var InputRow = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  align-items: center;\n  justify-content: space-between;\n  padding: ", ";\n"])), styles.flexRowNoWrap, function (_ref19) {
  var selected = _ref19.selected;
  return selected ? " 1rem 1rem 0.75rem 1rem" : "1rem 1rem 1rem 1rem";
});
var LabelRow = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  align-items: center;\n  color: ", ";\n  font-size: 0.75rem;\n  line-height: 1rem;\n  padding: 0 1rem 1rem;\n  span:hover {\n    cursor: pointer;\n    color: ", ";\n  }\n"])), styles.flexRowNoWrap, function (_ref20) {
  var theme = _ref20.theme;
  return theme.neutral1;
}, function (_ref21) {
  var theme = _ref21.theme;
  return polished.darken(0.2, theme.neutral2);
});
var FiatRow = styled__default["default"](LabelRow)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  justify-content: flex-end;\n  padding: 0px 1rem 0.75rem;\n  height: 32px;\n"])));

// note the line height 0 ensures even if we change font/font-size it doesn't break centering
var Aligner = styled__default["default"].span(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  line-height: 0px;\n"])));
var StyledDropDown = styled__default["default"](dropdown.ReactComponent)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  margin: 0 0.25rem 0 0.35rem;\n  height: 35%;\n\n  path {\n    stroke: ", ";\n    stroke-width: 1.5px;\n  }\n"])), function (_ref22) {
  var selected = _ref22.selected,
    theme = _ref22.theme;
  return selected ? theme.neutral1 : theme.white;
});
var StyledTokenName = styled__default["default"].span(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  ", "\n  font-size: 20px;\n"])), function (_ref23) {
  var active = _ref23.active;
  return active ? "  margin: 0 0.25rem 0 0.25rem;" : "  margin: 0 0.25rem 0 0.25rem;";
});
var StyledBalanceMax = styled__default["default"].button(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  background-color: transparent;\n  background-color: ", ";\n  border: none;\n  border-radius: 12px;\n  color: ", ";\n  cursor: pointer;\n  font-size: 11px;\n  font-weight: 535;\n  margin-left: 0.25rem;\n  opacity: ", ";\n  padding: 4px 6px;\n  pointer-events: ", ";\n\n  :hover {\n    opacity: ", ";\n  }\n\n  :focus {\n    outline: none;\n  }\n"])), function (_ref24) {
  var theme = _ref24.theme;
  return theme.accent2;
}, function (_ref25) {
  var theme = _ref25.theme;
  return theme.accent1;
}, function (_ref26) {
  var disabled = _ref26.disabled;
  return !disabled ? 1 : 0.4;
}, function (_ref27) {
  var disabled = _ref27.disabled;
  return !disabled ? "initial" : "none";
}, function (_ref28) {
  var disabled = _ref28.disabled;
  return !disabled ? 0.8 : 0.4;
});
var StyledNumericalInput = styled__default["default"](index$1.Input)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  text-align: left;\n"])), styled$1.loadingOpacityMixin);
var StyledPrefetchBalancesWrapper = styled__default["default"](PrefetchBalancesWrapper["default"])(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n  width: ", ";\n"])), function (_ref29) {
  var $fullWidth = _ref29.$fullWidth;
  return $fullWidth ? "100%" : "auto";
});
function CurrencyInputPanel(_ref30) {
  var value = _ref30.value,
    onUserInput = _ref30.onUserInput,
    onMax = _ref30.onMax,
    showMaxButton = _ref30.showMaxButton,
    onCurrencySelect = _ref30.onCurrencySelect,
    currency = _ref30.currency,
    otherCurrency = _ref30.otherCurrency,
    id = _ref30.id,
    showCommonBases = _ref30.showCommonBases,
    showCurrencyAmount = _ref30.showCurrencyAmount,
    disableNonToken = _ref30.disableNonToken,
    renderBalance = _ref30.renderBalance,
    fiatValue = _ref30.fiatValue,
    _ref30$hideBalance = _ref30.hideBalance,
    hideBalance = _ref30$hideBalance === void 0 ? false : _ref30$hideBalance,
    _ref30$pair = _ref30.pair,
    pair = _ref30$pair === void 0 ? null : _ref30$pair,
    _ref30$hideInput = _ref30.hideInput,
    hideInput = _ref30$hideInput === void 0 ? false : _ref30$hideInput,
    _ref30$locked = _ref30.locked,
    locked = _ref30$locked === void 0 ? false : _ref30$locked,
    _ref30$loading = _ref30.loading,
    loading = _ref30$loading === void 0 ? false : _ref30$loading,
    rest = _objectWithoutProperties__default["default"](_ref30, _excluded);
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    modalOpen = _useState2[0],
    setModalOpen = _useState2[1];
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId;
  var selectedCurrencyBalance = useCurrencyBalance["default"](account !== null && account !== void 0 ? account : undefined, currency !== null && currency !== void 0 ? currency : undefined);
  var theme = styled.useTheme();
  var handleDismissSearch = React.useCallback(function () {
    setModalOpen(false);
  }, [setModalOpen]);
  var chainAllowed = chains.isSupportedChain(chainId);
  return /*#__PURE__*/React__default["default"].createElement(InputPanel, _extends__default["default"]({
    id: id,
    hideInput: hideInput
  }, rest), !locked && /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Container, {
    hideInput: hideInput,
    disabled: !chainAllowed
  }, /*#__PURE__*/React__default["default"].createElement(InputRow, {
    style: hideInput ? {
      padding: "0",
      borderRadius: "8px"
    } : {},
    selected: !onCurrencySelect
  }, !hideInput && /*#__PURE__*/React__default["default"].createElement(StyledNumericalInput, {
    className: "token-amount-input",
    value: value,
    onUserInput: onUserInput,
    disabled: !chainAllowed,
    $loading: loading
  }), /*#__PURE__*/React__default["default"].createElement(StyledPrefetchBalancesWrapper, {
    shouldFetchOnAccountUpdate: modalOpen,
    $fullWidth: hideInput
  }, /*#__PURE__*/React__default["default"].createElement(CurrencySelect, {
    disabled: !chainAllowed,
    visible: currency !== undefined,
    selected: !!currency,
    hideInput: hideInput,
    className: "open-currency-select-button",
    onClick: function onClick() {
      if (onCurrencySelect) {
        setModalOpen(true);
      }
    },
    pointerEvents: !onCurrencySelect ? "none" : undefined
  }, /*#__PURE__*/React__default["default"].createElement(Aligner, null, /*#__PURE__*/React__default["default"].createElement(index$2.RowFixed, null, pair ? /*#__PURE__*/React__default["default"].createElement("span", {
    style: {
      marginRight: "0.5rem"
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$3, {
    currency0: pair.token0,
    currency1: pair.token1,
    size: 24,
    margin: true
  })) : currency && /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
    style: {
      marginRight: "0.5rem"
    },
    currency: currency,
    size: "24px"
  }), pair ? /*#__PURE__*/React__default["default"].createElement(StyledTokenName, {
    className: "pair-name-container"
  }, pair === null || pair === void 0 ? void 0 : pair.token0.symbol, ":", pair === null || pair === void 0 ? void 0 : pair.token1.symbol) : /*#__PURE__*/React__default["default"].createElement(StyledTokenName, {
    className: "token-symbol-container",
    active: Boolean(currency && currency.symbol)
  }, (currency && currency.symbol && currency.symbol.length > 20 ? currency.symbol.slice(0, 4) + "..." + currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length) : currency === null || currency === void 0 ? void 0 : currency.symbol) || /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "T0Y2+3",
    message: "Select a token"
  }))), onCurrencySelect && /*#__PURE__*/React__default["default"].createElement(StyledDropDown, {
    selected: !!currency
  }))))), Boolean(!hideInput && !hideBalance && currency) && /*#__PURE__*/React__default["default"].createElement(FiatRow, null, /*#__PURE__*/React__default["default"].createElement(index$2.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(styled$1.LoadingOpacityContainer, {
    $loading: loading
  }, fiatValue && /*#__PURE__*/React__default["default"].createElement(FiatValue.FiatValue, {
    fiatValue: fiatValue
  })), account && /*#__PURE__*/React__default["default"].createElement(index$2.RowFixed, {
    style: {
      height: "17px"
    }
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedBody, {
    onClick: onMax,
    color: theme.neutral3,
    fontWeight: 535,
    fontSize: 14,
    style: {
      display: "inline",
      cursor: "pointer"
    }
  }, Boolean(!hideBalance && currency && selectedCurrencyBalance) && ((renderBalance === null || renderBalance === void 0 ? void 0 : renderBalance(selectedCurrencyBalance)) || /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "VuFd5C",
    message: "Balance: {0}",
    values: {
      "0": formatCurrencyAmount.formatCurrencyAmount(selectedCurrencyBalance, 4)
    }
  }))), Boolean(showMaxButton && selectedCurrencyBalance) && /*#__PURE__*/React__default["default"].createElement(index$5.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.SwapEventName.SWAP_MAX_TOKEN_AMOUNT_SELECTED,
    element: analyticsEvents.InterfaceElementName.MAX_TOKEN_AMOUNT_BUTTON
  }, /*#__PURE__*/React__default["default"].createElement(StyledBalanceMax, {
    onClick: onMax
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "4HtGBb",
    message: "MAX"
  })))))))), onCurrencySelect && /*#__PURE__*/React__default["default"].createElement(CurrencySearchModal, {
    isOpen: modalOpen,
    onDismiss: handleDismissSearch,
    onCurrencySelect: onCurrencySelect,
    selectedCurrency: currency,
    otherSelectedCurrency: otherCurrency,
    showCommonBases: showCommonBases,
    showCurrencyAmount: showCurrencyAmount,
    disableNonToken: disableNonToken
  }));
}

module.exports = CurrencyInputPanel;
