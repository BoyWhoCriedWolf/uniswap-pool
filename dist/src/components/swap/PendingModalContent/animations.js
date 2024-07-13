import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { keyframes, css } from 'styled-components';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var slideIn = keyframes(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  from { opacity: 0; transform: translateX(40px) }\n  to { opacity: 1; transform: translateX(0px) }\n"])));
var slideInAnimation = css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  animation: ", "\n    ", ";\n"])), slideIn, function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
});
var slideOut = keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  from { opacity: 1; transform: translateX(0px) }\n  to { opacity: 0; transform: translateX(-40px) }\n"])));
var slideOutAnimation = css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  animation: ", "\n    ", ";\n"])), slideOut, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
});

export { slideInAnimation, slideOutAnimation };
