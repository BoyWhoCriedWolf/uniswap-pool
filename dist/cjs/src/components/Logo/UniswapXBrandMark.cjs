'use strict';

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var index = require('../../../node_modules/@lingui/react/dist/index.cjs');
require('../../theme/components/index.cjs');
var UniswapXRouterLabel = require('../RouterLabel/UniswapXRouterLabel.cjs');
var text = require('../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);

var _excluded = ["fontWeight"];
function UniswapXBrandMark(_ref) {
  var fontWeight = _ref.fontWeight,
    props = _objectWithoutProperties__default["default"](_ref, _excluded);
  return /*#__PURE__*/React__default["default"].createElement(UniswapXRouterLabel["default"], props, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodySecondary, _extends__default["default"]({
    fontSize: "inherit"
  }, fontWeight === "bold" && {
    fontWeight: "535"
  }), /*#__PURE__*/React__default["default"].createElement(index.Trans, {
    id: "mzky5m",
    message: "UniswapX"
  })));
}

module.exports = UniswapXBrandMark;
