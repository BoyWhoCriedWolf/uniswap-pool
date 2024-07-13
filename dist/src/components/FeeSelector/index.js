import React__default, { useMemo, useState, useRef, useCallback, useEffect } from 'react';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { FeePoolSelectAction, LiquidityEventName } from '@uniswap/analytics-events';
import { FeeAmount } from '@uniswap/v3-sdk';
import { useWeb3React } from '@web3-react/core';
import { sendAnalyticsEvent } from '../../analytics/index.js';
import { ButtonGray } from '../Button/index.js';
import Card from '../Card/index.js';
import { AutoColumn } from '../Column/index.js';
import { RowBetween } from '../Row/index.js';
import { useFeeTierDistribution } from '../../hooks/useFeeTierDistribution.js';
import { usePools, PoolState } from '../../hooks/usePools.js';
import usePrevious from '../../hooks/usePrevious.js';
import { DynamicSection } from '../../pages/AddLiquidity/styled.js';
import { Box } from 'rebass';
import styled, { keyframes } from 'styled-components';
import '../../theme/components/index.js';
import { FeeOption } from './FeeOption.js';
import { FeeTierPercentageBadge } from './FeeTierPercentageBadge.js';
import { FEE_AMOUNT_DETAIL } from './shared.js';
import { ThemedText } from '../../theme/components/text.js';
import { useTrace } from '@uniswap/analytics';

