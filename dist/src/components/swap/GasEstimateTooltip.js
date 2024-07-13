import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { InterfaceElementName, SwapEventName } from '@uniswap/analytics-events';
import { useWeb3React } from '@web3-react/core';
import { sendAnalyticsEvent } from '../../analytics/index.js';
import { Gas } from '../Icons/Gas.js';
import { LoadingOpacityContainer } from '../Loader/styled.js';
import { UniswapXRouterIcon } from '../RouterLabel/UniswapXRouterLabel.js';
import Row, { RowFixed } from '../Row/index.js';
import { MouseoverTooltip, TooltipSize } from '../Tooltip/index.js';
import { SUPPORTED_GAS_ESTIMATE_CHAIN_IDS } from '../../constants/chains.js';
import { isUniswapXTrade } from '../../state/routing/utils.js';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { useFormatter, NumberType } from '../../utils/formatNumbers.js';
import { GasBreakdownTooltip } from './GasBreakdownTooltip.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
var StyledGasIcon = styled(Gas)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  height: 16px;\n  width: 16px;\n  // We apply the following to all children of the SVG in order to override the default color\n  & > * {\n    fill: ", ";\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
function GasEstimateTooltip(_ref2) {
  var trade = _ref2.trade,
    loading = _ref2.loading;
  var _useWeb3React = useWeb3React(),
    chainId = _useWeb3React.chainId;
  var _useFormatter = useFormatter(),
    formatNumber = _useFormatter.formatNumber;
  if (!trade || !chainId || !SUPPORTED_GAS_ESTIMATE_CHAIN_IDS.includes(chainId)) {
    return null;
  }
  return /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    size: TooltipSize.Small,
    text: /*#__PURE__*/React__default.createElement(GasBreakdownTooltip, {
      trade: trade
    }),
    onOpen: function onOpen() {
      sendAnalyticsEvent(SwapEventName.SWAP_AUTOROUTER_VISUALIZATION_EXPANDED, {
        element: InterfaceElementName.AUTOROUTER_VISUALIZATION_ROW
      });
    },
    placement: "right"
  }, /*#__PURE__*/React__default.createElement(LoadingOpacityContainer, {
    $loading: loading
  }, /*#__PURE__*/React__default.createElement(RowFixed, {
    gap: "xs"
  }, isUniswapXTrade(trade) ? /*#__PURE__*/React__default.createElement(UniswapXRouterIcon, {
    testId: "gas-estimate-uniswapx-icon"
  }) : /*#__PURE__*/React__default.createElement(StyledGasIcon, null), /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, /*#__PURE__*/React__default.createElement(Row, {
    gap: "xs"
  }, /*#__PURE__*/React__default.createElement("div", null, formatNumber({
    input: trade.totalGasUseEstimateUSD,
    type: NumberType.FiatGasPrice
  })), isUniswapXTrade(trade) && /*#__PURE__*/React__default.createElement("div", null, /*#__PURE__*/React__default.createElement("s", null, formatNumber({
    input: trade.classicGasUseEstimateUSD,
    type: NumberType.FiatGasPrice
  }))))))));
}

export { GasEstimateTooltip as default };
