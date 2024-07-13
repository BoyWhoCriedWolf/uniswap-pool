'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
require('@babel/runtime/helpers/defineProperty');
require('@babel/runtime/helpers/asyncToGenerator');
require('@babel/runtime/helpers/slicedToArray');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
require('@babel/runtime/regenerator');
var index$2 = require('../../../node_modules/@lingui/react/dist/index.cjs');
require('@ethersproject/bignumber');
require('@uniswap/analytics-events');
require('@uniswap/sdk-core');
require('@uniswap/v3-sdk');
require('@web3-react/core');
require('../../analytics/index.cjs');
require('../../components/Badge/index.cjs');
var index = require('../../components/Button/index.cjs');
require('../../components/Card/index.cjs');
require('../../components/Column/index.cjs');
require('../../components/DoubleLogo/index.cjs');
require('../../components/Loader/styled.cjs');
require('@babel/runtime/helpers/extends');
require('../../components/Logo/AssetLogo.cjs');
var index$1 = require('../../components/Row/index.cjs');
require('../../components/swap/styled.cjs');
require('../../components/Toggle/index.cjs');
require('../../components/TransactionConfirmationModal/index.cjs');
require('../../constants/chains.cjs');
require('../../graphql/data/util.cjs');
require('../../constants/chainInfo.cjs');
require('../../constants/lists.cjs');
require('@ethersproject/bytes');
require('@ethersproject/strings');
require('../../constants/providers.cjs');
require('../../constants/tokens.cjs');
require('../../featureFlags/index.cjs');
require('@ethersproject/address');
require('@ethersproject/constants');
require('@ethersproject/contracts');
require('../../lib/state/multicall.cjs');
require('@uniswap/redux-multicall');
require('react-redux');
require('@babel/runtime/helpers/createClass');
require('@babel/runtime/helpers/classCallCheck');
require('@babel/runtime/helpers/possibleConstructorReturn');
require('@babel/runtime/helpers/getPrototypeOf');
require('@babel/runtime/helpers/inherits');
require('../../utils/listSort.cjs');
require('../../state/mint/v3/actions.cjs');
require('../../hooks/usePools.cjs');
require('../../hooks/useStablecoinPrice.cjs');
require('../../hooks/useV3PositionFees.cjs');
var reactRouterDom = require('react-router-dom');
require('../../graphql/data/__generated__/types-and-hooks.cjs');
require('../../state/signatures/reducer.cjs');
require('../../utils/formatNumbers.cjs');
require('../../components/AccountDrawer/MiniPortfolio/constants.cjs');
require('@babel/runtime/helpers/get');
require('@uniswap/router-sdk');
require('@uniswap/uniswapx-sdk');
require('../../constants/misc.cjs');
require('../../state/transactions/reducer.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
require('@babel/runtime/helpers/typeof');
require('@babel/runtime/helpers/wrapNativeSuper');
require('uuid');
require('../../locales/en-US.cjs');
require('jsbi');
require('../../components/Badge/RangeBadge.cjs');
require('../../components/PositionListItem/index.cjs');
require('../../components/Toggle/MultiToggle.cjs');
require('../../components/SwitchLocaleLink/index.cjs');
require('../../utils/getExplorerLink.cjs');
require('./styled.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _excluded = ["end"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13;
var PositionPageButtonPrimary = styled__default["default"](index.ButtonPrimary)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: 228px;\n  height: 40px;\n  font-size: 16px;\n  line-height: 20px;\n  border-radius: 12px;\n"])));
var PageWrapper = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  padding: 68px 16px 16px 16px;\n\n  min-width: 800px;\n  max-width: 960px;\n\n  @media only screen and (max-width: ", ") {\n    min-width: 100%;\n    padding: 16px;\n  }\n\n  @media only screen and (max-width: ", ") {\n    min-width: 100%;\n    padding: 16px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.breakpoint.md, "px");
}, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  font-weight: 535;\n  font-size: 14px;\n  color: ", ";\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
});

