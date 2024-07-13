'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index$3 = require('../../../../../../node_modules/@lingui/react/dist/index.cjs');
var index$4 = require('../../../../../../node_modules/@lingui/core/dist/index.cjs');
var index$2 = require('../../../../../components/Button/index.cjs');
var index = require('../../../../../components/Column/index.cjs');
var Portal = require('../../../common/Portal.cjs');
var Overlay = require('../../../modals/Overlay.cjs');
var React = require('react');
var reactFeather = require('react-feather');
var styled = require('styled-components');
var index$1 = require('../../../../../theme/index.cjs');
require('../../../../../theme/components/index.cjs');
var zIndex = require('../../../../../theme/zIndex.cjs');
var text = require('../../../../../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6;
var ModalWrapper = styled__default["default"](index.Column)(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: fixed;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n  width: 420px;\n  z-index: ", ";\n  background: ", ";\n  border-radius: 20px;\n  border: 1px solid ", ";\n  box-shadow: ", ";\n  padding: 20px 24px 24px;\n  display: flex;\n  flex-direction: column;\n  gap: 12px;\n\n  @media screen and (max-width: ", "px) {\n    width: 100%;\n  }\n"])), zIndex.Z_INDEX.modal, function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.deprecated_deepShadow;
}, index$1.BREAKPOINTS.sm);
var CloseIconWrapper = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  width: 100%;\n  justify-content: flex-end;\n"])));
var CloseIcon = styled__default["default"](reactFeather.X)(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  cursor: pointer;\n  &:hover {\n    opacity: 0.6;\n  }\n"])));
var HazardIconWrap = styled__default["default"].div(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  width: 100%;\n  justify-content: center;\n  align-items: center;\n  padding: 32px 120px;\n"])));
var ContinueButton = styled__default["default"](index$2.ButtonPrimary)(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  font-weight: 535;\n  font-size: 20px;\n  line-height: 24px;\n  margin-top: 12px;\n"])));
var EditListings = styled__default["default"].span(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  font-weight: 535;\n  font-size: 16px;\n  line-height: 20px;\n  color: ", ";\n  text-align: center;\n  cursor: pointer;\n  padding: 12px 16px;\n\n  &:hover {\n    opacity: 0.6;\n  }\n"])), function (_ref4) {
  var theme = _ref4.theme;
  return theme.accent1;
});
var BelowFloorWarningModal = function BelowFloorWarningModal(_ref5) {
  var _listingsBelowFloor$, _listingsBelowFloor$2;
  var listingsBelowFloor = _ref5.listingsBelowFloor,
    closeModal = _ref5.closeModal,
    startListing = _ref5.startListing;
  var theme = styled.useTheme();
  var clickContinue = function clickContinue(e) {
    e.preventDefault();
    e.stopPropagation();
    startListing();
    closeModal();
  };
  return /*#__PURE__*/React__default["default"].createElement(Portal.Portal, null, /*#__PURE__*/React__default["default"].createElement(ModalWrapper, null, /*#__PURE__*/React__default["default"].createElement(CloseIconWrapper, null, /*#__PURE__*/React__default["default"].createElement(CloseIcon, {
    width: 24,
    height: 24,
    onClick: closeModal
  }), " "), /*#__PURE__*/React__default["default"].createElement(HazardIconWrap, null, /*#__PURE__*/React__default["default"].createElement(reactFeather.AlertTriangle, {
    height: 90,
    width: 90,
    color: theme.critical
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.HeadlineSmall, {
    lineHeight: "28px",
    textAlign: "center"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "nJdoNI",
    message: "Low listing price"
  })), /*#__PURE__*/React__default["default"].createElement(text.ThemedText.BodyPrimary, {
    textAlign: "center"
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "+VPrZ3",
    message: "{0, plural, =1 {{1}} other {{2}}}",
    values: {
      "0": listingsBelowFloor.length !== 1 ? 2 : 1,
      "1": index$4.i18n._(
      /*i18n*/
      {
        id: "r01GAQ",
        message: "One NFT is listed {0}%",
        values: {
          "0": ((1 - ((_listingsBelowFloor$ = listingsBelowFloor[0][1].price) !== null && _listingsBelowFloor$ !== void 0 ? _listingsBelowFloor$ : 0) / ((_listingsBelowFloor$2 = listingsBelowFloor[0][0].floorPrice) !== null && _listingsBelowFloor$2 !== void 0 ? _listingsBelowFloor$2 : 0)) * 100).toFixed(0)
        }
      }),
      "2": index$4.i18n._(
      /*i18n*/
      {
        id: "7fIIB5",
        message: "{0} NFTs are listed significantly",
        values: {
          "0": listingsBelowFloor.length
        }
      })
    }
  }), "\xA0", /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "LngMh5",
    message: "below the collection\u2019s floor price. Are you sure you want to continue?"
  })), /*#__PURE__*/React__default["default"].createElement(ContinueButton, {
    onClick: clickContinue
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "xGVfLh",
    message: "Continue"
  })), /*#__PURE__*/React__default["default"].createElement(EditListings, {
    onClick: closeModal
  }, /*#__PURE__*/React__default["default"].createElement(index$3.Trans, {
    id: "jUcBoP",
    message: "Edit listings"
  }))), /*#__PURE__*/React__default["default"].createElement(Overlay.Overlay, {
    onClick: closeModal
  }));
};

exports.BelowFloorWarningModal = BelowFloorWarningModal;
