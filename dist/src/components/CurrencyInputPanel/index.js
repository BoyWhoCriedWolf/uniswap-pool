import React__default, { useState, useCallback } from 'react';
import _extends from '@babel/runtime/helpers/extends';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _objectWithoutProperties from '@babel/runtime/helpers/objectWithoutProperties';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { BrowserEvent, SwapEventName, InterfaceElementName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { TraceEvent } from '../../analytics/index.js';
import { loadingOpacityMixin, LoadingOpacityContainer } from '../Loader/styled.js';
import PrefetchBalancesWrapper from '../PrefetchBalancesWrapper/PrefetchBalancesWrapper.js';
import { isSupportedChain } from '../../constants/chains.js';
import { darken } from 'polished';
import styled, { useTheme } from 'styled-components';
import '../../theme/components/index.js';
import { flexColumnNoWrap, flexRowNoWrap } from '../../theme/styles.js';
import { formatCurrencyAmount } from '../../utils/formatCurrencyAmount.js';
import { ReactComponent as SvgDropdown } from '../../assets/images/dropdown.svg.js';
import useCurrencyBalance from '../../lib/hooks/useCurrencyBalance.js';
import { ButtonGray } from '../Button/index.js';
import DoubleCurrencyLogo from '../DoubleLogo/index.js';
import CurrencyLogo from '../Logo/CurrencyLogo.js';
import { Input as MemoizedInput } from '../NumericalInput/index.js';
import { RowFixed, RowBetween } from '../Row/index.js';
import CurrencySearchModal from '../SearchModal/CurrencySearchModal.js';
import { FiatValue } from './FiatValue.js';
import { ThemedText } from '../../theme/components/text.js';

var _excluded = ["value", "onUserInput", "onMax", "showMaxButton", "onCurrencySelect", "currency", "otherCurrency", "id", "showCommonBases", "showCurrencyAmount", "disableNonToken", "renderBalance", "fiatValue", "hideBalance", "pair", "hideInput", "locked", "loading"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12;
var InputPanel = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  ", ";\n  position: relative;\n  border-radius: ", ";\n  background-color: ", ";\n\n  z-index: 1;\n  width: ", ";\n  transition: height 1s ease;\n  will-change: height;\n"])), flexColumnNoWrap, function (_ref) {
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
var Container = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  border-radius: ", ";\n  border: 1px solid ", ";\n  background-color: ", ";\n  width: ", ";\n  ", "\n"])), function (_ref4) {
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
var CurrencySelect = styled(ButtonGray)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  align-items: center;\n  background-color: ", ";\n  opacity: ", ";\n  box-shadow: ", ";\n  color: ", ";\n  cursor: pointer;\n  border-radius: 16px;\n  outline: none;\n  user-select: none;\n  border: none;\n  font-size: 24px;\n  font-weight: 535;\n  height: ", ";\n  width: ", ";\n  padding: 0 8px;\n  justify-content: space-between;\n  margin-left: ", ";\n  :focus,\n  :hover {\n    background-color: ", ";\n  }\n  visibility: ", ";\n  ", "\n"])), function (_ref9) {
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
  return selected ? theme.surface2 : darken(0.05, theme.accent1);
}, function (_ref17) {
  var visible = _ref17.visible;
  return visible ? "visible" : "hidden";
}, function (_ref18) {
  var pointerEvents = _ref18.pointerEvents;
  return pointerEvents && "pointer-events: none";
});
var InputRow = styled.div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  ", ";\n  align-items: center;\n  justify-content: space-between;\n  padding: ", ";\n"])), flexRowNoWrap, function (_ref19) {
  var selected = _ref19.selected;
  return selected ? " 1rem 1rem 0.75rem 1rem" : "1rem 1rem 1rem 1rem";
});
var LabelRow = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  ", ";\n  align-items: center;\n  color: ", ";\n  font-size: 0.75rem;\n  line-height: 1rem;\n  padding: 0 1rem 1rem;\n  span:hover {\n    cursor: pointer;\n    color: ", ";\n  }\n"])), flexRowNoWrap, function (_ref20) {
  var theme = _ref20.theme;
  return theme.neutral1;
}, function (_ref21) {
  var theme = _ref21.theme;
  return darken(0.2, theme.neutral2);
});
var FiatRow = styled(LabelRow)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  justify-content: flex-end;\n  padding: 0px 1rem 0.75rem;\n  height: 32px;\n"])));

