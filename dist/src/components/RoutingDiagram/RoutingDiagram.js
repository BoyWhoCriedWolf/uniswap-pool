import React__default from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { Protocol } from '@uniswap/router-sdk';
import Badge from '../Badge/index.js';
import DoubleCurrencyLogo from '../DoubleLogo/index.js';
import CurrencyLogo from '../Logo/CurrencyLogo.js';
import Row, { AutoRow } from '../Row/index.js';
import { useTokenInfoFromActiveList } from '../../hooks/useTokenInfoFromActiveList.js';
import { Box } from 'rebass';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { Z_INDEX } from '../../theme/zIndex.js';
import { ReactComponent as SvgDotLine } from '../../assets/svg/dot_line.svg.js';
import { MouseoverTooltip, TooltipSize } from '../Tooltip/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;
var Wrapper = styled(Box)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  align-items: center;\n  width: 100%;\n"])));
var RouteContainerRow = styled(Row)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: grid;\n  grid-template-columns: 24px 1fr 24px;\n"])));
var RouteRow = styled(Row)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  justify-content: center;\n  padding: 0.1rem 0.5rem;\n  position: relative;\n"])));
var PoolBadge = styled(Badge)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  display: flex;\n  padding: 4px 4px;\n"])));
var DottedLine = styled.div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  position: absolute;\n  width: calc(100%);\n  z-index: 1;\n  opacity: 0.5;\n"])));
var DotColor = styled(SvgDotLine)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  path {\n    stroke: ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
});
var OpaqueBadge = styled(Badge)(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 8px;\n  display: grid;\n  grid-gap: 4px;\n  grid-auto-flow: column;\n  justify-content: start;\n  padding: 4px 6px;\n  z-index: ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface2;
}, Z_INDEX.sticky);
var ProtocolBadge = styled(Badge)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border-radius: 4px;\n  color: ", ";\n  font-size: 10px;\n  padding: 2px 4px;\n  z-index: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface2;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral2;
}, Z_INDEX.sticky + 1);
var MixedProtocolBadge = styled(ProtocolBadge)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral(["\n  width: 60px;\n"])));
var BadgeText = styled(ThemedText.LabelMicro)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral(["\n  word-break: normal;\n"])));
function RoutingDiagram(_ref5) {
  var currencyIn = _ref5.currencyIn,
    currencyOut = _ref5.currencyOut,
    routes = _ref5.routes;
  var tokenIn = useTokenInfoFromActiveList(currencyIn);
  var tokenOut = useTokenInfoFromActiveList(currencyOut);
  return /*#__PURE__*/React__default.createElement(Wrapper, null, routes.map(function (entry, index) {
    return /*#__PURE__*/React__default.createElement(RouteContainerRow, {
      key: index
    }, /*#__PURE__*/React__default.createElement(CurrencyLogo, {
      currency: tokenIn,
      size: "20px"
    }), /*#__PURE__*/React__default.createElement(Route, {
      entry: entry
    }), /*#__PURE__*/React__default.createElement(CurrencyLogo, {
      currency: tokenOut,
      size: "20px"
    }));
  }));
}
function Route(_ref6) {
  var _ref6$entry = _ref6.entry,
    percent = _ref6$entry.percent,
    path = _ref6$entry.path,
    protocol = _ref6$entry.protocol;
  return /*#__PURE__*/React__default.createElement(RouteRow, null, /*#__PURE__*/React__default.createElement(DottedLine, null, /*#__PURE__*/React__default.createElement(DotColor, null)), /*#__PURE__*/React__default.createElement(OpaqueBadge, null, protocol === Protocol.MIXED ? /*#__PURE__*/React__default.createElement(MixedProtocolBadge, null, /*#__PURE__*/React__default.createElement(BadgeText, null, "V3 + V2")) : /*#__PURE__*/React__default.createElement(ProtocolBadge, null, /*#__PURE__*/React__default.createElement(BadgeText, {
    color: "neutral1"
  }, protocol.toUpperCase())), /*#__PURE__*/React__default.createElement(BadgeText, {
    style: {
      minWidth: "auto"
    }
  }, percent.toSignificant(2), "%")), /*#__PURE__*/React__default.createElement(AutoRow, {
    gap: "1px",
    width: "100%",
    style: {
      justifyContent: "space-evenly",
      zIndex: 2
    }
  }, path.map(function (_ref7, index) {
    var _ref8 = _slicedToArray(_ref7, 3),
      currency0 = _ref8[0],
      currency1 = _ref8[1],
      feeAmount = _ref8[2];
    return /*#__PURE__*/React__default.createElement(Pool, {
      key: index,
      currency0: currency0,
      currency1: currency1,
      feeAmount: feeAmount
    });
  })));
}
function Pool(_ref9) {
  var currency0 = _ref9.currency0,
    currency1 = _ref9.currency1,
    feeAmount = _ref9.feeAmount;
  var tokenInfo0 = useTokenInfoFromActiveList(currency0);
  var tokenInfo1 = useTokenInfoFromActiveList(currency1);

  // TODO - link pool icon to info.uniswap.org via query params
  return /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: /*#__PURE__*/React__default.createElement(Trans, {
      id: "mE5w3I",
      message: "{0}% pool",
      values: {
        "0": (tokenInfo0 === null || tokenInfo0 === void 0 ? void 0 : tokenInfo0.symbol) + "/" + (tokenInfo1 === null || tokenInfo1 === void 0 ? void 0 : tokenInfo1.symbol) + " " + feeAmount / 10000
      }
    }),
    size: TooltipSize.ExtraSmall
  }, /*#__PURE__*/React__default.createElement(PoolBadge, null, /*#__PURE__*/React__default.createElement(Box, {
    margin: "0 4px 0 12px"
  }, /*#__PURE__*/React__default.createElement(DoubleCurrencyLogo, {
    currency0: tokenInfo1,
    currency1: tokenInfo0,
    size: 20
  })), /*#__PURE__*/React__default.createElement(BadgeText, null, feeAmount / 10000, "%")));
}

export { RoutingDiagram as default };
