import React__default from 'react';
import { useWeb3React } from '@web3-react/core';
import { OffchainActivityModal } from '../AccountDrawer/MiniPortfolio/Activity/OffchainActivityModal.js';
import UniwalletModal from '../AccountDrawer/UniwalletModal.js';
import AirdropModal from '../AirdropModal/index.js';
import BaseWalletBanner from '../Banner/BaseAnnouncementBanner/index.js';
import AddressClaimModal from '../claim/AddressClaimModal.js';
import ConnectedAccountBlocked from '../ConnectedAccountBlocked/index.js';
import FiatOnrampModal from '../FiatOnrampModal/index.js';
import { UkDisclaimerModal } from '../NavBar/UkDisclaimerModal.js';
import DevFlagsBox from '../../dev/DevFlagsBox.js';
import useAccountRiskCheck from '../../hooks/useAccountRiskCheck.js';
import Bag from '../../nft/components/bag/Bag.js';
import TransactionCompleteModal from '../../nft/components/collection/TransactionCompleteModal.js';
import { useModalIsOpen, useToggleModal } from '../../state/application/hooks.js';
import { ApplicationModal } from '../../state/application/reducer.js';
import { isDevelopmentEnv, isStagingEnv } from '../../utils/env.js';

function TopLevelModals() {
  var addressClaimOpen = useModalIsOpen(ApplicationModal.ADDRESS_CLAIM);
  var addressClaimToggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM);
  var blockedAccountModalOpen = useModalIsOpen(ApplicationModal.BLOCKED_ACCOUNT);
  var _useWeb3React = useWeb3React(),
    account = _useWeb3React.account;
  useAccountRiskCheck(account);
  var accountBlocked = Boolean(blockedAccountModalOpen && account);
  var shouldShowDevFlags = isDevelopmentEnv() || isStagingEnv();
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(AddressClaimModal, {
    isOpen: addressClaimOpen,
    onDismiss: addressClaimToggle
  }), /*#__PURE__*/React__default.createElement(ConnectedAccountBlocked, {
    account: account,
    isOpen: accountBlocked
  }), /*#__PURE__*/React__default.createElement(Bag, null), /*#__PURE__*/React__default.createElement(UniwalletModal, null), /*#__PURE__*/React__default.createElement(BaseWalletBanner, null), /*#__PURE__*/React__default.createElement(OffchainActivityModal, null), /*#__PURE__*/React__default.createElement(TransactionCompleteModal, null), /*#__PURE__*/React__default.createElement(AirdropModal, null), /*#__PURE__*/React__default.createElement(FiatOnrampModal, null), /*#__PURE__*/React__default.createElement(UkDisclaimerModal, null), shouldShowDevFlags && /*#__PURE__*/React__default.createElement(DevFlagsBox, null));
}

export { TopLevelModals as default };
