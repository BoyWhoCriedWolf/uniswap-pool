import React__default, { useState, useCallback } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import RangeBadge from '../Badge/RangeBadge.js';
import { LightCard } from '../Card/index.js';
import { AutoColumn } from '../Column/index.js';
import DoubleCurrencyLogo from '../DoubleLogo/index.js';
import { Break } from '../earn/styled.js';
import CurrencyLogo from '../Logo/CurrencyLogo.js';
import RateToggle from '../RateToggle/index.js';
import { RowBetween, RowFixed } from '../Row/index.js';
import JSBI from 'jsbi';
import { Bound } from '../../state/mint/v3/actions.js';
import { useTheme } from 'styled-components';
import '../../theme/components/index.js';
import { useFormatter } from '../../utils/formatNumbers.js';
import { unwrappedToken } from '../../utils/unwrappedToken.js';
import { ThemedText } from '../../theme/components/text.js';

var PositionPreview = function PositionPreview(_ref) {
  var _position$pool;
  var position = _ref.position,
    title = _ref.title,
    inRange = _ref.inRange,
    baseCurrencyDefault = _ref.baseCurrencyDefault,
    ticksAtLimit = _ref.ticksAtLimit;
  var theme = useTheme();
  var _useFormatter = useFormatter(),
    formatTickPrice = _useFormatter.formatTickPrice;
  var currency0 = unwrappedToken(position.pool.token0);
  var currency1 = unwrappedToken(position.pool.token1);

  // track which currency should be base
  var _useState = useState(baseCurrencyDefault ? baseCurrencyDefault === currency0 ? currency0 : baseCurrencyDefault === currency1 ? currency1 : currency0 : currency0),
    _useState2 = _slicedToArray(_useState, 2),
    baseCurrency = _useState2[0],
    setBaseCurrency = _useState2[1];
  var sorted = baseCurrency === currency0;
  var quoteCurrency = sorted ? currency1 : currency0;
  var price = sorted ? position.pool.priceOf(position.pool.token0) : position.pool.priceOf(position.pool.token1);
  var priceLower = sorted ? position.token0PriceLower : position.token0PriceUpper.invert();
  var priceUpper = sorted ? position.token0PriceUpper : position.token0PriceLower.invert();
  var handleRateChange = useCallback(function () {
    setBaseCurrency(quoteCurrency);
  }, [quoteCurrency]);
  var removed = (position === null || position === void 0 ? void 0 : position.liquidity) && JSBI.equal(position === null || position === void 0 ? void 0 : position.liquidity, JSBI.BigInt(0));
  return /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md",
    style: {
      marginTop: "0.5rem"
    }
  }, /*#__PURE__*/React__default.createElement(RowBetween, {
    style: {
      marginBottom: "0.5rem"
    }
  }, /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(DoubleCurrencyLogo, {
    currency0: currency0 !== null && currency0 !== void 0 ? currency0 : undefined,
    currency1: currency1 !== null && currency1 !== void 0 ? currency1 : undefined,
    size: 24,
    margin: true
  }), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, {
    ml: "10px",
    fontSize: "24px"
  }, currency0 === null || currency0 === void 0 ? void 0 : currency0.symbol, " / ", currency1 === null || currency1 === void 0 ? void 0 : currency1.symbol)), /*#__PURE__*/React__default.createElement(RangeBadge, {
    removed: removed,
    inRange: inRange
  })), /*#__PURE__*/React__default.createElement(LightCard, null, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(CurrencyLogo, {
    currency: currency0
  }), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, {
    ml: "8px"
  }, currency0 === null || currency0 === void 0 ? void 0 : currency0.symbol)), /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, {
    mr: "8px"
  }, position.amount0.toSignificant(4)))), /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(CurrencyLogo, {
    currency: currency1
  }), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, {
    ml: "8px"
  }, currency1 === null || currency1 === void 0 ? void 0 : currency1.symbol)), /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, {
    mr: "8px"
  }, position.amount1.toSignificant(4)))), /*#__PURE__*/React__default.createElement(Break, null), /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "EU3wU4",
    message: "Fee tier"
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "hbO8db",
    message: "{0}%",
    values: {
      "0": (position === null || position === void 0 || (_position$pool = position.pool) === null || _position$pool === void 0 ? void 0 : _position$pool.fee) / 10000
    }
  }))))), /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "md"
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, title ? /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, null, title) : /*#__PURE__*/React__default.createElement("div", null), /*#__PURE__*/React__default.createElement(RateToggle, {
    currencyA: sorted ? currency0 : currency1,
    currencyB: sorted ? currency1 : currency0,
    handleRateToggle: handleRateChange
  })), /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(LightCard, {
    width: "48%",
    padding: "8px"
  }, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "4px",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "EQs1sJ",
    message: "Min price"
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMediumHeader, {
    textAlign: "center"
  }, formatTickPrice({
    price: priceLower,
    atLimit: ticksAtLimit,
    direction: Bound.LOWER
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    textAlign: "center",
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "7Z4WfS",
    message: "{0} per {1}",
    values: {
      "0": quoteCurrency.symbol,
      "1": baseCurrency.symbol
    }
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedSmall, {
    textAlign: "center",
    color: theme.neutral3,
    style: {
      marginTop: "4px"
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "WgTuci",
    message: "Your position will be 100% composed of {0} at this price",
    values: {
      "0": baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol
    }
  })))), /*#__PURE__*/React__default.createElement(LightCard, {
    width: "48%",
    padding: "8px"
  }, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "4px",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "5etEUX",
    message: "Max price"
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMediumHeader, {
    textAlign: "center"
  }, formatTickPrice({
    price: priceUpper,
    atLimit: ticksAtLimit,
    direction: Bound.UPPER
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    textAlign: "center",
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "7Z4WfS",
    message: "{0} per {1}",
    values: {
      "0": quoteCurrency.symbol,
      "1": baseCurrency.symbol
    }
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedSmall, {
    textAlign: "center",
    color: theme.neutral3,
    style: {
      marginTop: "4px"
    }
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "WgTuci",
    message: "Your position will be 100% composed of {0} at this price",
    values: {
      "0": quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
    }
  }))))), /*#__PURE__*/React__default.createElement(LightCard, {
    padding: "12px "
  }, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "4px",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "DWd30U",
    message: "Current price"
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMediumHeader, null, "".concat(price.toSignificant(5), " ")), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    textAlign: "center",
    fontSize: "12px"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "7Z4WfS",
    message: "{0} per {1}",
    values: {
      "0": quoteCurrency.symbol,
      "1": baseCurrency.symbol
    }
  }))))));
};

export { PositionPreview };
