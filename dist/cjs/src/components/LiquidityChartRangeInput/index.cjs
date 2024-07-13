'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var _defineProperty = require('@babel/runtime/helpers/defineProperty');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var v3Sdk = require('@uniswap/v3-sdk');
var index = require('../Column/index.cjs');
var LoadingSpinner = require('../Icons/LoadingSpinner.cjs');
var d3 = require('d3');
var useColor = require('../../hooks/useColor.cjs');
var polished = require('polished');
var reactFeather = require('react-feather');
var reactRedux = require('react-redux');
var actions = require('../../state/mint/v3/actions.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var Chart = require('./Chart.cjs');
var hooks = require('./hooks.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var _defineProperty__default = /*#__PURE__*/_interopDefaultLegacy(_defineProperty);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var ZOOM_LEVELS = _defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"](_defineProperty__default["default"]({}, v3Sdk.FeeAmount.LOWEST, {
  initialMin: 0.999,
  initialMax: 1.001,
  min: 0.00001,
  max: 1.5
}), v3Sdk.FeeAmount.LOW, {
  initialMin: 0.999,
  initialMax: 1.001,
  min: 0.00001,
  max: 1.5
}), v3Sdk.FeeAmount.MEDIUM, {
  initialMin: 0.5,
  initialMax: 2,
  min: 0.00001,
  max: 20
}), v3Sdk.FeeAmount.HIGH, {
  initialMin: 0.5,
  initialMax: 2,
  min: 0.00001,
  max: 20
});
var ChartWrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  width: 100%;\n  max-height: 200px;\n  justify-content: center;\n  align-content: center;\n"])));
function InfoBox(_ref) {
  var message = _ref.message,
    icon = _ref.icon;
  return /*#__PURE__*/React__default["default"].createElement(index.ColumnCenter, {
    style: {
      height: "100%",
      justifyContent: "center"
    }
  }, icon, message && /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMediumHeader, {
    padding: 10,
    marginTop: "20px",
    textAlign: "center"
  }, message));
}
function LiquidityChartRangeInput(_ref2) {
  var _saturate, _saturate2;
  var currencyA = _ref2.currencyA,
    currencyB = _ref2.currencyB,
    feeAmount = _ref2.feeAmount,
    ticksAtLimit = _ref2.ticksAtLimit,
    price = _ref2.price,
    priceLower = _ref2.priceLower,
    priceUpper = _ref2.priceUpper,
    onLeftRangeInput = _ref2.onLeftRangeInput,
    onRightRangeInput = _ref2.onRightRangeInput,
    interactive = _ref2.interactive;
  var theme = styled.useTheme();
  var tokenAColor = useColor.useColor(currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped);
  var tokenBColor = useColor.useColor(currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped);
  var isSorted = currencyA && currencyB && (currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped.sortsBefore(currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped));
  var _useDensityChartData = hooks.useDensityChartData({
      currencyA: currencyA,
      currencyB: currencyB,
      feeAmount: feeAmount
    }),
    isLoading = _useDensityChartData.isLoading,
    error = _useDensityChartData.error,
    formattedData = _useDensityChartData.formattedData;
  var onBrushDomainChangeEnded = React.useCallback(function (domain, mode) {
    var leftRangeValue = Number(domain[0]);
    var rightRangeValue = Number(domain[1]);
    if (leftRangeValue <= 0) {
      leftRangeValue = 1 / Math.pow(10, 6);
    }
    reactRedux.batch(function () {
      // simulate user input for auto-formatting and other validations
      if ((!ticksAtLimit[isSorted ? actions.Bound.LOWER : actions.Bound.UPPER] || mode === "handle" || mode === "reset") && leftRangeValue > 0) {
        onLeftRangeInput(leftRangeValue.toFixed(6));
      }
      if ((!ticksAtLimit[isSorted ? actions.Bound.UPPER : actions.Bound.LOWER] || mode === "reset") && rightRangeValue > 0) {
        // todo: remove this check. Upper bound for large numbers
        // sometimes fails to parse to tick.
        if (rightRangeValue < 1e35) {
          onRightRangeInput(rightRangeValue.toFixed(6));
        }
      }
    });
  }, [isSorted, onLeftRangeInput, onRightRangeInput, ticksAtLimit]);
  interactive = interactive && Boolean(formattedData === null || formattedData === void 0 ? void 0 : formattedData.length);
  var brushDomain = React.useMemo(function () {
    var leftPrice = isSorted ? priceLower : priceUpper === null || priceUpper === void 0 ? void 0 : priceUpper.invert();
    var rightPrice = isSorted ? priceUpper : priceLower === null || priceLower === void 0 ? void 0 : priceLower.invert();
    return leftPrice && rightPrice ? [parseFloat(leftPrice === null || leftPrice === void 0 ? void 0 : leftPrice.toSignificant(6)), parseFloat(rightPrice === null || rightPrice === void 0 ? void 0 : rightPrice.toSignificant(6))] : undefined;
  }, [isSorted, priceLower, priceUpper]);
  var brushLabelValue = React.useCallback(function (d, x) {
    if (!price) return "";
    if (d === "w" && ticksAtLimit[isSorted ? actions.Bound.LOWER : actions.Bound.UPPER]) return "0";
    if (d === "e" && ticksAtLimit[isSorted ? actions.Bound.UPPER : actions.Bound.LOWER]) return "∞";
    var percent = (x < price ? -1 : 1) * ((Math.max(x, price) - Math.min(x, price)) / price) * 100;
    return price ? "".concat(d3.format(Math.abs(percent) > 1 ? ".2~s" : ".2~f")(percent), "%") : "";
  }, [isSorted, price, ticksAtLimit]);
  var isUninitialized = !currencyA || !currencyB || formattedData === undefined && !isLoading;
  return /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "md",
    style: {
      minHeight: "200px"
    }
  }, isUninitialized ? /*#__PURE__*/React__default["default"].createElement(InfoBox, {
    message: /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
      id: "OZUH85",
      message: "Your position will appear here."
    }),
    icon: /*#__PURE__*/React__default["default"].createElement(reactFeather.Inbox, {
      size: 56,
      stroke: theme.neutral1
    })
  }) : isLoading ? /*#__PURE__*/React__default["default"].createElement(InfoBox, {
    icon: /*#__PURE__*/React__default["default"].createElement(LoadingSpinner["default"], {
      size: "40px",
      stroke: theme.neutral2
    })
  }) : error ? /*#__PURE__*/React__default["default"].createElement(InfoBox, {
    message: /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
      id: "79D0qY",
      message: "Liquidity data not available."
    }),
    icon: /*#__PURE__*/React__default["default"].createElement(reactFeather.CloudOff, {
      size: 56,
      stroke: theme.neutral2
    })
  }) : !formattedData || formattedData.length === 0 || !price ? /*#__PURE__*/React__default["default"].createElement(InfoBox, {
    message: /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
      id: "rH6vg9",
      message: "There is no liquidity data."
    }),
    icon: /*#__PURE__*/React__default["default"].createElement(reactFeather.BarChart2, {
      size: 56,
      stroke: theme.neutral2
    })
  }) : /*#__PURE__*/React__default["default"].createElement(ChartWrapper, null, /*#__PURE__*/React__default["default"].createElement(Chart.Chart, {
    data: {
      series: formattedData,
      current: price
    },
    dimensions: {
      width: 560,
      height: 200
    },
    margins: {
      top: 10,
      right: 2,
      bottom: 20,
      left: 0
    },
    styles: {
      area: {
        selection: theme.accent1
      },
      brush: {
        handle: {
          west: (_saturate = polished.saturate(0.1, tokenAColor)) !== null && _saturate !== void 0 ? _saturate : theme.critical,
          east: (_saturate2 = polished.saturate(0.1, tokenBColor)) !== null && _saturate2 !== void 0 ? _saturate2 : theme.accent1
        }
      }
    },
    interactive: interactive,
    brushLabels: brushLabelValue,
    brushDomain: brushDomain,
    onBrushDomainChange: onBrushDomainChangeEnded,
    zoomLevels: ZOOM_LEVELS[feeAmount !== null && feeAmount !== void 0 ? feeAmount : v3Sdk.FeeAmount.MEDIUM],
    ticksAtLimit: ticksAtLimit
  })));
}

module.exports = LiquidityChartRangeInput;
