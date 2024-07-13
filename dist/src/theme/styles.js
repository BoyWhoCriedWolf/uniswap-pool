import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { css, keyframes } from 'styled-components';

var _templateObject, _templateObject2, _templateObject3, _templateObject4;
var flexColumnNoWrap = css(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  display: flex;\n  flex-flow: column nowrap;\n"])));
var flexRowNoWrap = css(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  flex-flow: row nowrap;\n"])));
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
var fadeIn = keyframes(_templateObject3 || (_templateObject3 = _taggedTemplateLiteral(["\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n"])));
css(_templateObject4 || (_templateObject4 = _taggedTemplateLiteral(["\n  animation: ", " ", " ", ";\n"])), fadeIn, transitions.duration.fast, transitions.timing["in"]);

export { TRANSITION_DURATIONS, flexColumnNoWrap, flexRowNoWrap };
