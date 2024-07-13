import React__default, { useMemo } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _toConsumableArray from '@babel/runtime/helpers/toConsumableArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Percent } from '@uniswap/sdk-core';
import { Position } from '@uniswap/v3-sdk';
import RangeBadge from '../Badge/RangeBadge.js';
import DoubleCurrencyLogo from '../DoubleLogo/index.js';
import HoverInlineText from '../HoverInlineText/index.js';
import Loader from '../Icons/LoadingSpinner.js';
import { RowBetween } from '../Row/index.js';
import { useToken } from '../../hooks/Tokens.js';
import useIsTickAtLimit from '../../hooks/useIsTickAtLimit.js';
import { usePool } from '../../hooks/usePools.js';
import { Link } from 'react-router-dom';
import { Bound } from '../../state/mint/v3/actions.js';
import styled from 'styled-components';
import { MEDIA_WIDTHS } from '../../theme/index.js';
import { HideSmall, SmallOnly } from '../../theme/components/index.js';
import { useFormatter } from '../../utils/formatNumbers.js';
import { unwrappedToken } from '../../utils/unwrappedToken.js';
import { WRAPPED_NATIVE_CURRENCY, WBTC, DAI, USDC_MAINNET, USDT } from '../../constants/tokens.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;
var LinkRow = styled(Link)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  cursor: pointer;\n  user-select: none;\n  display: flex;\n  flex-direction: column;\n  justify-content: space-between;\n  color: ", ";\n  padding: 16px;\n  text-decoration: none;\n  font-weight: 535;\n\n  & > div:not(:first-child) {\n    text-align: center;\n  }\n  :hover {\n    background-color: ", ";\n  }\n\n  @media screen and (min-width: ", "px) {\n    /* flex-direction: row; */\n  }\n\n  ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.deprecated_hoverDefault;
}, MEDIA_WIDTHS.deprecated_upToSmall, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    flex-direction: column;\n    row-gap: 8px;\n  "])));
});
var DataLineItem = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  font-size: 14px;\n"])));
var RangeLineItem = styled(DataLineItem)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  margin-top: 4px;\n  width: 100%;\n"])));
var DoubleArrow = styled.span(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  font-size: 12px;\n  margin: 0 2px;\n  color: ", ";\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral1;
});
var RangeText = styled(ThemedText.BodySmall)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  font-size: 14px !important;\n  word-break: break-word;\n  padding: 0.25rem 0.25rem;\n  border-radius: 8px;\n"])));
var FeeTierText = styled(ThemedText.UtilityBadge)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  font-size: 16px !important;\n  margin-left: 8px !important;\n  color: ", ";\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.neutral3;
});
var ExtentsText = styled(ThemedText.BodySmall)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  color: ", ";\n  display: inline-block;\n  line-height: 16px;\n  margin-right: 4px !important;\n  ", ";\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.neutral2;
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n    display: none;\n  "])));
});
var PrimaryPositionIdData = styled.div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  > * {\n    margin-right: 8px;\n  }\n"])));
function getPriceOrderingFromPositionForUI(position) {
  if (!position) {
    return {};
  }
  var token0 = position.amount0.currency;
  var token1 = position.amount1.currency;

  // if token0 is a dollar-stable asset, set it as the quote token
  var stables = [DAI, USDC_MAINNET, USDT];
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
  var bases = [].concat(_toConsumableArray(Object.values(WRAPPED_NATIVE_CURRENCY)), [WBTC]);
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
  var _useFormatter = useFormatter(),
    formatTickPrice = _useFormatter.formatTickPrice;
  var token0 = useToken(token0Address);
  var token1 = useToken(token1Address);
  var currency0 = token0 ? unwrappedToken(token0) : undefined;
  var currency1 = token1 ? unwrappedToken(token1) : undefined;

  // construct Position from details returned
  var _usePool = usePool(currency0 !== null && currency0 !== void 0 ? currency0 : undefined, currency1 !== null && currency1 !== void 0 ? currency1 : undefined, feeAmount),
    _usePool2 = _slicedToArray(_usePool, 2),
    pool = _usePool2[1];
  var position = useMemo(function () {
    if (pool) {
      return new Position({
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
  var currencyQuote = quote && unwrappedToken(quote);
  var currencyBase = base && unwrappedToken(base);

  // check if price is within range
  var outOfRange = pool ? pool.tickCurrent < tickLower || pool.tickCurrent >= tickUpper : false;
  var positionSummaryLink = "/pools/" + tokenId;
  var removed = liquidity === null || liquidity === void 0 ? void 0 : liquidity.eq(0);
  return /*#__PURE__*/React__default.createElement(LinkRow, {
    to: positionSummaryLink
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(PrimaryPositionIdData, null, /*#__PURE__*/React__default.createElement(DoubleCurrencyLogo, {
    currency0: currencyBase,
    currency1: currencyQuote,
    size: 18,
    margin: true
  }), /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, "\xA0", currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol, "\xA0/\xA0", currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol), /*#__PURE__*/React__default.createElement(FeeTierText, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "hbO8db",
    message: "{0}%",
    values: {
      "0": new Percent(feeAmount, 1000000).toSignificant()
    }
  }))), /*#__PURE__*/React__default.createElement(RangeBadge, {
    removed: removed,
    inRange: !outOfRange
  })), priceLower && priceUpper ? /*#__PURE__*/React__default.createElement(RangeLineItem, null, /*#__PURE__*/React__default.createElement(RangeText, null, /*#__PURE__*/React__default.createElement(ExtentsText, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "0uYsLP",
    message: "Min:"
  })), /*#__PURE__*/React__default.createElement(Trans, {
    id: "YAzUzD",
    message: "<0>{0} </0><1/> per <2/>",
    values: {
      "0": formatTickPrice({
        price: priceLower,
        atLimit: tickAtLimit,
        direction: Bound.LOWER
      })
    },
    components: {
      "0": /*#__PURE__*/React__default.createElement("span", null),
      "1": /*#__PURE__*/React__default.createElement(HoverInlineText, {
        text: currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol
      }),
      "2": /*#__PURE__*/React__default.createElement(HoverInlineText, {
        text: (_currencyBase$symbol = currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol) !== null && _currencyBase$symbol !== void 0 ? _currencyBase$symbol : ""
      })
    }
  })), " ", /*#__PURE__*/React__default.createElement(HideSmall, null, /*#__PURE__*/React__default.createElement(DoubleArrow, null, "\u2194"), " "), /*#__PURE__*/React__default.createElement(SmallOnly, null, /*#__PURE__*/React__default.createElement(DoubleArrow, null, "\u2194"), " "), /*#__PURE__*/React__default.createElement(RangeText, null, /*#__PURE__*/React__default.createElement(ExtentsText, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "BniuBY",
    message: "Max:"
  })), /*#__PURE__*/React__default.createElement(Trans, {
    id: "YAzUzD",
    message: "<0>{0} </0><1/> per <2/>",
    values: {
      "0": formatTickPrice({
        price: priceUpper,
        atLimit: tickAtLimit,
        direction: Bound.UPPER
      })
    },
    components: {
      "0": /*#__PURE__*/React__default.createElement("span", null),
      "1": /*#__PURE__*/React__default.createElement(HoverInlineText, {
        text: currencyQuote === null || currencyQuote === void 0 ? void 0 : currencyQuote.symbol
      }),
      "2": /*#__PURE__*/React__default.createElement(HoverInlineText, {
        maxCharacters: 10,
        text: currencyBase === null || currencyBase === void 0 ? void 0 : currencyBase.symbol
      })
    }
  }))) : /*#__PURE__*/React__default.createElement(Loader, null));
}

export { PositionListItem as default, getPriceOrderingFromPositionForUI };
