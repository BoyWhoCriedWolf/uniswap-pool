'use strict';

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$3 = require('../../analytics/index.cjs');
var index$1 = require('../Column/index.cjs');
var styled$1 = require('../Loader/styled.cjs');
var CurrencyLogo = require('../Logo/CurrencyLogo.cjs');
var PrefetchBalancesWrapper = require('../PrefetchBalancesWrapper/PrefetchBalancesWrapper.cjs');
var index$5 = require('../Tooltip/index.cjs');
var chains = require('../../constants/chains.cjs');
var ms = require('ms');
var polished = require('polished');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var colors = require('../../theme/colors.cjs');
require('../../theme/components/index.cjs');
var styles = require('../../theme/styles.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var dropdown = require('../../assets/images/dropdown.cjs');
var useCurrencyBalance = require('../../lib/hooks/useCurrencyBalance.cjs');
var index$4 = require('../DoubleLogo/index.cjs');
var index = require('../NumericalInput/index.cjs');
var index$6 = require('../Row/index.cjs');
var CurrencySearchModal = require('../SearchModal/CurrencySearchModal.cjs');
var FiatValue = require('./FiatValue.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _excluded = ["value", "onUserInput", "onMax", "showMaxButton", "onCurrencySelect", "currency", "otherCurrency", "id", "showCommonBases", "showCurrencyAmount", "disableNonToken", "renderBalance", "fiatValue", "priceImpact", "hideBalance", "pair", "hideInput", "locked", "loading", "disabled", "numericalInputSettings", "label"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;
var InputPanel = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  position: relative;\n  border-radius: ", ";\n  z-index: 1;\n  width: ", ";\n  transition: height 1s ease;\n  will-change: height;\n"])), styles.flexColumnNoWrap, function (_ref) {
  var hideInput = _ref.hideInput;
  return hideInput ? "16px" : "20px";
}, function (_ref2) {
  var hideInput = _ref2.hideInput;
  return hideInput ? "100%" : "initial";
});
var FixedContainer = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2;\n"])));
var Container = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  min-height: 44px;\n  border-radius: ", ";\n  width: ", ";\n"])), function (_ref3) {
  var hideInput = _ref3.hideInput;
  return hideInput ? "16px" : "20px";
}, function (_ref4) {
  var hideInput = _ref4.hideInput;
  return hideInput ? "100%" : "initial";
});
var CurrencySelect = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  opacity: ", ";\n  color: ", ";\n  cursor: pointer;\n  height: 36px;\n  border-radius: 18px;\n  outline: none;\n  user-select: none;\n  font-size: 18px;\n  font-weight: 500;\n  width: ", ";\n  padding: ", ";\n  gap: 8px;\n  justify-content: space-between;\n  margin-left: ", ";\n  box-shadow: ", ";\n\n  visibility: ", ";\n\n  @keyframes horizontal-shaking {\n    0% {\n      transform: translateX(0);\n      animation-timing-function: ease-in-out;\n    }\n    20% {\n      transform: translateX(10px);\n      animation-timing-function: ease-in-out;\n    }\n    40% {\n      transform: translateX(-10px);\n      animation-timing-function: ease-in-out;\n    }\n    60% {\n      transform: translateX(10px);\n      animation-timing-function: ease-in-out;\n    }\n    80% {\n      transform: translateX(-10px);\n      animation-timing-function: ease-in-out;\n    }\n    100% {\n      transform: translateX(0);\n      animation-timing-function: ease-in-out;\n    }\n  }\n  animation: ", ";\n"])), function (_ref5) {
  var disabled = _ref5.disabled;
  return !disabled ? 1 : 0.4;
}, function (_ref6) {
  var selected = _ref6.selected,
    theme = _ref6.theme;
  return selected ? theme.neutral1 : theme.white;
}, function (_ref7) {
  var hideInput = _ref7.hideInput;
  return hideInput ? "100%" : "initial";
}, function (_ref8) {
  var selected = _ref8.selected;
  return selected ? "4px 8px 4px 4px" : "6px 6px 6px 8px";
}, function (_ref9) {
  var hideInput = _ref9.hideInput;
  return hideInput ? "0" : "12px";
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.deprecated_shallowShadow;
}, function (_ref11) {
  var visible = _ref11.visible;
  return visible ? "visible" : "hidden";
}, function (_ref12) {
  var animateShake = _ref12.animateShake;
  return animateShake ? "horizontal-shaking 300ms" : "none";
});
var InputRow = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  align-items: center;\n  justify-content: space-between;\n  background-color: ", ";\n  padding: 8px;\n  border-radius: 16px;\n"])), styles.flexRowNoWrap, colors.colors.black_blue);
var LabelRow = styled__default["default"].div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  align-items: center;\n  color: ", ";\n  font-size: 0.75rem;\n  line-height: 1rem;\n\n  span:hover {\n    cursor: pointer;\n    color: ", ";\n  }\n"])), styles.flexRowNoWrap, function (_ref13) {
  var theme = _ref13.theme;
  return theme.neutral2;
}, function (_ref14) {
  var theme = _ref14.theme;
  return polished.darken(0.2, theme.neutral2);
});
var FiatRow = styled__default["default"](LabelRow)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  justify-content: flex-end;\n  min-height: 24px;\n  padding: 8px 0px 0px 0px;\n"])));
var Aligner = styled__default["default"].span(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n"])));
var StyledDropDown = styled__default["default"](dropdown.ReactComponent)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  margin: 0 0.25rem 0 0.35rem;\n  height: 35%;\n  margin-left: 8px;\n\n  path {\n    stroke: ", ";\n    stroke-width: 2px;\n  }\n"])), function (_ref15) {
  var selected = _ref15.selected,
    theme = _ref15.theme;
  return selected ? theme.neutral1 : theme.white;
});
var StyledTokenName = styled__default["default"].span(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  ", "\n  font-size: 20px;\n  font-weight: 535;\n"])), function (_ref16) {
  var active = _ref16.active;
  return active ? "  margin: 0 0.25rem 0 0.25rem;" : "  margin: 0 0.25rem 0 0.25rem;";
});
var StyledBalanceMax = styled__default["default"].button(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  background-color: transparent;\n  border: none;\n  color: ", ";\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 535;\n  opacity: ", ";\n  padding: 4px 6px;\n  pointer-events: ", ";\n\n  :hover {\n    opacity: ", ";\n  }\n\n  :focus {\n    outline: none;\n  }\n"])), function (_ref17) {
  var theme = _ref17.theme;
  return theme.accent1;
}, function (_ref18) {
  var disabled = _ref18.disabled;
  return !disabled ? 1 : 0.4;
}, function (_ref19) {
  var disabled = _ref19.disabled;
  return !disabled ? "initial" : "none";
}, function (_ref20) {
  var disabled = _ref20.disabled;
  return !disabled ? 0.8 : 0.4;
});
var StyledNumericalInput = styled__default["default"](index.Input)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n  ", ";\n  text-align: left;\n  font-size: 28px;\n  font-weight: 500;\n  max-height: 36px;\n"])), styled$1.loadingOpacityMixin);
var SwapCurrencyInputPanel = /*#__PURE__*/React.forwardRef(function (_ref21, ref) {
  var value = _ref21.value,
    onUserInput = _ref21.onUserInput,
    onMax = _ref21.onMax,
    showMaxButton = _ref21.showMaxButton,
    onCurrencySelect = _ref21.onCurrencySelect,
    currency = _ref21.currency,
    otherCurrency = _ref21.otherCurrency,
    id = _ref21.id,
    showCommonBases = _ref21.showCommonBases,
    showCurrencyAmount = _ref21.showCurrencyAmount,
    disableNonToken = _ref21.disableNonToken,
    renderBalance = _ref21.renderBalance,
    fiatValue = _ref21.fiatValue,
    priceImpact = _ref21.priceImpact,
    _ref21$hideBalance = _ref21.hideBalance,
    hideBalance = _ref21$hideBalance === void 0 ? false : _ref21$hideBalance,
    _ref21$pair = _ref21.pair,
    pair = _ref21$pair === void 0 ? null : _ref21$pair,
    _ref21$hideInput = _ref21.hideInput,
    hideInput = _ref21$hideInput === void 0 ? false : _ref21$hideInput,
    _ref21$locked = _ref21.locked,
    locked = _ref21$locked === void 0 ? false : _ref21$locked,
    _ref21$loading = _ref21.loading,
    loading = _ref21$loading === void 0 ? false : _ref21$loading,
    _ref21$disabled = _ref21.disabled,
    disabled = _ref21$disabled === void 0 ? false : _ref21$disabled,
    numericalInputSettings = _ref21.numericalInputSettings,
    label = _ref21.label,
    rest = _objectWithoutProperties__default["default"](_ref21, _excluded);
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    modalOpen = _useState2[0],
    setModalOpen = _useState2[1];
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId;
  var selectedCurrencyBalance = useCurrencyBalance["default"](account !== null && account !== void 0 ? account : undefined, currency !== null && currency !== void 0 ? currency : undefined);
  var theme = styled.useTheme();
  var _useFormatter = formatNumbers.useFormatter(),
    formatCurrencyAmount = _useFormatter.formatCurrencyAmount;
  var handleDismissSearch = React.useCallback(function () {
    setModalOpen(false);
  }, [setModalOpen]);
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    tooltipVisible = _useState4[0],
    setTooltipVisible = _useState4[1];
  var handleDisabledNumericalInputClick = React.useCallback(function () {
    if (numericalInputSettings !== null && numericalInputSettings !== void 0 && numericalInputSettings.disabled && !tooltipVisible) {
      var _numericalInputSettin;
      setTooltipVisible(true);
      setTimeout(function () {
        return setTooltipVisible(false);
      }, ms__default["default"]("4s")); // reset shake animation state after 4s
      (_numericalInputSettin = numericalInputSettings.onDisabledClick) === null || _numericalInputSettin === void 0 || _numericalInputSettin.call(numericalInputSettings);
    }
  }, [tooltipVisible, numericalInputSettings]);
  var chainAllowed = chains.isSupportedChain(chainId);

  // reset tooltip state when currency changes
  React.useEffect(function () {
    return setTooltipVisible(false);
  }, [currency]);
  return /*#__PURE__*/React__default["default"].createElement(InputPanel, _extends__default["default"]({
    id: id,
    hideInput: hideInput
  }, rest), locked && /*#__PURE__*/React__default["default"].createElement(FixedContainer, null, /*#__PURE__*/React__default["default"].createElement(index$1.AutoColumn, {
    gap: "sm",
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(reactFeather.Lock, null), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySecondary, {
    fontSize: "12px",
    textAlign: "center",
    padding: "0 12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "G92cwW",
    message: "The market price is outside your specified price range. Single-asset deposit only."
  })))), /*#__PURE__*/React__default["default"].createElement(Container, {
    hideInput: hideInput
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginLeft: 8,
      marginRight: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, {
    style: {
      userSelect: "none"
    }
  }, label), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, {
    style: {
      color: colors.colors.primary_dark
    }
  }, showMaxButton && selectedCurrencyBalance ? /*#__PURE__*/React__default["default"].createElement(index$3.TraceEvent, {
    events: [analyticsEvents.BrowserEvent.onClick],
    name: analyticsEvents.SwapEventName.SWAP_MAX_TOKEN_AMOUNT_SELECTED,
    element: analyticsEvents.InterfaceElementName.MAX_TOKEN_AMOUNT_BUTTON
  }, /*#__PURE__*/React__default["default"].createElement(StyledBalanceMax, {
    onClick: onMax
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "CK1KXz",
    message: "Max"
  }))) : null)), /*#__PURE__*/React__default["default"].createElement(InputRow, {
    style: hideInput ? {
      padding: "0",
      borderRadius: "8px"
    } : {}
  }, !hideInput && /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      flexGrow: "1"
    },
    onClick: handleDisabledNumericalInputClick
  }, pair ? /*#__PURE__*/React__default["default"].createElement("span", {
    style: {
      marginRight: "0.5rem"
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$4, {
    currency0: pair.token0,
    currency1: pair.token1,
    size: 32,
    margin: true
  })) : currency ? /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
    style: {
      marginRight: "2px"
    },
    currency: currency,
    size: "32px"
  }) : null, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      flexGrow: 1,
      display: "flex",
      paddingLeft: 8
    }
  }, /*#__PURE__*/React__default["default"].createElement(StyledNumericalInput, {
    className: "token-amount-input",
    value: value,
    onUserInput: onUserInput,
    disabled: !chainAllowed || disabled || (numericalInputSettings === null || numericalInputSettings === void 0 ? void 0 : numericalInputSettings.disabled),
    $loading: loading,
    id: id,
    ref: ref
  }))), /*#__PURE__*/React__default["default"].createElement(PrefetchBalancesWrapper["default"], {
    shouldFetchOnAccountUpdate: modalOpen
  }, /*#__PURE__*/React__default["default"].createElement(index$5["default"], {
    show: tooltipVisible && !modalOpen,
    placement: "bottom",
    offsetY: 14,
    text: numericalInputSettings === null || numericalInputSettings === void 0 ? void 0 : numericalInputSettings.disabledTooltipBody
  }, /*#__PURE__*/React__default["default"].createElement(CurrencySelect, {
    disabled: !chainAllowed || disabled,
    visible: currency !== undefined,
    selected: !!currency,
    hideInput: hideInput,
    className: "open-currency-select-button",
    onClick: function onClick() {
      if (onCurrencySelect) {
        setModalOpen(true);
      }
    },
    animateShake: tooltipVisible
  }, /*#__PURE__*/React__default["default"].createElement(Aligner, null, /*#__PURE__*/React__default["default"].createElement(index$6.RowFixed, null, pair ? /*#__PURE__*/React__default["default"].createElement(StyledTokenName, {
    className: "pair-name-container"
  }, pair === null || pair === void 0 ? void 0 : pair.token0.symbol, ":", pair === null || pair === void 0 ? void 0 : pair.token1.symbol) : /*#__PURE__*/React__default["default"].createElement(StyledTokenName, {
    className: "token-symbol-container",
    active: Boolean(currency && currency.symbol)
  }, (currency && currency.symbol && currency.symbol.length > 20 ? currency.symbol.slice(0, 4) + "..." + currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length) : currency === null || currency === void 0 ? void 0 : currency.symbol) || /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "0RrIzN",
    message: "Select token"
  }))), onCurrencySelect && /*#__PURE__*/React__default["default"].createElement(StyledDropDown, {
    selected: !!currency
  })))))), Boolean(!hideInput && !hideBalance) && /*#__PURE__*/React__default["default"].createElement(FiatRow, null, /*#__PURE__*/React__default["default"].createElement(index$6.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(styled$1.LoadingOpacityContainer, {
    $loading: loading
  }, fiatValue && /*#__PURE__*/React__default["default"].createElement(FiatValue.FiatValue, {
    fiatValue: fiatValue,
    priceImpact: priceImpact
  })), account ? /*#__PURE__*/React__default["default"].createElement(index$6.RowFixed, {
    style: {
      height: "16px"
    }
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedBody, {
    "data-testid": "balance-text",
    color: theme.neutral2,
    fontWeight: 485,
    fontSize: 14,
    style: {
      display: "inline"
    }
  }, !hideBalance && currency && selectedCurrencyBalance ? renderBalance ? renderBalance(selectedCurrencyBalance) : /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "VuFd5C",
    message: "Balance: {0}",
    values: {
      "0": formatCurrencyAmount({
        amount: selectedCurrencyBalance,
        type: formatNumbers.NumberType.TokenNonTx
      })
    }
  }) : null)) : /*#__PURE__*/React__default["default"].createElement("span", null)))), onCurrencySelect && /*#__PURE__*/React__default["default"].createElement(CurrencySearchModal, {
    isOpen: modalOpen,
    onDismiss: handleDismissSearch,
    onCurrencySelect: onCurrencySelect,
    selectedCurrency: currency,
    otherSelectedCurrency: otherCurrency,
    showCommonBases: showCommonBases,
    showCurrencyAmount: showCurrencyAmount,
    disableNonToken: disableNonToken
  }));
});
SwapCurrencyInputPanel.displayName = "SwapCurrencyInputPanel";

module.exports = SwapCurrencyInputPanel;
