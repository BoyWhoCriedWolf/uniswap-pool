'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var sprinkles_css = require('../css/sprinkles.css.cjs');

var lightTheme = {
  colors: {
    neutral1: sprinkles_css.vars.color.neutral1_light,
    neutral2: sprinkles_css.vars.color.neutral2_light,
    neutral3: sprinkles_css.vars.color.neutral3_light,
    surface1: sprinkles_css.vars.color.surface1_light,
    surface2: sprinkles_css.vars.color.surface2_light,
    surface3: sprinkles_css.vars.color.surface3_light,
    surface4: sprinkles_css.vars.color.surface4_light,
    surface5: sprinkles_css.vars.color.surface5_light,
    accent1: sprinkles_css.vars.color.accent1_light,
    accent2: sprinkles_css.vars.color.accent2_light,
    scrim: "rgba(0, 0, 0, 0.60)",
    success: sprinkles_css.vars.color.success,
    critical: sprinkles_css.vars.color.critical,
    white: "#FFFFFF",
    //OLD NAMES
    deprecated_accentFailureSoft: "rgba(250, 43, 57, 0.12)",
    deprecated_modalBackdrop: "rgba(0, 0, 0, 0.3)",
    deprecated_stateOverlayHover: "rgba(153,161,189,0.08)",
    deprecated_gold: sprinkles_css.vars.color.gold400,
    deprecated_violet: sprinkles_css.vars.color.violet400,
    dropShadow: "0px 4px 16px rgba(251, 17, 142, 0.4)"
  },
  shadows: {
    menu: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    elevation: "0px 4px 16px rgba(70, 115, 250, 0.4)",
    tooltip: "0px 4px 16px rgba(10, 10, 59, 0.2)",
    deep: "8px 12px 20px rgba(51, 53, 72, 0.04), 4px 6px 12px rgba(51, 53, 72, 0.02), 4px 4px 8px rgba(51, 53, 72, 0.04)",
    shallow: "4px 4px 10px rgba(0, 0, 0, 0.24), 2px 2px 4px rgba(0, 0, 0, 0.12), 1px 2px 2px rgba(0, 0, 0, 0.12)"
  },
  opacity: {
    hover: "0.6",
    pressed: "0.4"
  }
};

exports.lightTheme = lightTheme;
