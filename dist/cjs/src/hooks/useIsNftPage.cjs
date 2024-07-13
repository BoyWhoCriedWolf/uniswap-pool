'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function useIsNftPage() {
  // const { pathname } = useLocation();
  // return pathname.startsWith("/nfts");
  return false;
}
function useIsNftProfilePage() {
  // const { pathname } = useLocation();
  // return pathname.startsWith("/nfts/profile");
  return false;
}

exports.useIsNftPage = useIsNftPage;
exports.useIsNftProfilePage = useIsNftProfilePage;
