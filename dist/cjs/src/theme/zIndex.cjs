'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Migrating to a standard z-index system https://getbootstrap.com/docs/5.0/layout/z-index/
// Please avoid using deprecated numbers
var Z_INDEX = /*#__PURE__*/function (Z_INDEX) {
  Z_INDEX[Z_INDEX["deprecated_zero"] = 0] = "deprecated_zero";
  Z_INDEX[Z_INDEX["default"] = 1] = "default";
  Z_INDEX[Z_INDEX["hover"] = 2] = "hover";
  Z_INDEX[Z_INDEX["active"] = 3] = "active";
  Z_INDEX[Z_INDEX["under_dropdown"] = 990] = "under_dropdown";
  Z_INDEX[Z_INDEX["dropdown"] = 1000] = "dropdown";
  Z_INDEX[Z_INDEX["sticky"] = 1020] = "sticky";
  Z_INDEX[Z_INDEX["fixed"] = 1030] = "fixed";
  Z_INDEX[Z_INDEX["modalBackdrop"] = 1040] = "modalBackdrop";
  Z_INDEX[Z_INDEX["offcanvas"] = 1050] = "offcanvas";
  Z_INDEX[Z_INDEX["modal"] = 1060] = "modal";
  Z_INDEX[Z_INDEX["popover"] = 1070] = "popover";
  Z_INDEX[Z_INDEX["tooltip"] = 1080] = "tooltip";
  Z_INDEX[Z_INDEX["modalOverTooltip"] = 1090] = "modalOverTooltip";
  return Z_INDEX;
}({});

exports.Z_INDEX = Z_INDEX;
