import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
var Divider = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  width: 100%;\n  height: 1px;\n  border-width: 0;\n  margin: 12px 0;\n  background-color: ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface3;
});
function OutputTaxTooltipBody(_ref2) {
  var currencySymbol = _ref2.currencySymbol;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, {
    color: "textPrimary"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "xR+oyM",
    message: "Exact input only"
  })), /*#__PURE__*/React__default.createElement(Divider, null), /*#__PURE__*/React__default.createElement(ThemedText.LabelMicro, {
    color: "textPrimary"
  }, currencySymbol ? /*#__PURE__*/React__default.createElement(Trans, {
    id: "n7SHzO",
    message: "{currencySymbol} fees don't allow for accurate exact outputs. Use the `You pay` field instead.",
    values: {
      currencySymbol: currencySymbol
    }
  }) : /*#__PURE__*/React__default.createElement(Trans, {
    id: "pl9Brs",
    message: "Fees on the selected output token don't allow for accurate exact outputs. Use the `You pay` field instead."
  })));
}

export { OutputTaxTooltipBody };
