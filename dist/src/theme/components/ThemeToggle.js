import React__default, { useCallback, useEffect, useMemo } from 'react';
import { Trans } from '../../../node_modules/@lingui/react/dist/index.mjs.js';
import Row from '../../components/Row/index.js';
import { atom, useAtom } from 'jotai';
import { atomWithStorage, useAtomValue, useUpdateAtom } from 'jotai/utils';
import ms from 'ms';
import { Sun, Moon } from 'react-feather';
import { addMediaQueryListener, removeMediaQueryListener } from '../../utils/matchMedia.js';
import { SegmentedControl, Segment } from './SegmentedControl.js';
import { ThemedText } from './text.js';

const THEME_UPDATE_DELAY = ms(`0.1s`);
const DARKMODE_MEDIA_QUERY = window.matchMedia("(prefers-color-scheme: dark)");
let ThemeMode = /*#__PURE__*/function (ThemeMode) {
  ThemeMode[ThemeMode["LIGHT"] = 0] = "LIGHT";
  ThemeMode[ThemeMode["DARK"] = 1] = "DARK";
  ThemeMode[ThemeMode["AUTO"] = 2] = "AUTO";
  return ThemeMode;
}({});

// Tracks the device theme
const systemThemeAtom = atom(DARKMODE_MEDIA_QUERY.matches ? ThemeMode.DARK : ThemeMode.LIGHT);

// Tracks the user's selected theme mode
const themeModeAtom = atomWithStorage("interface_color_theme", ThemeMode.AUTO);
function SystemThemeUpdater() {
  const setSystemTheme = useUpdateAtom(systemThemeAtom);
  const listener = useCallback(event => {
    setSystemTheme(event.matches ? ThemeMode.DARK : ThemeMode.LIGHT);
  }, [setSystemTheme]);
  useEffect(() => {
    addMediaQueryListener(DARKMODE_MEDIA_QUERY, listener);
    return () => removeMediaQueryListener(DARKMODE_MEDIA_QUERY, listener);
  }, [setSystemTheme, listener]);
  return null;
}
function ThemeColorMetaUpdater() {
  const isDark = useIsDarkMode();
  useEffect(() => {
    const meta = document.querySelector("meta[name=theme-color]");
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
  const mode = useAtomValue(themeModeAtom);
  const systemTheme = useAtomValue(systemThemeAtom);
  return (mode === ThemeMode.AUTO ? systemTheme : mode) === ThemeMode.DARK;
}
function useDarkModeManager() {
  const isDarkMode = useIsDarkMode();
  const setMode = useUpdateAtom(themeModeAtom);
  return useMemo(() => {
    return [isDarkMode, setMode];
  }, [isDarkMode, setMode]);
}
function ThemeToggle(_ref) {
  let {
    disabled
  } = _ref;
  const [mode, setMode] = useAtom(themeModeAtom);
  const switchMode = useCallback(mode => {
    // Switch feels less jittery with short delay
    !disabled && setTimeout(() => setMode(mode), THEME_UPDATE_DELAY);
  }, [disabled, setMode]);
  return /*#__PURE__*/React__default.createElement(Row, {
    align: "center"
  }, /*#__PURE__*/React__default.createElement(Row, {
    width: "40%"
  }, /*#__PURE__*/React__default.createElement(ThemedText.SubHeaderSmall, {
    color: "primary"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "FEr96N",
    message: "Theme"
  }))), /*#__PURE__*/React__default.createElement(Row, {
    flexGrow: 1,
    justify: "flex-end",
    width: "60%"
  }, /*#__PURE__*/React__default.createElement(SegmentedControl, {
    selected: mode,
    onSelect: switchMode
  }, /*#__PURE__*/React__default.createElement(Segment, {
    value: ThemeMode.AUTO,
    testId: "theme-auto"
  }, /*#__PURE__*/React__default.createElement(Trans, {
    id: "R9Khdg",
    message: "Auto"
  })), /*#__PURE__*/React__default.createElement(Segment, {
    value: ThemeMode.LIGHT,
    Icon: Sun,
    testId: "theme-lightmode"
  }), /*#__PURE__*/React__default.createElement(Segment, {
    value: ThemeMode.DARK,
    Icon: Moon,
    testId: "theme-darkmode"
  }))));
}

export { SystemThemeUpdater, ThemeColorMetaUpdater, ThemeMode, ThemeToggle as default, useDarkModeManager, useIsDarkMode };
