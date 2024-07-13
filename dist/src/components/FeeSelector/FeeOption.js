import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { ButtonRadioChecked } from '../Button/index.js';
import { AutoColumn } from '../Column/index.js';
import React__default from 'react';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { FeeTierPercentageBadge } from './FeeTierPercentageBadge.js';
import { FEE_AMOUNT_DETAIL } from './shared.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2;
var ResponsiveText = styled(ThemedText.DeprecatedLabel)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  line-height: 16px;\n  font-size: 14px;\n\n  ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    font-size: 12px;\n    line-height: 12px;\n  "])));
});
function FeeOption(_ref2) {
  var feeAmount = _ref2.feeAmount,
    active = _ref2.active,
    poolState = _ref2.poolState,
    distributions = _ref2.distributions,
    onClick = _ref2.onClick;
  return /*#__PURE__*/React__default.createElement(ButtonRadioChecked, {
    active: active,
    onClick: onClick
  }, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "sm",
    justify: "flex-start"
  }, /*#__PURE__*/React__default.createElement(AutoColumn, {
    justify: "flex-start",
    gap: "6px"
  }, /*#__PURE__*/React__default.createElement(ResponsiveText, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "hbO8db",
    message: "{0}%",
    values: {
      "0": FEE_AMOUNT_DETAIL[feeAmount].label
    }
  })), /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedMain, {
    fontWeight: 485,
    fontSize: "12px",
    textAlign: "left"
  }, FEE_AMOUNT_DETAIL[feeAmount].description)), distributions && /*#__PURE__*/React__default.createElement(FeeTierPercentageBadge, {
    distributions: distributions,
    feeAmount: feeAmount,
    poolState: poolState
  })));
}

export { FeeOption };
