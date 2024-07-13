'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index = require('../Tooltip/index.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var QuestionWrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 0px;\n  width: 18px;\n  height: 18px;\n  border: none;\n  background: none;\n  outline: none;\n  cursor: default;\n  border-radius: 36px;\n  font-size: 12px;\n  border-radius: 12px;\n\n  :hover,\n  :focus {\n    opacity: 0.7;\n  }\n"])));
var QuestionMark = styled__default["default"].span(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  font-size: 14px;\n  margin-left: 8px;\n  align-items: center;\n  color: ", ";\n  margin-top: 2.5px;\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
function QuestionHelper(_ref2) {
  var text = _ref2.text;
  var _useState = React.useState(false),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    show = _useState2[0],
    setShow = _useState2[1];
  var open = React.useCallback(function () {
    return setShow(true);
  }, [setShow]);
  var close = React.useCallback(function () {
    return setShow(false);
  }, [setShow]);
  return /*#__PURE__*/React__default["default"].createElement("span", {
    style: {
      marginLeft: 4,
      display: "flex",
      alignItems: "center"
    }
  }, /*#__PURE__*/React__default["default"].createElement(index["default"], {
    text: text,
    show: show
  }, /*#__PURE__*/React__default["default"].createElement(QuestionWrapper, {
    onClick: open,
    onMouseEnter: open,
    onMouseLeave: close
  }, /*#__PURE__*/React__default["default"].createElement(QuestionMark, null, /*#__PURE__*/React__default["default"].createElement(reactFeather.HelpCircle, {
    size: 16
  })))));
}

module.exports = QuestionHelper;