// responsive text
// disable the warning because we don't use the end prop, we just want to filter it out
// eslint-disable-next-line @typescript-eslint/no-unused-vars
styled__default["default"](function (_ref4) {
  _ref4.end;
    var props = _objectWithoutProperties__default["default"](_ref4, _excluded);
  return /*#__PURE__*/React__default["default"].createElement(text.ThemedText.DeprecatedLabel, props);
})(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  font-size: 16px;\n  justify-content: ", ";\n  align-items: center;\n"])), function (_ref5) {
  var end = _ref5.end;
  return end ? "flex-end" : "flex-start";
});
styled__default["default"].span(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  font-size: 14px;\n  text-align: center;\n  margin-right: 4px;\n  font-weight: 535;\n"])), function (_ref6) {
  var theme = _ref6.theme;
  return theme.neutral2;
});
styled__default["default"](text.ThemedText.DeprecatedMain)(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  text-decoration: none;\n  color: ", ";\n  :hover {\n    color: ", ";\n    text-decoration: none;\n  }\n"])), function (_ref7) {
  var theme = _ref7.theme;
  return theme.neutral2;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.neutral1;
});
styled__default["default"].span(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  color: ", ";\n  margin: 0 1rem;\n"])), function (_ref9) {
  var theme = _ref9.theme;
  return theme.neutral3;
});
var ResponsiveRow = styled__default["default"](index$1.RowBetween)(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  @media only screen and (max-width: ", ") {\n    flex-direction: column;\n    align-items: flex-start;\n    row-gap: 16px;\n    width: 100%;\n  }\n"])), function (_ref10) {
  var theme = _ref10.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
styled__default["default"](ResponsiveRow)(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  width: 50%;\n  justify-content: flex-end;\n\n  @media only screen and (max-width: ", ") {\n    width: 100%;\n    flex-direction: row;\n    * {\n      width: 100%;\n    }\n  }\n"])), function (_ref11) {
  var theme = _ref11.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
styled__default["default"](index.ButtonConfirmed)(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  border-radius: 12px;\n  padding: 6px 8px;\n  width: fit-content;\n  font-size: 16px;\n\n  @media only screen and (max-width: ", ") {\n    width: fit-content;\n  }\n\n  @media only screen and (max-width: ", ") {\n    width: fit-content;\n  }\n"])), function (_ref12) {
  var theme = _ref12.theme;
  return "".concat(theme.breakpoint.md, "px");
}, function (_ref13) {
  var theme = _ref13.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
styled__default["default"].div(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  display: grid;\n  grid-template: \"overlap\";\n  min-height: 400px;\n"])));
styled__default["default"].canvas(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n  grid-area: overlap;\n"])));
styled__default["default"].img(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral__default["default"](["\n  grid-area: overlap;\n  height: 400px;\n  /* Ensures SVG appears on top of canvas. */\n  z-index: 1;\n"])));
function PositionPageUnsupportedContent() {
  return /*#__PURE__*/React__default["default"].createElement(PageWrapper, null, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineLarge, {
    style: {
      marginBottom: "8px"
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "Ij/sE3",
    message: "Position unavailable"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
    style: {
      marginBottom: "32px"
    }
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "Jbim1e",
    message: "To view a position, you must be connected to the network it belongs to."
  })), /*#__PURE__*/React__default["default"].createElement(PositionPageButtonPrimary, {
    as: reactRouterDom.Link,
    to: "/pools",
    width: "fit-content"
  }, /*#__PURE__*/React__default["default"].createElement(index$2.Trans, {
    id: "7IwSeQ",
    message: "Back to Pools"
  }))));
}
styled__default["default"](index$1.RowFixed)({
  flexWrap: "wrap",
  gap: 8
});

exports.PositionPageUnsupportedContent = PositionPageUnsupportedContent;
