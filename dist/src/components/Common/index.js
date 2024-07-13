import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { css } from 'styled-components';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var ScrollBarStyles = css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  // Firefox scrollbar styling\n  scrollbar-width: thin;\n  scrollbar-color: ", ";\n  height: 100%;\n\n  // safari and chrome scrollbar styling\n  ::-webkit-scrollbar {\n    background: transparent;\n\n    // Set height for horizontal scrolls\n    ", "\n  }\n\n  ::-webkit-scrollbar-thumb {\n    background: ", ";\n    border-radius: 8px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.surface3, " transparent");
}, function (_ref2) {
  var $isHorizontalScroll = _ref2.$isHorizontalScroll;
  return $isHorizontalScroll ? css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n            height: 4px;\n            overflow-x: scroll;\n          "]))) : css(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n            width: 4px;\n            overflow-y: scroll;\n          "])));
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface3;
});
var OpacityHoverState = css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  &:hover {\n    opacity: ", ";\n  }\n\n  &:active {\n    opacity: ", ";\n  }\n\n  transition: ", ";\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.opacity.hover;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.opacity.click;
}, function (_ref6) {
  var _ref6$theme$transitio = _ref6.theme.transition,
    duration = _ref6$theme$transitio.duration,
    timing = _ref6$theme$transitio.timing;
  return "opacity ".concat(duration.medium, " ").concat(timing.ease);
});

export { OpacityHoverState, ScrollBarStyles };
