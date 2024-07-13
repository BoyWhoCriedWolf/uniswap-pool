import { darkTheme } from '../themes/darkTheme.js';
import { lightTheme } from '../themes/lightTheme.js';
import { cssObjectFromTheme } from './cssObjectFromTheme.js';

function cssStringFromTheme(theme) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Object.entries(cssObjectFromTheme(theme, options)).map(_ref => {
    let [key, value] = _ref;
    return `${key}:${value};`;
  }).join("");
}
function rootCssString(isDarkMode) {
  return isDarkMode ? cssStringFromTheme(darkTheme) : cssStringFromTheme(lightTheme);
}

export { rootCssString };
