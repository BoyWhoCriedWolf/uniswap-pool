'use strict';

var React = require('react');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$4 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var analyticsEvents = require('@uniswap/analytics-events');
var v3Sdk = require('@uniswap/v3-sdk');
var core = require('@web3-react/core');
var index$1 = require('../../analytics/index.cjs');
var index$5 = require('../Button/index.cjs');
var index = require('../Card/index.cjs');
var index$2 = require('../Column/index.cjs');
var index$3 = require('../Row/index.cjs');
var useFeeTierDistribution = require('../../hooks/useFeeTierDistribution.cjs');
var usePools = require('../../hooks/usePools.cjs');
var usePrevious = require('../../hooks/usePrevious.cjs');
var styled$1 = require('../../pages/AddLiquidity/styled.cjs');
var rebass = require('rebass');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var FeeOption = require('./FeeOption.cjs');
var FeeTierPercentageBadge = require('./FeeTierPercentageBadge.cjs');
var shared = require('./shared.cjs');
var text = require('../../theme/components/text.cjs');
var analytics = require('@uniswap/analytics');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty__default["default"](target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var pulse = function pulse(color) {
  return styled.keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  0% {\n    box-shadow: 0 0 0 0 ", ";\n  }\n\n  70% {\n    box-shadow: 0 0 0 2px ", ";\n  }\n\n  100% {\n    box-shadow: 0 0 0 0 ", ";\n  }\n"])), color, color, color);
};
var FocusedOutlineCard = styled__default["default"](index["default"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  border: 1px solid ", ";\n  animation: ", " 0.6s\n    linear;\n  align-self: center;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
}, function (_ref2) {
  var pulsing = _ref2.pulsing,
    theme = _ref2.theme;
  return pulsing && pulse(theme.accent1);
});
var Select = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  align-items: flex-start;\n  display: grid;\n  grid-auto-flow: column;\n  grid-gap: 8px;\n"])));
function FeeSelector(_ref3) {
  var _ref3$disabled = _ref3.disabled,
    disabled = _ref3$disabled === void 0 ? false : _ref3$disabled,
    feeAmount = _ref3.feeAmount,
    handleFeePoolSelect = _ref3.handleFeePoolSelect,
    currencyA = _ref3.currencyA,
    currencyB = _ref3.currencyB;
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var trace = analytics.useTrace();
  var _useFeeTierDistributi = useFeeTierDistribution.useFeeTierDistribution(currencyA, currencyB),
    isLoading = _useFeeTierDistributi.isLoading,
    isError = _useFeeTierDistributi.isError,
    largestUsageFeeTier = _useFeeTierDistributi.largestUsageFeeTier,
    distributions = _useFeeTierDistributi.distributions;

  // get pool data on-chain for latest states
  var pools = usePools.usePools([[currencyA, currencyB, v3Sdk.FeeAmount.LOWEST], [currencyA, currencyB, v3Sdk.FeeAmount.LOW], [currencyA, currencyB, v3Sdk.FeeAmount.MEDIUM], [currencyA, currencyB, v3Sdk.FeeAmount.HIGH]]);
  var poolsByFeeTier = React.useMemo(function () {
    return pools.reduce(function (acc, _ref4) {
      var _ref5 = _slicedToArray__default["default"](_ref4, 2),
        curPoolState = _ref5[0],
        curPool = _ref5[1];
      acc = _objectSpread(_objectSpread({}, acc), _defineProperty__default["default"]({}, curPool === null || curPool === void 0 ? void 0 : curPool.fee, curPoolState));
      return acc;
    }, _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, v3Sdk.FeeAmount.LOWEST, usePools.PoolState.NOT_EXISTS), v3Sdk.FeeAmount.LOW, usePools.PoolState.NOT_EXISTS), v3Sdk.FeeAmount.MEDIUM, usePools.PoolState.NOT_EXISTS), v3Sdk.FeeAmount.HIGH, usePools.PoolState.NOT_EXISTS));
  }, [pools]);
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    showOptions = _useState2[0],
    setShowOptions = _useState2[1];
  var _useState3 = React.useState(false),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    pulsing = _useState4[0],
    setPulsing = _useState4[1];
  var previousFeeAmount = usePrevious(feeAmount);
  var recommended = React.useRef(false);
  var handleFeePoolSelectWithEvent = React.useCallback(function (fee) {
    index$1.sendAnalyticsEvent(analyticsEvents.LiquidityEventName.SELECT_LIQUIDITY_POOL_FEE_TIER, _objectSpread({
      action: analyticsEvents.FeePoolSelectAction.MANUAL
    }, trace));
    handleFeePoolSelect(fee);
  }, [handleFeePoolSelect, trace]);
  React.useEffect(function () {
    if (feeAmount || isLoading || isError) {
      return;
    }
    if (!largestUsageFeeTier) {
      // cannot recommend, open options
      setShowOptions(true);
    } else {
      setShowOptions(false);
      recommended.current = true;
      index$1.sendAnalyticsEvent(analyticsEvents.LiquidityEventName.SELECT_LIQUIDITY_POOL_FEE_TIER, _objectSpread({
        action: analyticsEvents.FeePoolSelectAction.RECOMMENDED
      }, trace));
      handleFeePoolSelect(largestUsageFeeTier);
    }
  }, [feeAmount, isLoading, isError, largestUsageFeeTier, handleFeePoolSelect, trace]);
  React.useEffect(function () {
    setShowOptions(isError);
  }, [isError]);
  React.useEffect(function () {
    if (feeAmount && previousFeeAmount !== feeAmount) {
      setPulsing(true);
    }
  }, [previousFeeAmount, feeAmount]);
  return /*#__PURE__*/React__default["default"].createElement(index$2.AutoColumn, {
    gap: "16px"
  }, /*#__PURE__*/React__default["default"].createElement(styled$1.DynamicSection, {
    gap: "md",
    disabled: disabled
  }, /*#__PURE__*/React__default["default"].createElement(FocusedOutlineCard, {
    pulsing: pulsing,
    onAnimationEnd: function onAnimationEnd() {
      return setPulsing(false);
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$3.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(index$2.AutoColumn, {
    id: "add-liquidity-selected-fee"
  }, !feeAmount ? /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "EU3wU4",
    message: "Fee tier"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    fontWeight: 485,
    fontSize: "12px",
    textAlign: "left"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "8ZKEXr",
    message: "The % you will earn in fees."
  }))) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, {
    className: "selected-fee-label"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "tMMG40",
    message: "{0}% fee tier",
    values: {
      "0": shared.FEE_AMOUNT_DETAIL[feeAmount].label
    }
  })), /*#__PURE__*/React__default["default"].createElement(rebass.Box, {
    style: {
      width: "fit-content",
      marginTop: "8px"
    },
    className: "selected-fee-percentage"
  }, distributions && /*#__PURE__*/React__default["default"].createElement(FeeTierPercentageBadge.FeeTierPercentageBadge, {
    distributions: distributions,
    feeAmount: feeAmount,
    poolState: poolsByFeeTier[feeAmount]
  })))), /*#__PURE__*/React__default["default"].createElement(index$5.ButtonGray, {
    onClick: function onClick() {
      return setShowOptions(!showOptions);
    },
    width: "auto",
    padding: "4px",
    $borderRadius: "6px"
  }, showOptions ? /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "vLyv1R",
    message: "Hide"
  }) : /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "ePK91l",
    message: "Edit"
  })))), chainId && showOptions && /*#__PURE__*/React__default["default"].createElement(Select, null, [v3Sdk.FeeAmount.LOWEST, v3Sdk.FeeAmount.LOW, v3Sdk.FeeAmount.MEDIUM, v3Sdk.FeeAmount.HIGH].map(function (_feeAmount, i) {
    var supportedChains = shared.FEE_AMOUNT_DETAIL[_feeAmount].supportedChains;
    if (supportedChains.includes(chainId)) {
      return /*#__PURE__*/React__default["default"].createElement(FeeOption.FeeOption, {
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

module.exports = FeeSelector;
