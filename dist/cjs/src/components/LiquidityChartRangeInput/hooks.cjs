'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var usePoolTickData = require('../../hooks/usePoolTickData.cjs');
var React = require('react');

function useDensityChartData(_ref) {
  var currencyA = _ref.currencyA,
    currencyB = _ref.currencyB,
    feeAmount = _ref.feeAmount;
  var _usePoolActiveLiquidi = usePoolTickData.usePoolActiveLiquidity(currencyA, currencyB, feeAmount),
    isLoading = _usePoolActiveLiquidi.isLoading,
    error = _usePoolActiveLiquidi.error,
    data = _usePoolActiveLiquidi.data;
  var formatData = React.useCallback(function () {
    if (!(data !== null && data !== void 0 && data.length)) {
      return undefined;
    }
    var newData = [];
    for (var i = 0; i < data.length; i++) {
      var t = data[i];
      var chartEntry = {
        activeLiquidity: parseFloat(t.liquidityActive.toString()),
        price0: parseFloat(t.price0)
      };
      if (chartEntry.activeLiquidity > 0) {
        newData.push(chartEntry);
      }
    }
    return newData;
  }, [data]);
  return React.useMemo(function () {
    return {
      isLoading: isLoading,
      error: error,
      formattedData: !isLoading ? formatData() : undefined
    };
  }, [isLoading, error, formatData]);
}

exports.useDensityChartData = useDensityChartData;
