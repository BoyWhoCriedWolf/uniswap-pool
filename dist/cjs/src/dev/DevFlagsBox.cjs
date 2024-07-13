'use strict';

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var _taggedTemplateLiteral = require('@babel/runtime/helpers/taggedTemplateLiteral');
var index = require('../featureFlags/index.cjs');
var utils = require('jotai/utils');
var statsigReact = require('statsig-react');
var styled = require('styled-components');
require('../theme/components/index.cjs');
var env = require('../utils/env.cjs');
var text = require('../theme/components/text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var _taggedTemplateLiteral__default = /*#__PURE__*/_interopDefaultLegacy(_taggedTemplateLiteral);
var styled__default = /*#__PURE__*/_interopDefaultLegacy(styled);

var _templateObject, _templateObject2;
var Box = styled__default["default"].div(_templateObject || (_templateObject = _taggedTemplateLiteral__default["default"](["\n  position: fixed;\n  bottom: 20px;\n  left: 20px;\n  background-color: ", ";\n  padding: 10px;\n  border: 1px solid ", ";\n  z-index: 1000;\n\n  @media only screen and (max-width: ", ") {\n    bottom: 70px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.accent1;
}, function (_ref3) {
  var theme = _ref3.theme;
  return "".concat(theme.breakpoint.md, "px");
});
var TopBar = styled__default["default"].div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral__default["default"](["\n  display: flex;\n  justify-content: space-between;\n"])));
var Gate = function Gate(flagName, featureFlagSettings) {
  var gateResult = statsigReact.useGate(flagName);
  if (gateResult) {
    var statsigValue = gateResult.value;
    var flagSetting = featureFlagSettings[flagName];
    var settingValue = flagSetting === index.BaseVariant.Enabled;
    if (flagSetting && statsigValue !== settingValue) {
      return /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, {
        key: flagName
      }, flagName, ": ", flagSetting);
    }
  }
  return null;
};
function DevFlagsBox() {
  var featureFlagsAtom = utils.useAtomValue(index.featureFlagSettings);
  var featureFlags = React.useMemo(function () {
    return Object.values(index.FeatureFlag);
  }, []);
  var overrides = featureFlags.map(function (flagName) {
    return Gate(flagName, featureFlagsAtom);
  });
  var hasOverrides = overrides.some(function (g) {
    return g !== null;
  });
  var _useState = React.useState(true),
    _useState2 = _slicedToArray__default["default"](_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var toggleOpen = function toggleOpen() {
    return setIsOpen(function (open) {
      return !open;
    });
  };
  return /*#__PURE__*/React__default["default"].createElement(Box, null, /*#__PURE__*/React__default["default"].createElement(TopBar, {
    onClick: toggleOpen
  }, isOpen ? "😺👇" : "😿☝️", isOpen && /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeader, null, env.isStagingEnv() && "Staging build overrides", env.isDevelopmentEnv() && "Development build overrides")), isOpen && (hasOverrides ? overrides : /*#__PURE__*/React__default["default"].createElement(text.ThemedText.LabelSmall, null, "No overrides")));
}

module.exports = DevFlagsBox;
