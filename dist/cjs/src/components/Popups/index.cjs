'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var hooks = require('../../state/application/hooks.cjs');
var styled = require('styled-components');
var zIndex = require('../../theme/zIndex.cjs');
var index = require('../AccountDrawer/index.cjs');
var index$1 = require('../Column/index.cjs');
var ClaimPopup = require('./ClaimPopup.cjs');
var PopupItem = require('./PopupItem.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var MobilePopupWrapper = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: relative;\n  max-width: 100%;\n  margin: 0 auto;\n  display: none;\n  padding-left: 20px;\n  padding-right: 20px;\n\n  ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n    display: block;\n    padding-top: 20px;\n  "])));
});
var MobilePopupInner = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  height: 99%;\n  overflow-x: auto;\n  overflow-y: hidden;\n  display: flex;\n  flex-direction: row;\n  -webkit-overflow-scrolling: touch;\n  ::-webkit-scrollbar {\n    display: none;\n  }\n"])));
var FixedPopupColumn = styled__default["default"](index$1.AutoColumn)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  position: fixed;\n  top: ", ";\n  right: 1rem;\n  max-width: 348px !important;\n  width: 100%;\n  z-index: ", ";\n  transition: ", ";\n\n  ", ";\n"])), function (_ref2) {
  var drawerOpen = _ref2.drawerOpen;
  return "".concat(64 + (drawerOpen ? -50 : 0), "px");
}, zIndex.Z_INDEX.modal, function (_ref3) {
  var theme = _ref3.theme;
  return "top ".concat(theme.transition.timing.inOut, " ").concat(theme.transition.duration.slow);
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n    display: none;\n  "])));
});
function Popups() {
  var _useAccountDrawer = index.useAccountDrawer(),
    _useAccountDrawer2 = _slicedToArray__default["default"](_useAccountDrawer, 1),
    isAccountDrawerOpen = _useAccountDrawer2[0];

  // get all popups
  var activePopups = hooks.useActivePopups();
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(FixedPopupColumn, {
    gap: "20px",
    drawerOpen: isAccountDrawerOpen,
    "data-testid": "popups"
  }, /*#__PURE__*/React__default["default"].createElement(ClaimPopup, null), activePopups.map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement(PopupItem, {
      key: item.key,
      content: item.content,
      popKey: item.key,
      removeAfterMs: item.removeAfterMs
    });
  })), (activePopups === null || activePopups === void 0 ? void 0 : activePopups.length) > 0 && /*#__PURE__*/React__default["default"].createElement(MobilePopupWrapper, {
    "data-testid": "popups"
  }, /*#__PURE__*/React__default["default"].createElement(MobilePopupInner, null, activePopups // reverse so new items up front
  .slice(0).reverse().map(function (item) {
    return /*#__PURE__*/React__default["default"].createElement(PopupItem, {
      key: item.key,
      content: item.content,
      popKey: item.key,
      removeAfterMs: item.removeAfterMs
    });
  }))));
}

module.exports = Popups;
