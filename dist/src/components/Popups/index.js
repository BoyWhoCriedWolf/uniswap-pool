import React__default from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { useActivePopups } from '../../state/application/hooks.js';
import styled from 'styled-components';
import { Z_INDEX } from '../../theme/zIndex.js';
import { useAccountDrawer } from '../AccountDrawer/index.js';
import { AutoColumn } from '../Column/index.js';
import ClaimPopup from './ClaimPopup.js';
import PopupItem from './PopupItem.js';

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5;
var MobilePopupWrapper = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: relative;\n  max-width: 100%;\n  margin: 0 auto;\n  display: none;\n  padding-left: 20px;\n  padding-right: 20px;\n\n  ", ";\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n    display: block;\n    padding-top: 20px;\n  "])));
});
var MobilePopupInner = styled.div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  height: 99%;\n  overflow-x: auto;\n  overflow-y: hidden;\n  display: flex;\n  flex-direction: row;\n  -webkit-overflow-scrolling: touch;\n  ::-webkit-scrollbar {\n    display: none;\n  }\n"])));
var FixedPopupColumn = styled(AutoColumn)(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  position: fixed;\n  top: ", ";\n  right: 1rem;\n  max-width: 348px !important;\n  width: 100%;\n  z-index: ", ";\n  transition: ", ";\n\n  ", ";\n"])), function (_ref2) {
  var drawerOpen = _ref2.drawerOpen;
  return "".concat(64 + (drawerOpen ? -50 : 0), "px");
}, Z_INDEX.modal, function (_ref3) {
  var theme = _ref3.theme;
  return "top ".concat(theme.transition.timing.inOut, " ").concat(theme.transition.duration.slow);
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.deprecated_mediaWidth.deprecated_upToSmall(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral(["\n    display: none;\n  "])));
});
function Popups() {
  var _useAccountDrawer = useAccountDrawer(),
    _useAccountDrawer2 = _slicedToArray(_useAccountDrawer, 1),
    isAccountDrawerOpen = _useAccountDrawer2[0];

  // get all popups
  var activePopups = useActivePopups();
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(FixedPopupColumn, {
    gap: "20px",
    drawerOpen: isAccountDrawerOpen,
    "data-testid": "popups"
  }, /*#__PURE__*/React__default.createElement(ClaimPopup, null), activePopups.map(function (item) {
    return /*#__PURE__*/React__default.createElement(PopupItem, {
      key: item.key,
      content: item.content,
      popKey: item.key,
      removeAfterMs: item.removeAfterMs
    });
  })), (activePopups === null || activePopups === void 0 ? void 0 : activePopups.length) > 0 && /*#__PURE__*/React__default.createElement(MobilePopupWrapper, {
    "data-testid": "popups"
  }, /*#__PURE__*/React__default.createElement(MobilePopupInner, null, activePopups // reverse so new items up front
  .slice(0).reverse().map(function (item) {
    return /*#__PURE__*/React__default.createElement(PopupItem, {
      key: item.key,
      content: item.content,
      popKey: item.key,
      removeAfterMs: item.removeAfterMs
    });
  }))));
}

export { Popups as default };
