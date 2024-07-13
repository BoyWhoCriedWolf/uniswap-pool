import React__default, { useState, useCallback } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { HelpCircle } from 'react-feather';
import styled from 'styled-components';
import Tooltip from '../Tooltip/index.js';

var _templateObject, _templateObject2;
var QuestionWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0px;\n  width: 18px;\n  height: 18px;\n  border: none;\n  background: none;\n  outline: none;\n  cursor: default;\n  border-radius: 36px;\n  font-size: 12px;\n  border-radius: 12px;\n\n  :hover,\n  :focus {\n    opacity: 0.7;\n  }\n"])));
var QuestionMark = styled.span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  font-size: 14px;\n  margin-left: 8px;\n  align-items: center;\n  color: ", ";\n  margin-top: 2.5px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
function QuestionHelper(_ref2) {
  var text = _ref2.text;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  var open = useCallback(function () {
    return setShow(true);
  }, [setShow]);
  var close = useCallback(function () {
    return setShow(false);
  }, [setShow]);
  return /*#__PURE__*/React__default.createElement("span", {
    style: {
      marginLeft: 4,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React__default.createElement(Tooltip, {
    text: text,
    show: show
  }, /*#__PURE__*/React__default.createElement(QuestionWrapper, {
    onClick: open,
    onMouseEnter: open,
    onMouseLeave: close
  }, /*#__PURE__*/React__default.createElement(QuestionMark, null, /*#__PURE__*/React__default.createElement(HelpCircle, {
    size: 16
  })))));
}

export { QuestionHelper as default };
