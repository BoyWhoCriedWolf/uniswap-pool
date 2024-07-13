import { useEffect } from 'react';
import { isMobile } from '../utils/userAgent.js';

/** Disables scrolling of the main body on mobile when `true` is passed. Generally used for modals. */
function useDisableScrolling(disable) {
  useEffect(function () {
    if (!isMobile) return;
    document.body.style.overflow = disable ? "hidden" : "auto";
  }, [disable]);
}

export { useDisableScrolling as default };
