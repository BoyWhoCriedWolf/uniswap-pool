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

export { useIsNftPage, useIsNftProfilePage };
