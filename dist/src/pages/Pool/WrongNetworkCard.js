import React__default from 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import { AutoColumn } from '../../components/Column/index.js';
import { RowBetween } from '../../components/Row/index.js';
import { SwitchLocaleLink } from '../../components/SwitchLocaleLink/index.js';
import { AlertTriangle } from 'react-feather';
import styled, { css, useTheme } from 'styled-components';
import '../../theme/components/index.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var PageWrapper = styled(AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  padding: 68px 8px 0px;\n  max-width: 870px;\n  width: 100%;\n\n  @media (max-width: ", ") {\n    max-width: 800px;\n    padding-top: 48px;\n  }\n\n  @media (max-width: ", ") {\n    max-width: 500px;\n    padding-top: 20px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.breakpoint.md, "px");
}, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var TitleRow = styled(RowBetween)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  color: ", ";\n  @media (max-width: ", ") {\n    flex-wrap: wrap;\n    gap: 12px;\n    width: 100%;\n  }\n"])), function (_ref3) {
  var theme = _ref3.theme;
  return theme.neutral2;
}, function (_ref4) {
  var theme = _ref4.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
var ErrorContainer = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  align-items: center;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  margin: auto;\n  max-width: 300px;\n  min-height: 25vh;\n"])));
var IconStyle = css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  width: 48px;\n  height: 48px;\n  margin-bottom: 0.5rem;\n"])));
var NetworkIcon = styled(AlertTriangle)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  ", "\n"])), IconStyle);
var MainContentWrapper = styled.main(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  background-color: ", ";\n  border: 1px solid ", ";\n  padding: 0;\n  border-radius: 16px;\n  display: flex;\n  flex-direction: column;\n  overflow: hidden;\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return theme.surface1;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.surface3;
});
function WrongNetworkCard() {
  var theme = useTheme();
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(PageWrapper, null, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "lg",
    justify: "center"
  }, /*#__PURE__*/React__default.createElement(AutoColumn, {
    gap: "lg",
    style: {
      width: "100%"
    }
  }, /*#__PURE__*/React__default.createElement(TitleRow, {
    padding: "0"
  }, /*#__PURE__*/React__default.createElement(ThemedText.LargeHeader, null, /*#__PURE__*/React__default.createElement(Trans, {
    id: "lQfOr9",
    message: "Pools"
  }))), /*#__PURE__*/React__default.createElement(MainContentWrapper, null, /*#__PURE__*/React__default.createElement(ErrorContainer, null, /*#__PURE__*/React__default.createElement(ThemedText.BodyPrimary, {
    color: theme.neutral3,
    textAlign: "center"
  }, /*#__PURE__*/React__default.createElement(NetworkIcon, {
    strokeWidth: 1.2
  }), /*#__PURE__*/React__default.createElement("div", {
    "data-testid": "pools-unsupported-err"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "nFZR3H",
    message: "Your connected network is unsupported."
  })))))))), /*#__PURE__*/React__default.createElement(SwitchLocaleLink, null));
}

export { WrongNetworkCard as default };
