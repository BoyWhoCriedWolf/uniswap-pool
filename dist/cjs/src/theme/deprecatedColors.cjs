'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var colors = require('./colors.cjs');
var utils = require('./utils.cjs');

function getDeprecatedTheme(darkMode) {
  return {
    // other
    deprecated_yellow1: colors.colors.yellow400,
    deprecated_yellow2: colors.colors.yellow500,
    deprecated_yellow3: colors.colors.yellow600,
    // dont wanna forget these blue yet
    deprecated_blue4: darkMode ? "#153d6f70" : "#C4D9F8",
    deprecated_backgroundScrolledSurface: darkMode ? utils.opacify(72, colors.colors.white) : utils.opacify(72, "#131313"),
    deprecated_accentWarning: colors.colors.gold200,
    deprecated_accentWarningSoft: utils.opacify(24, colors.colors.gold200),
    deprecated_accentFailureSoft: utils.opacify(12, colors.colors.critical),
    deprecated_accentTextLightPrimary: colors.colors.gray50,
    deprecated_deepShadow: darkMode ? "12px 16px 24px rgba(0, 0, 0, 0.24), 12px 8px 12px rgba(0, 0, 0, 0.24), 4px 4px 8px rgba(0, 0, 0, 0.32);" : "8px 12px 20px rgba(51, 53, 72, 0.04), 4px 6px 12px rgba(51, 53, 72, 0.02), 4px 4px 8px rgba(51, 53, 72, 0.04);",
    deprecated_shallowShadow: darkMode ? "0px 0px 10px 0px rgba(34, 34, 34, 0.04);" : "0px 0px 10px 0px rgba(34, 34, 34, 0.04);",
    deprecated_networkDefaultShadow: darkMode ? "0px 40px 120px ".concat(utils.opacify(16, colors.colors.accent1_dark)) : "0px 40px 120px ".concat(utils.opacify(12, colors.colors.accent1_light)),
    deprecated_stateOverlayHover: utils.opacify(8, colors.colors.gray300),
    deprecated_stateOverlayPressed: utils.opacify(24, colors.colors.gray200),
    deprecated_hoverState: utils.opacify(24, colors.colors.gray300),
    deprecated_hoverDefault: utils.opacify(8, colors.colors.gray300)
  };
}
var lightDeprecatedTheme = getDeprecatedTheme(false);
var darkDeprecatedTheme = getDeprecatedTheme(true);

exports.darkDeprecatedTheme = darkDeprecatedTheme;
exports.lightDeprecatedTheme = lightDeprecatedTheme;
