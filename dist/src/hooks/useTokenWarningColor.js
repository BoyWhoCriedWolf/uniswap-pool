import { WARNING_LEVEL } from '../constants/tokenSafety.js';
import { useTheme } from 'styled-components';

var useTokenWarningTextColor = function useTokenWarningTextColor(level) {
  var theme = useTheme();
  switch (level) {
    case WARNING_LEVEL.MEDIUM:
      return theme.deprecated_accentWarning;
    case WARNING_LEVEL.UNKNOWN:
      return theme.critical;
    case WARNING_LEVEL.BLOCKED:
      return theme.neutral2;
  }
};
var useTokenWarningColor = function useTokenWarningColor(level) {
  var theme = useTheme();
  switch (level) {
    case WARNING_LEVEL.MEDIUM:
    case WARNING_LEVEL.BLOCKED:
      return theme.surface3;
    case WARNING_LEVEL.UNKNOWN:
      return theme.deprecated_accentFailureSoft;
  }
};

export { useTokenWarningColor, useTokenWarningTextColor };
