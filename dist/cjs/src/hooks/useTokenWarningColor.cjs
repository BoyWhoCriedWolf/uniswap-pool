'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tokenSafety = require('../constants/tokenSafety.cjs');
var styled = require('styled-components');

var useTokenWarningTextColor = function useTokenWarningTextColor(level) {
  var theme = styled.useTheme();
  switch (level) {
    case tokenSafety.WARNING_LEVEL.MEDIUM:
      return theme.deprecated_accentWarning;
    case tokenSafety.WARNING_LEVEL.UNKNOWN:
      return theme.critical;
    case tokenSafety.WARNING_LEVEL.BLOCKED:
      return theme.neutral2;
  }
};
var useTokenWarningColor = function useTokenWarningColor(level) {
  var theme = styled.useTheme();
  switch (level) {
    case tokenSafety.WARNING_LEVEL.MEDIUM:
    case tokenSafety.WARNING_LEVEL.BLOCKED:
      return theme.surface3;
    case tokenSafety.WARNING_LEVEL.UNKNOWN:
      return theme.deprecated_accentFailureSoft;
  }
};

exports.useTokenWarningColor = useTokenWarningColor;
exports.useTokenWarningTextColor = useTokenWarningTextColor;
