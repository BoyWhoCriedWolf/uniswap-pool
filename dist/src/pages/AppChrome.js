import React__default from 'react';
import AccountDrawer from '../components/AccountDrawer/index.js';
import Polling from '../components/Polling/index.js';
import Popups from '../components/Popups/index.js';
import TopLevelModals from '../components/TopLevelModals/index.js';

function AppChrome() {
  let {
    onShowNftProfile = () => null
  } = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Popups, null), /*#__PURE__*/React__default.createElement(Polling, null), /*#__PURE__*/React__default.createElement(TopLevelModals, null), /*#__PURE__*/React__default.createElement(AccountDrawer, {
    onShowNftProfile: onShowNftProfile
  }));
}

export { AppChrome as default };
