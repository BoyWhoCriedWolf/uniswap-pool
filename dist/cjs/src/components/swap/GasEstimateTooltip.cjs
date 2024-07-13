'use strict';

var React = require('react');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var analyticsEvents = require('@uniswap/analytics-events');
var core = require('@web3-react/core');
var index$1 = require('../../analytics/index.cjs');
var Gas = require('../Icons/Gas.cjs');
var styled$1 = require('../Loader/styled.cjs');
var UniswapXRouterLabel = require('../RouterLabel/UniswapXRouterLabel.cjs');
var index$2 = require('../Row/index.cjs');
var index = require('../Tooltip/index.cjs');
var chains = require('../../constants/chains.cjs');
var utils = require('../../state/routing/utils.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var formatNumbers = require('../../utils/formatNumbers.cjs');
var GasBreakdownTooltip = require('./GasBreakdownTooltip.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var StyledGasIcon = styled__default["default"](Gas.Gas)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  height: 16px;\n  width: 16px;\n  // We apply the following to all children of the SVG in order to override the default color\n  & > * {\n    fill: ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
function GasEstimateTooltip(_ref2) {
  var trade = _ref2.trade,
    loading = _ref2.loading;
  var _useWeb3React = core.useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _useFormatter = formatNumbers.useFormatter(),
    formatNumber = _useFormatter.formatNumber;
  if (!trade || !chainId || !chains.SUPPORTED_GAS_ESTIMATE_CHAIN_IDS.includes(chainId)) {
    return null;
  }
  return /*#__PURE__*/React__default["default"].createElement(index.MouseoverTooltip, {
    size: index.TooltipSize.Small,
    text: /*#__PURE__*/React__default["default"].createElement(GasBreakdownTooltip.GasBreakdownTooltip, {
      trade: trade
    }),
    onOpen: function onOpen() {
      index$1.sendAnalyticsEvent(analyticsEvents.SwapEventName.SWAP_AUTOROUTER_VISUALIZATION_EXPANDED, {
        element: analyticsEvents.InterfaceElementName.AUTOROUTER_VISUALIZATION_ROW
      });
    },
    placement: "right"
  }, /*#__PURE__*/React__default["default"].createElement(styled$1.LoadingOpacityContainer, {
    $loading: loading
  }, /*#__PURE__*/React__default["default"].createElement(index$2.RowFixed, {
    gap: "xs"
  }, utils.isUniswapXTrade(trade) ? /*#__PURE__*/React__default["default"].createElement(UniswapXRouterLabel.UniswapXRouterIcon, {
    testId: "gas-estimate-uniswapx-icon"
  }) : /*#__PURE__*/React__default["default"].createElement(StyledGasIcon, null), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default["default"].createElement(index$2["default"], {
    gap: "xs"
  }, /*#__PURE__*/React__default["default"].createElement("div", null, formatNumber({
    input: trade.totalGasUseEstimateUSD,
    type: formatNumbers.NumberType.FiatGasPrice
  })), utils.isUniswapXTrade(trade) && /*#__PURE__*/React__default["default"].createElement("div", null, /*#__PURE__*/React__default["default"].createElement("s", null, formatNumber({
    input: trade.classicGasUseEstimateUSD,
    type: formatNumbers.NumberType.FiatGasPrice
  }))))))));
}

module.exports = GasEstimateTooltip;
