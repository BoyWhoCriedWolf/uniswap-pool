import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { ButtonOutlined } from '../Button/index.js';
import { AutoRow } from '../Row/index.js';
import styled from 'styled-components';
import '../../theme/components/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject;
var Button = styled(ButtonOutlined).attrs(function () {
  return {
    padding: "6px",
    $borderRadius: "8px"
  };
})(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  color: ", ";\n  flex: 1;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral1;
});
function PresetsButtons(_ref2) {
  var onSetFullRange = _ref2.onSetFullRange;
  return /*#__PURE__*/React__default.createElement(AutoRow, {
    gap: "4px",
    width: "auto"
  }, /*#__PURE__*/React__default.createElement(Button, {
    "data-testid": "set-full-range",
    onClick: onSetFullRange
  }, /*#__PURE__*/React__default.createElement(ThemedText.DeprecatedBody, {
    fontSize: 12
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "5IHTSS",
    message: "Full range"
  }))));
}

export { PresetsButtons as default };
