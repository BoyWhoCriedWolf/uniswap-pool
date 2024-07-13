'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _toConsumableArray = require('@babel/runtime/helpers/toConsumableArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var sdkCore = require('@uniswap/sdk-core');
var v3Sdk = require('@uniswap/v3-sdk');
var RangeBadge = require('../Badge/RangeBadge.cjs');
var index$2 = require('../DoubleLogo/index.cjs');
var index$4 = require('../HoverInlineText/index.cjs');
var LoadingSpinner = require('../Icons/LoadingSpinner.cjs');
var index$1 = require('../Row/index.cjs');
var Tokens = require('../../hooks/Tokens.cjs');
var useIsTickAtLimit = require('../../hooks/useIsTickAtLimit.cjs');
var usePools = require('../../hooks/usePools.cjs');
var reactRouterDom = require('react-router-dom');
var actions = require('../../state/mint/v3/actions.cjs');
var styled = require('styled-components');
var index = require('../../theme/index.cjs');
var index$5 = require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var unwrappedToken = require('../../utils/unwrappedToken.cjs');
var tokens = require('../../constants/tokens.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _toConsumableArray__default = /*#__PURE__*/_interopDefaultLegacy(_toConsumableArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;
var LinkRow = styled__default["default"](reactRouterDom.Link)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  display: flex;\n  cursor: pointer;\n  user-select: none;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  color: ", ";\n  padding: 16px;\n  text-decoration: none;\n  font-weight: 535;\n\n  & > div:not(:first-child) {\n    text-align: center;\n  }\n  :hover {\n    background-color: ", ";\n  }\n\n  @media screen and (min-width: ", "px) {\n    /* flex-direction: row; */\n  }\n\n  ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_hoverDefault;
}, index.MEDIA_WIDTHS.deprecated_upToSmall, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n    flex-direction: column;\n    row-gap: 8px;\n  "])));
});
var DataLineItem = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  font-size: 14px;\n"])));
var RangeLineItem = styled__default["default"](DataLineItem)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-top: 4px;\n  width: 100%;\n"])));
var DoubleArrow = styled__default["default"].span(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  font-size: 12px;\n  margin: 0 2px;\n  color: ", ";\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral1;
});
var RangeText = styled__default["default"](text.ThemedText.BodySmall)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  font-size: 14px !important;\n  word-break: break-word;\n  padding: 0.25rem 0.25rem;\n  border-radius: 8px;\n"])));
var FeeTierText = styled__default["default"](text.ThemedText.UtilityBadge)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  font-size: 16px !important;\n  margin-left: 8px !important;\n  color: ", ";\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.neutral3;
});
var ExtentsText = styled__default["default"](text.ThemedText.BodySmall)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  display: inline-block;\n  line-height: 16px;\n  margin-right: 4px !important;\n  ", ";\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.neutral2;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n    display: none;\n  "])));
});
var PrimaryPositionIdData = styled__default["default"].div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  > * {\n    margin-right: 8px;\n  }\n"])));
function getPriceOrderingFromPositionForUI(position) {
  if (!position) {
    return {};
  }
  var token0 = position.amount0.currency;
  var token1 = position.amount1.currency;

  // if token0 is a dollar-stable asset, set it as the quote token
  var stables = [tokens.DAI, tokens.USDC_MAINNET, tokens.USDT];
  if (stables.some(function (stable) {
    return stable.equals(token0);
  })) {
    return {
      priceLower: position.token0PriceUpper.invert(),
      priceUpper: position.token0PriceLower.invert(),
      quote: token0,
      base: token1
    };
  }

  // if token1 is an ETH-/BTC-stable asset, set it as the base token
  var bases = [].concat(_toConsumableArray__default["default"](Object.values(tokens.WRAPPED_NATIVE_CURRENCY)), [tokens.WBTC]);
  if (bases.some(function (base) {
    return base && base.equals(token1);
  })) {
    return {
      priceLower: position.token0PriceUpper.invert(),
      priceUpper: position.token0PriceLower.invert(),
      quote: token0,
      base: token1
    };
  }

  // if both prices are below 1, invert
  if (position.token0PriceUpper.lessThan(1)) {
    return {
      priceLower: position.token0PriceUpper.invert(),
      priceUpper: position.token0PriceLower.invert(),
      quote: token0,
      base: token1
    };
  }

  // otherwise, just return the default
  return {
    priceLower: position.token0PriceLower,
    priceUpper: position.token0PriceUpper,
    quote: token1,
    base: token0
  };
}
function PositionListItem(_ref8) {
  var _currencyBase$symbol;
  var token0Address = _ref8.token0,
    token1Address = _ref8.token1,
    tokenId = _ref8.tokenId,
    feeAmount = _ref8.fee,
    liquidity = _ref8.liquidity,
    tickLower = _ref8.tickLower,
    tickUpper = _ref8.tickUpper;
  var _useFormatter = formatNumbers.useFormatter(),
    formatTickPrice = _useFormatter.formatTickPrice;
  var token0 = Tokens.useToken(token0Address);
  var token1 = Tokens.useToken(token1Address);
  var currency0 = token0 ? unwrappedToken.unwrappedToken(token0) : undefined;
  var currency1 = token1 ? unwrappedToken.unwrappedToken(token1) : undefined;

  // construct Position from details returned
  var _usePool = usePools.usePool(currency0 !== null && currency0 !== void 0 ? currency0 : undefined, currency1 !== null && currency1 !== void 0 ? currency1 : undefined, feeAmount),
    _usePool2 = _slicedToArray__default["default"](_usePool, 2),
    pool = _usePool2[1];
  var position = React.useMemo(function () {
    if (pool) {
      return new v3Sdk.Position({
        pool: pool,
        liquidity: liquidity.toString(),
        tickLower: tickLower,
        tickUpper: tickUpper
      });
    }
    return undefined;
  }, [liquidity, pool, tickLower, tickUpper]);
  var tickAtLimit = useIsTickAtLimit(feeAmount, tickLower, tickUpper);

  // prices
  var _getPriceOrderingFrom = getPriceOrderingFromPositionForUI(position),
    priceLower = _getPriceOrderingFrom.priceLower,
    priceUpper = _getPriceOrderingFrom.priceUpper,
    quote = _getPriceOrderingFrom.quote,
    base = _getPriceOrderingFrom.base;
  var currencyQuote = quote && unwrappedToken.unwrappedToken(quote);
  var currencyBase = base && unwrappedToken.unwrappedToken(base);

  // check if price is within range
  var outOfRange = pool ? pool.tickCurrent < tickLower || pool.tickCurrent >= tickUpper : false;
  var positionSummaryLink = "/pools/" + tokenId;
  var removed = liquidity === null || liquidity === void 0 ? void 0 : liquidity.eq(0);
  return /*#__PURE__*/React__default["default"].createElement(LinkRow, {
    to: positionSummaryLink
  }, /*#__PURE__*/React__default["default"].createElement(index$1.RowBetween, null, /*#__PURE__*/React__default["default"].createElement(PrimaryPositionIdData, null, /*#__PURE__*/React__default["default"].createElement(index$2, {
    currency0: currencyBase,
    currency1: currencyQuote,
    size: 18,
    margin: true
  }), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, "\xA0", currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol, "\xA0/\xA0", currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol), /*#__PURE__*/React__default["default"].createElement(FeeTierText, null, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "hbO8db",
    message: "{0}%",
    values: {
      "0": new sdkCore.Percent(feeAmount, 1000000).toSignificant()
    }
  }))), /*#__PURE__*/React__default["default"].createElement(RangeBadge, {
    removed: removed,
    inRange: !outOfRange
  })), priceLower && priceUpper ? /*#__PURE__*/React__default["default"].createElement(RangeLineItem, null, /*#__PURE__*/React__default["default"].createElement(RangeText, null, /*#__PURE__*/React__default["default"].createElement(ExtentsText, null, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "0uYsLP",
    message: "Min:"
  })), /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "YAzUzD",
    message: "<0>{0} </0><1/> per <2/>",
    values: {
      "0": formatTickPrice({
        price: priceLower,
        atLimit: tickAtLimit,
        direction: actions.Bound.LOWER
      })
    },
    components: {
      "0": /*#__PURE__*/React__default["default"].createElement("span", null),
      "1": /*#__PURE__*/React__default["default"].createElement(index$4, {
        text: currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol
      }),
      "2": /*#__PURE__*/React__default["default"].createElement(index$4, {
        text: (_currencyBase$symbol = currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol) !== null && _currencyBase$symbol !== void 0 ? _currencyBase$symbol : ""
      })
    }
  })), " ", /*#__PURE__*/React__default["default"].createElement(index$5.HideSmall, null, /*#__PURE__*/React__default["default"].createElement(DoubleArrow, null, "\u2194"), " "), /*#__PURE__*/React__default["default"].createElement(index$5.SmallOnly, null, /*#__PURE__*/React__default["default"].createElement(DoubleArrow, null, "\u2194"), " "), /*#__PURE__*/React__default["default"].createElement(RangeText, null, /*#__PURE__*/React__default["default"].createElement(ExtentsText, null, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "BniuBY",
    message: "Max:"
  })), /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "YAzUzD",
    message: "<0>{0} </0><1/> per <2/>",
    values: {
      "0": formatTickPrice({
        price: priceUpper,
        atLimit: tickAtLimit,
        direction: actions.Bound.UPPER
      })
    },
    components: {
      "0": /*#__PURE__*/React__default["default"].createElement("span", null),
      "1": /*#__PURE__*/React__default["default"].createElement(index$4, {
        text: currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol
      }),
      "2": /*#__PURE__*/React__default["default"].createElement(index$4, {
        maxCharacters: 10,
        text: currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol
      })
    }
  }))) : /*#__PURE__*/React__default["default"].createElement(LoadingSpinner["default"], null));
}

exports["default"] = PositionListItem;
exports.getPriceOrderingFromPositionForUI = getPriceOrderingFromPositionForUI;
