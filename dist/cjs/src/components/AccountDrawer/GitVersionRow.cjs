'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../Tooltip/index.cjs');
var useCopyClipboard = require('../../hooks/useCopyClipboard.cjs');
var styled = require('styled-components');
require('../../theme/components/index.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject;
var Container = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  width: 100%;\n  cursor: pointer;\n"])));
function GitVersionRow() {
  var _useCopyClipboard = useCopyClipboard(),
    _useCopyClipboard2 = _slicedToArray__default["default"](_useCopyClipboard, 2),
    isCopied = _useCopyClipboard2[0],
    staticCopy = _useCopyClipboard2[1];
  return process.env.REACT_APP_GIT_COMMIT_HASH ? /*#__PURE__*/React__default["default"].createElement(Container, {
    onClick: function onClick() {
      staticCopy(process.env.REACT_APP_GIT_COMMIT_HASH);
    }
  }, /*#__PURE__*/React__default["default"].createElement(index["default"], {
    text: "Copied",
    show: isCopied
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySmall, {
    color: "neutral3"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "csCoda",
    message: "Version:"
  }), " " + process.env.REACT_APP_GIT_COMMIT_HASH.substring(0, 6)))) : null;
}

exports.GitVersionRow = GitVersionRow;
