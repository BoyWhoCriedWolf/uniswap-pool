import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import styled from 'styled-components';
import uImage from '../../assets/images/big_unicorn.png.js';
import noise from '../../assets/images/noise.png.js';
import xlUnicorn from '../../assets/images/xl_uni.png.js';
import { AutoColumn } from '../Column/index.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var DataCard = styled(AutoColumn)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  background: radial-gradient(\n    76.02% 75.41% at 1.84% 0%,\n    #ff007a 0%,\n    #2172e5 100%\n  );\n  border-radius: 12px;\n  width: 100%;\n  position: relative;\n  overflow: hidden;\n"])));
var CardBGImage = styled.span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  background: url(", ");\n  width: 1000px;\n  height: 600px;\n  position: absolute;\n  border-radius: 12px;\n  opacity: 0.4;\n  top: -100px;\n  left: -100px;\n  transform: rotate(-15deg);\n  user-select: none;\n  ", "\n"])), uImage, function (_ref) {
  var desaturate = _ref.desaturate;
  return desaturate && "filter: saturate(0)";
});
var CardBGImageSmaller = styled.span(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  background: url(", ");\n  width: 1200px;\n  height: 1200px;\n  position: absolute;\n  border-radius: 12px;\n  top: -300px;\n  left: -300px;\n  opacity: 0.4;\n  user-select: none;\n\n  ", "\n"])), xlUnicorn, function (_ref2) {
  var desaturate = _ref2.desaturate;
  return desaturate && "filter: saturate(0)";
});
var CardNoise = styled.span(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  background: url(", ");\n  background-size: cover;\n  mix-blend-mode: overlay;\n  border-radius: 12px;\n  width: 100%;\n  height: 100%;\n  opacity: 0.15;\n  position: absolute;\n  top: 0;\n  left: 0;\n  user-select: none;\n"])), noise);
var CardSection = styled(AutoColumn)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n  padding: 1rem;\n  z-index: 1;\n  opacity: ", ";\n"])), function (_ref3) {
  var disabled = _ref3.disabled;
  return disabled && "0.4";
});
var Break = styled.div(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral(["\n  width: 100%;\n  background-color: rgba(255, 255, 255, 0.2);\n  height: 1px;\n"])));

export { Break, CardBGImage, CardBGImageSmaller, CardNoise, CardSection, DataCard };
