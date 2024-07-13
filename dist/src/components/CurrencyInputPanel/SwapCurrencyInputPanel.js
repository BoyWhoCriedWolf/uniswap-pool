import React__default, { forwardRef, useState, useCallback, useEffect } from 'react';
import _extends from '@babel/runtime/helpers/extends';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { BrowserEvent, SwapEventName, InterfaceElementName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { TraceEvent } from '../../analytics/index.js';
import { AutoColumn } from '../Column/index.js';
import { loadingOpacityMixin, LoadingOpacityContainer } from '../Loader/styled.js';
import CurrencyLogo from '../Logo/CurrencyLogo.js';
import PrefetchBalancesWrapper from '../PrefetchBalancesWrapper/PrefetchBalancesWrapper.js';
import Tooltip from '../Tooltip/index.js';
import { isSupportedChain } from '../../constants/chains.js';
import ms from 'ms';
import { darken } from 'polished';
import { Lock } from 'react-feather';
import styled, { useTheme } from 'styled-components';
import { colors } from '../../theme/colors.js';
import '../../theme/components/index.js';
import { flexColumnNoWrap, flexRowNoWrap } from '../../theme/styles.js';
import { useFormatter, NumberType } from '../../utils/formatNumbers.js';
import { ReactComponent as SvgDropdown } from '../../assets/images/dropdown.svg.js';
import useCurrencyBalance from '../../lib/hooks/useCurrencyBalance.js';
import DoubleCurrencyLogo from '../DoubleLogo/index.js';
import { Input as MemoizedInput } from '../NumericalInput/index.js';
import { RowFixed, RowBetween } from '../Row/index.js';
import CurrencySearchModal from '../SearchModal/CurrencySearchModal.js';
import { FiatValue } from './FiatValue.js';
import { ThemedText } from '../../theme/components/text.js';

var _excluded = ["value", "onUserInput", "onMax", "showMaxButton", "onCurrencySelect", "currency", "otherCurrency", "id", "showCommonBases", "showCurrencyAmount", "disableNonToken", "renderBalance", "fiatValue", "priceImpact", "hideBalance", "pair", "hideInput", "locked", "loading", "disabled", "numericalInputSettings", "label"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;
var InputPanel = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n  position: relative;\n  border-radius: ", ";\n  z-index: 1;\n  width: ", ";\n  transition: height 1s ease;\n  will-change: height;\n"])), flexColumnNoWrap, function (_ref) {
  var hideInput = _ref.hideInput;
  return hideInput ? "16px" : "20px";
}, function (_ref2) {
  var hideInput = _ref2.hideInput;
  return hideInput ? "100%" : "initial";
});
var FixedContainer = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  border-radius: 20px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  z-index: 2;\n"])));
var Container = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  min-height: 44px;\n  border-radius: ", ";\n  width: ", ";\n"])), function (_ref3) {
  var hideInput = _ref3.hideInput;
  return hideInput ? "16px" : "20px";
}, function (_ref4) {
  var hideInput = _ref4.hideInput;
  return hideInput ? "100%" : "initial";
});
var CurrencySelect = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  align-items: center;\n  opacity: ", ";\n  color: ", ";\n  cursor: pointer;\n  height: 36px;\n  border-radius: 18px;\n  outline: none;\n  user-select: none;\n  font-size: 18px;\n  font-weight: 500;\n  width: ", ";\n  padding: ", ";\n  gap: 8px;\n  justify-content: space-between;\n  margin-left: ", ";\n  box-shadow: ", ";\n\n  visibility: ", ";\n\n  @keyframes horizontal-shaking {\n    0% {\n      transform: translateX(0);\n      animation-timing-function: ease-in-out;\n    }\n    20% {\n      transform: translateX(10px);\n      animation-timing-function: ease-in-out;\n    }\n    40% {\n      transform: translateX(-10px);\n      animation-timing-function: ease-in-out;\n    }\n    60% {\n      transform: translateX(10px);\n      animation-timing-function: ease-in-out;\n    }\n    80% {\n      transform: translateX(-10px);\n      animation-timing-function: ease-in-out;\n    }\n    100% {\n      transform: translateX(0);\n      animation-timing-function: ease-in-out;\n    }\n  }\n  animation: ", ";\n"])), function (_ref5) {
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
var InputRow = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  ", ";\n  align-items: center;\n  justify-content: space-between;\n  background-color: ", ";\n  padding: 8px;\n  border-radius: 16px;\n"])), flexRowNoWrap, colors.black_blue);
var LabelRow = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  ", ";\n  align-items: center;\n  color: ", ";\n  font-size: 0.75rem;\n  line-height: 1rem;\n\n  span:hover {\n    cursor: pointer;\n    color: ", ";\n  }\n"])), flexRowNoWrap, function (_ref13) {
  var theme = _ref13.theme;
  return theme.neutral2;
}, function (_ref14) {
  var theme = _ref14.theme;
  return darken(0.2, theme.neutral2);
});
var FiatRow = styled(LabelRow)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  justify-content: flex-end;\n  min-height: 24px;\n  padding: 8px 0px 0px 0px;\n"])));
var Aligner = styled.span(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n"])));
var StyledDropDown = styled(SvgDropdown)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  margin: 0 0.25rem 0 0.35rem;\n  height: 35%;\n  margin-left: 8px;\n\n  path {\n    stroke: ", ";\n    stroke-width: 2px;\n  }\n"])), function (_ref15) {
  var selected = _ref15.selected,
    theme = _ref15.theme;
  return selected ? theme.neutral1 : theme.white;
});
var StyledTokenName = styled.span(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  ", "\n  font-size: 20px;\n  font-weight: 535;\n"])), function (_ref16) {
  var active = _ref16.active;
  return active ? "  margin: 0 0.25rem 0 0.25rem;" : "  margin: 0 0.25rem 0 0.25rem;";
});
var StyledBalanceMax = styled.button(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  background-color: transparent;\n  border: none;\n  color: ", ";\n  cursor: pointer;\n  font-size: 14px;\n  font-weight: 535;\n  opacity: ", ";\n  padding: 4px 6px;\n  pointer-events: ", ";\n\n  :hover {\n    opacity: ", ";\n  }\n\n  :focus {\n    outline: none;\n  }\n"])), function (_ref17) {
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
var StyledNumericalInput = styled(MemoizedInput)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  ", ";\n  text-align: left;\n  font-size: 28px;\n  font-weight: 500;\n  max-height: 36px;\n"])), loadingOpacityMixin);
var SwapCurrencyInputPanel = /*#__PURE__*/forwardRef(function (_ref21, ref) {
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
    rest = _objectWithoutProperties(_ref21, _excluded);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    modalOpen = _useState2[0],
    setModalOpen = _useState2[1];
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId;
  var selectedCurrencyBalance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, currency !== null && currency !== void 0 ? currency : undefined);
  var theme = useTheme();
  var _useFormatter = useFormatter(),
    formatCurrencyAmount = _useFormatter.formatCurrencyAmount;
  var handleDismissSearch = useCallback(function () {
    setModalOpen(false);
  }, [setModalOpen]);
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    tooltipVisible = _useState4[0],
    setTooltipVisible = _useState4[1];
  var handleDisabledNumericalInputClick = useCallback(function () {
    if (numericalInputSettings !== null && numericalInputSettings !== void 0 && numericalInputSettings.disabled && !tooltipVisible) {
      var _numericalInputSettin;
      setTooltipVisible(true);
      setTimeout(function () {
        return setTooltipVisible(false);
      }, ms("4s")); // reset shake animation state after 4s
      (_numericalInputSettin = numericalInputSettings.onDisabledClick) === null || _numericalInputSettin === void 0 || _numericalInputSettin.call(numericalInputSettings);
    }
  }, [tooltipVisible, numericalInputSettings]);
  var chainAllowed = isSupportedChain(chainId);

  // reset tooltip state when currency changes
  useEffect(function () {
    return setTooltipVisible(false);
  }, [currency]);
  return /*#__PURE__*/React__default.createElement(InputPanel, _extends({
    id: id,
    hideInput: hideInput
  }, rest), locked && /*#__PURE__*/React__default.createElement(FixedContainer, null, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "sm",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(Lock, null), /*#__PURE__*/React__default.createElement(ThemedText.BodySecondary, {
    fontSize: "12px",
    textAlign: "center",
    padding: "0 12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "G92cwW",
    message: "The market price is outside your specified price range. Single-asset deposit only."
  })))), /*#__PURE__*/React__default.createElement(Container, {
    hideInput: hideInput
  }, /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginLeft: 8,
      marginRight: 8,
      marginBottom: 8
    }
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, {
    style: {
      userSelect: "none"
    }
  }, label), /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, {
    style: {
      color: colors.primary_dark
    }
  }, showMaxButton && selectedCurrencyBalance ? /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: SwapEventName.SWAP_MAX_TOKEN_AMOUNT_SELECTED,
    element: InterfaceElementName.MAX_TOKEN_AMOUNT_BUTTON
  }, /*#__PURE__*/React__default.createElement(StyledBalanceMax, {
    onClick: onMax
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "CK1KXz",
    message: "Max"
  }))) : null)), /*#__PURE__*/React__default.createElement(InputRow, {
    style: hideInput ? {
      padding: "0",
      borderRadius: "8px"
    } : {}
  }, !hideInput && /*#__PURE__*/React__default.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      flexGrow: "1"
    },
    onClick: handleDisabledNumericalInputClick
  }, pair ? /*#__PURE__*/React__default.createElement("span", {
    style: {
      marginRight: "0.5rem"
    }
  }, /*#__PURE__*/React__default.createElement(DoubleCurrencyLogo, {
    currency0: pair.token0,
    currency1: pair.token1,
    size: 32,
    margin: true
  })) : currency ? /*#__PURE__*/React__default.createElement(CurrencyLogo, {
    style: {
      marginRight: "2px"
    },
    currency: currency,
    size: "32px"
  }) : null, /*#__PURE__*/React__default.createElement("div", {
    style: {
      flexGrow: 1,
      display: "flex",
      paddingLeft: 8
    }
  }, /*#__PURE__*/React__default.createElement(StyledNumericalInput, {
    className: "token-amount-input",
    value: value,
    onUserInput: onUserInput,
    disabled: !chainAllowed || disabled || (numericalInputSettings === null || numericalInputSettings === void 0 ? void 0 : numericalInputSettings.disabled),
    $loading: loading,
    id: id,
    ref: ref
  }))), /*#__PURE__*/React__default.createElement(PrefetchBalancesWrapper, {
    shouldFetchOnAccountUpdate: modalOpen
  }, /*#__PURE__*/React__default.createElement(Tooltip, {
    show: tooltipVisible && !modalOpen,
    placement: "bottom",
    offsetY: 14,
    text: numericalInputSettings === null || numericalInputSettings === void 0 ? void 0 : numericalInputSettings.disabledTooltipBody
  }, /*#__PURE__*/React__default.createElement(CurrencySelect, {
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
  }, /*#__PURE__*/React__default.createElement(Aligner, null, /*#__PURE__*/React__default.createElement(RowFixed, null, pair ? /*#__PURE__*/React__default.createElement(StyledTokenName, {
    className: "pair-name-container"
  }, pair === null || pair === void 0 ? void 0 : pair.token0.symbol, ":", pair === null || pair === void 0 ? void 0 : pair.token1.symbol) : /*#__PURE__*/React__default.createElement(StyledTokenName, {
    className: "token-symbol-container",
    active: Boolean(currency && currency.symbol)
  }, (currency && currency.symbol && currency.symbol.length > 20 ? currency.symbol.slice(0, 4) + "..." + currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length) : currency === null || currency === void 0 ? void 0 : currency.symbol) || /*#__PURE__*/React__default.createElement(Trans, {
    id: "0RrIzN",
    message: "Select token"
  }))), onCurrencySelect && /*#__PURE__*/React__default.createElement(StyledDropDown, {
    selected: !!currency
  })))))), Boolean(!hideInput && !hideBalance) && /*#__PURE__*/React__default.createElement(FiatRow, null, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(LoadingOpacityContainer, {
    $loading: loading
  }, fiatValue && /*#__PURE__*/React__default.createElement(FiatValue, {
    fiatValue: fiatValue,
    priceImpact: priceImpact
  })), account ? /*#__PURE__*/React__default.createElement(RowFixed, {
    style: {
      height: "16px"
    }
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBody, {
    "data-testid": "balance-text",
    color: theme.neutral2,
    fontWeight: 485,
    fontSize: 14,
    style: {
      display: "inline"
    }
  }, !hideBalance && currency && selectedCurrencyBalance ? renderBalance ? renderBalance(selectedCurrencyBalance) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "VuFd5C",
    message: "Balance: {0}",
    values: {
      "0": formatCurrencyAmount({
        amount: selectedCurrencyBalance,
        type: NumberType.TokenNonTx
      })
    }
  }) : null)) : /*#__PURE__*/React__default.createElement("span", null)))), onCurrencySelect && /*#__PURE__*/React__default.createElement(CurrencySearchModal, {
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

export { SwapCurrencyInputPanel as default };
