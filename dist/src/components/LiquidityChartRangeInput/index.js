import React__default, { useCallback, useMemo } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import _defineProperty from '@babel/runtime/helpers/defineProperty';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { FeeAmount } from '@uniswap/v3-sdk';
import { AutoColumn, ColumnCenter } from '../Column/index.js';
import Loader from '../Icons/LoadingSpinner.js';
import { format } from 'd3';
import { useColor } from '../../hooks/useColor.js';
import { saturate } from 'polished';
import { Inbox, CloudOff, BarChart2 } from 'react-feather';
import { batch } from 'react-redux';
import { Bound } from '../../state/mint/v3/actions.js';
import styled, { useTheme } from 'styled-components';
import '../../theme/components/index.js';
import { Chart } from './Chart.js';
import { useDensityChartData } from './hooks.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
var ZOOM_LEVELS = _defineProperty(_defineProperty(_defineProperty(_defineProperty({}, FeeAmount.LOWEST, {
  initialMin: 0.999,
  initialMax: 1.001,
  min: 0.00001,
  max: 1.5
}), FeeAmount.LOW, {
  initialMin: 0.999,
  initialMax: 1.001,
  min: 0.00001,
  max: 1.5
}), FeeAmount.MEDIUM, {
  initialMin: 0.5,
  initialMax: 2,
  min: 0.00001,
  max: 20
}), FeeAmount.HIGH, {
  initialMin: 0.5,
  initialMax: 2,
  min: 0.00001,
  max: 20
});
var ChartWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  width: 100%;\n  max-height: 200px;\n  justify-content: center;\n  align-content: center;\n"])));
function InfoBox(_ref) {
  var message = _ref.message,
    icon = _ref.icon;
  return /*#__PURE__*/React__default.createElement(ColumnCenter, {
    style: {
      height: "100%",
      justifyContent: "center"
    }
  }, icon, message && /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMediumHeader, {
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
  var theme = useTheme();
  var tokenAColor = useColor(currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped);
  var tokenBColor = useColor(currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped);
  var isSorted = currencyA && currencyB && (currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped.sortsBefore(currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped));
  var _useDensityChartData = useDensityChartData({
      currencyA: currencyA,
      currencyB: currencyB,
      feeAmount: feeAmount
    }),
    isLoading = _useDensityChartData.isLoading,
    error = _useDensityChartData.error,
    formattedData = _useDensityChartData.formattedData;
  var onBrushDomainChangeEnded = useCallback(function (domain, mode) {
    var leftRangeValue = Number(domain[0]);
    var rightRangeValue = Number(domain[1]);
    if (leftRangeValue <= 0) {
      leftRangeValue = 1 / Math.pow(10, 6);
    }
    batch(function () {
      // simulate user input for auto-formatting and other validations
      if ((!ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER] || mode === "handle" || mode === "reset") && leftRangeValue > 0) {
        onLeftRangeInput(leftRangeValue.toFixed(6));
      }
      if ((!ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER] || mode === "reset") && rightRangeValue > 0) {
        // todo: remove this check. Upper bound for large numbers
        // sometimes fails to parse to tick.
        if (rightRangeValue < 1e35) {
          onRightRangeInput(rightRangeValue.toFixed(6));
        }
      }
    });
  }, [isSorted, onLeftRangeInput, onRightRangeInput, ticksAtLimit]);
  interactive = interactive && Boolean(formattedData === null || formattedData === void 0 ? void 0 : formattedData.length);
  var brushDomain = useMemo(function () {
    var leftPrice = isSorted ? priceLower : priceUpper === null || priceUpper === void 0 ? void 0 : priceUpper.invert();
    var rightPrice = isSorted ? priceUpper : priceLower === null || priceLower === void 0 ? void 0 : priceLower.invert();
    return leftPrice && rightPrice ? [parseFloat(leftPrice === null || leftPrice === void 0 ? void 0 : leftPrice.toSignificant(6)), parseFloat(rightPrice === null || rightPrice === void 0 ? void 0 : rightPrice.toSignificant(6))] : undefined;
  }, [isSorted, priceLower, priceUpper]);
  var brushLabelValue = useCallback(function (d, x) {
    if (!price) return "";
    if (d === "w" && ticksAtLimit[isSorted ? Bound.LOWER : Bound.UPPER]) return "0";
    if (d === "e" && ticksAtLimit[isSorted ? Bound.UPPER : Bound.LOWER]) return "∞";
    var percent = (x < price ? -1 : 1) * ((Math.max(x, price) - Math.min(x, price)) / price) * 100;
    return price ? "".concat(format(Math.abs(percent) > 1 ? ".2~s" : ".2~f")(percent), "%") : "";
  }, [isSorted, price, ticksAtLimit]);
  var isUninitialized = !currencyA || !currencyB || formattedData === undefined && !isLoading;
  return /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md",
    style: {
      minHeight: "200px"
    }
  }, isUninitialized ? /*#__PURE__*/React__default.createElement(InfoBox, {
    message: /*#__PURE__*/React__default.createElement(Trans, {
      id: "OZUH85",
      message: "Your position will appear here."
    }),
    icon: /*#__PURE__*/React__default.createElement(Inbox, {
      size: 56,
      stroke: theme.neutral1
    })
  }) : isLoading ? /*#__PURE__*/React__default.createElement(InfoBox, {
    icon: /*#__PURE__*/React__default.createElement(Loader, {
      size: "40px",
      stroke: theme.neutral2
    })
  }) : error ? /*#__PURE__*/React__default.createElement(InfoBox, {
    message: /*#__PURE__*/React__default.createElement(Trans, {
      id: "79D0qY",
      message: "Liquidity data not available."
    }),
    icon: /*#__PURE__*/React__default.createElement(CloudOff, {
      size: 56,
      stroke: theme.neutral2
    })
  }) : !formattedData || formattedData.length === 0 || !price ? /*#__PURE__*/React__default.createElement(InfoBox, {
    message: /*#__PURE__*/React__default.createElement(Trans, {
      id: "rH6vg9",
      message: "There is no liquidity data."
    }),
    icon: /*#__PURE__*/React__default.createElement(BarChart2, {
      size: 56,
      stroke: theme.neutral2
    })
  }) : /*#__PURE__*/React__default.createElement(ChartWrapper, null, /*#__PURE__*/React__default.createElement(Chart, {
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
          west: (_saturate = saturate(0.1, tokenAColor)) !== null && _saturate !== void 0 ? _saturate : theme.critical,
          east: (_saturate2 = saturate(0.1, tokenBColor)) !== null && _saturate2 !== void 0 ? _saturate2 : theme.accent1
        }
      }
    },
    interactive: interactive,
    brushLabels: brushLabelValue,
    brushDomain: brushDomain,
    onBrushDomainChange: onBrushDomainChangeEnded,
    zoomLevels: ZOOM_LEVELS[feeAmount !== null && feeAmount !== void 0 ? feeAmount : FeeAmount.MEDIUM],
    ticksAtLimit: ticksAtLimit
  })));
}

export { LiquidityChartRangeInput as default };
