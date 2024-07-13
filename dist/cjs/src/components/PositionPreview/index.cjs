'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var index$4 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var RangeBadge = require('../Badge/RangeBadge.cjs');
var index$3 = require('../Card/index.cjs');
var index = require('../Column/index.cjs');
var index$2 = require('../DoubleLogo/index.cjs');
var styled$1 = require('../earn/styled.cjs');
var CurrencyLogo = require('../Logo/CurrencyLogo.cjs');
var index$5 = require('../RateToggle/index.cjs');
var index$1 = require('../Row/index.cjs');
var JSBI = require('jsbi');
var actions = require('../../state/mint/v3/actions.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var unwrappedToken = require('../../utils/unwrappedToken.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var JSBI__default = /*#__PURE__*/_interopDefaultLegacy(JSBI);

var PositionPreview = function PositionPreview(_ref) {
  var _position$pool;
  var position = _ref.position,
    title = _ref.title,
    inRange = _ref.inRange,
    baseCurrencyDefault = _ref.baseCurrencyDefault,
    ticksAtLimit = _ref.ticksAtLimit;
  var theme = styled.useTheme();
  var _useFormatter = formatNumbers.useFormatter(),
    formatTickPrice = _useFormatter.formatTickPrice;
  var currency0 = unwrappedToken.unwrappedToken(position.pool.token0);
  var currency1 = unwrappedToken.unwrappedToken(position.pool.token1);

  // track which currency should be base
  var _useState = React.useState(baseCurrencyDefault ? baseCurrencyDefault === currency0 ? currency0 : baseCurrencyDefault === currency1 ? currency1 : currency0 : currency0),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    baseCurrency = _useState2[0],
    setBaseCurrency = _useState2[1];
  var sorted = baseCurrency === currency0;
  var quoteCurrency = sorted ? currency1 : currency0;
  var price = sorted ? position.pool.priceOf(position.pool.token0) : position.pool.priceOf(position.pool.token1);
  var priceLower = sorted ? position.token0PriceLower : position.token0PriceUpper.invert();
  var priceUpper = sorted ? position.token0PriceUpper : position.token0PriceLower.invert();
  var handleRateChange = React.useCallback(function () {
    setBaseCurrency(quoteCurrency);
  }, [quoteCurrency]);
  var removed = (position === null || position === void 0 ? void 0 : position.liquidity) && JSBI__default["default"].equal(position === null || position === void 0 ? void 0 : position.liquidity, JSBI__default["default"].BigInt(0));
  return /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "md",
    style: {
      marginTop: "0.5rem"
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$1.RowBetween, {
    style: {
      marginBottom: "0.5rem"
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$1.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(index$2, {
    currency0: currency0 !== null && currency0 !== void 0 ? currency0 : undefined,
    currency1: currency1 !== null && currency1 !== void 0 ? currency1 : undefined,
    size: 24,
    margin: true
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, {
    ml: "10px",
    fontSize: "24px"
  }, currency0 === null || currency0 === void 0 ? void 0 : currency0.symbol, " / ", currency1 === null || currency1 === void 0 ? void 0 : currency1.symbol)), /*#__PURE__*/React__default["default"].createElement(RangeBadge, {
    removed: removed,
    inRange: inRange
  })), /*#__PURE__*/React__default["default"].createElement(index$3.LightCard, null, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(index$1.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
    currency: currency0
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, {
    ml: "8px"
  }, currency0 === null || currency0 === void 0 ? void 0 : currency0.symbol)), /*#__PURE__*/React__default["default"].createElement(index$1.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, {
    mr: "8px"
  }, position.amount0.toSignificant(4)))), /*#__PURE__*/React__default["default"].createElement(index$1.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(index$1.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
    currency: currency1
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, {
    ml: "8px"
  }, currency1 === null || currency1 === void 0 ? void 0 : currency1.symbol)), /*#__PURE__*/React__default["default"].createElement(index$1.RowFixed, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, {
    mr: "8px"
  }, position.amount1.toSignificant(4)))), /*#__PURE__*/React__default["default"].createElement(styled$1.Break, null), /*#__PURE__*/React__default["default"].createElement(index$1.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "EU3wU4",
    message: "Fee tier"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, null, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "hbO8db",
    message: "{0}%",
    values: {
      "0": (position === null || position === void 0 || (_position$pool = position.pool) === null || _position$pool === void 0 ? void 0 : _position$pool.fee) / 10000
    }
  }))))), /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "md"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.RowBetween, null, title ? /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, null, title) : /*#__PURE__*/React__default["default"].createElement("div", null), /*#__PURE__*/React__default["default"].createElement(index$5, {
    currencyA: sorted ? currency0 : currency1,
    currencyB: sorted ? currency1 : currency0,
    handleRateToggle: handleRateChange
  })), /*#__PURE__*/React__default["default"].createElement(index$1.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(index$3.LightCard, {
    width: "48%",
    padding: "8px"
  }, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "4px",
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    fontSize: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "EQs1sJ",
    message: "Min price"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMediumHeader, {
    textAlign: "center"
  }, formatTickPrice({
    price: priceLower,
    atLimit: ticksAtLimit,
    direction: actions.Bound.LOWER
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    textAlign: "center",
    fontSize: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "7Z4WfS",
    message: "{0} per {1}",
    values: {
      "0": quoteCurrency.symbol,
      "1": baseCurrency.symbol
    }
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedSmall, {
    textAlign: "center",
    color: theme.neutral3,
    style: {
      marginTop: "4px"
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "WgTuci",
    message: "Your position will be 100% composed of {0} at this price",
    values: {
      "0": baseCurrency === null || baseCurrency === void 0 ? void 0 : baseCurrency.symbol
    }
  })))), /*#__PURE__*/React__default["default"].createElement(index$3.LightCard, {
    width: "48%",
    padding: "8px"
  }, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "4px",
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    fontSize: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "5etEUX",
    message: "Max price"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMediumHeader, {
    textAlign: "center"
  }, formatTickPrice({
    price: priceUpper,
    atLimit: ticksAtLimit,
    direction: actions.Bound.UPPER
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    textAlign: "center",
    fontSize: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "7Z4WfS",
    message: "{0} per {1}",
    values: {
      "0": quoteCurrency.symbol,
      "1": baseCurrency.symbol
    }
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedSmall, {
    textAlign: "center",
    color: theme.neutral3,
    style: {
      marginTop: "4px"
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "WgTuci",
    message: "Your position will be 100% composed of {0} at this price",
    values: {
      "0": quoteCurrency === null || quoteCurrency === void 0 ? void 0 : quoteCurrency.symbol
    }
  }))))), /*#__PURE__*/React__default["default"].createElement(index$3.LightCard, {
    padding: "12px "
  }, /*#__PURE__*/React__default["default"].createElement(index.AutoColumn, {
    gap: "4px",
    justify: "center"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    fontSize: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "DWd30U",
    message: "Current price"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMediumHeader, null, "".concat(price.toSignificant(5), " ")), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedMain, {
    textAlign: "center",
    fontSize: "12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$4.Trans, {
    id: "7Z4WfS",
    message: "{0} per {1}",
    values: {
      "0": quoteCurrency.symbol,
      "1": baseCurrency.symbol
    }
  }))))));
};

exports.PositionPreview = PositionPreview;
