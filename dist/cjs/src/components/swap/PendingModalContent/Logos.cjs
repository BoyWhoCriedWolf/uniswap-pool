'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _extends = require('@babel/runtime/helpers/extends');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var papersText = require('../../../assets/svg/papers-text.cjs');
var LoadingSpinner = require('../../Icons/LoadingSpinner.cjs');
var CurrencyLogo = require('../../Logo/CurrencyLogo.cjs');
var useUnmountingAnimation = require('../../../hooks/useUnmountingAnimation.cjs');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _excluded = ["children", "className", "$scale"];
var _templateObject, _templateObject2, _templateObject3, _templateObject4, _templateObject5, _templateObject6, _templateObject7, _templateObject8, _templateObject9, _templateObject10, _templateObject11, _templateObject12, _templateObject13, _templateObject14, _templateObject15, _templateObject16, _templateObject17;
var LogoContainer = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  height: 48px;\n  width: 48px;\n  position: relative;\n  display: flex;\n  border-radius: 50%;\n  overflow: visible;\n"])));
var fadeIn = styled.keyframes(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  from { opacity: 0;}\n  to { opacity: 1;}\n"])));
var fadeAndScaleIn = styled.keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  from { opacity: 0; transform: scale(0); }\n  to { opacity: 1; transform: scale(1); }\n"])));
var fadeInAnimation = styled.css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  animation: ", "\n    ", ";\n"])), fadeIn, function (_ref) {
  var theme = _ref.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
});
var fadeAndScaleInAnimation = styled.css(_templateObject5 || (_templateObject5 = _taggedTemplateLiteral__default["default"](["\n  animation: ", "\n    ", ";\n"])), fadeAndScaleIn, function (_ref2) {
  var theme = _ref2.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
});
var fadeOut = styled.keyframes(_templateObject6 || (_templateObject6 = _taggedTemplateLiteral__default["default"](["\n  from { opacity: 1; }\n  to { opacity: 0;  }\n"])));
var fadeAndScaleOut = styled.keyframes(_templateObject7 || (_templateObject7 = _taggedTemplateLiteral__default["default"](["\n  from { opacity: 1; transform: scale(1); }\n  to { opacity: 0; transform: scale(0); }\n"])));
var fadeOutAnimation = styled.css(_templateObject8 || (_templateObject8 = _taggedTemplateLiteral__default["default"](["\n  animation: ", "\n    ", ";\n"])), fadeOut, function (_ref3) {
  var theme = _ref3.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
});
var fadeAndScaleOutAnimation = styled.css(_templateObject9 || (_templateObject9 = _taggedTemplateLiteral__default["default"](["\n  animation: ", "\n    ", ";\n"])), fadeAndScaleOut, function (_ref4) {
  var theme = _ref4.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
});
var AnimationType = /*#__PURE__*/function (AnimationType) {
  AnimationType["EXITING"] = "exiting";
  return AnimationType;
}({});
var FadeWrapper = styled__default["default"].div(_templateObject10 || (_templateObject10 = _taggedTemplateLiteral__default["default"](["\n  transition: display\n      ", ",\n    transform\n      ", ";\n  ", "\n\n  &.", " {\n    ", "\n  }\n"])), function (_ref5) {
  var theme = _ref5.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
}, function (_ref6) {
  var theme = _ref6.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
}, function (_ref7) {
  var $scale = _ref7.$scale;
  return $scale ? fadeAndScaleInAnimation : fadeInAnimation;
}, AnimationType.EXITING, function (_ref8) {
  var $scale = _ref8.$scale;
  return $scale ? fadeAndScaleOutAnimation : fadeOutAnimation;
});
function FadePresence(_ref9) {
  var children = _ref9.children,
    className = _ref9.className,
    _ref9$$scale = _ref9.$scale,
    $scale = _ref9$$scale === void 0 ? false : _ref9$$scale,
    rest = _objectWithoutProperties__default["default"](_ref9, _excluded);
  var ref = React.useRef(null);
  useUnmountingAnimation.useUnmountingAnimation(ref, function () {
    return AnimationType.EXITING;
  });
  return /*#__PURE__*/React__default["default"].createElement(FadeWrapper, _extends__default["default"]({
    ref: ref,
    className: className,
    $scale: $scale
  }, rest), children);
}
var CurrencyLoaderContainer = styled__default["default"](FadePresence)(_templateObject11 || (_templateObject11 = _taggedTemplateLiteral__default["default"](["\n  z-index: 2;\n  border-radius: 50%;\n  transition: all\n    ", ";\n  position: absolute;\n  height: ", ";\n  width: ", ";\n  bottom: ", ";\n  right: ", ";\n  outline: ", ";\n"])), function (_ref10) {
  var theme = _ref10.theme;
  return "".concat(theme.transition.duration.medium, " ").concat(theme.transition.timing.inOut);
}, function (_ref11) {
  var asBadge = _ref11.asBadge;
  return asBadge ? "20px" : "100%";
}, function (_ref12) {
  var asBadge = _ref12.asBadge;
  return asBadge ? "20px" : "100%";
}, function (_ref13) {
  var asBadge = _ref13.asBadge;
  return asBadge ? "-4px" : 0;
}, function (_ref14) {
  var asBadge = _ref14.asBadge;
  return asBadge ? "-4px" : 0;
}, function (_ref15) {
  var theme = _ref15.theme,
    asBadge = _ref15.asBadge;
  return asBadge ? "2px solid ".concat(theme.background) : "";
});
var RaisedCurrencyLogo = styled__default["default"](CurrencyLogo)(_templateObject12 || (_templateObject12 = _taggedTemplateLiteral__default["default"](["\n  z-index: 1;\n"])));
function CurrencyLoader(_ref16) {
  var currency = _ref16.currency,
    _ref16$asBadge = _ref16.asBadge,
    asBadge = _ref16$asBadge === void 0 ? false : _ref16$asBadge;
  return /*#__PURE__*/React__default["default"].createElement(CurrencyLoaderContainer, {
    asBadge: asBadge,
    "data-testid": "pending-modal-currency-logo-".concat(currency === null || currency === void 0 ? void 0 : currency.symbol)
  }, /*#__PURE__*/React__default["default"].createElement(RaisedCurrencyLogo, {
    currency: currency,
    size: "100%"
  }));
}
var PinkCircle = styled__default["default"](FadePresence)(_templateObject13 || (_templateObject13 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  display: flex;\n  height: 100%;\n  width: 100%;\n  border-radius: 50%;\n  align-items: center;\n  justify-content: center;\n  background-color: ", ";\n  z-index: 1;\n"])), function (_ref17) {
  var theme = _ref17.theme;
  return theme.accent1;
});
function PaperIcon() {
  return /*#__PURE__*/React__default["default"].createElement(PinkCircle, null, /*#__PURE__*/React__default["default"].createElement(papersText.ReactComponent, null));
}
var LoadingIndicator = styled__default["default"](LoadingSpinner.LoaderV3)(_templateObject14 || (_templateObject14 = _taggedTemplateLiteral__default["default"](["\n  stroke: ", ";\n  fill: ", ";\n  width: calc(100% + 8px);\n  height: calc(100% + 8px);\n  top: -4px;\n  left: -4px;\n  position: absolute;\n"])), function (_ref18) {
  var theme = _ref18.theme;
  return theme.neutral3;
}, function (_ref19) {
  var theme = _ref19.theme;
  return theme.neutral3;
});
function LoadingIndicatorOverlay() {
  return /*#__PURE__*/React__default["default"].createElement(FadePresence, null, /*#__PURE__*/React__default["default"].createElement(LoadingIndicator, null));
}
function ConfirmedIcon(_ref20) {
  var className = _ref20.className;
  var theme = styled.useTheme();
  return /*#__PURE__*/React__default["default"].createElement(FadePresence, {
    $scale: true
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "data-testid": "confirmed-icon",
    width: "54",
    height: "54",
    viewBox: "0 0 54 54",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: className
  }, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M27 0.333008C12.28 0.333008 0.333313 12.2797 0.333313 26.9997C0.333313 41.7197 12.28 53.6663 27 53.6663C41.72 53.6663 53.6666 41.7197 53.6666 26.9997C53.6666 12.2797 41.72 0.333008 27 0.333008ZM37.7466 22.1997L25.2933 34.6263C24.9199 35.0263 24.4133 35.2131 23.8799 35.2131C23.3733 35.2131 22.8666 35.0263 22.4666 34.6263L16.2533 28.4131C15.48 27.6398 15.48 26.3596 16.2533 25.5863C17.0266 24.8129 18.3066 24.8129 19.08 25.5863L23.8799 30.3864L34.92 19.373C35.6933 18.573 36.9733 18.573 37.7466 19.373C38.52 20.1464 38.52 21.3997 37.7466 22.1997Z",
    fill: theme.success
  })));
}
function SubmittedIcon(_ref21) {
  var className = _ref21.className;
  var theme = styled.useTheme();
  return /*#__PURE__*/React__default["default"].createElement(FadePresence, {
    $scale: true
  }, /*#__PURE__*/React__default["default"].createElement("svg", {
    "data-testid": "submitted-icon",
    width: "54",
    height: "54",
    viewBox: "0 0 54 54",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    className: className
  }, /*#__PURE__*/React__default["default"].createElement("path", {
    d: "M26.9997 0.333496C12.2717 0.333496 0.333008 12.2722 0.333008 27.0002C0.333008 41.7282 12.2717 53.6668 26.9997 53.6668C41.7277 53.6668 53.6663 41.7282 53.6663 27.0002C53.6663 12.2722 41.7277 0.333496 26.9997 0.333496ZM36.4131 25.7469C36.0238 26.1362 35.5117 26.3335 34.9997 26.3335C34.4877 26.3335 33.9756 26.1389 33.5863 25.7469L28.9997 21.1603V37.6668C28.9997 38.7708 28.1037 39.6668 26.9997 39.6668C25.8957 39.6668 24.9997 38.7708 24.9997 37.6668V21.1629L20.4131 25.7495C19.6318 26.5308 18.365 26.5308 17.5837 25.7495C16.8023 24.9682 16.8023 23.7014 17.5837 22.9201L25.5837 14.9201C25.7677 14.7361 25.9887 14.5898 26.2341 14.4884C26.722 14.2858 27.274 14.2858 27.762 14.4884C28.0074 14.5898 28.2291 14.7361 28.4131 14.9201L36.4131 22.9201C37.1944 23.7014 37.1944 24.9656 36.4131 25.7469Z",
    fill: theme.accent1
  })));
}
var IconCss = styled.css(_templateObject15 || (_templateObject15 = _taggedTemplateLiteral__default["default"](["\n  position: absolute;\n  height: 48px;\n  width: 48px;\n"])));
var AnimatedEntranceConfirmationIcon = styled__default["default"](ConfirmedIcon)(_templateObject16 || (_templateObject16 = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), IconCss);
var AnimatedEntranceSubmittedIcon = styled__default["default"](SubmittedIcon)(_templateObject17 || (_templateObject17 = _taggedTemplateLiteral__default["default"](["\n  ", "\n"])), IconCss);

exports.AnimatedEntranceConfirmationIcon = AnimatedEntranceConfirmationIcon;
exports.AnimatedEntranceSubmittedIcon = AnimatedEntranceSubmittedIcon;
exports.AnimationType = AnimationType;
exports.CurrencyLoader = CurrencyLoader;
exports.FadePresence = FadePresence;
exports.LoadingIndicatorOverlay = LoadingIndicatorOverlay;
exports.LogoContainer = LogoContainer;
exports.PaperIcon = PaperIcon;
