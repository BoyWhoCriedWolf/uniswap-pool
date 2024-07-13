import 'react';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { i18n } from '../../../node_modules/@lingui/core/dist/index.mjs.js';
import '@uniswap/analytics-events';
import '../../analytics/index.js';
import '../../constants/misc.js';
import 'react-redux';
import '../../state/application/reducer.js';
import styled from 'styled-components';
import { ButtonText } from '../../theme/components/index.js';
import { Z_INDEX } from '../../theme/zIndex.js';
import { ThemedText } from '../../theme/components/text.js';

var _templateObject, _templateObject2, _templateObject3;
styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  display: flex;\n  background-color: ", ";\n  padding: 20px;\n  border-bottom: 1px solid ", ";\n  z-index: ", ";\n  box-sizing: border-box;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n\n  @media only screen and (max-width: ", ") {\n    flex-direction: column;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, Z_INDEX.fixed, function (_ref3) {
  var theme = _ref3.theme;
  return "".concat(theme.breakpoint.md, "px");
});
styled(ThemedText.BodySecondary)(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n\n  @media only screen and (max-width: ", ") {\n    @supports (-webkit-line-clamp: 2) {\n      white-space: initial;\n      display: -webkit-box;\n      -webkit-line-clamp: 2;\n      -webkit-box-orient: vertical;\n    }\n  }\n\n  @media only screen and (max-width: ", ") {\n    @supports (-webkit-line-clamp: 3) {\n      white-space: initial;\n      display: -webkit-box;\n      -webkit-line-clamp: 3;\n      -webkit-box-orient: vertical;\n    }\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return "".concat(theme.breakpoint.md, "px");
}, function (_ref5) {
  var theme = _ref5.theme;
  return "".concat(theme.breakpoint.sm, "px");
});
styled(ButtonText)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  flex-shrink: 0;\n  width: max-content;\n\n  :focus {\n    text-decoration: none;\n  }\n"])));
var bannerText = i18n._(
/*i18n*/
{
  id: "WnoHbm",
  message: "This web application is provided as a tool for users to interact with the Uniswap Protocol on\ntheir own initiative, with no endorsement or recommendation of cryptocurrency trading activities. In doing so,\nUniswap is not recommending that users or potential users engage in cryptoasset trading activity, and users or\npotential users of the web application should not regard this webpage or its contents as involving any form of\nrecommendation, invitation or inducement to deal in cryptoassets."
});

export { bannerText };
