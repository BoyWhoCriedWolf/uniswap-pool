import React__default from 'react';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { ToggleWrapper, ToggleElement } from '../Toggle/MultiToggle.js';

// the order of displayed base currencies from left to right is always in sort order
// currencyA is treated as the preferred base currency
function RateToggle(_ref) {
  var currencyA = _ref.currencyA,
    currencyB = _ref.currencyB,
    handleRateToggle = _ref.handleRateToggle;
  var tokenA = currencyA === null || currencyA === void 0 ? void 0 : currencyA.wrapped;
  var tokenB = currencyB === null || currencyB === void 0 ? void 0 : currencyB.wrapped;
  var isSorted = tokenA && tokenB && tokenA.sortsBefore(tokenB);
  return tokenA && tokenB ? /*#__PURE__*/React__default.createElement("div", {
    style: {
      width: "fit-content",
      display: "flex",
      alignItems: "center"
    },
    onClick: handleRateToggle
  }, /*#__PURE__*/React__default.createElement(ToggleWrapper, {
    width: "fit-content"
  }, /*#__PURE__*/React__default.createElement(ToggleElement, {
    isActive: isSorted,
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "J/hVSQ",
    message: "{0}",
    values: {
      "0": isSorted ? currencyA.symbol : currencyB.symbol
    }
  })), /*#__PURE__*/React__default.createElement(ToggleElement, {
    isActive: !isSorted,
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "J/hVSQ",
    message: "{0}",
    values: {
      "0": isSorted ? currencyB.symbol : currencyA.symbol
    }
  })))) : null;
}

export { RateToggle as default };
