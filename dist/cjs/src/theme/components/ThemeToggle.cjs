'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var index$1 = require('../../../node_modules/@lingui/react/dist/index.cjs');
var index = require('../../components/Row/index.cjs');
var jotai = require('jotai');
var utils = require('jotai/utils');
var ms = require('ms');
var reactFeather = require('react-feather');
var matchMedia = require('../../utils/matchMedia.cjs');
var SegmentedControl = require('./SegmentedControl.cjs');
var text = require('./text.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var ms__default = /*#__PURE__*/_interopDefaultLegacy(ms);

var THEME_UPDATE_DELAY = ms__default["default"]("0.1s");
var DARKMODE_MEDIA_QUERY = window.matchMedia("(prefers-color-scheme: dark)");
var ThemeMode = /*#__PURE__*/function (ThemeMode) {
  ThemeMode[ThemeMode["LIGHT"] = 0] = "LIGHT";
  ThemeMode[ThemeMode["DARK"] = 1] = "DARK";
  ThemeMode[ThemeMode["AUTO"] = 2] = "AUTO";
  return ThemeMode;
}({});

// Tracks the device theme
var systemThemeAtom = jotai.atom(DARKMODE_MEDIA_QUERY.matches ? ThemeMode.DARK : ThemeMode.LIGHT);

// Tracks the user's selected theme mode
var themeModeAtom = utils.atomWithStorage("interface_color_theme", ThemeMode.AUTO);
function SystemThemeUpdater() {
  var setSystemTheme = utils.useUpdateAtom(systemThemeAtom);
  var listener = React.useCallback(function (event) {
    setSystemTheme(event.matches ? ThemeMode.DARK : ThemeMode.LIGHT);
  }, [setSystemTheme]);
  React.useEffect(function () {
    matchMedia.addMediaQueryListener(DARKMODE_MEDIA_QUERY, listener);
    return function () {
      return matchMedia.removeMediaQueryListener(DARKMODE_MEDIA_QUERY, listener);
    };
  }, [setSystemTheme, listener]);
  return null;
}
function ThemeColorMetaUpdater() {
  var isDark = useIsDarkMode();
  React.useEffect(function () {
    var meta = document.querySelector("meta[name=theme-color]");
    if (!meta) return;
    if (isDark) {
      // this color comes from #background-radial-gradient
      meta.setAttribute("content", "rgb(19, 19, 19)");
    } else {
      meta.setAttribute("content", "#fff");
    }
  }, [isDark]);
  return null;
}
function useIsDarkMode() {
  var mode = utils.useAtomValue(themeModeAtom);
  var systemTheme = utils.useAtomValue(systemThemeAtom);
  return (mode === ThemeMode.AUTO ? systemTheme : mode) === ThemeMode.DARK;
}
function useDarkModeManager() {
  var isDarkMode = useIsDarkMode();
  var setMode = utils.useUpdateAtom(themeModeAtom);
  return React.useMemo(function () {
    return [isDarkMode, setMode];
  }, [isDarkMode, setMode]);
}
function ThemeToggle(_ref) {
  var disabled = _ref.disabled;
  var _useAtom = jotai.useAtom(themeModeAtom),
    _useAtom2 = _slicedToArray__default["default"](_useAtom, 2),
    mode = _useAtom2[0],
    setMode = _useAtom2[1];
  var switchMode = React.useCallback(function (mode) {
    // Switch feels less jittery with short delay
    !disabled && setTimeout(function () {
      return setMode(mode);
    }, THEME_UPDATE_DELAY);
  }, [disabled, setMode]);
  return /*#__PURE__*/React__default["default"].createElement(index["default"], {
    align: "center"
  }, /*#__PURE__*/React__default["default"].createElement(index["default"], {
    width: "40%"
  }, /*#__PURE__*/React__default["default"].createElement(text.ThemedText.SubHeaderSmall, {
    color: "primary"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "FEr96N",
    message: "Theme"
  }))), /*#__PURE__*/React__default["default"].createElement(index["default"], {
    flexGrow: 1,
    justify: "flex-end",
    width: "60%"
  }, /*#__PURE__*/React__default["default"].createElement(SegmentedControl.SegmentedControl, {
    selected: mode,
    onSelect: switchMode
  }, /*#__PURE__*/React__default["default"].createElement(SegmentedControl.Segment, {
    value: ThemeMode.AUTO,
    testId: "theme-auto"
  }, /*#__PURE__*/React__default["default"].createElement(index$1.Trans, {
    id: "R9Khdg",
    message: "Auto"
  })), /*#__PURE__*/React__default["default"].createElement(SegmentedControl.Segment, {
    value: ThemeMode.LIGHT,
    Icon: reactFeather.Sun,
    testId: "theme-lightmode"
  }), /*#__PURE__*/React__default["default"].createElement(SegmentedControl.Segment, {
    value: ThemeMode.DARK,
    Icon: reactFeather.Moon,
    testId: "theme-darkmode"
  }))));
}

exports.SystemThemeUpdater = SystemThemeUpdater;
exports.ThemeColorMetaUpdater = ThemeColorMetaUpdater;
exports.ThemeMode = ThemeMode;
exports["default"] = ThemeToggle;
exports.useDarkModeManager = useDarkModeManager;
exports.useIsDarkMode = useIsDarkMode;
