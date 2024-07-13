'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var styled = require('styled-components');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var flexColumnNoWrap = styled.css(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-flow: column nowrap;\n"])));
var flexRowNoWrap = styled.css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  flex-flow: row nowrap;\n"])));
var TRANSITION_DURATIONS = /*#__PURE__*/function (TRANSITION_DURATIONS) {
  TRANSITION_DURATIONS[TRANSITION_DURATIONS["slow"] = 500] = "slow";
  TRANSITION_DURATIONS[TRANSITION_DURATIONS["medium"] = 250] = "medium";
  TRANSITION_DURATIONS[TRANSITION_DURATIONS["fast"] = 125] = "fast";
  return TRANSITION_DURATIONS;
}({});
var transitions = {
  duration: {
    slow: "".concat(TRANSITION_DURATIONS.slow, "ms"),
    medium: "".concat(TRANSITION_DURATIONS.medium, "ms"),
    fast: "".concat(TRANSITION_DURATIONS.fast, "ms")
  },
  timing: {
    ease: "ease",
    "in": "ease-in",
    out: "ease-out",
    inOut: "ease-in-out"
  }
};
var fadeIn = styled.keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral__default["default"](["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
styled.css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral__default["default"](["\n  animation: ", " ", " ", ";\n"])), fadeIn, transitions.duration.fast, transitions.timing["in"]);

exports.TRANSITION_DURATIONS = TRANSITION_DURATIONS;
exports.flexColumnNoWrap = flexColumnNoWrap;
exports.flexRowNoWrap = flexRowNoWrap;
