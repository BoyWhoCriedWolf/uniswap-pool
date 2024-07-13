import React__default, { useMemo, useState } from 'react';
import _slicedToArray from '@babel/runtime/helpers/slicedToArray';
import _taggedTemplateLiteral from '@babel/runtime/helpers/taggedTemplateLiteral';
import { featureFlagSettings, FeatureFlag, BaseVariant } from '../featureFlags/index.js';
import { useAtomValue } from 'jotai/utils';
import { useGate } from 'statsig-react';
import styled from 'styled-components';
import '../theme/components/index.js';
import { isStagingEnv, isDevelopmentEnv } from '../utils/env.js';
import { ThemedText } from '../theme/components/text.js';

var _templateObject, _templateObject2;
var Box = styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: fixed;\n  bottom: 20px;\n  left: 20px;\n  background-color: ", ";\n  padding: 10px;\n  border: 1px solid ", ";\n  z-index: 1000;\n\n  @media only screen and (max-width: ", ") {\n    bottom: 70px;\n  }\n"])), function (_ref) {
  var theme = _ref.theme;
  return theme.surface1;
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.accent1;
}, function (_ref3) {
  var theme = _ref3.theme;
  return "".concat(theme.breakpoint.md, "px");
});
var TopBar = styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  display: flex;\n  justify-content: space-between;\n"])));
var Gate = function Gate(flagName, featureFlagSettings) {
  var gateResult = useGate(flagName);
  if (gateResult) {
    var statsigValue = gateResult.value;
    var flagSetting = featureFlagSettings[flagName];
    var settingValue = flagSetting === BaseVariant.Enabled;
    if (flagSetting && statsigValue !== settingValue) {
      return /*#__PURE__*/React__default.createElement(ThemedText.LabelSmall, {
        key: flagName
      }, flagName, ": ", flagSetting);
    }
  }
  return null;
};
function DevFlagsBox() {
  var featureFlagsAtom = useAtomValue(featureFlagSettings);
  var featureFlags = useMemo(function () {
    return Object.values(FeatureFlag);
  }, []);
  var overrides = featureFlags.map(function (flagName) {
    return Gate(flagName, featureFlagsAtom);
  });
  var hasOverrides = overrides.some(function (g) {
    return g !== null;
  });
  var _useState = useState(true),
    _useState2 = _slicedToArray(_useState, 2),
    isOpen = _useState2[0],
    setIsOpen = _useState2[1];
  var toggleOpen = function toggleOpen() {
    return setIsOpen(function (open) {
      return !open;
    });
  };
  return /*#__PURE__*/React__default.createElement(Box, null, /*#__PURE__*/React__default.createElement(TopBar, {
    onClick: toggleOpen
  }, isOpen ? "😺👇" : "😿☝️", isOpen && /*#__PURE__*/React__default.createElement(ThemedText.SubHeader, null, isStagingEnv() && "Staging build overrides", isDevelopmentEnv() && "Development build overrides")), isOpen && (hasOverrides ? overrides : /*#__PURE__*/React__default.createElement(ThemedText.LabelSmall, null, "No overrides")));
}

export { DevFlagsBox as default };