// note the line height 0 ensures even if we change font/font-size it doesn't break centering
var Aligner = styled.span(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  width: 100%;\n  line-height: 0px;\n"])));
var StyledDropDown = styled(SvgDropdown)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  margin: 0 0.25rem 0 0.35rem;\n  height: 35%;\n\n  path {\n    stroke: ", ";\n    stroke-width: 1.5px;\n  }\n"])), function (_ref22) {
  var selected = _ref22.selected,
    theme = _ref22.theme;
  return selected ? theme.neutral1 : theme.white;
});
var StyledTokenName = styled.span(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  ", "\n  font-size: 20px;\n"])), function (_ref23) {
  var active = _ref23.active;
  return active ? "  margin: 0 0.25rem 0 0.25rem;" : "  margin: 0 0.25rem 0 0.25rem;";
});
var StyledBalanceMax = styled.button(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  background-color: transparent;\n  background-color: ", ";\n  border: none;\n  border-radius: 12px;\n  color: ", ";\n  cursor: pointer;\n  font-size: 11px;\n  font-weight: 535;\n  margin-left: 0.25rem;\n  opacity: ", ";\n  padding: 4px 6px;\n  pointer-events: ", ";\n\n  :hover {\n    opacity: ", ";\n  }\n\n  :focus {\n    outline: none;\n  }\n"])), function (_ref24) {
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
var StyledNumericalInput = styled(MemoizedInput)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral(["\n  ", ";\n  text-align: left;\n"])), loadingOpacityMixin);
var StyledPrefetchBalancesWrapper = styled(PrefetchBalancesWrapper)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral(["\n  width: ", ";\n"])), function (_ref29) {
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
    rest = _objectWithoutProperties(_ref30, _excluded);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    modalOpen = _useState2[0],
    setModalOpen = _useState2[1];
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account,
    chainId = _useWeb3React.chainId;
  var selectedCurrencyBalance = useCurrencyBalance(account !== null && account !== void 0 ? account : undefined, currency !== null && currency !== void 0 ? currency : undefined);
  var theme = useTheme();
  var handleDismissSearch = useCallback(function () {
    setModalOpen(false);
  }, [setModalOpen]);
  var chainAllowed = isSupportedChain(chainId);
  return /*#__PURE__*/React__default.createElement(InputPanel, _extends({
    id: id,
    hideInput: hideInput
  }, rest), !locked && /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Container, {
    hideInput: hideInput,
    disabled: !chainAllowed
  }, /*#__PURE__*/React__default.createElement(InputRow, {
    style: hideInput ? {
      padding: "0",
      borderRadius: "8px"
    } : {},
    selected: !onCurrencySelect
  }, !hideInput && /*#__PURE__*/React__default.createElement(StyledNumericalInput, {
    className: "token-amount-input",
    value: value,
    onUserInput: onUserInput,
    disabled: !chainAllowed,
    $loading: loading
  }), /*#__PURE__*/React__default.createElement(StyledPrefetchBalancesWrapper, {
    shouldFetchOnAccountUpdate: modalOpen,
    $fullWidth: hideInput
  }, /*#__PURE__*/React__default.createElement(CurrencySelect, {
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
  }, /*#__PURE__*/React__default.createElement(Aligner, null, /*#__PURE__*/React__default.createElement(RowFixed, null, pair ? /*#__PURE__*/React__default.createElement("span", {
    style: {
      marginRight: "0.5rem"
    }
  }, /*#__PURE__*/React__default.createElement(DoubleCurrencyLogo, {
    currency0: pair.token0,
    currency1: pair.token1,
    size: 24,
    margin: true
  })) : currency && /*#__PURE__*/React__default.createElement(CurrencyLogo, {
    style: {
      marginRight: "0.5rem"
    },
    currency: currency,
    size: "24px"
  }), pair ? /*#__PURE__*/React__default.createElement(StyledTokenName, {
    className: "pair-name-container"
  }, pair === null || pair === void 0 ? void 0 : pair.token0.symbol, ":", pair === null || pair === void 0 ? void 0 : pair.token1.symbol) : /*#__PURE__*/React__default.createElement(StyledTokenName, {
    className: "token-symbol-container",
    active: Boolean(currency && currency.symbol)
  }, (currency && currency.symbol && currency.symbol.length > 20 ? currency.symbol.slice(0, 4) + "..." + currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length) : currency === null || currency === void 0 ? void 0 : currency.symbol) || /*#__PURE__*/React__default.createElement(Trans, {
    id: "T0Y2+3",
    message: "Select a token"
  }))), onCurrencySelect && /*#__PURE__*/React__default.createElement(StyledDropDown, {
    selected: !!currency
  }))))), Boolean(!hideInput && !hideBalance && currency) && /*#__PURE__*/React__default.createElement(FiatRow, null, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(LoadingOpacityContainer, {
    $loading: loading
  }, fiatValue && /*#__PURE__*/React__default.createElement(FiatValue, {
    fiatValue: fiatValue
  })), account && /*#__PURE__*/React__default.createElement(RowFixed, {
    style: {
      height: "17px"
    }
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBody, {
    onClick: onMax,
    color: theme.neutral3,
    fontWeight: 535,
    fontSize: 14,
    style: {
      display: "inline",
      cursor: "pointer"
    }
  }, Boolean(!hideBalance && currency && selectedCurrencyBalance) && ((renderBalance === null || renderBalance === void 0 ? void 0 : renderBalance(selectedCurrencyBalance)) || /*#__PURE__*/React__default.createElement(Trans, {
    id: "VuFd5C",
    message: "Balance: {0}",
    values: {
      "0": formatCurrencyAmount(selectedCurrencyBalance, 4)
    }
  }))), Boolean(showMaxButton && selectedCurrencyBalance) && /*#__PURE__*/React__default.createElement(TraceEvent, {
    events: [BrowserEvent.onClick],
    name: SwapEventName.SWAP_MAX_TOKEN_AMOUNT_SELECTED,
    element: InterfaceElementName.MAX_TOKEN_AMOUNT_BUTTON
  }, /*#__PURE__*/React__default.createElement(StyledBalanceMax, {
    onClick: onMax
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "4HtGBb",
    message: "MAX"
  })))))))), onCurrencySelect && /*#__PURE__*/React__default.createElement(CurrencySearchModal, {
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

export { CurrencyInputPanel as default };
