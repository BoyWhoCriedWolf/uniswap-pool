'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _extends = require('@babel/runtime/helpers/extends');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var Portal = require('@reach/portal');
var useInterval = require('../../lib/hooks/useInterval.cjs');
var React = require('react');
var reactPopper = require('react-popper');
var styled = require('styled-components');
var zIndex = require('../../theme/zIndex.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var Portal__default = /*#__PURE__*/_interopDefaultLegacy(Portal);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2, _templateObject3;
var PopoverContainer = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  z-index: ", ";\n  pointer-events: none;\n  visibility: ", ";\n  opacity: ", ";\n  transition: visibility 150ms linear, opacity 150ms linear;\n  color: ", ";\n"])), zIndex.Z_INDEX.popover, function (props) {
  return props.show ? "visible" : "hidden";
}, function (props) {
  return props.show ? 1 : 0;
}, function (_ref) {
  var theme = _ref.theme;
  return theme.neutral2;
});
var ReferenceElement = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  display: inline-block;\n  height: inherit;\n"])));
var Arrow = styled__default["default"].div(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  width: 8px;\n  height: 8px;\n  z-index: 9998;\n\n  ::before {\n    position: absolute;\n    width: 8px;\n    height: 8px;\n    box-sizing: border-box;\n    z-index: 9998;\n\n    content: \"\";\n    border: 1px solid ", ";\n    transform: rotate(45deg);\n    background: ", ";\n  }\n\n  &.arrow-top {\n    bottom: -4px;\n    ::before {\n      border-top: none;\n      border-left: none;\n    }\n  }\n\n  &.arrow-bottom {\n    top: -4px;\n    ::before {\n      border-bottom: none;\n      border-right: none;\n    }\n  }\n\n  &.arrow-left {\n    right: -4px;\n\n    ::before {\n      border-bottom: none;\n      border-left: none;\n    }\n  }\n\n  &.arrow-right {\n    left: -4px;\n    ::before {\n      border-right: none;\n      border-top: none;\n    }\n  }\n"])), function (_ref2) {
  var theme = _ref2.theme;
  return theme.surface3;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.surface1;
});
function Popover(_ref4) {
  var _attributes$popper$da, _attributes$popper;
  var content = _ref4.content,
    show = _ref4.show,
    children = _ref4.children,
    _ref4$placement = _ref4.placement,
    placement = _ref4$placement === void 0 ? "auto" : _ref4$placement,
    _ref4$offsetX = _ref4.offsetX,
    offsetX = _ref4$offsetX === void 0 ? 8 : _ref4$offsetX,
    _ref4$offsetY = _ref4.offsetY,
    offsetY = _ref4$offsetY === void 0 ? 8 : _ref4$offsetY,
    _ref4$hideArrow = _ref4.hideArrow,
    hideArrow = _ref4$hideArrow === void 0 ? false : _ref4$hideArrow,
    _ref4$showInline = _ref4.showInline,
    showInline = _ref4$showInline === void 0 ? false : _ref4$showInline,
    style = _ref4.style;
  var _useState = React.useState(null),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    referenceElement = _useState2[0],
    setReferenceElement = _useState2[1];
  var _useState3 = React.useState(null),
    _useState4 = _slicedToArray__default["default"](_useState3, 2),
    popperElement = _useState4[0],
    setPopperElement = _useState4[1];
  var _useState5 = React.useState(null),
    _useState6 = _slicedToArray__default["default"](_useState5, 2),
    arrowElement = _useState6[0],
    setArrowElement = _useState6[1];
  var options = React.useMemo(function () {
    return {
      placement: placement,
      strategy: "fixed",
      modifiers: [{
        name: "offset",
        options: {
          offset: [offsetX, offsetY]
        }
      }, {
        name: "arrow",
        options: {
          element: arrowElement
        }
      }, {
        name: "preventOverflow",
        options: {
          padding: 8
        }
      }]
    };
  }, [placement, offsetX, offsetY, arrowElement]);
  var _usePopper = reactPopper.usePopper(referenceElement, show ? popperElement : null, options),
    styles = _usePopper.styles,
    update = _usePopper.update,
    attributes = _usePopper.attributes;
  var updateCallback = React.useCallback(function () {
    update && update();
  }, [update]);
  useInterval(updateCallback, show ? 100 : null);
  return showInline ? /*#__PURE__*/React__default["default"].createElement(PopoverContainer, {
    show: show
  }, content) : /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(ReferenceElement, {
    style: style,
    ref: setReferenceElement
  }, children), /*#__PURE__*/React__default["default"].createElement(Portal__default["default"], null, /*#__PURE__*/React__default["default"].createElement(PopoverContainer, _extends__default["default"]({
    show: show,
    ref: setPopperElement,
    style: styles.popper
  }, attributes.popper), content, !hideArrow && /*#__PURE__*/React__default["default"].createElement(Arrow, _extends__default["default"]({
    className: "arrow-".concat((_attributes$popper$da = (_attributes$popper = attributes.popper) === null || _attributes$popper === void 0 ? void 0 : _attributes$popper["data-popper-placement"]) !== null && _attributes$popper$da !== void 0 ? _attributes$popper$da : ""),
    ref: setArrowElement,
    style: styles.arrow
  }, attributes.arrow)))));
}

exports.Arrow = Arrow;
exports["default"] = Popover;
