import AccountDrawer from "components/AccountDrawer";
import Polling from "components/Polling";
import Popups from "components/Popups";
import TopLevelModals from "components/TopLevelModals";

export default function AppChrome({
  onShowNftProfile = () => null,
}: { onShowNftProfile?: () => void } = {}) {
  return (
    <>
      <Popups />
      <Polling />
      <TopLevelModals />
      <AccountDrawer onShowNftProfile={onShowNftProfile} />
    </>
  );
}
