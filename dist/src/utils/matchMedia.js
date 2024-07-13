// Need to fallback to support older browsers (mainly, Safari < 14).
// See: https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList#browser_compatibility

function addMediaQueryListener(mediaQuery, listener) {
  try {
    mediaQuery.addEventListener("change", listener);
  } catch (e) {
    mediaQuery.addListener(listener);
  }
}
function removeMediaQueryListener(mediaQuery, listener) {
  try {
    mediaQuery.removeEventListener("change", listener);
  } catch (e) {
    mediaQuery.removeListener(listener);
  }
}

export { addMediaQueryListener, removeMediaQueryListener };
