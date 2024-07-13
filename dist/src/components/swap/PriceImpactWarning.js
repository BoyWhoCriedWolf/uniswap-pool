import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { OutlineCard } from '../Card/index.js';
import styled, { useTheme } from 'styled-components';
import '../../theme/components/index.js';
import { opacify } from '../../theme/utils.js';
import { useFormatter } from '../../utils/formatNumbers.js';
import { AutoColumn } from '../Column/index.js';
import { RowBetween, RowFixed } from '../Row/index.js';
import { MouseoverTooltip } from '../Tooltip/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
var StyledCard = styled(OutlineCard)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 12px;\n  border: 1px solid ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return opacify(24, theme.critical);
});
function PriceImpactWarning(_ref2) {
  var priceImpact = _ref2.priceImpact;
  var _useFormatter = useFormatter(),
    formatPriceImpact = _useFormatter.formatPriceImpact;
  var theme = useTheme();
  return /*#__PURE__*/React__default.createElement(StyledCard, null, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "sm"
  }, /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: /*#__PURE__*/React__default.createElement(Trans, {
      id: "EDyYqw",
      message: "A swap of this size may have a high price impact, given the current liquidity in the pool. There may be a large difference between the amount of your input token and what you will receive in the output token"
    })
  }, /*#__PURE__*/React__default.createElement(RowBetween, null, /*#__PURE__*/React__default.createElement(RowFixed, null, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedSubHeader, {
    color: theme.critical
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "NF0esC",
    message: "Price impact warning"
  }))), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedLabel, {
    textAlign: "right",
    fontSize: 14,
    color: "critical"
  }, formatPriceImpact(priceImpact))))));
}

export { PriceImpactWarning as default };
