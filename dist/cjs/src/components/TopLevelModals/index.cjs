'use strict';

var React = require('react');
var core = require('@web3-react/core');
var OffchainActivityModal = require('../AccountDrawer/MiniPortfolio/Activity/OffchainActivityModal.cjs');
var UniwalletModal = require('../AccountDrawer/UniwalletModal.cjs');
var index$2 = require('../AirdropModal/index.cjs');
var index$1 = require('../Banner/BaseAnnouncementBanner/index.cjs');
var AddressClaimModal = require('../claim/AddressClaimModal.cjs');
var index = require('../ConnectedAccountBlocked/index.cjs');
var index$3 = require('../FiatOnrampModal/index.cjs');
var UkDisclaimerModal = require('../NavBar/UkDisclaimerModal.cjs');
var DevFlagsBox = require('../../dev/DevFlagsBox.cjs');
var useAccountRiskCheck = require('../../hooks/useAccountRiskCheck.cjs');
var Bag = require('../../nft/components/bag/Bag.cjs');
var TransactionCompleteModal = require('../../nft/components/collection/TransactionCompleteModal.cjs');
var hooks = require('../../state/application/hooks.cjs');
var reducer = require('../../state/application/reducer.cjs');
var env = require('../../utils/env.cjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function TopLevelModals() {
  var addressClaimOpen = hooks.useModalIsOpen(reducer.ApplicationModal.ADDRESS_CLAIM);
  var addressClaimToggle = hooks.useToggleModal(reducer.ApplicationModal.ADDRESS_CLAIM);
  var blockedAccountModalOpen = hooks.useModalIsOpen(reducer.ApplicationModal.BLOCKED_ACCOUNT);
  var _useWeb3React = core.useWeb3React(),
    account = _useWeb3React.account;
  useAccountRiskCheck(account);
  var accountBlocked = Boolean(blockedAccountModalOpen && account);
  var shouldShowDevFlags = env.isDevelopmentEnv() || env.isStagingEnv();
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(AddressClaimModal, {
    isOpen: addressClaimOpen,
    onDismiss: addressClaimToggle
  }), /*#__PURE__*/React__default["default"].createElement(index, {
    account: account,
    isOpen: accountBlocked
  }), /*#__PURE__*/React__default["default"].createElement(Bag["default"], null), /*#__PURE__*/React__default["default"].createElement(UniwalletModal, null), /*#__PURE__*/React__default["default"].createElement(index$1, null), /*#__PURE__*/React__default["default"].createElement(OffchainActivityModal.OffchainActivityModal, null), /*#__PURE__*/React__default["default"].createElement(TransactionCompleteModal, null), /*#__PURE__*/React__default["default"].createElement(index$2, null), /*#__PURE__*/React__default["default"].createElement(index$3, null), /*#__PURE__*/React__default["default"].createElement(UkDisclaimerModal.UkDisclaimerModal, null), shouldShowDevFlags && /*#__PURE__*/React__default["default"].createElement(DevFlagsBox, null));
}

module.exports = TopLevelModals;
