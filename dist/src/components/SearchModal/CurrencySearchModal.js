import React__default, { memo, useState, useEffect, useCallback } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import TokenSafety from '../TokenSafety/index.js';
import { useUserAddedTokens } from '../../state/user/useUserAddedTokens.js';
import useLast from '../../hooks/useLast.js';
import { useWindowSize } from '../../hooks/useWindowSize.js';
import Modal from '../Modal/index.js';
import { CurrencySearch } from './CurrencySearch.js';

var CurrencyModalView = /*#__PURE__*/function (CurrencyModalView) {
  CurrencyModalView[CurrencyModalView["search"] = 0] = "search";
  CurrencyModalView[CurrencyModalView["importToken"] = 1] = "importToken";
  CurrencyModalView[CurrencyModalView["tokenSafety"] = 2] = "tokenSafety";
  return CurrencyModalView;
}(CurrencyModalView || {});
var CurrencySearchModal = /*#__PURE__*/memo(function CurrencySearchModal(_ref) {
  var isOpen = _ref.isOpen,
    onDismiss = _ref.onDismiss,
    onCurrencySelect = _ref.onCurrencySelect,
    selectedCurrency = _ref.selectedCurrency,
    otherSelectedCurrency = _ref.otherSelectedCurrency,
    _ref$showCommonBases = _ref.showCommonBases,
    showCommonBases = _ref$showCommonBases === void 0 ? false : _ref$showCommonBases,
    _ref$showCurrencyAmou = _ref.showCurrencyAmount,
    showCurrencyAmount = _ref$showCurrencyAmou === void 0 ? true : _ref$showCurrencyAmou,
    _ref$disableNonToken = _ref.disableNonToken,
    disableNonToken = _ref$disableNonToken === void 0 ? false : _ref$disableNonToken,
    _ref$onlyShowCurrenci = _ref.onlyShowCurrenciesWithBalance,
    onlyShowCurrenciesWithBalance = _ref$onlyShowCurrenci === void 0 ? false : _ref$onlyShowCurrenci;
  var _useState = useState(CurrencyModalView.search),
    _useState2 = _slicedToArray(_useState, 2),
    modalView = _useState2[0],
    setModalView = _useState2[1];
  var lastOpen = useLast(isOpen);
  var userAddedTokens = useUserAddedTokens();
  useEffect(function () {
    if (isOpen && !lastOpen) {
      setModalView(CurrencyModalView.search);
    }
  }, [isOpen, lastOpen]);
  var showTokenSafetySpeedbump = function showTokenSafetySpeedbump(token) {
    setWarningToken(token);
    setModalView(CurrencyModalView.tokenSafety);
  };
  var handleCurrencySelect = useCallback(function (currency, hasWarning) {
    if (hasWarning && currency.isToken && !userAddedTokens.find(function (token) {
      return token.equals(currency);
    })) {
      showTokenSafetySpeedbump(currency);
    } else {
      onCurrencySelect(currency);
      onDismiss();
    }
  }, [onDismiss, onCurrencySelect, userAddedTokens]);
  // used for token safety
  var _useState3 = useState(),
    _useState4 = _slicedToArray(_useState3, 2),
    warningToken = _useState4[0],
    setWarningToken = _useState4[1];
  var _useWindowSize = useWindowSize(),
    windowHeight = _useWindowSize.height;
  // change min height if not searching
  var modalHeight = 80;
  var content = null;
  switch (modalView) {
    case CurrencyModalView.search:
      if (windowHeight) {
        // Converts pixel units to vh for Modal component
        modalHeight = Math.min(Math.round(680 / windowHeight * 100), 80);
      }
      content = /*#__PURE__*/React__default.createElement(CurrencySearch, {
        isOpen: isOpen,
        onDismiss: onDismiss,
        onCurrencySelect: handleCurrencySelect,
        selectedCurrency: selectedCurrency,
        otherSelectedCurrency: otherSelectedCurrency,
        showCommonBases: showCommonBases,
        showCurrencyAmount: showCurrencyAmount,
        disableNonToken: disableNonToken,
        onlyShowCurrenciesWithBalance: onlyShowCurrenciesWithBalance
      });
      break;
    case CurrencyModalView.tokenSafety:
      modalHeight = undefined;
      if (warningToken) {
        content = /*#__PURE__*/React__default.createElement(TokenSafety, {
          tokenAddress: warningToken.address,
          onContinue: function onContinue() {
            return handleCurrencySelect(warningToken);
          },
          onCancel: function onCancel() {
            return setModalView(CurrencyModalView.search);
          },
          showCancel: true
        });
      }
      break;
  }
  return /*#__PURE__*/React__default.createElement(Modal, {
    isOpen: isOpen,
    onDismiss: onDismiss,
    height: modalHeight
  }, content);
});

export { CurrencySearchModal as default };