var _templateObject, _templateObject2, _templateObject3;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var pulse = function pulse(color) {
  return keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  0% {\n    box-shadow: 0 0 0 0 ", ";\n  }\n\n  70% {\n    box-shadow: 0 0 0 2px ", ";\n  }\n\n  100% {\n    box-shadow: 0 0 0 0 ", ";\n  }\n"])), color, color, color);
};
var FocusedOutlineCard = styled(Card)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  border: 1px solid ", ";\n  animation: ", " 0.6s\n    linear;\n  align-self: center;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
}, function (_ref2) {
  var pulsing = _ref2.pulsing,
    theme = _ref2.theme;
  return pulsing && pulse(theme.accent1);
});
var Select = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  align-items: flex-start;\n  display: grid;\n  grid-auto-flow: column;\n  grid-gap: 8px;\n"])));
function FeeSelector(_ref3) {
  var _ref3$disabled = _ref3.disabled,
    disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
    feeAmount = _ref3.feeAmount,
    handleFeePoolSelect = _ref3.handleFeePoolSelect,
    currencyA = _ref3.currencyA,
    currencyB = _ref3.currencyB;
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var trace = useTrace();
  var _useFeeTierDistributi = useFeeTierDistribution(currencyA, currencyB),
    isLoading = _useFeeTierDistributi.isLoading,
    isError = _useFeeTierDistributi.isError,
    largestUsageFeeTier = _useFeeTierDistributi.largestUsageFeeTier,
    distributions = _useFeeTierDistributi.distributions;

  // get pool data on-chain for latest states
  var pools = usePools([[currencyA, currencyB, FeeAmount.LOWEST], [currencyA, currencyB, FeeAmount.LOW], [currencyA, currencyB, FeeAmount.MEDIUM], [currencyA, currencyB, FeeAmount.HIGH]]);
  var poolsByFeeTier = useMemo(function () {
    return pools.reduce(function (acc, _ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
        curPoolState = _ref5[0],
        curPool = _ref5[1];
      acc = _objectSpread(_objectSpread({}, acc), _defineProperty({}, curPool === null || curPool === void 0 ? void 0 : curPool.fee, curPoolState));
      return acc;
    }, _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, FeeAmount.LOWEST, PoolState.NOT_EXISTS), FeeAmount.LOW, PoolState.NOT_EXISTS), FeeAmount.MEDIUM, PoolState.NOT_EXISTS), FeeAmount.HIGH, PoolState.NOT_EXISTS));
  }, [pools]);
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showOptions = _useState2[0],
    setShowOptions = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    pulsing = _useState4[0],
    setPulsing = _useState4[1];
  var previousFeeAmount = usePrevious(feeAmount);
  var recommended = useRef(false);
  var handleFeePoolSelectWithEvent = useCallback(function (fee) {
    sendAnalyticsEvent(LiquidityEventName.SELECT_LIQUIDITY_POOL_FEE_TIER, _objectSpread({
      action: FeePoolSelectAction.MANUAL
    }, trace));
    handleFeePoolSelect(fee);
  }, [handleFeePoolSelect, trace]);
  useEffect(function () {
    if (feeAmount || isLoading || isError) {
      return;
    }
    if (!largestUsageFeeTier) {
      // cannot recommend, open options
      setShowOptions(true);
    } else {
      setShowOptions(false);
      recommended.current = true;
      sendAnalyticsEvent(LiquidityEventName.SELECT_LIQUIDITY_POOL_FEE_TIER, _objectSpread({
        action: FeePoolSelectAction.RECOMMENDED
      }, trace));
      handleFeePoolSelect(largestUsageFeeTier);
    }
  }, [feeAmount, isLoading, isError, largestUsageFeeTier, handleFeePoolSelect, trace]);
  useEffect(function () {
    setShowOptions(isError);
  }, [isError]);
  useEffect(function () {
    if (feeAmount && previousFeeAmount !== feeAmount) {
      setPulsing(true);
    }
  }, [previousFeeAmount, feeAmount]);
  return /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "16px"
  }, /*#__PURE__*/React__default.createElement(DynamicSection, {
    gap: "md",
    disabled: disabled
  }, /*#__PURE__*/React__default.createElement(FocusedOutlineCard, {
    pulsing: pulsing,
    onAnimationEnd: function onAnimationEnd() {
      return setPulsing(false);
    }
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(AutoColumn, {
    id: "add-liquidity-selected-fee"
  }, !feeAmount ? /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "EU3wU4",
    message: "Fee tier"
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    fontWeight: 485,
    fontSize: "12px",
    textAlign: "left"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "8ZKEXr",
    message: "The % you will earn in fees."
  }))) : /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, {
    className: "selected-fee-label"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "tMMG40",
    message: "{0}% fee tier",
    values: {
      "0": FEE_AMOUNT_DETAIL[feeAmount].label
    }
  })), /*#__PURE__*/React__default.createElement(Box, {
    style: {
      width: "fit-content",
      marginTop: "8px"
    },
    className: "selected-fee-percentage"
  }, distributions && /*#__PURE__*/React__default.createElement(FeeTierPercentageBadge, {
    distributions: distributions,
    feeAmount: feeAmount,
    poolState: poolsByFeeTier[feeAmount]
  })))), /*#__PURE__*/React__default.createElement(ButtonGray, {
    onClick: function onClick() {
      return setShowOptions(!showOptions);
    },
    width: "auto",
    padding: "4px",
    $borderRadius: "6px"
  }, showOptions ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "vLyv1R",
    message: "Hide"
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "ePK91l",
    message: "Edit"
  })))), chainId && showOptions && /*#__PURE__*/React__default.createElement(Select, null, [FeeAmount.LOWEST, FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.HIGH].map(function (_feeAmount, i) {
    var supportedChains = FEE_AMOUNT_DETAIL[_feeAmount].supportedChains;
    if (supportedChains.includes(chainId)) {
      return /*#__PURE__*/React__default.createElement(FeeOption, {
        feeAmount: _feeAmount,
        active: feeAmount === _feeAmount,
        onClick: function onClick() {
          return handleFeePoolSelectWithEvent(_feeAmount);
        },
        distributions: distributions,
        poolState: poolsByFeeTier[_feeAmount],
        key: i
      });
    }
    return null;
  }))));
}

export { FeeSelector as default };
