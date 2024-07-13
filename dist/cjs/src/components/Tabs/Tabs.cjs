'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var index = require('../../../node_modules/@lingui/react/dist/index.cjs');
var colors = require('../../theme/colors.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);

var Tabs = function Tabs(_ref) {
  var _ref$data = _ref.data,
    data = _ref$data === void 0 ? [] : _ref$data,
    _ref$index = _ref.index,
    propsIndex = _ref$index === void 0 ? 0 : _ref$index;
  var _useState = React.useState(propsIndex),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    currentIndex = _useState2[0],
    setCurrentIndex = _useState2[1];
  var handleSelect = function handleSelect() {
    var v = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    return setCurrentIndex(v);
  };
  return /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      paddingBottom: 48
    }
  }, /*#__PURE__*/React__default["default"].createElement("div", {
    style: {
      display: "flex",
      paddingLeft: 8
    }
  }, data.map(function (item, itemIndex) {
    var isCurrent = itemIndex === currentIndex;
    return /*#__PURE__*/React__default["default"].createElement("div", {
      style: {
        cursor: "pointer",
        paddingLeft: 8,
        paddingRight: 8,
        paddingTop: 16,
        paddingBottom: 16,
        opacity: isCurrent ? 1 : 0.5,
        borderBottom: isCurrent ? "solid ".concat(colors.colors.primary_dark, " 2px") : "solid transparent 2px",
        fontSize: 16,
        fontWeight: 500
      },
      onClick: function onClick() {
        return handleSelect(itemIndex);
      },
      key: itemIndex
    }, /*#__PURE__*/React__default["default"].createElement(index.Trans, {
      id: "J/hVSQ",
      message: "{0}",
      values: {
        "0": item.label
      }
    }));
  })), /*#__PURE__*/React__default["default"].createElement("div", null, data.map(function (item, itemIndex) {
    var isCurrent = itemIndex === currentIndex;
    return /*#__PURE__*/React__default["default"].createElement("div", {
      key: itemIndex
    }, isCurrent ? item === null || item === void 0 ? void 0 : item.content : null);
  })));
};

module.exports = Tabs;
