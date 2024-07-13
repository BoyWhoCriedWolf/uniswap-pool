import { useScreenSize } from '../../hooks/useScreenSize.js';

// @deprecated in favor of useScreenSize
function useIsMobile() {
  var isScreenSize = useScreenSize();
  var isMobile = !isScreenSize["sm"];
  return isMobile;
}

export { useIsMobile };
