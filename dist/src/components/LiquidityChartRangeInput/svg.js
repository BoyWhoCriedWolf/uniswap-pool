import React__default from 'react';

/**
 * Generates an SVG path for the east brush handle.
 * Apply `scale(-1, 1)` to generate west brush handle.
 *
 *    |```````\
 *    |  | |  |
 *    |______/
 *    |
 *    |
 *    |
 *    |
 *    |
 *
 * https://medium.com/@dennismphil/one-side-rounded-rectangle-using-svg-fb31cf318d90
 */
var brushHandlePath = function brushHandlePath(height) {
  return [// handle
  "M 0 0", // move to origin
  "v ".concat(height),
  // vertical line
  "m 1 0", // move 1px to the right
  "V 0", // second vertical line
  "M 0 1",
  // move to origin

  // head
  "h 12",
  // horizontal line
  "q 2 0, 2 2",
  // rounded corner
  "v 22",
  // vertical line
  "q 0 2 -2 2",
  // rounded corner
  "h -12", // horizontal line
  "z" // close path
  ].join(" ");
};
var brushHandleAccentPath = function brushHandleAccentPath() {
  return ["m 5 7",
  // move to first accent
  "v 14",
  // vertical line
  "M 0 0",
  // move to origin
  "m 9 7",
  // move to second accent
  "v 14",
  // vertical line
  "z"].join(" ");
};
var OffScreenHandle = function OffScreenHandle(_ref) {
  var color = _ref.color,
    _ref$size = _ref.size,
    size = _ref$size === void 0 ? 10 : _ref$size,
    _ref$margin = _ref.margin,
    margin = _ref$margin === void 0 ? 10 : _ref$margin;
  return /*#__PURE__*/React__default.createElement("polygon", {
    points: "0 0, ".concat(size, " ").concat(size, ", 0 ").concat(size),
    transform: " translate(".concat(size + margin, ", ").concat(margin, ") rotate(45) "),
    fill: color,
    stroke: color,
    strokeWidth: "4",
    strokeLinejoin: "round"
  });
};

export { OffScreenHandle, brushHandleAccentPath, brushHandlePath };
