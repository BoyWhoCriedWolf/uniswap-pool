import { rootCssString } from '../nft/css/cssStringFromTheme.js';
import React__default, { useMemo } from 'react';
import { css, createGlobalStyle, ThemeProvider as ThemeProvider$1 } from 'styled-components';
import { useIsDarkMode } from './components/ThemeToggle.js';
import { navDimensions } from '../nft/css/sprinkles.css.js';
import { darkTheme, lightTheme } from './colors.js';
import { darkDeprecatedTheme, lightDeprecatedTheme } from './deprecatedColors.js';

const MEDIA_WIDTHS = {
  deprecated_upToExtraSmall: 500,
  deprecated_upToSmall: 720,
  deprecated_upToMedium: 960,
  deprecated_upToLarge: 1280
};
const MAX_CONTENT_WIDTH = "1200px";
const deprecated_mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce((acc, size) => {
  acc[size] = (a, b, c) => css`
    @media (max-width: ${MEDIA_WIDTHS[size]}px) {
      ${css(a, b, c)}
    }
  `;
  return acc;
}, {});
const BREAKPOINTS = {
  xs: 396,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
  xxxl: 1920
};

// deprecated - please use the ones in styles.ts file
const transitions = {
  duration: {
    slow: "500ms",
    medium: "250ms",
    fast: "125ms"
  },
  timing: {
    ease: "ease",
    in: "ease-in",
    out: "ease-out",
    inOut: "ease-in-out"
  }
};
const opacities = {
  hover: 0.6,
  click: 0.4,
  disabled: 0.5,
  enabled: 1
};
const fonts = {
  code: "courier, courier new, serif"
};
const gapValues = {
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "24px",
  xl: "32px"
};
function getSettings(darkMode) {
  return {
    grids: gapValues,
    fonts,
    // shadows
    shadow1: darkMode ? "#000" : "#2F80ED",
    // media queries
    deprecated_mediaWidth: deprecated_mediaWidthTemplates,
    navHeight: navDimensions.height,
    navVerticalPad: navDimensions.verticalPad,
    mobileBottomBarHeight: 48,
    maxWidth: MAX_CONTENT_WIDTH,
    // deprecated - please use hardcoded exported values instead of
    // adding to the theme object
    breakpoint: BREAKPOINTS,
    transition: transitions,
    opacity: opacities
  };
}

// eslint-disable-next-line import/no-unused-modules -- used in styled.d.ts
function getTheme(darkMode) {
  return {
    darkMode,
    ...(darkMode ? darkTheme : lightTheme),
    ...(darkMode ? darkDeprecatedTheme : lightDeprecatedTheme),
    ...getSettings(darkMode)
  };
}
function ThemeProvider(_ref) {
  let {
    children
  } = _ref;
  const darkMode = useIsDarkMode() || true;
  const themeObject = useMemo(() => getTheme(darkMode), [darkMode]);
  return /*#__PURE__*/React__default.createElement(ThemeProvider$1, {
    theme: themeObject
  }, children);
}
const ThemedGlobalStyle = createGlobalStyle`
  html {
    color: ${_ref2 => {
  let {
    theme
  } = _ref2;
  return theme.neutral1;
}};
    background-color: ${_ref3 => {
  let {
    theme
  } = _ref3;
  return theme.background;
}} !important;
  }

 summary::-webkit-details-marker {
    display:none;
  }

  a {
    color: ${_ref4 => {
  let {
    theme
  } = _ref4;
  return theme.accent1;
}}; 
  }

  :root {
    ${_ref5 => {
  let {
    theme
  } = _ref5;
  return rootCssString(theme.darkMode);
}}
  }
`;

export { BREAKPOINTS, MEDIA_WIDTHS, ThemedGlobalStyle, ThemeProvider as default, getTheme };
