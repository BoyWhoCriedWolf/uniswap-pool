'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var routerSdk = require('@uniswap/router-sdk');
var index$1 = require('../Badge/index.cjs');
var index$4 = require('../DoubleLogo/index.cjs');
var CurrencyLogo = require('../Logo/CurrencyLogo.cjs');
var index = require('../Row/index.cjs');
var useTokenInfoFromActiveList = require('../../hooks/useTokenInfoFromActiveList.cjs');
var rebass = require('rebass');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var zIndex = require('../../theme/zIndex.cjs');
var dot_line = require('../../assets/svg/dot_line.cjs');
var index$2 = require('../Tooltip/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10;
var Wrapper = styled__default["default"](rebass.Box)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  width: 100%;\n"])));
var RouteContainerRow = styled__default["default"](index["default"])(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  display: grid;\n  grid-template-columns: 24px 1fr 24px;\n"])));
var RouteRow = styled__default["default"](index["default"])(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  align-items: center;\n  display: flex;\n  justify-content: center;\n  padding: 0.1rem 0.5rem;\n  position: relative;\n"])));
var PoolBadge = styled__default["default"](index$1["default"])(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  padding: 4px 4px;\n"])));
var DottedLine = styled__default["default"].div(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  align-items: center;\n  position: absolute;\n  width: calc(100%);\n  z-index: 1;\n  opacity: 0.5;\n"])));
var DotColor = styled__default["default"](dot_line.ReactComponent)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  path {\n    stroke: ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
});
var OpaqueBadge = styled__default["default"](index$1["default"])(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border-radius: 8px;\n  display: grid;\n  grid-gap: 4px;\n  grid-auto-flow: column;\n  justify-content: start;\n  padding: 4px 6px;\n  z-index: ", ";\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface2;
}, zIndex.Z_INDEX.sticky);
var ProtocolBadge = styled__default["default"](index$1["default"])(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  background-color: ", ";\n  border-radius: 4px;\n  color: ", ";\n  font-size: 10px;\n  padding: 2px 4px;\n  z-index: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface2;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.neutral2;
}, zIndex.Z_INDEX.sticky + 1);
var MixedProtocolBadge = styled__default["default"](ProtocolBadge)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  width: 60px;\n"])));
var BadgeText = styled__default["default"](text.ThemedText.LabelMicro)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  word-break: normal;\n"])));
function RoutingDiagram(_ref5) {
  var currencyIn = _ref5.currencyIn,
    currencyOut = _ref5.currencyOut,
    routes = _ref5.routes;
  var tokenIn = useTokenInfoFromActiveList.useTokenInfoFromActiveList(currencyIn);
  var tokenOut = useTokenInfoFromActiveList.useTokenInfoFromActiveList(currencyOut);
  return /*#__PURE__*/React__default["default"].createElement(Wrapper, null, routes.map(function (entry, index) {
    return /*#__PURE__*/React__default["default"].createElement(RouteContainerRow, {
      key: index
    }, /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
      currency: tokenIn,
      size: "20px"
    }), /*#__PURE__*/React__default["default"].createElement(Route, {
      entry: entry
    }), /*#__PURE__*/React__default["default"].createElement(CurrencyLogo, {
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
  return /*#__PURE__*/React__default["default"].createElement(RouteRow, null, /*#__PURE__*/React__default["default"].createElement(DottedLine, null, /*#__PURE__*/React__default["default"].createElement(DotColor, null)), /*#__PURE__*/React__default["default"].createElement(OpaqueBadge, null, protocol === routerSdk.Protocol.MIXED ? /*#__PURE__*/React__default["default"].createElement(MixedProtocolBadge, null, /*#__PURE__*/React__default["default"].createElement(BadgeText, null, "V3 + V2")) : /*#__PURE__*/React__default["default"].createElement(ProtocolBadge, null, /*#__PURE__*/React__default["default"].createElement(BadgeText, {
    color: "neutral1"
  }, protocol.toUpperCase())), /*#__PURE__*/React__default["default"].createElement(BadgeText, {
    style: {
      minWidth: "auto"
    }
  }, percent.toSignificant(2), "%")), /*#__PURE__*/React__default["default"].createElement(index.AutoRow, {
    gap: "1px",
    width: "100%",
    style: {
      justifyContent: "space-evenly",
      zIndex: 2
    }
  }, path.map(function (_ref7, index) {
    var _ref8 = _slicedToArray__default["default"](_ref7, 3),
      currency0 = _ref8[0],
      currency1 = _ref8[1],
      feeAmount = _ref8[2];
    return /*#__PURE__*/React__default["default"].createElement(Pool, {
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
  var tokenInfo0 = useTokenInfoFromActiveList.useTokenInfoFromActiveList(currency0);
  var tokenInfo1 = useTokenInfoFromActiveList.useTokenInfoFromActiveList(currency1);

  // TODO - link pool icon to info.uniswap.org via query params
  return /*#__PURE__*/React__default["default"].createElement(index$2.MouseoverTooltip, {
    text: /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
      id: "mE5w3I",
      message: "{0}% pool",
      values: {
        "0": (tokenInfo0 === null || tokenInfo0 === void 0 ? void 0 : tokenInfo0.symbol) + "/" + (tokenInfo1 === null || tokenInfo1 === void 0 ? void 0 : tokenInfo1.symbol) + " " + feeAmount / 10000
      }
    }),
    size: index$2.TooltipSize.ExtraSmall
  }, /*#__PURE__*/React__default["default"].createElement(PoolBadge, null, /*#__PURE__*/React__default["default"].createElement(rebass.Box, {
    margin: "0 4px 0 12px"
  }, /*#__PURE__*/React__default["default"].createElement(index$4, {
    currency0: tokenInfo1,
    currency1: tokenInfo0,
    size: 20
  })), /*#__PURE__*/React__default["default"].createElement(BadgeText, null, feeAmount / 10000, "%")));
}

module.exports = RoutingDiagram;
