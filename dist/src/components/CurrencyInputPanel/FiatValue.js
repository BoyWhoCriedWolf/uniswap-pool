import React__default, { useMemo } from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import Row from '../Row/index.js';
import { LoadingBubble } from '../Tokens/loading.js';
import { MouseoverTooltip } from '../Tooltip/index.js';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { useFormatter, NumberType } from '../../utils/formatNumbers.js';
import { warningSeverity } from '../../utils/prices.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
var FiatLoadingBubble = styled(LoadingBubble)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  border-radius: 4px;\n  width: 4rem;\n  height: 1rem;\n"])));
function FiatValue(_ref) {
  var fiatValue = _ref.fiatValue,
    priceImpact = _ref.priceImpact;
  var _useFormatter = useFormatter(),
    formatNumber = _useFormatter.formatNumber,
    formatPriceImpact = _useFormatter.formatPriceImpact;
  var priceImpactColor = useMemo(function () {
    if (!priceImpact) return undefined;
    if (priceImpact.lessThan("0")) return "success";
    var severity = warningSeverity(priceImpact);
    if (severity < 1) return "neutral3";
    if (severity < 3) return "deprecated_yellow1";
    return "critical";
  }, [priceImpact]);
  if (fiatValue.isLoading) {
    return /*#__PURE__*/React__default.createElement(FiatLoadingBubble, null);
  }
  return /*#__PURE__*/React__default.createElement(Row, {
    gap: "sm"
  }, /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: "neutral2"
  }, fiatValue.data ? formatNumber({
    input: fiatValue.data,
    type: NumberType.FiatTokenPrice
  }) : /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: /*#__PURE__*/React__default.createElement(Trans, {
      id: "9PI4j7",
      message: "Not enough liquidity to show accurate USD value."
    })
  }, "-")), priceImpact && /*#__PURE__*/React__default.createElement(ThemedText.BodySmall, {
    color: priceImpactColor
  }, /*#__PURE__*/React__default.createElement(MouseoverTooltip, {
    text: /*#__PURE__*/React__default.createElement(Trans, {
      id: "KaCkzz",
      message: "The estimated difference between the USD values of input and output amounts."
    })
  }, "(", /*#__PURE__*/React__default.createElement(Trans, {
    id: "J/hVSQ",
    message: "{0}",
    values: {
      "0": formatPriceImpact(priceImpact)
    }
  }), ")")));
}

export { FiatValue };
